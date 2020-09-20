import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CrudService} from 'service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {MultiSelectModel} from '../adddeal/adddeal.component';
import {FileUploader} from 'ng2-file-upload';
import {environment} from 'environments/environment';
import {CommonTypeModel} from '../addcoupon/addcoupon.component';

@Component({
    selector: 'app-editdeal',
    templateUrl: './editdeal.component.html',
    styleUrls: ['./editdeal.component.scss']
})
export class EditdealComponent implements OnInit {


    public itemName: string;
    public id: string;
    public catId: any;
    public catData: Array<CommonTypeModel> = [];
    // public catData: Array<MultiSelectModel> = [];
    public prodData: Array<CommonTypeModel> = [];
    public prodDataCopy: Array<CommonTypeModel> = [];
    prodDetails: Array<any> = [];
    // public dealOffer: Array<any> = [10, 20, 30, 50, 80, 100];

    public editDeals = {
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
    }
    public isDisabled: boolean = false;

    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});   // maxFileSize: 9999999


    constructor(private api: CrudService, private toastr: ToastrService,
                private http: HttpClient, private router: Router, private route: ActivatedRoute) {
        this.getCat();
        this.getProd();

        this.uploader.onBeforeUploadItem = item => {
            item.withCredentials = false;
        };
        this.route.params.subscribe((response: any) => {
            this.catId = response.id;
            this.showcat(this.catId);                                                         //D
        });


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
                this.editDeals.imageUrl = res.response_data[0].originalImage.url;
                this.editDeals.imageId = res.response_data[0].originalImage.key;
                this.editDeals.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload image', 'Error');
            });
        }
    }

    getCat() {
        this.api.getCatList().subscribe((res: any) => {
            this.catData = res.response_data;
        });
    }

    categorySelect(category) {

        var cat = category.split('+');
        this.editDeals.category = cat[0];
        this.editDeals.category = cat[0];

    }

    getProd() {
        this.api.getProdList().subscribe((res: any) => {
            this.prodData = res.response_code === 200 ? res.response_data : [];
            this.prodDataCopy = this.prodData;
        }, error => {
            this.prodData = [];
        });
    }


    showcat(_id) {
        this.api.getData(`deals/${_id}`).subscribe((res: any) => {
            this.editDeals = res.response_data;
            this.editDeals.category = res.response_data.category ? res.response_data.category._id : null;
            this.editDeals.product = res.response_data.product ? res.response_data.product._id : null;
        });
    }

    onSelectCat(init?: boolean) {
        this.prodData = this.prodDataCopy.filter((product: any) => product.category === this.editDeals.category);
        // if (this.addDeals.category === 'All') {
        //   this.catData = this.filtervalue;
        // } else {
        //   this.catData = this.filtervalue.filter(val => val.event === event);
        // }

    }


    onSubmitEditDeal() {
        if (!this.editDeals.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        if (this.editDeals.delalType === 'Category') {
            this.editDeals.product = null;
        } else {
            this.editDeals.category = null;
        }
        this.api.putDeals(this.catId, this.editDeals).subscribe((res: any) => {
            this.toastr.success('Updated Successful...', 'Success !')
            this.router.navigate(['/deals']);

        }, error => this.toastr.error(error.error.message, 'Error'));
    }

    // update() {
    //   this.router.navigate(['/deals']);
    // }

    onClick() {
        this.router.navigate(['/deals']);
    }

}
