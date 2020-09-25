import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProduct } from '../Interfaces/iproduct';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../Classes/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
Products:Observable<IProduct[]>;
ProductCart:Array<Cart> = [];
TotalPrice:number;
  constructor(private h:HttpClient) { }

  FillProductsfrmApi():Observable<IProduct[]>{
    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
       ,'Authorization': 'Bearer '
       + localStorage.getItem("userToken")
      });
     this.Products=this.h.get<IProduct[]>(`${environment.DataURl}/product`);
     return this.Products;
   }
   GetProductByID(ProductID):Observable<IProduct>{
    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
       ,'Authorization': 'Bearer '
       + localStorage.getItem("userToken")
      });

     return this.h.get<IProduct>(`${environment.DataURl}/product/${ProductID}`);
     
   }

   Add(Prd:IProduct ,PrdImage:File):Observable<IProduct>{
     console.log("add");
     console.log(Prd);
    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
       ,'Authorization': 'Bearer '
       + localStorage.getItem("userToken")
      });


     const Prdfd = new FormData();
     Prdfd.append('ID',Prd.ID.toString());
     Prdfd.append('Name',Prd.Name);
     Prdfd.append('Price',Prd.Price.toString());
     Prdfd.append('Image',PrdImage);
     Prdfd.append('Brand',Prd.Brand);
     Prdfd.append('Description',Prd.Description);
     Prdfd.append('Stars',Prd.Stars.toString());
     Prdfd.append('Sale',Prd.Sale.toString());
     Prdfd.append('Quantity',Prd.Quantity.toString());
     Prdfd.append('CatID',Prd.CatID.toString());
     console.log(Prdfd.get('Name'));
     return this.h.post<IProduct>(`${environment.DataURl}/product`,Prdfd)

    }

    update(Prd:IProduct,PrdImage:File):Observable<IProduct>
    {
      const httpOptions =  new HttpHeaders({
        'Content-Type': 'application/json',
         'Accept': ' */*'
         ,'Authorization': 'Bearer '
         + localStorage.getItem("userToken")
        });

        const Prdfd = new FormData();
        Prdfd.append('ID',Prd.ID.toString());
        Prdfd.append('Name',Prd.Name);
        Prdfd.append('Price',Prd.Price.toString());
        Prdfd.append('Image',PrdImage);
        Prdfd.append('Brand',Prd.Brand);
        Prdfd.append('Description',Prd.Description);
        Prdfd.append('Stars',Prd.Stars.toString());
        Prdfd.append('Sale',Prd.Sale.toString());
        Prdfd.append('Quantity',Prd.Quantity.toString());
        Prdfd.append('CatID',Prd.CatID.toString());
        console.log("update prd id :"+Prdfd.get('ID'));

       return this.h.put<IProduct>(`${environment.DataURl}/product`,Prdfd)
      }

    delete(pid):Observable<IProduct>
    {
      const httpOptions =  new HttpHeaders({
        'Content-Type': 'application/json',
         'Accept': ' */*'
         ,'Authorization': 'Bearer '
         + localStorage.getItem("userToken")
        });
       return this.h.delete<IProduct>(`${environment.DataURl}/product/${pid}`)
      }
     
      
      UpdateCart(ProductCart:Cart[],TotalPrice:number)
      {
       this.ProductCart=ProductCart;
       this.TotalPrice=TotalPrice;

      console.log( this.ProductCart=ProductCart);
      console.log(this.TotalPrice=TotalPrice);
      }
      
}

