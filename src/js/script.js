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

});

var blueEllipsoid = viewer.entities.add({
  name: 'Blue ellipsoid',
  position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 400000.0),
  ellipsoid: {
    radii: new Cesium.Cartesian3(100000.0, 100000.0, 100000.0),
    material: Cesium.Color.GREEN
  }
});

document.querySelector('.cesium-viewer-bottom').style.display = "none";

class sat {
  constructor(name, id, date, infos, pos) {
    this.name = name;
    this.date = date;
    this.id = id;
    this.true_pos = pos;
    this.pos = xyzllh(pos);
    this.infos = infos;
    this.object = new Cesium.Entity({
      id: this.id,
      name: this.name,
      position: new Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], this.pos[2]),
      ellipsoid: {
        radii: new Cesium.Cartesian3(100000.0, 100000.0, 100000.0),
        material: Cesium.Color.RED
      }
    });
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
