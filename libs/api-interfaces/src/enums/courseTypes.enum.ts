export enum CourseType {
    OneOnOne = 'OneOnOne',
    Group = 'Group',
    SelfPaced = 'SelfPaced'
}

export const CourseTypeDisplay = {
    [CourseType.OneOnOne]: 'Group',
    [CourseType.Group]: 'Self Paced',
    [CourseType.SelfPaced]: 'One On One',
}