package tda.app.app;

import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    // Dočasně v paměti (později DB + seed)
    private static final List<Course> COURSES = List.of(
            new Course(
                    "11111111-1111-1111-1111-111111111111",
                    "Základy HTML",
                    "Základní tagy, struktura stránky, odkazy, formuláře.",
                    "Lektor A"
            ),
            new Course(
                    "22222222-2222-2222-2222-222222222222",
                    "Úvod do JavaScriptu",
                    "Proměnné, podmínky, funkce, práce s DOM.",
                    "Lektor B"
            )
    );

    // GET /api/courses?search=něco
    @GetMapping
    public List<Course> list(@RequestParam(name = "search", required = false) String search) {
        if (search == null || search.isBlank()) return COURSES;

        String s = search.toLowerCase();
        return COURSES.stream()
                .filter(c -> c.title().toLowerCase().contains(s))
                .collect(Collectors.toList());
    }

    // GET /api/courses/{uuid}
    @GetMapping("/{id}")
    public Course detail(@PathVariable String id) {
        return COURSES.stream()
                .filter(c -> c.id().equals(id))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Course not found"));
    }
}
