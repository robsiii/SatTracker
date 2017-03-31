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
  skyAtmosphere: false,
  imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
  })

});

document.querySelector('.cesium-viewer-bottom').style.display = "none";

viewer.scene._screenSpaceCameraController.minimumZoomDistance = 10000000;
viewer.scene._screenSpaceCameraController.maximumZoomDistance = 300000000;

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
        radii: new Cesium.Cartesian3(70000.0, 70000.0, 70000.0),
        material: Cesium.Color.RED

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
    this.line = new Cesium.Entity({
      name: 'Line',
      position: Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], this.pos[2] * 1000),
      polyline: {
        positions: [
                Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], 0),
                Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], this.pos[2] * 1000)
            ],
        width: new Cesium.ConstantProperty(2),
        material: Cesium.Color.WHITE,
        followSurface: new Cesium.ConstantProperty(false)
      }
    });
    this.popup = document.createElement('div');
    this.popup.className = 'pop-up';
    this.popup.appendChild(document.createElement('div'));
    this.popup.children[0].className = 'pop-up-container';
    if (this.infos.country == undefined) this.popup.children[0].innerHTML = '<p class="name">' + this.name + '</p><p>Launched on the ' + this.date + '</p><p>No more data found on this satellite</p>';
    else this.popup.children[0].innerHTML = '<p class="name">' + this.name + '</p><p>Launched on the ' + this.date + '</p><p>Organisation : ' + this.infos.country + '</p><p>Mass : ' + this.infos.mass + '</p><p>' + this.infos.description + '</p>';

    this.create();
  }

  create() {
    viewer.entities.add(this.object);
  }

  draw_lines() {
    viewer.entities.add(this.line);
  }
}

var satellites = [];

for (var i = 0; i < sats.length; i++) {
  satellites.push(new sat(sats[i].name, sats[i].id, sats[i].date, sats[i].infos, sats[i].pos));
}

// LINES
var button = document.querySelector('.btn');
var lines_displayed = false;
for (let i = 0; i < satellites.length; i++) {
  satellites[i].draw_lines();
  satellites[i].line.show = false;
}
button.onclick = function () {
  if (lines_displayed) {
    for (let i = 0; i < satellites.length; i++) {
      satellites[i].line.show = false;
      lines_displayed = false;
    }
  } else {
    for (let i = 0; i < satellites.length; i++) {
      satellites[i].line.show = true;
      lines_displayed = true;
    }
  }
};

// POPUP

var last_popup;

// HANDLERS
var handler_click = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler_click.setInputAction(function (click) {
  var pickedObject = viewer.scene.pick(click.position);
  if (Cesium.defined(pickedObject)) {
    for (let i = 0; i < satellites.length; i++) {
      if (pickedObject.id === satellites[i].object && last_popup !== satellites[i].popup || pickedObject.id === satellites[i].line && last_popup !== satellites[i].popup) {
        if (last_popup !== undefined) {
          last_popup.className = 'pop-up pop-up-anim-reverse';
          setTimeout(function () {
            document.querySelector('body').removeChild(last_popup);
            last_popup = undefined;
          }, 300);
        }
        document.querySelector('body').appendChild(satellites[i].popup);
        satellites[i].popup.className = 'pop-up pop-up-anim';
        setTimeout(function () {
          last_popup = satellites[i].popup;
        }, 300);
      }
    }
  } else
  if (last_popup !== undefined) {
    last_popup.className = 'pop-up pop-up-anim-reverse';
    setTimeout(function () {
      document.querySelector('body').removeChild(last_popup);
      last_popup = undefined;
    }, 300);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

var last_hover;

var handler_hover = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler_hover.setInputAction(function (movement) {
  var pickedObject = viewer.scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject)) {
    for (let i = 0; i < satellites.length; i++) {
      if (pickedObject.id === satellites[i].object) {
        if (pickedObject.id !== last_hover) {
          if (last_hover !== undefined) last_hover._label._font._value = '10pt arial';
          satellites[i].object._label._font._value = '15pt arial';
          last_hover = satellites[i].object;
        }
      }
    }
  } else {
    if (last_hover !== undefined) {
      last_hover._label._font._value = '10pt arial';
      last_hover = undefined;
    }
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


// FILTER SLIDER

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
  el.onblur = function () {
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
  el.onkeyup = function () {
    if (event.keyCode == 13) {
      el.blur();
    }
  }
});

function filter_date(dates) {
  for (let i = 0; i < satellites.length; i++) {
    var sat_date = new Date(satellites[i].date);
    var sat_date = sat_date.getFullYear();
    if (dates[0] > sat_date || dates[1] < sat_date) {
      satellites[i].object.show = false;
      satellites[i].line.show = false;
    } else {
      satellites[i].object.show = true;
      satellites[i].line.show = true;
    }
  }
}

//  FILTER

var select_org = document.querySelector('select');

select_org.onchange = function () {
  for (let i = 0; i < satellites.length; i++) {
    if (this.value == 'Organisation') satellites[i].object.show = true;
    else {
      if (this.value == 'Others') {
        if (satellites[i].infos != 'Pas de données') {
          satellites[i].object.show = false;
          satellites[i].line.show = false;
        } else {
          satellites[i].object.show = true;
          satellites[i].line.show = true;
        }
      } else if (satellites[i].infos.country == this.value) {
        satellites[i].object.show = true;
        satellites[i].line.show = true;
      } else {
        satellites[i].object.show = false;
        satellites[i].line.show = false;
      }
    }
  }
}

var search = document.querySelector('#name');

search.onchange = function () {
  var name = this.value.toLowerCase();
  for (let i = 0; i < satellites.length; i++) {
    if (satellites[i].name.toLowerCase().includes(name)) {
      satellites[i].object.show = true;
      satellites[i].line.show = true;
    } else {
      satellites[i].object.show = false;
      satellites[i].line.show = false;
    }
  }
}
