import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VcitaService {

  constructor(private http: HttpClient) { }

  domain = 'https://api.vcita.biz/platform/v1';
  domain2 = 'https://api2.vcita.com';
  businessToken = 'a0a6760c5856c167553b16ec698ddbf8';
  serviceId = 'biz4vc2tlwoj331e';
  businessId = '7iiiok0sxs817fz6';
  staffId = '7vom7t6fxh9z9y23';


  getServiceAvailability(start: Date, end: Date) {
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer a0a6760c5856c167553b16ec698ddbf8")
    .set("Content-Type", "application/json")

    console.log('get date: ' + start.toISOString().slice(0,10));

    
    return this.http.get(`${this.domain}/services/${this.serviceId}/availability?start_date=${start.toISOString().slice(0,10)}&end_date=${end.toISOString().slice(0,10)}`, {headers});
  }

  createClient(client: any) {
    const headers = new HttpHeaders()
    .set("Authorization", "Bearer a0a6760c5856c167553b16ec698ddbf8")
    .set("Content-Type", "application/json")

    const bodyParams = {
      first_name: client.firstName,
      last_name: client.lastName,
      email: client.email,
      phone: client.phone
    }

    return this.http.post(`${this.domain}/clients`, bodyParams, {headers})
  }

  createNewBooking(clientId, token, spot) {
    console.log(`Token: ${token}`);
    
    const headers = new HttpHeaders()
    .set("accept", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .set("Content-Type", "application/json")

    const bodyParams = {
      business_id: this.businessId,
      service_id: this.serviceId,
      staff_id: this.staffId,
      client_id: clientId,
      start_time: spot['start_time']
    }

    // this.http.post(`${this.domain}/scheduling/bookings`, bodyParams, {headers})
    return this.http.post(`https://api2.vcita.com/platform/v1/scheduling/bookings`, bodyParams, {headers})
  }

  createNewBooking2() {    
    const headers = new HttpHeaders()
    .set("accept", "application/json")
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiJ9.eyJlbnRpdHlfdWlkIjoiNzUwdjUydmt3djF2ZnUyOSIsImV4dHJhIjp7ImJ1c2luZXNzX3VpZCI6IjdpaWlvazBzeHM4MTdmejYifSwiZXhwIjoxNTk2Nzk1ODIyLCJyZWZyZXNoIjoxNTk2Nzc2NjIyLCJ0eXBlIjoiY2xpZW50IiwianRpIjoiYWI3Y2E0MzIyMjliMDdlMzVlZGUzYjgyY2VhYTE2MjFkZGFmOTFiYzA4NzMzZWFiZTI0ZTU4NmIyZTBmMmU5NCJ9.hbXc_bn5c45a_uinOi9pYlmS8JmXNZ2lJqmU_b6xcqw`)
    .set("Content-Type", "application/json")

    const bodyParams = {
      business_id: this.businessId,
      service_id: this.serviceId,
      staff_id: this.staffId,
      client_id: "750v52vkwv1vfu29",
      start_time: "2020-07-16T09:00:00+00:00"
    }

    // this.http.post(`${this.domain}/scheduling/bookings`, bodyParams, {headers})
    return this.http.post(`https://api2.vcita.com/platform/v1/scheduling/bookings`, bodyParams, {headers})
  }
}
