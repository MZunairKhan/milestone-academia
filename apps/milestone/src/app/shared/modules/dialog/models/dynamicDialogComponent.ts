import { EventEmitter } from "@angular/core";

export interface DialogCloseConfig {
    dialogResult: boolean;
    data: any;
}

export interface DynamicDialogComponent {
    data?: any;    
    close?: EventEmitter<DialogCloseConfig>;
}