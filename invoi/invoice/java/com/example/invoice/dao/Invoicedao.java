package com.example.invoice.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.invoice.entity.Invoice;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;

@Repository
public class Invoicedao {
	@PersistenceContext
	@Autowired
	private EntityManager entityManager;

	public List<Invoice> getInvoice() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<Invoice> cq = cb.createQuery(Invoice.class);
		Root<Invoice> root = cq.from(Invoice.class);
		cq.select(root);
		return entityManager.createQuery(cq).getResultList();
	}

	public Invoice getInvoiceById(Long id) {
		return entityManager.find(Invoice.class, id);
	}

	public Invoice addInvoice(Invoice in) {
		entityManager.persist(in);
		return in;
	}

	public void deleteInvoice(Invoice invoice) {
		entityManager.remove(invoice);
	}
	
//	 @Transactional
//	    public Invoice updateInvoice(Invoice updatedInvoice) {
//	        // Load the existing invoice entity from the database
//	        Invoice existingInvoice = entityManager.find(Invoice.class, updatedInvoice.getId());
//
//	        if (existingInvoice != null) {
//	            existingInvoice.setCustomerName(updatedInvoice.getCustomerName());
//	            existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
//	            existingInvoice.setCurDate(updatedInvoice.getCurDate());
//	            existingInvoice.setItem(updatedInvoice.getItem());
//	            return entityManager.merge(existingInvoice);
//	        } else {
//	            throw new IllegalArgumentException("Invoice with ID " + updatedInvoice.getId() + " not found.");
//	        }
//	    }
	
	@Transactional
	public Invoice updateInvoice(Invoice updatedInvoice) {
	    // Load the existing invoice entity from the database
	    Invoice existingInvoice = entityManager.find(Invoice.class, updatedInvoice.getId());

	    if (existingInvoice != null) {
	        existingInvoice.setCustomerName(updatedInvoice.getCustomerName());
	        existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
	        existingInvoice.setCurDate(updatedInvoice.getCurDate());
	        existingInvoice.setItem(updatedInvoice.getItem());
	        return existingInvoice; // You may return if needed
	    } else {
	        throw new IllegalArgumentException("Invoice with ID " + updatedInvoice.getId() + " not found.");
	    }
	}


}
