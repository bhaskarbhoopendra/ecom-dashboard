import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VieworderRoutingModule } from './vieworder-routing.module';
import { VieworderComponent } from './vieworder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { PipesModule } from ".../pipes/pipes.module";


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
    imports: [
        CommonModule,
        VieworderRoutingModule,
        NgbModule,
        ChartistModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        //  PipesModule,
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
        VieworderComponent,

    ],
    providers: [],
})
export class VieworderModule { }
