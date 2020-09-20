import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddcategoryRoutingModule } from './addcategory-routing.module';
import { AddcategoryComponent } from './addcategory.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';





@NgModule({
    imports: [
        CommonModule,
        AddcategoryRoutingModule,
        NgbModule,
        ChartistModule,
        FormsModule,
        ReactiveFormsModule,

    ],
    exports: [],
    declarations: [
        AddcategoryComponent,

    ],
    providers: [],
})
export class AddcategoryModule { }
