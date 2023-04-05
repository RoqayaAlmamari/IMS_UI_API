package com.example.IMS_UI_API.model;

/**
 The Student class represents a student in the Institute Management System.
 */
public class Student {
    public int id;
    public String name;

    public String email;

    public int phone;

    public Student(int id, String name, String email, int phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}