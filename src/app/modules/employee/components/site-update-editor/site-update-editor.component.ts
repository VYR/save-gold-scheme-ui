import { Component, Inject, OnInit } from '@angular/core';
import {EditorConfig, ST_BUTTONS} from 'ngx-simple-text-editor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UntypedFormBuilder } from '@angular/forms';
import { SgsDialogService } from 'src/app/shared/services/sgs-dialog.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/utility';
import { EmployeeSandbox } from '../../empolyee.sandbox';

@Component({
  selector: 'app-site-update-editor',
  templateUrl: './site-update-editor.component.html',
  styleUrls: ['./site-update-editor.component.scss']
})
export class SiteUpdateEditorComponent {

  description  = '';
  descriptionUpdated  = '';
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };


  constructor(public dialogRef: MatDialogRef<SiteUpdateEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sandBox: EmployeeSandbox,
    public fb: UntypedFormBuilder,
    private dialog: SgsDialogService,
    private utilService: UtilService
)
{
    console.log(this.data.data);
    this.description = this.data?.data?.data?.description;
    this.descriptionUpdated = this.data?.data?.data?.descriptionUpdated;
}

update(){
  const formData:any={
    id: this.data?.data?.id,
    siteName: this.data?.data?.siteName,
    description: this.description,
    descriptionUpdated: this.descriptionUpdated
  };
  this.sandBox.updateSiteUpdates(formData).subscribe((res:any) => {
      if(res?.data){
        this.dialogRef.close(res.data);
      }
  });
}

}
