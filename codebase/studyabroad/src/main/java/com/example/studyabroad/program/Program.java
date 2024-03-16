package com.example.studyabroad.program;

import java.net.URI;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "_program")
public class Program {
    @Id
    @GeneratedValue
    private Integer id;
    private String name;
    private String description;
    private String university;
    private String duration;
    private String location;
    private LocalDate start_date;
    private LocalDate end_date;
    private URI image_url;

    public Program(
            String name,
            String description,
            String university,
            String duration,
            String location,
            LocalDate start_date,
            LocalDate end_date,
            URI image_url) {
        this.name = name;
        this.description = description;
        this.university = university;
        this.duration = duration;
        this.location = location;
        this.start_date = start_date;
        this.end_date = end_date;
        this.image_url = image_url;
    }
}