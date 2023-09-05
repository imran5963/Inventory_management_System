import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../invoice.service'; 
import { Items } from '../customer'; 
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  item: Items = {
    name: '',
    id: 0,
    // prices: []
  };
  // formBuilder: any;
  itemForm: any;
  // fb: any;
  // http: any;

  constructor(
    private formBuilder: FormBuilder,
    private invService: InvoiceService,
    private activeModal: NgbActiveModal
  ) {
    this.itemForm = this.formBuilder.group({
      // name: ['', Validators.required],
      // prices: ['',[ Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  // ngOnInit(): void {
  //   this.addItemPrice();
  // }

  ngOnInit(): void {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required], // Example form control 'name'
      // Define other form controls here
    });
  }

  // addItemPrice() {
  //   this.item.prices.push(0);
  // }

  // ngOnInit() {
  //   this.itemForm = this.formBuilder.group({
  //     itemName: ['', Validators.required],
  //     itemPrice: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
  //   });
  // }
  // removePrice(index: number) {
  //   this.item.prices.splice(index, 1);
  // }
  // addPrice() {
  //   this.item.prices.push(0);
  // }
  // onSubmit() {
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   // Sending only the required fields (name and prices) to the backend
  //   const itemData = {
  //     name: this.item.name,
  //     prices: this.item.prices
  //   };

  //   this.invoiceService.addItem(itemData, headers).subscribe(
  //     response => {
  //       console.log('Item added successfully:', response);
  //     },
  //     error => {
  //       console.error('Error adding item:', error);
  //     }
  //   );
  //   // location.reload();
  // }

  // onSubmit() {
  //   if (this.itemForm.valid) {
  //     const formData = {
  //       itemName: this.itemForm.value.itemName,
  //       price: parseFloat(this.itemForm.value.itemPrice)
  //     };

  //     this.http.post('http://localhost:8080/additem', formData).subscribe(
  //       (response: any) => {
  //         console.log('Item added successfully:', response);
  //         this.itemForm.reset(); // Clear the form after successful submission
  //       },
  //       (error: any) => {
  //         console.error('Error adding item:', error);
  //       }
  //     );
  //   }
  // }

  onSubmit() {
    if (this.itemForm.valid) {
      // const formData = JSON.stringify(this.itemForm.value);
      const itemData={
        name:this.itemForm.value.name,
      }
      this.invService.addItem(itemData).subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
          this.itemForm.reset();
          this.activeModal.close(response);
        },
        (error: any) => {
          if (error.status === 409) {
            alert(
              'Item Name already exists. Please choose a different name.'
            );
          } else {
            console.error('Error submitting data:', error);
          }

          this.itemForm.reset();

          this.activeModal.close();
        }
      );
    }
    // location.reload();
  }
}
