import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/Geolocation';
import { SelectEntrancePage } from '../select-entrance/select-entrance';
import * as Metro from 'wmata-metro-js';
import * as $ from 'jquery'

declare var google;

let client = new Metro('bfdece0152e44c41a14915bdb7506b8b');
console.log(client);

@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html', 
  providers: [Geolocation]
})

export class TripPage {
  position:any;
  closestStation:any;
  destinationStation:any;
  destination:any;
  connector:boolean = false; 

  constructor(public geolocation: Geolocation, public navCtrl: NavController) {
    this.position;
    this.closestStation = {};
    this.destination;
    this.destinationStation = {};
  }

  pushPage = SelectEntrancePage;
  
  onInput(o){
    console.log(o.target.value);
  }

  initAutoComplete() {
    let searchBounds = new google.maps.LatLngBounds({lat:38.772829, lng:-77.190595}, {lat:39.016469, lng:-76.902073})
    let input = document.getElementById('searchInput');
    console.dir(google.maps);
    let autocomplete = new google.maps.places.Autocomplete(input, {bounds: searchBounds});
    console.log('ran initautocomplete');
    autocomplete.addListener('place_changed', setConnected);
    autocomplete.addListener('place_changed', setDestinationAddress);
    let that = this;

    function setConnected() {
      let name = autocomplete.getPlace().name;
      if (name === "Union Station" || name === "Rosslyn Station" ){
        document.getElementById("travelOptions").removeAttribute('hidden')
      } else {
        document.getElementById("travelOptions").setAttribute('hidden', 'true')
      }
      console.log(that.connector);
    }
    function setDestinationAddress(){
      
      let destStationCode, destEntrances = [], destStationInfo;
      console.log(autocomplete.getPlace());
      that.destination = autocomplete.getPlace();
      console.log("here's your destination: \n")
      console.log(that.destination);
      console.log(that.destination.name);


      console.log(that.destination.geometry.location.lat());
      client.getRailStationEntrances({lat: that.destination.geometry.location.lat(), lon: that.destination.geometry.location.lng()}, '2000', function(err, res){
        console.log(res[0]);
        destStationCode = res[0].StationCode1;
        let reslen = res.length, c;
        for (let i = 0; i < reslen; i++) {
          c = res[i].StationCode1;
          if (c == destStationCode) {
            destEntrances.push(res[i]);
          } else {
            break;
          }
        }
        console.log('station code: ' + destStationCode);
        client.getRailStationInfo(destStationCode, function(err1, res1){
            destStationInfo = res1;
            that.destinationStation = {stationInfo: destStationInfo, entrances: destEntrances}
        })
      })
    }
    
  }
  



  ionViewDidLoad() {
    let that = this;

    this.initAutoComplete();
    
    console.log(typeof Metro);
    this.geolocation.getCurrentPosition({
      maximumAge: 15000,
      timeout: 30000,
      enableHighAccuracy: true
    }).then(pos => {
      
      this.position = pos;
      console.log('ionViewDidLoad SelectStationPage', pos);
      let stationCode;
      let entrances = [];
      let stationInfo;


      client.getRailStationEntrances({lat: this.position.coords.latitude, lon: this.position.coords.longitude}, '2000', function(err, res){
        if (err) {
          alert('Sumthins wrong; maybe yous too far away wes gonna use a fake location');
          that.position = {coords: {latitude: 38.8977, longitude: -77.0365}};
          that.closestStation = {stationInfo: {Name:'McPherson Square'}, entrances: [{  
             "ID":"83",
             "Name":"WEST ENTRANCE (VERMONT & I STs)",
             "StationCode1":"C02",
             "StationCode2":"",
             "Description":"Building entrance from the southwest corner of I St NW,15th St NW and Vermont Ave NW.",
             "Lat":38.90113,
             "Lon":-77.034947
          },
          {  
             "ID":"84",
             "Name":"EAST ENTRANCE (EAST OF 17th & I STs)",
             "StationCode1":"C03",
             "StationCode2":"",
             "Description":"Building entrance from the southeast corner of 17th St NW and I St NW(Escalator only).",
             "Lat":38.901169,
             "Lon":-77.039164
          }]}

        } else {
           console.log(res);
          stationCode = res[0].StationCode1;
          console.log(stationCode, res.length);
          for (let i = 0; i < res.length; i++) {
            let c = res[i].StationCode1;
            if (c == stationCode) {
              entrances.push(res[i]);
            } else {
              break;
            }
          
            // if (res[i] == stationCode) {
            //  console.log('whooohoooo') //     entrances.push(res[i]);
            // }
            
          }
          console.log(entrances, entrances.length);
          client.getRailStationInfo(stationCode, function(err1, res1){
            stationInfo = res1;
            console.log(stationInfo);
            that.closestStation = {stationInfo: stationInfo, entrances: entrances}
          })
          //console.log(res);
        }
       
      })
      
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  resetInput() {
    let searchInput = <HTMLInputElement>document.getElementById('searchInput');
   
    searchInput.value = '';
    searchInput.focus();
    this.destination = false;
    this.destinationStation = false;
    document.getElementById("travelOptions").setAttribute('hidden', 'true')

    
    console.log(searchInput.getAttribute('value'));
    
  }
  startTrip() {
    if (this.position && this.closestStation.stationInfo && this.destination && this.destinationStation){
      this.navCtrl.push(SelectEntrancePage, {position: this.position, closestStation: this.closestStation, destination: this.destination, destinationStation: this.destinationStation || 'no destination station'});
    } else alert("Maybe you forgot to enter a place or maybe you've got no place to go.")
  }

  onCancel(event){
  	alert('whoop');
  }
}
