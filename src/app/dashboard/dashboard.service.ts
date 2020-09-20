import { Injectable } from '@angular/core';
import { CrudService } from '../shared/services/crud.services';
@Injectable()
export class DashboardService {
    restaurantId: string;
    constructor(private crud: CrudService) {
        this.restaurantId = localStorage.getItem('Id');
    }

    public getAllDataCount() { // fetch total number of Orders, Products, Categories count
        return this.crud.get('users/countdata/total/data');
    }

    public getAllLocationCount() { // fetch total number of locations related to Restaurant
        return this.crud.getOne('locations/all/countdata', this.restaurantId);
    }

    public getDataForGraph() {  // for plot graph if user role Owner
        return this.crud.getOne('orders/dashboard/data', this.restaurantId)
    }

    public getDataForLocationGraph(locationId) {  // for plot graph if user role Manager
        return this.crud.getOne('orders/location/data', locationId)
    }

    public getAllDataCountByLocation(id: any) { // fetch total number of Orders, Products, Categories count by Location Id
        return this.crud.getOne('users/countdata/total/data/location', id);
    }
}