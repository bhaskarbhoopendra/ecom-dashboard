import {Component, HostBinding} from '@angular/core';
import {SettingService} from '../../settings/setting.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
    //Variables
    currentDate: Date = new Date();
    public storeName: string = null;

    constructor(public businessService: SettingService) {
        this.getBusinessInfo();
    }

    // gets store name
    private getBusinessInfo():void {
        this.businessService.getBusinessInfoData().subscribe((res: any) => {
            const businessData = Array.isArray(res.response_data) ? res.response_data[0] : res.response_data;
            this.storeName = businessData.storeName;
        });
    }
}
