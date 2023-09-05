import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from '../form/form.component';
import { ItemsComponent } from '../items/items.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  constructor(private modalservice:NgbModal,private headerComponent: HeaderComponent) {}

  onInvoicehide() {
    this.headerComponent.isHeaderVisible = false;
  }
  
openModal(){
  const modalref=this.modalservice.open(FormComponent);
}

openModal1(){
  const modalref=this.modalservice.open(ItemsComponent);
}

}
