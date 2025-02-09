package com.quickcart.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Embeddable
public class StoreProductsId implements Serializable{
	
	@Column(name="storeid")
	private int storeId;
	@Column(name="productid")
	private int productId;

}
