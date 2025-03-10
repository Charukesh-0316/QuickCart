package com.quickcart.entities;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"store","product"})
@Entity
@Table(name = "storeproducts")
public class StoreProducts {
	
	@EmbeddedId
	private StoreProductsId storeProductsId;
	
	@Column(name="stock")
	private int stock;
	@Column(name="isavailable")
	private boolean isAvailable;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="storeid", insertable = false, updatable = false)
	private Store store;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="productid", insertable = false, updatable = false)
	private Product product;

}
