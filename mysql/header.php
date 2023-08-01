<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formmail</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/ajax.css">
  
</head>
<body>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">IDX</th>
            <th scope="col">NAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">JOIN</th>
          </tr>
        </thead>
        <tbody>


<?
$dbservername = 'localhost';
$dbusername = '***********';
$dbuserpassword = '**********';
$dbname  = '********';

$conn = mysqli_connect($dbservername,$dbusername,$dbuserpassword,$dbname);
mysqli_set_charset($conn, 'utf8');

if(!$conn){
  die('데이터베이스 접속 실패');
}
?>

