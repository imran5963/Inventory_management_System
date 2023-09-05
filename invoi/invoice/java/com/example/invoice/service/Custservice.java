package com.example.invoice.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.invoice.dao.Custdao;
import com.example.invoice.dao.Invoicedao;
import com.example.invoice.dao.Itemsdao;
import com.example.invoice.dao.itemdao;
import com.example.invoice.entity.Custentity;
import com.example.invoice.entity.Invoice;
import com.example.invoice.entity.Items;
import com.example.invoice.entity.item;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class Custservice {
    @Autowired
    private final Custdao customerDao;
    private final Itemsdao Itemsdao;
    private final itemdao itemdao;
    private final Invoicedao invoicedao;

    @Autowired
    public Custservice(Custdao customerDao, Itemsdao Items, itemdao item, Invoicedao invoicedao) {
        this.customerDao = customerDao;
        this.Itemsdao = Items;
        this.itemdao = item;
        this.invoicedao = invoicedao;
    }

//    public List<Custentity> getAllCustomers() {
//        return customerDao.getAllCustomers();
//    }
//
//    public Custentity addcustomer(Custentity cust) {
//        customerDao.addcustomer(cust);
//        return cust;
//    }

    public List<Items> getItems() {
        return Itemsdao.getItems();
    }

//    public Items addItems(Items item) {
//        Itemsdao.addItems(item);
//        return item;
//    }

    public List<item> getitem() {
        return itemdao.getitem();
    }

    public item additem(item item) {
        itemdao.additem(item);
        return item;
    }

    public void deleteInvoice(Long invoiceId) {
        Invoice invoice = invoicedao.getInvoiceById(invoiceId);
        if (invoice != null) {
            invoicedao.deleteInvoice(invoice);
        }
    }

    public List<Invoice> getInvoice() {
        List<Invoice> invoices = invoicedao.getInvoice();
        System.out.println("Fetched invoices in service: " + invoices);
        return invoices;
    }

    public void addInvoice(Invoice invoice, List<item> items) {
        for (item item : items) {
            item.setInvoice(invoice);
        }
        invoice.setItem(items);
        invoicedao.addInvoice(invoice);
    }

//    public void updateInvoice(Long invoiceId, Invoice updatedInvoice, List<item> updatedItems) {
//        Invoice existingInvoice = invoicedao.getInvoiceById(invoiceId);
//
//        if (existingInvoice != null) {
//
//            existingInvoice.setCustomerName(updatedInvoice.getCustomerName());
//            existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());
//            existingInvoice.setCurDate(updatedInvoice.getCurDate());
//            existingInvoice.getItem().clear();
//            existingInvoice.getItem().addAll(updatedItems);
//
//            invoicedao.updateInvoice(existingInvoice);
//        } else {
//            throw new IllegalArgumentException("Invoice with ID " + invoiceId + " not found.");
//        }
//    }

    public Invoice getInvoiceById(Long id) {

        return invoicedao.getInvoiceById(id);

    }

    public void updateInvoice(Long invoiceId, Invoice updatedInvoice, List<item> updatedItems) {

        Invoice existingInvoice = invoicedao.getInvoiceById(invoiceId);

        if (existingInvoice != null) {

            List<item> existingItems = existingInvoice.getItem();

            for (item updatedItem : updatedItems) {

                if (updatedItem.getId() != null) {

                    item existingItem = existingItems.stream()

                            .filter(item -> item.getId().equals(updatedItem.getId()))

                            .findFirst()

                            .orElse(null);

                    if (existingItem != null) {

                        existingItem.setItemName(updatedItem.getItemName());

                        existingItem.setQuantity(updatedItem.getQuantity());

                        existingItem.setPrice(updatedItem.getPrice());

                        existingItem.setSubtotal(updatedItem.getSubtotal());

                        existingItem.setGstAmount(updatedItem.getGstAmount());

                        existingItem.setTotalAmount(updatedItem.getTotalAmount());

                    }

                } else {

                    updatedItem.setInvoice(existingInvoice);

                    existingItems.add(updatedItem);

                }

            }

            existingItems.removeIf(existingItem -> !updatedItems.contains(existingItem));

            existingInvoice.setCustomerName(updatedInvoice.getCustomerName());

            existingInvoice.setInvoiceNumber(updatedInvoice.getInvoiceNumber());

            existingInvoice.setCurDate(updatedInvoice.getCurDate());

            invoicedao.updateInvoice(existingInvoice);

        } else {

            throw new IllegalArgumentException("Invoice with ID " + invoiceId + " not found.");

        }

    }

    public Items addItems(Items item) {
    	Itemsdao.addItems(item);
        return item;
    }

    public boolean itemExistsByName(String name) {
        return Itemsdao.existsByItemName(name);
    }
    public boolean existsByCustomerName(String customerName) {
        return customerDao.existsByCustomerName(customerName);
    }

    public List<Custentity> getAllCustomers() {
        return customerDao.getAllCustomers();
    }

    public Custentity addcustomer(Custentity cust) {
        customerDao.addcustomer(cust);
        return cust;
    }
}
