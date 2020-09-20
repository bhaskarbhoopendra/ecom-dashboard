import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {CountryService} from './country.service';
import {Country} from './country';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {CrudService} from 'service/crud.service';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/operator/map'


@Component({
    selector: 'app-coupons',
    templateUrl: './coupons.component.html',
    styleUrls: ['./coupons.component.scss'],
    providers: [CountryService, DecimalPipe]
})
export class CouponsComponent {

    public couponData: Array<any> = [];
    public couponDataCopy: Array<any> = [];
    countries$: Observable<Country[]>;
    total$: Observable<number>;

    //pagination
    public p: number = 1;

    //full text search

    public items: any = [];
    public page: number = 1;
    public limit: number = 10;
    public totalRecords: number = 0;


    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: CountryService, private toastr: ToastrService,
                private api: CrudService) {
        this.countries$ = service.countries$;
        this.total$ = service.total$;
        this.getCoupons();
    }

    //For update status
    extractData(res: Response) {
        const body = res;
        return body || {};

    }

    //update status

    statusUpdate(data) {
        let body = {
            status: null,
        };
        if (data.status == false) {
            // data.status = 1;
            body.status = 1;
        } else {
            // data.status = 0;
            body.status = 0;
        }
        this.api.onStatusCoupons(data._id, body).subscribe((res: any) => {
                if (res.response_code == 200) {
                    this.toastr.info('Coupon Status Updated...', 'Updated');

                } else {
                    this.toastr.error(res.response_data, 'Success');
                }
            }
        );
    }


    getCoupons() {
        this.api.getCouponsList(this.page, this.limit).map(this.extractData).subscribe((res: any) => {
            this.couponData = res.response_code === 200 ? res.response_data.coupons : [];
            this.couponDataCopy = this.couponData;
            this.totalRecords = res.response_code === 200 ? res.response_data.totalCoupons : 0;
        }, error => {
            this.couponData = [];
        });
    };

    // changes page number
    public changePageNumber(page: number): void {
        this.page = page;
        this.getCoupons();
    }


    // full text search

    initializeItems() {
        this.items = this.couponData;
    }

    // filters coupons by coupon title
    public searchItems(ev: string): void {
        if (ev.length > 0) {
            this.couponData = this.couponDataCopy.filter(coupon => coupon.couponCode.toLowerCase().indexOf(ev.toLowerCase()) !== -1);
        } else {
            this.couponData = this.couponDataCopy;
        }
    }

    // delete

    onDeleteProduct(key) {
        if (confirm('If you want to delete,Press OK button!') == true) {
            this.api.onDeleteSingleDataCoupons(key)
                .subscribe((response) => {
                    this.toastr.info('Coupon deleted...', 'Coupon');
                    var index = this.couponData.findIndex(obj => obj._id === key);
                    this.couponData.splice(index, 1);
                });
        }
    }


    onSort({column, direction}: SortEvent) {
        // resetting other headers
        this.headers.forEach(header => {
            if (header.sortable !== column) {
                header.direction = '';
            }
        });

        this.service.sortColumn = column;
        this.service.sortDirection = direction;
    }

}
