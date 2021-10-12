<?php
      $server_name = "localhost";
      $username = "root";
      $password = "W,5--hjQ";
      $conn = new mysqli($server_name, $username, $password); 

      if ($conn->connect_error) {
            die("<h1>Connection failed: </h1>" . $conn->connect_error);
      }

      $sql = "CREATE DATABASE IF NOT EXISTS form_admin_test";
      if ($conn->query($sql) === FALSE) {
            echo "<h1>Error creating database: </h1>" . $conn->error;
      }

      include "db/db_connection.php";

      $table1 = "CREATE TABLE IF NOT EXISTS categories (
            id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL
      )";

      if ($conn->query($table1) === FALSE) {
            echo "<h1>Error creating table: </h1>" . $conn->error;
      }

      $table2 = "CREATE TABLE IF NOT EXISTS gen_questions (
            id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL
      )";

      if ($conn->query($table2) === FALSE) {
            echo "<h1>Error creating table: </h1>" . $conn->error;
      }

      $table3 = "CREATE TABLE IF NOT EXISTS int_questions (
            id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL
      )";

      if ($conn->query($table3) === FALSE) {
            echo "<h1>Error creating table: </h1>" . $conn->error;
      }

      $table4 = "CREATE TABLE IF NOT EXISTS school_questions (
            id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NULL
      )";

      if ($conn->query($table4) === FALSE) {
            echo "<h1>Error creating table: </h1>" . $conn->error;
      }

      $upload_csv = "LOAD DATA INFILE '/srv/http/edu_admin_form/categories.csv' IGNORE INTO TABLE categories
                  FIELDS TERMINATED BY ','
                  LINES TERMINATED BY '\n'
                  (title)";

      $upload_categories = mysqli_query($conn, $upload_csv);

      $upload_gen_csv = "LOAD DATA INFILE '/srv/http/edu_admin_form/gen_questions.csv' IGNORE INTO TABLE gen_questions
                  FIELDS TERMINATED BY ','
                  LINES TERMINATED BY '\n'
                  (title)";

      $upload_gen_questions = mysqli_query($conn, $upload_gen_csv);

      $upload_int_csv = "LOAD DATA INFILE '/srv/http/edu_admin_form/int_questions.csv' IGNORE INTO TABLE int_questions
                  FIELDS TERMINATED BY ','
                  LINES TERMINATED BY '\n'
                  (title)";

      $upload_int_questions = mysqli_query($conn, $upload_int_csv);

      $upload_school_csv = "LOAD DATA INFILE '/srv/http/edu_admin_form/school_questions.csv' IGNORE INTO TABLE school_questions
                  FIELDS TERMINATED BY ','
                  LINES TERMINATED BY '\n'
                  (title)";

      $upload_school_questions = mysqli_query($conn, $upload_school_csv);