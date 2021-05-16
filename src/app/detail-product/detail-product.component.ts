import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductListService } from '../services/product-list.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  _id: any;
  products: any;
  constructor( private productListService: ProductListService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this._id = this.route.snapshot.params['id'];
    this.getById();
  }
  getById(): void{
    this.productListService.getDetailProduct(this._id).subscribe(data => {
      this.products = data;
      // console.log(this.products);
    });
  }

  // getDetailProduct(): void{
  //   const productId = +this.route.snapshot.paramMap.get('_id');
  //   this.productListService.getById(this.id).subscribe(data => {
  //     this.product = data.product;
  //   });
  //   console.log(productId);
  //   console.log(typeof(productId));
  // }
}
