package com.vansh.campus_app.repository;

import com.vansh.campus_app.entity.Issue;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface IssueRepository extends MongoRepository<Issue,String> {
    List<Issue>findByCategoryIgnoreCase(String category);
    List<Issue>findByAssignedTo(String assignedTo);
    List<Issue>findByReportedBy(String reportedBy);
}
