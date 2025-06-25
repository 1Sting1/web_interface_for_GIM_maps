# Техническое руководство разработчика

## 🏗️ Архитектура проекта

### Общая схема

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   Frontend      │ ◄──────────────► │   Backend       │
│   (React)       │                  │   (FastAPI)     │
│   Port: 3000    │                  │   Port: 8081    │
└─────────────────┘                  └─────────────────┘
                                              │
                                              ▼
                                    ┌─────────────────┐
                                    │ External API    │
                                    │ simurg.space    │
                                    └─────────────────┘
```

### Компонентная архитектура Frontend

```
App.js (Главный компонент)
├── Navigation.js (Навигация)
├── ModelSelector.js (Выбор модели)
├── ForecastCalendar.js (Календарь)
├── MetricsChart.js (Графики метрик)
└── GIMCard.js (Отображение карт)
```

## 📁 Детальное описание файлов

### Backend файлы

#### `backend/main.py`
```python
# Точка входа FastAPI приложения
# Подключает все API роутеры с префиксом /api
```

**Основные функции:**
- Инициализация FastAPI приложения
- Подключение роутеров из модулей api
- Настройка CORS и middleware

#### `backend/api/models.py`
```python
# API для работы с моделями прогнозирования
# Проксирует запросы к внешнему API
```

**Эндпоинты:**
- `GET /api/models` - получение списка доступных моделей

**Пример ответа:**
```json
[
  "GIMini-LSTM-F10.7-7",
  "GIMini-GRU-F10.7-7",
  "GIMini-Transformer-F10.7-7"
]
```

#### `backend/api/forecasts.py`
```python
# API для работы с прогнозами
# Управляет получением прогнозов и их размеров
```

**Эндпоинты:**
- `GET /api/get_forecasts/{model_code}` - получение прогнозов для модели
- `GET /api/get_forecast_size/{forecast_id}` - получение размера прогноза

**Пример ответа прогноза:**
```json
[
  {
    "id": "forecast_123",
    "forecast_start_date": "2024-01-15T00:00:00Z",
    "model_code": "GIMini-LSTM-F10.7-7"
  }
]
```

#### `backend/api/images.py`
```python
# API для получения изображений GIM-карт
# Поддерживает потоковую передачу изображений
```

**Эндпоинты:**
- `GET /api/get_forecast_image/{forecast_id}?shift={shift}` - получение изображения

**Параметры:**
- `forecast_id` - идентификатор прогноза
- `shift` - временной сдвиг (0-23 часа)

#### `backend/api/metrics.py`
```python
# API для получения метрик качества моделей
# Включает логирование для отладки
```

**Эндпоинты:**
- `GET /api/get_metrics/{model_code}?date_from={date}&date_to={date}` - получение метрик

**Параметры:**
- `model_code` - код модели
- `date_from` - начальная дата (YYYY-MM-DD)
- `date_to` - конечная дата (YYYY-MM-DD)

### Frontend файлы

#### `src/App.js`
```javascript
// Главный компонент приложения
// Управляет состоянием и навигацией между страницами
```

**Основное состояние:**
```javascript
const [currentPage, setCurrentPage] = useState('main');
const [selectedModel, setSelectedModel] = useState({ code: 'GIMini-LSTM-F10.7-7' });
const [selectedDate, setSelectedDate] = useState(null);
const [selectedShift, setSelectedShift] = useState(0);
const [forecastSize, setForecastSize] = useState(24);
```

**Ключевые функции:**
- `handleModelChange()` - обработка смены модели
- `handleDateSelect()` - обработка выбора даты
- `fetchForecastSize()` - получение размера прогноза

#### `src/components/ModelSelector.js`
```javascript
// Компонент выбора модели прогнозирования
// Загружает список моделей с API и предоставляет интерфейс выбора
```

**Основные функции:**
```javascript
useEffect(() => {
  const fetchModels = async () => {
    const response = await fetch('/api/models');
    const data = await response.json();
    setModels(data);
  };
  fetchModels();
}, []);
```

**Состояние:**
- `models` - список доступных моделей
- `loading` - состояние загрузки
- `error` - ошибки загрузки

#### `src/components/ForecastCalendar.js`
```javascript
// Интерактивный календарь с доступными прогнозами
// Использует Material-UI DateCalendar с кастомной стилизацией
```

**Ключевые особенности:**
- Кастомная стилизация доступных дат
- Русская локализация
- Автоматический выбор первой доступной даты

**Стилизация:**
```javascript
sx={{
  '& .MuiPickersDay-root.Mui-selected': {
    backgroundColor: 'green',
    color: '#fff',
  },
  '& .MuiPickersDay-root:not(.Mui-disabled)': {
    border: '1px solid #4caf50',
  }
}}
```

#### `src/components/GIMCard.js`
```javascript
// Компонент отображения GIM-карт
// Включает слайдер для навигации по времени и кнопку скачивания
```

**Основные функции:**
- `fetchImage()` - загрузка изображения карты
- `handleDownload()` - скачивание .NPZ файла
- Слайдер для переключения временных срезов

**Особенности:**
- Потоковая загрузка изображений
- Автоматическое масштабирование
- Обработка ошибок загрузки

#### `src/components/MetricsChart.js`
```javascript
// Компонент отображения метрик качества
// Использует Recharts для создания графиков
```

**Типы метрик:**
- **RMSE** (Root Mean Square Error) - среднеквадратичная ошибка
- **MAE** (Mean Absolute Error) - средняя абсолютная ошибка  
- **MAPE** (Mean Absolute Percentage Error) - средняя абсолютная процентная ошибка

**Функции обработки данных:**
```javascript
function groupMetricsByDay(metrics) {
  // Группировка метрик по дням
  // Преобразование дат в читаемый формат
}

function getAdaptiveDateRange() {
  // Автоматический расчет диапазона дат (последний месяц)
}
```

#### `src/components/Navigation.js`
```javascript
// Компонент навигации между страницами
// Простая навигация с двумя страницами: Главная и Документация
```

#### `src/components/Documentation.js`
```javascript
// Компонент документации проекта
// Содержит подробную информацию о проекте, API и использовании
```

### Конфигурационные файлы

#### `docker-compose.yml`
```yaml
# Оркестрация двух сервисов: frontend и backend
# Настройка сети и переменных окружения
```

**Сервисы:**
- `frontend` - React приложение с Nginx
- `python-api-proxy` - FastAPI backend

**Сеть:**
- `app-network` - внутренняя сеть для коммуникации сервисов

#### `Dockerfile`
```dockerfile
# Многоэтапная сборка React приложения
# Этап 1: Сборка React приложения
# Этап 2: Развертывание в Nginx
```

#### `Dockerfile.api`
```dockerfile
# Сборка Python FastAPI приложения
# Установка зависимостей и запуск uvicorn
```

#### `nginx.conf`
```nginx
# Конфигурация Nginx для React приложения
# Проксирование API запросов к backend
# Поддержка SPA routing
```

## 🔧 Технические детали

### API Проксирование

Backend выступает как прокси между frontend и внешним API:

```python
API_BASE = "https://services.simurg.space/gim-tec-forecast"

@router.get("/models")
def get_models():
    resp = requests.get(f"{API_BASE}/models")
    return JSONResponse(content=resp.json())
```

### Обработка ошибок

**Frontend:**
```javascript
try {
  const response = await fetch('/api/models');
  if (!response.ok) throw new Error('Ошибка загрузки моделей');
  const data = await response.json();
} catch (error) {
  setError(error.message);
}
```

**Backend:**
```python
try:
    resp = requests.get(url, params=params)
    resp.raise_for_status()
    return JSONResponse(content=resp.json())
except requests.exceptions.HTTPError as http_err:
    raise HTTPException(status_code=resp.status_code, detail=resp.text)
```

### Состояние приложения

**Глобальное состояние в App.js:**
- `selectedModel` - выбранная модель прогнозирования
- `selectedDate` - выбранная дата прогноза
- `selectedShift` - выбранный временной сдвиг
- `forecastSize` - размер прогноза (количество часов)

**Локальное состояние компонентов:**
- `loading` - состояние загрузки
- `error` - ошибки
- `data` - загруженные данные

### Стилизация

**Material-UI тема:**
- Использование системной темы Material-UI
- Кастомные стили через `sx` prop
- Адаптивный дизайн

**Кастомные стили:**
```javascript
sx={{
  backgroundColor: '#fff',
  boxShadow: '0 2px 16px #0001',
  borderRadius: 3,
  p: 3
}}
```

## 🚀 Процесс разработки

### Добавление нового API эндпоинта

1. **Создание файла в `backend/api/`:**
```python
from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
import requests

router = APIRouter()

@router.get("/new_endpoint")
def new_endpoint():
    # Логика эндпоинта
    pass
```

2. **Подключение в `backend/main.py`:**
```python
from api import new_module
app.include_router(new_module.router, prefix="/api")
```

3. **Использование в frontend:**
```javascript
const response = await fetch('/api/new_endpoint');
const data = await response.json();
```

### Добавление нового React компонента

1. **Создание компонента:**
```javascript
import React from 'react';
import { Box, Typography } from '@mui/material';

function NewComponent({ prop1, prop2 }) {
  return (
    <Box>
      <Typography>{prop1}</Typography>
    </Box>
  );
}

export default NewComponent;
```

2. **Импорт в App.js:**
```javascript
import NewComponent from './components/NewComponent';
```

3. **Использование:**
```javascript
<NewComponent prop1="value1" prop2="value2" />
```

### Тестирование

**Backend тестирование:**
```bash
# Запуск с автоперезагрузкой
uvicorn main:app --reload --host 0.0.0.0 --port 8081

# Тестирование API
curl http://localhost:8081/api/models
```

**Frontend тестирование:**
```bash
# Запуск в режиме разработки
npm start

# Запуск тестов
npm test

# Сборка для продакшена
npm run build
```

## 🔍 Отладка

### Логирование

**Backend логи:**
```python
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info(f"Request to: {url}")
logger.error(f"Error: {error}")
```

**Frontend логи:**
```javascript
console.log('Debug info:', data);
console.error('Error:', error);
```

### Инструменты разработчика

**Browser DevTools:**
- Network tab для мониторинга API запросов
- Console для отладки JavaScript
- React DevTools для инспекции компонентов

**Docker логи:**
```bash
docker-compose logs -f python-api-proxy
docker-compose logs -f frontend
```

## 📚 Дополнительные ресурсы

- [FastAPI документация](https://fastapi.tiangolo.com/)
- [React Hooks документация](https://react.dev/reference/react)
- [Material-UI документация](https://mui.com/material-ui/)
- [Recharts документация](https://recharts.org/)
- [Docker Compose документация](https://docs.docker.com/compose/)

---

**Версия документации:** 1.0  
**Последнее обновление:** 2025