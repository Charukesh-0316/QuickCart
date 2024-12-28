package com.charukesh.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.charukesh.DTO.ShopResult;
import com.charukesh.entities.Category;
import com.charukesh.entities.Order;
import com.charukesh.entities.Product;
import com.charukesh.entities.User;
import com.charukesh.services.AdminService;

@RestController
public class AdminController {
	
	@Autowired
	private AdminService adminService;
	
	@GetMapping("/admin/customers")
	public ShopResult<?> getCustomers(){
		List<User> customers=adminService.getAllCustomers();
		if(customers!=null) {
			return ShopResult.success(customers);
		}
		return ShopResult.error(null);
		
	}
	
	@GetMapping("/admin/customers/{id}")
	public ShopResult<?> getCustomer(@RequestParam("id")int id){
		User customer=adminService.getCustomer(id);
		if(customer!=null) {
			return ShopResult.success(customer);
		}
		return ShopResult.error(null);
		
	}
	
	@GetMapping("/admin/customersByRole/{role}")
	public ShopResult<?> getCustomersByRole(@RequestParam("role")int role){
		System.out.println("role"+role);
		List<User> customers=adminService.getCustomersByRole(role);
		if(customers!=null) {
			return ShopResult.success(customers);
		}
		return ShopResult.error(null);
	}
	
	@PutMapping("/admin/editCustomer/{id}")
	public ShopResult<?> editCustomerById(@RequestParam("id")int id,@RequestBody User user){
		User cust =adminService.editCustomer(id,user);
		if(cust!=null)
			return ShopResult.success(cust);
		return null;
		
	}
	
	@DeleteMapping("/admin/deleteCustomer/{id}")
	public ShopResult<?> deleteCustomerById(@RequestParam("id")int id){
		String cust = adminService.deleteCustomer(id);
		if(cust!=null)
			return ShopResult.success(cust);
		return null;
	}
	
	@GetMapping("/admin/categories")
	public ShopResult<?> getCategories() {
		List<Category> category_list = adminService.getAllCategories();
		System.out.println(category_list);
		if (category_list.isEmpty()) {
			return ShopResult.error("No categories found");
		} else {
			return ShopResult.success(category_list);
		}
	}
	
	@GetMapping("/admin/category/products/{id}")
	public ShopResult<?> getProductsByCategory(@PathVariable("id")int id){
		List<Product> product_list = adminService.getAllProductByCategory(id);
		System.out.println(product_list);
		if(product_list.isEmpty()) {
			return ShopResult.error("No Product in this category");
		}else {
			return ShopResult.success(product_list);
		}
	}
	
	@GetMapping("/admin/orders")
	public ShopResult<?> getOrders(){
		List<Order> orders = adminService.getAllOrders();
		System.out.println(orders);
		if(orders!=null) {
			return ShopResult.success(orders);
		}else {
			return ShopResult.error(null);
		}
	}
	
	@PostMapping("/admin/changeStatus")
	public ShopResult<?> changeStatus(@RequestBody Order order){
		Order updatedOrder=adminService.updateStatus(order);
		if(updatedOrder!=null) {
			return ShopResult.success(updatedOrder);
		}
		return ShopResult.error(null);
		
	}
	

}
