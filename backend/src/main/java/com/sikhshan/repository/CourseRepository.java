package com.sikhshan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sikhshan.model.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {

}