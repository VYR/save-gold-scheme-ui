import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { ConfigService } from 'src/app/configuration';
import { UtilService } from 'src/app/utility';
import { UserContext } from '../models';

import { ApplicationContextService } from '../services/application-context.service';
import { ROLES, TOTAL_ROLETYPES } from '../constants/meta-data';

@Injectable({
    providedIn: 'root',
})
export class RoleGuard implements CanLoad, CanActivate {
    public entitlements: Array<string> = [];
    currentUser!: UserContext;
    modules: any;
    constructor(
        private router: Router,
        private appContext: ApplicationContextService,
        private configService: ConfigService,
        private util: UtilService
    ) {
        this.modules = this.configService.get('modules');
        this.appContext.currentUser.subscribe((res: UserContext) => {
            this.currentUser = res;
            this.entitlements = (res && res.entitlement && res.entitlement) || [];
        });
    }

    canLoad(route: Route): boolean {
        let hasAccess: boolean = false;
        if (this.appContext.isAuthenticated()) {
            const features =TOTAL_ROLETYPES.includes(this.currentUser.userType);
            console.log(features);
            if (!features) {
                hasAccess = false;
            } 
            else {
                hasAccess = true;
            }
            if (!hasAccess) {
                this.router.navigate(['/home/unauthorized-access', route.path]);
            }
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.util.displayNotification(`Authentication failed. Kindly login.`, 'error');
        this.router.navigate(['/login']);
        return true;
    }

    canActivate(route: ActivatedRouteSnapshot) {
        let role = route.data['routeInfo'];
        role = role.filter((item: any) => {
            return this.entitlements.includes(item.uuid);
        });
        this.router.navigate([role.length > 0 ? role[0]?.path : '/home/unauthorized-access']);
        return true;
    }
}