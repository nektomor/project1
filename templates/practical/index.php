<?php 
	$EFabc=new EFabc();
	
	if ($EFabc->route->getControll()!=="create_users_sql"){ 
	//header('X-Accel-Buffering: no');
	header("Cache-Control:no-cache,no-store, must-revalidate, max-age=0");
	header("Pragma:no-cache");
	header("Expires:0");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="ru-ru" xml:lang="ru-ru">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
	<meta http-equiv="Cache-control" content="no-cache,no-store, must-revalidate, max-age=0"> <!--,post-check=0,pre-check=0">-->
	<meta http-equiv="Pragma" content="no-cache">
	<meta http-equiv="Expires" content="0">
	<meta http-equiv="Vary" content="*">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	
	<!-- Bootstrap -->
	<link href="<?php echo $siteName; ?>/bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<link href="<?php echo $siteName; ?>/customCss/custom1.css" rel="stylesheet">
    <title></title>
	<style>
	
	</style>
 </head>
	<body>
	<?php 
		$EFabc->route->getWidget('working_panel');
		$EFabc->route->intro();
	?>
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
   <!-- Bootstrap -->
	<script src="<?php echo $siteName; ?>/bootstrap/js/bootstrap.min.js"></script>
	<script src="<?php echo $siteName; ?>/PluginPaginate/jquery-paginate.min.js"></script>
	<script src="<?php echo $siteName; ?>/customJs/custom2.js"></script>
  </body>
</html>
<?php }?>	