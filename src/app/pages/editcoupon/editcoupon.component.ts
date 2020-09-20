import {Component, OnInit} from '@angular/core';
import {CrudService} from 'service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {CommonTypeModel} from '../addcoupon/addcoupon.component';

@Component({
    selector: 'app-editcoupon',
    templateUrl: './editcoupon.component.html',
    styleUrls: ['./editcoupon.component.scss']
})
export class EditcouponComponent implements OnInit {

    public catId: any;

    // offerPercentage: Array<any> = [10, 35, 40, 80];

    public couponDat: string;
    public editCoupon: any = {
        description: null,
        couponCode: null,
        offerValue: null,
        startDate: null,
        expiryDate: null,
        couponType: null,
        status: 1,
        // category: null,
        // products: [],
        // offerAppliedTo: null
    };
    public categories: Array<CommonTypeModel> = [];         // contains the list of all categories
    public products: Array<CommonTypeModel> = [];               // contains the list of all products
    public startDate: NgbDateStruct;
    public endDate: NgbDateStruct;

    constructor(private api: CrudService, private toastr: ToastrService,
                private router: Router, private http: HttpClient, private route: ActivatedRoute, private config: NgbDatepickerConfig) {

        //this.couponDate = new Date().toDateString().split("T")[0];

        this.route.params.subscribe((response: any) => {

            this.catId = response.id;

            this.showcat(this.catId);                                                         //D
        });
        this.couponDat = new Date().toISOString().split('T')[0];
        // this.config.minDate = {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
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
    }

    showcat(_id) {
        this.api.getCouponsbyId(this.catId).subscribe((res: any) => {
            this.editCoupon = res.response_data;
            this.startDate = {
                year: new Date(this.editCoupon.startDate).getFullYear(),
                month: new Date(this.editCoupon.startDate).getMonth() + 1,
                day: new Date(this.editCoupon.startDate).getDate()
            };
            this.endDate = {
                year: new Date(this.editCoupon.expiryDate).getFullYear(),
                month: new Date(this.editCoupon.expiryDate).getMonth() + 1,
                day: new Date(this.editCoupon.expiryDate).getDate()
            };
        });
    }


    onSubmitEdit(form: NgForm) {
        this.editCoupon.startDate = new Date(`${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`).getTime();
        this.editCoupon.expiryDate = new Date(`${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`).getTime();
        this.api.putCoupons(this.catId, this.editCoupon).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error('Could not save coupon. Please try again');
            }
            // this.router.navigate(['/categories']);
            this.toastr.success('Updated Sucessfully', 'Success');
            this.router.navigate(['/coupons']);
        }, error => {
            this.toastr.error('Could not save coupon. Please try again');
        });
    }

    cancel() {
        this.router.navigate(['/coupons']);
    }

}
