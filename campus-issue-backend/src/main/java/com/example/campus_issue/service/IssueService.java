package com.example.campus_issue.service;

import com.example.campus_issue.dto.IssueResponse;
import com.example.campus_issue.model.Issue;
import com.example.campus_issue.model.IssueStatus;
import com.example.campus_issue.model.Role;
import com.example.campus_issue.model.User;
import com.example.campus_issue.repository.IssueRepository;
import com.example.campus_issue.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public IssueResponse createIssue(String title, String description, String createdBy, MultipartFile image) throws IOException {
        Issue issue = new Issue();
        issue.setTitle(title);
        issue.setDescription(description);
        issue.setCreatedBy(createdBy);
        issue.setStatus(IssueStatus.PENDING);
        issue.setCreatedAt(LocalDateTime.now());
        issue.setUpdatedAt(LocalDateTime.now());

        if (image != null && !image.isEmpty()) {
            String fileName = fileStorageService.saveFile(image);
            issue.setImagePath(fileName);
        }

        issueRepository.save(issue);

        return mapToResponse(issue);
    }

    public List<IssueResponse> getAllIssues() {
        return issueRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<IssueResponse> getIssuesByReporter(String createdBy) {
        return issueRepository.findByCreatedBy(createdBy)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    public Optional<IssueResponse> getIssueById(String id) {
        return issueRepository.findById(id)
                .map(this::mapToResponse);
    }

    public IssueResponse updateStatus(String id, IssueStatus status) {
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found with id: " + id));

        issue.setStatus(status);
        issue.setUpdatedAt(LocalDateTime.now());
        issueRepository.save(issue);

        return mapToResponse(issue);
    }
    public IssueResponse deleteIssue(String id, String requesterEmail) {
        User user = userRepository.findByEmail(requesterEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        if (user.getRole() != Role.ADMIN && user.getRole() != Role.AUTHORITY) {
            throw new RuntimeException("You are not authorized to delete this issue");
        }

        issueRepository.delete(issue);

        return new IssueResponse(issue);
    }

    private IssueResponse mapToResponse(Issue issue) {
        return IssueResponse.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .description(issue.getDescription())
                .createdBy(issue.getCreatedBy())
                .status(issue.getStatus())
                .imagePath(issue.getImagePath())
                .createdAt(issue.getCreatedAt())
                .updatedAt(issue.getUpdatedAt())
                .build();
    }
}
