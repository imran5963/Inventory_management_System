import { ChangeDetectorRef, Component } from '@angular/core';
import { InvoiceService } from '../invoice.service';
import { Customer, Items } from '../customer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isHeaderVisible: boolean = true;
  showUpdateForm: boolean = false;
  data: any[] = [];
  selectedInvoice: any = {};
  taxRate: number = 0.05;
  customers: Customer[] = [];
  constructor(private service: InvoiceService) {}

  ngOnInit(): void {
    this.LoadData();
  }

  updateInvoice(inv: any) {
    this.showUpdateForm = true; // Show the update form
    this.selectedInvoice = { ...inv }; // Populate selectedInvoice with data
}
  
  LoadData(): void {
    this.service.GetInvoiceData().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  deleteInvoice(invoiceId: number): void {
    this.service.deleteInvoice(invoiceId).subscribe(
      () => {
        this.LoadData();
      },
      (error) => {
        console.error('Error deleting invoice:', error);
      }
    );
    location.reload();
  }

  onItemSelect(selectedItemName: string) {
    const selectedItem = this.item.find(
      (item) => item.name === selectedItemName
    );
    // if (selectedItem) {
    //   // this.selectedItemPrice = selectedItem.prices;
    //   this.selectedItemName = selectedItem.name;
    // }
  }
  rows: any[] = [];

  addRow() {
    const newRow = { id: this.rows.length + 1, name: this.selectedItemName };
    this.rows.push(newRow);
  }
  item: Items[] = [];
  selectedItemName: string = '';
  deleteRow(row: any) {
    const rowIndex = this.rows.indexOf(row);
    if (rowIndex !== -1) {
      this.rows.splice(rowIndex, 1);
    }
  }
  // updateInvoice(updatedInvoice: any){
  //   const updatedInvoiceData = {
  //     id: updatedInvoice.id,
  //     customerName: updatedInvoice.customerName,
  //     invoiceNumber: updatedInvoice.invoiceNumber,
  //     curDate: updatedInvoice.curDate,
  //     item: updatedInvoice.item
  //   };
  //   this.service.updateInvoice(updatedInvoiceData).subscribe(
  //     () => {
  //       console.log('Invoice updated successfully');
  //       this.LoadData();
  //     },
  //     (error) => {
  //       console.error('Error updating invoice:', error);
  //     }
  //   );
  // }

isTableVisible: boolean = true;

 toggleTableVisibility() {
    this.isTableVisible = !this.isTableVisible;
  }
// updateSubmit() {
//     this.service.updateInvoice(this.selectedInvoice).subscribe(
//         () => {
//             console.log('Invoice updated successfully');
//             this.showUpdateForm = false; // Hide the update form
//             this.LoadData(); // Refresh the data after update
//         },
//         (error) => {
//             console.error('Error updating invoice:', error);
//         }
//     );
// }

// cancelEdit() {
//     this.showUpdateForm = false;
// }

  // In your frontend component
  // updateInvoice(updatedInvoice: any): void {
  //   // Create a new Invoice object with updated values
  //   const updatedInvoiceData = {
  //     id: updatedInvoice.id,
  //     // customerName: ,?
  //     // invoiceNumber: ,
  //     curDate:updatedInvoice.curDate,
  //     item: updatedInvoice.item ,
  //   };

  // Call the updateInvoice method from the service
  // this.service.updateInvoice(updatedInvoiceData).subscribe(
  //   () => {
  //     console.log('Invoice updated successfully');
  //     // Call the LoadData method again to refresh the data
  //     this.LoadData();
  //   },
  //   (error) => {
  //     console.error('Error updating invoice:', error);
  //   }
  // );

  updateTotalAmount(row: any): number {
    return row.currentQuantity * row.currentUnitPrice;
  }
  calculateTaxAmount(row: any): number {
    return this.updateTotalAmount(row) * this.taxRate;
  }
  calculateTotalAmountWithTax(row: any): number {
    return this.updateTotalAmount(row) + this.calculateTaxAmount(row);
  }
}
