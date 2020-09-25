import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category.service';
import { ICategory } from 'src/app/Interfaces/icategory';
@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent implements OnInit {

  cat:ICategory;
  
  AddPForm:FormGroup;
    constructor(private ps:ProductService,private Cs:CategoryService
      ,private route:Router,private FB:FormBuilder) {
      this.cat={
        ID:0,
        Name:''
      }
     }
  
    ngOnInit(): void {

      this.AddPForm=this.FB.group({
        Name:['',[Validators.required,Validators.minLength(3)]],
      })  
    }
    
    NewOne(){
     this.Cs.Add(this.cat).subscribe(
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
  