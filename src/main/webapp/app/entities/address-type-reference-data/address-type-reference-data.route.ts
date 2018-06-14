import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AddressTypeReferenceDataComponent } from './address-type-reference-data.component';
import { AddressTypeReferenceDataDetailComponent } from './address-type-reference-data-detail.component';
import { AddressTypeReferenceDataPopupComponent } from './address-type-reference-data-dialog.component';
import { AddressTypeReferenceDataDeletePopupComponent } from './address-type-reference-data-delete-dialog.component';

@Injectable()
export class AddressTypeReferenceDataResolvePagingParams implements Resolve<any> {

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

export const addressTypeRoute: Routes = [
    {
        path: 'address-type-reference-data',
        component: AddressTypeReferenceDataComponent,
        resolve: {
            'pagingParams': AddressTypeReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-type-reference-data/:id',
        component: AddressTypeReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressTypePopupRoute: Routes = [
    {
        path: 'address-type-reference-data-new',
        component: AddressTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-type-reference-data/:id/edit',
        component: AddressTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-type-reference-data/:id/delete',
        component: AddressTypeReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AddressTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
