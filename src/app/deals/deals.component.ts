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
    selector: 'app-deals',
    templateUrl: './deals.component.html',
    styleUrls: ['./deals.component.scss'],
    providers: [CountryService, DecimalPipe]
})
export class DealsComponent {

    public dealsData: Array<any> = [];
    public dealsDataCopy: Array<any> = [];

    countries$: Observable<Country[]>;
    total$: Observable<number>;

    //pagination
    public p: number = 1;
    public limit: number = 10;

    //text search
    public items: any = [];
    public totalRecords: number = 0;


    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: CountryService, private api: CrudService,
                private toastr: ToastrService) {
        this.countries$ = service.countries$;
        this.total$ = service.total$;
        this.getDeals();
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
        this.api.onStatusDeals(data._id, body).subscribe((res: any) => {
                if (res.response_code == 200) {
                    this.toastr.info('Deals Status Updated...', 'Updated');

                } else {
                    this.toastr.error(res.response_data, 'Success');
                }
            }
        );
    }


    getDeals() {

        this.api.getDealsList(this.p, this.limit).map(this.extractData).subscribe((res: any) => {
            this.dealsData = res.response_code === 200 ? res.response_data.deals : [];
            this.dealsDataCopy = this.dealsData;
            this.totalRecords = res.response_code === 200 ? res.response_data.totalDeals : [];
            // this.dealsData = res.response_data
        }, error => {
            this.dealsData = [];
        });

    }


    // full text search

    initializeItems() {
        this.items = this.dealsData;
    }

    public searchItems(ev: string): void {
        if (ev.length > 0) {
            this.dealsData = this.dealsDataCopy.filter(deal => deal.name.toLowerCase().indexOf(ev.toLowerCase()) !== -1);
        } else {
            this.dealsData = this.dealsDataCopy;
        }
    }


    // delete

    onDeleteProduct(key) {
        if (confirm('If you want to delete,Press OK button!') == true) {
            this.api.onDeleteSingleDataDeals(key)
                .subscribe((response) => {
                    this.toastr.info('Deal deleted...', 'Deal');
                    var index = this.dealsData.findIndex(obj => obj._id === key);
                    this.dealsData.splice(index, 1);
                });
        }
    }

    public pageChange(page: number): void {
        this.p = page;
        this.getDeals();
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
