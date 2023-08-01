<?
$dbservername = 'localhost';
$dbusername = '*********';
$dbuserpassword = '*********';
$dbname  = '*********';

$conn = mysqli_connect($dbservername,$dbusername,$dbuserpassword,$dbname);
mysqli_set_charset($conn, 'utf8');

if(!$conn){
  die('데이터베이스 접속 실패');
} 
?>

