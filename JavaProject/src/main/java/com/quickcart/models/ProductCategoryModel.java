package com.quickcart.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ProductCategoryModel {
	private int vendorId;
	private int productId;
	private int categoryId;
	private int storeId;

}
