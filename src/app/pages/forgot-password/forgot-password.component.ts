import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'service/crud.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotPass: any = {
    email: '',
  }

  constructor(private router: Router, private api: CrudService, private toastr: ToastrService) {

  }

  ngOnInit() {


  }

  onSubmitForgot(form: NgForm) {

    this.api.verifyEmail(this.forgotPass).subscribe((res: any) => {
      if (res.response_code == 200) {
        this.toastr.info('OTP Send to registered Email id', 'OTP Send');
        localStorage.setItem('emailverify', 'bearer ' + res.response_data.token);
        this.router.navigate(['/otpverify']);
      } else {
        this.toastr.error('Entered Wrong Email-Id, Try Again!', 'Error');
      }
    });



  }

  login() {
    this.router.navigate(['/login']);
  }

}
