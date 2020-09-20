import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../service/crud.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-addcategory',
    templateUrl: './addcategory.component.html',
    styleUrls: ['./addcategory.component.scss']
})
export class AddcategoryComponent implements OnInit {


    public url1: any = 'assets/img/blank.png';
    public addCat: any = {
        title: '',
        description: '',
        imageUrl: '',
        imageId: '',
        filePath: ''
        //status: 'true',

    }
    public isDisabled: boolean = false;
    public uploader: FileUploader = new FileUploader({url: environment.apiEndPoint + 'utils/upload/file/imagekit'});   // maxFileSize: 9999999


    constructor(private api: CrudService, private router: Router,
                private http: HttpClient, private toastr: ToastrService) {

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
                this.addCat.imageUrl = res.response_data[0].originalImage.url;
                this.addCat.imageId = res.response_data[0].originalImage.key;
                this.addCat.filePath = res.response_data[0].originalImage.filePath;
            }, error => {
                this.isDisabled = false;
                this.toastr.error('Could not upload image', 'Error');
            });
        }
    }


    submitCat(form: NgForm) {
        if (!this.addCat.filePath) {
            return this.toastr.info('Please change the banner image', 'Info');
        }
        if (this.addCat.imageUrl === undefined || this.addCat.imageUrl === '' || this.addCat.imageUrl === null) {
            this.toastr.warning('Please Upload image');
        } else {
            this.api.postCat(this.addCat).subscribe((res: any) => {
                this.toastr.success('Category added Successfully', 'Success');
                this.router.navigate(['/categories']);
            });

        }


    }

    onCancel() {
        this.router.navigate(['/categories']);
    }


}
