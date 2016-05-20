<?php

//phpinfo();
/** Query data out of database */
//Create connection
$link = mysqli_connect('127.0.0.1', "root", "root", "my_weather_station",8889);

//Check for error
if (mysqli_connect_error()){
    //echo mysqli_connect_error();
    die("<br>Could not connect to database");
}

$what = @$_GET['what'];
$data = [];

$db = new Database_query('127.0.01','root','root','my_weather_station',8889);

if($what == 'values') {
  $date = @$_GET['date'];

  $data = $db -> selectQuery([$date]);
} elseif ($what == 'dates') {
     $data = $db -> dates_and_stats();
}



header('Content-type:application/json');
echo  json_encode($data); // ,JSON_NUMERIC_CHECK | JSON_FORCE_OBJECT




