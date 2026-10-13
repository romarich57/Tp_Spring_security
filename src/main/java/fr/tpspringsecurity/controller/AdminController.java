package fr.tpspringsecurity.controller;

import fr.tpspringsecurity.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Responsabilite : exposer les statistiques en HTTP. Le nom admin ne securise RIEN. */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final StatisticsService statisticsService;

    public AdminController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/stats")
    public String stats() {
        return statisticsService.getSummary();
    }
}
