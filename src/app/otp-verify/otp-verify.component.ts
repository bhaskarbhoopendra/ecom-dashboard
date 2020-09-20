import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CrudService } from 'service/crud.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-otp-verify',
  templateUrl: './otp-verify.component.html',
  styleUrls: ['./otp-verify.component.scss']
})
export class OtpVerifyComponent implements OnInit {


  public addOTP: any = {
    otp: '',
  }

  constructor(private api: CrudService, private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

  }

  onSubmitOTP(form: NgForm) {
    this.api.verifyOTP(this.addOTP).subscribe((res: any) => {
      if (res.response_code == 200) {


        this.toastr.success('OTP Verified', 'Success');
        localStorage.setItem('otpToken', 'bearer ' + res.response_data.token);
        this.router.navigate(['/resetpassword']);

      } else {
        this.toastr.error('Please Enter Correct OTP', 'Try Again');
      }
    });

  }
  onLogin() {
    this.router.navigate(['/login']);
  }

}
