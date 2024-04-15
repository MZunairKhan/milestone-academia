import { BaseLoggerParams } from "./base-logger";

export class CriticalLogger extends BaseLoggerParams{
    stackTrace: string;
    error: string;
}