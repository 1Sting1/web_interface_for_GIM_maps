# Web-интерфейс для прогнозирования GIM-карт

## 📋 Описание проекта

**GIM Maps Forecast** - это веб-приложение для работы с прогнозами GIM (Global Ionospheric Maps) - карт ионосферы Земли. Приложение предоставляет удобный интерфейс для выбора моделей прогнозирования, просмотра доступных прогнозов, анализа метрик качества и визуализации GIM-карт.

### 🎯 Основные возможности

- **Выбор модели прогнозирования** - поддержка различных алгоритмов машинного обучения
- **Интерактивный календарь** - просмотр доступных прогнозов по датам
- **Анализ метрик качества** - графики RMSE, MAE, MAPE для оценки точности
- **Визуализация GIM-карт** - просмотр карт с навигацией по временным срезам
- **Скачивание данных** - экспорт прогнозов в формате .NPZ

### 🏗️ Технологический стек

**Frontend:**
- React 18.2.0
- Material-UI (MUI) 5.15.6
- Recharts 2.10.4 (графики)
- Axios 1.6.7 (HTTP-клиент)
- Date-fns 2.30.0 (работа с датами)

**Backend:**
- FastAPI (Python веб-фреймворк)
- Uvicorn (ASGI сервер)
- Requests (HTTP-клиент)

**Инфраструктура:**
- Docker & Docker Compose
- Nginx (обратный прокси)
- Node.js 18 (сборка frontend)

## 🚀 Запуск проекта

### Предварительные требования

- Docker и Docker Compose
- Git

### Способ 1: Запуск через Docker Compose (рекомендуется)

1. **Клонирование репозитория:**
```bash
git clone <repository-url>
cd web_interface_for_GIM_maps
```

2. **Запуск приложения:**
```bash
docker-compose up --build
```

3. **Доступ к приложению:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8081

### Способ 2: Локальная разработка

#### Настройка Frontend (React)

1. **Установка зависимостей:**
```bash
npm install
```

2. **Запуск в режиме разработки:**
```bash
npm start
```

3. **Сборка для продакшена:**
```bash
npm run build
```

#### Настройка Backend (FastAPI)

1. **Создание виртуального окружения:**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

2. **Установка зависимостей:**
```bash
pip install -r requirements.txt
```

3. **Запуск сервера:**
```bash
cd backend
uvicorn main:app --host 0.0.0.0 --port 8081 --reload
```

### Способ 3: Запуск отдельных контейнеров

1. **Сборка и запуск frontend:**
```bash
docker build -t gim-frontend .
docker run -p 3000:80 gim-frontend
```

2. **Сборка и запуск backend:**
```bash
docker build -f Dockerfile.api -t gim-backend .
docker run -p 8081:8081 gim-backend
```

## 📁 Структура проекта

```
web_interface_for_GIM_maps/
├── backend/                    # Backend сервер
│   ├── api/                   # API эндпоинты
│   │   ├── __init__.py
│   │   ├── models.py          # Управление моделями
│   │   ├── forecasts.py       # Управление прогнозами
│   │   ├── images.py          # Получение изображений
│   │   └── metrics.py         # Получение метрик
│   └── main.py               # Точка входа FastAPI
├── src/                      # Frontend React приложение
│   ├── components/           # React компоненты
│   │   ├── Navigation.js     # Навигация
│   │   ├── ModelSelector.js  # Выбор модели
│   │   ├── ForecastCalendar.js # Календарь прогнозов
│   │   ├── GIMCard.js        # Отображение GIM-карт
│   │   ├── MetricsChart.js   # Графики метрик
│   │   └── Documentation.js  # Документация
│   ├── App.js               # Главный компонент
│   └── index.js             # Точка входа React
├── public/                  # Статические файлы
├── docker-compose.yml       # Docker Compose конфигурация
├── Dockerfile              # Dockerfile для frontend
├── Dockerfile.api          # Dockerfile для backend
├── nginx.conf              # Конфигурация Nginx
├── package.json            # Зависимости Node.js
└── requirements.txt        # Зависимости Python
```

## 🔧 Конфигурация

### Переменные окружения

**Frontend (React):**
- `REACT_APP_API_URL` - URL backend API (по умолчанию: http://localhost:8081)

**Backend (FastAPI):**
- Внешний API: `https://services.simurg.space/gim-tec-forecast`

### Порты

- **3000** - Frontend (React)
- **8081** - Backend API (FastAPI)
- **80** - Nginx (в контейнере)

## 📡 API Endpoints

### Backend API (прокси к внешнему сервису)

| Endpoint | Метод | Описание | Параметры |
|----------|-------|----------|-----------|
| `/api/models` | GET | Список доступных моделей | - |
| `/api/get_forecasts/{model_code}` | GET | Прогнозы для модели | `model_code` (path) |
| `/api/get_forecast_size/{forecast_id}` | GET | Размер прогноза | `forecast_id` (path) |
| `/api/get_forecast_image/{forecast_id}` | GET | Изображение GIM-карты | `forecast_id` (path), `shift` (query) |
| `/api/get_metrics/{model_code}` | GET | Метрики качества | `model_code` (path), `date_from`, `date_to` (query) |

### Примеры запросов

```bash
# Получение списка моделей
curl http://localhost:8081/api/models

# Получение прогнозов для модели
curl http://localhost:8081/api/get_forecasts/GIMini-LSTM-F10.7-7

# Получение метрик с фильтрацией по датам
curl "http://localhost:8081/api/get_metrics/GIMini-LSTM-F10.7-7?date_from=2024-01-01&date_to=2024-01-31"
```

## 🎨 Компоненты интерфейса

### ModelSelector.js
```javascript
// Компонент выбора модели прогнозирования
// Загружает список доступных моделей с API
// Позволяет пользователю выбрать модель для работы
```

### ForecastCalendar.js
```javascript
// Интерактивный календарь с доступными прогнозами
// Отображает даты, для которых есть прогнозы
// Позволяет выбрать конкретную дату прогноза
```

### GIMCard.js
```javascript
// Отображение GIM-карт с навигацией по времени
// Слайдер для переключения между временными срезами
// Кнопка скачивания данных в формате .NPZ
```

### MetricsChart.js
```javascript
// Графики метрик качества (RMSE, MAE, MAPE)
// Использует библиотеку Recharts для визуализации
// Автоматическое обновление при смене модели
```

## 🔍 Отладка и логирование

### Backend логи
```bash
# Просмотр логов контейнера backend
docker-compose logs python-api-proxy

# Просмотр логов в реальном времени
docker-compose logs -f python-api-proxy
```

### Frontend логи
```bash
# Просмотр логов контейнера frontend
docker-compose logs frontend
```

### Проверка состояния сервисов
```bash
# Статус контейнеров
docker-compose ps

# Перезапуск сервисов
docker-compose restart
```

## 🛠️ Разработка

### Добавление новых API эндпоинтов

1. Создайте новый файл в `backend/api/`
2. Добавьте роутер в `backend/main.py`
3. Обновите документацию

### Добавление новых React компонентов

1. Создайте компонент в `src/components/`
2. Импортируйте в `src/App.js`
3. Добавьте в навигацию при необходимости

### Изменение конфигурации Docker

- `Dockerfile` - конфигурация frontend контейнера
- `Dockerfile.api` - конфигурация backend контейнера
- `docker-compose.yml` - оркестрация сервисов
- `nginx.conf` - настройки веб-сервера

## 🚨 Устранение неполадок

### Проблемы с запуском

1. **Порт занят:**
```bash
# Проверка занятых портов
netstat -tulpn | grep :3000
netstat -tulpn | grep :8081

# Остановка процессов
sudo kill -9 <PID>
```

2. **Проблемы с Docker:**
```bash
# Очистка Docker
docker system prune -a
docker volume prune

# Пересборка образов
docker-compose build --no-cache
```

3. **Проблемы с зависимостями:**
```bash
# Очистка node_modules
rm -rf node_modules package-lock.json
npm install

# Очистка Python кэша
pip cache purge
```

### Частые ошибки

- **CORS ошибки** - проверьте настройки nginx.conf
- **API недоступен** - проверьте статус внешнего сервиса
- **Изображения не загружаются** - проверьте параметр shift

## 📚 Дополнительные ресурсы

- [FastAPI документация](https://fastapi.tiangolo.com/)
- [React документация](https://react.dev/)
- [Material-UI документация](https://mui.com/)
- [Docker документация](https://docs.docker.com/)

## 📄 Лицензия

Проект разработан для работы с сервисом прогнозирования GIM-карт.

---

**Версия:** 0.1.0  
**Последнее обновление:** 2025