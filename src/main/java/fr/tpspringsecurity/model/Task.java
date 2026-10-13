package fr.tpspringsecurity.model;

public record Task(
        long id,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        String dueDate,
        String assignee
) {
}
