import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { CountryService } from './country.service';
import { Country } from './country';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { CrudService } from 'service/crud.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
  providers: [CountryService, DecimalPipe]
})
export class LocationsComponent {

  locData: any = [];

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  //pagination
  public p: number = 1;

  //text search
  public items: any = [];


  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService, private api: CrudService,
    private toastr: ToastrService) {
    this.countries$ = service.countries$;
    this.total$ = service.total$;
    this.getLoc();
  }

  //For update status
  extractData(res: Response) {
    const body = res;
    return body || {};

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
    this.api.onStatusCoupons(list._id, body).subscribe((res: any) => {
      if (res.response_code == 200) {
        this.toastr.info('Location Status Updated...', 'Updated');

      } else {
        this.toastr.error(res.response_data, 'Error');
      }
    }
    );
  }


  getLoc() {
    this.api.getLocList().subscribe((res: any) => {
      this.locData = res.response_data;
    })
  }

  // full text search

  initializeItems() {
    this.items = this.locData;
  }

  searchItems(ev: any) {
    let val = ev;
    this.initializeItems();

    let arrayData: any[] = [];
    if (val == '') {
      arrayData = this.items;
    } else {
      if (val && val.trim() != '') {
        arrayData = this.items.filter((data) => data.locationName.toLowerCase() == val.toLowerCase());

      }
    }

    if (arrayData.length > 0) {
      this.locData = arrayData;
    } else {
      // this.toastr.warning('Your Search Data Is Not Found!', 'Warning!');
    }

  }


  //delete

  onDeleteProduct(key) {
    if (confirm("If you want to delete,Press OK button!") == true) {
      this.api.onDeleteSingleDataLoc(key)
        .subscribe((response) => {
          this.toastr.info("Location deleted...", "Location");
          var index = this.locData.findIndex(obj => obj._id === key);
          this.locData.splice(index, 1);
        });
    }
  }

  onSort({ column, direction }: SortEvent) {
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
