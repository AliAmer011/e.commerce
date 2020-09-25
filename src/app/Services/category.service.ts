import { Injectable } from '@angular/core';
import { ICategory } from '../Interfaces/icategory';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  Categories:Observable<ICategory[]>;
  constructor(private h:HttpClient) {
 
   }

   FillCategories():Observable<ICategory[]>{

    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
       ,'Authorization': 'Bearer '
       + localStorage.getItem("userToken")
      });
     
      this.Categories = this.h.get<ICategory[]>(`${environment.DataURl}/Category`,{headers:httpOptions});
    return this.Categories;
  }


  Add(cat:ICategory):Observable<ICategory>{
    const httpOptions =  new HttpHeaders({
      'Content-Type': 'application/json',
       'Accept': ' */*'
       ,'Authorization': 'Bearer '
       + localStorage.getItem("userToken")
      });
     return this.h.post<ICategory>(`${environment.DataURl}/Category`,cat,{headers:httpOptions})
    }
}
