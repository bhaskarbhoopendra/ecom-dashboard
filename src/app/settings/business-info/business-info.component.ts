import {Component, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SettingService} from '../setting.service';
import {NgForm} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {CrudService} from 'service/crud.service';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-business-info',
    templateUrl: './business-info.component.html',
    styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {
    public id: any;
    public business = {
        email: '',
        description: '',
        address: '',
        facebookUrl: '',
        googleUrl: '',
        linkedInUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        officeLocation: '',
        phoneNumber: '',
        aboutUs: '',
        storeName: '',
        dasboardLogo: {
            imageUrl: '',
            imageId: '',
            filePath: ''
        },
        userApp: {
            imageUrl: '',
            imageId: '',
            filePath: ''
        },
        webApp: {
            imageUrl: '',
            imageId: '',
            filePath: ''
        },
        deliveryAppLogo: {
            imageUrl: '',
            imageId: '',
            filePath: ''
        },
        iconLogo: {
            imageUrl: '',
            imageId: '',
            filePath: ''
        }
    };
    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});
    public webAppurl1: any = 'assets/img/blank.png';
    public iconLogoUrl: any = 'assets/img/blank.png';
    public appurl1: any = 'assets/img/blank.png';
    public delivaryurl1: any = 'assets/img/blank.png';
    public dashboardurl1: any = 'assets/img/blank.png';
    public isLoading: boolean = false;
    private isFirstTime: boolean;
    private _id: any;
    public loading: boolean = false;

    constructor(public toastr: ToastrService,
                public businessService: SettingService, private route: Router, public crud: CrudService) {
        this.getBusinessInfo();
        this.uploader.onBeforeUploadItem = item => {
            item.withCredentials = false;
        }
        // this.getBusinessDetail();
    }

    dashboardurl(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.loading = true;
            this.crud.uploadImage(formData).subscribe(res => {
                this.loading = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.dashboardurl1 = res.response_data[0].originalImage.url
                this.business.dasboardLogo.imageUrl = res.response_data[0].originalImage.url;
                this.business.dasboardLogo.imageId = res.response_data[0].originalImage.key;
                this.business.dasboardLogo.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.loading = false;
                this.toastr.error('Could not upload image', 'Error');
            })
        }
    }

    public iconLogoUpload(event): void {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.loading = true;
            this.crud.uploadImage(formData).subscribe(res => {
                this.loading = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.iconLogoUrl = res.response_data[0].originalImage.url
                this.business.iconLogo.imageUrl = res.response_data[0].originalImage.url;
                this.business.iconLogo.imageId = res.response_data[0].originalImage.key;
                this.business.iconLogo.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.loading = false;
                this.toastr.error('Could not upload image', 'Error');
            })
        }
    }

    appurl(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.loading = true;
            this.crud.uploadImage(formData).subscribe(res => {
                this.loading = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.appurl1 = res.response_data[0].originalImage.url
                this.business.userApp.imageUrl = res.response_data[0].originalImage.url;
                this.business.userApp.imageId = res.response_data[0].originalImage.key;
                this.business.userApp.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.loading = false;
                this.toastr.error('Could not upload image', 'Error');
            })
        }
    }

    webappurl(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.loading = true;
            this.crud.uploadImage(formData).subscribe(res => {
                this.loading = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.webAppurl1 = res.response_data[0].originalImage.url;
                this.business.webApp.imageUrl = res.response_data[0].originalImage.url;
                this.business.webApp.imageId = res.response_data[0].originalImage.key;
                this.business.webApp.filePath = res.response_data[0].originalImage.filePath;

            }, error => {
                this.loading = false;
                this.toastr.error('Could not upload image', 'Error');
            })
        }
    }

    delivaryappurl(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.loading = true;
            this.crud.uploadImage(formData).subscribe(res => {
                this.loading = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.delivaryurl1 = res.response_data[0].originalImage.url
                this.business.deliveryAppLogo.imageUrl = res.response_data[0].originalImage.url;
                this.business.deliveryAppLogo.imageId = res.response_data[0].originalImage.key;
                this.business.deliveryAppLogo.filePath = res.response_data[0].originalImage.filePath;

            }, error => {
                this.loading = false;
                this.toastr.error('Could not upload image', 'Error');
            })
        }
    }

    getBusinessInfo() {
        this.businessService.getBusinessInfoData().subscribe((res: any) => {
            this.id = res.response_data._id;
            this.business = Array.isArray(res.response_data) ? res.response_data[0] : res.response_data;
            if (!this.business.iconLogo) {
                this.business.iconLogo = {
                    imageId: '',
                    imageUrl: '',
                    filePath: ''
                }
            }
            if (this.business.deliveryAppLogo.imageUrl != '') {
                this.delivaryurl1 = this.business.deliveryAppLogo.imageUrl;
            }
            if (this.business.webApp.imageUrl != '') {
                this.webAppurl1 = this.business.webApp.imageUrl;
            }
            if (this.business.userApp.imageUrl != '') {
                this.appurl1 = this.business.userApp.imageUrl;
            }
            if (this.business.dasboardLogo.imageUrl != '') {
                this.dashboardurl1 = this.business.dasboardLogo.imageUrl;
            }
            if (this.business.iconLogo && this.business.iconLogo.imageUrl != '') {
                this.iconLogoUrl = this.business.iconLogo.imageUrl;
            }
        });
    }

    onSubmitBusiness(form: NgForm) {
        // this.businessService.addBusinessData(this.business).subscribe((res: any) => {
        if (!this.business.deliveryAppLogo.filePath) {
            return this.toastr.info('Please change the delivery app logo', 'Info')
        }
        if (!this.business.dasboardLogo.filePath) {
            return this.toastr.info('Please change the dashboard logo', 'Info')
        }
        if (!this.business.userApp.filePath) {
            return this.toastr.info('Please change the user app logo', 'Info')
        }
        if (!this.business.webApp.filePath) {
            return this.toastr.info('Please change the web app logo', 'Info')
        }
        if (!this.business.iconLogo.filePath) {
            return this.toastr.info('Please change the dashboard icon', 'Info')
        }
        this.businessService.updateBusinessUpdate(this.business, this.id).subscribe((res: any) => {
            this.toastr.success('Sucess', res.response_data);
        })

    }

    ngOnInit() {

    }
}

