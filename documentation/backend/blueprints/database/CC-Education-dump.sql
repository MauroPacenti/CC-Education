create table admin
(
    username varchar(255) not null
        primary key,
    password varchar(255) not null,
    email    varchar(255) not null
);

create table keepers
(
    id         int auto_increment
        primary key,
    first_name varchar(50) not null,
    last_name  varchar(50) null,
    email      varchar(50) not null,
    cf         varchar(16) not null,
    phone      varchar(50) not null
);

create table `groups`
(
    id        int auto_increment
        primary key,
    minors    int not null,
    adults    int not null,
    keeper_id int not null,
    constraint keeper_id
        foreign key (keeper_id) references keepers (id)
            on delete cascade
);

create table journeys
(
    id          int auto_increment
        primary key,
    keeper_id   int         not null,
    title       varchar(30) not null,
    annotations longtext    null,
    start_date  datetime    not null,
    end_date    datetime    not null,
    constraint journeys_journey_requests_id_fk
        foreign key (keeper_id) references keepers (id)
            on delete cascade
);

create table organizations
(
    id        int auto_increment
        primary key,
    name      varchar(100) not null,
    type      varchar(100) not null,
    address   varchar(100) not null,
    phone     varchar(15)  not null,
    email     varchar(50)  not null,
    keeper_id int          not null,
    constraint organizations_keepers_id_fk
        foreign key (keeper_id) references keepers (id)
            on delete cascade
);

create table security_check
(
    old_email_code varchar(255) null,
    new_email_code varchar(255) null,
    id             int          not null
        primary key
);

create table statuses
(
    id   int         not null
        primary key,
    name varchar(10) null
);

create table info_requests
(
    id        int         not null
        primary key,
    email     varchar(50) not null,
    title     varchar(50) not null,
    content   mediumtext  not null,
    status_id int         not null,
    constraint info_requests_statuses_id_fk
        foreign key (status_id) references statuses (id)
);

create table journey_requests
(
    id                      int auto_increment
        primary key,
    keeper_id               int      not null,
    start_availability_date datetime not null,
    end_availability_date   datetime not null,
    duration                int      not null,
    status_id               int      not null,
    constraint journey_requests_keepers_id_fk
        foreign key (keeper_id) references keepers (id)
            on delete cascade,
    constraint journey_requests_statuses_id_fk
        foreign key (status_id) references statuses (id)
);


