package com.charukesh.entities;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Entity
@Table(name="cartitems")
public class CartItem {
    @EmbeddedId
	private CartItemId cartItemId; // Composite Key Class
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cartid",insertable = false, updatable = false)
    @JsonBackReference
    private Cart cart;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "productid",insertable = false, updatable = false)
    private Product product;

    // Getters and Setters
}


