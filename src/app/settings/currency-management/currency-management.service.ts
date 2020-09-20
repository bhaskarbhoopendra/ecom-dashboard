import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurrencyManagementService {

  constructor(private http: HttpClient) {

  }

  addCurrencydata(body: any) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(environment.apiEndPoint + 'setting/currency/Admin', body, { headers: headers });
  }

  getCurrencyList() {                                                //to show saloon list
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'setting/currency/language/info', { headers: headers });
  }

  getCurrencyListbyId(_id) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + '' + _id, { headers: headers });
  }
  putCurrencyById(_id, body) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.put(environment.apiEndPoint + '' + _id, body, { headers: headers })
  }
  deleteCurrencyById(data: any) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.delete(environment.apiEndPoint + '' + data, { headers: headers })
  }



}
