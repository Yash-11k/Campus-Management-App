package com.vansh.campus_app.config;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebMvConfig implements WebMvcConfigurer {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){
        String  absolutePath=new File(uploadDir).getAbsolutePath()+File.separator;
        registry.addResourceHandler("/uploads/**").addResourceLocations("file:"+absolutePath);
    }
}
