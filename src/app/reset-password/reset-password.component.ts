import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'service/crud.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public resetPassword: any = {

    currentPassword: '',
    newPassword: '',
    confirmPassword: '',



  }

  constructor(private router: Router, private api: CrudService, private toastr: ToastrService) { }

  ngOnInit() {
  }


  onSubmitResetPassword(form: NgForm) {

    //if (this.resetPassword.newPassword === this.resetPassword.confirmPassword) {

    this.api.resetPassword(this.resetPassword).subscribe((res: any) => {
      this.toastr.success('You changed Password Successful', 'Success');
    });

    // localStorage.clear();

    // } else {

    //  this.toastr.error('Password Mismatched', 'Try Again')

    //}


  }

  onLogin() {

    this.router.navigate(['/login']);

  }

}
