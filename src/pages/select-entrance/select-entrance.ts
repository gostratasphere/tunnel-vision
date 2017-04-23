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
      zoom: 15,
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



    function escalatorIcon() {
      return {
        url: "assets/img/escalator.png",
        origin: new google.maps.Point(0, 0), 
        scaledSize: new google.maps.Size(25, 25)
      }
    }  
    function elevatorIcon() {
      return {
        url: "assets/img/elevator.png",
        origin: new google.maps.Point(0, 0), 
        scaledSize: new google.maps.Size(25, 25)
      }
    }
  }
  imgIcon(entranceName){
    let re=/elevator/ig;
    if (re.test(entranceName)) {
      return "assets/img/elevator.png";
    } else {
      return "assets/img/escalator.png";
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
