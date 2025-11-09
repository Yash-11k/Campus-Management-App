package com.example.campus_issue.model;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum IssueStatus {
    PENDING,
    IN_PROGRESS,
    RESOLVED,
    REJECTED;

    @JsonCreator
    public static IssueStatus fromString(String value){
        return IssueStatus.valueOf(value.toUpperCase());
    }
}
