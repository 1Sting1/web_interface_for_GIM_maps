import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress, Alert, Box } from '@mui/material';

function ModelSelector({ selectedModel, onModelChange }) {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/models');
        if (!response.ok) throw new Error('Ошибка загрузки моделей');
        let data = await response.json();
        // Если массив строк, преобразуем в объекты
        if (Array.isArray(data) && typeof data[0] === 'string') {
          data = data.map(code => ({ code, name: code }));
        }
        setModels(data);
        if (data.length > 0 && !selectedModel) {
          onModelChange(data[0]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedModel, onModelChange]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <FormControl fullWidth>
      <InputLabel id="model-select-label">Модель</InputLabel>
      <Select
        labelId="model-select-label"
        id="model-select"
        value={selectedModel?.code || ''}
        label="Модель"
        onChange={(e) => {
          const model = models.find(m => m.code === e.target.value);
          onModelChange(model);
        }}
      >
        {models.map((model) => (
          <MenuItem key={model.code} value={model.code}>
            {model.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ModelSelector;
