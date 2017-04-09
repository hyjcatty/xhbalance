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
function getfiles($path,$type){
    $ret = array();
    if(!file_exists($path)) return $ret;
    foreach(glob($path."/*".$type) as $afile){
        if(is_dir($afile))
        {
            //getfiles($afile.'/*.'.$type);
        } else {
            //echo $afile.'<br />';
            $json_string = file_get_contents($afile);
            //echo print_r($json_string,true);            //打印文件的内容
            //echo "<br>";

            $obj=json_decode($json_string,true);
            //print_r($obj);
            //echo '<br>'.$obj['name'];
            //echo '<br>'.$obj['icon'];
            //echo '<br>'.$obj['owner'];
            //echo '<br>'.$obj['description'];

            $map= array(
                'name'=>$obj['name'],
                'icon'=>$obj['icon'],
                'owner'=>$obj['owner'],
                'description'=>$obj['description']
            );
            array_push($ret,$map);
        }
    }
    return $ret;
}
function geticonlist(){
    $path="./svg/";
    $type=".svg";
    $ret = array();
    if(!file_exists($path)) return $ret;
    foreach(glob($path."/*".$type) as $afile){
        if(is_dir($afile))
        {
            //getfiles($afile.'/*.'.$type);
        } else {
            array_push($ret,basename($afile));
        }
    }
    return $ret;
}
function getfiledetail($path){
    $ret = "";
    if(!file_exists($path)) return "";
    $afile=$path;
    $json_string = file_get_contents($afile);
    return $json_string;
}
function get_file_list($dir,$type){
    $ret = array();
    if(!file_exists($ff)) $ret;
    $handle = opendir($ff);
    $i=0;
    while(false !== $file=(readdir($handle))){
        if($file !== "." && $file!=".."){
            $i++;
        }
    }
    return $i;
}
$request_body = file_get_contents('php://input');
//echo $request_body;
$payload = json_decode($request_body,true);
//echo $payload;
$key=$payload["action"];
//echo $key;
switch ($key){
    case "XH_Balance_Login": //Use Wechat to login the Server, response is the userID in system.
    /*
         var body = {
                        username:username,
                        password:password};
         var map={
         action:"HCU_Wechat_Bonding",
         type:"query",
         body: body,
         user:"null"
         };
        * */
            $body=$payload["body"];

            $user=array(
                'username'=> $body["username"],
                'userid'=>'123123123'
            );
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'ret'=>$user,
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_test": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on

        $retarray = getfiles("./json",".json");
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$retarray,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_config_list": //Query How many lock is autherized to user,response is a list of StatCode and Name and Location and so on

        $retarray = getfiles("./json",".json");
        $basearray = getfiles("./json/base",".json");
        $ret=array(
            'configure'=>$retarray,
            'base'=>$basearray
        );
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$ret,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_config_detail":
        $body=$payload["body"];
        $file_name=$body["file"];
        $type=$body["type"];
        $retarray;
        if($type!="base"){
            $retarray = getfiledetail("./json/".$file_name.".json");}
        else{
            $retarray = getfiledetail("./json/base/".$file_name.".json");
        }
         $obj=json_decode($retarray,true);
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$obj,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_get_svg_list":
        /*
             var map={
             action:"XH_Balance_get_svg_list",
             type:"query",
             user:"null"
             };
            * */
        $retarray = geticonlist();
        //$obj=json_decode($retarray,true);
        $retval=array(
            'status'=>'true',
            'auth'=>'true',
            'ret'=>$retarray,
            'msg'=>''
        );

        $jsonencode = _encode($retval);
        echo $jsonencode; break;
    case "XH_Balance_Run": //Use Wechat to login the Server, response is the userID in system.
        /*
         var body = {
                        action:"start" // or stop
         };
         var map={
            action:"XH_Balance_Run",
            type:"query",
            body: body,
            user:"null"
         };
        * */
            $body=$payload["body"];
            $sta='true';
            $retval=array(
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_status": //Use Wechat to login the Server, response is the userID in system.
            /*
             var map={
                action:"XH_Balance_status",
                type:"query",
                user:"null"
             };

             this.colorlist={
                             RED:"#d95349",
                             ORANGE:"#f0ad4e",
                             BLUE:"#3498db",
                             GREEN:"#26b99a",
                             GRAY:"#73879c",
                             PURPLE:"#9B59B6",
                             LBLUE:"#5bc0de",
                             LGREEN:"#5cb85c",
                             LGRAY:"#2a3f54",
                             DBLUE:"#34495e"
                         };
                         let showlist= {
                             statusdetail: {
                                 status: "123",
                                 warning: "123",
                                 error: "123"
                             },
                             mainvalue: [{value: 179, color: "RED"}, {value: 179, color: "RED"}, {value: 179, color: "RED"}, {
                                 value: 179,
                                 color: "RED"
                             }, {value: 179, color: "RED"}, {value: 179, color: "RED"}],
                             detailvalue: [{value: 179, color: "RED", subvalue: "3%", subcolor: "RED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                 {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"}
                             ],
                             lightboard: [
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "RED", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true}
                             ]
                         };
            * */
            $colorlist= array('RED','ORANGE','BLUE','GREEN','GRAY','PURPLE','LBLUE','LGREEN','LGRAY','DBLUE');
            $statusdetail=array(
                'status'=>(string)rand(0,999),
                'warning'=>(string)rand(0,999),
                'error'=>(string)rand(0,999)
            );
            $mainvalue=array();
            for($i=0;$i<6;$i++){
                $temp=array(
                    'value'=>(string)rand(0,250),
                    'color'=>$colorlist[rand(0,9)]
                );
                array_push($mainvalue,$temp);
            }
            $detailvalue=array();
            for($i=0;$i<8;$i++){
                $temp=array(
                    'value'=>(string)rand(0,250),
                    'color'=>$colorlist[rand(0,9)],
                    'subvalue'=>(string)rand(0,100)."%",
                    'subcolor'=>$colorlist[rand(0,9)]
                );
                array_push($detailvalue,$temp);
            }
            $ret=array(
                'statusdetail'=>$statusdetail,
                'mainvalue'=>$mainvalue,
                'detailvalue'=>$detailvalue
            );
            $sta='true';
            $retval=array(
                'ret'=>$ret,
                'status'=>$sta,
                'auth'=>'true',
                'msg'=>'12345'
            );

            $jsonencode = _encode($retval);
            echo $jsonencode; break;
    case "XH_Balance_light": //Use Wechat to login the Server, response is the userID in system.
                /*
                 var map={
                    action:"XH_Balance_status",
                    type:"query",
                    user:"null"
                 };

                 this.colorlist={
                                 RED:"#d95349",
                                 ORANGE:"#f0ad4e",
                                 BLUE:"#3498db",
                                 GREEN:"#26b99a",
                                 GRAY:"#73879c",
                                 PURPLE:"#9B59B6",
                                 LBLUE:"#5bc0de",
                                 LGREEN:"#5cb85c",
                                 LGRAY:"#2a3f54",
                                 DBLUE:"#34495e"
                             };
                             let showlist= {
                                 statusdetail: {
                                     status: "123",
                                     warning: "123",
                                     error: "123"
                                 },
                                 mainvalue: [{value: 179, color: "RED"}, {value: 179, color: "RED"}, {value: 179, color: "RED"}, {
                                     value: 179,
                                     color: "RED"
                                 }, {value: 179, color: "RED"}, {value: 179, color: "RED"}],
                                 detailvalue: [{value: 179, color: "RED", subvalue: "3%", subcolor: "RED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"},
                                     {value: 179, color: "RED", subvalue: "3%", subcolor: "GREED"}
                                 ],
                                 lightboard: [
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "RED", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true},
                                    {note: "NO ERROR", colorbrick: "BLUE",blingbrick:true, colornote: "PURPLE", blingnote:false,colorcircle: "LGREEN",blingcircle:true}
                                 ]
                             };
                * */
                $colorlist= array('RED','ORANGE','BLUE','GREEN','GRAY','PURPLE','LBLUE','LGREEN','LGRAY','DBLUE');

                $lightboard=array();
                for($i=0;$i<16;$i++){
                    $blingbrick = false;
                    if(rand(0,1) == 1 )$blingbrick = true;
                    $blingnote = false;
                    if(rand(0,1) == 1 )$blingnote = true;
                    $blingcircle = false;
                    if(rand(0,1) == 1 )$blingcircle = true;
                    $temp=array(
                        'note'=>(string)rand(0,1)." ERROR",
                        'colorbrick'=>$colorlist[rand(0,9)],
                        'blingbrick'=>$blingbrick,
                        'colornote'=>$colorlist[rand(0,9)],
                        'blingnote'=>$blingnote,
                        'colorcircle'=>$colorlist[rand(0,9)],
                        'blingcircle'=>$blingcircle
                    );
                    array_push($lightboard,$temp);
                }
                $ret=array(
                    'lightboard'=>$lightboard
                );
                $sta='true';
                $retval=array(
                    'ret'=>$ret,
                    'status'=>$sta,
                    'auth'=>'true',
                    'msg'=>'12345'
                );

                $jsonencode = _encode($retval);
                echo $jsonencode; break;
	default:

	break;
}


?>