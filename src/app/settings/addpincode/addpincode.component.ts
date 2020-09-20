import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addpincode',
  templateUrl: './addpincode.component.html',
  styleUrls: ['./addpincode.component.scss']
})
export class AddpincodeComponent implements OnInit {

  public addCode: any = {
    pincode: '',
  }



  constructor(private api: SettingService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  onSubmitPincode(form: NgForm) {
    this.api.addPincode(this.addCode).subscribe((res: any) => {
    });
    this.toastr.success('Pincode Added Successful', 'Success')

    this.router.navigate(['/settings/deliveryoptions'])

  }

  onCancel() {
    this.router.navigate(['/settings/deliveryoptions']);
  }



}
