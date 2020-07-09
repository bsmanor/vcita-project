
<?php


$businesstoken = 'a0a6760c5856c167553b16ec698ddbf8';
$service_id = 'biz4vc2tlwoj331e';
$start_date = '2020-07-05';
$end_date = '2020-07-10';
$business_id = '7iiiok0sxs817fz6';
$staff_id = '7vom7t6fxh9z9y23';
$first_name = 'first_name';
$last_name = 'last_name';
$email = '';
$phone = '555555555555';
$start_time = '';

$business_token = array();
$business_token[] = "Authorization: Bearer ".$businesstoken;
$business_token[] = "Content-Type: application/json";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api2.vcita.com/platform/v1/services/".$service_id."/availability?start_date=".$start_date."&end_date=".$end_date,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => $business_token,
));

$response = curl_exec($curl);

curl_close($curl);



$client_array = array(
  'first_name' => $first_name,
  'last_name' => $last_name,
  'email' => $email,
  'phone' => $phone,
  );

$data_client = json_encode($client_array);


$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api2.vcita.com/platform/v1/client",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $data_client,
  CURLOPT_HTTPHEADER => $business_token,
));

$response = curl_exec($curl);
$json = json_decode($response, true); 
curl_close($curl);
$client_id = $json['data']['client']['id'];
$token = $json['data']['token'];
echo $client_id;
echo $token;


$booking_array = array(
  'business_id' => $business_id,
  'service_id' => $service_id,
  'staff_id' => $staff_id,
  'client_id' => $client_id,
  'start_time' => $start_time,
  );

$data_booking = json_encode($booking_array);

$client_token = array();
$client_token[] = "Authorization: Bearer ".$token;
$client_token[] = "Content-Type: application/json";

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => "https://api2.vcita.com/platform/v1/scheduling/bookings",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => $data_booking,
  CURLOPT_HTTPHEADER => $client_token,
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;


?>


