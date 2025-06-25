import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography, CircularProgress, Alert } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { eachDayOfInterval, format, parseISO } from 'date-fns';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

function groupMetricsByDay(metrics) {
  const byDay = {};
  metrics.forEach((item) => {
    const d = new Date(item.forecast_start_date);
    if (isNaN(d)) return;
    const key = d.toISOString().slice(0, 10);
    if (!byDay[key]) {
      byDay[key] = {
        date: key,
        label: `${d.getDate().toString().padStart(2, '0')} ${MONTHS[d.getMonth()]}`,
        rmse: item.rmse || null,
        mae: item.mae || null,
        mape: item.mape || null,
      };
    }
  });
  return Object.values(byDay).sort((a, b) => new Date(a.date) - new Date(b.date));
}

function getDateRangeDays(metrics) {
  if (!metrics.length) return 'Нет данных';
  const first = metrics[0];
  const last = metrics[metrics.length - 1];
  const format = (d) => d.toLocaleString('ru-RU', { day: '2-digit', month: 'short' });
  return `${format(new Date(first.date))} - ${format(new Date(last.date))}`;
}

function getAdaptiveDateRange() {
  const today = new Date();
  const monthAgo = new Date(today);
  monthAgo.setMonth(today.getMonth() - 1);

  today.setHours(0, 0, 0, 0);
  monthAgo.setHours(0, 0, 0, 0);

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  return {
    date_from: formatDate(monthAgo),
    date_to: formatDate(today)
  };
}

function fillMetricsForFullMonth(metrics, date_from, date_to) {
  const metricsMap = new Map();
  metrics.forEach(item => {
    metricsMap.set(item.date, item);
  });

  const allDates = eachDayOfInterval({
    start: parseISO(date_from),
    end: parseISO(date_to)
  });

  return allDates.map(dateObj => {
    const key = format(dateObj, 'yyyy-MM-dd');
    const label = `${dateObj.getDate().toString().padStart(2, '0')} ${MONTHS[dateObj.getMonth()]}`;
    if (metricsMap.has(key)) {
      return { ...metricsMap.get(key), label };
    } else {
      return { date: key, label, rmse: null, mae: null, mape: null };
    }
  });
}

function MetricCard({ title, color, dataKey, data, dateRange }) {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, minWidth: 320, background: '#fff', boxShadow: '0 2px 16px #0001', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <Typography variant="h6" align="center" fontWeight={700} gutterBottom>{title}</Typography>
      <Typography variant="subtitle2" align="center" sx={{ color: '#888', mb: 2 }}>{dateRange}</Typography>
      {data.length > 0 ? (
        <Box sx={{ width: '100%', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 14, fill: '#888' }} axisLine={false} tickLine={false} minTickGap={10} />
              <YAxis tick={{ fontSize: 14, fill: '#888' }} axisLine={false} tickLine={false} domain={[0, 'auto']} />
              <Tooltip formatter={(value) => value?.toFixed(2)} labelFormatter={label => label} />
              <Line
                type="linear"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={{ r: 4, stroke: color, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6, fill: color, stroke: '#fff', strokeWidth: 2 }}
                connectNulls={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Box sx={{ width: '100%', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
          Нет данных для отображения
        </Box>
      )}
    </Paper>
  );
}

function MetricsChart({ modelCode }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modelCode) {
      setMetrics([]);
      setError(null);
      return;
    }
    
    setLoading(true);
    setError(null);
    setMetrics([]);
    
    const { date_from, date_to } = getAdaptiveDateRange();
    
    console.log('MetricsChart Debug:', {
      modelCode,
      date_from,
      date_to,
      url: `/api/get_metrics/${modelCode}?date_from=${date_from}&date_to=${date_to}`
    });
    
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/get_metrics/${modelCode}?date_from=${date_from}&date_to=${date_to}`);
        console.log('API Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`Ошибка загрузки метрик: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Raw API data:', data);
        console.log('Data type:', typeof data, 'Is array:', Array.isArray(data));
        
        if (!Array.isArray(data)) {
          console.error('Data is not an array:', data);
          throw new Error('Неверный формат данных от API');
        }
        
        console.log('Number of records:', data.length);
        if (data.length > 0) {
          console.log('Sample record:', data[0]);
        }
        
        const groupedMetrics = groupMetricsByDay(data);
        console.log('Grouped metrics:', groupedMetrics);
        
        const fullMonthMetrics = fillMetricsForFullMonth(groupedMetrics, date_from, date_to);
        setMetrics(fullMonthMetrics);
      } catch (error) {
        console.error('Ошибка при загрузке метрик:', error);
        setError(error.message);
        setMetrics([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, [modelCode]);

  const dateRange = getDateRangeDays(metrics);
  const { date_from, date_to } = getAdaptiveDateRange();

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Box sx={{
        mb: 2,
        p: 2.5,
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        boxShadow: '0 2px 8px #0001',
        justifyContent: 'center',
        flexWrap: 'wrap',
        minHeight: 56,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ color: '#1976d2', fontSize: 22, display: 'flex', alignItems: 'center' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ marginRight: 4 }}><circle cx="12" cy="12" r="10" stroke="#1976d2" strokeWidth="2" fill="#e3f2fd"/><path d="M8 12h8M12 8v8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1976d2', fontSize: 18 }}>
            {modelCode || 'Модель не выбрана'}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: '#666', mx: 2, fontSize: 16 }}>
          {date_from} — {date_to}
        </Typography>
        <Typography variant="body2" sx={{ color: '#aaa', ml: 2, fontSize: 16 }}>
          Записей: {metrics.length}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center', my: 2 }}>
        <MetricCard title="RMSE" color="#36c2f7" dataKey="rmse" data={metrics} dateRange={dateRange} />
        <MetricCard title="MAE" color="#f75c5c" dataKey="mae" data={metrics} dateRange={dateRange} />
        <MetricCard title="MAPE" color="#2d7cff" dataKey="mape" data={metrics} dateRange={dateRange} />
      </Box>
    </Box>
  );
}

export default MetricsChart;