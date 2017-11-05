import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DirectionsPage } from '../directions/directions';


declare var google;

@Component({
  selector: 'page-select-entrance',
  templateUrl: 'select-entrance.html'
})


export class SelectEntrancePage {
	station: any;
	map: any;
	position: any;
  entrances: any;
  route: any;
  destination: any;
  destinationStation: any;
  destinationRoute: any;
  endRoute: any;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.station = navParams.get('closestStation');
    this.entrances = this.station.entrances;
  	this.position = navParams.get('position');
    this.destination = navParams.get('destination');
    console.log('destination');
    console.log(this.destination);
    this.destinationStation = navParams.get('destinationStation');
    console.log('destinationstation');
    console.log(this.destinationStation)
   
  }


  initMap(): void {
    let that = this;
    let markers = [];

    let styledMapType = new google.maps.StyledMapType(
      [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ], 'StyledMap');
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.station.latitude || 38.8977, lng: this.station.longitude || 77.0365},
      zoom: 15,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'StyledMap']
      }
    });
    map.mapTypes.set('StyledMap', styledMapType);
    map.setMapTypeId('StyledMap');



    

    let person = new google.maps.Marker({map: map});
    let pos = {
      lat: this.position.coords.latitude,
      lng: this.position.coords.longitude
    }


    person.setPosition(pos);
    markers.push(person);

    let arrLength = this.entrances.length
    let eMarker;
    let re = /elevator/i;
    for (let i = 0; i < arrLength; i++) {
      console.log('check regular expression::: ' + re.test(this.entrances[i].Name));
      if (re.test(this.entrances[i].Name)) {
        eMarker = new google.maps.Marker({
          map: map,
          position: {
            lat: this.entrances[i].Lat,
            lng: this.entrances[i].Lon
          },
          icon: elevatorIcon()
        });
      } else {
        eMarker = new google.maps.Marker({
          map: map,
          position: {
            lat: this.entrances[i].Lat,
            lng: this.entrances[i].Lon
          },
          icon: escalatorIcon(),
          size: new google.maps.Size(20, 30)
        });
      }
      markers.push(eMarker);
    }
    let bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
     bounds.extend(markers[i].getPosition());
    }

    calcRoute(pos, markers);
    map.fitBounds(bounds);

    //map.setCenter(pos);
    console.log('sdsdsds: ' + this.route)
    
    

    function calcRoute(pos, markers){
      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});
      
      directionsDisplay.setMap(map);

      let startRouteRequest = {
        origin: pos,
        destination: markers[1].position,
        travelMode: 'WALKING'
      };

      let endRouteRequest = {
        origin: 
          {lat: that.destinationStation.entrances[0].Lat,
           lng: that.destinationStation.entrances[0].Lon},
        destination: 
          {lat: that.destination.geometry.location.lat(),
           lng: that.destination.geometry.location.lng()},
        travelMode: 'WALKING'
      };
      console.log('endroute');
      console.log(endRouteRequest);

      directionsService.route(startRouteRequest, function(result, status) {
        if (status == 'OK') {
          // alert('ok');
          console.log(result);
          that.route = result;
          console.log('this.route set to : ' + that.route)
          directionsDisplay.setDirections(result);
        } else {
          console.log(result);
        }
      });

      directionsService.route(endRouteRequest, function(result, status) {
        if (status == 'OK') {
          console.log('this is the droid youre looking for', result);
          that.endRoute = result;
        } else {
          console.log(result);
        }
      });
    }  



    function escalatorIcon() {
      return {
        url: "assets/img/escalator.png",
        origin: new google.maps.Point(0, 0), 
        scaledSize: new google.maps.Size(15, 30)
      }
    }  
    function elevatorIcon() {
      return {
        url: "assets/img/elevator.png",
        origin: new google.maps.Point(0, 0), 
        scaledSize: new google.maps.Size(15, 30)
      }
    }
  }
  imgIcon(entranceName){
    let re=/elevator/ig;
    if (re.test(entranceName)) {
      return "assets/img/elevatorBox.png";
    } else {
      return "assets/img/escalatorBox.png";
    }
  }

  entranceButtonpressed(): void {

  }


  entranceSelected(): void {
      console.log(this.route);
      this.navCtrl.push(DirectionsPage, {route: this.route, endRoute: this.endRoute, destination:this.destination, destinationStation:this.destinationStation});
  }

  ngAfterViewInit() {
  	console.log('ngAfterViewInit', this.position);
  	this.initMap();
	}

  ionViewDidLoad() {
		console.log(this.station)

	}

  
}
