package com.example.campus_issue.controller;


import com.example.campus_issue.dto.IssueResponse;
import com.example.campus_issue.model.Issue;
import com.example.campus_issue.model.IssueStatus;
import com.example.campus_issue.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/create")
    public ResponseEntity<?> createIssue(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image,
            Principal principal) {
        try {
            IssueResponse issue = issueService.createIssue(
                    title,
                    description,
                    principal.getName(),
                    image
            );
            return ResponseEntity.ok(issue);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error uploading file");
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<IssueResponse>> getAllIssues() {
        return ResponseEntity.ok(issueService.getAllIssues());
    }

    @GetMapping("/my")
    public ResponseEntity<List<IssueResponse>> getMyIssues(Principal principal) {
        return ResponseEntity.ok(issueService.getIssuesByReporter(principal.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIssueById(@PathVariable String id) {
        return issueService.getIssueById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateIssueStatus(
            @PathVariable String id,
            @RequestParam String status) {

        try {
            IssueStatus issueStatus = IssueStatus.valueOf(status.toUpperCase());
            IssueResponse updatedIssue = issueService.updateStatus(id, issueStatus);
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Issue status updated successfully",
                    "updatedStatus", updatedIssue.getStatus()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Invalid status value. Use PENDING, RUNNING, or RESOLVED"
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIssue(@PathVariable String id, Authentication authentication) {
        try {
            String email = authentication.getName();

            IssueResponse deleted = issueService.deleteIssue(id, email);

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Issue deleted successfully",
                    "deletedIssue", deleted
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(Map.of(
                    "success", false,
                    "error", e.getMessage()
            ));
        }
    }


}
