import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartistModule} from 'ng-chartist';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatchHeightModule} from '../shared/directives/match-height.directive';
import {DealsRoutingModule} from './deals-routing.module';
import {DealsComponent} from './deals.component';
import {FormsModule} from '@angular/forms';
import {UiSwitchModule} from 'ngx-ui-switch';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbdSortableHeader} from './sortable.directive';
import {HttpClient} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        DealsRoutingModule,
        NgbModule,
        FormsModule,
        UiSwitchModule,
        NgxPaginationModule,
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
        DealsComponent,
        NgbdSortableHeader
    ],
    providers: [],
})
export class DealsModule {
}
