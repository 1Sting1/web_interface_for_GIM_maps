import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import ModelSelector from './components/ModelSelector';
import ForecastCalendar from './components/ForecastCalendar';
import GIMCard from './components/GIMCard';
import MetricsChart from './components/MetricsChart';

function App() {
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(0);
  const [forecastSize, setForecastSize] = useState(24);

  // Сброс даты и shift при смене модели
  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedDate(null);
    setSelectedShift(0);
  };

  // Сброс shift при смене даты
  const handleDateSelect = (dateObj) => {
    setSelectedDate(dateObj);
    setSelectedShift(0);
  };

  useEffect(() => {
    const fetchForecastSize = async () => {
      if (!selectedDate?.forecastId) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/get_forecast_size/${selectedDate.forecastId}`);
        if (!response.ok) throw new Error('Ошибка загрузки размера прогноза');
        const data = await response.json();
        setForecastSize(data.size || 24);
        if (selectedShift >= (data.size || 24)) {
          setSelectedShift(0);
        }
      } catch (error) {
        setForecastSize(24);
        setSelectedShift(0);
      } finally {
        setLoading(false);
      }
    };
    fetchForecastSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
        />
        <ForecastCalendar
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          modelCode={selectedModel?.code}
        />
        <MetricsChart modelCode={selectedModel?.code} />
        <GIMCard
          forecastId={selectedDate?.forecastId}
          shift={selectedShift}
          onShiftChange={setSelectedShift}
          forecastSize={forecastSize}
        />
      </Box>
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
}

export default App;
