import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { OrganisationTypeReferenceDataComponent } from './organisation-type-reference-data.component';
import { OrganisationTypeReferenceDataDetailComponent } from './organisation-type-reference-data-detail.component';
import { OrganisationTypeReferenceDataPopupComponent } from './organisation-type-reference-data-dialog.component';
import {
    OrganisationTypeReferenceDataDeletePopupComponent
} from './organisation-type-reference-data-delete-dialog.component';

@Injectable()
export class OrganisationTypeReferenceDataResolvePagingParams implements Resolve<any> {

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

export const organisationTypeRoute: Routes = [
    {
        path: 'organisation-type-reference-data',
        component: OrganisationTypeReferenceDataComponent,
        resolve: {
            'pagingParams': OrganisationTypeReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'organisation-type-reference-data/:id',
        component: OrganisationTypeReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const organisationTypePopupRoute: Routes = [
    {
        path: 'organisation-type-reference-data-new',
        component: OrganisationTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-type-reference-data/:id/edit',
        component: OrganisationTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'organisation-type-reference-data/:id/delete',
        component: OrganisationTypeReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'OrganisationTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
