import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product-list.model';
import { ProductListService } from './../../services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] ;

  constructor(private productListService: ProductListService) { }

  ngOnInit(): void {
    this.productListService.getProduct().subscribe((productData) => {
      this.products = productData;
    });
  }

}
