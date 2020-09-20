import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewcategoryRoutingModule } from './viewcategory-routing.module';
import { ViewcategoryComponent } from './viewcategory.component';
@NgModule({
    imports: [
        CommonModule,
        ViewcategoryRoutingModule,
        NgbModule,
        ChartistModule,
    ],
    exports: [],
    declarations: [
        ViewcategoryComponent,

    ],
    providers: [],
})
export class ViewcategoryModule { }
