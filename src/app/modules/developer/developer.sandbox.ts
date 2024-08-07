import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SchemeType, UserContext } from 'src/app/shared/models';
import { ApplicationContextService } from 'src/app/shared/services/application-context.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { UtilService } from 'src/app/utility';
import * as moment from 'moment';
import { MONTHS, RAZORPAY } from 'src/app/shared/constants/meta-data';
import { ConfigService } from 'src/app/configuration';
import { DeveloperService } from './developer.service';
@Injectable({
    providedIn: 'root',
})
export class DeveloperSandbox {
    currentUser!:UserContext;
    constructor(
        private service: DeveloperService,
        private appContext: ApplicationContextService,
        private authService: AuthenticationService,
        private configService:ConfigService,
        private utilService: UtilService
    ) {
        this.currentUser=appContext.getCurrentUser();
    }
    userSelect(schemeType: SchemeType) {
        this.appContext.updateUserSelection(schemeType);
    }

    compare(a: number | string, b: number | string, isAsc: boolean) {
        return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
    logout() {
        return this.authService.logout().pipe(
            tap((res: any) => {
                this.utilService.displayNotification('success','Logged out successfully');
                this.appContext.logout();
            })
        );
    }

    refreshToken() {
        const access_token = this.appContext.getCurrentUser().access_token;
        return this.service.refreshToken().pipe(
            tap((res: any) => {
                if (res?.access_token) this.appContext.updateToken(res.access_token);
            })
        );
    }

    downloadExcel(data:Array<any>,type:any,fileName:any){
        this.utilService.exportAsExcelFile(
            this.formatDataForExcel(data || [],type),
            fileName
        );
        this.utilService.displayNotification(fileName+' excel file generated successfully!', 'success');
    }
    formatDataForExcel(data:Array<any>,type:any) {
        const temp: any = [];
        data.forEach((ele: any) => {
            temp.push(this.getExcelColumns(type,ele));
        });
        return temp;
    }

    getExcelColumns(type:any,ele:any){
        let tempObject: any = {};
        if(type==='schemes'){
            tempObject['Created Date'] = moment(ele.created_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Total Amount'] = ele?.total_amount || '';
            tempObject['No Of Months'] = ele?.no_of_months || '';
            tempObject['Amount Per Month'] = ele?.amount_per_month || '';
            tempObject['Updated Date'] =  moment(ele.updated_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Status'] = ele?.status?ele.status.toUpperCase() :  '';
        }
        if(type==='schemesNames'){
            tempObject['Created Date'] = moment(ele.created_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Scheme Name'] = ele?.scheme_name || '';
            tempObject['Updated Date'] =  moment(ele.updated_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Status'] = ele?.status?ele.status.toUpperCase() :  '';
        }
        if(type==='payments'){
            console.log(ele);
            tempObject['Start Date'] = moment(ele.created_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Paid Date'] = ele?.paidDate?moment(ele.paidDate).format('DD-MM-YYYY  hh:mm A'):'';
            tempObject['Due Date'] = moment(ele.dueDate).format('DD-MM-YYYY  hh:mm A');
            tempObject['Amount'] = ele?.amount_paid || '';
            tempObject['Month'] = ele?.month_paid || '';
            tempObject['Payment ID'] = ele?.txnNo || '';
            tempObject['Late Fee'] = ele?.lateFee || '';
            tempObject['Status'] = ele?.status?ele.status.toUpperCase() :  '';
        }
        if(type==='users'){
            console.log(ele);
            tempObject['Created Date'] = moment(ele.created_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['User ID'] = ele?.userId || '';
            tempObject['User Type'] = ele?.role || '';
            tempObject['First Name'] = ele?.firstName || '';
            tempObject['Last Name'] = ele?.lastName || '';
            tempObject['Full Name'] = ele?.userName || '';
            tempObject['Email'] = ele?.email || '';
            tempObject['Mobile'] = ele?.mobilePhone || '';
            tempObject['PAN Number'] = ele?.pan || '';
            tempObject['Aadhar Number'] = ele?.aadhar || '';
            tempObject['Introduced By'] = ele?.introducedBy || '';
            tempObject['Updated Date'] = moment(ele.updated_at).format('DD-MM-YYYY  hh:mm A');
            tempObject['Status'] = ele?.status?ele.status.toUpperCase() :  '';
        }
        return tempObject;
    }

    deleteRequest(params: any) {
        return this.service.deleteRequest(params.type,params.id).pipe(
            tap((res: any) => {
                if(res?.deleteStatus === 1)
                {
                  this.utilService.displayNotification('Deleted successfully','success')
                }
            })
        );
    }

    addUpdateSchemeTypes(params: any) {
        return this.service.addUpdateSchemeTypes(params);
    }

    getSgsSchemeTypes() {
        return this.service.getSgsSchemeTypes();
    }
    getSettings() {
        return this.service.getSettings().pipe(
            tap((res: any) => {
                if(res?.data)
                {
                   res.data.data=JSON.parse(res.data.data);
                }
            })
        );
    }
    getSiteUpdates() {
        return this.service.getSiteUpdates();
    }

    updateSiteUpdates(params: any) {
      return this.service.updateSiteUpdates(params).pipe(
          tap((res: any) => {
              if(res?.data?.id >0)
              {
                this.utilService.displayNotification(res?.message,'success');
              }
          })
      );
  }
  updateSettings(params: any) {
      return this.service.updateSettings(params).pipe(
          tap((res: any) => {
              if(res?.data?.id >0)
              {
                this.utilService.displayNotification(res?.message,'success');
              }
          })
      );
  }
    addUpdateSchemes(params: any) {
        return this.service.addUpdateSchemes(params).pipe(
            tap((res: any) => {
                if(res?.data?.id >0)
                {
                  this.utilService.displayNotification(res?.message,'success');
                }
            })
        );
    }
    addUpdateSchemeNames(params: any) {
        return this.service.addUpdateSchemeNames(params).pipe(
            tap((res: any) => {
                if(res?.data?.id >0)
                {
                  this.utilService.displayNotification(res?.message,'success');
                }
            })
        );
    }
    addUpdateSchemeMembers(params: any) {
        return this.service.addUpdateSchemeMembers(params).pipe(
            tap((res: any) => {
                if(res?.data)
                {
                  this.utilService.displayNotification(res?.message,'success');
                }
            })
        );
    }
    addUpdatePayment(params: any) {
        return this.service.addUpdatePayment(params).pipe(
            tap((res: any) => {
                if(res?.data?.id >0)
                {
                  this.utilService.displayNotification(res?.message,'success');
                }
            })
        );
    }

    getSgsSchemes(params:any) {
        return this.service.getSgsSchemes(params).pipe(
            tap((res: any) => {
                if (res?.data?.data) {
                   res.data.data=(res.data.data || []).map((value:any) => {
                    value.name=('Total Amount: '+value.total_amount)+', Months: '+value.no_of_months+', Payment Per Month:'+value.amount_per_month;
                    return value;
                  });
                }
            })
        );
    }
    addUpdateUsers(params: any) {
        return this.service.addUpdateUsers(params).pipe(
            tap((res: any) => {
                if(res?.data?.id >0)
                {
                  this.utilService.displayNotification(res?.message,'success');
                }
            })
        );
    }

    getSgsUsers(params:any) {
        return this.service.getSgsUsers(params);
    }
    getSgsSchemeNames(params:any) {
        return this.service.getSgsSchemeNames(params).pipe(
            tap((res: any) => {
                if (res?.data?.data) {
                   res.data.data=(res.data.data || []).map((value:any) => {
                    value.name=('Total Amount: '+value.total_amount)+', Months: '+value.no_of_months+', Payment Per Month:'+value.amount_per_month;
                    return value;
                  });
                }
            })
        );
    }

    getSchemeMembers(params:any) {
        return this.service.getSchemeMembers(params).pipe(
            tap((res: any) => {
                if (res?.data?.data) {
                   res.data.data=(res.data.data || []).map((value:any) => {
                    value.schemeName=('Total Amount: '+value.total_amount)+', Months: '+value.no_of_months+', Payment Per Month:'+value.amount_per_month;
                    value.month=value.is_winner==='YES'?MONTHS[((new Date(value.scheme_date).getMonth())+value.winning_month)-1]:'';
                    return value;
                  });
                }
            })
        );
    }
    getPayments(params:any) {
        return this.service.getPayments(params);
    }
    getAllUsers(params:any) {
        return this.service.getSgsUsers(params).pipe(
            tap((res: any) => {
                if (res?.data) {
                   res.data=(res?.data || []).filter((value:any) => value.userId!==this.currentUser.userId);
                }
            })
        );
    }
    prepareRazorPayOptions(data:any){
        return {
            description: data?.userId+'_'+data?.scheme_name+'_Month: '+data?.month_paid,
            currency: RAZORPAY.CURRENCY,
            amount: data.amount_paid,
            name: this.currentUser.userName,
            key: this.configService.get(RAZORPAY.KEY_NAME),
            image: RAZORPAY.LOGO,
            prefill: {
              name: this.currentUser.userName,
              email:  this.currentUser.user_email,
              phone: this.currentUser.mobilePhone
            },
            theme: {
              color: RAZORPAY.THEME_COLOR
            },
            modal: {
              ondismiss:  () => {
                //console.log('dismissed')
              }
            }
          };
    }
    download(params: any) {
        return this.service.download(params).pipe(
            tap((res: any) => {
                if (res.data.length > 0) {
                    this.utilService.downloadPdf(res.data, params.fileName);
                    this.utilService.displayNotification('PDF generated successfully!', 'success');
                }
            })
        );
    }
}
