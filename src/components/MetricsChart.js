import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography, CircularProgress, Alert } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function MetricsChart({ modelCode }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modelCode) return;
    setLoading(true);
    setError(null);
    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/get_metrics/${modelCode}`);
        if (!response.ok) throw new Error('Ошибка загрузки метрик');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [modelCode]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!metrics.length) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2, width: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Метрики модели
      </Typography>
      <Box sx={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={metrics}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rmse"
              stroke="#8884d8"
              name="RMSE"
            />
            <Line
              type="monotone"
              dataKey="mae"
              stroke="#82ca9d"
              name="MAE"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default MetricsChart; 