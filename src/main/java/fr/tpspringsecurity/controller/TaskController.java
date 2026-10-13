package fr.tpspringsecurity.controller;

import fr.tpspringsecurity.model.Task;
import fr.tpspringsecurity.model.ConfidentialProject;
import fr.tpspringsecurity.model.TaskRequest;
import fr.tpspringsecurity.service.TaskService;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Routes HTTP du gestionnaire de taches. */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> tasks() {
        return taskService.findAll();
    }

    @PostMapping
    public ResponseEntity<Task> create(@RequestBody TaskRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.create(request));
    }

    @PutMapping("/{id}")
    public Task update(@PathVariable long id, @RequestBody TaskRequest request) {
        return taskService.update(id, request);
    }

    @PatchMapping("/{id}/complete")
    public Task complete(@PathVariable long id) {
        return taskService.complete(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/confidential")
    @PreAuthorize("hasRole('ADMIN')")
    public ConfidentialProject confidential() {
        return taskService.confidential();
    }
}
