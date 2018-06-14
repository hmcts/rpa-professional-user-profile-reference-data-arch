import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PaymentAccountReferenceDataComponent } from './payment-account-reference-data.component';
import { PaymentAccountReferenceDataDetailComponent } from './payment-account-reference-data-detail.component';
import { PaymentAccountReferenceDataPopupComponent } from './payment-account-reference-data-dialog.component';
import { PaymentAccountReferenceDataDeletePopupComponent } from './payment-account-reference-data-delete-dialog.component';

@Injectable()
export class PaymentAccountReferenceDataResolvePagingParams implements Resolve<any> {

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

export const paymentAccountRoute: Routes = [
    {
        path: 'payment-account-reference-data',
        component: PaymentAccountReferenceDataComponent,
        resolve: {
            'pagingParams': PaymentAccountReferenceDataResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccounts'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'payment-account-reference-data/:id',
        component: PaymentAccountReferenceDataDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const paymentAccountPopupRoute: Routes = [
    {
        path: 'payment-account-reference-data-new',
        component: PaymentAccountReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-account-reference-data/:id/edit',
        component: PaymentAccountReferenceDataPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'payment-account-reference-data/:id/delete',
        component: PaymentAccountReferenceDataDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PaymentAccounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
