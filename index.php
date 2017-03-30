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
  <div class="left_menu">
    <img src="dist/img/logo_sattrack3.png" alt="sattrack" class="logo">
    <div class="filter">
     <div class="form-style">
       <input type="text" name="name" id="name" placeholder="Name">  
     </div>
      <div class="form-style">
        <select class="text-form" name="country">
              <option value="contry">Country</option>
              <option value="launched">France</option>
              <option value="ending">USA</option>
              <option value="status">Russia</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
       <label for="year">Year</label>
       <input type="range" name="year" id="year">
      </div>
      <div class="form-style">
        <label for="weight">Weight</label>
        <input type="range" name="weight" id="weight">
      </div>
     
    </div>
  </div>
  <div class="pop_up">
    <div class="exit"></div>
    <h2>JOJO le satellites</h2>
    <br>
    <p> Country : France</p>
    <br>
    <p>Lauched : 5 October 2012</p>
    <br>
    <p>Orbital period : exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <br>
    <p>Status : lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
  </div>
  <div id="cesiumContainer">
    <script src="dist/js/script.min.js"></script>
  </div>
</body>

</html>
<?= round(microtime(TRUE) - $time, 3);