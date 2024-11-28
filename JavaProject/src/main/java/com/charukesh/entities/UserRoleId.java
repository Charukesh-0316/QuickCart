package com.charukesh.entities;

import java.io.Serializable;
import javax.persistence.Embeddable;

@Embeddable
public class UserRoleId implements Serializable {
    private static final long serialVersionUID = 1L;

    private int userID;
    private int roleID;

    // Default constructor
    public UserRoleId() {}

    // Parameterized constructor
    public UserRoleId(int userID, int roleID) {
        this.userID = userID;
        this.roleID = roleID;
    }

    // Getters and Setters
    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getRoleID() {
        return roleID;
    }

    public void setRoleID(int roleID) {
        this.roleID = roleID;
    }

    // hashCode and equals methods
    @Override
    public int hashCode() {
        return (int) (userID + roleID);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        UserRoleId that = (UserRoleId) obj;
        return userID == that.userID && roleID == that.roleID;
    }
}
