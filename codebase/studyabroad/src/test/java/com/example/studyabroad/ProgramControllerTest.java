package com.example.studyabroad;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.studyabroad.program.Program;
import com.example.studyabroad.program.ProgramController;
import com.example.studyabroad.program.ProgramService;

public class ProgramControllerTest {
    @Test
    public void testFilterPrograms() {
        // Mock ProgramService
        ProgramService programServiceMock = mock(ProgramService.class);
        List<Program> expectedPrograms = new ArrayList<>();
        when(programServiceMock.getPrograms()).thenReturn(expectedPrograms);

        ProgramController programController = new ProgramController(programServiceMock);

        // Call the filterPrograms method
        ResponseEntity<List<Program>> response = programController.filterPrograms(null, null);

        // Verify the response
        assertSame(response.getBody(), expectedPrograms);
        assertEquals(response.getStatusCode(), HttpStatus.OK);
    }

    @Test
    public void testGetProgram() {
        // Mock ProgramService
        ProgramService programServiceMock = mock(ProgramService.class);
        Program expectedProgram = new Program();
        when(programServiceMock.getProgram(1L)).thenReturn(expectedProgram);

        // Create ProgramController instance
        ProgramController programController = new ProgramController(programServiceMock);

        // Call the getProgram method
        Object response = programController.getProgram(1L);

        // Verify the response
        assertSame(response, expectedProgram);
    }
}
