package com.example.campus_issue.dto;

import com.example.campus_issue.model.Issue;
import com.example.campus_issue.model.IssueStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class IssueResponse {
    private String id;
    private String title;
    private String description;
    private String createdBy;
    private String category;
    private String reporterId;
    private List<String> imagePaths;
    private IssueStatus status;
    private String imagePath;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public IssueResponse(Issue issue) {
        this.id = issue.getId();
        this.title = issue.getTitle();
        this.description = issue.getDescription();

        this.createdBy = issue.getCreatedBy();

        this.category = issue.getCategory();
        this.reporterId = issue.getReporterId();

        this.imagePath = issue.getImagePath();
        this.imagePaths = issue.getImagePaths();

        this.status = issue.getStatus();
        this.createdAt = issue.getCreatedAt();
        this.updatedAt = issue.getUpdatedAt();
    }



}