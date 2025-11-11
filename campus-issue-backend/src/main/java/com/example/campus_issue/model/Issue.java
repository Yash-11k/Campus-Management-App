package com.example.campus_issue.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "issues")
public class Issue {

    @Id
    private String id;

    private String title;
    private String description;

    private String category;
    private String createdBy;

    private String imagePath;

    @Field("reporter_id")
    private String reporterId;

    private List<String> imagePaths;

    private IssueStatus status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}