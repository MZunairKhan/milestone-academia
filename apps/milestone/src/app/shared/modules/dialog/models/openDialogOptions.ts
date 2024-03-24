import { DynamicDialogInput } from "./dynamicDialogInput.model";

export interface OpenDialogOptions {
    height?: string;
    width?: string;
    hasBackdrop?: boolean;
    disableClose?: boolean;
}

export interface CreateDialogData {
    componentData: DynamicDialogInput;
    dialogOptions: OpenDialogOptions;
    dialogCloseHandler(data: any): void;
}