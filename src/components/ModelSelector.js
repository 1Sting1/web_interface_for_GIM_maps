import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function ModelSelector({ selectedModel, onModelChange }) {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('/api/models');
        const data = await response.json();
        setModels(data);
        if (data.length > 0 && !selectedModel) {
          onModelChange(data[0]);
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    fetchModels();
  }, [selectedModel, onModelChange]);

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