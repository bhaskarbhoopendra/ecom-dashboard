import { Component, OnInit } from '@angular/core';
import { CrudService } from 'service/crud.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewcategory',
  templateUrl: './viewcategory.component.html',
  styleUrls: ['./viewcategory.component.scss']
})
export class ViewcategoryComponent implements OnInit {

  catData: any = [];
  catId: any;


  constructor(private api: CrudService, private http: HttpClient, private route: ActivatedRoute) {

    this.route.params.subscribe((response: any) => {

      this.catId = response.id;

      this.showcat(this.catId);                                                         //D
    });

  }

  ngOnInit() {
  }

  showcat(_id) {
    this.api.getCatbyId(_id).subscribe((res: any) => {
      this.catData = res.response_data;
    })
  }

}
