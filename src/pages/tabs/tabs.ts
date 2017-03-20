import { Component } from '@angular/core';

import { TripPage } from '../trip/trip';

import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TripPage;

  tab3Root: any = ContactPage;

  constructor() {

  }
}
