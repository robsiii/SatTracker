<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
  <title>Sat Tracker</title>
  <script src="dist/Cesium/Cesium.js"></script>
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
        <select class="text-form" name="country">
              <option value="contry">Country</option>
              <option value="launched">France</option>
              <option value="ending">USA</option>
              <option value="status">Russia</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
        <select class="text-form" name="year">
              <option value="contry">Year</option>
              <option value="launched">2001</option>
              <option value="ending">2002</option>
              <option value="status">2003</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
        <select class="text-form" name="status">
              <option value="contry">Status</option>
              <option value="launched">GPS</option>
              <option value="ending">Photo</option>
              <option value="status">2003</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
        <select class="text-form" name="status">
              <option value="contry">Status</option>
              <option value="launched">GPS</option>
              <option value="ending">Photo</option>
              <option value="status">2003</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
      </div>
      <div class="form-style">
        <select class="text-form" name="status">
              <option value="contry">Status</option>
              <option value="launched">GPS</option>
              <option value="ending">Photo</option>
              <option value="status">2003</option>
      		  </select>
        <img src="dist/img/next.png" alt="options">
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
