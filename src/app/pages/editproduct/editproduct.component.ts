import {Component, OnInit} from '@angular/core';
import {CrudService} from 'service/crud.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ActiveToast, ToastrService} from 'ngx-toastr';
import {FileUploader} from 'ng2-file-upload';
import {environment} from 'environments/environment';
import {ProductsModel} from '../products.model';
import {CommonTypeModel} from '../addcoupon/addcoupon.component';
import {SubCategoryListModel} from '../../sub-category/sub-category.component';

@Component({
    selector: 'app-editproduct',
    templateUrl: './editproduct.component.html',
    styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {
    public catData: Array<CommonTypeModel> = [];
    private prodId: string = null;
    public editProd: ProductsModel;
    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});   // maxFileSize: 9999999

    public subCategories: Array<SubCategoryListModel> = [];         // contains the list of subcategories
    public subCategoriesCopy: Array<SubCategoryListModel> = [];         // contains the list of subcategories
    public isDisabled: boolean = false;

    constructor(private api: CrudService, private http: HttpClient,
                private route: ActivatedRoute, private toastr: ToastrService,
                private router: Router) {
        this.editProd = this.getDefaultProductValues();
        this.route.params.subscribe((response: any) => {
            this.prodId = response.id;
        });
        this.getCat();
        this.getAllSubcategories();
    }

    // get's all sub-categories
    private getAllSubcategories(): void {
        this.api.getData('subcategory/all/list').subscribe((res: any) => {
            this.subCategoriesCopy = res.response_code === 200 ? res.response_data : [];
            this.getProductDetails();
        }, error => {
            this.subCategories = [];
        });
    }

    ngOnInit() {
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

    // adds a new variant row
    public addNewVariant(): ActiveToast<string> | void {
        const check = this.editProd.variant.find(v => v.unit === '' || v.price === null || v.price < 0 || v.price === 0 || v.enable === null || v.productstock === null || v.productstock === 0 || v.productstock < 0);
        if (check) {
            return this.toastr.warning('Please fill the variant information to add new one', 'Warning');
        }
        this.editProd.variant.push({enable: true, productstock: 0, unit: '', price: 0});
    }

    // resets product variants
    public resetProductStock(index): void {
        this.editProd.variant[index].productstock = 0;
    }

    // removes variant
    public removeVariant = function (removeIndex): void { // remove Item from Index
        if (this.editProd.variant.length > 1) {
            this.editProd.variant.splice(removeIndex, 1);
        }
    }


    // read's selected image file and uploads it to AWS S3
    public readUrl1(event) {
        if (event.target.files && event.target.files[0]) {
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.isDisabled = true;
            this.api.uploadImage(formData).subscribe(res => {
                this.isDisabled = false;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.editProd.imageUrl = res.response_data[0].originalImage.url;
                this.editProd.imageId = res.response_data[0].originalImage.key;
                this.editProd.filePath = res.response_data[0].originalImage.filePath;
                //  this.editProd.imageId = res.response_data.key
                //  console.log('imageId ', this.editProd.imageId)
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload image', 'Error', {timeOut: 4000});
            });
        }
    }

    getCat() {
        this.api.getCatList().subscribe((res: any) => {
            this.catData = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.catData = [];
        });
    }


    private getProductDetails(): void {
        this.api.getProdbyId(this.prodId).subscribe((res: any) => {
            this.editProd = res.response_code === 200 ? res.response_data : this.getDefaultProductValues();
            this.filterSubCat();
        }, error => {
            this.editProd = this.getDefaultProductValues();
        });
    }

    // filters sub category based on selected category
    public filterSubCat(): void {
        this.subCategories = this.subCategoriesCopy.filter(category => category.category._id === this.editProd.category);
    }

    // Variant Dropdown data

    public categoryList: Array<any> = [
        {name: 'Volume',},
        {name: 'Kilogram'},
        {name: 'Quantity'},
    ];

    public updateProduct(): ActiveToast<string> | void {
        if (!this.editProd.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        const check = this.editProd.variant.find(v => v.unit === '' || v.price === null || v.price < 0 || v.price === 0 || v.enable === null || v.productstock === null || v.productstock === 0 || v.productstock < 0);
        if (check) {
            return this.toastr.warning('Please fill the variant information to add new one', 'Warning');
        }
        if (!this.editProd.imageUrl) {
            this.toastr.warning('Please Upload image');
        } else {
            this.api.putProd(this.prodId, this.editProd).subscribe((res: any) => {
                if (res.response_code !== 200) {
                    return this.toastr.error('Could not update product', 'Error');
                }
                this.toastr.success('Success', 'Updated Sucessfully !')
                this.router.navigate(['/products']);
            }, error => {
                this.toastr.error('Could not update product', 'Error');
            });
        }
    }

    public cancelProductUpdate(): void {
        this.router.navigate(['/products']);
    }


}
