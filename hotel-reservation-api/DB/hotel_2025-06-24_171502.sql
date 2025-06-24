--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-24 17:28:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 16405)
-- Name: hotel; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA hotel;


ALTER SCHEMA hotel OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16503)
-- Name: bookings; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.bookings (
    id integer NOT NULL,
    roomnumber integer NOT NULL,
    startdate date NOT NULL,
    enddate date NOT NULL,
    guestname character varying(255),
    isvip boolean DEFAULT false,
    clientid integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE hotel.bookings OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16502)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hotel.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 4833 (class 0 OID 0)
-- Dependencies: 222
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.bookings_id_seq OWNED BY hotel.bookings.id;


--
-- TOC entry 221 (class 1259 OID 16490)
-- Name: rooms; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.rooms (
    id integer NOT NULL,
    roomnumber integer NOT NULL,
    name character varying(255) NOT NULL,
    capacity integer NOT NULL,
    description text,
    price numeric(10,2),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE hotel.rooms OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16489)
-- Name: rooms_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.rooms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hotel.rooms_id_seq OWNER TO postgres;

--
-- TOC entry 4834 (class 0 OID 0)
-- Dependencies: 220
-- Name: rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.rooms_id_seq OWNED BY hotel.rooms.id;


--
-- TOC entry 219 (class 1259 OID 16476)
-- Name: users; Type: TABLE; Schema: hotel; Owner: postgres
--

CREATE TABLE hotel.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    firstname character varying(255) NOT NULL,
    lastname character varying(255) NOT NULL,
    isvip boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE hotel.users OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16475)
-- Name: users_id_seq; Type: SEQUENCE; Schema: hotel; Owner: postgres
--

CREATE SEQUENCE hotel.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE hotel.users_id_seq OWNER TO postgres;

--
-- TOC entry 4835 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: hotel; Owner: postgres
--

ALTER SEQUENCE hotel.users_id_seq OWNED BY hotel.users.id;


--
-- TOC entry 4659 (class 2604 OID 16506)
-- Name: bookings id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.bookings ALTER COLUMN id SET DEFAULT nextval('hotel.bookings_id_seq'::regclass);


--
-- TOC entry 4656 (class 2604 OID 16493)
-- Name: rooms id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.rooms ALTER COLUMN id SET DEFAULT nextval('hotel.rooms_id_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 16479)
-- Name: users id; Type: DEFAULT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.users ALTER COLUMN id SET DEFAULT nextval('hotel.users_id_seq'::regclass);


--
-- TOC entry 4827 (class 0 OID 16503)
-- Dependencies: 223
-- Data for Name: bookings; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.bookings (id, roomnumber, startdate, enddate, guestname, isvip, clientid, created_at, updated_at) FROM stdin;
3	103	2024-06-15	2024-06-20	Алексей Смирнов	f	3	2025-06-24 13:12:14.488518	2025-06-24 13:12:14.488518
5	101	2025-09-05	2026-06-27	\N	f	1	2025-06-24 09:08:44.48	2025-06-24 09:08:44.48
6	103	2025-09-05	2026-06-27	\N	t	2	2025-06-24 09:11:59.107	2025-06-24 09:11:59.107
7	104	2025-09-05	2026-06-27	\N	t	0	2025-06-24 09:24:54.638	2025-06-24 09:24:54.638
8	105	2025-09-05	2026-06-27	\N	t	0	2025-06-24 09:26:08.551	2025-06-24 09:26:08.551
9	106	2025-09-05	2026-06-27	Ольга Петрова	t	0	2025-06-24 09:28:06.584	2025-06-24 09:28:06.584
10	101	2024-06-01	2024-06-05	Иван Иванов	f	1	2025-06-24 14:32:39.062006	2025-06-24 14:32:39.062006
11	102	2024-06-03	2024-06-10	Ольга Петрова	t	3	2025-06-24 14:32:39.062006	2025-06-24 14:32:39.062006
12	103	2024-06-15	2024-06-20	Алексей Смирнов	f	2	2025-06-24 14:32:39.062006	2025-06-24 14:32:39.062006
13	107	2025-09-05	2026-06-27	Ольга Петрова	t	0	2025-06-24 09:33:08.745	2025-06-24 09:33:08.745
14	108	2025-09-05	2026-06-27	Алексей Смирнов	f	3	2025-06-24 09:34:45.126	2025-06-24 09:34:45.126
15	108	2023-09-05	2024-06-27	Ольга Петрова	t	2	2025-06-24 09:40:41.335	2025-06-24 09:40:41.335
16	103	2025-06-24	2025-06-25	Роман Бусыгин	t	15	2025-06-24 11:15:30.931	2025-06-24 11:15:30.931
17	109	1999-06-24	9999-06-25	Роман Бусыгин	t	15	2025-06-24 11:15:51.443	2025-06-24 11:15:51.443
18	109	10000-06-24	10000-06-25	Роман Бусыгин	t	15	2025-06-24 12:02:15.958	2025-06-24 12:02:15.958
19	101	2024-06-01	2024-06-05	Иван Иванов	f	1	2025-06-24 17:05:31.468164	2025-06-24 17:05:31.468164
20	102	2024-06-03	2024-06-10	Ольга Петрова	t	3	2025-06-24 17:05:31.468164	2025-06-24 17:05:31.468164
21	103	2024-06-15	2024-06-20	Алексей Смирнов	f	2	2025-06-24 17:05:31.468164	2025-06-24 17:05:31.468164
22	101	2024-06-01	2024-06-05	Иван Иванов	f	1	2025-06-24 17:07:01.733974	2025-06-24 17:07:01.733974
23	102	2024-06-03	2024-06-10	Ольга Петрова	t	3	2025-06-24 17:07:01.733974	2025-06-24 17:07:01.733974
24	103	2024-06-15	2024-06-20	Алексей Смирнов	f	2	2025-06-24 17:07:01.733974	2025-06-24 17:07:01.733974
\.


--
-- TOC entry 4825 (class 0 OID 16490)
-- Dependencies: 221
-- Data for Name: rooms; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.rooms (id, roomnumber, name, capacity, description, price, created_at, updated_at) FROM stdin;
1	101	Стандарт	2	Уютный номер на двоих	3000.00	2025-06-24 13:12:11.367453	2025-06-24 13:12:11.367453
2	102	Полулюкс	3	Номер с дополнительным комфортом	4500.00	2025-06-24 13:12:11.367453	2025-06-24 13:12:11.367453
3	103	Люкс	4	Просторный и стильный номер	7000.00	2025-06-24 13:12:11.367453	2025-06-24 13:12:11.367453
4	104	Стандарт	2	Уютный номер на двоих	3000.00	2025-06-24 14:09:54.661815	2025-06-24 14:09:54.661815
5	105	Полулюкс	3	Номер с дополнительным комфортом	4500.00	2025-06-24 14:09:54.661815	2025-06-24 14:09:54.661815
6	106	Люкс	4	Просторный и стильный номер	7000.00	2025-06-24 14:09:54.661815	2025-06-24 14:09:54.661815
7	107	Стандарт	2	Уютный номер на двоих	3000.00	2025-06-24 14:10:06.385151	2025-06-24 14:10:06.385151
8	108	Полулюкс	3	Номер с дополнительным комфортом	4500.00	2025-06-24 14:10:06.385151	2025-06-24 14:10:06.385151
9	109	Люкс	4	Просторный и стильный номер	7000.00	2025-06-24 14:10:06.385151	2025-06-24 14:10:06.385151
12	111	Стандарт	2	Уютный номер на двоих	3000.00	2025-06-24 17:06:56.118668	2025-06-24 17:06:56.118668
13	128	Полулюкс	3	Номер с дополнительным комфортом	4500.00	2025-06-24 17:06:56.118668	2025-06-24 17:06:56.118668
14	139	Люкс	4	Просторный и стильный номер	7000.00	2025-06-24 17:06:56.118668	2025-06-24 17:06:56.118668
\.


--
-- TOC entry 4823 (class 0 OID 16476)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: hotel; Owner: postgres
--

COPY hotel.users (id, email, firstname, lastname, isvip, created_at, updated_at) FROM stdin;
1	ivan.ivanov@example.com	Иван	Иванов	f	2025-06-24 13:12:06.754492	2025-06-24 13:12:06.754492
2	olga.petrova@example.com	Ольга	Петрова	t	2025-06-24 13:12:06.754492	2025-06-24 13:12:06.754492
3	aleksey.smirnov@example.com	Алексей	Смирнов	f	2025-06-24 13:12:06.754492	2025-06-24 13:12:06.754492
4	fdssdfsd@mail.ru	Роман	Бусыгин	f	2025-06-24 10:58:50.707	2025-06-24 10:58:50.707
5	fdssdfsd@ma1il.ru	Роман	Бусыгин	f	2025-06-24 10:59:32.668	2025-06-24 10:59:32.668
6	fdssdfs1d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:03:32.964	2025-06-24 11:03:32.964
7	fds1sdfs1d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:04:21.865	2025-06-24 11:04:21.865
8	fds1sdfs11d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:04:39.454	2025-06-24 11:04:39.454
9	fds11sdfs11d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:05:09.47	2025-06-24 11:05:09.47
10	fds111sdfs11d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:07:47.166	2025-06-24 11:07:47.166
11	fds1111sdfs11d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:08:24.439	2025-06-24 11:08:24.439
12	fds1111sd1fs11d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:08:50.292	2025-06-24 11:08:50.292
13	fds1111sd11fs11d@ma1il.ru	Роман	Бусыгин	t	2025-06-24 11:09:27.617	2025-06-24 11:09:27.617
14	fds1111sd11fs111d@ma1il.ru	Роман	Бусыгин	f	2025-06-24 11:11:03.646	2025-06-24 11:11:03.646
15	fds11111sd11fs111d@ma1il.ru	Роман	Бусыгин	t	2025-06-24 11:11:38.233	2025-06-24 11:11:38.233
17	ivan.ivan2ov@example.com	Иван	Иванов	f	2025-06-24 17:07:42.698664	2025-06-24 17:07:42.698664
18	olga.pet3rova@example.com	Ольга	Петрова	t	2025-06-24 17:07:42.698664	2025-06-24 17:07:42.698664
19	aleksey.smi4rnov@example.com	Алексей	Смирнов	f	2025-06-24 17:07:42.698664	2025-06-24 17:07:42.698664
\.


--
-- TOC entry 4836 (class 0 OID 0)
-- Dependencies: 222
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.bookings_id_seq', 24, true);


--
-- TOC entry 4837 (class 0 OID 0)
-- Dependencies: 220
-- Name: rooms_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.rooms_id_seq', 14, true);


--
-- TOC entry 4838 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: hotel; Owner: postgres
--

SELECT pg_catalog.setval('hotel.users_id_seq', 19, true);


--
-- TOC entry 4674 (class 2606 OID 16512)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4670 (class 2606 OID 16499)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 4672 (class 2606 OID 16501)
-- Name: rooms rooms_room_number_key; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.rooms
    ADD CONSTRAINT rooms_room_number_key UNIQUE (roomnumber);


--
-- TOC entry 4666 (class 2606 OID 16488)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4668 (class 2606 OID 16486)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4675 (class 1259 OID 16523)
-- Name: idx_bookings_room_dates; Type: INDEX; Schema: hotel; Owner: postgres
--

CREATE INDEX idx_bookings_room_dates ON hotel.bookings USING btree (roomnumber, startdate, enddate);


--
-- TOC entry 4664 (class 1259 OID 16524)
-- Name: idx_users_email; Type: INDEX; Schema: hotel; Owner: postgres
--

CREATE UNIQUE INDEX idx_users_email ON hotel.users USING btree (email);


--
-- TOC entry 4676 (class 2606 OID 16513)
-- Name: bookings bookings_room_number_fkey; Type: FK CONSTRAINT; Schema: hotel; Owner: postgres
--

ALTER TABLE ONLY hotel.bookings
    ADD CONSTRAINT bookings_room_number_fkey FOREIGN KEY (roomnumber) REFERENCES hotel.rooms(roomnumber) ON DELETE CASCADE;


-- Completed on 2025-06-24 17:28:22

--
-- PostgreSQL database dump complete
--

