import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditcategoryRoutingModule } from './editcategory-routing.module';
import { EditcategoryComponent } from './editcategory.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}



@NgModule({
    imports: [
        CommonModule,
        EditcategoryRoutingModule,
        NgbModule,
        ChartistModule,
        FormsModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),


    ],
    exports: [],
    declarations: [
        EditcategoryComponent,

    ],
    providers: [],
})
export class EditcategoryModule { }
