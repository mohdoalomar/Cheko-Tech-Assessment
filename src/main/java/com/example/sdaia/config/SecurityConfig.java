package com.example.sdaia.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class SecurityConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(
      org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
    registry.addMapping("/**");
  }
}
