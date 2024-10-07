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
-- Name: meetup_participants; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.meetup_participants (
    participant_id character varying(100) NOT NULL,
    meetup_id integer NOT NULL,
    joined_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.meetup_participants OWNER TO "user";

--
-- Name: meetups; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.meetups (
    id integer NOT NULL,
    meetup_name character varying(70) NOT NULL,
    organizer_id character varying NOT NULL,
    game_id integer NOT NULL,
    location_id integer NOT NULL,
    meetup_date timestamp without time zone NOT NULL,
    description text,
    min_players smallint NOT NULL,
    max_players smallint NOT NULL,
    status character varying(25) DEFAULT 'scheduled'::character varying NOT NULL
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
    location_radius smallint,
    profile_picture character varying(250)
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
1	Catan	https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg	3	4	90	10	0	strategy	In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.
2	Codenames	https://czechgames.com/for-press/codenames/images/cn-family/codenames.jpg	2	8	15	14	0	party	The two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES.The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. Codenames: win or lose, it’s fun to figure out the clues.
3	Magic: The Gathering	https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-Logo-1993.png	2	0	20	10	0	card	In the Magic game, you play the role of a planeswalker—a powerful wizard who fights other planeswalkers for glory, knowledge, and conquest. Your deck of cards represents all the weapons in your arsenal. It contains the spells you know and the creatures you can summon to fight for you.
\.


--
-- Data for Name: locations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.locations (id, name, address, city, state, store_type) FROM stdin;
1	Turn Zero Games	3959 Wilshire Blvd ste a-9	Los Angeles	CA	Game Store
2	Paper Hero's Games	14109 Burbank Blvd	Van Nuys	CA	Game Store
3	Geeky Teas and Games	900 W Alameda Ave	Burbank	CA	Nerd Bar
4	Guildhall	3516 W Victory Blvd	Burbank	CA	Nerd_Bar
5	Fire and Dice	19801 Vanowen St	Winnetka	CA	Game Store
6	Mythic Games	561 Tyler St	Monterey	CA	Game Store
7	Tucson Games And Gadgets	5870 E Broadway Blvd #409	Tucson	AZ	Game Store
8	Polyhedron Gamestore	5825 N Oracle Rd	Tucson	AZ	Game Store
9	Isle of Games	7835 E Broadway Blvd	Tucson	AZ	Game Store
10	Games Ahoy	982 E Eisenhower Blvd	Loveland	CO	Game Store
11	Total Escape Games	6831 W 120th Ave ste C	Broomfield	CO	Game Store
12	Akihabara Arcade and Bar	8901 N Harlan St	Westminster	CO	Nerd_Bar
\.


--
-- Data for Name: meetup_participants; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.meetup_participants (participant_id, meetup_id, joined_at) FROM stdin;
f52ef2cb-b07c-455e-80c1-a720deef34d0	22	2024-10-02 17:50:17.451989
\.


--
-- Data for Name: meetups; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.meetups (id, meetup_name, organizer_id, game_id, location_id, meetup_date, description, min_players, max_players, status) FROM stdin;
22	Thing 3	f52ef2cb-b07c-455e-80c1-a720deef34d0	1	5	2024-10-07 00:18:00	TEST	2	4	scheduled
23	stuff	f52ef2cb-b07c-455e-80c1-a720deef34d0	3	4	2024-10-02 00:00:00	TEST MEETUPS	2	4	scheduled
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.migrations (name, digest) FROM stdin;
001_create_users	\\x99539f65f0c40ee8652a011b09dddf706e1311825ef10df3402d180efd632800
004_create_location	\\xef96ab97f0f1d79e4c5846471afcb3871b83fca95e89c3067e8566efccda635c
005_create_game	\\x858e11ddb548a17c1105036b3e4ad8a3cc29a66dc26b9416c24d70a1b6720997
006_create_players	\\x21a4f307f56bf8d7a45b260679d26a4a513754818f957e7fe5b3cfb4ea84bd6a
007_create_meetups	\\x08b4533e6c9c67729b46ece4b36aaa1c9dc335b1f8e15edffb1bfbd66e3d6a94
008_create_participants	\\x354dc84057489387ee5282c99c83b85b3a7a5f316c22fe1552104f29fda479b8
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.players (player_id, email, age, city, state, tags, is_verified, is_gamehost, gamehost_id, is_playtester, playtester_id, lat, lon, location_radius, profile_picture) FROM stdin;
f52ef2cb-b07c-455e-80c1-a720deef34d0	djengo_wins@example.com	\N	Tucson	AZ	strategy	t	t	0	t	0	0	0	0	/player-icons/board-buddies-icon-shiba
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (user_id, username, password, is_developer, is_player) FROM stdin;
f52ef2cb-b07c-455e-80c1-a720deef34d0	Djengo_Wins	$2b$12$qqcNtTMxcZAre6xBNt8yh.PmfW/H4g1VfN5bNEK7swnyQe2gRGEhe	f	f
6b4b1e95-1bc7-408a-8e5c-b277e33a3afb	_GhostOfCRSFToken_	$2b$12$x81IGfiUvP9m0AXN2hQPBuT9dIVk/1HDBryAnVdgQ.Rs4yW/qPPtq	f	f
e153967e-7bb1-42d1-8e6b-442470fc9a04	BrainNotFound_404	$2b$12$3ER6DVMXpK.Lgfx8foAgWe.SUpfcN1QH4sKwoTAWgV6e4rnPgX0KS	f	f
3f17c086-b382-41f4-a9b7-9224678d8390	Receipts&Recipes	$2b$12$fpbzxLLznP.rK4KR77HsTOz2T5LUF00zKfWoR9zWqrgt0UMxLCC9e	f	f
2f9e7d96-e322-4d58-a8dc-64ac3a3c612b	Death-To-Docker	$2b$12$oJ6HitP1ojR9k5haJfQIZeip0WasstBPZzi.i8zB15hLYrV5EyBy.	f	f
\.


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.games_id_seq', 3, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.locations_id_seq', 12, true);


--
-- Name: meetups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.meetups_id_seq', 23, true);


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
-- Name: meetup_participants meetup_participants_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetup_participants
    ADD CONSTRAINT meetup_participants_pkey PRIMARY KEY (participant_id, meetup_id);


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
-- Name: meetup_participants meetup_participants_meetup_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetup_participants
    ADD CONSTRAINT meetup_participants_meetup_id_fkey FOREIGN KEY (meetup_id) REFERENCES public.meetups(id) ON DELETE CASCADE;


--
-- Name: meetup_participants meetup_participants_participant_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetup_participants
    ADD CONSTRAINT meetup_participants_participant_id_fkey FOREIGN KEY (participant_id) REFERENCES public.players(player_id) ON DELETE CASCADE;


--
-- Name: meetups meetups_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id) ON DELETE SET NULL;


--
-- Name: meetups meetups_location_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_location_id_fkey FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE SET NULL;


--
-- Name: meetups meetups_organizer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.meetups
    ADD CONSTRAINT meetups_organizer_id_fkey FOREIGN KEY (organizer_id) REFERENCES public.players(player_id) ON DELETE SET NULL;


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

