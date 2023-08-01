<?
include_once('./header.php');

$irum = $_POST['irum'];  
$email = $_POST['email'];
$date = $_POST['date'];  

$sql = "INSERT INTO formmail(irum, email, gaib) 
VALUE ('$irum','$email','$date')";
$result = mysqli_query($conn, $sql);

if(!$result){
  die("테이블에 데이터 입력 실패!");
}


include_once('./footer.php');
?>