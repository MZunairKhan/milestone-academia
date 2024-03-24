export enum CourseLevel {
    Olevel = "OLevel",
    Alevel = "Alevel",
    Edexcel = "Edexcel",
    IGCSE = "IGCSE",
}

export const CourseLevelDisplay = {
    [CourseLevel.Olevel]: 'O - level',
    [CourseLevel.Alevel]: 'A - level',
    [CourseLevel.Edexcel]: 'Edexcel',
    [CourseLevel.IGCSE]: 'IGCSE',
}