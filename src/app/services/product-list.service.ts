import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient, private router: Router) {}

  getProduct(): any {
    return this.http.get<any>(`${environment.baseURL}product/all-product`).pipe(
      map(res => {
        return res.data || {};
      })
    );
  }

  public getDetailProduct(_id): Observable<any> {
    return this.http.get<any>(`${environment.baseURL}product/${_id}`)
  };

  addToCart(product: string, quantity: number){
    return this.http.post<any>(`${environment.baseURL}cart/addtocart/push`, {
      product: product,
      quantity: quantity
    }).subscribe();
  }
}

  // getById(_id: string):Observable<any>{
  //   return this.http.get<any>(`${environment.baseURL}product/${_id}`).pipe(map(res => {
  //     return res;
  //   }));
  // }

