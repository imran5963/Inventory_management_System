import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Items } from './customer';
import { Invoice } from './customer';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    private baseUrl = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    getAllCustomer(): Observable<Customer[]> {
      return this.http.get<Customer[]>(`${this.baseUrl}/getcust`);
    }
    submitFormData(formData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/addcust`, formData);
    }
    addItem(itemData: any,): Observable<any> {
      return this.http.post(`${this.baseUrl}/additems`, itemData);
    }
    getAllItem(): Observable<Items[]> {
      return this.http.get<Items[]>(`${this.baseUrl}/getitems`);
    }
    saveInvoiceData(data: any,): Observable<any> {
      return this.http.post(`${this.baseUrl}/addinvoice`,data);
      // return this.http.post(url, data);
    }
    GetInvoiceData(): Observable<any> {
      return this.http.get(`${this.baseUrl}/getinvoice`);
      // return this.http.post(url, data);
    }

    deleteInvoice(invoiceId: number): Observable<void> {
      const url = `${this.baseUrl}/deleteinvoice/${invoiceId}`;
      return this.http.delete<void>(url);
    }
    updateInvoice(invoiceId:number,updatedInvoice: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/updateinvoice/${invoiceId}`, updatedInvoice);
    }
    getById(Id: string |null){
      const url = `${this.baseUrl}/invoicebyid/${Id}`;
      return this.http.get(url);
    }
  }
