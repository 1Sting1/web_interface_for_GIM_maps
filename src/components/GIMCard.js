import React, { useState, useEffect } from 'react';
import { Paper, Box, Slider, Button, Typography, CircularProgress, Alert, Backdrop } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function GIMCard({ forecastId, shift, onShiftChange, forecastSize }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!forecastId) return;
    setLoading(true);
    setError(null);
    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/get_forecast_image/${forecastId}?shift=${shift}`);
        if (!response.ok) throw new Error('Ошибка загрузки карты');
        const blob = await response.blob();
        setImageUrl(URL.createObjectURL(blob));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [forecastId, shift]);

  const handleDownload = async () => {
    if (!forecastId) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/get_forecast_image/${forecastId}`);
      if (!response.ok) throw new Error('Ошибка скачивания файла');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `forecast_${forecastId}.npz`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          GIM-карта
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Slider
            value={shift}
            onChange={(_, value) => onShiftChange(value)}
            min={0}
            max={forecastSize - 1}
            marks
            valueLabelDisplay="auto"
            sx={{ flex: 1 }}
          />
          <Typography variant="body2">
            Сдвиг: {shift}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {loading && (
          <Backdrop open={true} sx={{ color: '#fff', zIndex: 10 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && !error && imageUrl && (
          <img
            src={imageUrl}
            alt="GIM карта"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        )}
        {!loading && !error && !imageUrl && (
          <Typography>Выберите дату прогноза</Typography>
        )}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={handleDownload}
          disabled={!forecastId || loading}
        >
          Скачать *.npz файл
        </Button>
      </Box>
    </Paper>
  );
}

export default GIMCard; 