# Hotel Booking SPA (React + Mock API)

SPA-приложение для бронирования номеров отеля.

Проект реализован в формате **Frontend**: сначала готовый интерфейс на **mock API** (контракт 1:1 под будущий backend), затем подключение настоящего сервера (Express + MongoDB) без переписывания UI.

---

## Функционал

### Основные сценарии

- **Доступные номера**: список карточек + пагинация
- **Страница номера**: детали + бронирование
- **Мои брони**: список броней + удаление
- **Админ-панель**: просмотр статусов номеров + переключение статуса
- **Аутентификация**: вход/регистрация, роль admin поддерживается (в mock-режиме)

### Дополнительно

- Главная страница с hero-фоном
- Галерея
- Страница сервисов
- Единый UI-стиль (CSS variables + shared UI компоненты)

---

## Технологии

- React (SPA)
- React Router
- Redux Toolkit
- Mock API (in-memory + localStorage, задержки/ошибки)
- CSS: theme variables + base/utilities/components styles

---

## Быстрый старт

Перейди в папку `frontend`:

```bash
cd frontend
npm install
npm run dev
```

## Тестовые аккаунты (mock)

Admin: admin / admin123

User: user / user123

## Mock API и данные

Mock API реализован в src/shared/api/mock/ и хранит данные в localStorage.

## Картинки / ассеты

Изображения лежат в frontend/public/images/ и используются через пути вида:

/images/rooms/...

/images/gallery/...

/images/services/...

/images/homepage-bg.webp

## API Contract (для будущего backend)

Контракт зафиксирован здесь:

frontend/docs/api-contract.md

## Mock API поддерживает те же пути/форматы. В будущем планирую реализацию apiClient с mock на HTTP (backend), не меняя UI.

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

src/
app/ # layout, router, store
pages/ # страницы роутов
features/ # бизнес-фичи: auth, booking, admin
entities/ # сущности: room, booking
widgets/ # header/footer
shared/
api/ # apiClient + mock server/db + \*Api
ui/ # Button/Input/Card/Alert/Loader/Pagination
styles/ # theme/base/utilities/components
lib/ # storage keys, error helpers

## Назначение проекта

Проект создан в учебных целях.
