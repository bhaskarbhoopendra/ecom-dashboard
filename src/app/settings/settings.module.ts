import { NgModule } from '@angular/core';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CommonModule } from '@angular/common';
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from '../shared/directives/match-height.directive';
import { SettingsRoutingModule } from './settings-routing.module';
import { DeliveryoptionsComponent } from './deliveryoptions/deliveryoptions.component';
import { WorkinghoursComponent } from './workinghours/workinghours.component';
import { EditpincodeComponent } from './editpincode/editpincode.component';
import { AddpincodeComponent } from './addpincode/addpincode.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { DeliveryTaxComponent } from './delivey&Tax/delivery-tax.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MomentModule } from 'ngx-moment';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BusinessInfoComponent } from './business-info/business-info.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyManagementComponent } from './currency-management/currency-management.component';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { EditCurrencyComponent } from './edit-currency/edit-currency.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        SettingsRoutingModule,
        UiSwitchModule,
        ChartistModule,
        NgbModule,
        MatchHeightModule,
        NgxPaginationModule,
        FormsModule,
        MomentModule,
        PerfectScrollbarModule,
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
        DeliveryoptionsComponent,
        WorkinghoursComponent,
        EditpincodeComponent,
        AddpincodeComponent,
        ChatComponent,
        DeliveryTaxComponent,
        MyProfileComponent,
        BusinessInfoComponent,
        CurrencyComponent,
        CurrencyManagementComponent,
        AddCurrencyComponent,
        EditCurrencyComponent,
    ],
    providers: [],
})
export class SettingsModule {
}
