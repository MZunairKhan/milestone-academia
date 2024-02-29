// import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
// import { RoleService } from './role.service';

import { Directive, OnInit, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { UserRoles } from "@milestone-academia/api-interfaces";
import { RoleService } from "../../../auth/services/role.service";

// @Directive({
//   selector: '[AllowRole]'
// })
// export class MSAllowRoleDirective {

//   constructor(
//     // private templateRef: TemplateRef<unknown>,
//     private viewContainer: ViewContainerRef,
//     private roleService: RoleService
//   ) {}

//   @Input() set AllowRole(roles: string[]){
//     const isAllowed: boolean = this.roleService.checkRoles(roles);
    
//     if (!isAllowed) {
//       // remove template from DOM
//       this.viewContainer.clear();
//     }

//     console.log("AllowRoleDirective", this.viewContainer)
//   }

// }


// import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
// import { UserRoles } from "@milestone-academia/api-interfaces";

// @Directive({
//   selector: "[AllowRole]", 
// })
// export class MSAllowRoleDirective {
//   private hasView = false;

//   constructor(
//     private templateRef: TemplateRef<any>,
//     private viewContainer: ViewContainerRef
//   ) {}

//   @Input() set AllowRole(condition: UserRoles[]) {
//     if (condition && !this.hasView) {
//       this.viewContainer.createEmbeddedView(this.templateRef);
//       this.hasView = true;
//     } else if (!condition && this.hasView) {
//       this.viewContainer.clear();
//       this.hasView = false;
//     }
//   }
// }

@Directive({
  selector: '[AllowRole]',
})
export class MSAllowRoleDirective implements OnInit {
  private roles: UserRoles[] = [];

  @Input() set AllowRole(roles: UserRoles[]) {
    this.roles = roles;
    this.displayTemplate();
  }

  constructor(
    private templateRef: TemplateRef<unknown>,
    private vcr: ViewContainerRef,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.displayTemplate();
  }

  private displayTemplate() {
    const isAllowed: boolean = this.roleService.checkRoles(this.roles);
    this.vcr.clear();
    if (isAllowed) {
      this.vcr.createEmbeddedView(this.templateRef);
    } else {
      this.vcr.clear();
    }
  }
}
