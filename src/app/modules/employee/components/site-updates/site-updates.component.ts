import { Component, OnInit } from '@angular/core';
import { SgsDialogService, SgsDialogType } from 'src/app/shared/services/sgs-dialog.service';
import { SiteUpdateEditorComponent } from '../site-update-editor/site-update-editor.component';
import { EmployeeSandbox } from '../../empolyee.sandbox';

@Component({
  selector: 'app-site-updates',
  templateUrl: './site-updates.component.html',
  styleUrls: ['./site-updates.component.scss']
})
export class SiteUpdatesComponent implements OnInit {

  selectedWebsite:any;

  websites:Array<any> = [];
  constructor(private dialog:SgsDialogService,private sandbox:EmployeeSandbox) { }

  ngOnInit(): void {
    this.getSettings();
  }
  updateSettings(){
    const ref = this.dialog.openOverlayPanel('Update  ' + this.selectedWebsite?.siteName,
    SiteUpdateEditorComponent, {userType:5,data:this.selectedWebsite},SgsDialogType.large);
    ref.afterClosed().subscribe((res) => {
      console.log(res)
        if(res?.id>0){
        this.selectedWebsite.description = res?.description;
        this.selectedWebsite.descriptionUpdated = res?.descriptionUpdated;
      }
    });
  }
  getSettings(){
  this.sandbox.getSiteUpdates().subscribe(
    (res:any)=>{
      console.log(res);
      if (res?.data){
        this.websites=res?.data || [];
      }
    }
  );
  }

  getWebsite(event:any,site:any){
    this.selectedWebsite=site;
  }


}
