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
    name : 'Blue ellipsoid',
    position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 400000.0),
    ellipsoid : {
        radii : new Cesium.Cartesian3(100000.0, 100000.0, 100000.0),
        material : Cesium.Color.BLUE
    }
});

document.querySelector('.cesium-viewer-bottom').style.display = "none";

class sat {
    constructor(name) {
        this.name = name;
    }
}

var satellites = [];

//for (var i = 0; i < sats.Observatory[1].length; i++) {
//    satellites.push(new sat(sats.Observatory[1][i].Id));
//}
