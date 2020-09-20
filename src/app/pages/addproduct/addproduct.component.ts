import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../service/crud.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {ProductsModel} from '../products.model';
import {CommonTypeModel} from '../addcoupon/addcoupon.component';
import {SubCategoryListModel} from '../../sub-category/sub-category.component';


@Component({
    selector: 'app-addproduct',
    templateUrl: './addproduct.component.html',
    styleUrls: ['./addproduct.component.scss']
})
export class AddproductComponent implements OnInit {
    public catData: Array<CommonTypeModel> = [];
    public url: any = 'assets/img/emptyimg.png';
    public addProd: ProductsModel;
    public subCategories: Array<SubCategoryListModel> = [];         // contains the list of subcategories
    public subCategoriesCopy: Array<SubCategoryListModel> = [];         // contains the list of subcategories
    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});   // maxFileSize: 9999999
    public isDisabled:boolean = false;      // disabled the submit button

    constructor(private api: CrudService, private router: Router,
                private http: HttpClient, private toastr: ToastrService) {
        this.addProd = this.getDefaultProductValues();
        this.uploader.onBeforeUploadItem = item => {
            item.withCredentials = false;
        };
        this.getCat();
        this.getAllSubcategories();
    }

    // get's all sub-categories
    private getAllSubcategories(): void {
        this.api.getData('subcategory/all/list').subscribe((res: any) => {
            this.subCategoriesCopy = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.subCategories = [];
        });
    }

    // returns default product values
    private getDefaultProductValues() {
        return {
            title: '',
            description: '',
            imageUrl: '',
            category: '',
            imageId: '',
            type: '',
            variant: [{
                enable: true,
                productstock: 0,
                unit: '',
                price: 0,
                // brand: '',
            }],
            subcategory: null,
            filePath: ''
        };
    }

    ngOnInit() {
    }

    // filters sub category based on selected category
    public filterSubCat(): void {
        this.addProd.subcategory = null;
        this.subCategories = this.subCategoriesCopy.filter(category => category.category._id === this.addProd.category);
    }

    public addNewVariant(): ActiveToast<string> | void {
        const check = this.addProd.variant.find(v => v.unit === '' || v.price === null || v.price === 0 || v.price < 0 || v.enable === null || v.productstock === null || v.productstock === 0 || v.productstock < 0);
        if (check) {
            return this.toastr.warning('Please fill the variant information to add new one', 'Warning');
        }
        this.addProd.variant.push({enable: true, productstock: 0, unit: '', price: 0});
    }

    public removeVariant(removeIndex): void { // remove Item from Index
        if (this.addProd.variant.length > 1) {
            this.addProd.variant.splice(removeIndex, 1);
        }
    }

    // resets product variants
    public resetProductStock(index): void {
        this.addProd.variant[index].productstock = 0;
    }

    // onClickRemove(index) {
    //   this.addProd.variant.splice(index, 1);
    // }

    public readUrl1(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.isDisabled = true;
            this.api.uploadImage(formData).subscribe(res => {
                this.isDisabled = false;
                this.url = res.response_data[0].originalImage.url;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.addProd.imageUrl = res.response_data[0].originalImage.url;
                this.addProd.imageId = res.response_data[0].originalImage.key;
                this.addProd.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload the image');
                this.addProd.imageUrl = null;
            });
        }
    }

    private getCat(): void {
        this.api.getCatList().subscribe((res: any) => {
            this.catData = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.catData = [];
        });
    }

    public cancelProductCreate(): void {
        this.router.navigate(['/products']);
    }


    // Variant Dropdown data

    public categoryList: Array<any> = [
        {name: 'Volume', subcategoryList: ['1 litre', '2 litres', '3 litres']},
        {name: 'Kilogram', subcategoryList: ['1 kg', '2 kg', '3 kg', '4 kg']},
        {name: 'Quantity', subcategoryList: ['1']},
    ];


    public addNewProduct(): ActiveToast<any> | void {
        if (!this.addProd.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        const check = this.addProd.variant.find(v => v.unit === '' || v.price === null || v.price === 0 || v.price < 0 || v.enable === null || v.productstock === null || v.productstock === 0 || v.productstock < 0);
        if (check) {
            return this.toastr.warning('Please fill the variant information to add new one', 'Warning');
        }
        if (!this.addProd.imageUrl) {
            this.toastr.warning('Please Upload image');
        } else {
            this.api.postProd(this.addProd).subscribe((res: any) => {
                if (res.response_code !== 201) {
                    return this.toastr.error('Could not add product', 'Error', {timeOut: 3000});
                }
                this.toastr.success('Product Added Successfully ', 'Success');
                this.router.navigate(['/products']);
            }, error => {
                this.toastr.error('Could not add product', 'Error', {timeOut: 3000});
            });
        }
    }

}
