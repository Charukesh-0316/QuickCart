package com.quickcart.entities;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Embeddable
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemId implements Serializable {
	private static final long serialVersionUID = 1L;
    private int order;
    private int product;

 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemId that = (OrderItemId) o;
        return order == that.order && product == that.product;
    }

 
}

