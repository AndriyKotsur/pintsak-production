CREATE DATABASE tilesdb;

CREATE TABLE type (
  id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(20) NOT NULL UNIQUE,
  url VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE tile (
  id UUID NOT NULL PRIMARY KEY,
  type_id UUID REFERENCES type(id) NOT NULL,
  title VARCHAR(30) NOT NULL UNIQUE,
  url VARCHAR(30) NOT NULL UNIQUE,
  type VARCHAR(30) NOT NULL,
  images TEXT[] NOT NULL,
  width NUMERIC(4) NOT NULL,
  height NUMERIC(4),
  thickness NUMERIC(4) NOT NULL,
  weight_per_meter NUMERIC(6,2) NOT NULL,
  pieces_per_meter NUMERIC(6,2) NOT NULL,
  color_price JSONB NOT NULL,
  is_popular BOOLEAN,
  is_available BOOLEAN
);

CREATE TABLE admin (
  uid UUID NOT NULL PRIMARY KEY,
  email VARCHAR(35) NOT NULL UNIQUE,
  password TEXT NOT NULL
);