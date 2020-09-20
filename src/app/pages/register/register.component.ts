import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {AddlocationComponent} from '../addlocation/addlocation.component';
import {NgForm} from '@angular/forms';
import {SignupService} from 'app/register/signup.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    public registerData: any = {


        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        // role: 'admin',
        confirmpassword: '',


    }


    constructor(private router: Router, private http: HttpClient, private api: SignupService,
                private toastr: ToastrService,) {
    }

    ngOnInit() {
    }


    onSubmit() {
        delete this.registerData.confirmpassword;
        this.api.postRegister(this.registerData).subscribe((res: any) => {

            this.toastr.success('Registered Successful', 'Success');

            this.router.navigate(['/login']);

        }, (error) => {
            this.toastr.error('Error', error.message);
        });

    }

    onClick() {
        this.router.navigate(['/login']);
    }


}
