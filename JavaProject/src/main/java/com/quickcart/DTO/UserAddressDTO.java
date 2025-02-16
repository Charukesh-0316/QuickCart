

package com.quickcart.DTO;





import com.quickcart.entities.Address;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString(exclude = "address")
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressDTO {
   private int userId;
   private Address address; 
    
}



