package com.sikhshan.restcontroller;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sikhshan.dto.CourseRequest;
import com.sikhshan.dto.CourseResponse;
import com.sikhshan.model.Course;
import com.sikhshan.model.User;
import com.sikhshan.repository.CourseRepository;
import com.sikhshan.repository.UserRepository;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private UserRepository userRepository;

	private CourseResponse toResponse(Course course) {
		CourseResponse resp = new CourseResponse();
		resp.setId(course.getId());
		resp.setTitle(course.getTitle());
		resp.setCode(course.getCode());
		resp.setDescription(course.getDescription());
		resp.setCategory(course.getCategory());
		if (course.getInstructor() != null) {
			resp.setInstructorId(course.getInstructor().getId());
		}
		resp.setStartDate(course.getStartDate());
		resp.setEndDate(course.getEndDate());
		resp.setCredits(course.getCredits());
		resp.setImageUrl(course.getImageUrl());
		resp.setStatus(course.getStatus());
		resp.setCreatedAt(course.getCreatedAt());
		return resp;
	}

	// Create Course
	@PostMapping
	public ResponseEntity<?> createCourse(@RequestBody CourseRequest courseRequest) {
		Optional<User> instructorOpt = userRepository.findById(courseRequest.getInstructorId());
		if (instructorOpt.isEmpty() || !instructorOpt.get().getRole().name().equalsIgnoreCase("faculty")) {
			return ResponseEntity.badRequest().body("Instructor must be a valid faculty user");
		}

		Course course = new Course();
		course.setTitle(courseRequest.getTitle());
		course.setCode(courseRequest.getCode());
		course.setDescription(courseRequest.getDescription());
		course.setCategory(courseRequest.getCategory());
		course.setInstructor(instructorOpt.get());
		course.setStartDate(courseRequest.getStartDate());
		course.setEndDate(courseRequest.getEndDate());
		course.setCredits(courseRequest.getCredits());
		course.setImageUrl(courseRequest.getImageUrl());
		course.setStatus(courseRequest.getStatus());
		course.setCreatedAt(LocalDate.now());

		Course savedCourse = courseRepository.save(course);
		return ResponseEntity.ok(toResponse(savedCourse));
	}
	
	// List All Courses
    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAllCourses() {
        List<Course> courses = courseRepository.findAll();
        List<CourseResponse> responses = courses.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    // Get Course by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        Optional<Course> courseOpt = courseRepository.findById(id);
        if (courseOpt.isPresent()) {
            return ResponseEntity.ok(toResponse(courseOpt.get()));
        } else {
            return ResponseEntity.status(404).body("Course not found with id: " + id);
        }
    }
}