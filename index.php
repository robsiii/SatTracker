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
        <select class="text-form" name="Organisation">
          <option value="contry">Organisation</option>
          <option value="contry">NASA-Office of Space Science (United States)</option>
          <option value="contry">National Aeronautics and Space Administration (United States)</option>
          <option value="contry">National Oceanic and Atmospheric Administration (United States)</option>
          <option value="contry">Others</option>
       </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
       <label for="year">Launching year</label>
       <input type="range" name="year" min="1959" max="2017" step="1" id="year">
      </div>
    </div>
  </div>
  <div id="cesiumContainer">
    <script src="dist/js/script.min.js"></script>
  </div>
</body>

</html>
<?= round(microtime(TRUE) - $time, 3);
