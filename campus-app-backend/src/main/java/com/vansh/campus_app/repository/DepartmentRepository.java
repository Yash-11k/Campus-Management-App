package com.vansh.campus_app.repository;

import com.vansh.campus_app.entity.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DepartmentRepository extends MongoRepository<Department,String> {
    Optional<Department> findByNameIgnoreCase(String name);
}
