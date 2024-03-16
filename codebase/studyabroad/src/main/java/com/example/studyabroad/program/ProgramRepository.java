package com.example.studyabroad.program;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProgramRepository extends JpaRepository<Program, Long> {
    List<Program> findProgramByLocation(String location);

    List<Program> findProgramByDuration(String duration);

    @Query(("SELECT p FROM Program p WHERE p.location = :location AND p.duration = :duration"))
    List<Program> findProgramByLocationDuration(String location, String duration);

    List<Program> findProgramByName(String name);

    List<Program> findProgramByUniversity(String university);
}
