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
	//@ViewChild('map') mapElement: Elementref;
	map: any;
	position: any;
  entrances: any;
  route: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.station = navParams.get('closestStation');
    this.entrances = this.station.entrances;
  	this.position = navParams.get('position');
  }


  initMap(): void {
    let that = this;
    let markers = [];

    
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.station.latitude || 38.8977, lng: this.station.longitude || 77.0365},
      zoom: 17,
      disableDefaultUI: true
    });


    

    let person = new google.maps.Marker({map: map});
    let pos = {
      lat: this.position.coords.latitude,
      lng: this.position.coords.longitude
    }


    person.setPosition(pos);


    markers.push(person);
    let arrLength = this.entrances.length
    for (let i = 0; i < arrLength; i++) {
      let eMarker = new google.maps.Marker({
        map: map,
        position: {
          lat: this.entrances[i].Lat,
          lng: this.entrances[i].Lon
        },
        label: String(i+1),
        icon: pinSymbol('blue')
      });
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
      let directionsDisplay = new google.maps.DirectionsRenderer();
      
      directionsDisplay.setMap(map);

      let dirRequest = {
        origin: pos,
        destination: markers[1].position,
        travelMode: 'WALKING'
      };

      directionsService.route(dirRequest, function(result, status) {
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
    }  



    function pinSymbol(color) {
      return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1
      };
    }   
  }

  entranceButtonpressed(): void {

  }


  entranceSelected(): void {
      console.log(this.route);
      this.navCtrl.push(DirectionsPage, {route: this.route});
  }

  ngAfterViewInit() {
  	console.log('ngAfterViewInit', this.position);
  	this.initMap();
	}

  ionViewDidLoad() {
		console.log(this.station)
	}

  
}
