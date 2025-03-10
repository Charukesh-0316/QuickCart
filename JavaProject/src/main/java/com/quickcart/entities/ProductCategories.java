package com.quickcart.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"product","category","categoryId"})
@Entity
@Table(name="productcategories")
public class ProductCategories {
	
	@EmbeddedId
	private ProductCategoryId categoryId;
	
	@ManyToOne
	@JoinColumn(name = "productid", insertable = false, updatable = false)
	private Product product;
	
	@ManyToOne
	@JoinColumn(name = "categoryid", insertable = false, updatable = false)
	@JsonBackReference
	private Category category;
}
