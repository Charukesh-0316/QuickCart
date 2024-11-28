package com.charukesh.DTO;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

enum BlogStatus {
    success, error
}

@JsonInclude(value = Include.NON_NULL)
public class ShopResult<T> {
    private BlogStatus status;
    private T data;
    private String message;
    public BlogStatus getStatus() {
        return status;
    }
    public void setStatus(BlogStatus status) {
        this.status = status;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public ShopResult(BlogStatus status, T data, String message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
    public static <T> ShopResult<T> success(T data) {
        ShopResult<T> res = new ShopResult<T>(BlogStatus.success, data, null);
        return res;
    }
    public static <T> ShopResult<T> error(String message) {
        ShopResult<T> res = new ShopResult<T>(BlogStatus.error, null, message);
        return res;
    }
}

