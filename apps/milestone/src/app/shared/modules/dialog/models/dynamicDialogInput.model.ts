import { ComponentType } from '@angular/cdk/overlay';

export interface DynamicDialogInput {
    title?: string;
    component: ComponentType<any>;
}