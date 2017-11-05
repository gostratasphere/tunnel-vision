import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DirectionsDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-platform-details',
  templateUrl: 'platform-details.html'
})
export class PlatformDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    
  }

  generateMap() {
    var c = <HTMLCanvasElement> document.getElementById("platformMap");
    var ctx = c.getContext("2d");
    ctx.moveTo(0,0);
    ctx.lineTo(200,100);
    ctx.stroke();

    ctx.font = "30px Arial";
    ctx.fillText("Hello World!",10,50);

    var img = <HTMLImageElement> document.getElementById("escalaor-boths");
    ctx.drawImage(img,10,10);


    ctx.beginPath();
    ctx.rect(188, 50, 200, 100);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.rect(50,50,50,50);

  }

}