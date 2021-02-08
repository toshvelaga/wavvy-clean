CREATE TABLE users (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name character varying(255) NOT NULL,
    user_email character varying(255) NOT NULL UNIQUE,
    user_password character varying(255) NOT NULL,
    date_created timestamp without time zone,
    reset_password_token text,
    reset_password_expires bigint
);

CREATE TABLE podcasts (
    pid SERIAL PRIMARY KEY,
    podcast_title character varying(255),
    podcast_description character varying,
    user_id uuid REFERENCES users(user_id),
    cover_artwork character varying,
    host_name character varying(255),
    date_created timestamp without time zone,
    podcast_subtitle character varying(255),
    language character varying,
    category character varying,
    website character varying,
    copyright character varying(255),
    fullname character varying(255),
    contact_email character varying(255),
    author character varying(255),
    explicit_content boolean
);

CREATE TABLE episodes (
    eid SERIAL PRIMARY KEY,
    episode_title character varying(255),
    episode_audio character varying,
    episode_description character varying,
    episode_artwork character varying,
    season_number smallint,
    episode_number smallint,
    explicit_content boolean,
    episode_contributors text[],
    search_keywords character varying[],
    episode_date_created character varying,
    episode_type text,
    user_id uuid REFERENCES users(user_id),
    pid integer REFERENCES podcasts(pid),
    audio_duration real
);

CREATE TABLE websites (
    facebook character varying PRIMARY KEY,
    twitter character varying,
    youtube character varying,
    tiktok character varying,
    pid integer UNIQUE REFERENCES podcasts(pid),
    instagram character varying,
    patreon character varying,
    cashapp character varying,
    bitcoinwallet character varying,
    itunes character varying,
    spotify character varying,
    googlepodcasts character varying,
    rssfeed character varying,
    overcast character varying,
    stitcher character varying
);