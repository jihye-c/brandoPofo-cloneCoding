
<?PHP
  include_once('./header.php');

  $sql = "SELECT * FROM formmail 
          WHERE irum LIKE '이%' 
          ORDER BY idx ASC 
          LIMIT 3"; // IDX 내림차순 정렬 데이터 조회 상위 

  $result = mysqli_query($conn, $sql);

  if( mysqli_num_rows($result) > 0 ){   
    while( $row = mysqli_fetch_array($result) ){
        echo '<tr>';
        echo '<td>'.$row['idx'].'</td>';
        echo '<td>'.$row['irum'].'</td>';
        echo '<td>'.$row['email'].'</td>';
        echo '<td>'.$row['gaib'].'</td>';
        echo '</tr>';
    }
  }     
  
  include_once('./footer.php');  
?>

