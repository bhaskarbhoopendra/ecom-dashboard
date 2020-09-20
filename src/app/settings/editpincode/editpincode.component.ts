import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editpincode',
  templateUrl: './editpincode.component.html',
  styleUrls: ['./editpincode.component.scss']
})
export class EditpincodeComponent implements OnInit {

  public pinCodeId: any;

  public editPincode: any = {
    pincode: [],
  }

  constructor(private api: SettingService, private route: ActivatedRoute,
    private toastr: ToastrService, private router: Router) {

    this.route.params.subscribe((response: any) => {
      this.pinCodeId = response.id;

      this.getPincodesbyId(this.pinCodeId);                                                         //D
    });


  }

  ngOnInit() {
  }


  getPincodesbyId(_id: any) {
    this.api.getPincodebyId(_id).subscribe((res: any) => {
      this.editPincode = res.response_data
    });

  }


  onSubmit(form: NgForm) {
    this.api.putPincodeById(this.pinCodeId, this.editPincode).subscribe((res: any) => {

    });
    this.toastr.success('Pincode Updated...', 'Success');
    this.router.navigate(['/settings/deliveryoptions']);

  }

  onCancel() {
    this.router.navigate(['/settings/deliveryoptions']);

  }


}
