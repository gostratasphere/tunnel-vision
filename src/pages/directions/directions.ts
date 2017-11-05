import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DirectionsDetailsPage } from '../directions-details/directions-details';
import { PlatformDetailsPage } from '../platform-details/platform-details'


/*
  Generated class for the Directions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-directions',
  templateUrl: 'directions.html'
})
export class DirectionsPage {
	startRoute: any;
  destination: any;
  endRoute: any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.startRoute = navParams.get('route').routes[0].legs[0];
    this.endRoute = navParams.get('endRoute').routes[0].legs[0];
    this.destination = navParams.get('destination');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionsPage');
    console.log(this.startRoute);
    console.log('destination', this.destination)
  }

  startRouteSelected() {
  	this.navCtrl.push(DirectionsDetailsPage, {leg: 'Origin to Station', directions: this.startRoute})
  }

  midRouteSelected() {
  	this.navCtrl.push(PlatformDetailsPage)
  }

  endRouteSelected() {
  	this.navCtrl.push(DirectionsDetailsPage, {leg: 'Station to Destination', directions: this.endRoute})
  }

}
