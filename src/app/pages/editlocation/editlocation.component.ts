import { Component, OnInit } from '@angular/core';
import { CrudService } from 'service/crud.service';
import { HttpClient } from '@angular/common/http';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.scss']
})
export class EditlocationComponent implements OnInit {

  locId: any;

  public editLoc: any = {
    locationName: '',
    buildingNo: '',
    buildingName: '',
    street: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  }


  constructor(private api: CrudService, private http: HttpClient, private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router) {

    this.route.params.subscribe((response: any) => {

      this.locId = response.id;

      this.showloc(this.locId);
    });

  }

  ngOnInit() {

  }

  showloc(_id) {
    this.api.getLocbyId(_id).subscribe((res: any) => {
      this.editLoc = res.response_data;
    });
  }

  onSubmitEdit(form: NgForm) {
    this.api.putLoc(this.locId, this.editLoc).subscribe((res: any) => {
      this.toastr.success('Updated Sucessfully', 'Success!')
    });

    this.router.navigate(['/locations']);

  }



  onCancel() {
    this.router.navigate(['/locations']);
  }



}
