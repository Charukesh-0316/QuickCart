package com.charukesh.DTO;

import com.charukesh.entities.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString(exclude = "user")
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	
	private User user;
	private int role_Id;

}
