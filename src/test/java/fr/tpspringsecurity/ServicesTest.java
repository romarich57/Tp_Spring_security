package fr.tpspringsecurity;

import fr.tpspringsecurity.model.TaskPriority;
import fr.tpspringsecurity.model.TaskRequest;
import fr.tpspringsecurity.service.StatisticsService;
import fr.tpspringsecurity.service.TaskService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

/** Verifie les regles metier sans demarrer Spring Security. */
class ServicesTest {
    @Test
    void lesTachesInitialesSontDesDonneesStructureesEtModifiables() {
        TaskService service = new TaskService();
        assertEquals(3, service.findAll().size());
        assertEquals("Préparer la revue de sprint", service.findAll().get(0).title());

        var created = service.create(new TaskRequest(
                "Relire les maquettes", "Préparer les retours.", "TODO", "HIGH", null, null));
        assertEquals(4, created.id());
        assertEquals(TaskPriority.HIGH, created.priority());
        assertEquals(4, service.findAll().size());
        assertEquals("DONE", service.complete(created.id()).status().name());
        service.delete(created.id());
        assertEquals(3, service.findAll().size());
    }

    @Test
    void lesStatistiquesReflètentLesTachesEtLeurEvolution() {
        TaskService tasks = new TaskService();
        StatisticsService statistics = new StatisticsService(tasks);
        assertEquals(3, statistics.getSummary().totalTasks());
        assertEquals(1, statistics.getSummary().completedTasks());
        tasks.create(new TaskRequest("Nouvelle tâche", "", "TODO", "HIGH", null, null));
        assertEquals(4, statistics.getSummary().totalTasks());
        assertEquals(2, statistics.getSummary().highPriorityTasks());
    }

    @Test
    void lesEntreesInvalidesSontRefusees() {
        TaskService service = new TaskService();
        assertThrows(RuntimeException.class, () -> service.create(
                new TaskRequest(" ", "", "TODO", "LOW", null, null)));
        assertThrows(RuntimeException.class, () -> service.create(
                new TaskRequest("Titre", "", "INVALID", "LOW", null, null)));
    }
}
