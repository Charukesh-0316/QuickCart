package com.quickcart.DTO;

import com.quickcart.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class VendorStoreDTO {
	
	private int userid;
	private int addressid;
	private String name;

}
