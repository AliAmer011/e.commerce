import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ICategory } from 'src/app/Interfaces/icategory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/Services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/Services/category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  prd:IProduct;
  PrdImage:File;
  Categories:ICategory[]=[];
  
  prdID:number;
  EditPForm:FormGroup;
    constructor(private ps:ProductService,private Cs:CategoryService
      ,private route:Router,private FB:FormBuilder,
      private ARService:ActivatedRoute) {}
  
    ngOnInit(): void {
     
    this.prdID=this.ARService.snapshot.params['OldprdID'];
    console.log("id "+this.prdID);
    this.ps.
    GetProductByID(this.prdID).subscribe(
      res=> 
         {
           this.prd=res;
           console.log("before");
           console.log(this.prd);
        },
      err=>
      {
        console.log("Api error");
        console.log(err);
      }
    )


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

     
      this.EditPForm=this.FB.group({
        Name:['',[Validators.required,Validators.minLength(3)]],
        Price:['',[Validators.required]],
        // Image:['',[Validators.required]],
        Brand:['',[Validators.required]],
        Quantity:['',[Validators.required]],
        Description:['',[Validators.required]],
        Sale:['',[Validators.required,Validators.min(1),Validators.max(99)]],
        Stars:['',[Validators.required,Validators.min(1),Validators.max(5)]],
        CatID:['',[Validators.required]],
  
      })
  
    }
  
    readURL(event): void 
    {
      if (event.target.files && event.target.files[0])
       {
        this.PrdImage= event.target.files[0];
      }
    }

    updateprd()
    {
     this.ps.update(this.prd,this.PrdImage).subscribe(
       res=>
       {
         console.log(res);//product added sussessfully
         this.route.navigate(['/Products']);
       }
         ,
       err=>console.log(err)
     )
    }
  
  
  }
