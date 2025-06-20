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

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ModelSelector
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
        />
        <ForecastCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
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