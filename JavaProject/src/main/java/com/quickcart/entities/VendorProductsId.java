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
@ToString()
@Embeddable
public class VendorProductsId implements Serializable{
	
	 private static final long serialVersionUID = 1L;

	    @Column(name="user_id")
	    private int userID;
	    @Column(name="product_id")
	    private int productID;


}
