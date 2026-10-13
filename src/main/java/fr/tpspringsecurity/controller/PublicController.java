package fr.tpspringsecurity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Responsabilite : exposer les informations publiques de l'application. */
@RestController
@RequestMapping("/api/public")
public class PublicController {
    @GetMapping("/info")
    public String info() {
        return "Bienvenue sur notre API";
    }
}
