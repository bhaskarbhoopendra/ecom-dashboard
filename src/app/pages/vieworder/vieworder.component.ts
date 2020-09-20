import {Component, OnInit} from '@angular/core';
import {OrderService} from 'app/orders/order.service';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {CrudService} from '../../../service/crud.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-vieworder',
    templateUrl: './vieworder.component.html',
    styleUrls: ['./vieworder.component.scss']
})
export class VieworderComponent implements OnInit {

    orderData: any;
    orderId: any;
    public currencyCode: string = null;         // contains currency code set by admin
    constructor(private api: OrderService, private http: HttpClient, private toastr: ToastrService,
                private route: ActivatedRoute, private crud: CrudService) {

        this.route.params.subscribe((response: any) => {
            this.orderId = response.id;
            this.getCurrencyCodes();                                                    //D
        });

    }

    ngOnInit() {
    }

    // fetches te currency codes
    private getCurrencyCodes() {
        this.crud.getCurrencyLanguageDataInfo().subscribe((res: any) => {
            this.currencyCode = res.response_code === 200 ? res.response_data.currencyCode : '$';
            this.showOrders(this.orderId);
        }, error => {
            this.currencyCode = '$';
        });
    }

    showOrders(_id) {
        this.api.getOrderbyId(_id).subscribe((res: any) => {
            this.orderData = res.response_data;
        });
    }

    // open's orders invoice
    public openInvoice(): void {
        const url = `${environment.apiEndPoint}orders/invoic/pdf/download/${this.orderId}`;
        window.open(url, 'blank');
    }

}
