package fr.tpspringsecurity.controller;

import fr.tpspringsecurity.model.TaskStats;
import fr.tpspringsecurity.service.StatisticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Expose les indicateurs d'administration calcules par le service. */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final StatisticsService statisticsService;

    public AdminController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/stats")
    public TaskStats stats() {
        return statisticsService.getSummary();
    }
}
