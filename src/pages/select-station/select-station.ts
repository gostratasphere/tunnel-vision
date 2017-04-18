import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SelectEntrancePage } from '../select-entrance/select-entrance';
import { Geolocation } from '@ionic-native/geolocation';
import { Stations } from "./../../assets/javascript/stations.ts";
//console.log(StationList);

@Component({
  selector: 'page-select-station',
  templateUrl: 'select-station.html',
  providers: [Geolocation]
})

export class SelectStationPage {
	stations: any[];
  position: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public navParams: NavParams) {
  	this.stations = Stations;
    this.position;
  }
  

  ionViewDidLoad() {

    this.geolocation.getCurrentPosition({
      maximumAge: 15000,
      timeout: 30000,
      enableHighAccuracy: true
    }).then(pos => {
	  	
      this.position = pos;
      console.log('ionViewDidLoad SelectStationPage', pos);
	  });
  }

  stationSelected (station) {
    if (this.position){
  	  this.navCtrl.push(SelectEntrancePage, {station:station, position:this.position});
    }
  }

}
