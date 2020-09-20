import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CrudService} from '../../../service/crud.service';
import {NgClass} from '@angular/common';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SocketSharedService} from '../../SocketShare.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginDetails: any = {
        email: 'admin@ionicfirebaseapp.com',
        password: '123456',
    }

    constructor(private router: Router, private toastr: ToastrService, private http: HttpClient, private api: CrudService, private socketService: SocketSharedService) {
    }

    ngOnInit() {
    }


    loginSubmitData(form: NgForm) {
        this.api.postLogin(this.loginDetails).subscribe((res: any) => {
            if (res.response_code == 200) {
                if (res.response_data.role === 'Admin') {
                    sessionStorage.setItem('token', btoa(btoa(btoa(res.response_data.token))));
                    localStorage.setItem('login', JSON.stringify(res.response_data));
                    this.socketService.connectToSocketServer();
                    this.toastr.success('Login Successful', 'Success');
                    this.router.navigate(['/dashboard']);
                } else {
                    this.toastr.error('Invalid credentials', 'Error');
                }

            } else {
                this.toastr.error('Invalid credentials', 'Error');
            }
        }, (error) => {
            this.toastr.error('Error', error.message);

        });

    }


}
