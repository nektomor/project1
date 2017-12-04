<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">ET-125 Подкопаев А.И.</a>
		</div>
		<div class="navbar-collapse collapse">
			<?php
			$EFabc = new EFabc();
			global $db;
			if (!$EFabc->user->isGuest()){
				$id_user=$EFabc->user->sanitizeMySql($EFabc->user->getId());
                $result = mysqli_query($db,"SELECT * FROM users WHERE id='".$id_user."'")or die(mysql_error());
				$name=mysqli_fetch_array($result,MYSQLI_ASSOC);  
				echo '<form class="navbar-form navbar-right" role="form">
						<div class="form-group">';
				if ($EFabc->user->privateRoleOnly()){
					echo '<span style="color:white;padding-right:10px;">'.$name['secondname']." ".$name['name']." ".$name['thirdname'].": Администратор"."</span>";
				}else{
					echo '<span style="color:white;padding-right:10px;">'.$name['secondname']." ".$name['name']." ".$name['thirdname'].": Пользователь"."</span>";
				}
				echo "</div>";
				echo '<div class="form-group">';
				echo "<a href='/users/logout/' class='btn btn-default'> Выход</a>";
				echo "</div></form>";
			}else{
			?>	
			<form class="navbar-form navbar-right" action='/users/login/' method='Post' role="form">
				<div class="form-group">
					<input type="text" placeholder="Login" name='nickname' class="form-control">
				</div>
				<div class="form-group">
					<input type="password" placeholder="Password" name='password' class="form-control">
				</div>
				<button type="submit" class="btn btn-success">Войти</button>
			</form>
			<?php } ?>
		</div>
	</div>
</div>