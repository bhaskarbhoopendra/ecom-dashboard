import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private taostr: ToastrService) { }

  getUsersList() {                                                //to show saloon list
    const token = JSON.parse(localStorage.getItem('login')).token;
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(environment.apiEndPoint + 'users/all/user/list', { headers: headers });
  };



}
