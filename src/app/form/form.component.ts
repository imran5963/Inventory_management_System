import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private invService: InvoiceService,
    private activeModal: NgbActiveModal
  ) {
    this.customerForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.customerForm.valid) {
      const formData = this.customerForm.value;
      this.invService.submitFormData(formData).subscribe(
        (response) => {
          console.log('Data submitted successfully:', response);
          this.customerForm.reset();
          this.activeModal.close(response);
        },
        (error: any) => {
          if (error.status === 409) {
            alert(
              'Customer Name already exists. Please choose a different name.'
            );
          } else {
            console.error('Error submitting data:', error);
          }

          this.customerForm.reset();

          this.activeModal.close();
        }
      );
    }
    // location.reload();
  }
}
// onSubmit() {
//   if (this.customerForm.valid) {
//     const formData = this.customerForm.value;

//     this.invService.submitFormData(formData).subscribe(
//       (response) => this.handleSuccess(response),
//       (error) => this.handleError(error)
//     );
//   }
//   this.reloadPage();
// }

// handleSuccess(response: any) {
//   console.log('Data submitted successfully:', response);
//   this.customerForm.reset();
//   this.activeModal.close(response);
// }

// handleError(error: any) {
//   console.error('Error submitting data:', error);
//   this.customerForm.reset();
//   this.activeModal.close();
// }

// reloadPage() {
//   location.reload();
// }

// }
