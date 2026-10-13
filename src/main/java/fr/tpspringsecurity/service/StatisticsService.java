package fr.tpspringsecurity.service;

import fr.tpspringsecurity.model.Task;
import fr.tpspringsecurity.model.TaskPriority;
import fr.tpspringsecurity.model.TaskStats;
import java.util.List;
import org.springframework.stereotype.Service;

/** Calcule les indicateurs a partir des taches actuellement en memoire. */
@Service
public class StatisticsService {
    private final TaskService taskService;

    public StatisticsService(TaskService taskService) {
        this.taskService = taskService;
    }

    public TaskStats getSummary() {
        List<Task> tasks = taskService.findAll();
        int total = tasks.size();
        int completed = (int) tasks.stream().filter(task -> task.status().name().equals("DONE")).count();
        int highPriority = (int) tasks.stream().filter(task -> task.priority() == TaskPriority.HIGH).count();
        int rate = total == 0 ? 0 : Math.round(completed * 100.0f / total);
        return new TaskStats(total, completed, total - completed, highPriority, rate);
    }
}
