import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SubCategoryComponent} from './sub-category.component';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import {UiSwitchModule} from 'ngx-ui-switch';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {path: '', component: SubCategoryComponent}
]

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routes), NgxPaginationModule, UiSwitchModule, TranslateModule.forChild({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
    }),
        NgbModalModule
    ],
    declarations: [SubCategoryComponent],
    exports: [RouterModule]
})
export class SubCategoryModule {

}
