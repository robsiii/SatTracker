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
      position: new Cesium.Cartesian3.fromDegrees(this.pos[0], this.pos[1], this.pos[2] * 1000),
      ellipsoid: {
        radii: new Cesium.Cartesian3(50000.0, 50000.0, 50000.0),
        material: Cesium.Color.RED,
        
      },
      label : {
        text : this.name,
        font : '10pt monospace',
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth : 2,
        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        pixelOffset : new Cesium.Cartesian2(0, -25)
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
