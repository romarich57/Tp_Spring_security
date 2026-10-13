package fr.tpspringsecurity.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * API fictive volontairement ouverte pour l'exercice 1.
 * Les règles de sécurité seront ajoutées dans les branches suivantes.
 */
@RestController
@RequestMapping("/api")
public class TaskController {

    @GetMapping("/public/info")
    public String info() {
        return "Bienvenue sur notre API";
    }

    @GetMapping("/tasks")
    public List<String> tasks() {
        return List.of(
                "Corriger un bug",
                "Developper une fonctionnalite",
                "Tester l'application"
        );
    }

    @GetMapping("/admin/stats")
    public String stats() {
        return "Chiffre d'affaires fictif : 150000 EUR";
    }
    // TODO EXERCICE 5.1 : Ajouter GET /api/tasks/confidential.
    // TODO EXERCICE 5.2 : Proteger cette methode avec @PreAuthorize("hasRole('ADMIN')").
    // NOTE : ce endpoint est volontairement absent jusqu'a votre implementation.
}
