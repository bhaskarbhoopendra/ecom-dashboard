import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private crud: CrudService) {

  }



  // postProdName(body: string) {
  //   console.log(body);
  //   const token = JSON.parse(localStorage.getItem('login')).token;
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Authorization': 'Bearer ' + token
  //   });
  //   return this.http.post(environment.apiEndPoint + 'products/search/' + body, { headers: headers });
  // };

  getProductByName(body: string) {
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'products/search/' + body, { headers: headers });
  };

  // PostProdbyName(body: any) {
  //   console.log(body);
  //   const token = JSON.parse(localStorage.getItem('login')).token;
  //   const headers = new HttpHeaders({
  //     'Content-type': 'application/json',
  //     'Authorization': 'Bearer ' + token
  //   });
  //   return this.http.post(environment.apiEndPoint + 'products/search/', body, { headers: headers });
  // }

}
