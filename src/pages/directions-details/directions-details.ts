import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DirectionsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-directions-details',
  templateUrl: 'directions-details.html'
})
export class DirectionsDetailsPage {
	leg: string;
	directions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.leg = navParams.get('leg')
  	this.directions = navParams.get('directions').steps;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DirectionsDetailsPage');
    console.log(this.directions);
    let htmlString = "";
    for (let i = 0; i< this.directions.length; i++) {
    	document.getElementById(this.directions[i].encoded_lat_lngs).innerHTML = this.directions[i].instructions;
    // 	htmlString += '<p>( ' + this.directions[i].distance.text + ')  ' + this.directions[i].instructions + '</p>';
    }
    // document.getElementById('direct').innerHTML = htmlString;
  }

}
