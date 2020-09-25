import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Interfaces/iproduct';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Interfaces/icategory';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
prd:IProduct;
PrdImage:File;
Categories:ICategory[]=[];

AddPForm:FormGroup;
  constructor(private ps:ProductService,private Cs:CategoryService
    ,private route:Router,private FB:FormBuilder) {
    this.prd={
      ID:0,
      Name:'',
      Price:null,
      Image:'',
      Brand:'',
      Quantity:null,
      Description:'',
      Sale:null,
      Stars:null,
      CatID:0
    }
   }

  ngOnInit(): void {
  
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
    
    this.AddPForm=this.FB.group({
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

  NewOne(){
   this.ps.Add(this.prd,this.PrdImage).subscribe(
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
