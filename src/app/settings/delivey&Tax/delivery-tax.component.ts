import {Component} from '@angular/core';
import {CrudService} from '../../../service/crud.service';
import {ToastrService} from 'ngx-toastr';

interface DeliveryTaxModel {
    _id?: string;
    deliveryType: string;
    taxType: string;
    fixedDeliveryCharges: number;
    deliveryChargePerKm: number;
    location: {
        lat: number;
        lng: number;
    },
    taxAmount: number;
    store: string;
}

@Component({
    selector: 'app-delivery-tax-component',
    templateUrl: './delivery-tax.component.html',
    styleUrls: ['./delivery-tax.component.scss']
})
export class DeliveryTaxComponent {
    public deliveryTaxData: DeliveryTaxModel;           // contains information about delivery taxes

    constructor(private crud: CrudService, private toastr: ToastrService) {
        this.deliveryTaxData = this.getDeliveryTaxData();
        this.getDeliveryTaxInformation();
    }

    // returns default delivery and tax data
    private getDeliveryTaxData(deliveryData?: DeliveryTaxModel): DeliveryTaxModel {
        return {
            _id: deliveryData ? deliveryData._id : undefined,
            deliveryType: deliveryData ? deliveryData.deliveryType : '',
            taxType: deliveryData ? deliveryData.taxType : '',
            taxAmount: deliveryData ? deliveryData.taxAmount : null,
            fixedDeliveryCharges: deliveryData ? deliveryData.fixedDeliveryCharges : 0,
            deliveryChargePerKm: deliveryData ? deliveryData.deliveryChargePerKm : 0,
            location: deliveryData ? deliveryData.location : {lat: null, lng: null},
            store: deliveryData ? deliveryData.store : null
        }
    }

    // get's delivery tax information
    private getDeliveryTaxInformation(): void {
        this.crud.getData('delivery/tax/settings').subscribe((res: any) => {
            this.deliveryTaxData = res.response_code === 200 ? res.response_data : this.getDeliveryTaxData();
        }, error => {
            this.deliveryTaxData = this.getDeliveryTaxData();
        });
    }

    // sends request to save/update delivery tax information
    public saveDeliveryAndTaxInformation(): void {
        const userData = JSON.parse(localStorage.getItem('login'));
        this.deliveryTaxData.store = userData._id;
        this.crud.saveData('delivery/tax/settings/save', this.deliveryTaxData).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error('Could not save delivery information', 'Error', {timeOut: 4000});
            }
            this.toastr.success('Delivery and tax information saved successfully', 'Success', {timeOut: 4000});
            this.getDeliveryTaxInformation();
        }, error => {
            this.toastr.error('Something went wrong, Please try again', 'Error', {timeOut: 4000});
        });
    }
}
