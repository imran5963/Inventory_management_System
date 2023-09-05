// import { Component } from '@angular/core';
// import { InvoiceService } from '../invoice.service';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Customer, Items } from '../customer';

// @Component({
//   selector: 'app-edit',
//   templateUrl: './edit.component.html',
//   styleUrls: ['./edit.component.css'],
// })
// export class EditComponent {
//   invoiceData: any;
//   selectedCustomerName: string = '';
//   isHeaderVisible: boolean = true;
//   showUpdateForm: boolean = false;
//   data: any[] = [];
//   selectedInvoice: any = {};
//   rows: any[] = [];

//   taxRate: number = 0.05;
//   customers: Customer[] = [];
//   constructor(private service: InvoiceService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params: ParamMap) => {
//       const invoiceId = params.get('id');

//       this.service.getById(invoiceId).subscribe((data) => {
//         this.invoiceData = data;
//       });
//     });
//   }
//   updateInvoice(inv: any) {
//     this.selectedInvoice = { ...inv }; // Copy the selected invoice data
//     this.showUpdateForm = true; // Show the update form
//   }

//   updateSubmit() {
//       // Update the invoice using selectedInvoice data
//       this.service.updateInvoice(this.selectedInvoice).subscribe(
//           () => {
//               console.log('Invoice updated successfully');
//               this.showUpdateForm = false; // Hide the update form
//               this.LoadData(); // Refresh the data after update
//           },
//           (error) => {
//               console.error('Error updating invoice:', error);
//           }
//       );
//   }

//   LoadData(): void {
//     this.service.GetInvoiceData().subscribe(
//       (data) => {
//         this.data = data;
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   }

//   cancelEdit() {
//       this.showUpdateForm = false;
//   }

//   addRow() {
//     const newRow = { id: this.rows.length + 1, name: this.selectedItemName };
//     this.rows.push(newRow);
//   }
//   item: Items[] = [];
//   selectedItemName: string = '';

//   deleteRow(row: any) {
//     const rowIndex = this.rows.indexOf(row);
//     if (rowIndex !== -1) {
//       this.rows.splice(rowIndex, 1);
//     }
//   }

//   onItemSelect(selectedItemName: string) {
//     const selectedItem = this.item.find(
//       (item) => item.name === selectedItemName
//     );
// }
// }

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { InvoiceService } from '../invoice.service';

import { Router } from '@angular/router';
import { Items } from '../customer';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  invoiceData: any;

  items: Items[] = [];

  rows: any[] = [];

  selectedItemName: string = '';

  taxRate: number = 0.05;

  constructor(private service: InvoiceService, private route: ActivatedRoute,private router: Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const invoiceId = params.get('id');

      if (invoiceId) {
        this.service.getById(invoiceId).subscribe(
          (data) => {
            this.invoiceData = data;

            this.invoiceId = this.invoiceData.id;

            this.initializeRows();
          },

          (error) => {
            console.error('Error fetching invoice data:', error);
          }
        );
      }
    });

    this.service.getAllItem().subscribe(
      (items) => {
        this.items = items;
      },

      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }

  //function to initialise row

  initializeRows() {
    if (this.invoiceData && this.invoiceData.item) {
      this.rows = this.invoiceData.item.map((item: any) => ({
        name: item.itemName,

        currentQuantity: item.quantity,

        currentUnitPrice: item.price,
      }));
    }
  }

  //add an- empty row

  addRow() {
    const newRow = { id: this.rows.length + 1, currentQuantity: 1 };

    this.rows.push(newRow);
  }

  // to remove row

  deleteRow(row: any) {
    const rowIndex = this.rows.indexOf(row);

    if (rowIndex !== -1) {
      this.rows.splice(rowIndex, 1);
    }
  }

  //on itemselect set the by default price

  onItemSelect(selectedItemName: string, row: any) {
    const selectedItem = this.items.find(
      (item) => item.name === selectedItemName
    );

    if (selectedItem) {
      this.selectedItemName = selectedItem.name;

      // row.currentUnitPrice = selectedItem.itemprice;
    }
  }

  //calculate for each row subtotal, tax amount, total amount

  updateTotalAmount(row: any): number {
    return row.currentQuantity * row.currentUnitPrice;
  }

  calculateTaxAmount(row: any): number {
    return this.updateTotalAmount(row) * this.taxRate;
  }

  calculateTotalAmountWithTax(row: any): number {
    return this.updateTotalAmount(row) + this.calculateTaxAmount(row);
  }

  calculateOverallSubtotal(): number {
    return this.rows.reduce((acc, row) => acc + this.updateTotalAmount(row), 0);
  }

  calculateOverallGstAmount(): number {
    return this.rows.reduce(
      (acc, row) => acc + this.calculateTaxAmount(row),
      0
    );
  }

  calculateOverallTotalAmount(): number {
    return this.rows.reduce(
      (acc, row) => acc + this.calculateTotalAmountWithTax(row),
      0
    );
  }

  // update data 

  invoiceId!: number;

  updatedInvoice: any;

  updateInvoice(invoiceId: number): void {
    const updatedInvoice = {
      ...this.invoiceData,

      item: this.rows.map((row) => ({
        itemName: row.name,

        quantity: row.currentQuantity,

        price: row.currentUnitPrice,

        subtotal: this.updateTotalAmount(row),

        gstAmount: this.calculateTaxAmount(row),

        totalAmount: this.calculateTotalAmountWithTax(row),
      })),
    };

    this.service
      .updateInvoice(invoiceId, updatedInvoice)

      .subscribe(
        (response) => {
          console.log('Invoice updated successfully', response);
          // this.router.navigate(['home']);
               },

        (error) => {
          console.error('Error updating invoice', error);

          console.log(updatedInvoice);
        }
      );
      
    location.reload();
    // this.router.navigate(['']);
  }



  
  isSubmitButtonDisabled(): boolean {
    if (
      this.rows.length === 0 ||
      !this.rows.every(
        (row) =>
          row.name && row.currentQuantity >= 1 && row.currentUnitPrice >= 0.01
      )
    ) {
      return true;
    }

    return false;
  }

  
}
