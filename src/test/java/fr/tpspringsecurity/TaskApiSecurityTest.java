package fr.tpspringsecurity;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
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
    private MockMvc mvc;

    @Test
    void applicationMetierEtAutorisationsFonctionnentEnsemble() throws Exception {
        mvc.perform(get("/api/public/info")).andExpect(status().isOk());

        mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "alice123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Préparer la revue de sprint"));
        mvc.perform(get("/api/tasks").with(httpBasic("alice", "mauvais")))
                .andExpect(status().isUnauthorized());

        mvc.perform(get("/api/admin/stats")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/stats").with(httpBasic("alice", "alice123")))
                .andExpect(status().isForbidden());
        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalTasks").value(3))
                .andExpect(jsonPath("$.completedTasks").value(1));

        mvc.perform(get("/api/tasks/confidential")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/tasks/confidential").with(httpBasic("alice", "alice123")))
                .andExpect(status().isForbidden());
        mvc.perform(get("/api/tasks/confidential").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.projectName").value("Projet Orion"));

        String create = """
                {"title":"Préparer la démonstration","description":"Réunir les captures",
                 "status":"TODO","priority":"HIGH","dueDate":"2026-10-28"}
                """;
        mvc.perform(post("/api/tasks").contentType(MediaType.APPLICATION_JSON).content(create))
                .andExpect(status().isUnauthorized());
        mvc.perform(post("/api/tasks").with(httpBasic("alice", "alice123"))
                        .contentType(MediaType.APPLICATION_JSON).content(create))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(4));
        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalTasks").value(4))
                .andExpect(jsonPath("$.highPriorityTasks").value(2));

        mvc.perform(put("/api/tasks/4").with(httpBasic("alice", "alice123"))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Démo prête\",\"status\":\"IN_PROGRESS\",\"priority\":\"MEDIUM\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Démo prête"));
        mvc.perform(patch("/api/tasks/4/complete").with(httpBasic("alice", "alice123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("DONE"));
        mvc.perform(delete("/api/tasks/4").with(httpBasic("alice", "alice123")))
                .andExpect(status().isNoContent());
        mvc.perform(delete("/api/tasks/404").with(httpBasic("alice", "alice123")))
                .andExpect(status().isNotFound());

        mvc.perform(get("/api/admin/stats").with(httpBasic("bob", "bob123")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalTasks").value(3));
    }
}
