import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PaymentAccountTypeReferenceDataComponent } from './payment-account-type-reference-data.component';
import { PaymentAccountTypeReferenceDataDetailComponent } from './payment-account-type-reference-data-detail.component';
import { PaymentAccountTypeReferenceDataPopupComponent } from './payment-account-type-reference-data-dialog.component';
import {
    PaymentAccountTypeReferenceDataDeletePopupComponent
} from './payment-account-type-reference-data-delete-dialog.component';

@Injectable()
export class PaymentAccountTypeReferenceDataResolvePagingParams implements Resolve<any> {

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

export const paymentAccountTypeRoute: Routes = [
    {
        path: 'payment-account-type-reference-data',
        component: PaymentAccountTypeReferenceDataComponent,
        resolve: {
            'pagingParams': PaymentAccountTypeReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccountTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-account-type-reference-data/:id',
        component: PaymentAccountTypeReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccountTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentAccountTypePopupRoute: Routes = [
    {
        path: 'payment-account-type-reference-data-new',
        component: PaymentAccountTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccountTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-account-type-reference-data/:id/edit',
        component: PaymentAccountTypeReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccountTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-account-type-reference-data/:id/delete',
        component: PaymentAccountTypeReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccountTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
