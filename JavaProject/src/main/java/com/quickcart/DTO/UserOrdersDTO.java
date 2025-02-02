
package com.quickcart.DTO;


import com.quickcart.entities.Order;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString(exclude = "order")
@AllArgsConstructor
@NoArgsConstructor
public class UserOrdersDTO {
    private int userId;
    private int addressId;
    private int productId;
    private int quantity;
    private double currentPrice;
    private Order order;

   }
