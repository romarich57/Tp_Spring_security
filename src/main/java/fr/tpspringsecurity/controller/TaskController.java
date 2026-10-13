package fr.tpspringsecurity.controller;

import java.util.List;
import fr.tpspringsecurity.service.TaskService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Responsabilite : HTTP des taches, sans logique metier ni regles de securite. */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<String> tasks() {
        return taskService.findAll();
    }
    // TODO 5.1 : exposer GET /api/tasks/confidential depuis ce controller.
    // TODO 5.2 : proteger cette methode avec @PreAuthorize("hasRole('ADMIN')").
}
