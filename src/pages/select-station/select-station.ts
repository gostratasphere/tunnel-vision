import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SelectEntrancePage } from '../select-entrance/select-entrance';
import { Geolocation } from 'ionic-native';
import { Stations } from "./../../assets/javascript/stations.ts";
//console.log(StationList);

@Component({
  selector: 'page-select-station',
  templateUrl: 'select-station.html'
})

export class SelectStationPage {
	stations: any[];
  position: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.stations = Stations;
    //["Addison Road-Seat Pleasant","Anacostia","Archives-Navy Memorial-Penn Quarter","Arlington Cemetery","Ballston-MU","Benning Road","Bethesda","Braddock Road","Branch Ave","Brookland-CUA","Capitol Heights","Capitol South","Cheverly","Clarendon","Cleveland Park","College Park-U of MD","Columbia Heights","Congress Heights","Court House","Crystal City","Deanwood","Dunn Loring-Merrifield","Dupont Circle","East Falls Church","Eastern Market","Eisenhower Avenue","Farragut North","Farragut West","Federal Center SW","Federal Triangle","Foggy Bottom-GWU","Forest Glen","Fort Totten","Franconia-Springfield","Friendship Heights","Gallery Pl-Chinatown","Georgia Ave-Petworth","Glenmont","Greenbelt","Greensboro","Grosvenor-Strathmore","Huntington","Judiciary Square","King St-Old Town","L'Enfant Plaza","Landover","Largo Town Center","McLean","McPherson Square","Medical Center","Metro Center","Minnesota Ave","Morgan Boulevard","Mt Vernon Sq 7th St-Convention Center","Navy Yard-Ballpark","Naylor Road","New Carrollton","NoMa-Gallaudet U","Pentagon","Pentagon City","Potomac Ave","Prince George's Plaza","Rhode Island Ave-Brentwood","Rockville","Ronald Reagan Washington National Airport","Rosslyn","Shady Grove","Shaw-Howard U","Silver Spring","Smithsonian","Southern Avenue","Spring Hill","Stadium-Armory","Suitland","Takoma","Tenleytown-AU","Twinbrook","Tysons Corner","U Street/African-Amer Civil War Memorial/Cardozo","Union Station","Van Dorn Street","Van Ness-UDC","Vienna/Fairfax-GMU","Virginia Square-GMU","Waterfront","West Falls Church-VT/UVA","West Hyattsville","Wheaton","White Flint","Wiehle-Reston East","Woodley Park-Zoo/Adams Morgan"];
    this.position;
  }
  

  ionViewDidLoad() {

    Geolocation.getCurrentPosition({
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
