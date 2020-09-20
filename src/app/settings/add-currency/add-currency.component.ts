import { Component, OnInit } from '@angular/core';
import { CurrencyManagementService } from '../currency-management/currency-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss']
})
export class AddCurrencyComponent implements OnInit {

  public addCurrency: any = {

    currencyName: '',
    currencySign: '',

  }


  constructor(private api: CurrencyManagementService, private toastr: ToastrService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onAddCurrency(form: NgForm) {
    this.api.addCurrencydata(this.addCurrency).subscribe((res: any) => {

    });

  }


}
