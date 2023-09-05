package com.example.invoice.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.invoice.entity.Items;

import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

@Repository
public class Itemsdao {

    @Autowired
    private EntityManager entityManager;

    public List<Items> getItems() {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Items> cq = cb.createQuery(Items.class);
        Root<Items> root = cq.from(Items.class);
        cq.select(root);
        return entityManager.createQuery(cq).getResultList();

    }

    public boolean existsByItemName(String name) {
        try {
            entityManager.createQuery("SELECT c FROM Items c WHERE c.name = :name", Items.class)
                    .setParameter("name", name).getSingleResult();
            return true;
        } catch (NoResultException ex) {
            return false;
        }
    }

    public Items addItems(Items item) {
        if (!existsByItemName(item.getName())) {
            entityManager.persist(item);
            return item;
        }
        return null;
    }
}
