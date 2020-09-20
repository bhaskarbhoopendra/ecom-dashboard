import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DeliveryBoyComponent} from './delivery-boy.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import {UiSwitchModule} from 'ngx-ui-switch';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const routes: Routes = [
    {path: '', component: DeliveryBoyComponent}
];

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule, NgbModule, NgxPaginationModule, UiSwitchModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })],
    declarations: [DeliveryBoyComponent],
    exports: [RouterModule]
})
export class DeliveryBoyModule {

}
