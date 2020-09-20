import {Injectable} from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CrudService {
    private orderExportSubject = new BehaviorSubject<boolean>(false);           // set to true when admin requests to export order
    public orderExport$ = this.orderExportSubject.asObservable();           // subscribes to the latest value

    constructor(private http: HttpClient) {
    }


    //forgot-password
    verifyEmail(body) {
        return this.http.post(environment.apiEndPoint + 'users/verify/email', body)

    }

    // verifyOTP(otp: any) {
    //   const token = localStorage.getItem('emailverify');
    //   const headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + token
    //   })
    //   return this.http.post(environment.apiEndPoint + 'users/verify/OTP', otp, {
    //     headers: headers
    //   });
    // }

    // set order status export
    public setOrderExportRequest(status: boolean): void {
        this.orderExportSubject.next(status);
    }

    verifyOTP(body) {
        const token = localStorage.getItem('emailverify');
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });
        return this.http.post(environment.apiEndPoint + 'users/verify/OTP', body, {headers: headers});
    };

    resetPassword(body) {
        const token = localStorage.getItem('otpToken');
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': token
        });
        return this.http.post(environment.apiEndPoint + 'users/change-password', body, {headers: headers});
    };

    //login

    postLogin(body) {
        return this.http.post(environment.apiEndPoint + 'users/login', body)

    }

    // image

    uploadImage(formData): Observable<any> {
        return this.http.post(environment.apiEndPoint + 'utils/upload/file/imagekit', formData);
    }

    //post data

    postProd(body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + 'products', body, {headers: headers});
    };

    postCat(body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + 'categories', body, {headers: headers});
    };

    postDeals(body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + 'deals', body, {headers: headers});
    };

    postCoupons(body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + 'coupons/save', body, {headers: headers});
    };


    postLocation(body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + 'locations/save', body, {headers: headers});
    };

    //get list

    getProdList() {                                              //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'products', {headers: headers});
    };

    getCatList() {                                              //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'categories', {headers: headers});
    };

    getLocList() {                                              //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'locations/all', {headers: headers});
    };

    getDealsList(page: number, limit: number) {                                              //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + `deals/${page}/${limit}`, {headers: headers});
    };

    getCouponsList(page: number, limit: number) {                                              //to show saloon list
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + `coupons/${page}/${limit}`, {headers: headers});
    };


    //getting data by Id


    getProdbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'products/' + _id, {headers: headers});
    }

    getCatbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'categories/' + _id, {headers: headers});
    }

    getLocbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'locations/details/' + _id, {headers: headers});
    }

    getDealsbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'deals/' + _id, {headers: headers});
    }

    getCouponsbyId(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'coupons/info/' + _id, {headers: headers});
    }


    //put data

    putCat(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'categories/' + _id, body, {headers: headers})
    }

    putProd(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'products/' + _id, body, {headers: headers})
    }

    putLoc(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'locations/update/' + _id, body, {headers: headers})
    }


    putCoupons(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'coupons/update/' + _id, body, {headers: headers})
    }

    putDeals(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'deals/' + _id, body, {headers: headers})
    }


    //delete

    onDeleteSingleDataCat(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + 'categories/delete/' + _id, {headers: headers})
    }

    onDeleteSingleDataProd(_id) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + 'products/delete/' + _id, {headers: headers});
    }

    onDeleteSingleDataLoc(_id) {   //location
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + 'locations/delete/' + _id, {headers: headers});
    }

    onDeleteSingleDataDeals(_id) {   //deals
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + 'deals/delete/' + _id, {headers: headers});
    }

    onDeleteSingleDataCoupons(_id) {   //Coupons
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + 'coupons/delete/' + _id, {headers: headers})
    }

    // status put

    onStatusProd(_id, body: any) {   //Coupons
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'products/status/update/' + _id, body, {headers: headers})
    }

    onStatusCat(_id, body: any) {   //Coupons
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'categories/update/status/' + _id, body, {headers: headers})
    }

    onStatusDeals(_id, body: any) {   //Coupons
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'deals/status/update/' + _id, body, {headers: headers})
    }

    onStatusCoupons(_id, body: any) {   //Coupons
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'coupons/status/update/' + _id, body, {headers: headers})
    }

    onStatusLoc(_id, body: any) {   //Coupons

        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'locations/status/update/' + _id, body, {headers: headers})
    }

    public getData(url: string): Observable<any> {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + url, {headers});
    }

    public deleteData(url: string): Observable<any> {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.delete(environment.apiEndPoint + url, {headers});
    }

    public saveData(url: string, body: any): Observable<any> {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.post(environment.apiEndPoint + url, body, {headers});
    }

    public updateData(url: string, body: any): Observable<any> {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + url, body, {headers});
    }

    public patchData(url: string, body: any): Observable<any> {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.patch(environment.apiEndPoint + url, body, {headers});
    }

    // let products = [];  
    getBusinessInfoData() {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'business/info', {headers: headers});
    }

    getCurrencyLanguageDataInfo() {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'setting/currency/language/info', {headers: headers});
    }

    getCurrencyLanguageList() {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.get(environment.apiEndPoint + 'setting/currency/language/list', {headers: headers});
    }

    putInfoById(_id, body) {
        const token = JSON.parse(localStorage.getItem('login')).token;
        const headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        return this.http.put(environment.apiEndPoint + 'setting/currency/' + _id, body, {headers: headers})
    }

}














