package fr.tpspringsecurity.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @GetMapping("/confidential")
    @PreAuthorize("hasRole('ADMIN')")
    public String confidential() {
        return taskService.confidential();
    }
}
