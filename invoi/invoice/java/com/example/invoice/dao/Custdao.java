package com.example.invoice.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.invoice.entity.Custentity;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

@Repository
public class Custdao {

    @Autowired
    private EntityManager entityManager;

    public List<Custentity> getAllCustomers() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Custentity> criteriaQuery = criteriaBuilder.createQuery(Custentity.class);
        Root<Custentity> root = criteriaQuery.from(Custentity.class);
        criteriaQuery.select(root);

        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    public Custentity addcustomer(Custentity cust) {
        if (!existsByCustomerName(cust.getCustomerName())) {
            entityManager.persist(cust);
            return cust;
        }
        return null;
    }

    public boolean existsByCustomerName(String customerName) {
        try {
            entityManager
                    .createQuery("SELECT c FROM Custentity c WHERE c.customerName = :customerName", Custentity.class)
                    .setParameter("customerName", customerName).getSingleResult();
            return true;
        } catch (NoResultException ex) {
            return false;
        }
    }
}
