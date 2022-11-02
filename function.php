<?php 
require_once realpath(__DIR__ . '/vendor/autoload.php');
// Looing for .env at the root directory
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Database Connaction 
$connection = new mysqli($_ENV['DB_HOST'],$_ENV['DB_USERNAME'],$_ENV['DB_PASSWORD'],$_ENV['DB_DATABASE']);
if (! $connection){
    die("Error in connection".$connection->connect_error);
}





//Function Is Used In  Common Function 


class Commonfucntion {



    public function Fetch_All_Countries($connection){
        $query = "SELECT * FROM bird_countries";
        $result = $connection->query($query);
        return $result;
    }


    public function getStatesByCountry($connection,$countryId) {
        $query = "SELECT * FROM bird_states WHERE countryId='$countryId'";
        $result = $connection->query($query);
        return $result;
    }

    public function getCityByState($connection,$stateId)
    {
        $query = "SELECT * FROM bird_cities WHERE state_id='$stateId'";
        $result = $connection->query($query);
        return $result;
    }

    public function Post_data_in_database($connection,$postdata, $image_resp){
        $table ='contact_form' ;
        $keys_data = array_keys($postdata);
        array_push($keys_data,"image_data");
        $value_data = array_values($postdata);
        array_push($value_data,json_encode($image_resp['image_data']));
        $email = $postdata['email'];
        $result = $connection->query("SELECT * FROM contact_form WHERE Email='$email'");
        if ($result->num_rows>0){
            $json_data['message'] ='Record Found in our database';
            while ($states = $result->fetch_object()) {$json_data['data'][] = $states; }
        }else{
            $json_data['message'] ='Record Successfully Created';
            $insert_data = $connection->query("INSERT INTO $table (" . implode(', ', $keys_data) . ") "
        . "VALUES ('" . implode("', '", $value_data) . "')");
        if($insert_data == '1'){
            $query = "SELECT * FROM contact_form WHERE id='$connection->insert_id'";
            $result = $connection->query($query);
            while ($states = $result->fetch_object()) {$json_data['data'][] = $states; }
        }
        }
        return $json_data;
        
     
    }
}

?>