import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VcitaService {

  constructor(private http: HttpClient) { }

  domain = 'https://api.vcita.biz/platform/v1';

  getServiceAvailability() {

    const headers = new HttpHeaders()
    .set("Authorization", "Bearer a0a6760c5856c167553b16ec698ddbf8")
    .set("Content-Type", "application/json")

    // return this.http.get(`https://api2.vcita.com/services/biz4vc2tlwoj331e/availability?start_date=2020-07-05&end_date=2020-07-10`, {headers})
    return this.http.get(`${this.domain}/services/biz4vc2tlwoj331e/availability?start_date=2020-07-10&end_date=2020-07-16`, {headers});
  }

  createClient(client: any, spot: any) {
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer a0a6760c5856c167553b16ec698ddbf8")
    .set("Content-Type", "application/json")

    const bodyParams = {
      first_name: client.firstName,
      last_name: client.lastName,
      email: client.email,
      phone: client.phone
    }

    this.http.post(`${this.domain}/clients`, bodyParams, {headers}).subscribe(res => {
      console.log(res);
    })
  }

  createNewBooking() {

  }
}
