import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) { }


  addPincode(body) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(environment.apiEndPoint + 'setting/pincode', body, { headers: headers });
  }

  getPincodesList() {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'setting/pincode', { headers: headers });
  }

  getPincodebyId(_id) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'setting/get/' + _id, { headers: headers });
  }

  putPincodeById(_id, body) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put(environment.apiEndPoint + 'setting/update/' + _id, body, { headers: headers })
  }

  pincodeDelete(data: any) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete(environment.apiEndPoint + 'setting/' + data, { headers: headers })
  }

  // working hours

  getWorkingHrsList() {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'setting/working/time', { headers: headers });
  }

  workingHours(body) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(environment.apiEndPoint + 'setting/working/time', body, { headers: headers });
  }
  getBusinessInfoData() {

    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'business/info', { headers: headers });
  }



  //Add New Business Data
  addBusinessData(body) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(environment.apiEndPoint + 'business/save', body, { headers: headers });
  }



  //Update Businesses By Id
  updateBusinessUpdate(body, id) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put(environment.apiEndPoint + 'business/edit/' + id, body, { headers: headers });
  }


}
