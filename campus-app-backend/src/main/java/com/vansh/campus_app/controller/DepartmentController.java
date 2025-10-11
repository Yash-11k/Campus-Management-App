package com.vansh.campus_app.controller;

import com.vansh.campus_app.entity.Department;
import com.vansh.campus_app.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/department")
@CrossOrigin(origins = "*")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addDepartment(@RequestBody Department d){
        Department saved=departmentRepository.save(d);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Department>> all(){
        return ResponseEntity.ok(departmentRepository.findAll());
    }
}
