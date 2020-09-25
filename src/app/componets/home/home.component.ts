import { Component, OnInit } from '@angular/core';
import { IAcount } from 'src/app/Interfaces/iacount';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/cart';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products:IProduct[]=[];
  account:IAcount;
  
  
  LoginForm:FormGroup;
    constructor(private ps:ProductService,private as:AccountService
      ,private route:Router,private FB:FormBuilder) {
      this.account={
     UserName:'',
     Password:'',
     grant_type: 'password'
      }
     }
  
    ngOnInit(): void {


     



      this.LoginForm=this.FB.group({
        UserName:['',[Validators.required,Validators.minLength(3)]],
        Password:['',[Validators.required,Validators.minLength(6)]],
      
      })

     
  
    }
    
    Login(){
      this.as.Login(this.account.UserName,this.account.Password
        ).subscribe((data : any)=>{
        localStorage.setItem('userToken',data.access_token);

        if(this.account.UserName=='admin')
        {
        localStorage.setItem('Role','admin');
        localStorage.setItem('Cart', JSON.stringify(new Array()));
        }
        else
        {
        localStorage.setItem('Role','user');
        this.ResetCart();
        }
        console.log(localStorage.getItem('userToken'));
        // window.location.reload();
        this.route.navigate(['/Products']);
       
        
      },
      err=>console.log(err)
      );
    }
  ResetCart() 
  {
   
    this.ps.
    FillProductsfrmApi().subscribe(
      res=> 
         {
           this.products=res;  
           console.log(res);         
        },
      err=>
      {
        console.log("Api error");
        console.log(err);
      }
    )
setTimeout(() => 
{


    console.log("ResetCart");
    console.log(this.products);

    let ProductCart:Array<Cart> = [];
    for (let i = 0; i < this.products.length; i++)
    {
     let cartelm = new Cart(this.products[i].ID,0,0);
     ProductCart.push(cartelm);
    }

    localStorage.setItem('Cart', JSON.stringify(ProductCart));

    console.log(  localStorage.getItem('Cart'));

  },
  2000);
  }
   
   }
  
 
   