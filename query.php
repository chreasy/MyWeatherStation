<?php
/**
 * Created by IntelliJ IDEA.
 * User: christopher.peters
 * Date: 12/04/16
 * Time: 09:13
 */



class Database_query
{
    //Public variables
    public $connected;
    public $query;
    public $results;
    public $dataArray;


    //Private variables
    private $database;
    private $hostname;
    private $username;
    private $password;
    private $port;
    private $databaseLink;
    public $pdo;


    //Constructor Database
    function __construct($hostname, $username, $password, $database, $port)
    {
        $this->hostname = $hostname;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        $this->port = $port;
        $this->connect();
    }

    //Connects Class with Database
    public function connect()
    {
//        $this -> databaseLink = mysqli_connect($this -> hostname, $this -> username , $this -> password, $this -> database, $this -> port);
//        if (mysqli_connect_error()){
//            echo "Could not connect to database\n";
//        }else{
//            echo "Connected\n";
//        }
        $this->pdo = new PDO("mysql:host={$this->hostname};dbname={$this -> database};port={$this->port}",$this->username , $this->password);
        $this->pdo->exec("set names utf8");

        $this->pdo->prepare("select id,humidity,temperature,created from measurement  where date(created) = ?");

        $this->selectQuery(3);
    }

    //Select a Query method
    public function selectQuery($date)
    {

       $this->pdo->prepare();






//        $stmt = mysqli_prepare($this->databaseLink,
//            "select id,humidity,temperature,created from measurement  where date(created) = ?");
//        if (!$stmt->bind_param("s", $date)) {
//            echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
//        }
//        $stmt->execute();
//        $stmt->bind_result($name, $code);
//        return $stmt->fetch();
    }





    //Distinct Query for Dates and special stats
    public function dates_and_stats()
    {
        $query = "SELECT date(created) cDate,min(temperature) as minTemperature,max(temperature) as maxTemperature,".
            "AVG(temperature) as avgTemperature, min(humidity) as minHumidity, max(humidity) as maxHumidity, ".
            "AVG(humidity) as avgHumidity ".
            "FROM measurement group by cDate order by cDate ";
        $results = mysqli_query($this -> databaseLink, $query);
        $dataArray = $this->fetchData($results);

        return $dataArray;
    }

    //Execute the Query
    private function fetchData($results)
    {
        $data = [];
        while ($row = mysqli_fetch_object($results) ) {
            $data[] = $row;

        }
        return $data;
    }



    //Console log Data of DB
    public function log_db()
    {
        echo "Hostname: ".$this -> hostname."\n";
        echo "Username: ".$this -> username."\n";
        echo "Password: ".$this -> password."\n";
        echo "Database: ".$this -> database."\n";
        echo "Port    : ".$this -> port."\n";
    }

}

$db = new Database_query('127.0.01','root','root','my_weather_station',8889);
$db -> log_db();
$y = $db -> dates_and_stats();


















