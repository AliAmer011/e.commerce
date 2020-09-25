import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './componets/product/product.component';
import { HomeComponent } from './componets/home/home.component';
import { ProductDetailsComponent } from './componets/product-details/product-details.component';
import { AddProductComponent } from './componets/add-product/add-product.component';
import { UpdateProductComponent } from './componets/update-product/update-product.component';
import { CartComponent } from './componets/cart/cart.component';
import { RegisterComponent } from './componets/register/register.component';
import { AddCatComponent } from './componets/Category/add-cat/add-cat.component';
import { AuthGuard } from './auth.guard';


const routes: Routes =
 [
  {path:'Home',component:HomeComponent},
  {path:'Products',component:ProductComponent},
  {path:'Cart',component:CartComponent,canActivate:[AuthGuard]},
  {path:'Product/:productID',component:ProductDetailsComponent,canActivate:[AuthGuard]},
  {path:'AddProduct',component:AddProductComponent,canActivate:[AuthGuard]},
  {path:'AddCat',component:AddCatComponent,canActivate:[AuthGuard]},
  {path:'UpdateProduct/:OldprdID',component:UpdateProductComponent,canActivate:[AuthGuard]},
  {path:'Login',component:HomeComponent},
  {path:'Register',component:RegisterComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
