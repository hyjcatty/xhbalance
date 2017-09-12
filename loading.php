<?php
header("Content-type:text/html;charset=utf-8");
function _encode($arr)
{
  $na = array();
  foreach ( $arr as $k => $value ) {
    $na[_urlencode($k)] = _urlencode ($value);
  }
  return addcslashes(urldecode(json_encode($na)),"\r\n");
}

function _urlencode($elem)
{
  if(is_array($elem)&&(!(empty($elem)))){
    foreach($elem as $k=>$v){
      $na[_urlencode($k)] = _urlencode($v);
    }
    return $na;
  }
  if(is_array($elem)&&empty($elem)){
	  return $elem;
  }
  return urlencode($elem);
}
//$request_body = file_get_contents('php://input');
//echo $request_body;
//$payload = json_decode($request_body,true);
//echo $payload;
$key=$_GET["action"];
//echo $key;
switch ($key){
    case "XH_Balance_if_ready": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on

        $number = rand(0,10);
        $retval;
        if($number == 1){
            $retval=array(
                    'status'=>'true',
                    'auth'=>'true',
                    'msg'=>'system is loading'
            );
        }else{
            $retval=array(
                    'status'=>'false',
                    'auth'=>'true',
                    'msg'=>'software update'
            );
        }

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    default:

    break;
}