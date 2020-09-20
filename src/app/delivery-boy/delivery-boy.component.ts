import {Component, TemplateRef} from '@angular/core';
import {CrudService} from '../../service/crud.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';

export interface DeliveryBodyModel {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobileNumber: string;
    role: string;
    status?: boolean;
}

@Component({
    selector: 'app-delivery-boy-component',
    templateUrl: './delivery-boy.component.html',
    styleUrls: ['./delivery-boy.component.scss']
})
export class DeliveryBoyComponent {
    public deliveryBoyData: DeliveryBodyModel;          // contains information about delivery boy
    public deliveryBodyList: Array<DeliveryBodyModel> = [];         // contains information to save delivery boy
    private modalRef: NgbModalRef;          // contains reference of add/update delivery boy
    public pageNumber: number = 1;    // shows default page number
    public pageLimit: number = 10;          // shows 10 records per page
    public totalRecords: number = 0; // contains total number of records
    public updateDelivary: any = {}
    public UpdateId: any;
    public delivaryBoy: any = {
        status: true
    }

    constructor(private crudService: CrudService, private modalService: NgbModal, private toastr: ToastrService) {
        this.deliveryBoyData = this.getDefaultDeliveryBodyData();
        this.getDeliveryBoys();
    }

    // sends request to get delivery boys
    public getDeliveryBoys(): void {
        this.crudService.getData(`users/delivery/boys/${this.pageNumber}/${this.pageLimit}`).subscribe((res: any) => {
            this.deliveryBodyList = res.response_data.list;
            this.totalRecords = res.response_data.totalCount;
        }, error => {
            this.deliveryBodyList = [];
            this.totalRecords = 0;
        });
    }

    // returns default delivey body data
    private getDefaultDeliveryBodyData(deliveryBoy?: DeliveryBodyModel): DeliveryBodyModel {
        return {
            firstName: deliveryBoy ? deliveryBoy.firstName : '',
            lastName: deliveryBoy ? deliveryBoy.lastName : '',
            email: deliveryBoy ? deliveryBoy.email : '',
            password: deliveryBoy ? deliveryBoy.password : '',
            mobileNumber: deliveryBoy ? deliveryBoy.mobileNumber : '',
            role: deliveryBoy ? deliveryBoy.role : 'Delivery Boy'
        }
    }

    // opens add delivery boy moal
    public openAddDeliveryBoyModal(templateRef: TemplateRef<any>): void {
        this.modalRef = this.modalService.open(templateRef, {backdrop: false, keyboard: false});
    }

    public openEditDeliveryBoyModal(templateRef: TemplateRef<any>, content): void {
        this.UpdateId = content._id
        this.updateDelivary = content;
        this.modalRef = this.modalService.open(templateRef, {backdrop: false, keyboard: false});
    }

    // closes modal
    public closeModal(): void {
        this.modalRef.close();
        this.deliveryBoyData = this.getDefaultDeliveryBodyData();
    }

    public closeEditModal(): void {
        this.modalRef.close();
        this.deliveryBoyData = this.getDefaultDeliveryBodyData();
    }

    // sends information to save delivery boy
    public saveDeliveryBody(): void {
        this.crudService.saveData('users/create/delivery-boy', this.deliveryBoyData).subscribe((res: any) => {
            if (res.response_code !== 201) {
                this.toastr.error(res.response_data, 'Error', {timeOut: 3000});
            } else {
                this.toastr.success('Delivery boy saved successfully', 'Success');
                this.closeModal();
                this.getDeliveryBoys();
            }
        }, error => {
            this.toastr.error('Something went wrong. Please try again', 'Error', {timeOut: 3000});
        });
    }

    // sends request to delete delivery boy
    public deleteDeliveryBoy(id: string): void {
        this.crudService.deleteData(`users/delete/delivery/body/${id}`).subscribe((res: any) => {
            if (res.response_code !== 200) {
                this.toastr.error(res.response_data, 'Error', {timeOut: 3000})
            } else {
                this.toastr.success('Delivery boy deleted successfully', 'Success');
                this.getDeliveryBoys();
            }
        }, error => {
            this.toastr.error('Something went wrong. Please try again', 'Error', {timeOut: 3000});
        });
    }

    updateStatus(event, id) {
        this.delivaryBoy.status = event
        this.crudService.updateData('users/deliveryboy/status/update/' + id, this.delivaryBoy).subscribe((res: any) => {
            this.toastr.success('Sucess', res.response_data)
        })
    }

    // called when page number is changed
    public pageChange(page: number): void {
        this.pageNumber = page;
        this.getDeliveryBoys();
    }

    updateDeliveryBody() {
        this.crudService.updateData('users/infonation/update/by/Admin/' + this.UpdateId, this.updateDelivary).subscribe((res: any) => {
            this.toastr.success('Sucess', res.response_data)
            this.closeEditModal();
        })
    }
}
