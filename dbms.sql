CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE OR REPLACE FUNCTION generate_uid(size INT) RETURNS TEXT AS $$
DECLARE
  characters TEXT := 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  bytes BYTEA := gen_random_bytes(size);
  l INT := length(characters);
  i INT := 0;
  output TEXT := '';
BEGIN
  WHILE i < size LOOP
    output := output || substr(characters, get_byte(bytes, i) % l + 1, 1);
    i := i + 1;
  END LOOP;
  RETURN output;
END;
$$ LANGUAGE plpgsql VOLATILE;



create table hotel(
	hotel_id varchar(15) primary key not null default generate_uid(15),
	hotel_name varchar(30),
	country varchar(25),
	city varchar(25),
	postal_code int,
	street varchar(25),
  	rating_stars int
);


create table customer(
	customer_id varchar(15) primary key not null default generate_uid(15),
	f_name varchar(15),
	l_name varchar(15),
	email varchar(50) unique,
	username varchar(15) unique,
	password varchar(255)
);


create table room_type(
	hotel_id varchar(15),
	room_id varchar(15) primary key not null default generate_uid(15),
	room_type varchar(15),
	price int,
	total_rooms int,
	available_rooms int,
	constraint fk_hid foreign key(hotel_id) references hotel(hotel_id) on delete set null	
);

create table review(
	review_id varchar(15) primary key not null default generate_uid(15),
	customer_id varchar(15),
	review_comment varchar(100),
	rating int,
	constraint fk_cid foreign key(customer_id) references customer(customer_id) on delete set null
);

create table bookings(
	booking_id varchar(15) primary key not null default generate_uid(15),
	customer_id varchar(15),
	hotel_id varchar(15),
	no_person int,
	cin_date date,
	cout_date date,
  	phone_no varchar(15),
	constraint fk_hid foreign key(hotel_id) references hotel(hotel_id) on delete set null,
	constraint fk_cid foreign key(customer_id) references customer(customer_id) on delete set null
);


CREATE OR REPLACE FUNCTION insert_dummy_rooms() RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO room_type (hotel_id,room_type,price,total_rooms,available_rooms)
  VALUES 
  (NEW.hotel_id,'EXECUTIVE ROOM',15000, 20, 20),
  (NEW.hotel_id,'PRIME ROOM',10000, 30, 30),
  (NEW.hotel_id,'DELUXE ROOM',7000, 40, 40);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_dummy_rooms_trigger
AFTER INSERT ON hotel
FOR EACH ROW
EXECUTE FUNCTION insert_dummy_rooms();



INSERT INTO hotel (hotel_name, country, city, postal_code, street,rating_stars)
values
	('Avari Hotel LHR', 'Pakistan', 'Lahore', 54000, 'Mall Road',4),
    ('Prince Hotel ISL', 'Pakistan', 'Islamabad', 44000, 'Aga Khan Road',5),
    ('Pearl Continental Hotel RWP', 'Pakistan', 'Rawalpindi', 46000, 'The Mall',4),
    ('Marriott Hotel ISL', 'Pakistan', 'Islamabad', 44000, 'Aga Khan Road',4),
    ('Ramada Hotel ISL', 'Pakistan', 'Islamabad', 44000, 'Club Road',5),
    ('Pearl Continental Hotel FSL', 'Pakistan', 'Faisalabad', 38000, 'Lytton Road',5),
    ('Serena Hotel FSL', 'Pakistan', 'Faisalabad', 38000, 'Club Road',4),
    ('Continental Hotel LHR', 'Pakistan', 'Lahore', 54000, 'Shadman',4),
    ('Avari Towers KHI', 'Pakistan', 'Karachi', 75530, 'Fatima Jinnah Road',3),
    ('Ramada Hotel MLT', 'Pakistan', 'Multan', 60000, 'Abdali Road',5),
    ('Heritage Luxury Suites ISL', 'Pakistan', 'Islamabad', 44000, 'Kaghan Road',5),
    ('Hotel Crown Plaza RWP', 'Pakistan', 'Rawalpindi', 46000, 'Adamjee Road',4),
    ('Hotel One ISL', 'Pakistan', 'Islamabad', 44000, 'IJP Road',3),
    ('Hotel Grand Ambassador ISL', 'Pakistan', 'Islamabad', 44000, 'Club Road',4),
    ('Mehran Hotel HYD', 'Pakistan', 'Hyderabad', 71000, 'Liaquat Road',3);



INSERT INTO customer (f_name,l_name,email,username,password)
VALUES 
	('Sibtain','Haider','sibtain.moon@gmail.com','sibbi','$2a$10$4S2.JjY.jP/KVmi48mIo7uAHtbBN/nJlH9Zm9HduGVcUZEE66ASSaa');


insert into review (customer_id,review_comment, rating)
values 
	('qpbz9j0cS4d4Pwu','One of the best hotels available at a very reasonable price',4),
	('CqUuT531GEWPMxT','Very happy to find all hotel options under one roof',5),
	('ro6CNLBssTSUSwp','Very good services',4);

CREATE OR REPLACE VIEW reviews AS
SELECT email,f_name,l_name,review_comment,rating FROM customer, review WHERE review.customer_id = customer.customer_id;
SELECT * FROM  reviews;