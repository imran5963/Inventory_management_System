package com.example.invoice.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.invoice.entity.item;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
@Repository
public class itemdao {
	
	@PersistenceContext
	@Autowired
	private EntityManager entityManager;
	

	public List<item> getitem() {
		CriteriaBuilder cb = entityManager.getCriteriaBuilder();
		CriteriaQuery<item> cq = cb.createQuery(item.class);
		Root<item> root = cq.from(item.class);
		cq.select(root);
		return entityManager.createQuery(cq).getResultList();

	}

	public item additem(item it) {
		entityManager.persist(it);
		return it;
	}
}
