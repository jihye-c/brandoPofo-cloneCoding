<?
include_once('./header_response.php');

$irum = $_POST['irum'];  
$email = $_POST['email'];
$date = $_POST['date'];  

$sql = "INSERT INTO `formmail`(irum, email, signup) 
VALUE ('$irum','$email','$date')";

//데이터 입력
$result = mysqli_query($conn, $sql);
if(!$result){
  die("data input failed");
};

//데이터 조회~출력
$sql = "SELECT * FROM formmail ORDER BY idx ASC";
$result = mysqli_query($conn, $sql);

$a = array();
if( mysqli_num_rows($result) > 0 ){   
  while( $row = mysqli_fetch_array($result) ){
    array_push($a, array(
      '번호'=> $row['idx'],
      '이름'=> $row['irum'],
      '이메일'=> $row['email'],
      '가입일자'=> $row['signup']
    ));
  }
}; 

$json_result = json_encode($a, JSON_UNESCAPED_UNICODE);
$filename = 'formail_list_json'.date('Ymd').'.json';
file_put_contents('../file/'.$filename, $json_result);

echo $json_result;


include_once('./footer_response.php');
?>