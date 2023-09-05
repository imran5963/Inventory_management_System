package com.example.invoice.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import com.example.invoice.entity.item;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity

public class Invoice {

	@Id

	@GeneratedValue

	private Long id;

	private String customerName;

	private String invoiceNumber;

	private String curDate;

	@JsonSerialize(using = CustomItemListSeries.class )
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "invoice")

	
	private List<item> item;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public String getCurDate() {
		return curDate;
	}

	public void setCurDate(String curDate) {
		this.curDate = curDate;
	}

	public List<item> getItem() {
		return item;
	}

	public void setItem(List<item> item) {
		this.item = item;
	}

}
