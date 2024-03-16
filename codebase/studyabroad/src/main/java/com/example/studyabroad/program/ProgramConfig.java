package com.example.studyabroad.program;

import java.net.URI;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ProgramConfig {

    private static final String[] COURSE_NAMES = { "Computer Science", "Business Administration", "Medicine",
            "Art History", "Engineering" };

    private static final String[] LOCATIONS = { "New York", "London", "Paris", "Tokyo", "Sydney" };

    private static final String[] UNIVERSITIES = { "Harvard University", "Oxford University", "Sorbonne University",
            "University of Tokyo", "University of Sydney" };

    private static final String[] IMAGE_URLS = {
            "https://img.freepik.com/free-photo/view-famous-building-lyon-city_268835-4073.jpg",
            "https://img.freepik.com/free-photo/vertical-shot-church-holy-eucharist-lviv-ukraine_181624-61651.jpg",
            "https://img.freepik.com/free-photo/roof-old-building-front-blue-sky-day-time_231208-3241.jpg",
            "https://img.freepik.com/free-photo/vertical-shot-gorgeous-deutscher-dom-berlin-germany-during-daylight_181624-49163.jpg",
            "https://img.freepik.com/free-photo/church-bulgaria-outside-church-bell-view_482257-36203.jpg",
            "https://img.freepik.com/free-photo/boston-downtown_649448-4309.jpg",
            "https://img.freepik.com/free-photo/students-graduated_23-2148522279.jpg",
            "https://img.freepik.com/free-photo/portrait-young-asian-woman-student-using-laptop-tablet-smart-happy-pose-university-college_231208-1866.jpg",
            "https://img.freepik.com/free-photo/ottawa-historical-buildings_649448-3676.jpg",
            "https://img.freepik.com/free-photo/old-state-house-city-boston-massachusetts_493961-565.jpg" };

    private static final String[] DESCRIPTIONS = {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    };

    public static LocalDate convertToLocalDate(Date dateToConvert) {
        return dateToConvert.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    public static List<Program> generateDummyData(int count) {
        List<Program> programs = new ArrayList<>();
        Random random = new Random();

        for (int i = 0; i < count; i++) {
            String name = COURSE_NAMES[random.nextInt(COURSE_NAMES.length)];
            String description = DESCRIPTIONS[random.nextInt(DESCRIPTIONS.length)];
            String university = UNIVERSITIES[random.nextInt(UNIVERSITIES.length)];
            int duration = random.nextInt(12) + 1; // Duration between 1 and 12 months
            String location = LOCATIONS[random.nextInt(LOCATIONS.length)];
            Date startDate = new Date(); // Dummy start date
            Date endDate = new Date(System.currentTimeMillis() + duration * 30 * 24 * 60 * 60 * 1000L);
            // End date = start date + duration (in milliseconds)

            URI imageUrl = URI.create(IMAGE_URLS[random.nextInt(IMAGE_URLS.length)]);

            Program course = new Program(name, description, university, Integer.toString(duration), location,
                    convertToLocalDate(startDate), convertToLocalDate(endDate), imageUrl);
            programs.add(course);
        }

        return programs;
    }

    @Bean
    CommandLineRunner commandLineRunner(ProgramRepository repository) {
        return args -> {
            repository.saveAll(generateDummyData(50));
        };
    }
}
