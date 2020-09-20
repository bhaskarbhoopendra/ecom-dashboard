import { Component, OnInit } from '@angular/core';
import { CurrencyManagementService } from './currency-management.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currency-management',
  templateUrl: './currency-management.component.html',
  styleUrls: ['./currency-management.component.scss']
})
export class CurrencyManagementComponent implements OnInit {

  public currencyData: any = [];


  constructor(private api: CurrencyManagementService, private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router) {
    this.getlistCurrency();
  }

  ngOnInit() {
  }


  getlistCurrency() {
    this.api.getCurrencyList().subscribe((res: any) => {
      this.currencyData = res.response_data.currency;

    });
  }


}
