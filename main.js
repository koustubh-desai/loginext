/*
1.  Represent the Pin-code data in a tabular view, integrated with a functionality to search any Pin-code of user’s choice. Please do not use any libraries for rendering the table or for the implementation of search functionality.
2.  The latitude & longitude have of all the pin codes should be plotted on a map adjacent to the table.
3.  Upon searching any of the table fields (Pin-codes), the Pin-code on an adjacent map should get highlighted/zoomed in.
4.  The highlighted area in the map should also be accompanied by basic data (latitude, longitude, name of the Pin-code) showed in a popup/infowindow/infobubble which points to that area.
5.  Use grunt/gulp server to build and run your project.
API key for google maps is AIzaSyAG7qdBT0VUw1jLaj6DbrFBzaECK9hejx0

*/
 var app = angular.module('locatePin',[function(){}]);
 app.controller('LocationDetails',['LoadData','$scope','$rootScope','MapData',function($loadData,$scope,$r,$map){

  $loadData.then(function(resp){
    $scope.locations = resp.data;    
  });
  $scope.showPin = function(pin,lat,longi){
  
    $map.update(pin,lat,longi);
    $r.$emit('newcord');
  }
}]);
app.controller('GoogleMap',['$scope','$rootScope','MapData',function($scope,$r,$map){
  var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
  $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  $scope.marker = new google.maps.Marker({
        map: $scope.map,
        position: mapOptions.center
    });
  $scope.infowindow = new google.maps.InfoWindow({
      content: "<div>Hello</div>"
    });
  $scope.marker.addListener('click', function() {
          $scope.infowindow.open($scope.map, $scope.marker);
        });
  $r.$on('newcord',function(){
    // Show the latitude and longitude on the map
    mapOptions.center = new google.maps.LatLng($map.data.latitude, $map.data.longitude);
    
    $scope.map.panTo(mapOptions.center);
    $scope.map.setCenter(mapOptions.center);
    $scope.marker.setPosition(mapOptions.center);
    $scope.infowindow.setContent('<div>Pin Code:'+$map.data.pin+'<br/> Latitude: '+$map.data.latitude+'<br/> Longitude: '+$map.data.longitude+'</div>')
    
    //Show the marker at that position

  })
}]);

/*Load the JSON data*/
app.factory('LoadData',['$http',function($http){
  var loader = $http({
    headers:{'Content-Type':'application/json'},
    url:"MOCK_DATA.json",
    method:'POST',
  });
  return loader;
}]);

/* Service For maps*/
app.factory('MapData',[function(){
  var obj =  {
    data: {
      pin: '',
      latitude: '',
      longitude:''
    },
    update: function(pin, lat, longi) {
      // Improve this method as needed
      this.data.pin = pin;
      this.data.latitude = lat;
      this.data.longitude = longi;
    }
  };
  return obj;
}]);
