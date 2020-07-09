import { Component } from '@angular/core';
import { VcitaService } from './services/vcita.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private vcita: VcitaService) {}

  spots = [];

  findAvailableSpots() {
    this.vcita.getServiceAvailability()
    .subscribe(res => {
      console.log(res['data']['availabilities']);
      let tmpSpots = res['data']['availabilities'];
      for (let date in tmpSpots) {
        for (let spot of tmpSpots[date]) {
          this.spots.push(spot);
        }
      }
    }); 
  }

  book(i) {
    console.log(i);
    this.vcita.createClient(this.spots[i])
  }
}
