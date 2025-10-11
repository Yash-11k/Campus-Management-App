package com.vansh.campus_app.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document(collection = "issues")
public class Issue {

    @Id
    private String id;
    private String title;
    private String description;
    private String category;
    private String imageUrl; // /uploads/something.jpg
    private String status="Pending";
    private String reportedBy;
    private String assignedTo; // department email
    private LocalDateTime createdAt=LocalDateTime.now();
    private LocalDateTime updatedAt=LocalDateTime.now();

    private Department department;
}
