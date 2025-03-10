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


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Component
@Embeddable
public class UserAddressId implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private int userid;
    private int addressid;
}
