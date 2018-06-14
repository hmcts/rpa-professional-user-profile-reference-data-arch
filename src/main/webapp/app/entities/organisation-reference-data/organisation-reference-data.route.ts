import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrganisationReferenceDataComponent } from './organisation-reference-data.component';
import { OrganisationReferenceDataDetailComponent } from './organisation-reference-data-detail.component';
import { OrganisationReferenceDataPopupComponent } from './organisation-reference-data-dialog.component';
import { OrganisationReferenceDataDeletePopupComponent } from './organisation-reference-data-delete-dialog.component';

@Injectable()
export class OrganisationReferenceDataResolvePagingParams implements Resolve<any> {

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

export const organisationRoute: Routes = [
    {
        path: 'organisation-reference-data',
        component: OrganisationReferenceDataComponent,
        resolve: {
            'pagingParams': OrganisationReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organisations'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organisation-reference-data/:id',
        component: OrganisationReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organisations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationPopupRoute: Routes = [
    {
        path: 'organisation-reference-data-new',
        component: OrganisationReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-reference-data/:id/edit',
        component: OrganisationReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-reference-data/:id/delete',
        component: OrganisationReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Organisations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
