import { Component } from '@angular/core';
import { VcitaService } from './services/vcita.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private vcita: VcitaService) {}

  startDate: string = null;
  endDate: string = null;

  spots = [];
  selectedSpot = null;
  loadingSpots = false;

  client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  

  findAvailableSpots() {

    this.spots = [];

    console.log(moment(this.startDate.toString().slice(0,15)).toISOString());
    console.log(this.endDate.toString().slice(0,15));
    
    this.loadingSpots = true;
    this.vcita.getServiceAvailability()
    .subscribe(res => {
      console.log(res['data']['availabilities']);
      let tmpSpots = res['data']['availabilities'];
      let i = 0;
      for (let date in tmpSpots) {
        for (let spot of tmpSpots[date]) {
          if (i < 2) {
            i = i+1;
            this.spots.push(spot);
          }
        }
      }
      this.loadingSpots = false;
    }); 
  }

  setSpot(i) {
    this.selectedSpot = i;
  }

  book() {
    this.vcita.createClient(this.client, this.spots[this.selectedSpot])
  }
}
