import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { GroupComponent } from './components/group/group.component';
import { SchemeMembersListComponent } from './scheme-members-list.component';
import { IndividualComponent } from './components/individual/individual.component';
import { TotalMembersComponent } from './components/total-members/total-members.component';
const routes: Routes = [
    {
        path: '',
        component:SchemeMembersListComponent,
        children: [
            {
                path: 'total-members',
                component:TotalMembersComponent,
            },
            {
                path: 'individual',
                component:IndividualComponent,
            },
            {
                path: 'group',
                component:GroupComponent,
            },
            {
                path: '',
                redirectTo: 'individual',
                pathMatch: 'full',
            }
             
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SchemeMembersListRoutingModule {}