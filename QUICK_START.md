# 🚀 Быстрый запуск проекта

## Минимальные требования

- Docker и Docker Compose
- 4GB RAM
- 2GB свободного места

## Запуск за 3 шага

### 1. Клонирование
```bash
git clone <repository-url>
cd web_interface_for_GIM_maps
```

### 2. Запуск
```bash
docker-compose up --build
```

### 3. Открытие в браузере
- **Приложение:** http://localhost:3000
- **API:** http://localhost:8081

## Проверка работы

### Frontend
- Открыть http://localhost:3000
- Должна загрузиться главная страница с выбором модели

### Backend API
```bash
curl http://localhost:8081/api/models
```
Должен вернуть список доступных моделей.

## Остановка

```bash
# Остановка с сохранением данных
docker-compose down

# Полная очистка
docker-compose down -v
```

## Логи

```bash
# Просмотр логов
docker-compose logs

# Логи в реальном времени
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs frontend
docker-compose logs python-api-proxy
```

## Устранение проблем

### Порт занят
```bash
# Проверка
netstat -tulpn | grep :3000
netstat -tulpn | grep :8081

# Остановка процессов
sudo kill -9 <PID>
```

### Пересборка
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

### Очистка Docker
```bash
docker system prune -a
docker volume prune
```

## Структура после запуска

```
http://localhost:3000
├── Главная страница
│   ├── Выбор модели
│   ├── Календарь прогнозов
│   ├── Графики метрик
│   └── GIM-карты
└── Документация
```

## Основные функции

1. **Выбор модели** - выберите модель прогнозирования
2. **Выбор даты** - кликните на доступную дату в календаре
3. **Просмотр карты** - используйте слайдер для навигации по времени
4. **Анализ метрик** - изучите графики качества прогнозов
5. **Скачивание** - скачайте данные в формате .NPZ

---

**Время запуска:** ~2-3 минуты  
**Статус:** Готово к использованию 