<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet/less" type="text/css" href="assets/css/style.less"/>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap/dist/css/bootstrap.min.css"/>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <title>My map</title>
</head>
<body>
    <header id="header">
       <nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
		        <span class="sr-only">Toggle navigation</span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		        <span class="icon-bar"></span>
		      </button>
		      <a class="navbar-brand" href="#"><img src="assets/img/marker2.png" alt=""></a>
		    </div>

		    <div class="collapse navbar-collapse" id="menu">
		      <ul class="nav navbar-nav">
		        <li><a href="#section-form">Contribua</a></li>
		        <li><a id="pin" href="#">Sobre</a></li>
		      </ul>
		     
		      <ul class="nav navbar-nav navbar-right">
		        <li><a href="painel.php">Admin</a></li>
		      </ul>
		    </div>
		  </div>
		</nav>
    </header>

<main>
    <div class="container">
        <div class="lista">
            <h1>Lista de locais</h1>

                <!-- <div class="form-group">
                    <input type="text" id="" class="input-field">
                    <button class="btn">Enviar</button>
                </div> -->

            
        </div>

    </div>
</main>

    <script src="lib/jquery/jquery-3.2.1.min.js"></script>
    <script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="lib/less/dist/less.min.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>