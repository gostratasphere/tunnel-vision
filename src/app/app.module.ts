import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TripPage } from '../pages/trip/trip';
import { TabsPage } from '../pages/tabs/tabs';
import { SelectStationPage } from '../pages/select-station/select-station';
import { SelectEntrancePage } from '../pages/select-entrance/select-entrance';
import { DirectionsPage } from '../pages/directions/directions';
import { DirectionsDetailsPage } from '../pages/directions-details/directions-details';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TripPage,
    TabsPage, 
    SelectStationPage,
    SelectEntrancePage,
    DirectionsPage,
    DirectionsDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TripPage,
    TabsPage,
    SelectStationPage,
    SelectEntrancePage,
    DirectionsPage,
    DirectionsDetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
