package com.example.campus_issue.repository;

import com.example.campus_issue.model.Issue;
import com.example.campus_issue.model.IssueStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IssueRepository extends MongoRepository<Issue, String> {
    List<Issue> findByReporterId(String reporterId);
    List<Issue> findByStatus(IssueStatus status);
    List<Issue> findByCreatedBy(String createdBy);
}