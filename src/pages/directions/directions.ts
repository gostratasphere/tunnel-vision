import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DirectionsDetailsPage } from '../directions-details/directions-details'


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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.startRoute = navParams.get('route').routes[0].legs[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionsPage');
    console.log(this.startRoute);
  }

  startRouteSelected() {
  	this.navCtrl.push(DirectionsDetailsPage, {leg: 'Origin to Station', directions: this.startRoute})
  }

  midRouteSelected() {
  	this.navCtrl.push(DirectionsDetailsPage, {leg: 'Through Metro'})
  }

  endRouteSelected() {
  	this.navCtrl.push(DirectionsDetailsPage, {leg: 'Station to Destination'})
  }

}
