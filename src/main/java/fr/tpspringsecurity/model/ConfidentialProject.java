package fr.tpspringsecurity.model;

public record ConfidentialProject(
        String projectName,
        String client,
        String summary,
        String internalNote
) {
}
