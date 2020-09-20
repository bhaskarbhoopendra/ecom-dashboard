import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private toastr: ToastrService, private http: HttpClient,
                private router: Router) {

    }

    getOrdersList() {                                                //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'orders/all/oder/list', {headers: headers});
    };

    getOrderbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'orders/info/' + _id, {headers: headers});
    }

    updateStatusOrders(orderId: string, data: any) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.patch(environment.apiEndPoint + 'orders/update/status/ByAdmin', data, {headers: headers});
    }


}
