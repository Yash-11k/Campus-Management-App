package com.vansh.campus_app.service;

import com.vansh.campus_app.entity.Department;
import com.vansh.campus_app.entity.Issue;
import com.vansh.campus_app.repository.DepartmentRepository;
import com.vansh.campus_app.repository.IssueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    private final String uploadDir = "uploads";

    public Issue createIssue(String title, String description, String category, String reportedBy, MultipartFile image) throws IOException {
        Issue issue = new Issue();
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setCategory(category);
        issue.setReportedBy(reportedBy);
        issue.setStatus("Pending");
        issue.setAssignedTo("Unassigned");
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());

        Optional<Department> deptOpt = departmentRepository.findByNameIgnoreCase(category);
        if (deptOpt.isPresent()) {
            issue.setDepartment(deptOpt.get());
        } else {
            throw new RuntimeException("Department not found for category: " + category);
        }

        if (image != null && !image.isEmpty()) {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String filename = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(filename);
            Files.copy(image.getInputStream(), filePath);

            issue.setImageUrl("/uploads/" + filename);
        }

        return issueRepository.save(issue);
    }

    public List<Issue> getAll() {
        return issueRepository.findAll();
    }

    public Optional<Issue> getById(String id) {
        return issueRepository.findById(id);
    }

    public Issue updateStatus(String id, String status, String assignedTo) {
        Optional<Issue> opt = issueRepository.findById(id);
        if (opt.isPresent()) {
            Issue issue = opt.get();
            issue.setStatus(status);
            issue.setAssignedTo(assignedTo);
            issue.setUpdatedAt(LocalDateTime.now());
            return issueRepository.save(issue);
        } else {
            return null;
        }
    }
}
