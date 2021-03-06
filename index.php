<?php
  require 'dist/php/class/class.cache.php';

  define('ROOT', dirname(__FILE__));

  $Cache = new Cache(ROOT.'/dist/php/temp', 120);

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
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
    <link href="https://fonts.googleapis.com/css?family=Lato|Roboto" rel="stylesheet">
    <script type="text/javascript">
      $(window).load(function() {
        $(".landing-container").fadeOut("slow");
      });

    </script>
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
    <div class="landing-container">
      <div class="title">
        <p>THERE ARE A LOT OF THINGS AROUND US</p>
        <div class="spinner">
          <div class="dot1"></div>
          <div class="dot2"></div>
        </div>
        <p>LOADING</p>
      </div>
    </div>
    <div class="nav">
      <span id="about-link"><a href="about.html">ABOUT</a></span>
      <span><a href="index.php"><img src="dist/img/logo.png" alt="sattrack" class="logo"></a></span>
    </div>
    <div class="left_menu active">
      <div class="filter">
        <p>Search</p>
        <div class="form-style">
          <input type="text" name="name" id="name" placeholder="Satellite's name">
        </div>
        <div class="form-style">
          <select class="text-form" name="Organisation">
          <option value="Organisation">All Organisations</option>
          <option value="NASA-Office of Space Science (United States)">NASA-Office of Space Science (United States)</option>
          <option value="National Aeronautics and Space Administration (United States)">National Aeronautics and Space Administration (United States)</option>
          <option value="National Oceanic and Atmospheric Administration (United States)">National Oceanic and Atmospheric Administration (United States)</option>
          <option value="Others">Others</option>
       </select>
          <img src="dist/img/next.png" alt="options">
        </div>
        <label for="year">Launching Year</label>
        <div class="range-slider"><span class="year"> 
          <input type="number" value="1959" min="1959" max="2017"/> <strong class="straight"> - </strong>
          <input type="number" value="2017" min="1959" max="2017"/></span>
          <input value="1959" min="1959" max="2017" step="1" type="range" class="but" />
          <input value="2017" min="1959" max="2017" step="1" type="range" class="but" />
        </div>
      </div>
    </div>
    <button class="btn">Draw lines</button>
    <div id="cesiumContainer">
      <script src="dist/js/script.min.js"></script>
    </div>
  </body>

  </html>
