# API Contract (v1)

## Auth

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

## Rooms

GET /api/rooms?status=available|reserved
GET /api/rooms/:roomId

## Bookings (auth)

GET /api/bookings
POST /api/bookings
DELETE /api/bookings/:bookingId

## Admin (admin only)

GET /api/admin/rooms/statuses
PATCH /api/admin/rooms/:roomId/status
