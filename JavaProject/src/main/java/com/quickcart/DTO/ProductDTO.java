package com.quickcart.DTO;

import org.springframework.web.multipart.MultipartFile;

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
@ToString(exclude = {"product","productImage"})
public class ProductDTO {
	
	private Product product;
	private int category_Id;
	private int vendor_Id;
	private MultipartFile productImage;

}
