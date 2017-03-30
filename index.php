 <?php
  $time = microtime(TRUE);
  require 'dist/php/class/class.cache.php';

  define('ROOT', dirname(__FILE__));

  $Cache = new Cache(ROOT.'/dist/php/temp', 6000);

  require 'dist/php/tracking.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <link rel="icon" type="image/png" sizes="32x32" href="dist/img/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="96x96" href="dist/img/favicon/favicon-96x96.png">
  <link rel="icon" type="image/png" sizes="16x16" href="dist/img/favicon/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
  <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
  <title>Sat Tracker</title>
  <script src="dist/Cesium/Cesium.js"></script>
  <script>
    var sats = <?= $sats ?>;
  </script>
  <style>
    @import url(dist/Cesium/Widgets/widgets.css);
  </style>
  <link rel="stylesheet" href="dist/css/main.min.css">
</head>

<body>
  <div class="nav">
    <a href="about.html">ABOUT</a>
  </div>
  <div class="left_menu active">
    <img src="dist/img/logo_sattrack3.png" alt="sattrack" class="logo">
    <div class="filter">
     <div class="form-style">
       <input type="text" name="name" id="name" placeholder="Name">
     </div>
      <div class="form-style">
        <select class="text-form" name="Organisation">
          <option value="Organisation">Organisation</option>
          <option value="NASA-Office of Space Science (United States)">NASA-Office of Space Science (United States)</option>
          <option value="National Aeronautics and Space Administration (United States)">National Aeronautics and Space Administration (United States)</option>
          <option value="National Oceanic and Atmospheric Administration (United States)">National Oceanic and Atmospheric Administration (United States)</option>
          <option value="Others">Others</option>
       </select>
        <img src="dist/img/next.png" alt="options">
      </div>
        <label for="year">Launching year</label>
        <div class="range-slider"><span class="year"> 
          <input type="number" value="1959" min="1959" max="2017"/> <strong class="straight"> - </strong>
          <input type="number" value="2017" min="1959" max="2017"/></span>
          <input value="1959" min="1959" max="2017" step="1" type="range" class="but" />
          <input value="2017" min="1959" max="2017" step="1" type="range" class="but" />
        </div>
    </div>
  </div>
  <div class="exit active">
<img src="dist/img/cross.png" id="cross" alt="quit" data-open="true">
  </div>
  <div id="cesiumContainer">
    <script src="dist/js/script.min.js"></script>
  </div>
</body>

</html>
<?= round(microtime(TRUE) - $time, 3);
