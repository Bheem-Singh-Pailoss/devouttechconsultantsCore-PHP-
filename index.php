<?php  require_once realpath(__DIR__ . '/function.php');
$common = new Commonfucntion();
$allCountries = $common->Fetch_All_Countries($connection);

?>
<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="<?=$_ENV['APP_URL'];?>/vendor/twbs/bootstrap/dist/css/bootstrap.min.css " rel="stylesheet" >

    <!-- Custom Css  -->
    <link href="<?=$_ENV['APP_URL'];?>/assets/css/app.css " rel="stylesheet" >
    <!-- Fnon  Css  -->
    <link href="<?=$_ENV['APP_URL'];?>/assets/plugins/Fnon/css/fnon.min.css" rel="stylesheet" >
    <title>Hello, world!</title>
  </head>
  <body>
    <div class="container" id="container">
   
  <form method ="POST" id ="form_submition" enctype="multipart/form-data">
    <h2>Contact Us</h2>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <p id ='placeholder'></p>
          <label for="first">First Name</label>
          <!-- <input type="hidden" value="form_data" name="form_data" > -->
          <input type="text" class="form-control" placeholder=" Please Enter First Name" name="first_name" id ="first_name-error-field">
          <span class="text-danger" id="first_name-error"></span>
        </div>
      </div>
      <!--  col-md-6   -->
      <div class="col-md-6">
        <div class="form-group">
          <label for="last">Last Name</label>
          <input type="text" class="form-control" placeholder=" Please Enter Last Name" name="last_name" id ="last_name-errror-field">
          <span class="text-danger" id ="last_name-error"></span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="Email">Email </label>
          <input type="text" class="form-control" placeholder=" Please Enter Email Address" name="email" id ="email-error-filed">
          <span class="text-danger" id ="email-error"></span>
        </div>

      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label for="Email">Phone Number  </label>
          <input type="tel" class="form-control" placeholder="Please Enter Correct Phone Number" name="phone_number" id ="phone_number-error-filed">
          <span class="text-danger" id ="phone_number-error"></span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <label>Country <span style="color:red">*</span></label>
          <select class=" form-control selectpicker" name ="country" id="country-error-filed">
    
          <option value="">Choose Country</option>
          <?php
            if ($allCountries->num_rows > 0 ){
                while ($country = $allCountries->fetch_object() ) {
                    $countryId = $country->id;
                    $countryName = $country->name;?>
                    <option data-id ="<?php echo $countryId;?>"  value="<?php echo $countryName;?>"><?php echo $countryName;?></option>
                <?php }
            }
            ?>
        </select>
          <span class="text-danger" id ="country-error"></span>
        </div>
      </div>
      <div class="col-md-6" id="State__field">
        <div class="form-group">
        <label>State <span style="color:red">*</span></label>
          <select class=" form-control selectpicker" name ="state" id="state-error-filed" disabled>
          <option value="">Choose State</option>
        </select>
          <span class="text-danger" id ="state-error"></span>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group">
        <label>City  <span style="color:red">*</span></label>
          <select class=" form-control selectpicker" name ="city" id="city-error-filed" disabled>
          <option value="">Choose City</option>
        </select>
          <span class="text-danger" id ="city-error"></span>
        </div>
      </div>
      <!--  col-md-6   -->
      <div class="col-md-6">
        <div class="form-group">
          <label for="Email">Address</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="address"id ="address-error-filed"></textarea>
          <span class="text-danger" id ="address-error"></span>
        </div>
      </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
          <label for="Email">Pin Code </label>
          <input type="number" class="form-control" placeholder="Please Add the Pin Code " name="zip_Code" id ="zip_Code-error-filed">
          <span class="text-danger" id ="zip_Code-error"></span>
        </div>
      </div>
      <div>
        <label style="font-size: 14px;">
            <span style='color:navy;font-weight:bold'>Image  Instructions :</span>
        </label>
        <ul>
            <li>
                Allowed only files with extension (jpg, png, gif)
            </li>
            <li>
                Maximum number of allowed files 10 with 300 KB for each
            </li>
            <li>
                you can select files from different folders
            </li>
        </ul>
            <span id= "image_priew_errors"></span>
        <div class="form-group mt-5">
          <label for="">Choose Images</label>
          <input type="file" class="form-control" name="images[]" multiple id="upload-img" />
        </div>
        <span class="text-danger" id ="images-error"></span>
        <div class="img-thumbs img-thumbs-hidden" id="img-preview"></div>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
<!-- Bootrapp Script Cdn Link Here Start  -->
    <script src="<?=$_ENV['APP_URL'];?>/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <!--  Jquery Script Cdn End  -->
    <script src="<?=$_ENV['APP_URL'];?>/vendor/axllent/jquery/jquery.min.js"></script>

     <!-- Fnon ALert -->
    <script src="<?=$_ENV['APP_URL'];?>/assets/plugins/Fnon/js/fnon.min.js"></script>
  
    <!-- Custome Script Here -->
    <script src="<?=$_ENV['APP_URL'];?>/assets/js/app.js"></script>
    
  
    
  </body>
</html>