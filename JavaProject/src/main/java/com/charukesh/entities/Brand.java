package com.charukesh.entities;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "products")
@Table(name="brand")
public class Brand {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(name = "brand_id")
	private int id;
	private String name;
	
	@OneToMany(mappedBy = "brand")
	List<Product> products;
}
