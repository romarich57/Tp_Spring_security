package fr.tpspringsecurity;

import fr.tpspringsecurity.service.TaskService;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Test de base : reste vert avant et apres l'exercice 2.
 * Le test de la nouvelle securite est desactive tant que le TODO
 * du pom.xml n'est pas termine. Il ne doit pas faire echouer le squelette.
 */
@SpringBootTest
@AutoConfigureMockMvc
class TaskApiSecurityTest {

    @Autowired
    private TaskService taskService;

    @Autowired
    private MockMvc mvc;

    @Test
    void serviceMetierResteDisponible() {
        assertEquals(3, taskService.findAll().size());
    }

    @Disabled("TODO exercice 2 : installer spring-boot-starter-security puis retirer @Disabled.")
    @Test
    void exercice2LesRoutesDemandentUneConnexion() throws Exception {
        mvc.perform(get("/api/public/info")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/tasks")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/stats")).andExpect(status().isUnauthorized());
    }
}
