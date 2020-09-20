import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from './constant.service';
@Injectable()
export class CrudService extends ConstantService {

    headers: HttpHeaders;
    authToken: string;
    constructor(private http: HttpClient, private _constantService: ConstantService) {
        super();
    }

    public get(api: string) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.get(this._constantService.API_ENDPOINT + api, {
            headers: this.headers
        });
    }

    public getWithoutToken(api: string) {
        return this.http.get(this._constantService.API_ENDPOINT + api);
    }

    public getOne(api: string, id: any) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.get(this._constantService.API_ENDPOINT + api + '/' + id, {
            headers: this.headers
        });
    }

    public post(api: string, data: any) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.post(this._constantService.API_ENDPOINT + api, data, {
            headers: this.headers
        });
    }

    public put(api: string, id: string, data: any) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.put(this._constantService.API_ENDPOINT + api + '/' + id, data, {
            headers: this.headers
        });
    }

    public delete(api: string, id: string) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.delete(this._constantService.API_ENDPOINT + api + '/' + id, {
            headers: this.headers
        });
    }

    public OrderSearchByLocationId(api: string, Id: any, body: any): Observable<any> {
        this.authToken = localStorage.getItem('token');
        const head = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.authToken });
        return this.http.post(`${this._constantService.API_ENDPOINT}${api}/${Id}`, body, { headers: head })
    }
    public paymentPut(api: string, data: any) {
        let token = localStorage.getItem('token');
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this.http.put(this._constantService.API_ENDPOINT + api + '/', data, { headers: this.headers });
    }
}