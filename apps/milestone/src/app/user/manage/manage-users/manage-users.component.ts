import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ManageUserService } from '../../services/manage-user.service';
import { DialogService } from '../../../shared/modules/dialog/dialog-service.service';

import { UserData } from '../../models/user.model';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'milestone-academia-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class ManageUsersComponent implements OnInit, AfterViewInit {
  displayedColumns = [
    'name',
    'username',
    'email',
    'type',
    'presence',
    'action'
  ];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  userFilter = new FormControl('');
  userFilterOptions = ['Student', 'Instructor', 'Master', 'Staff'];

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private manageUserService: ManageUserService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.manageUserService.getUserList().subscribe((list: UserData[]) => {
      this.dataSource = new MatTableDataSource(list.filter(u => u.email !== this.userService.currentUser.email));
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userInfo(id: string) {
    this.userService.getUserDataById(id)
    .subscribe(value => {
      this.openInfoDialog(value);
    });
  }

  deleteUser(id: string) {
    // this.userService.deleteUserById(id)
    // .subscribe(value => {
    // });
  }

  openAddUserDialog() {
    this.dialogService.createComponentDialog({
      componentData: {
        title: 'Add a User',
        component: AddUserComponent
      },
      dialogOptions: {
        hasBackdrop: true
      },
      dialogCloseHandler: data => console.log(data),
    });
  }

  private openInfoDialog(data: UserData) {
    this.dialogService.createComponentDialog({
      componentData: {
        title: 'User Info',
        component: UserInfoComponent,
        componentData: {userData: data}
      },
      dialogOptions: {
        hasBackdrop: true,
        width: '60vw',
        height: '85vh'
      },
      dialogCloseHandler: data => console.log(data),
    });
  }
}