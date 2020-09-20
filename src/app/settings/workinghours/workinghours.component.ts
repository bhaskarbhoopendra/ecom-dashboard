import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { SettingService } from '../setting.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-workinghours',
    templateUrl: './workinghours.component.html',
    styleUrls: ['./workinghours.component.scss']
})
export class WorkinghoursComponent implements OnInit {

    public workData: any = [];


    public workHours: any = {

        workingHours: [{

            timeSchedule: [{

                slot: '',
                openTimeConverted: '',
                closeTimeConverted: '',
                deliveryCount: '',
                isClosed: '',
            }],

            day: '',
            dayCode: '',
            isClosed: '',
        }],

    }


    constructor(private router: Router, private toastr: ToastrService,
        private api: SettingService) {

        this.getWorkingHours();


    }

    ngOnInit() {

    }

    getWorkingHours() {

        this.api.getWorkingHrsList().subscribe((res: any) => {
            this.workHours = res.response_data;
        });

    }

    //status
    statusUpdate(data, status, index) {
        data.isClosed = !data.isClosed;

        // let body = {
        //   isClosed: true,
        // }

        // if (data.isClosed == true) {

        //   body.isClosed == true;
        // }
        // else {

        //   body.isClosed == false;
        // }

    }


    onSubmit() {
        this.api.workingHours(this.workHours).subscribe((res: any) => {
            if (res.response_code === 200 || res.response_code === 201) {
                this.toastr.success('Data Updated Successfully', 'Success');
                this.getWorkingHours();
            } else {
                this.toastr.error('Could not update working hours', 'Success');
            }
        }, error => {
            this.toastr.error('Could not update working hours', 'Success');
        });
    }

}
