import { Levels } from "../enums";

export interface CreateMcqsDTOBase {
    question: string;
    subjectId: string;
    level: Levels;
    correctOption: number;
    choices: string[];
  }