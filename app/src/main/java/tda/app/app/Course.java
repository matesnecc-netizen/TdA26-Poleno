package tda.app.app;

public record Course(
        String id,          // UUID jako string
        String title,
        String description,
        String lecturer
) {}
