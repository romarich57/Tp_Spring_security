package fr.tpspringsecurity.model;

public record TaskStats(
        int totalTasks,
        int completedTasks,
        int pendingTasks,
        int highPriorityTasks,
        int completionRate
) {
}
