package com.example.invoice.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.invoice.entity.Custentity;
import com.example.invoice.entity.Invoice;
import com.example.invoice.entity.Items;
import com.example.invoice.entity.item;
import com.example.invoice.service.Custservice;

@CrossOrigin("*")
@RestController
//@RequestMapping("customer")
public class Custcontroller {
	private final Custservice customerService;

	public Custcontroller(Custservice customerService) {
		this.customerService = customerService;
	}

	@GetMapping("/getcust")
	public List<Custentity> getAllCustomers() {
		return customerService.getAllCustomers();
	}

//    @PostMapping("/addcust")
//    public ResponseEntity<String> addcustomer(@RequestBody Custentity cust) {
//        customerService.addcustomer(cust);
//        return ResponseEntity.ok("customer added successfully");
//    }

	@GetMapping("/getitems")
	public List<Items> getItems() {
		return customerService.getItems();
	}

//    @PostMapping("/additems")
//    public ResponseEntity<String> addItems(@RequestBody Items item) {
//        customerService.addItems(item);
//        return ResponseEntity.ok("item added Successfully");
//    }

	@GetMapping("/getinvoice")
	public List<Invoice> getInvoice() {
		return customerService.getInvoice();
	}

	@PostMapping("/addinvoice")
	public ResponseEntity<String> addInvoice(@RequestBody Invoice invoice) {
		customerService.addInvoice(invoice, invoice.getItem());
		return ResponseEntity.ok("item added Successfully");
	}

	@GetMapping("/getitem")
	public List<item> getitem() {
		return customerService.getitem();
	}

	@PostMapping("/additem")
	public ResponseEntity<String> additem(@RequestBody item item) {
		customerService.additem(item);
		return ResponseEntity.ok("item added Successfully");
	}

	@DeleteMapping("/deleteinvoice/{invoiceId}")
	public ResponseEntity<String> deleteInvoice(@PathVariable Long invoiceId) {
		customerService.deleteInvoice(invoiceId);
		return ResponseEntity.ok("Invoice deleted successfully");
	}

	@PutMapping("/updateinvoice/{invoiceId}")
	public ResponseEntity<String> updateInvoice(@PathVariable Long invoiceId, @RequestBody Invoice updatedInvoice) {
		customerService.updateInvoice(invoiceId, updatedInvoice, updatedInvoice.getItem());
		return ResponseEntity.ok("Invoice updated successfully");
	}

	@GetMapping("invoicebyid/{id}")
	public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
		Invoice invoice = customerService.getInvoiceById(id);
		if (invoice != null) {
			return ResponseEntity.ok(invoice);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PostMapping("/addcust")
	public ResponseEntity<String> addcustomer(@RequestBody Custentity cust) {
		if (customerService.existsByCustomerName(cust.getCustomerName())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Customer with the same name already exists");
		}
		customerService.addcustomer(cust);
		return ResponseEntity.ok("Customer added successfully");
	}

	@PostMapping("/additems")
//  public ResponseEntity<String> addItems(@RequestBody Items item) {
//    if(customerService.itemExistsByName(item.getName())) {
//         return ResponseEntity.status(HttpStatus.CONFLICT).body("Item with the same name already exists");
//        }
//    customerService.addItems(item);
//    return ResponseEntity.ok("item added Successfully");
//  }
public ResponseEntity<String> addItems(@RequestBody Items item){
		if (customerService.itemExistsByName(item.getName())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Item with the same name already exists");
		}
		customerService.addItems(item);
		return ResponseEntity.ok("Item added successfully");
	}
}
