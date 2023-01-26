CREATE TABLE Users(
    id serial primary key,
    username varchar(100) not null, 
    firstName varchar(100) not null,
    lastName varchar(100) not null, 
    password_ varchar(100) not null
);
