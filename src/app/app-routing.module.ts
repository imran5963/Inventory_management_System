import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiveComponent } from './invoive/invoive.component';
import { DatePipe } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
// import { PriceCalculatorComponent } from './price-calculator.component';

const routes: Routes = [
  {path:'route',component:InvoiveComponent},
  {path:'update/:id',component:EditComponent},
  {path:'home',component:AppComponent},
  {path:'dashboard',component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [DatePipe], // Add DatePipe to providers
  // imports: [FormsModule],
  // declarations: [PriceCalculatorComponent],
  // bootstrap: [PriceCalculatorComponent],
  // bootstrap: [DateExampleComponent],
})
export class AppRoutingModule { }
