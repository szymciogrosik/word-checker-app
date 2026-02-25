import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDetailsPopupData} from "../../../../_models/dialog/user-details/user-details-popup-data";
import {UserDetailsType} from "../../../../_models/dialog/user-details/user-details-type";
import {CustomTranslateService} from "../../../../_services/translate/custom-translate.service";
import {CustomValidators} from "../../../../_services/validator/custom-validators";
import {CustomCommonModule} from "../../../../_imports/CustomCommon.module";
import {UserFormComponent} from "../../../../_shared-components/user-form/user-form.component";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
  standalone: true,
  imports: [CustomCommonModule, UserFormComponent],
})
export class UserDetailsComponent implements OnInit {
  @ViewChild('userFormComponent') userFormComponent!: UserFormComponent;
  protected readonly UserDetailsType = UserDetailsType;

  constructor(
    public dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetailsPopupData,
    private translateService: CustomTranslateService,
  ) {
  }

  ngOnInit(): void {
  }

  protected onCancelClick(): void {
    this.dialogRef.close(null);
  }

  protected onApproveClick(): void {
    this.userFormComponent.triggerSubmit();
  }

  protected onFormSubmit(payload: any): void {
    this.dialogRef.close(payload);
  }

}
