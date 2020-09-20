import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../../service/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.scss']
})
export class ShowproductComponent implements OnInit {

  prodData: any = [];
  prodId: any;

  constructor(private api: CrudService, private router: Router,
    private http: HttpClient, private route: ActivatedRoute) {

    this.route.params.subscribe((response: any) => {

      this.prodId = response.id;

      this.showcat(this.prodId);                                                         //D
    });


  }

  ngOnInit() {
  }

  showcat(_id) {
    this.api.getProdbyId(_id).subscribe((res: any) => {
      this.prodData = res.response_data;
    })
  }

}
