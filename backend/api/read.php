<?php
/**
 * Returns the list of cpu names
 */
require 'database.php';

$sql_query = [];
$sql = "SELECT ID, Hardware, Name, Price, SKU, Info, Image, Description, Power, PCIe_Slot FROM db";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $sql_query[$i]['id']    = intval($row['ID']);
    $sql_query[$i]['hardware']    = $row['Hardware'];
    $sql_query[$i]['name']    = $row['Name'];
    $sql_query[$i]['price']    = floatval($row['Price']);
    $sql_query[$i]['sku']    = intval($row['SKU']);
    $sql_query[$i]['info']    = $row['Info'];
    $sql_query[$i]['image']    = $row['Image'];
    $sql_query[$i]['desc']    = $row['Description'];
    $sql_query[$i]['power']    = $row['Power'];
    $sql_query[$i]['pcie']    = $row['PCIe_Slot'];
    $i++;
  }

  echo json_encode($sql_query);
}
else
{
  http_response_code(404);
}