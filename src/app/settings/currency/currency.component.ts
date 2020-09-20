import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { CrudService } from 'service/crud.service';
import { NgForm } from '@angular/forms';

export interface CurrencyListModel {
    currencyName: string;
    currencyCode: string;
}

export interface LanguageCodeModel {
    languageCode: string;
}

@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

    // public dataInfo: any = [];
    public languageListData: Array<LanguageCodeModel> = [];
    public currencyListData: Array<CurrencyListModel> = [];
    public id: string = null;


    public dataInfo = {
        languageCode: '',
        //currencyCode: '',
        currencyName: '',
        currencyCode: '',
    };    // contains current selected currency and language


    constructor(private toastr: ToastrService, private api: CrudService) {
        this.getInfo();
        this.getList();
    }

    ngOnInit() {

    }


    // contains current selected user currency
    private getInfo(): void {
        this.api.getCurrencyLanguageDataInfo().subscribe((res: any) => {
            if (res.response_code === 200) {
                this.dataInfo = {
                    languageCode: res.response_data.languageCode,
                    currencyName: res.response_data.currencyName,
                    currencyCode: res.response_data.currencyCode,
                }
            }
        }, error => {
            this.dataInfo = {
                languageCode: '',
                currencyName: '',
                currencyCode: '',
            }
        });
    }

    // get's currencies and language information
    private getList(): void {
        this.api.getCurrencyLanguageList().subscribe((res: any) => {
            this.languageListData = res.response_data.languageList;
            this.currencyListData = res.response_data.currencyList;
            this.id = res.response_data._id;
        }, error => {
            this.languageListData = [];
            this.currencyListData = [];
        });
    }

    // sends request to update currency and language information
    public onSubmitInfo(): void {
        this.api.putInfoById(this.id, this.dataInfo).subscribe((res: any) => {
            if (res.response_code === 200 || res.response_code === 201) {
                this.toastr.success(res.response_data, "Success");
            } else {
                this.toastr.error(res.response_data, "Error");
            }
        }, error => {
            this.toastr.error('Could not update the information.', 'Error');
        });
    }

}
