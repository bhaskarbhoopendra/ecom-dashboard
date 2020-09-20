import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CrudService} from 'service/crud.service';
import {FileUploader} from 'ng2-file-upload';
import {environment} from 'environments/environment';
import {NgForm} from '@angular/forms';
import {CommonTypeModel} from '../addcoupon/addcoupon.component';

export interface MultiSelectModel {
    id: string;
    itemName: string;
}

@Component({
    selector: 'app-adddeal',
    templateUrl: './adddeal.component.html',
    styleUrls: ['./adddeal.component.scss']
})
export class AdddealComponent implements OnInit {

    public catData: Array<CommonTypeModel> = [];
    public prodData: Array<CommonTypeModel> = [];
    public prodDataCopy: Array<CommonTypeModel> = [];

    filtervalue: any;


    public url1: any = 'assets/img/blank.png';
    public addDeals = {

        name: '',
        description: '',
        delaPercent: null,
        category: null,
        product: null,
        imageUrl: '',
        imageId: '',
        delalType: '',
        status: 1,
        topDeal: false,
        filePath: ''
    };

    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});   // maxFileSize: 9999999
    public isDisabled: boolean = false;

    constructor(private http: HttpClient, private toastr: ToastrService,
                private route: ActivatedRoute, private router: Router, private api: CrudService) {
        this.getCat();
        this.getProd();

        this.uploader.onBeforeUploadItem = item => {
            item.withCredentials = false;
        }

    }


    ngOnInit() {

    }

    readUrl1(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.isDisabled = true;
            this.api.uploadImage(formData).subscribe(res => {
                this.isDisabled = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.url1 = res.response_data[0].originalImage.url;
                this.addDeals.imageUrl = res.response_data[0].originalImage.url
                this.addDeals.imageId = res.response_data[0].originalImage.key
                this.addDeals.filePath = res.response_data[0].originalImage.filePath
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload the image', 'Error', {timeOut: 4000});
            });
        }
    }

    getCat() {
        this.api.getCatList().subscribe((res: any) => {
            this.catData = res.response_data;
        });
    }

    getProd() {
        this.api.getProdList().subscribe((res: any) => {
            this.prodData = res.response_code === 200 ? res.response_data : [];
            this.prodDataCopy = this.prodData;
        }, error => {
            this.prodData = [];
        });
    }

    //product filter based on category


    onSelectCat(event) {
        this.addDeals.category = event.target.value;
        this.prodData = this.prodDataCopy.filter((product: any) => product.category === this.addDeals.category);

    }

    cancel() {
        this.router.navigate(['/deals']);
    }


    onSubmitDeals(form: NgForm) {
        if (!this.addDeals.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        if (this.addDeals.imageUrl === undefined || this.addDeals.imageUrl === '' || this.addDeals.imageUrl === null) {
            return this.toastr.error('Please Upload image');
        }
        if (this.addDeals.delalType === 'Category') {
            this.addDeals.product = null;
        } else {
            this.addDeals.category = null;
        }

        this.api.postDeals(this.addDeals).subscribe((res: any) => {
            this.toastr.success('Data added Successful', 'Success !')
            this.router.navigate(['/deals']);
        }, error => this.toastr.error(error.error.message, 'Error'));
    }

}
