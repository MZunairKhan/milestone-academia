import { ComponentType } from '@angular/cdk/overlay';

export interface DynamicDialogInput {
    title?: string;
    componentData?: any;
    component: ComponentType<any>;
}