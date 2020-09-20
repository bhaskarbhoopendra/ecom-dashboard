import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShowproductRoutingModule } from './showproduct-routing.module';
import { ShowproductComponent } from './showproduct.component';
@NgModule({
    imports: [
        CommonModule,
        ShowproductRoutingModule,
        NgbModule,
        ChartistModule,
    ],
    exports: [],
    declarations: [
        ShowproductComponent,

    ],
    providers: [],
})
export class ShowproductModule { }
