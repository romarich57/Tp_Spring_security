package fr.tpspringsecurity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TaskApiSecurityTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void apiOuvertePermetDeGererLesTachesEtDeLireLesStatistiques() throws Exception {
        mockMvc.perform(get("/api/public/info")).andExpect(status().isOk());
        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Préparer la revue de sprint"));
        mockMvc.perform(get("/api/admin/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalTasks").value(3));

        String task = """
                {"title":"Préparer la démonstration","description":"Réunir les captures",
                 "status":"TODO","priority":"HIGH","dueDate":"2026-10-28"}
                """;
        mockMvc.perform(post("/api/tasks").contentType(APPLICATION_JSON).content(task))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(4));
        mockMvc.perform(put("/api/tasks/4").contentType(APPLICATION_JSON)
                        .content("{\"title\":\"Démo prête\",\"status\":\"IN_PROGRESS\",\"priority\":\"MEDIUM\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Démo prête"));
        mockMvc.perform(patch("/api/tasks/4/complete"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DONE"));
        mockMvc.perform(delete("/api/tasks/4")).andExpect(status().isNoContent());
    }
}
