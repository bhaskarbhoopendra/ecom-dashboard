import {Component, QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';

import {Observable} from 'rxjs';
import {CountryService} from '../products/country.service';
import {Country} from '../products/country';
import {NgbdSortableHeader, SortEvent} from '../products/sortable.directive';
import {CrudService} from '../../service/crud.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import 'rxjs/add/operator/map'


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    providers: [CountryService, DecimalPipe]
})
export class CategoriesComponent {

    public catData: Array<any> = [];
    public catDataCopy: Array<any> = [];
    defaultFalsevar = false;

    countries$: Observable<Country[]>;
    total$: Observable<number>;

    //pagination
    public p: number = 1;

    //text search
    public items: any = [];

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

    constructor(public service: CountryService, private toastr: ToastrService,
                private api: CrudService, private router: Router,
                private http: HttpClient) {

        this.countries$ = service.countries$;
        this.total$ = service.total$;
        this.getCat();

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

            body.status = 1;
        } else {

            body.status = 0;
        }
        this.api.onStatusCat(data._id, body).subscribe((res: any) => {
                if (res.response_code == 200) {
                    this.toastr.info('Category Status Updated...', 'Updated');
                } else {
                    this.toastr.error(res.response_data, 'Error');
                }
            }
        );
    }

    getCat() {

        this.api.getCatList().map(this.extractData).subscribe((res: any) => {
            this.catData = res.response_data;
            this.catDataCopy = this.catData;
        });

    }


    onDeleteProduct(key, index) {
        if (confirm('If you want to delete,Press OK button!') == true) {
            this.api.onDeleteSingleDataCat(key)
                .subscribe((response) => {
                    this.toastr.info('Category deleted...', 'Category');
                    var index = this.catData.findIndex(obj => obj._id === key);
                    this.catData.splice(index, 1);
                });
        }
    }


    // full text search

    initializeItems() {
        this.items = this.catData;
    }

    searchItems(input: string): void {
        if (input.length > 0) {
            this.catData = this.catDataCopy.filter(category => category.title.toLowerCase().indexOf(input.toLowerCase()) !== -1);
        } else {
            this.catData = this.catDataCopy;
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
