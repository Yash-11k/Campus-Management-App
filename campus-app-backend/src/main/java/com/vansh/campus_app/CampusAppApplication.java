package com.vansh.campus_app;

import com.vansh.campus_app.entity.Department;
import com.vansh.campus_app.repository.DepartmentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class CampusAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CampusAppApplication.class, args);
	}

    @Bean
    CommandLineRunner seedDepartments(DepartmentRepository departmentRepository){
        return args -> {
            if(departmentRepository.count()==0){
                departmentRepository.save(new Department(null,"Canteen","canteen@campus.edu"));
                departmentRepository.save(new Department(null,"Cleanliness","cleanliness@campus.edu"));
                departmentRepository.save(new Department(null,"Maintenance","maintenance@campus.edu"));
                departmentRepository.save(new Department(null,"Fest","fest@campus.edu"));
            }
        };
    }

}
