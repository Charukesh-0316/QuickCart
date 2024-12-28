package com.quickcart.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Embeddable;

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
public class CartItemId implements Serializable {
    private int cartid;
    private int productid;
    

    

    // Getters and Setters
   

    // equals() and hashCode()
    
   
}

