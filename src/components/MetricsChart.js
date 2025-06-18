import React, { useState, useEffect } from 'react';
import { Paper, Box, Typography } from '@mui/material';
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

  useEffect(() => {
    if (!modelCode) return;

    const fetchMetrics = async () => {
      try {
        const response = await fetch(`/api/get_metrics/${modelCode}`);
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, [modelCode]);

  if (!metrics.length) {
    return null;
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Метрики модели
      </Typography>
      <Box sx={{ height: 300 }}>
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