import {Component, OnInit} from '@angular/core';
import {CrudService} from 'service/crud.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-editcategory',
    templateUrl: './editcategory.component.html',
    styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {


    public url: any = 'assets/img/upload.png';
    public editCat: any = {
        title: '',
        description: '',
        imageUrl: '',
        imageId: '',
        filePath: ''
    }


    // editCat: any = [];
    catId: any;
    public isDisabled:boolean = false;

    constructor(private api: CrudService, private http: HttpClient, private toastr: ToastrService,
                private route: ActivatedRoute, private router: Router) {

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
                this.url = res.response_data[0].originalImage.url;
                this.toastr.success('Image uploaded successfully', 'Success');
                this.editCat.imageUrl = res.response_data[0].originalImage.url;
                this.editCat.imageId = res.response_data[0].originalImage.key;
                this.editCat.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload image', 'Error', {timeOut: 4000});
            });
        }
    }

    showcat(_id) {
        this.api.getCatbyId(_id).subscribe((res: any) => {
            this.editCat = res.response_data;
        }, error => {
            this.editCat = {};
        });
    }


    onSubmit(form: NgForm) {
        if (!this.editCat.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        if (this.editCat.imageUrl === undefined || this.editCat.imageUrl === '' || this.editCat.imageUrl === null) {
            this.toastr.warning('Please Upload image');
        } else {
            this.api.putCat(this.catId, this.editCat).subscribe((res: any) => {
                this.toastr.success('Category Updated Sucessfully', 'Success')
                this.router.navigate(['/categories']);
            });
        }

    }

    cancel() {
        this.router.navigate(['/categories']);
    }

}
