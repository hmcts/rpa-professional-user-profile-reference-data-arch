import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProfessionalUserAccountAssignmentReferenceDataComponent } from './professional-user-account-assignment-reference-data.component';
import { ProfessionalUserAccountAssignmentReferenceDataDetailComponent } from './professional-user-account-assignment-reference-data-detail.component';
import { ProfessionalUserAccountAssignmentReferenceDataPopupComponent } from './professional-user-account-assignment-reference-data-dialog.component';
import {
    ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent
} from './professional-user-account-assignment-reference-data-delete-dialog.component';

@Injectable()
export class ProfessionalUserAccountAssignmentReferenceDataResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const professionalUserAccountAssignmentRoute: Routes = [
    {
        path: 'professional-user-account-assignment-reference-data',
        component: ProfessionalUserAccountAssignmentReferenceDataComponent,
        resolve: {
            'pagingParams': ProfessionalUserAccountAssignmentReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUserAccountAssignments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professional-user-account-assignment-reference-data/:id',
        component: ProfessionalUserAccountAssignmentReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUserAccountAssignments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professionalUserAccountAssignmentPopupRoute: Routes = [
    {
        path: 'professional-user-account-assignment-reference-data-new',
        component: ProfessionalUserAccountAssignmentReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUserAccountAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professional-user-account-assignment-reference-data/:id/edit',
        component: ProfessionalUserAccountAssignmentReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUserAccountAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professional-user-account-assignment-reference-data/:id/delete',
        component: ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUserAccountAssignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
