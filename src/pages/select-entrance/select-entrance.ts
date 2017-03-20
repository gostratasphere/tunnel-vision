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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.station = navParams.get('closestStation');
    this.entrances = this.station.entrances;
  	this.position = navParams.get('position');
  }



  initMap(): void {
    let markers = [];
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.station.latitude || 38.8977, lng: this.station.longitude || 77.0365},
      zoom: 17,
      disableDefaultUI: true
    });

    var person = new google.maps.Marker({map: map});
    var pos = {
      lat: this.position.coords.latitude,
      lng: this.position.coords.longitude
    }


    person.setPosition(pos);
    markers.push(person);
    for (let i = 0; i < this.entrances.length; i++) {
      let eMarker = new google.maps.Marker({
        map: map,
        position: {
          lat: this.entrances[i].Lat,
          lng: this.entrances[i].Lon
        },
        label: i+1,
        icon: pinSymbol('blue')
      });
      markers.push(eMarker);
    }
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
     bounds.extend(markers[i].getPosition());
    }

    map.fitBounds(bounds);
    //map.setCenter(pos);




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

  

  ngAfterViewInit() {
  	console.log('ngAfterViewInit', this.position);
  	this.initMap();
	}

  ionViewDidLoad() {
		console.log(this.station)
	}

  
}
