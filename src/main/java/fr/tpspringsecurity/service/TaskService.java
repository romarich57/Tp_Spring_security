package fr.tpspringsecurity.service;

import fr.tpspringsecurity.model.Task;
import fr.tpspringsecurity.model.TaskPriority;
import fr.tpspringsecurity.model.TaskRequest;
import fr.tpspringsecurity.model.TaskStatus;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** Logique metier et stockage en memoire des taches de demonstration. */
@Service
public class TaskService {
    private final Map<Long, Task> tasks = new LinkedHashMap<>();
    private long nextId = 4;

    public TaskService() {
        tasks.put(1L, new Task(1, "Préparer la revue de sprint",
                "Rassembler les retours de l’équipe et mettre à jour la présentation.",
                TaskStatus.IN_PROGRESS, TaskPriority.HIGH, "2026-10-16", "Sophie Martin"));
        tasks.put(2L, new Task(2, "Finaliser le parcours de connexion",
                "Vérifier les écrans et les messages d’erreur avant la démonstration.",
                TaskStatus.TODO, TaskPriority.MEDIUM, "2026-10-20", "Lucas Bernard"));
        tasks.put(3L, new Task(3, "Mettre à jour la documentation API",
                "Documenter les nouvelles routes de gestion des tâches.",
                TaskStatus.DONE, TaskPriority.LOW, "2026-10-12", "Maya Petit"));
    }

    public synchronized List<Task> findAll() {
        return new ArrayList<>(tasks.values());
    }

    public synchronized Task create(TaskRequest request) {
        Task task = fromRequest(nextId++, request, null);
        tasks.put(task.id(), task);
        return task;
    }

    public synchronized Task update(long id, TaskRequest request) {
        Task existing = findById(id);
        Task task = fromRequest(id, request, existing);
        tasks.put(id, task);
        return task;
    }

    public synchronized Task complete(long id) {
        Task existing = findById(id);
        Task completed = new Task(existing.id(), existing.title(), existing.description(),
                TaskStatus.DONE, existing.priority(), existing.dueDate(), existing.assignee());
        tasks.put(id, completed);
        return completed;
    }

    public synchronized void delete(long id) {
        if (tasks.remove(id) == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tâche introuvable");
        }
    }

    private Task findById(long id) {
        Task task = tasks.get(id);
        if (task == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tâche introuvable");
        }
        return task;
    }

    private Task fromRequest(long id, TaskRequest request, Task existing) {
        if (request == null || request.title() == null || request.title().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le titre est obligatoire");
        }
        String title = request.title().trim();
        if (title.length() > 160) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le titre ne peut pas dépasser 160 caractères");
        }
        String description = request.description() == null ? "" : request.description().trim();
        if (description.length() > 1000) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La description ne peut pas dépasser 1000 caractères");
        }
        TaskStatus status = parseEnum(request.status(), TaskStatus.class, TaskStatus.TODO, "état");
        TaskPriority priority = parseEnum(request.priority(), TaskPriority.class, TaskPriority.MEDIUM, "priorité");
        String dueDate = request.dueDate() == null || request.dueDate().isBlank()
                ? null : request.dueDate().trim();
        if (dueDate != null) {
            try {
                LocalDate.parse(dueDate);
            } catch (Exception exception) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "L’échéance doit être une date ISO (AAAA-MM-JJ)");
            }
        }
        String assignee = request.assignee() == null
                ? existing == null ? null : existing.assignee()
                : request.assignee().trim();
        return new Task(id, title, description, status, priority, dueDate, assignee);
    }

    private <T extends Enum<T>> T parseEnum(String value, Class<T> type, T defaultValue, String label) {
        if (value == null || value.isBlank()) return defaultValue;
        try {
            return Enum.valueOf(type, value.trim().toUpperCase());
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Valeur de " + label + " invalide");
        }
    }
}
