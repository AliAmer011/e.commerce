import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { Cart } from 'src/app/Classes/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:IProduct;
  ProductID:number;
  constructor(private ps:ProductService,
              private ARService:ActivatedRoute,
              private location:Location) { }

  ngOnInit(): void 
  {
    this.ProductID=this.ARService.snapshot.params['productID'];
    console.log("id "+this.ProductID);
    this.ps.
    GetProductByID(this.ProductID).subscribe(
      res=> 
         {
           this.product=res;
           this.product.Rate=new Array(this.product.Stars);
           this.product.TopRated=(this.product.Stars<5)?false:true;
           console.log(this.product);
        },
      err=>
      {
        console.log("Api error");
        console.log(err);
      }
    )
  }


  UpdateCart(pId:number,pcount:number,price:number)
  {
    
    let ProductCart:Array<Cart>=JSON.parse( localStorage.getItem('Cart'));
    for (let i = 0; i < ProductCart.length; i++)
    {
      if(ProductCart[i].PID==pId)
     {
      ProductCart[i].PQ=pcount;
      ProductCart[i].TotalMoeny=pcount*price;
     }
  
    }
   
     localStorage.setItem('Cart', JSON.stringify(ProductCart));
    console.log(  localStorage.getItem('Cart'));

  }






  goBack(){
    this.location.back();
  }
}
