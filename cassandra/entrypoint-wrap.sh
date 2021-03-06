#!/bin/bash

# Create default keyspace for single node cluster
CQL="CREATE KEYSPACE IF NOT EXISTS $CASSANDRA_KEYSPACE WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};"
# CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.folder(foods list<bigint>, name text);"
CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.social_info(username text, state text);"
CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.calorie_tracker(tracker_id int, food_id int, serving_size decimal, consumption_timestamp timestamp);"
CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.users
    (
      username text,
      name text,
      picture text,
      favorites list<bigint>,
      history list<bigint>,
      followers list<frozen<social_info>>,
      following list<frozen<social_info>>,
      calorie_tracker list<frozen<calorie_tracker>>,
      state text,
      timestamp timestamp,
      PRIMARY KEY (username)
    );"
CQL+="CREATE TYPE IF NOT EXISTS $CASSANDRA_KEYSPACE.nutrients
      (
        fat decimal,
        \"saturatedFat\" decimal,
        \"transFat\" decimal,
        cholesterol decimal,
        sodium decimal,
        carbohydrates decimal,
        fiber decimal,
        sugars decimal,
        protein decimal,
        calcium decimal,
        iron decimal,
        potassium decimal,
        calories decimal
      );"
CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.foods
      (
        \"foodId\" bigint,
        name text,
        ingredients text,
        serving_size int,
        serving_size_unit text,
        \"labelNutrients\" frozen<nutrients>,
        photo text,
        PRIMARY KEY (\"foodId\")
      );
"
CQL+="CREATE TABLE IF NOT EXISTS $CASSANDRA_KEYSPACE.stores
      (
        id int,
        longitude bigint,
        latitude bigint,
        items list<bigint>,
        PRIMARY KEY (id)
      );"
until echo $CQL | cqlsh; do
  echo "cqlsh: Cassandra is unavailable - retry later"
  sleep 2
done &

exec /docker-entrypoint.sh "$@"