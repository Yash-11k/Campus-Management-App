package com.vansh.campus_app.controller;

import com.vansh.campus_app.entity.Issue;
import com.vansh.campus_app.service.IssueService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/issue")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/report")
    public ResponseEntity<?> responseIssue(
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam String reportedBy,
            @RequestParam(required = false)MultipartFile image) throws IOException {

        Issue saved=issueService.createIssue(title,description,category,reportedBy,image);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/all")
    public ResponseEntity<?> allIssues(){
        return ResponseEntity.ok(issueService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getIssue(@PathVariable String id){
        Optional<Issue>opt=issueService.getById(id);
        if(opt.isPresent()){
            Issue issue=opt.get();
            return ResponseEntity.ok(issue);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateIssueStatus(@PathVariable String id, @RequestBody UpdateRequest body){
        Issue updated=issueService.updateStatus(id,body.getStatus(),body.getAssignedTo());
        if(updated==null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @Data
    public static class UpdateRequest{
        private String status;
        private String assignedTo;
    }
}
