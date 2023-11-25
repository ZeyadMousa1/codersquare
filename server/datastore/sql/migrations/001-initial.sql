CREATE TABLE users(
    id          VARCHAR PRIMARY KEY,
    firstName   VARCHAR NOT NULL,
    lastName    VARCHAR NOT NULL,
    userName    VARCHAR NOT NULL UNIQUE,
    email       VARCHAR NOT NULL UNIQUE,
    password    VARCHAR NOT NULL
);

CREATE TABLE posts(
    id          VARCHAR PRIMARY KEY,
    title       VARCHAR NOT NULL,
    url         VARCHAR UNIQUE NOT NULL,
    userId      VARCHAR NOT NULL,
    postAt      INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE likes(
    userId VARCHAR NOT NULL,
    postId VARCHAR NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (postId) REFERENCES posts (id)
)

CREATE TABLE comments(
    id        VARCHAR PRIMARY KEY,
    comment   VARCHAR NOT NULL,
    userId    VARCHAR NOT NULL,
    postId    VARCHAR NOT NULL,
    postedAt  INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (postId) REFERENCES posts (id),
)

