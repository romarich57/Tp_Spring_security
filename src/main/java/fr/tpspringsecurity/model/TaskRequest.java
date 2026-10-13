package fr.tpspringsecurity.model;

public record TaskRequest(
        String title,
        String description,
        String status,
        String priority,
        String dueDate,
        String assignee
) {
}
