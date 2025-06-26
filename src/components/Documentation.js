import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import ApiIcon from '@mui/icons-material/Api';
import StorageIcon from '@mui/icons-material/Storage';
import WebIcon from '@mui/icons-material/Web';

function Documentation() {
  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ 
        textAlign: 'center', 
        mb: 4, 
        color: '#1976d2',
        fontWeight: 'bold'
      }}>
        📚 Документация проекта
      </Typography>
      
      <Typography variant="h5" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
        Web-интерфейс для прогнозирования GIM-карт
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
          <WebIcon /> Обзор проекта
        </Typography>
        <Typography paragraph>
          Данный проект представляет собой веб-интерфейс для работы с прогнозами GIM (Global Ionospheric Maps) - карт. 
          Приложение позволяет выбирать модели прогнозирования, просматривать доступные прогнозы по датам, 
          анализировать метрики качества моделей и визуализировать GIM-карты с возможностью навигации по временным срезам.
        </Typography>
        <Typography paragraph>
          <strong>Основные возможности:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="• Выбор модели прогнозирования из доступных вариантов"
              secondary="Поддержка различных алгоритмов машинного обучения для прогнозирования ионосферы"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="• Календарь доступных прогнозов"
              secondary="Интерактивный календарь с выделением дат, для которых доступны прогнозы"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="• Визуализация метрик качества"
              secondary="Графики RMSE, MAE, MAPE для оценки точности прогнозов"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="• Просмотр GIM-карт"
              secondary="Отображение карт с возможностью навигации по временным срезам и скачивания данных"
            />
          </ListItem>
        </List>
      </Paper>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon /> Архитектура системы
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Проект построен по архитектуре клиент-сервер с использованием современных технологий:
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Chip label="Frontend: React 18" color="primary" />
            <Chip label="Backend: FastAPI" color="secondary" />
            <Chip label="UI: Material-UI" color="info" />
            <Chip label="Графики: Recharts" color="success" />
            <Chip label="Контейнеризация: Docker" color="warning" />
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
            Структура проекта:
          </Typography>
          
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Директория</strong></TableCell>
                  <TableCell><strong>Описание</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><code>src/</code></TableCell>
                  <TableCell>Исходный код React-приложения</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>src/components/</code></TableCell>
                  <TableCell>React-компоненты интерфейса</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>backend/</code></TableCell>
                  <TableCell>FastAPI сервер</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>backend/api/</code></TableCell>
                  <TableCell>API эндпоинты</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>public/</code></TableCell>
                  <TableCell>Статические файлы</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <ApiIcon /> API Документация
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Backend предоставляет REST API для взаимодействия с внешним сервисом прогнозирования GIM-карт.
          </Typography>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Базовый URL: <code>https://services.simurg.space/gim-tec-forecast</code>
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Эндпоинт</strong></TableCell>
                  <TableCell><strong>Метод</strong></TableCell>
                  <TableCell><strong>Описание</strong></TableCell>
                  <TableCell><strong>Параметры</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><code>/api/models</code></TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>Получение списка доступных моделей</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>/api/get_forecasts/{'{model_code}'}</code></TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>Получение прогнозов для модели</TableCell>
                  <TableCell>model_code (path)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>/api/get_forecast_size/{'{forecast_id}'}</code></TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>Получение размера прогноза</TableCell>
                  <TableCell>forecast_id (path)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>/api/get_forecast_image/{'{forecast_id}'}</code></TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>Получение изображения GIM-карты</TableCell>
                  <TableCell>forecast_id (path), shift (query)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><code>/api/get_metrics/{'{model_code}'}</code></TableCell>
                  <TableCell>GET</TableCell>
                  <TableCell>Получение метрик качества</TableCell>
                  <TableCell>model_code (path), date_from, date_to (query)</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WebIcon /> Компоненты Frontend
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            React-приложение состоит из следующих основных компонентов:
          </Typography>

          <List>
            <ListItem>
              <ListItemText 
                primary="ModelSelector"
                secondary="Компонент для выбора модели прогнозирования. Отображает выпадающий список доступных моделей и обрабатывает их смену."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="ForecastCalendar"
                secondary="Интерактивный календарь для выбора даты прогноза. Показывает доступные даты и позволяет выбрать конкретный прогноз."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="MetricsChart"
                secondary="Компонент для отображения метрик качества моделей (RMSE, MAE, MAPE) в виде графиков с использованием библиотеки Recharts."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="GIMCard"
                secondary="Компонент для отображения GIM-карт с возможностью навигации по временным срезам и скачивания данных в формате .NPZ."
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <StorageIcon /> Технологии и зависимости
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Frontend зависимости:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="React 18.2.0" secondary="Основная библиотека для создания пользовательского интерфейса" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Material-UI 5.15.6" secondary="Библиотека компонентов для создания современного UI" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Recharts 2.10.4" secondary="Библиотека для создания интерактивных графиков" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Axios 1.6.7" secondary="HTTP-клиент для выполнения запросов к API" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date-fns 2.30.0" secondary="Утилиты для работы с датами" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Backend зависимости:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="FastAPI" secondary="Современный веб-фреймворк для создания API" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Uvicorn" secondary="ASGI-сервер для запуска FastAPI приложений" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Requests" secondary="HTTP-библиотека для выполнения запросов к внешним API" />
            </ListItem>
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Инфраструктура:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Docker" secondary="Контейнеризация приложения" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Docker Compose" secondary="Оркестрация контейнеров" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nginx" secondary="Веб-сервер для раздачи статических файлов" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon /> Развертывание
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Проект поддерживает развертывание с использованием Docker и Docker Compose.
          </Typography>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Локальное развертывание:
          </Typography>
          
          <Box component="pre" sx={{ 
            backgroundColor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`# Клонирование репозитория
git clone <repository-url>
cd web_interface_for_GIM_maps_test

# Запуск с помощью Docker Compose
docker-compose up --build

# Приложение будет доступно по адресу:
# Frontend: http://0.0.0.0:3001
# Backend API: http://0.0.0.0:8081`}
          </Box>

          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
            Разработка:
          </Typography>
          
          <Box component="pre" sx={{ 
            backgroundColor: '#f5f5f5', 
            p: 2, 
            borderRadius: 1, 
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`# Установка зависимостей Frontend
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build`}
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: '#1976d2', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WebIcon /> Руководство пользователя
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography paragraph>
            Пошаговое руководство по использованию веб-интерфейса:
          </Typography>

          <List>
            <ListItem>
              <ListItemText 
                primary="1. Выбор модели"
                secondary="В верхней части страницы выберите модель прогнозирования из выпадающего списка. Доступные модели загружаются автоматически."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="2. Выбор даты прогноза"
                secondary="В календаре выберите дату, для которой доступен прогноз. Доступные даты выделены зеленым цветом."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="3. Анализ метрик"
                secondary="Просмотрите графики метрик качества (RMSE, MAE, MAPE) для выбранной модели за последний месяц."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="4. Просмотр GIM-карты"
                secondary="Используйте слайдер для навигации по временным срезам прогноза. Карта отображается в центральной части."
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="5. Скачивание данных"
                secondary="Нажмите кнопку 'Скачать .NPZ-файл' для загрузки данных прогноза в формате NumPy."
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default Documentation; 