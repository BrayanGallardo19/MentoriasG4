package com.mentoriasg4.user_service.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String nombre;
    private String email;
    private String password;
}