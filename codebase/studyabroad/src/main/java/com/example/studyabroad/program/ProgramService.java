package com.example.studyabroad.program;

import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;

@Component
public class ProgramService {
    private final ProgramRepository programRepository;

    public ProgramService(ProgramRepository programRepository) {
        this.programRepository = programRepository;
    }

    public List<Program> getPrograms() {
        return programRepository.findAll();
    }

    public Object getProgram(Long programId) {
        return programRepository.findById(programId);
    }

    public void addNewProgram(Program program) {
        programRepository.save(program);
    }

    public void savePrograms(List<Program> program) {
        programRepository.saveAll(program);
    }

    public void deleteProgram(Long programId) {
        boolean programExist = programRepository.existsById(programId);
        if (!programExist) {
            throw new IllegalStateException("Program with id " + programId + " does not exists.");
        } else {
            programRepository.deleteById(programId);
        }
    }

    @Transactional
    public void updateProgram(Long programId, String name, String description, String university, String duration,
            String location, LocalDate start_date, LocalDate end_date, URI image_url) {
        Program program = programRepository.findById(programId)
                .orElseThrow(() -> new IllegalStateException("Program with id " + programId + " does not exists."));

        if (name != null && name.length() > 0 && !Objects.equals(program.getName(), name)) {
            program.setName(name);
        }

        if (description != null && description.length() > 0 && !Objects.equals(program.getDescription(), description)) {
            program.setDescription(description);
        }

        if (university != null && university.length() > 0 && !Objects.equals(program.getUniversity(), university)) {
            program.setUniversity(university);
        }

        if (duration != null && duration.length() > 0 && !Objects.equals(program.getDuration(), duration)) {
            program.setDuration(duration);
        }

        if (location != null && location.length() > 0 && !Objects.equals(program.getLocation(), location)) {
            program.setLocation(location);
        }

        if (start_date != null && !Objects.equals(program.getStart_date(), start_date)) {
            program.setStart_date(start_date);
        }

        if (end_date != null && !Objects.equals(program.getEnd_date(), end_date)) {
            program.setEnd_date(end_date);
        }

        if (image_url != null && !Objects.equals(program.getImage_url(), image_url)) {
            program.setImage_url(image_url);
        }
    }

    public List<Program> filterByLocation(String location) {
        return programRepository.findProgramByLocation(location);
    }

    public List<Program> filterByDuration(String duration) {
        return programRepository.findProgramByDuration(duration);
    }

    public List<Program> filterByLocationDuration(String location, String duration) {
        return programRepository.findProgramByLocationDuration(location, duration);
    }

    public List<Program> filterByName(String name) {
        return programRepository.findProgramByName(name);
    }

    public List<Program> filterByUniversity(String university) {
        return programRepository.findProgramByUniversity(university);
    }
}
