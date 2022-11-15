CREATE TABLE public."user"
(
    id          uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    kratos_id   uuid                                  NOT NULL UNIQUE,
    email       text,
    password    text,
    name        character varying(128),
    type        character varying(80),
    secret      character varying(128),
    website     character varying(128),
    affiliation character varying(128),
    country     character varying(32),
    bracket     character varying(32),
    hidden      boolean,
    banned      boolean,
    verified    boolean,
    team_id     uuid,
    created     timestamp without time zone
);

CREATE TABLE public.team
(
    id          uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name        character varying(128),
    email       text,
    password    text,
    secret      character varying(128),
    website     character varying(128),
    affiliation character varying(128),
    country     character varying(32),
    bracket     character varying(32),
    hidden      boolean,
    banned      boolean,
    created     timestamp without time zone,
    captain_id  uuid REFERENCES "user" (id)
);


ALTER TABLE public.user
    ADD CONSTRAINT fk_user_team FOREIGN KEY (team_id) REFERENCES public."team" (id);

CREATE TABLE public.challenge
(
    id              uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name            character varying(80),
    description     text,
    max_attempts    integer,
    value           integer,
    type            character varying(80),
    state           character varying(80)                 NOT NULL,
    requirements    json,
    connection_info text,
    next_id         uuid references challenge
);

CREATE TABLE public.award
(
    id           uuid                  DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id      uuid REFERENCES "user" (id),
    team_id      uuid REFERENCES team (id),
    name         character varying(80),
    description  text,
    date         timestamp without time zone,
    value        integer,
    icon         text,
    requirements json,
    type         character varying(80) DEFAULT 'standard'::character varying
);

CREATE TABLE public.config
(
    id    uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    key   text,
    value text
);

CREATE TABLE public.dynamic_challenge
(
    id      uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    initial integer,
    minimum integer,
    decay   integer
);

CREATE TABLE public.field
(
    id          uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name        text,
    type        character varying(80),
    field_type  character varying(80),
    description text,
    required    boolean,
    public      boolean,
    editable    boolean
);

CREATE TABLE public.field_entry
(
    id       uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type     character varying(80),
    value    json,
    field_id uuid REFERENCES field (id),
    user_id  uuid REFERENCES "user" (id),
    team_id  uuid REFERENCES team (id)
);

CREATE TABLE public.flag
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    challenge_id uuid REFERENCES challenge (id),
    type         character varying(80),
    content      text,
    data         text
);

CREATE TABLE public.hint
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type         character varying(80),
    challenge_id uuid REFERENCES challenge (id),
    content      text,
    cost         integer,
    requirements json
);

CREATE TABLE public.notification
(
    id      uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    title   text,
    content text,
    date    timestamp without time zone,
    user_id uuid REFERENCES "user" (id),
    team_id uuid REFERENCES team (id)
);

CREATE TABLE public.page
(
    id            uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    title         character varying(80),
    route         character varying(128) UNIQUE,
    content       text,
    draft         boolean,
    hidden        boolean,
    auth_required boolean,
    format        character varying(80)
);

CREATE TABLE public.file
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type         character varying(80),
    location     text,
    challenge_id uuid REFERENCES challenge (id),
    page_id      uuid REFERENCES page (id)
);

CREATE TABLE public.tag
(
    id   uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    name text UNIQUE
);

CREATE TABLE public.challenge_tag
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    challenge_id uuid REFERENCES challenge (id),
    tag_id       uuid REFERENCES tag (id)
);

CREATE TABLE public.comment
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type         character varying(80),
    content      text,
    date         timestamp without time zone,
    author_id    uuid REFERENCES "user" (id),
    challenge_id uuid REFERENCES challenge (id),
    user_id      uuid REFERENCES "user" (id),
    team_id      uuid REFERENCES team (id),
    page_id      uuid REFERENCES page (id)
);

CREATE TABLE public.solve
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    challenge_id uuid REFERENCES challenge (id),
    user_id      uuid REFERENCES "user" (id),
    team_id      uuid REFERENCES team (id)
);

ALTER TABLE ONLY public.solve
    ADD CONSTRAINT solves_challenge_id_team_id_key UNIQUE (challenge_id, team_id);

ALTER TABLE ONLY public.solve
    ADD CONSTRAINT solves_challenge_id_user_id_key UNIQUE (challenge_id, user_id);

CREATE TABLE public.submission
(
    id           uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    challenge_id uuid REFERENCES challenge (id),
    user_id      uuid REFERENCES "user" (id),
    team_id      uuid REFERENCES team (id),
    ip           character varying(46),
    provided     text,
    type         character varying(32),
    date         timestamp without time zone
);

CREATE TABLE public.token
(
    id         uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type       character varying(32),
    user_id    uuid REFERENCES "user" (id),
    created    timestamp without time zone,
    expiration timestamp without time zone,
    value      uuid DEFAULT public.gen_random_uuid() UNIQUE
);

CREATE TABLE public.tracking
(
    id      uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    type    character varying(32),
    ip      character varying(46),
    user_id uuid REFERENCES "user" (id),
    date    timestamp without time zone
);

CREATE TABLE public.unlock
(
    id      uuid DEFAULT public.gen_random_uuid() NOT NULL PRIMARY KEY,
    user_id uuid REFERENCES "user" (id),
    team_id uuid REFERENCES team (id),
    target  integer,
    date    timestamp without time zone,
    type    character varying(32)
);

ALTER TABLE ONLY public.dynamic_challenge
    ADD CONSTRAINT dynamic_challenge_id_fkey FOREIGN KEY (id) REFERENCES public.challenge (id) ON DELETE CASCADE;

ALTER TABLE ONLY public.solve
    ADD CONSTRAINT solves_id_fkey FOREIGN KEY (id) REFERENCES public.submission (id) ON DELETE CASCADE;