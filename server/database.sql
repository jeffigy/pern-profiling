CREATE DATABASE pern - profiling;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

INSERT INTO
    users(user_name, user_email, user_password)
VALUES
    ('jeff', 'jeff@gmail.com', 'jeff');