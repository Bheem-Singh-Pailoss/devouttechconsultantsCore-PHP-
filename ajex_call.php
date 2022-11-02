<?php
require_once realpath(__DIR__ . '/function.php');
$common = new Commonfucntion();
if (isset($_POST['getStatesByCountry']) == "getStatesByCountry") {
    $statesData = '<option value="">Choose State</option>';
    $countryId = $_POST['countryId'];

    $allStates = $common->getStatesByCountry($connection,$countryId);
    if ($allStates->num_rows>0){
        while ($states = $allStates->fetch_object()) {
            $stateId = $states->id;
            $stateName = $states->statename;
            $statesData .= '<option data-id="'.$stateId.'" value="'.$stateName.'">'.$stateName.'</option>';
        }
    }
    echo "test^".$statesData;
}

if (isset($_POST['getCityByState']) == "getCityByState") {
    $cityData = '<option value="">Choose City</option>';
    $stateId = $_POST['stateId'];
    $allCity = $common->getCityByState($connection,$stateId);
    if ($allCity->num_rows>0){
        while ($city = $allCity->fetch_object()) {
            $cityId = $city->id;
            $cityName = $city->cityName;
            $cityData .= '<option  data-id="'.$cityId.'" value="'.$cityName.'">'.$cityName.'</option>';
        }
    }
    echo "test^".$cityData;
}

if (isset($_POST)) {
    $errors = [];
    if (empty($_POST['first_name'])) {
        $errors['first_name'] = ' First Name is required.';
    }
    if (empty($_POST['last_name'])) {
        $errors['last_name'] = ' Last Name is required.';
    }
    if (empty($_POST['email'])) {
        $errors['email'] = ' Email  is required.';
    }
    else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
        $errors['email'] = 'Invalid email format';
    }
    if (empty($_POST['phone_number'])) {
        $errors['phone_number'] = ' Phone Number is required.';
    }elseif (!preg_match('/^\d{10}$/', $_POST['phone_number'])) {
        $errors['phone_number'] = 'Please enter phone number as ##########';
    }
    if (empty($_POST['country'])) {
        $errors['country'] = ' Please Select the Country .';
    }
    if (empty($_POST['state'])) {
        $errors['state'] = ' Please Select the State .';
    }
    if (empty($_POST['city'])) {
        $errors['city'] = ' Please Select the City .';
    }
    if (empty($_POST['address'])) {
        $errors['address'] = 'Please Fill Up the Addess Details .';
    }
    if (empty($_POST['zip_Code'])) {
        $errors['zip_Code'] = 'Please Enter the zip code  .';
    }elseif (!preg_match('/^\d{5}$/', $_POST['zip_Code'])) {
        $errors['zip_Code'] = 'Please enter your zip code as #####.<br />"';
    }
    $fileNames = array_filter($_FILES['images']['name']); 
    if(empty($fileNames)){ 
        $errors['images'] = 'Please Choose  Images';
    } 

    if (!empty($errors)) {
        $data['status'] = 'false';
        $data['message'] = null;
        $data['errors'] = $errors;
    }else{
        $image_resp = Upload_images($_FILES);
        $response = $common->Post_data_in_database($connection ,$_POST, $image_resp);
        $data['status'] = 'true'; 
        $data['message'] = $response['message']; 
        $data['data'] = $response['data'];
    }
    echo json_encode($data);
}

function Upload_images($image_data){
        $allowTypes = array('jpg','png','jpeg','gif'); 
        foreach($image_data['images']['name'] as $key=>$val){ 
            $fileName= basename($image_data['images']['name'][$key]);
            $file_Name =  random_strings(20);
            $extension = pathinfo($fileName, PATHINFO_EXTENSION);
            $targetFilePath  = "Uplaods/" . $file_Name .".".$extension; 
            $image_resp['image_data'][] = $file_Name .".".$extension;
            $image_resp['message'][] =  (move_uploaded_file($image_data["images"]["tmp_name"][$key], $targetFilePath)) ? 'Images Uplaod Successfully' : '' ;
    }
    return $image_resp;
}



function random_strings($length_of_string)
{
    return substr(str_shuffle('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'),0, $length_of_string);
}