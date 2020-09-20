import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CrudService} from 'service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-addlocation',
    templateUrl: './addlocation.component.html',
    styleUrls: ['./addlocation.component.scss']
})
export class AddlocationComponent implements OnInit {

    public addLoc: any = {
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

    constructor(private api: CrudService, private router: Router,
                private http: HttpClient, private toastr: ToastrService) {
    }

    ngOnInit() {
    }

    onSubmitLoc() {
        this.api.postLocation(this.addLoc).subscribe((res: any) => {
            if (res.response_code !== 201) {
                return this.toastr.error('Could not save location', 'Error', {timeOut: 3000});
            }
            this.toastr.success('Location added Successfully', 'Success');
            this.router.navigate(['/locations']);
        }, error => {
            this.toastr.error('Could not save location', 'Error', {timeOut: 3000});
        });
    }

    onSubmit() {
        this.router.navigate(['/locations']);
    }

    onCancel() {
        this.router.navigate(['/locations']);
    }


}
