package fr.tpspringsecurity.controller;

import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TaskController {
    @GetMapping("/public/info")
    public String info() {
        return "Bienvenue sur notre API";
    }

    @GetMapping("/tasks")
    public List<String> tasks() {
        return List.of("Corriger un bug", "Developper une fonctionnalite", "Tester l'application");
    }

    @GetMapping("/admin/stats")
    public String stats() {
        return "Chiffre d'affaires fictif : 150000 EUR";
    }

    @GetMapping("/tasks/confidential")
    @PreAuthorize("hasRole('ADMIN')")
    public String confidential() {
        return "Projet confidentiel";
    }
}
