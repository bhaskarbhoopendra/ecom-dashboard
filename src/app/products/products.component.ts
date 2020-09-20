import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {CountryService} from './country.service';
import {Country} from './country';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {CrudService} from '../../service/crud.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

//import { Subject } from 'rxjs';
import 'rxjs/add/operator/map'
import {SearchService} from 'service/search.service';


@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    providers: [CountryService, DecimalPipe]
})
export class ProductsComponent {

    siteVall: any;
    public ProdData: Array<any> = [];
    public ProdDataCopy: Array<any> = [];

    countries$: Observable<Country[]>;
    total$: Observable<number>;

    //pagination
    public p: number = 1;

    //text search
    public items: any = [];

    //search
    public searchActive = 0;
    public users: any = []; // contains list of all user
    public noData: boolean;

    //status
    // dtTrigger: Subject<any> = new Subject();


    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: CountryService,
                private api: CrudService, private toastr: ToastrService,
                private router: Router, private searchApi: SearchService,
                private http: HttpClient) {
        this.countries$ = service.countries$;
        this.total$ = service.total$;
        this.getprod();
    }


    //For update status
    extractData(res: Response) {
        const body = res;
        return body || {};

    }

    getprod() {

        this.api.getProdList().map(this.extractData).subscribe((res: any) => {
            this.ProdData = res.response_data;
            this.ProdDataCopy = this.ProdData;
        });

    }


    onDeleteProduct(key) {
        if (confirm('If you want to delete,Press OK button!') == true) {
            this.api.onDeleteSingleDataProd(key)
                .subscribe((response) => {
                    this.toastr.info('Product deleted...', 'Product');
                    var index = this.ProdData.findIndex(obj => obj._id === key);
                    this.ProdData.splice(index, 1);
                });
        }
    }

    //update status
    statusUpdate(list) {

        let body = {
            status: null,
        };
        if (list.status == false) {

            body.status = 1;
        } else {

            body.status = 0;
        }
        this.api.onStatusProd(list._id, body).subscribe((res: any) => {
                if (res.response_code == 200) {
                    this.toastr.info('Product Status Updated...', 'Updated');
                } else {
                    this.toastr.error(res.response_data, 'Error');
                }
            }
        );
    }


    // full text search

    initializeItems() {
        this.items = this.ProdData;
    }

    searchItems(input: string) {
        if (input.length > 0) {
            this.ProdData = this.ProdDataCopy.filter(product => product.title.toLowerCase().indexOf(input.toLowerCase()) !== -1);
        } else {
            this.ProdData = this.ProdDataCopy;
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
