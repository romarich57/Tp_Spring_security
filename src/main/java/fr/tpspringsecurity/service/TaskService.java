package fr.tpspringsecurity.service;

import java.util.List;
import org.springframework.stereotype.Service;

/** Responsabilite : logique et donnees de demonstration relatives aux taches. */
@Service
public class TaskService {
    private static final List<String> TASKS = List.of(
            "Corriger un bug",
            "Developper une fonctionnalite",
            "Tester l'application"
    );

    public List<String> findAll() {
        return TASKS;
    }
    // Cette methode metier est fournie : a appeler depuis le controller en exercice 5.
    public String confidential() { return "Projet confidentiel"; }
}
