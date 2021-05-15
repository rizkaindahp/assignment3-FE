import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor( private http: HttpClient ) { }

  getCart(): any {
    return this.http.get<any>(`${environment.baseURL}cart/addtocart`).pipe(
      map(res => {
        return res.data
      })
    );
  }
}
