package com.quickcart.DTO;

import com.quickcart.entities.Product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "product")
public class ProductDTO {
	
	private Product product;
	private int category_Id;
	private int vendor_Id;

}
