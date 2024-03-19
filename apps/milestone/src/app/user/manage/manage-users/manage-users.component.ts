import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ManageUserService } from '../../services/manage-user.service';
import { DialogService } from '../../../shared/modules/dialog/dialog-service.service';

import { UserData } from '../../models/user.model';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { CreatePersonUserDTOBase } from '@milestone-academia/api-interfaces';

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
  total = 15;
  pageSize = 10;
  userType = new FormControl('');
  userName = new FormControl('');
  presenceType = new FormControl('');
  userFilterOptions = ['Student', 'Instructor', 'Master', 'Staff'];
  presenceFilterOptions = ['Online', 'InPerson'];

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private manageUserService: ManageUserService,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void { 
    this.userType.valueChanges.subscribe(() => this.getUserList());
    this.userName.valueChanges.subscribe(() => this.getUserList());
    this.presenceType.valueChanges.subscribe(() => this.getUserList());
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.page.subscribe(() => this.getUserList());
    
    this.getUserList();
  }

  onUserTypeSelectionChange(event: any) {
    const selectedValues = event.value;
    this.userType.setValue(selectedValues);
    console.log(this.userType.value);
  }
  
  onPresenceTypeSelectionChange(event: any) {
    const selectedValues = event.value;
    this.presenceType.setValue(selectedValues);
  }
  
  getUserList() {
    this.manageUserService.getUserList(this.userType.value || '', this.presenceType.value || '',this.userName.value || '' , 1, this.paginator.pageSize).subscribe((list: any) => {
       console.log(list.users);
      this.dataSource = new MatTableDataSource(list.users);
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
      dialogCloseHandler: data => this.createUser(data),
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

  mapToCreateDTO(data: any) {
    const request: CreatePersonUserDTOBase = {
      firstName: data.userData.firstName,
      lastName: data.userData.lastName,
      userName: data.userData.userName,
      password: 'abcd1234',
      email: data.userData.email,
      presenceType: data.userData.presenceType,
      userType: data.userData.userType,
      personalData: {
        addressLine1: data.addressData.addressLine1,
        addressLine2: data.addressData.addressLine2,
        postalCode: data.addressData.postalCode,
        city: data.addressData.city,
        country: data.addressData.country,
        personalIdentification: data.personalData.personalIdentification,
        guardianName: data.personalData.guardianName,
        guardianIdentification: data.personalData.guardianIdentification,
        guardianEmail: data.personalData.guardianEmail,
        phoneNumber: data.personalData.phoneNumber,
      }
    };

    return request;
  }

  createUser(userInput: any) {
    const dto = this.mapToCreateDTO(userInput.data);
    this.manageUserService.addUser(dto).subscribe(value => this.getUserList());
  }
}