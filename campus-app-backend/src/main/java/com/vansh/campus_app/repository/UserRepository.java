package com.vansh.campus_app.repository;

import com.vansh.campus_app.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User,String> {
}
