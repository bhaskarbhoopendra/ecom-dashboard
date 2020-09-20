import { Component, OnInit } from '@angular/core';
import { CurrencyManagementService } from '../currency-management/currency-management.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-currency',
  templateUrl: './edit-currency.component.html',
  styleUrls: ['./edit-currency.component.scss']
})
export class EditCurrencyComponent implements OnInit {

  public currencyId: any;


  constructor(private api: CurrencyManagementService, private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router) {


  }

  ngOnInit() {
  }

}
