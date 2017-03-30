var viewer = new Cesium.Viewer('cesiumContainer', {

  fullscreenButton: false,
  baseLayerPicker: false,
  timeline: false,
  homeButton: false,
  infoBoxe: false,
  navigationHelpButton: false,
  selectionIndicator: false,
  vrButton: false,
  geocoder: false,
  sceneModePicker: false,
  animation: false,
  //  imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
  //    url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
  //  })

});

document.querySelector('.cesium-viewer-bottom').style.display = "none";

// SATELLITES

class sat {
  constructor(name, id, date, infos, pos) {
    var that = this;
    this.name = name;
    this.date = date;
    this.id = id;
    this.true_pos = pos;
    this.pos = xyzllh(pos);
    this.infos = infos;
    this.object = new Cesium.Entity({
      id: this.id,
      name: this.name,
      position: new Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], this.pos[2] * 1000),
      ellipsoid: {
        radii: new Cesium.Cartesian3(50000.0, 50000.0, 50000.0),
        material: Cesium.Color.RED,

      },
      label: {
        text: this.name,
        font: '10pt arial',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -25)
      }

    });
    this.popup = new Cesium.Entity(that.name);
    this.popup = {
      title: ''
    };
    this.popup.description = {
      getValue: function () {
        return '<div class="pop_up"><div class="exit"></div><h2>' + that.name + '</h2><p>Lauched : ' + that.date + '</p><p> Country : ' + that.infos.country + '</p><p> Function : ' + that.infos.discipline + '</p><p> Mass : ' + that.infos.mass + '</p><p>Description : ' + that.infos.description + '</p></div>';
      }
    };

    this.create();
  }

  create() {
    viewer.entities.add(this.object);
  }
}

var satellites = [];

for (var i = 0; i < sats.length; i++) {
  satellites.push(new sat(sats[i].name, sats[i].id, sats[i].date, sats[i].infos, sats[i].pos));
}

console.log(satellites);

// INFOBOX

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (click) {
  var pickedObject = viewer.scene.pick(click.position);
  for (let i = 0; i < satellites.length; i++) {
    if (Cesium.defined(pickedObject) && (pickedObject.id == satellites[i].object)) {
      viewer.selectedEntity = satellites[i].popup;
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

//  SLIDER

var parent = document.querySelector(".range-slider");

var
  rangeS = parent.querySelectorAll("input[type=range]"),
  numberS = parent.querySelectorAll("input[type=number]");

rangeS.forEach(function (el) {
  el.oninput = function () {
    var slide1 = parseFloat(rangeS[0].value),
      slide2 = parseFloat(rangeS[1].value);

    if (slide1 > slide2) {
      [slide1, slide2] = [slide2, slide1];
      // var tmp = slide2;
      // slide2 = slide1;
      // slide1 = tmp;
    }

    numberS[0].value = slide1;
    numberS[1].value = slide2;
    
    filter_date([numberS[0].value, numberS[1].value]);
  }
});

numberS.forEach(function (el) {
  el.oninput = function () {
    var number1 = parseFloat(numberS[0].value),
      number2 = parseFloat(numberS[1].value);

    if (number1 > number2) {
      var tmp = number1;
      numberS[0].value = number2;
      numberS[1].value = tmp;
    }

    rangeS[0].value = number1;
    rangeS[1].value = number2;
    
    filter_date([rangeS[0].value, rangeS[1].value]);
  }
});

function filter_date(dates) {
  for (let i = 0; i < satellites.length; i++) {
    var sat_date = new Date(satellites[i].date);
    var sat_date = sat_date.getFullYear();
    if (dates[0] > sat_date || dates[1] < sat_date) {
      satellites[i].object.show = false;
    }
    else satellites[i].object.show = true;
  }
}

// FILTER NAVBAR

var cross = document.querySelector('#cross');
var menu = document.querySelector('.left_menu');
var cross_div = document.querySelector('.exit');
cross.addEventListener('click', function(){
  if(this.getAttribute('data-open') == 'true'){
    this.setAttribute('data-open',false);
    menu.classList.remove('active');
    cross_div.classList.remove('active');
  } else {
    this.setAttribute('data-open',true);
    menu.classList.add('active');
    cross_div.classList.add('active');
  }
});