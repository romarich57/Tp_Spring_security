package fr.tpspringsecurity;

import fr.tpspringsecurity.service.TaskService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

/** Ce test reste vert avant ET apres l'exercice 2. */
@SpringBootTest
class TaskApiSecurityTest {
    @Autowired
    private TaskService taskService;

    @Test
    void applicationEtMetierDemarrentAvecOuSansSecurity() {
        assertEquals(3, taskService.findAll().size());
    }
}
