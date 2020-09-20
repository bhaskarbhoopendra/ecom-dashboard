import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const routes: Routes = [
    { path: '', component: BannerComponent }
];

@NgModule({
    imports: [CommonModule, FormsModule, NgbModule, NgSelectModule, RouterModule.forChild(routes), NgxPaginationModule, FileUploadModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),],
    declarations: [BannerComponent],
    exports: [RouterModule]
})
export class BannerModule {

}
