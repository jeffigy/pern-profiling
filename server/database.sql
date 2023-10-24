CREATE DATABASE pern - profiling;

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    user_name VARCHAR(50) NOT NULL,
    user_email VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    PRIMARY KEY(user_id)
);

INSERT INTO
    users(user_name, user_email, user_password)
VALUES
    ('jeff', 'jeff@gmail.com', 'jeff');

CREATE TABLE persons(
    user_id UUID,
    person_id SERIAL,
    person_fname VARCHAR(50) NOT NULL,
    person_lname VARCHAR(50) NOT NULL,
    person_bday BIGINT,
    person_sex VARCHAR(6) NOT NULL,
    person_address VARCHAR(255) NOT NULL,
    PRIMARY KEY(person_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO
    persons(
        person_fname,
        person_lname,
        person_bday,
        person_sex,
        person_address
    )
VALUES
    (
        'Jeffy',
        'Evangelista',
        932832000,
        'Male',
        'Philippines'
    );