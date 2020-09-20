import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

export interface UserInfoModel {
    location: {
        type: string;
        coordinates: Array<number>;
    };
    _id: string;
    deliveryAreaCode: Array<string>;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
    role: string;
    freeDeliveryDistance: number;
    deliveryCharge: number;
    deliveryDistanceUnit: string;
    registrationDate: number;
    emailVerified: boolean;
    verificationId: string;
    deliverytimingslot: Array<any>;
    createdAt: string;
    updatedAt: string;
}

export interface ChangePasswordModel {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

@Component({
    selector: 'app-my-profile-component',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    public myProfileInfo: UserInfoModel;          // contains profile information
    private userObservable$: Observable<any>;
    public changePasswordData: ChangePasswordModel;         // contains information to change admin's passowrd

    constructor(private crud: CrudService, private toastr: ToastrService, private router: Router) {
        this.myProfileInfo = this.returnDefaultValues();
        this.changePasswordData = this.returnDefaultPassValues();
        this.getProfileInfo();
    }

    // returns admin's default password value
    public returnDefaultPassValues(): ChangePasswordModel {
        return {
            confirmPassword: '',
            currentPassword: '',
            newPassword: ''
        }
    }

    // returns default values
    private returnDefaultValues(): UserInfoModel {
        return {
            location: {
                type: 'Point',
                coordinates: []
            },
            _id: null,
            firstName: '',
            lastName: '',
            mobileNumber: '',
            email: '',
            role: '',
            freeDeliveryDistance: null,
            deliveryAreaCode: [],
            deliveryCharge: 0,
            deliveryDistanceUnit: '',
            deliverytimingslot: [],
            emailVerified: true,
            verificationId: null,
            registrationDate: null,
            createdAt: null,
            updatedAt: null
        };
    }

    // gets profile information
    private getProfileInfo() {
        this.userObservable$ = this.crud.getData('users/me');
        this.userObservable$.subscribe((res: any) => {
            this.myProfileInfo = res.response_code === 200 ? res.response_data.userInfo : this.returnDefaultValues;
        }, error => {
            this.myProfileInfo = this.returnDefaultValues();
        });
    }

    ngOnInit(): void {

    }

    // sends request to update profile information
    public updateProfile() {
        this.crud.patchData('users/update/profile', this.myProfileInfo).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error(res.response_data, 'Error', {timeOut: 4000});
            }
            this.toastr.success(res.response_data, 'Success', {timeOut: 3000});
            this.getProfileInfo();
        }, error => {
            this.toastr.error('Could not update profile', 'Error', {timeOut: 4000});
        });
    }

    // sends request to change password
    public changePassword() {
        this.crud.saveData('users/change-password', this.changePasswordData).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error(res.response_data, 'Error', {timeOut: 4000});
            }
            this.toastr.success(res.response_data, 'Success', {timeOut: 3000});
            this.changePasswordData = this.returnDefaultPassValues();
            localStorage.clear();
            this.router.navigate(['login']);
        }, error => {
            this.toastr.error('Could not update your password.', 'Error', {timeOut: 4000});
        })
    }

}
