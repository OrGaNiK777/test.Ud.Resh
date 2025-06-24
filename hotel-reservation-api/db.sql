-- Создаем схему базы данных, если её ещё нет
CREATE SCHEMA IF NOT EXISTS hotel;

-- Устанавливаем путь поиска по схеме на нашу новую схему
SET search_path TO hotel;

-- Таблица пользователей отеля
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор пользователя
    email VARCHAR(255) UNIQUE NOT NULL, -- Электронная почта пользователя (уникальная)
    firstname VARCHAR(255) NOT NULL, -- Имя пользователя
    lastname VARCHAR(255) NOT NULL, -- Фамилия пользователя
    isvip BOOLEAN DEFAULT FALSE, -- Признак VIP-статуса (по умолчанию false)
    created_at TIMESTAMP DEFAULT NOW(), -- Дата создания записи
    updated_at TIMESTAMP DEFAULT NOW() -- Дата последнего обновления
);

-- Таблица номеров гостиницы
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY, -- Идентификатор номера
    roomnumber INTEGER UNIQUE NOT NULL, -- Номер комнаты (уникальное значение)
    name VARCHAR(255) NOT NULL, -- Название типа номера ("стандарт", "полулюкс", "люкc")
    capacity INTEGER NOT NULL, -- Количество мест в номере
    description TEXT, -- Описание номера
    price NUMERIC(10, 2), -- Цена номера
    created_at TIMESTAMP DEFAULT NOW(), -- Дата создания записи
    updated_at TIMESTAMP DEFAULT NOW() -- Дата последнего обновления
);

-- Таблица бронирования номеров
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY, -- Уникальный идентификатор бронирования
    roomnumber INTEGER NOT NULL REFERENCES rooms (roomnumber) ON DELETE CASCADE, -- Внешний ключ на таблицу комнат
    startdate DATE NOT NULL, -- Начало срока проживания
    enddate DATE NOT NULL, -- Окончание срока проживания
    guestname VARCHAR(255), -- Имя гостя
    isvip BOOLEAN DEFAULT FALSE, -- Статус VIP бронирования
    clientid INTEGER DEFAULT 0, -- Дополнительный клиентский ID
    created_at TIMESTAMP DEFAULT NOW(), -- Дата создания записи
    updated_at TIMESTAMP DEFAULT NOW() -- Дата последнего обновления
);

-- Индексирование для оптимизации запросов по номеру комнаты и датам
CREATE INDEX IF NOT EXISTS idx_bookings_room_dates ON bookings (
    roomnumber,
    startdate,
    enddate
);

-- Индексация электронной почты для быстрого поиска
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users (email);

-- Добавляем тестовых пользователей
INSERT INTO
    users (
        email,
        firstname,
        lastname,
        isvip
    )
VALUES (
        'ivan.ivan2ov@example.com',
        'Иван',
        'Иванов',
        FALSE
    ),
    (
        'olga.pet3rova@example.com',
        'Ольга',
        'Петрова',
        TRUE
    ),
    (
        'aleksey.smi4rnov@example.com',
        'Алексей',
        'Смирнов',
        FALSE
    );

-- Добавляем тестовые номера гостиниц
INSERT INTO
    rooms (
        roomnumber,
        name,
        capacity,
        description,
        price
    )
VALUES (
        111,
        'Стандарт',
        2,
        'Уютный номер на двоих',
        3000.00
    ),
    (
        128,
        'Полулюкс',
        3,
        'Номер с дополнительным комфортом',
        4500.00
    ),
    (
        139,
        'Люкс',
        4,
        'Просторный и стильный номер',
        7000.00
    );

-- Заполняем таблицу бронирования тестовыми данными
INSERT INTO
    bookings (
        roomnumber,
        startdate,
        enddate,
        guestname,
        isvip,
        clientid
    )
VALUES (
        111,
        '2024-06-01',
        '2024-06-05',
        'Иван Иванов',
        FALSE,
        1
    ),
    (
        128,
        '2024-06-03',
        '2024-06-10',
        'Ольга Петрова',
        TRUE,
        3
    ),
    (
        139,
        '2024-06-15',
        '2024-06-20',
        'Алексей Смирнов',
        FALSE,
        2
    );

-- Проверяем содержимое таблиц
SELECT * FROM users;

SELECT * FROM rooms;

SELECT * FROM bookings;

-- Подтверждение транзакций
COMMIT;