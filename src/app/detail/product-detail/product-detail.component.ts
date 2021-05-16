import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductListService } from 'src/app/services/product-list.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  _id: any;
  product: any;
  constructor( private productListService: ProductListService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this._id = params.get('_id')
      console.log(this._id)
    })
    this.getById();
  }

  getById(): void{
    this.productListService.getDetailProduct(this._id).subscribe(data => {
      this.product = data.data;
      console.log(this.product);
    });
  }
}
