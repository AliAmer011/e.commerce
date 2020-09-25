import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Classes/cart';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  TotalPrice:number;
  PrdList:IProduct[];
  PrdCart:IProduct[]=[];
  constructor(private ps:ProductService,private route:Router, private location:Location) 
  { 
    this.TotalPrice=0;
  }

  ngOnInit(): void {
    
    this.ps.
    FillProductsfrmApi().subscribe(
      res=> 
         {
           this.PrdList=res;   
           this.UpdateCart();
         },
      err=>
      {
        console.log("Api error");
        console.log(err);
      }
    )
  }

  UpdateCart() {
    this.TotalPrice=0;
    this.PrdCart=[];
    console.log("TotalPrice"+this.TotalPrice);
    console.log(this.PrdCart);
    let ProductCart:Array<Cart>=JSON.parse(localStorage.getItem('Cart'));
         
         for (let i = 0; i < this.PrdList.length; i++)
         {
           
                for (let k = 0; k < ProductCart.length; k++)
                  {
                 if(this.PrdList[i].ID==ProductCart[k].PID && ProductCart[k].PQ!=0)
                   {
                   
                    this.PrdList[i].PQ=ProductCart[k].PQ;
                    this.PrdList[i].TotalMoeny=ProductCart[k].TotalMoeny;
                    this.PrdList[i].Rate=new Array(this.PrdList[i].Stars);
                    this.PrdList[i].TopRated=(this.PrdList[i].Stars<5)?false:true;

                    this.PrdCart.push(this.PrdList[i]);
                  }
                }
                
        }

        for (let i = 0; i < this.PrdCart.length; i++)
         {
              this.TotalPrice+=this.PrdCart[i].TotalMoeny;
         }
       this.refresh();
 
  }


  
  AddToCart(pId:number,pcount:number,price:number)
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
     this.UpdateCart();
    // console.log(  localStorage.getItem('Cart'));

  }


  RemoveFrmCart(pId:number)
  {
    
    let ProductCart:Array<Cart>=JSON.parse( localStorage.getItem('Cart'));
    for (let i = 0; i < ProductCart.length; i++)
    {
      if(ProductCart[i].PID==pId)
     {
      ProductCart[i].PQ=0;
      ProductCart[i].TotalMoeny=0;
     }
  
    }
   
     localStorage.setItem('Cart', JSON.stringify(ProductCart));
     this.UpdateCart();
    // console.log(  localStorage.getItem('Cart'));

  }
 refresh():void
 {
   console.log("Resfresh");
   this.route.navigateByUrl('/Cart',{skipLocationChange:true}).then(()=>
   
   {
     this.route.navigate([decodeURI(this.location.path())]);
   });
 }

  goBack(){
    this.location.back();
  }

}
