import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Interfaces/icategory';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/cart';
import {Location} from '@angular/common'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  IsLogin:boolean;
  Categories:ICategory[]=[];
  NoCartPdrs:number;
  constructor(private route:Router, private location:Location) 
  {
     this.Updatebadge();

    this.IsLogin= localStorage.getItem('userToken')!=null;
    // console.log("islogin"+this.IsLogin);
    this.Categories=[ {ID:0,Name:'All'},
                   {ID:1,Name:'Watches'},
                   {ID:2,Name:'Laptops'},
                   {ID:3,Name:'Chairs'},
                   {ID:3,Name:'TV'},
                    ]
   }

  ngOnInit(): void {
  }

  LogOut()
  {
    localStorage.removeItem('userToken');
    localStorage.removeItem('Role');
    localStorage.removeItem('Cart');
    console.log("iislogin"+this.IsLogin);
    
    this.route.navigate(['/Home']);
    
    
  }

  Updatebadge()
  {
   this.NoCartPdrs=0;

   if(localStorage.getItem('Cart')!=null)
   {
   let ProductCart:Array<Cart>=JSON.parse( localStorage.getItem('Cart'));
        
   for (let i = 0; i < ProductCart.length; i++)
   {
           if(ProductCart[i].PQ!=0)
          this.NoCartPdrs++;
   }

  }

 
 }


//  refresh():void
//  {
//    console.log("Resfresh");
//    this.route.navigateByUrl('/Cart',{skipLocationChange:true}).then(()=>
   
//    {
//      this.route.navigate([decodeURI(this.location.path())]);
//    });
//  }
}
