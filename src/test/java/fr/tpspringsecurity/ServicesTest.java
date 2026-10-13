package fr.tpspringsecurity;

import fr.tpspringsecurity.service.TaskService;
import fr.tpspringsecurity.service.StatisticsService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

/** Test unitaire du metier, independant des regles Spring Security. */
class ServicesTest {
    @Test
    void lesTachesSontFourniesParLeService() {
        TaskService service = new TaskService();
        assertEquals(3, service.findAll().size());
        assertTrue(service.findAll().contains("Corriger un bug"));
    }

    @Test
    void lesStatistiquesSontFourniesParLeService() {
        StatisticsService service = new StatisticsService();
        assertTrue(service.getSummary().contains("150000"));
    }
}
