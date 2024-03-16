package com.example.studyabroad.program;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/v1/program")
public class ProgramController {

    private final ProgramService programService;

    public ProgramController(ProgramService programService) {
        this.programService = programService;
    }

    @GetMapping("all")
    public ResponseEntity<List<Program>> filterPrograms(@RequestParam(required = false) String location,
            @RequestParam(required = false) String duration) {
        if (location != null && duration != null) {
            List<Program> filteredLocationDuration = programService.filterByLocationDuration(location, duration);
            return ResponseEntity.ok(filteredLocationDuration);
        } else if (location != null) {
            List<Program> filteredLocation = programService.filterByLocation(location);
            return ResponseEntity.ok(filteredLocation);
        } else if (duration != null) {
            List<Program> filteredDuration = programService.filterByDuration(duration);
            return ResponseEntity.ok(filteredDuration);
        } else {
            List<Program> allPrograms = programService.getPrograms();
            return ResponseEntity.ok(allPrograms);
        }
    }

    @GetMapping(path = "{programId}")
    public Object getProgram(@PathVariable("programId") Long programId) {
        return programService.getProgram(programId);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Program>> searchPrograms(@RequestParam(required = false) String query) {
        if (query != null) {
            List<Program> filteredLocation = programService.filterByLocation(query);
            List<Program> filteredName = programService.filterByName(query);
            List<Program> filteredUniversity = programService.filterByUniversity(query);

            List<Program> merged_list = new ArrayList<>();
            merged_list.addAll(filteredLocation);
            merged_list.addAll(filteredName);
            merged_list.addAll(filteredUniversity);

            return ResponseEntity.ok(merged_list);
        } else {
            return ResponseEntity.ok(null);
        }
    }

    @PostMapping
    public void addNewProgram(@RequestBody Program program) {
        programService.addNewProgram(program);
    }

    @PostMapping("all")
    public void addPrograms(@RequestBody List<Program> program) {
        programService.savePrograms(program);
    }

    @DeleteMapping(path = "{programId}")
    public void deleteProgram(@PathVariable("programId") Long programId) {
        programService.deleteProgram(programId);
    }

    @PutMapping(path = "{programId}")
    public void updateProgram(
            @PathVariable("programId") Long programId,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String university,
            @RequestParam(required = false) String duration,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) LocalDate start_date,
            @RequestParam(required = false) LocalDate end_date,
            @RequestParam(required = false) URI image_url) {
        programService.updateProgram(
                programId,
                name,
                description,
                university,
                duration,
                location,
                start_date,
                end_date,
                image_url);
    }

}
