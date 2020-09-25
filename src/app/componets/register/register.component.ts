import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { AccountService } from 'src/app/Services/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAcount } from 'src/app/Interfaces/iacount';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account:IAcount;
  LoginForm:FormGroup;
  constructor(private ps:ProductService,private as:AccountService
    ,private route:Router,private FB:FormBuilder) {
    this.account={
   UserName:'',
   Password:'',
   ConfirmPassword: ''
    }
   }
  ngOnInit(): void {
    this.LoginForm=this.FB.group({
      UserName:['',[Validators.required,Validators.minLength(3)]],
      Password:['',[Validators.required,Validators.minLength(6)]],
      ConfirmPassword:['',[Validators.required,Validators.minLength(6)]],
    }) 
  }

    reg(){
      this.as.Register(this.account)
        .subscribe((data : any)=>{

        console.log(data);
        
        this.route.navigate(['/Login']);
       
        
      },
      err=>console.log(err)
      );
    }

}
