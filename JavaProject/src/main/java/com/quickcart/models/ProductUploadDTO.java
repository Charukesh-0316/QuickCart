package com.quickcart.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ProductUploadDTO {
	String productJson; 
    String productImage;
    String categoryId;
    String vendorId;
}
