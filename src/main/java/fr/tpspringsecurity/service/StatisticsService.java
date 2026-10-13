package fr.tpspringsecurity.service;

import org.springframework.stereotype.Service;

/** Responsabilite : fournir les statistiques metier fictives. */
@Service
public class StatisticsService {
    public String getSummary() {
        return "Chiffre d'affaires fictif : 150000 EUR";
    }
}
