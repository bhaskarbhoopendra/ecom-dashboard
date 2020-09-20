import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LocationsRoutingModule} from './loactions-routing.module';
import {LocationsComponent} from './locations.component';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'ngx-ui-switch';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbdSortableHeader} from './sortable.directive';


@NgModule({
    imports: [
        CommonModule,
        LocationsRoutingModule,
        NgbModule,
        FormsModule,
        UiSwitchModule,
        NgxPaginationModule
    ],
    exports: [],
    declarations: [
        LocationsComponent,
        NgbdSortableHeader
    ],
    providers: [],
})
export class LocationsModule {
}
