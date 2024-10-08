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
ALTER ROLE "user" WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:YlAMest77uZchoVSnFCfzQ==$cZDIyrAWI73vD/8UQVPeROqercQzWxgp2QLDAZL/BnM=:YndnIXssnX3OO+kcyKc2DjlM4YhuOSQy5rrIFhJ/+/g=';






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
    start_time timestamp without time zone NOT NULL,
    end_time timestamp without time zone NOT NULL,
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
-- Name: player_tags; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.player_tags (
    player_id character varying(100) NOT NULL,
    tag_id integer NOT NULL
);


ALTER TABLE public.player_tags OWNER TO "user";

--
-- Name: players; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.players (
    player_id character varying(100) NOT NULL,
    profile_picture character varying(250),
    email character varying(255),
    first_name character varying(100),
    last_name character varying(100),
    city character varying(100),
    state character varying(2),
    about_me character varying(500),
    birthdate date,
    is_verified boolean DEFAULT false,
    is_gamehost boolean DEFAULT false,
    gamehost_id integer,
    is_playtester boolean DEFAULT false,
    playtester_id integer
);


ALTER TABLE public.players OWNER TO "user";

--
-- Name: tags; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.tags (
    tag_id integer NOT NULL,
    tag_name character varying(50) NOT NULL
);


ALTER TABLE public.tags OWNER TO "user";

--
-- Name: tags_tag_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.tags_tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tags_tag_id_seq OWNER TO "user";

--
-- Name: tags_tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: user
--

ALTER SEQUENCE public.tags_tag_id_seq OWNED BY public.tags.tag_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.users (
    user_id character varying(100) NOT NULL,
    username character varying(25) NOT NULL,
    password character varying(100) NOT NULL,
    is_developer boolean DEFAULT false,
    is_player boolean DEFAULT false,
    date_joined timestamp without time zone DEFAULT CURRENT_TIMESTAMP
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
-- Name: tags tag_id; Type: DEFAULT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tags ALTER COLUMN tag_id SET DEFAULT nextval('public.tags_tag_id_seq'::regclass);


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.games (id, name, game_image, min_players, max_players, game_duration, min_age, max_age, tags, description) FROM stdin;
1	Catan	https://www.orderofgamers.com/wordpress/wp-content/uploads/2023/08/catan.jpg	3	4	90	10	0	strategy	In CATAN (formerly The Settlers of Catan), players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.
2	Codenames	https://czechgames.com/for-press/codenames/images/cn-family/codenames.jpg	2	8	15	14	0	party	The two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their CODENAMES.The teams compete to see who can make contact with all of their agents first. Spymasters give one-word clues that can point to multiple words on the board. Their teammates try to guess words of the right color while avoiding those that belong to the opposing team. And everyone wants to avoid the assassin. Codenames: win or lose, it’s fun to figure out the clues.
3	Magic: The Gathering	https://1000logos.net/wp-content/uploads/2022/10/Magic-The-Gathering-Logo-1993.png	2	0	20	10	0	card	In the Magic game, you play the role of a planeswalker—a powerful wizard who fights other planeswalkers for glory, knowledge, and conquest. Your deck of cards represents all the weapons in your arsenal. It contains the spells you know and the creatures you can summon to fight for you.
9	Mansions of Madness	https://www.orderofgamers.com/wordpress/wp-content/uploads/2013/04/mansionsofmadness.jpg	1	5	180	14	0	family	Mansions of Madness: Second Edition is a fully co-operative, app-driven board game of horror and mystery for one to five players that takes place in the same universe as Eldritch Horror and Elder Sign. Let the immersive app guide you through the veiled streets of Innsmouth and the haunted corridors of Arkham's cursed mansions as you search for answers and respite. Eight brave investigators stand ready to confront four scenarios of fear and mystery, collecting weapons, tools, and information, solving complex puzzles, and fighting monsters, insanity, and death. Open the door and step inside these hair-raising Mansions of Madness: Second Edition. It will take more than just survival to conquer the evils terrorizing this town.
7	Joking Hazard	https://playingcards.io/img/landing/joking-hazard.png	3	10	90	18	0	string	Each round, players put down cards to complete a 3-panel comic strip. The round’s judge chooses their favorite setup or punchline card to the comic, and the player that put that card down gets a point. The first player to 3 points wins the game.
4	Uno	https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000034088/ac97854c142c719f8ae843106d43511db61822eb9bdb78e2c1a98ea0ae3b6c08	2	10	90	7	0	string	Uno is the highly popular card game played by millions around the globe. This game is played by matching and then discarding the cards in one’s hand till none are left. Since its inception, there are now many versions of Uno that one can play. Here are the rules of the original or classic Uno.
5	Secret Hitler	https://cool-io.games/thumb/117.gif	5	10	45	17	0	string	In Secret Hitler, players assume the roles of liberals and fascists in the Reichstag of the Weimar Republic, with one player becoming Hitler. To win the game, both parties are set to competitively enact liberal and fascist policies respectively, or complete a secondary objective directly related to the Hitler role.
6	Clue	https://www.sfplayhouse.org/sfph/wp-content/uploads/2022/03/clue-header.png	3	6	45	8	0	string	Players roll the die/dice and move along the board's corridor spaces, or into the rooms accordingly. The objective of the game is to deduce the details of the murder, i.e. the cards in the envelope. There are six characters, six murder weapons, and nine rooms, leaving the players with 324 possibilities.
10	Wingspan	https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1054490/header.jpg?t=1726659077	1	5	70	10	0	strategy	Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. It is designed by Elizabeth Hargrave and features over 170 birds illustrated by Beth Sobel, Natalia Rojas, and Ana Maria Martinez. You are bird enthusiasts—researchers, bird watchers, ornithologists, and collectors—seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats (actions). These habitats focus on several key aspects of growth: Gain food tokens via custom dice in a birdfeeder dice tower, Lay eggs using egg miniatures in a variety of colors, Draw from hundreds of unique bird cards and play them, The winner is the player with the most points after 4 rounds.
8	Ticket to Ride	https://moonshotgamestore.com/cdn/shop/collections/Ticket_to_Ride_Shopify_Collection_Image.png?v=1674502152&width=1000	2	5	60	8	0	family	Ticket to Ride is one of the most popular modern board games of this century. Since its release in 2004, Alan R. Moon’s beloved train game of cross-country competition has sold millions of copies, inspired numerous expansions and spin-offs set in different regions across the globe, and become a firm favourite for countless players. Whether you’re setting off on your first journey or are a regular traveller looking to refresh your familiarity with its rules, this beginner’s guide is the best place to learn how to play Ticket to Ride.
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
\.


--
-- Data for Name: meetups; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.meetups (id, meetup_name, organizer_id, game_id, location_id, start_time, end_time, description, min_players, max_players, status) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.migrations (name, digest) FROM stdin;
001_create_users	\\xb3031cda9de1918490602d9335874de3a0e5ad7b576ee4063e52e43386d51053
004_create_location	\\x25a4b242bf3750c040815735b1cbec9bf394f2e070cb8fa933562c7a4a1edf34
005_create_game	\\x8422265fb9430442a58c8ee9751c003ae608bfb0eb930f0bc1d0a0ba3fbb0c81
006_create_players	\\x44419d7abdd88f6fdcecc0733d626d498c3daeccfda26bf25906b50fe240c4e3
007_create_meetups	\\x7acb0eb69d572df45848100ffbb39bb9e1bcb2bd0719cb4f06d5c5136dc1bc86
008_create_participants	\\x245946e662d826260c2c436e36190b08750c804880593ee298eb2d65e1075f0c
009_create_tags	\\x4016e2e5f4d7912095f22216c965f27dce3fe8919c793b62c7226e732c671914
010_create_player_tags	\\x17d01e390eded77266988d0434a57aac85b851633b49df955d02578db16d0713
\.


--
-- Data for Name: player_tags; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.player_tags (player_id, tag_id) FROM stdin;
\.


--
-- Data for Name: players; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.players (player_id, profile_picture, email, first_name, last_name, city, state, about_me, birthdate, is_verified, is_gamehost, gamehost_id, is_playtester, playtester_id) FROM stdin;
4c22555c-36d7-45e2-8a3f-dd21103a5648	/public/player-icons/board-buddies-icon-dog.png	classmetaza@example.com	Andrew	Maza	Philadelphia 	PA	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
ff2f1cd6-4ebd-423f-b828-9b82824df91b	/public/player-icons/board-buddies-icon-dragon.png	basejohnson@example.com	Bethany	Johnson	Somewhere	OH	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
c27ba774-90cf-4ddb-876a-5ef8d86b94df	/public/player-icons/board-buddies-icon-cat.png	doctypewang@example.com	Dongyu	Wang	Seattle	WA	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
18b585f6-8934-44e5-ae4a-b971828ea2b1	/public/player-icons/board-buddies-icon-shiba.png	djengo_wins@example.com	Jen	Wong	Tucson	AZ	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	1983-12-23	\N	\N	\N	\N	\N
5f87ce75-d7d7-49ed-a1ea-7b695d984458	/public/player-icons/board-buddies-icon-cat.png	ghostie@example.com	Axel	Mortensen	Los Angeles	CA	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	1993-09-28	\N	\N	\N	\N	\N
9ab53508-ccd6-4d4e-b42d-a5dbad8148f8	/public/player-icons/board-buddies-icon-raccoon.png	404brain@example.com	Rachel	McReynolds	Denver	CO	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	1991-05-12	\N	\N	\N	\N	\N
af8c80ac-8138-4e23-9b4c-8506b76f1883	/public/player-icons/board-buddies-icon-llama.png	death2docker@example.com	Leslie	James	Tucson	AZ	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
30d4961e-1034-4f85-9676-3ef570956635	/public/player-icons/board-buddies-icon-cat.png	catdaddy@example.com	James	Raasch	Davis	CA	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	1974-09-20	\N	\N	\N	\N	\N
85acecd0-40ef-433d-9adf-fc5b8afe7db4	/public/player-icons/board-buddies-icon-llama.png	llamamama@example.com	Aigul	Khatamova	Somewhere	CA	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	1994-07-29	\N	\N	\N	\N	\N
27c02982-f19d-4d17-9585-dc6f71965892	/public/player-icons/board-buddies-icon-dog.png	fastesthandsinthecohort@example.com	Brian	Ebert	Denver	CO	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
12e10c26-7f58-43f0-b8d6-b959c6775aa0	/public/player-icons/board-buddies-icon-penguin.png	booleanlee@example.com	Belle	Lee	New Taiwan City	AL	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
07edb360-f89b-43e2-aff3-9546d0e53e42	/public/player-icons/board-buddies-icon-dragon.png	wedidntstartthefire@example.com	Julia	Veliquette	Somewhere	OH	I’m a board game enthusiast who enjoys both strategy and fun. I love game nights with friends and trying out new games. Outside of gaming, I enjoy exploring other hobbies and connecting with fellow players.	2000-10-01	\N	\N	\N	\N	\N
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.tags (tag_id, tag_name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.users (user_id, username, password, is_developer, is_player, date_joined) FROM stdin;
18b585f6-8934-44e5-ae4a-b971828ea2b1	Djengo_Wins	$2b$12$ypNPCEngS/ogX0tHoYP0I.UCiM8raOkGxecf5SS.L72jE1.vRwx1S	\N	\N	2024-10-07 15:51:49.300561
5f87ce75-d7d7-49ed-a1ea-7b695d984458	_GhostOfCRSFToken_	$2b$12$Xr3vxpO/7Q/YqFMRPQqSPOYQBEZ/xnSMgG2NX3mnlwIA5wwzzRIOW	\N	\N	2024-10-08 09:28:32.806229
9ab53508-ccd6-4d4e-b42d-a5dbad8148f8	BrainNotFound_404	$2b$12$aiNMTGKmaYAzHVRVyYGun.UNGnlQP3U0zG5r3aZqIsvgRusePv.vK	\N	\N	2024-10-08 09:46:04.648472
30d4961e-1034-4f85-9676-3ef570956635	Receipts&Recipes	$2b$12$QqZS2hUkesvvsET.m8bV8.BaIL3p82by0LR7PMQz57qxQNWGNTxTe	\N	\N	2024-10-08 09:48:36.361454
af8c80ac-8138-4e23-9b4c-8506b76f1883	Death-To-Docker	$2b$12$0DJR/SYLd75id07TXNzfbOwg/fAlyB3saWdMLptiLZXdUzXx/VSTa	\N	\N	2024-10-08 09:52:41.471868
85acecd0-40ef-433d-9adf-fc5b8afe7db4	Llama_Mama	$2b$12$6TY7bGqiP1/radpR9IHq.u5qg0T65xlseK.y8KNWZFCiSPhC9Nhs6	\N	\N	2024-10-08 09:58:26.897214
27c02982-f19d-4d17-9585-dc6f71965892	Is-A-Bot-Brian	$2b$12$pr0q6ni6OEvXIjT.bxNOn.STErTZGIqlVZ5cxZKeBHbjwtugZt4FS	\N	\N	2024-10-08 10:04:04.53553
12e10c26-7f58-43f0-b8d6-b959c6775aa0	BooleanBabe	$2b$12$EFlg2E2l3sYbAFiay9SEw.Kf9U/OFbgFXJN4lTRWtlJsiUkuAGiiW	\N	\N	2024-10-08 10:08:27.475394
07edb360-f89b-43e2-aff3-9546d0e53e42	ThisJuliaIsOnFire!	$2b$12$8UhCjup6XgGlLxTnKVFJMublDYBJ7AA0BlEMghfVNrKP3Tj3Ur.dm	\N	\N	2024-10-08 10:14:36.25092
4c22555c-36d7-45e2-8a3f-dd21103a5648	Class_Metaza	$2b$12$VAQIEuTvTvOsPmn2KrG8Vu/AEpqVsMMW1CKc.M0Od0CZytDjMK0pq	\N	\N	2024-10-08 10:21:35.402168
ff2f1cd6-4ebd-423f-b828-9b82824df91b	Base_Johnson	$2b$12$T2l4mNM7dLi.H8IwGuS4Su.y/aTgmBKg984e7SBibuuiiwQ9ve.yG	\N	\N	2024-10-08 10:25:02.787242
c27ba774-90cf-4ddb-876a-5ef8d86b94df	Doctype_Wang	$2b$12$rME.rAg/B/nZV8Z6pQozSO5ysWo4khBSbJJIb93Wkh7J8av7cKM8u	\N	\N	2024-10-08 10:28:26.014189
\.


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.games_id_seq', 10, true);


--
-- Name: locations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.locations_id_seq', 1, false);


--
-- Name: meetups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.meetups_id_seq', 1, false);


--
-- Name: tags_tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.tags_tag_id_seq', 1, false);


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
-- Name: player_tags player_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.player_tags
    ADD CONSTRAINT player_tags_pkey PRIMARY KEY (player_id, tag_id);


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
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


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
-- Name: player_tags player_tags_player_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.player_tags
    ADD CONSTRAINT player_tags_player_id_fkey FOREIGN KEY (player_id) REFERENCES public.players(player_id);


--
-- Name: player_tags player_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.player_tags
    ADD CONSTRAINT player_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(tag_id);


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
