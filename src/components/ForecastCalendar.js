import React, { useState, useEffect } from 'react';
import { Paper, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ru } from 'date-fns/locale';

function ForecastCalendar({ selectedDate, onDateSelect, modelCode }) {
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (!modelCode) return;

    const fetchForecasts = async () => {
      try {
        const response = await fetch(`/api/get_forecasts/${modelCode}`);
        const data = await response.json();
        setAvailableDates(data.map(forecast => new Date(forecast.date)));
        
        if (data.length > 0 && !selectedDate) {
          onDateSelect(data[0]);
        }
      } catch (error) {
        console.error('Error fetching forecasts:', error);
      }
    };

    fetchForecasts();
  }, [modelCode, selectedDate, onDateSelect]);

  const isDateAvailable = (date) => {
    return availableDates.some(
      availableDate => 
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );
  };

  return (
    <Paper elevation={3} sx={{ p: 2, width: '100%' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <DateCalendar
          value={selectedDate ? new Date(selectedDate.date) : null}
          onChange={(newDate) => {
            const forecast = availableDates.find(
              date => 
                date.getDate() === newDate.getDate() &&
                date.getMonth() === newDate.getMonth() &&
                date.getFullYear() === newDate.getFullYear()
            );
            if (forecast) {
              onDateSelect({ date: forecast, forecastId: forecast.id });
            }
          }}
          shouldDisableDate={(date) => !isDateAvailable(date)}
          sx={{
            width: '100%',
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
            },
            '& .MuiDayCalendar-weekContainer': {
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}

export default ForecastCalendar; 