import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DeliveryoptionsComponent} from './deliveryoptions/deliveryoptions.component';
import {WorkinghoursComponent} from './workinghours/workinghours.component';
import {AddpincodeComponent} from './addpincode/addpincode.component';
import {EditpincodeComponent} from './editpincode/editpincode.component';
import {ChatComponent} from './chat/chat.component';
import {DeliveryTaxComponent} from './delivey&Tax/delivery-tax.component';
import {MyProfileComponent} from './my-profile/my-profile.component';
import {BusinessInfoComponent} from './business-info/business-info.component';
import {CurrencyComponent} from './currency/currency.component';
import {AddCurrencyComponent} from './add-currency/add-currency.component';
import {EditCurrencyComponent} from './edit-currency/edit-currency.component';


const routes: Routes = [
    {
        path: '',
        children: [
            // {
            //     path: 'addpincode',
            //     component: AddpincodeComponent,
            //     data: {
            //         title: 'Delivery Options'
            //     }
            // },
            // {
            //     path: 'editpincode/:id',
            //     component: EditpincodeComponent,
            //     data: {
            //         title: 'Delivery Options'
            //     }
            //
            // },
            // {
            //     path: 'deliveryoptions',
            //     component: DeliveryoptionsComponent,
            //     data: {
            //         title: 'Delivery Options'
            //     }
            // },
            {
                path: 'workinghours',
                component: WorkinghoursComponent,
                data: {
                    title: 'Working Hours'
                }
            },
            {
                path: 'chat',
                component: ChatComponent,
                data: {
                    title: 'Chat'
                }
            },
            {
                path: 'delivery-settings',
                component: DeliveryTaxComponent,
                data: {
                    title: 'Delivery & Tax settings'
                }
            },
            {
                path: 'profile',
                component: MyProfileComponent,
                data: {
                    title: 'My Profile'
                }
            },


            {
                path: 'currency',
                component: CurrencyComponent,
                data: {
                    title: 'Currency & Languages'
                }
            },

            // {
            //     path: 'currency-management',
            //     component: CurrencyManagementComponent,
            //     data: {
            //         title: 'Currency-Management'
            //     }
            // },
            // {
            //     path: 'add-currency',
            //     component: AddCurrencyComponent,
            //     data: {
            //         title: 'Currency-Management'
            //     }
            // },
            // {
            //     path: 'edit-currency',
            //     component: EditCurrencyComponent,
            //     data: {
            //         title: 'Currency-Management'
            //     }

            // },
            {
                path: 'business-info',
                component: BusinessInfoComponent,
                data: {
                    title: 'Business-Info'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingsRoutingModule {
}
