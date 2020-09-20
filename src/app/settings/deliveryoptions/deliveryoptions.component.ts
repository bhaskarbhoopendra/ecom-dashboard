import { Component, OnInit } from '@angular/core';
import { SettingService } from '../setting.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deliveryoptions',
  templateUrl: './deliveryoptions.component.html',
  styleUrls: ['./deliveryoptions.component.scss']
})
export class DeliveryoptionsComponent implements OnInit {

  public pincodeData: any = [];

  //pagination
  public p: number = 1;


  constructor(private api: SettingService, private toastr: ToastrService) {
    this.getPincodes();
  }

  ngOnInit() {
  }

  getPincodes() {
    this.api.getPincodesList().subscribe((res: any) => {
      this.pincodeData = res.response_data;

    });

  }

  onDeletePin(key, list) {
    if (confirm("If you want to delete,Press OK button!") == true) {

      this.api.pincodeDelete(list).subscribe((res: any) => {
        var index = this.pincodeData.findIndex(obj => obj._id === key);
        this.pincodeData.splice(index, 1);
      });
    }
  }

  // onDeletePincode(key, list) {
  //   if (confirm("If you want to delete,Press OK button!") == true) {
  //     this.api.pincodeDelete(key)
  //       .subscribe((response) => {
  //         this.toastr.info("Pincode deleted...", "Success");
  //         var index = this.pincodeData.findIndex(obj => obj._id === key);
  //         this.pincodeData.splice(index, 1);
  //       });
  //   }
  // }

}
