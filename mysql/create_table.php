<?
include_once('./header.php');

$sql = "CREATE TABLE IF NOT EXISTS formmail(
  idx   INT  NOT NULL AUTO_INCREMENT COMMENT '자동증가 고유번호',
  irum  VARCHAR(30)  NOT NULL COMMENT '이름',
  email VARCHAR(300) NOT NULL COMMENT '이메일',
  gaib  DATE NOT NULL COMMENT '가입일자',
  PRIMARY KEY (idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COMMENT='고객 폼메일 테이블'";
$result = mysqli_query($conn, $sql);   
if(!$result){ 
  die('테이블 생성 실패');
}
else{
  echo('테이블 생성 성공');
}
  

include_once('./footer.php');
?>