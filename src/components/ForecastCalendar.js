import React, { useState, useEffect } from 'react';
import { Paper, Box, CircularProgress, Alert } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

function ForecastCalendar({ selectedDate, onDateSelect, modelCode }) {
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!modelCode) return;
    setLoading(true);
    setError(null);
    const fetchForecasts = async () => {
      try {
        const response = await fetch(`/api/get_forecasts/${modelCode}`);
        if (!response.ok) throw new Error('Ошибка загрузки прогнозов');
        const data = await response.json();
        setAvailableDates(data.map(forecast => ({ date: new Date(forecast.forecast_start_date), id: forecast.id, forecast_start_date: forecast.forecast_start_date, model_code: forecast.model_code })));
        if (data.length > 0 && !selectedDate) {
          onDateSelect({ date: new Date(data[0].forecast_start_date), forecastId: data[0].id, forecast_start_date: data[0].forecast_start_date, model_code: data[0].model_code });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForecasts();
  }, [modelCode, selectedDate, onDateSelect]);

  const isDateAvailable = (date) => {
    return availableDates.some(
      available =>
        available.date.getDate() === date.getDate() &&
        available.date.getMonth() === date.getMonth() &&
        available.date.getFullYear() === date.getFullYear()
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
          <DateCalendar
            value={selectedDate ? new Date(selectedDate.date) : null}
            onChange={(newDate) => {
              const forecast = availableDates.find(
                available =>
                  available.date.getDate() === newDate.getDate() &&
                  available.date.getMonth() === newDate.getMonth() &&
                  available.date.getFullYear() === newDate.getFullYear()
              );
              if (forecast) {
                onDateSelect({ date: forecast.date, forecastId: forecast.id, forecast_start_date: forecast.forecast_start_date, model_code: forecast.model_code });
              }
            }}
            shouldDisableDate={(date) => !isDateAvailable(date)}
            sx={{
              width: '100%',
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'green',
                color: '#fff',
                borderRadius: '50%',
                border: '2px solid #222',
                '&:hover': {
                  backgroundColor: 'darkgreen',
                },
              },
              '& .MuiPickersDay-root:not(.Mui-disabled)': {
                border: '1px solid #4caf50',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#e8f5e8',
                  border: '1px solid #2e7d32',
                },
              },
              '& .MuiPickersDay-root.Mui-disabled': {
                color: '#ccc',
              },
              '& .MuiDayCalendar-weekContainer': {
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              },
              '& .MuiDayCalendar-header': {
                width: '100%',
                '& .MuiDayCalendar-weekDayLabel': {
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              },
            }}
            dayOfWeekFormatter={(day) => {
              const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
              return days[day];
            }}
          />
        </LocalizationProvider>
      )}
    </Paper>
  );
}

export default ForecastCalendar; 