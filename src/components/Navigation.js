import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Navigation({ currentPage, onPageChange }) {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          GIM Maps Forecast
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<HomeIcon />}
            onClick={() => onPageChange('main')}
            sx={{
              backgroundColor: currentPage === 'main' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Главная
          </Button>
          <Button
            color="inherit"
            startIcon={<MenuBookIcon />}
            onClick={() => onPageChange('documentation')}
            sx={{
              backgroundColor: currentPage === 'documentation' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Документация
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation; 