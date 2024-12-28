package com.charukesh.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name="orderitems")
@IdClass(OrderItemId.class) // Composite Key Class
public class OrderItem {
	
	@Id
	private OrderItemId orderItemId;
	
    @Id
    @ManyToOne
    @JoinColumn(name = "orderid")
    private Order order;

    @Id
    @ManyToOne
    @JoinColumn(name = "productid")
    private Product product;

    private int quantity;
    private double currentPrice;

    // Getters and Setters
}


