import {Component, TemplateRef} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CrudService} from '../../service/crud.service';
import {ToastrService} from 'ngx-toastr';
import {CommonTypeModel} from '../pages/addcoupon/addcoupon.component';

export interface SubCategoryDataModel {
    title: string;
    category: string;
    discription: string;
}

export interface SubCategoryListModel {
    title: string;
    category: CommonTypeModel;
    discription: string;
    _id: string;
    status: number;
}

@Component({
    selector: 'app-sub-category-component',
    templateUrl: './sub-category.component.html',
    styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {
    public page: number = 1;        // contains default page number
    public limit: number = 10;          // renders 10 records per page
    private modalRef: NgbModalRef;          // contains reference to sub-category modal
    public categories: Array<CommonTypeModel> = [];         // contains the list of all categories
    public subCategories: Array<SubCategoryListModel> = [];         // contains the list of subcategories
    public subCategoryData: SubCategoryDataModel;           // contains information to add/update sub-category
    private id: string = null;          // contains id to edit record

    constructor(private modalService: NgbModal, private crud: CrudService, private toastr: ToastrService) {
        this.subCategoryData = this.getDefaultSubCategories();
        this.getAllCategories();
        this.getAllSubcategories();
    }

    // get's all sub-categories
    private getAllSubcategories(): void {
        this.crud.getData('subcategory/all/list').subscribe((res: any) => {
            this.subCategories = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.subCategories = [];
        });
    }

    // returns default sub-categories
    private getDefaultSubCategories(subCategory?: SubCategoryListModel): SubCategoryDataModel {
        return {
            title: subCategory ? subCategory.title : '',
            discription: subCategory ? subCategory.discription : '',
            category: subCategory ? subCategory.category._id : ''
        }
    }

    // sends request to get the list of all categories
    private getAllCategories(): void {
        this.crud.getData('categories/list').subscribe((res: any) => {
            this.categories = res.response_code === 200 ? res.response_data : [];
        }, error => {
            this.categories = [];
        });
    }

    // opens sub-category modal
    public openAddSubCatModal(templateRef: TemplateRef<any>, subcategory?: SubCategoryListModel): void {
        this.modalRef = this.modalService.open(templateRef);
        if (subcategory) {
            this.id = subcategory._id;
            this.subCategoryData = this.getDefaultSubCategories(subcategory);
        }
    }

    // closes sub-category modal
    public closeModal(): void {
        this.modalRef.close();
        this.subCategoryData = this.getDefaultSubCategories();
    }

    // updates status
    public updateStatus(id: string, status: boolean) {
        const body = {
            status: !status ? 0 : 1
        }
        this.crud.updateData(`subcategory/enble/disable/${id}`, body).subscribe((res: any) => {
            if (res.response_code === 200) {
                this.toastr.success('Sub category updated successfully', 'Success');
            } else {
                this.toastr.success(res.response_data, 'Error');
            }
        }, error => {
            this.toastr.error('Could not save sub category');
        });
    }

    // save sub-category
    public saveSubCategory(): void {
        this.crud.saveData('subcategory/add/subcategory', this.subCategoryData).subscribe((res: any) => {
            if (res.response_code === 201 || res.response_code === 200) {
                this.toastr.success('Sub category updated successfully', 'Success');
                this.closeModal();
                this.getAllSubcategories();
            } else {
                this.toastr.success(res.response_data, 'Error');
            }
        }, error => {
            this.toastr.error('Could not save sub category', 'Error');
        });
    }

    // update sub-category
    public updateSubCategory(): void {
        this.crud.updateData(`subcategory/update/${this.id}`, this.subCategoryData).subscribe((res: any) => {
            if (res.response_code === 200) {
                this.closeModal()
                this.toastr.success('Sub category updated successfully', 'Success');
                this.getAllSubcategories();
            } else {
                this.toastr.success(res.response_data, 'Error');
            }
        }, error => {
            this.toastr.error('Could not save sub category');
        });
    }
}
