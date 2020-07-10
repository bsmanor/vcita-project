import { Component } from '@angular/core';
import { VcitaService } from './services/vcita.service';
import * as moment from 'moment';
import { IAppointment } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private vcita: VcitaService) {}

  startDate: Date = null;
  endDate: Date = null;

  spots = [];
  selectedSpot = null;
  noSpots = false;
  loadingSpots = false;
  loadingBooking = false;

  client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  }

  appointment: IAppointment = null;

  findAvailableSpots() {
    this.noSpots = false;
    this.spots = [];
    this.loadingSpots = true;
    this.vcita.getServiceAvailability(this.startDate, this.endDate)
    .subscribe(res => {
      console.log(res);
      
      console.log(res['data']['availabilities']);
      let tmpSpots = res['data']['availabilities'];
      let i = 0;
      for (let date in tmpSpots) {
        for (let spot of tmpSpots[date]) {
          if (i < 2) {
            i = i+1;
            this.spots.push(spot);
            this.noSpots = false;
          }
        }
      }
      this.loadingSpots = false;
      if (this.spots.length === 0) {
        this.noSpots = true;
      }
    },
    err => {
      console.log(err);
    }); 
  }

  setSpot(i) {
    this.selectedSpot = i;
  }

  book() {
    this.vcita.createClient(this.client)
    .subscribe(res => {
      console.log(res);
      let token = res['data']['token'];
      let clientId = res['data']['client'];
      this.vcita.createNewBooking(clientId, token, this.spots[this.selectedSpot])
      .subscribe((appointment) => {
        console.log(appointment);
        this.appointment = appointment['data']['booking'];
      })
    })
  }

}
