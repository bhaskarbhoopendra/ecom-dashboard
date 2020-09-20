import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonTypeModel} from '../pages/addcoupon/addcoupon.component';
import {CrudService} from '../../service/crud.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {environment} from '../../environments/environment';
import {ActiveToast, ToastrService} from 'ngx-toastr';

export interface BannerModel {
    _id?: string;
    title: string;
    description: string;
    bannerType: string;
    imageURL: string;
    imageId: string;
    category: string | CommonTypeModel;
    product: string | CommonTypeModel;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
    filePath: string;
}

@Component({
    selector: 'app-banner-component',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    public pageNumber: number = 1;       // contains current page number
    public pageLimit: number = 10;           // shows 10 records per page
    public categories: Array<CommonTypeModel> = [];         // contains the list of all categories
    public products: Array<CommonTypeModel> = [];               // contains the list of all products
    private modalRef: NgbModalRef;           // contains reference to banner modal
    public isImageSelected: boolean = false;   // set to true when image is selected
    public bannerData: BannerModel;         // contains information to create/update banner
    public uploader: FileUploader = new FileUploader({
        url: environment.apiEndPoint + 'utils/upload/file/imagekit'
    });
    public bannerList: Array<BannerModel> = [];         // contains list of banners
    public totalRecords: number;            // contains total number of banners
    public bannerId: string = null;         // contains banner id
    public isDisabled: boolean = false;             // disables the button when image is being uploaded

    constructor(private api: CrudService, private modalService: NgbModal, private toastr: ToastrService) {
        this.bannerData = this.getDefaultBannerValues();
        this.getBannerList();
        this.getAllCategories();
        this.getAllProducts();
    }

    ngOnInit(): void {
        this.uploader.onBeforeUploadItem = (item: FileItem) => {
            item.withCredentials = false;
        }
    }

    // get's banner list  
    public getBannerList(): void {
        this.api.getData(`banner/pagination/${this.pageNumber}/${this.pageLimit}`).subscribe((res: any) => {
            this.bannerList = res.response_code === 200 ? res.response_data.banners : [];
            this.totalRecords = res.response_code === 200 ? res.response_data.bannerCount : 0;
        }, error => {
            this.bannerList = [];
            this.totalRecords = 0;
        });
    }

    // returns default banner values
    public getDefaultBannerValues(bannerInfo?: BannerModel): BannerModel {
        return {
            title: bannerInfo ? bannerInfo.title : null,
            description: bannerInfo ? bannerInfo.description : null,
            bannerType: bannerInfo ? bannerInfo.bannerType : null,
            category: bannerInfo ? bannerInfo.category ? bannerInfo.category['_id'] : null : null,
            product: bannerInfo ? bannerInfo.product ? bannerInfo.product['_id'] : null : null,
            status: bannerInfo ? bannerInfo.status : 1,
            imageId: bannerInfo ? bannerInfo.imageId : null,
            imageURL: bannerInfo ? bannerInfo.imageURL : null,
            filePath: bannerInfo ? bannerInfo.filePath : ''
        }
    }

    // sends request to get the list of all categories
    private getAllCategories(): void {
        this.api.getData('categories/list').subscribe((res: any) => {
            this.categories = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.categories = [];
        });
    }

    // sends request to get the list of all products
    private getAllProducts(): void {
        this.api.getData('products/list').subscribe((res: any) => {
            this.products = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.products = [];
        });
    }

    // open add modal
    public openAddBannerModal(modalRef: TemplateRef<any>, banneData: BannerModel) {
        this.modalRef = this.modalService.open(modalRef, {keyboard: false, backdrop: false});
        this.isImageSelected = banneData ? true : false;
        this.bannerId = banneData ? banneData._id : null;
        this.bannerData = this.getDefaultBannerValues(banneData);
    }

    // closes banner modal
    public closeModal() {
        this.modalRef.close();
        this.isImageSelected = false;
        this.bannerData = this.getDefaultBannerValues();
        this.uploader.clearQueue();
    }

    // uploads image
    public uploadImage() {
        this.isImageSelected = true;
        this.isDisabled = true;
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: any) => {
            this.isDisabled = false;
            const res = JSON.parse(response);
            this.toastr.success('Image uploaded successfully', 'Success');
            this.bannerData.imageURL = res.response_data[0].originalImage.url;
            this.bannerData.imageId = res.response_data[0].originalImage.key;
            this.bannerData.filePath = res.response_data[0].originalImage.filePath;
        }
    }

    // save banner information
    public saveAndUpdateBannerInfo(): void | ActiveToast<any> {
        if (!this.bannerData.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        let url: string = this.bannerId ? `banner/update/${this.bannerId}` : 'banner/save';
        let type: string = this.bannerId ? 'updateData' : 'saveData';
        this.api[type](url, this.bannerData).subscribe((res: any) => {
            if (res.response_code !== 200 && res.response_code !== 201) {
                return this.toastr.error('Could not save banner,Please try again', 'Error')
            }
            this.toastr.success(res.response_data, 'Success');
            this.closeModal();
            this.getBannerList();
        }, error => {
            this.toastr.error('Could not save banner,Please try again', 'Error')
        });
    }

    // sends request to delete banner
    public deleteBanner(bannerId: string): void {
        this.api.deleteData(`banner/delete/${bannerId}`).subscribe((res: any) => {
            if (res.response_code !== 200) {
                return this.toastr.error('Could not delete banner,Please try again', 'Error')
            }
            this.toastr.success('Banner deleted successfully', 'Success');
            this.getBannerList();
        }, error => {
            this.toastr.error('Could not delete banner,Please try again', 'Error')
        });
    }
}
