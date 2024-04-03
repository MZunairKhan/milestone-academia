import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { DialogService } from '../../../shared/modules/dialog/dialog-service.service';
import { AddMcqsComponent } from '../add-mcqs/add-mcqs.component';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'milestone-academia-instructor-view',
  templateUrl: './instructor-view.component.html',
  styleUrls: ['./instructor-view.component.scss'],
  host: {
    class: 'milestone-router-component',
  },
})
export class InstructorViewComponent implements OnInit {
  columns: 1 | 2 = 1;
  mcqs: any;
  indexOfA = 0;
  indexOfB = 1;
  indexOfC = 2;
  indexOfD = 3;

  constructor(
    private courseService: CourseService,
    private dialogService: DialogService,
    private readonly toastService: ToastService

  ) {}

  ngOnInit(): void {
    this.fetchMcqs();
  }

  fetchMcqs(): void {
    this.courseService.getAllMcqs().subscribe((value) => {
      this.mcqs = value;
    });
  }

  openAddMcqsDialog() {
    this.dialogService.createComponentDialog({
      componentData: {
        title: 'Add a Mcqs',
        component: AddMcqsComponent,
      },
      dialogOptions: {
        disableClose: true,
        hasBackdrop: true,
        width: '50%',
        height: '90%',
      },
      dialogCloseHandler: (data) => this.createMcqs(data),
    });
  }

  async createMcqs(data: any) {
    const { id, ...rest } = data.data.mcqData;
    const mcqsData = { ...rest };
    this.courseService.createMcqs(mcqsData).subscribe((value) => {
      this.toastService.openSnackBar("Mcqs Added Successfully")
      this.fetchMcqs();
    });
  }

  deleteMcq(id: string) {
    this.courseService.deleteMcqsById(id).subscribe((value) => {
      this.fetchMcqs();
    });
  }

  openEditMcqsDialog(data: any) {
    this.dialogService.createComponentDialog({
      componentData: {
        title: 'Edit MCQ',
        component: AddMcqsComponent,
        componentData: { mcqsData: data },
      },
      dialogOptions: {
        disableClose: true,
        hasBackdrop: true,
        width: '50%',
        height: '90%',
      },
      dialogCloseHandler: (data) => this.updateMcq(data),
    });
  }

  updateMcq(data: any) {
    this.courseService.updateMcq(data.data.mcqData).subscribe((value) => {
      this.toastService.openSnackBar("Mcqs Updated Successfully")
      this.fetchMcqs();
    });
  }
}
