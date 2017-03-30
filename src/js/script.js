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
        font: '10pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -25)
      }

    });
    this.popup = new Cesium.Entity(this.name);
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

var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (click) {
  var pickedObject = viewer.scene.pick(click.position);
  for (let i = 0; i < satellites.length; i++) {
    if (Cesium.defined(pickedObject) && (pickedObject.id == satellites[i].object)) {
      viewer.selectedEntity = satellites[i].popup;
    }
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
