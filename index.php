<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html;charset=utf-8">
<style>
body{margin:0px;padding:0px;font-size:12px;font-family:Arial,Sans-serif;background-color: #EFEFEF;}
.ui_nav a:link,a:visited{color:#fff}
.ui_nav{float:left;width:200px;background-color:#666;height:100%;padding-top:10px;display:inline;}
.ui_nav a{display:block;margin-bottom:5px;padding:2px 5px;}
.ui_nav a:hover{background-color:#fff;color:#555;}
.ui_nav .title{color: #FF7300;font-size: 14px;font-weight:bold;margin-left: 5px; margin-top: 15px;}

.ui_main{margin-left:200px;padding:10px;background-color:#efefef}
.ui_com{margin:5px;padding:10px;background-color:#fff;min-height:300px;_height:300px;position:relative;}
.ui_source{margin:5px;padding:10px;background-color:#F8F8F8;color:#333;font-size:14px;list-style-type: none;}
.ui_source li{line-height:25px;}
.ui_source li span{color:#0000FF}
.ui_main .head {color: #FF7300;font-family: 微软雅黑; font-size: 14px;font-weight: bold;margin: 16px 0 4px; padding-left: 5px;background-color:#EFEFEF}
.ui_main .ui_com .head{padding:0;margin-left:-10px; height: 40px;line-height: 40px;}
.ui_call{color:#333;}
.ui_call p{margin:5px 0;}
.ui_call .comment{color:#008200}

.g-paramtable { table-layout:fixed; border-collapse: collapse; border-spacing: 0; }
.g-paramtable th, .g-paramtable td { border: 1px solid #ccc; padding: 4px; }
.g-paramtable th { background: #f8f8f8; }
</style>
<?php
$template_path = 'html/';
function processDir(&$m,$fold , $ext){
	if(is_dir($fold)){
		$dp = opendir($fold);
		while (false !== ($file = readdir($dp))) {
			
			if($file == '.' || $file == '..' ||$file == '.svn') continue;
			$_file = $fold.$file;
			if(is_dir($_file)){
				$_file .= '/';
			}elseif(!preg_match('@'.$ext.'$@sm',$file)){
				continue;
			}
			processDir($m,$_file,$ext);
		}
		closedir($dp);
	}elseif(is_file($fold)){
		array_push($m,$fold);
	}
}
function getSampleHTMLCode(){
	return htmlentities('<link rel="stylesheet" href="css/sample.css" />
<div class="ui_com">
	//TODO  write html code here , inside the node [div.ui_com]
</div>');
}

//   函数: tags
//   功能: 从文件中提取HTML标签
function tags($filename,$tag) {
   $buffer = join("",file($filename));
   $buffer = eregi_replace("\r\n","",$buffer);
   $tagkey = sql_regcase($tag);
   $buffer = eregi_replace("<$tagkey ","\n<$tag ",$buffer);
   $ar = split("\n",$buffer);

   foreach($ar as $v) {
     if(! eregi("<$tagkey ",$v)) continue;
     eregi("<$tagkey ([^>]*)((.*)</$tagkey)?",$v,$regs);
     $p[tagName] = strtoupper($tag);
     if($regs[3])
       $p[Text] = $regs[3];
     $s = trim(eregi_replace("[ \t]+"," ",$regs[1]))." ";
     $s = eregi_replace(" *= *","=",$s);

     $a = split(" ",$s);
     for($i=0;$i<count($a);$i++) {
       $ch = array();
       if(eregi("=[\"']",$a[$i])) {
         $j = $i+1;
         while(!eregi("[\"']$",$a[$i])) {
           $a[$i] .= " ".$a[$j];
           unset($a[$j]);
         }
       }
     }
     foreach($a as $k) {
       $name = strtoupper(strtok($k,"="));
       $value = strtok("\0");
       if(eregi("^[\"']",$value))
         $value = substr($value,1,-1);
       if($name)
         $p[Attrs][$name] = $value;
     }
     $pp[] = $p;
   }
   return $pp;
}

$tpls = array();
processDir($tpls,$template_path,'\.(html|shtml)');
sort($tpls);

?>
<div class="ui_nav">
	
	<a href="index.php">首页</a>
	
	<div class="title">YUI实现</div>
	<?php
		foreach($tpls as $key=>$v){
			preg_match('@[^/]*$@sm',$v,$m);
			echo("<a href=\"?tpl=js/yui/html_demo/$m[0]\">$m[0]</a>");
		}
	
	echo ('<div class="title">JQuery实现</div>');	
		foreach($tpls as $key=>$v){
			preg_match('@[^/]*$@sm',$v,$m);
			echo("<a href=\"?tpl=js/jquery/html_demo/$m[0]\">$m[0]</a>");
		}
	?>
</div>
<div class="ui_main">
		
		<h3 class="head">依赖文件：</h3>
		<?php
		if($_GET['tpl']){
			$path = $_GET['tpl'];
			$pos = strrpos($path, "/");
			$htmlpath = "html".substr($path,$pos);

			$html_code = file_get_contents($htmlpath);
			$js_code = file_exists($_GET['tpl']) ? file_get_contents($_GET['tpl']) : '';
			
			echo ('<ul class="ui_source">');
				$styles = tags($htmlpath,"link");
				foreach($styles as $key){
					$styleurl = $key[Attrs][HREF];
					echo('<li>');
					echo htmlspecialchars('<link rel="stylesheet" href=');
					echo ('<span>"'.$key[Attrs][HREF].'"</span>');
					echo htmlspecialchars('/>');
					echo('</li>');
				}
				if($js_code!=""){
					$scripts = tags($_GET['tpl'],"script");
					foreach($scripts as $key){
						echo('<li>');
						echo htmlspecialchars('<script type="text/javascript" src=');
						echo ('<span>"'.$key[Attrs][SRC].'"</span>');
						echo htmlspecialchars('></script>');
						echo('</li>');
					}
				}
			echo('</ul>');
			
			echo('<h3 class="head">Demo演示</h3>');
			echo ('<div class="ui_com">');
			echo $html_code;
			echo $js_code;
			echo('</div>');
			
			
		}else{
			echo('
				<div class="ui_com">
				<h1>组件库开发</h1>
				<p>在组件库开发中，需要往html目录新建html结构文件，往css目录增加css文件，往image目录增加图片文件</p>
				<p>html目录下的文件，参考下面的格式：</p>
				<pre style="border:1px solid #ccc;padding:5px;color:#729344">'.getSampleHTMLCode().'</pre>
				</div>
			');
		}
		?>
</div>