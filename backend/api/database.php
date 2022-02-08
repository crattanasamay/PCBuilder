<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', '127.0.0.1');
define('DB_USER', 'root');
define('DB_PORT', 3306);
define('DB_PASS', 'password');
define('DB_NAME', 'pc_parts');

function connect()
{


  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME, DB_PORT);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");
  
  return $connect;
}

$con = connect();