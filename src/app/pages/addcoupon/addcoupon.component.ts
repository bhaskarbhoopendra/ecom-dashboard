import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {CrudService} from 'service/crud.service';
import {Router} from '@angular/router';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

// const now = new Date();
// const I18N_VALUES = {
//   en: {
//     weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
//     months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//   },
// };

// Range datepicker Start 
// const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
//   one && two && two.year === one.year && two.month === one.month && two.day === one.day;

// const before = (one: NgbDateStruct, two: NgbDateStruct) =>
//   !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
//     ? false : one.day < two.day : one.month < two.month : one.year < two.year;

// const after = (one: NgbDateStruct, two: NgbDateStruct) =>
//   !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
//     ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends

export interface CommonTypeModel {
    _id: string;
    title: string;
}

@Component({
    selector: 'app-addcoupon',
    templateUrl: './addcoupon.component.html',
    styleUrls: ['./addcoupon.component.scss']
})
export class AddcouponComponent implements OnInit {

    // offerPercentage: Array<any> = [10, 35, 40, 80];
    public couponDate: NgbDateStruct;
    public addCoupon = {
        description: null,
        couponCode: null,
        offerValue: null,
        startDate: null,
        expiryDate: null,
        couponType: null,
        status: 1
    };      // contains information to add coupons
    public categories: Array<CommonTypeModel> = [];         // contains the list of all categories
    public products: Array<CommonTypeModel> = [];               // contains the list of all products
    public startDate: NgbDateStruct;
    public endDate: NgbDateStruct;

    constructor(private toastr: ToastrService, private api: CrudService,
                private router: Router, private config: NgbDatepickerConfig) {

        this.config.minDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
        this.getAllCategories();
        this.getAllProducts();
    }

    // sends request to get the list of all categories
    private getAllCategories(): void {
        this.api.getData('categories/list').subscribe((res: any) => {
            this.categories = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.categories = [];
        });
    }

    // sends request to get the list of all products
    private getAllProducts(): void {
        this.api.getData('products/list').subscribe((res: any) => {
            this.products = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.products = [];
        });
    }

    ngOnInit() {
        //this.selectToday();
    }

    onSubmitCoupon(form: NgForm) {
        this.addCoupon.startDate = new Date(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`).getTime();
        this.addCoupon.expiryDate = new Date(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`).getTime();
        this.api.postCoupons(this.addCoupon).subscribe((res: any) => {
            if (res.response_code !== 201) {
                return this.toastr.error(res.response_data, 'Error');
            }
            this.toastr.success('Coupon Added Sucessfully', 'Success');
            this.router.navigate(['/coupons']);
        }, error => {
            this.toastr.error('Could not save coupon. Please try again');
        });
    }

    cancel() {
        this.router.navigate(['/coupons']);
    }
}
