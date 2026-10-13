package fr.tpspringsecurity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void toutesLesRoutesSontPubliquesAvantSpringSecurity() throws Exception {
        // Ce test matérialise la vulnérabilité étudiée dans l'exercice 1.
        mockMvc.perform(get("/api/public/info")).andExpect(status().isOk());
        mockMvc.perform(get("/api/tasks")).andExpect(status().isOk());
        mockMvc.perform(get("/api/admin/stats")).andExpect(status().isOk());
    }
}
