import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { ProductComponent } from './componets/product/product.component';
import { HomeComponent } from './componets/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './componets/product-details/product-details.component';
import { AddProductComponent } from './componets/add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProductComponent } from './componets/update-product/update-product.component';
import { CartComponent } from './componets/cart/cart.component';
import { ByEGPPipe } from './pipes/by-egp.pipe';
import { FooterComponent } from './componets/footer/footer.component';
import { RegisterComponent } from './componets/register/register.component';
import { AddCatComponent } from './componets/Category/add-cat/add-cat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductComponent,
    HomeComponent,
    ProductDetailsComponent,
    AddProductComponent,
    UpdateProductComponent,
    CartComponent,
    ByEGPPipe,
    FooterComponent,
    RegisterComponent,
    AddCatComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
