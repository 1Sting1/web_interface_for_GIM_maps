import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress } from '@mui/material';
import Navigation from './components/Navigation';
import ModelSelector from './components/ModelSelector';
import ForecastCalendar from './components/ForecastCalendar';
import GIMCard from './components/GIMCard';
import MetricsChart from './components/MetricsChart';
import Documentation from './components/Documentation';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState({ code: 'GIMini-LSTM-F10.7-7' });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(0);
  const [forecastSize, setForecastSize] = useState(24);

  const handleModelChange = (model) => {
    setSelectedModel(model);
    setSelectedDate(null);
    setSelectedShift(0);
  };

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
  }, [selectedDate]);

  const renderMainPage = () => (
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
          forecastStartDate={selectedDate?.forecast_start_date}
          modelCode={selectedDate?.model_code || selectedModel?.code}
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

  const renderDocumentationPage = () => (
    <Documentation />
  );

  return (
    <Box>
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {currentPage === 'main' ? renderMainPage() : renderDocumentationPage()}
    </Box>
  );
}

export default App; 