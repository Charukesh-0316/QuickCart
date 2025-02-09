package com.quickcart.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Component
public class ProductCategoryId implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(name = "productid")
	private int product_id;
	@Column(name = "categoryid")
	private int category_id;
	
}
