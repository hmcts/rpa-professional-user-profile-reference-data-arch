import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProfessionalUserReferenceDataComponent } from './professional-user-reference-data.component';
import { ProfessionalUserReferenceDataDetailComponent } from './professional-user-reference-data-detail.component';
import { ProfessionalUserReferenceDataPopupComponent } from './professional-user-reference-data-dialog.component';
import {
    ProfessionalUserReferenceDataDeletePopupComponent
} from './professional-user-reference-data-delete-dialog.component';

@Injectable()
export class ProfessionalUserReferenceDataResolvePagingParams implements Resolve<any> {

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

export const professionalUserRoute: Routes = [
    {
        path: 'professional-user-reference-data',
        component: ProfessionalUserReferenceDataComponent,
        resolve: {
            'pagingParams': ProfessionalUserReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUsers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'professional-user-reference-data/:id',
        component: ProfessionalUserReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUsers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const professionalUserPopupRoute: Routes = [
    {
        path: 'professional-user-reference-data-new',
        component: ProfessionalUserReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professional-user-reference-data/:id/edit',
        component: ProfessionalUserReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'professional-user-reference-data/:id/delete',
        component: ProfessionalUserReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ProfessionalUsers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
