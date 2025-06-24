# Приложение для бронирования номеров

## hotel-reservation-api (Backend)

Стек: PostgreSQL, Express.js, SQL, Node.js
Dump и скрипты инициализации базы данных находятся в папке DB в корне hotel-reservation-api

### Руководство по обращению к API для тестирования

#### Добавить гостя

Добавляем нового гостя в систему.

curl -X POST \\
-H "Content-Type: application/json" \\
-d '{
       "email": "luchshiy.kondidat@example.com",
       "firstName": "Лучший",
       "lastName": "Кондидат"
    }' \\
http://localhost:3000/api/users/register

#### Показать гостя по ID

Просмотр профиля конкретного гостя по его ID.

curl -X GET \\
-H "Content-Type: application/json" \\
-d '{}' \\
http://localhost:3000/api/users/{guest_id}

Замените {guest_id} на реальный идентификатор пользователя.

#### Дать гостю VIP статус по email

Назначение VIP-статуса пользователю по его email.

curl -X POST \\
-H "Content-Type: application/json" \\
-d '{
       "email": "luchshiy.kondidat@example.com",
       "isVip": true
    }' \\
http://localhost:3000/api/users/patchvip

#### Показать все комнаты

Отображение полного списка комнат в отеле.

curl -X GET \\
-H "Content-Type: application/json" \\
-d '{}' \\
http://localhost:3000/api/rooms

#### Показать свободные комнаты за период

Получаем список свободных комнат на указанную дату.

curl -X GET \\
-H "Content-Type: application/json" \\
-d '{
       "startDate": "2025-05-01",
       "endDate": "2025-05-02"
    }' \\
http://localhost:3000/api/rooms/available

#### Забронировать комнату

Создание новой брони для конкретной комнаты и гостя.

curl -X POST \\
-H "Content-Type: application/json" \\
-d '{
       "roomNumber": 111,
       "startDate": "2025-05-01",
       "endDate": "2025-05-02",
       "clientId": 2
    }' \\
http://localhost:3000/api/bookings/postbrok

#### Показать все брони

Просмотр текущего списка забронированных комнат.

curl -X GET \\
-H "Content-Type: application/json" \\
-d '{}' \\
http://localhost:3000/api/bookings/getall

#### Отменить бронь комнаты по ID

Удаляем существующую бронь по её идентификатору.

curl -X DELETE \\
-H "Content-Type: application/json" \\
-d '{}' \\
http://localhost:3000/api/bookings/{booking_id}

Замените {booking_id} на реальный идентификатор брони.

## hotel-reservation-frontend (Frontend) 
В разработке.
Стек: React.js