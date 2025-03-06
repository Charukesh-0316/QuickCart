package com.quickcart.entities;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@Setter
@ToString(exclude = {"order", "product"})
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemId implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name="orderid")
    private int order;

    @Column(name ="productid")
    private int product;
}
