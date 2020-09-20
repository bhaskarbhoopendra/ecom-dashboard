import {Component, OnInit, TemplateRef} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'environments/environment';
import {OrderService} from './order.service';
import {UserService} from 'app/users/user.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CrudService} from '../../service/crud.service';
import {DeliveryBodyModel} from '../delivery-boy/delivery-boy.component';
import {NgbDatepickerConfig, NgbDateStruct, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    //both orders & users data
    public orders: Array<any> = [];

    //only for orders
    public ordersData: any = [];
    //for users
    public usersData: any = [];
    public deliveryBoys: Array<DeliveryBodyModel> = [];     // contains list of delivery boys

    //pagination
    public p: number = 1;
    public currencyCode: string = null;         // contains currency code set by admin
    public modalRef: NgbModalRef;           // contains reference to date select modal
    public startDate: NgbDateStruct;         // contains starting date to export order
    public endDate: NgbDateStruct;         // contains ending date to export order
    public orderId: string = null;          // contains order id of user

    constructor(private http: HttpClient, private api: OrderService, private userapi: UserService, private toastr: ToastrService, private crud: CrudService,
                private modalService: NgbModal
    ) {
        this.getCurrencyCodes();
        this.getAllDeliveryBoys();
        // this.getUsers();
    }

    // fetches te currency codes
    private getCurrencyCodes() {
        this.crud.getCurrencyLanguageDataInfo().subscribe((res: any) => {
            this.currencyCode = res.response_code === 200 ? res.response_data.currencyCode : '$';
            this.getOrders();
        }, error => {
            this.currencyCode = '$';
        });
    }

    ngOnInit() {
    }

    // get a; delivery boys
    private getAllDeliveryBoys(): void {
        this.crud.getData('users/delivery/boys/list').subscribe((res: any) => {
            this.deliveryBoys = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.deliveryBoys = [];
        });
    }

    getOrders() {
        this.api.getOrdersList().subscribe((res: any) => {
            this.ordersData = res.response_data;
            this.orders = this.ordersData;
        })
    }


    //update status

    onChangeStatus(event, Id) {
        const update: any = {
            orderId: Id,
            status: event.target.value
        };
        // update.status = event.target.value;
        this.api.updateStatusOrders(Id, update)
            .subscribe(response => {
                this.toastr.success('Order status updated!', 'Success!');
                this.getOrders();
            }, error => {
                this.toastr.error('Could not update order status!', 'Error!');
            });
    }

    // opens date select modal
    public openDateSelectModal(content: TemplateRef<any>): void {
        this.modalRef = this.modalService.open(content);
    }

    // CLOSES DATE SELECT MODAL
    public closeModal() {
        this.modalRef.close();
        this.startDate = undefined;
        this.endDate = undefined;
    }

    // assigns order
    public assignOrder(orderId: string, deliveryBoy: string): void {
        const body = {
            orderId,
            deliveryBoy
        };
        this.crud.saveData('orders/assign/order', body).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error(res.response_data, 'Error', {timeOut: 3000});
            }
            this.toastr.success(res.response_data, 'Success', {timeOut: 3000});
            this.getOrders();
        }, error => {
            this.toastr.error('Something went worng, Please try again', 'Error', {timeOut: 3000});
        });
    }

    // sends request to export order
    public exportOrder(): void {
        const startDate = `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`;
        const endDate = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`;
        const body = {startDate, endDate};
        this.crud.saveData('orders/export', body).subscribe((res: any) => {
            if (res.response_code === 201 || res.response_code === 200) {
                this.toastr.success('Request has been sent to the server. The report will be downloaded automatically', 'Success');
                this.closeModal();
                this.crud.setOrderExportRequest(true);
            } else {
                this.toastr.error(res.response_data, 'Error');
            }
        }, error => {
            this.toastr.error('Could not process your request, Please try again', 'Error');
        });
    }

    // finds an order by order id
    public findOrderById(): void {
        this.ordersData = this.orders.filter(order => order.orderID === this.orderId);
    }

    // resets search filter
    public resetFilter(): void {
        this.orderId = null;
        this.ordersData = this.orders;
    }

    // filters orders by status
    public filterByStatus(status: string): void {
        if (status === 'All') {
            this.ordersData = this.orders;
        } else {
            this.ordersData = this.orders.filter(order => order.orderStatus === status);
        }
    }

    getUsers() {
        this.userapi.getUsersList().subscribe((res: any) => {
            this.usersData = res.response_data;
            this.orders = this.usersData;
        });
    }


}
