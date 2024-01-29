import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ManageUserService } from '../../services/manage-user.service';
import { DialogService } from '../../../shared/modules/dialog/dialog-service.service';

import { UserData } from '../../models/user.model';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'milestone-academia-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class ManageUsersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'username', 'email', 'presence'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  userList$: Observable<UserData[]> = this.manageUserService.userListSource$;

  constructor(
    private dialogService: DialogService,
    private manageUserService: ManageUserService,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.manageUserService.getUserList().subscribe((list: UserData[]) => {
      console.log(list);
      this.dataSource = new MatTableDataSource(list);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUserDialog() {
    const dialog_ref = this.dialogService.openDialog(AddUserComponent, {});

    dialog_ref.afterClosed().subscribe(data => console.log(data));
  }
}