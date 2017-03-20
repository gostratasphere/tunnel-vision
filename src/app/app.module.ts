import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { TripPage } from '../pages/trip/trip';
import { TabsPage } from '../pages/tabs/tabs';
import { SelectStationPage } from '../pages/select-station/select-station';
import { SelectEntrancePage } from '../pages/select-entrance/select-entrance';

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    TripPage,
    TabsPage, 
    SelectStationPage,
    SelectEntrancePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TripPage,
    TabsPage,
    SelectStationPage,
    SelectEntrancePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
