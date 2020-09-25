import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ICategory } from 'src/app/Interfaces/icategory';
import { CategoryService } from 'src/app/Services/category.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/Classes/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,AfterViewInit {
  products:IProduct[]=[];
  Categories:ICategory[]=[];
  SelectedCatID:number;
  SearchKey:string;
  NoOfPS:number;
  IsAdmin:boolean;
  
  TotalPrice:number;
  // @ViewChild('no') elm:ElementRef;
  constructor(private ps:ProductService,
    private Cs:CategoryService,private route:Router)
     {
    this.IsAdmin=( localStorage.getItem('Role')=='admin')?true:false;
    this.TotalPrice=0;

      }
  ngAfterViewInit(): void {
  //   this.elm.nativeElement.value= this.products.length;
  
  }

  ngOnInit(): void
  {
   this.Cs.FillCategories().subscribe(
     res=>
     {
      this.Categories=res;
     },
     err=>
     {
      console.log("Api error");
      console.log(err);
     }
   )

    this.SelectedCatID=0;
    this.SearchKey="";
    this.ps.
    FillProductsfrmApi().subscribe(
      res=> 
         {
           this.products=res;
           for (var product of this.products) 
           {
            product.Rate=new Array(product.Stars);
            product.TopRated=(product.Stars<5)?false:true;
            // console.log(product.Rate)
            // console.log(product.UnRate)
           }

        

         
           this.NoOfPS=this.products.length;
          //  console.log(this.products)
        },
      err=>
      {
        console.log("Api error");
        console.log(err);
      }
    )
  }
  onChange(newValue) {
    
    this.SelectedCatID = newValue;

  }
  onClick(search) {
    this.SearchKey = search;
    

  }
  getProductsByCatName(categorID,search):IProduct[]{
    
    console.log("cat : "+categorID);

    console.log("ser : "+search);
   let prds:IProduct[]=[];


    if(categorID==0)
    {
      prds= this.products;
      if(search !="")
      {
         prds= prds.filter((p)=>p.Name.toLowerCase().indexOf(search.toLowerCase())!=-1);
      }
      
    }
    
      else 
    {
      prds= this.products.filter((p)=>p.CatID==categorID);
      if(search !="")
      {
        prds= prds.filter((p)=>p.Name.toLowerCase().indexOf(search.toLowerCase())!=-1);
      }
    
    }
    console.log(prds);
    return prds;

   }

   DeletePrd(pid:number)
   {
       if(confirm('Are you sure !!'))
       {
         this.ps.delete(pid).subscribe(
          res=>
          { 
            // console.log(res);
            this.route.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.onSameUrlNavigation = 'reload';
            this.route.navigate(['/Products']);
        

          },
          err=>
          {
            console.log("Api error");
            console.log(err);
          }
        )


       }
   }
   
   UpdateCart(pId:number,pcount:number,price:number)
  {
    this.TotalPrice=0;
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



}
