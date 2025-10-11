package com.vansh.campus_app.controller;

import com.vansh.campus_app.entity.User;
import com.vansh.campus_app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody User u){
        return ResponseEntity.ok(userRepository.save(u));
    }

    @GetMapping("/all")
    public ResponseEntity<?> all(){
        return ResponseEntity.ok(userRepository.findAll());
    }
}
