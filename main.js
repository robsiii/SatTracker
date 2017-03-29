var viewer = new Cesium.Viewer('cesiumContainer');

var citizensBankPark = viewer.entities.add({
  name : 'Citizens Bank Park',
  position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534, 10000000),
  point : {
    pixelSize : 5,
	color : Cesium.Color.RED,
	outlineColor : Cesium.Color.WHITE,
	outlineWidth : 2
  },
  label : {
	text : 'Citizens Bank Park',
    font : '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
    pixelOffset : new Cesium.Cartesian2(0, -9)
  }
});

viewer.zoomTo(viewer.entities);

citizensBankPark.description = '\
<img\
  width="50%"\
  style="float:left; margin: 0 1em 1em 0;"\
  src="//cesiumjs.org/images/2015/02-02/Flag_of_Wyoming.svg"/>\
<p>\
  Wyoming is a state in the mountain region of the Western \
  United States.\
</p>\
<p>\
  Wyoming is the 10th most extensive, but the least populous \
  and the second least densely populated of the 50 United \
  States. The western two thirds of the state is covered mostly \
  with the mountain ranges and rangelands in the foothills of \
  the eastern Rocky Mountains, while the eastern third of the \
  state is high elevation prairie known as the High Plains. \
  Cheyenne is the capital and the most populous city in Wyoming, \
  with a population estimate of 62,448 in 2013.\
</p>\
<p>\
  Source: \
  <a style="color: WHITE"\
    target="_blank"\
    href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a>\
</p>';
