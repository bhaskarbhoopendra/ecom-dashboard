import { Component, OnInit } from '@angular/core';
import { CrudService } from 'service/crud.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-viewdeal',
  templateUrl: './viewdeal.component.html',
  styleUrls: ['./viewdeal.component.scss']
})
export class ViewdealComponent implements OnInit {

  // contains deal information
  public dealsData = {
    status: null,
    _id: '',
    name: '',
    description: '',
    delaPercent: null,
    product: {
      _id: '',
      title: ''
    },
    category: {
      _id: '',
      title: ''
    },
    imageUrl: '',
    imageId: '',
    delalType: '',
    createdAt: '',
    updatedAt: ''
  }
  dealsId: any;

  constructor(private api: CrudService, private router: Router,
    private http: HttpClient, private route: ActivatedRoute) {

    this.route.params.subscribe((response: any) => {

      this.dealsId = response.id;

      this.showcat(this.dealsId);                                                         //D
    });

  }

  ngOnInit() {
  }

  showcat(_id) {
    this.api.getDealsbyId(_id).subscribe((res: any) => {
      this.dealsData = res.response_data;
    })
  }

}
