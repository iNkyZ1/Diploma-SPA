# Hotel Booking SPA (React + Express + MongoDB)

SPA-приложение для бронирования номеров отеля.

Проект сделан по подходу **Frontend-first**:

1. фронт работает на **mock API** (как будто сервер уже есть),
2. затем включается режим **real API** и фронт начинает ходить в настоящий backend **Express + MongoDB** без переписывания UI.

---

## Функционал

### Основные сценарии

- **Доступные номера**: список карточек + пагинация
- **Страница номера**: детали + бронирование
- **Мои брони**: список броней + удаление
- **Админ-панель**: статусы всех номеров + переключение статуса
- **Аутентификация**: вход/регистрация, роли `user/admin`

### Дополнительно

- Главная страница с hero-фоном
- Галерея
- Страница сервисов
- Единый UI-стиль (CSS variables + shared UI компоненты)

---

## Технологии

### Frontend

- React (SPA)
- React Router
- Redux Toolkit
- CSS: theme variables + base/utilities/components styles

### Backend

- Node.js + Express
- MongoDB + Mongoose
- JWT auth + middleware
- CRUD по API-контракту

---

## Режимы работы

Проект поддерживает 2 режима:

- **mock** — фронт работает на mock API (без backend)
- **real** — фронт ходит в настоящий backend (Express + MongoDB)

---

## Быстрый старт (mock mode)

```bash
cd frontend
npm install
npm run dev
```

В dev-режиме есть кнопка Reset DB (сброс мок-данных).

## Тестовые аккаунты (mock)

Admin: admin / admin123

User: user / user123

### Запуск проекта (real mode: MongoDB + Backend + Frontend)

## Требования

- Node.js 18+

- Docker (рекомендуется для MongoDB)

## Запуск MongoDB (Docker)

```bash
docker run --name hotel-mongo -p 27017:27017 -d mongo:7
docker ps
```

- Остановить/запустить:

```bash
docker stop hotel-mongo
docker start hotel-mongo
```

## Backend

```bash
cd backend
npm install
```

- Создайте файл backend/.env на основе backend/.env.example:

```bash
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/hotel_booking
JWT_SECRET=change_super_secret
```

- Засеять базу тестовыми данными (admin/user + 20 rooms):

```bash
npm run seed
```

- Запуск сервера:

```bash
npm run dev
```

- Проверка:

http://localhost:4000/api/health
→ { "ok": true }

## Frontend (real mode)

```bash
cd ../frontend
npm install
```

- Создайте frontend/.env (локально) на основе frontend/.env.example:

```bash
VITE_API_MODE=real
VITE_API_BASE_URL=http://localhost:4000
```

- Запуск:

```bash
npm run dev
```

## Изображения / ассеты

Изображения лежат в frontend/public/images/ и используются путями:

/images/rooms/...

/images/gallery/...

/images/services/...

/images/homepage-bg.webp

- Если папки public/images нет (например, архив без ассетов), приложение будет работать, но картинки не отобразятся.

## API Contract

Контракт зафиксирован здесь:

frontend/docs/api-contract.md

Backend реализован 1:1 к этому контракту, чтобы UI не переписывался при переключении mock → real.

## Маршруты

- Публичные:

/ — главная

/rooms — список номеров

/rooms/:id — детали номера

/gallery — галерея

/services — сервисы

/login — вход

/register — регистрация

- Защищённые:

/my-bookings — мои брони (только для авторизованных)

/admin — админка (только admin)

## Структура проекта (вкратце)

frontend/src/
app/ # layout, router, store
pages/ # страницы роутов
features/ # auth, rooms, booking, admin
entities/ # room, booking
widgets/ # header/footer
shared/
api/ # apiClient (mock/real switch) + \*Api
ui/ # Button/Input/Card/Alert/Loader/Pagination
styles/ # theme/base/utilities/components
lib/ # storage keys, error helpers

backend/src/
config/ # env + db
routes/ # auth/rooms/bookings/admin
controllers/ # логика эндпоинтов
models/ # User/Room/Booking
middleware/ # auth + requireAdmin + errorHandler
utils/ # HttpError и т.п.

## Примечания

- MongoDB используется в режиме standalone, поэтому транзакции не применяются.
  Логика бронирования сделана через атомарное обновление статуса комнаты.

- При 401 (невалидный токен) фронт делает logout и редирект на /login.

## Назначение проекта

Проект создан в учебных целях.
