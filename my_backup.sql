--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE db_name;




--
-- Drop roles
--

DROP ROLE "user";


--
-- Roles
--

CREATE ROLE "user";
ALTER ROLE "user" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:XY4QWjYKE5hypE8ZwJoyHg==$EgEPJ5JHdFP9PkCtFAqLGL7pjdcS4iY9goXVmJU2L30=:EbAfPyoBUZNqYcS01G4/YgPk9hfvFTck+eEkVjlh3mQ=';






--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: user
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO "user";

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: user
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: user
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: user
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "db_name" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: db_name; Type: DATABASE; Schema: -; Owner: user
--

CREATE DATABASE db_name WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE db_name OWNER TO "user";

\connect db_name

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: games; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.games (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    game_image character varying(1000),
    min_players smallint NOT NULL,
    max_players smallint NOT NULL,
    game_duration smallint NOT NULL,
    min_age smallint NOT NULL,
    max_age smallint,
    tags character varying(1000) NOT NULL,
    description text
);


ALTER TABLE public.games OWNER TO "user";

--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.games_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.games_id_seq OWNER TO "user";

--
-- Name: games_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.games_id_seq OWNED BY public.games.id;


--
-- Name: locations; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.locations (
    id integer NOT NULL,
    name character varying(250) NOT NULL,
    address character varying(250) NOT NULL,
    city character varying(250) NOT NULL,
    state character varying(2) NOT NULL,
    store_type character varying(250) NOT NULL
);


ALTER TABLE public.locations OWNER TO "user";

--
-- Name: locations_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.locations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.locations_id_seq OWNER TO "user";

--
-- Name: locations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.locations_id_seq OWNED BY public.locations.id;


--
-- Name: meetups; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.meetups (
    id integer NOT NULL,
    "time" timestamp without time zone NOT NULL,
    description text,
    min_players smallint NOT NULL,
    max_players smallint NOT NULL,
    completed boolean NOT NULL
);


ALTER TABLE public.meetups OWNER TO "user";

--
-- Name: meetups_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.meetups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meetups_id_seq OWNER TO "user";

--
-- Name: meetups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.meetups_id_seq OWNED BY public.meetups.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.migrations (
    name character varying(300) NOT NULL,
    digest bytea NOT NULL
);


ALTER TABLE public.migrations OWNER TO "user";

--
-- Name: players; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.players (
    player_id character varying(100) NOT NULL,
    email character varying(255),
    age smallint,
    city character varying(100),
    state character varying(2),
    tags character varying(50),
    is_verified boolean DEFAULT false,
    is_gamehost boolean DEFAULT false,
    gamehost_id integer,
    is_playtester boolean DEFAULT false,
    playtester_id integer,
    lat double precision,
    lon double precision,
    location_radius smallint
);


ALTER TABLE public.players OWNER TO "user";

--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    user_id character varying(100) NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(100) NOT NULL,
    is_developer boolean DEFAULT false,
    is_player boolean DEFAULT false
);


ALTER TABLE public.users OWNER TO "user";

--
-- Name: games id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.games ALTER COLUMN id SET DEFAULT nextval('public.games_id_seq'::regclass);


--
-- Name: locations id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.locations ALTER COLUMN id SET DEFAULT nextval('public.locations_id_seq'::regclass);


--
-- Name: meetups id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetups ALTER COLUMN id SET DEFAULT nextval('public.meetups_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.games (id, name, game_image, min_players, max_players, game_duration, min_age, max_age, tags, description) FROM stdin;
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.locations (id, name, address, city, state, store_type) FROM stdin;
\.


--
-- Data for Name: meetups; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.meetups (id, "time", description, min_players, max_players, completed) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.migrations (name, digest) FROM stdin;
001_create_users	\\x99539f65f0c40ee8652a011b09dddf706e1311825ef10df3402d180efd632800
004_create_location	\\xef96ab97f0f1d79e4c5846471afcb3871b83fca95e89c3067e8566efccda635c
005_create_game	\\x858e11ddb548a17c1105036b3e4ad8a3cc29a66dc26b9416c24d70a1b6720997
006_create_players	\\x3b1c5218ab7b16ab681c2fdaf4919072f8569b3f35c39fa301f0db1bee005be1
007_meetup_table	\\x6dac25571c83c29eec31e6b384dc6e0520b3d3f7ef77961e718fb5bb48b43489
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.players (player_id, email, age, city, state, tags, is_verified, is_gamehost, gamehost_id, is_playtester, playtester_id, lat, lon, location_radius) FROM stdin;
0e46339e-70b4-4cfe-bce0-73a93566656a	ghostie@example.com	31	Los Angeles	CA	rpg	t	t	0	t	0	0	0	0
1805f121-f674-4b75-9186-92e59689ab23	404brain@example.com	33	Denver	CO	cooperative	t	t	0	t	0	0	0	0
5e0ca130-876e-4851-aa44-d037ae59b22a	catdaddy@example.com	50	Davis	CA	Contract Whist	t	t	0	t	0	0	0	0
e802f3cb-de56-42de-baf6-36e33468cde4	death2docker@example.com	25	Tucson	AZ	monopoly	t	t	0	t	0	0	0	0
4977eefb-03a9-4943-9c7f-184d0cf7ff82	llamamama@example.com	30	Somewhere	CA	catan	t	t	0	t	0	0	0	0
beea9e8c-0319-4736-a8b5-481c41827268	amySEIR@example.com	33	San Diego	CA	life	t	t	0	t	0	0	0	0
89e1e22f-7e7f-45b2-a6cd-2a1499485aa4	fastesthandsinthecohort@example.com	12	Denver	CO	speed	t	t	0	t	0	0	0	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (user_id, username, password, is_developer, is_player) FROM stdin;
42d56ad5-9d76-47ef-a52f-e820cf5f1517	Djengo_Wins	$2b$12$/D9racN2td9zMahIQXWn3.z2j.XpaY99jyk.MAuPGrdOgiGacRmZe	f	f
0e46339e-70b4-4cfe-bce0-73a93566656a	_GhostOfCRSFToken_	$2b$12$rqpHBh85AbIrjSZi8t3QxOalC.gBQ9X.EzQL4vURUdqMKJjIfVijm	f	f
1805f121-f674-4b75-9186-92e59689ab23	BrainNotFound_404	$2b$12$rhfLC7V.hk/c5YlpTyK0Ru9G6h56Ob9tvcX02qPWXMXPelVz81jk6	f	f
5e0ca130-876e-4851-aa44-d037ae59b22a	Receipts&Recipes	$2b$12$imavWtFN0TirOs66jx6pw.gHaiuy2TEQfaYM2kaHYNe4bFGiH4Kli	f	f
e802f3cb-de56-42de-baf6-36e33468cde4	Death-To-Docker	$2b$12$wFNa6cv5vwWvxFxcrlu38eb1TRjsawEG320JyO/xHNLWUCKq3oo0S	f	f
4977eefb-03a9-4943-9c7f-184d0cf7ff82	Llama_Mama	$2b$12$w1T38HGzKTp50hk8TSLSwuwz/onSLiblYS9CV7CkT71FL4.mfwKnK	f	f
beea9e8c-0319-4736-a8b5-481c41827268	-AmySEIRExtraordaire-	$2b$12$ckYspjlb93gXGc7wcfxLyOHdrL4ToRwWTvEkEB6YIJNaVK6VW4d62	f	f
89e1e22f-7e7f-45b2-a6cd-2a1499485aa4	Is-A-Bot-Brian	$2b$12$FZns0HNB/BaOSXpGMYCReuph2LqLJyhLDZrGPyfwB1wT7JwvHphwu	f	f
73464a3a-1172-4fc4-a8db-f74dca9ccaf0	Test_Test	$2b$12$vTModQ6IgSvjulebMxYVEOBk.U0/OFjgEe2Okt6.Hcn2Cy61hS1MC	f	f
c05329c9-3632-4b8e-a0b7-54dba9483fdc	Test_	$2b$12$kEEVtKgJb5EXjsPQfa.dJePQO.Yfyg04oDTw2lwn7Grry3ECLMWgG	f	f
f8559805-66a3-4a2c-8232-8fb690262840	-Test-	$2b$12$s3V0m4wem1K/s9uIAPLoJuR.iq.YpMseLMOTbTvlHLI53ky4e4brG	f	f
64069d82-ae08-433f-b966-b27dc569c039	Test-Test	$2b$12$jKQlKRVg02q4FB.6cRntROFqO62tmowerlATJ9xrCd6WGkVsisdi.	f	f
33592a3c-d804-4ae0-950f-eeda44cc7fe2	TestOTest	$2b$12$rzbX.0IPY2Ql9FalkVAljuOLztnLzVWwCAXIfAkbdsDVk7X509MgW	f	f
2451eb8f-ddd2-4e22-b8fb-9a6a83d488fd	admin	$2b$12$5eOf7OpM1I29co.hCzmLqeYJMxOtGdXJAw6tqmMS38GQ.0hgNRLXO	f	f
\.


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.games_id_seq', 1, false);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, false);


--
-- Name: meetups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.meetups_id_seq', 1, false);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: locations locations_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.locations
    ADD CONSTRAINT locations_pkey PRIMARY KEY (id);


--
-- Name: meetups meetups_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (name);


--
-- Name: players players_email_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_email_key UNIQUE (email);


--
-- Name: players players_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_pkey PRIMARY KEY (player_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: players players_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.players
    ADD CONSTRAINT players_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2 (Debian 14.2-1.pgdg110+1)
-- Dumped by pg_dump version 14.2 (Debian 14.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: user
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO "user";

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: user
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

