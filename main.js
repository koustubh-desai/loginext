/*var places = [
  {
    name: "Wollongong, Australia",
    location: {
      latitude: -34.42507,
      longitude: 150.89315
    }
  },
  {
    name: "Newcastle, Australia",
    location: {
      latitude: -32.92669,
      longitude: 151.77892
    }
  }
]

var width = 960,
height = 480

var projection = d3.geo.equirectangular()
    .scale(153)
    .translate([width / 2, height / 2])
    .precision(.1);

var path = d3.geo.path()
    .projection(projection)

svg.selectAll(".pin")
  .data(places)
  .enter().append("circle", ".pin")
  .attr("r", 5)
  .attr("transform", function(d) {
    return "translate(" + projection([
      d.location.longitude,
      d.location.latitude
    ]) + ")";
  });*/
 var app = angular.module('locatePin',[function(){}]);
 app.controller('pins',[function(){
	 console.log('heya');
	 }]);
