import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    PaymentAccountTypeReferenceDataService,
    PaymentAccountTypeReferenceDataPopupService,
    PaymentAccountTypeReferenceDataComponent,
    PaymentAccountTypeReferenceDataDetailComponent,
    PaymentAccountTypeReferenceDataDialogComponent,
    PaymentAccountTypeReferenceDataPopupComponent,
    PaymentAccountTypeReferenceDataDeletePopupComponent,
    PaymentAccountTypeReferenceDataDeleteDialogComponent,
    paymentAccountTypeRoute,
    paymentAccountTypePopupRoute,
    PaymentAccountTypeReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paymentAccountTypeRoute,
    ...paymentAccountTypePopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentAccountTypeReferenceDataComponent,
        PaymentAccountTypeReferenceDataDetailComponent,
        PaymentAccountTypeReferenceDataDialogComponent,
        PaymentAccountTypeReferenceDataDeleteDialogComponent,
        PaymentAccountTypeReferenceDataPopupComponent,
        PaymentAccountTypeReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        PaymentAccountTypeReferenceDataComponent,
        PaymentAccountTypeReferenceDataDialogComponent,
        PaymentAccountTypeReferenceDataPopupComponent,
        PaymentAccountTypeReferenceDataDeleteDialogComponent,
        PaymentAccountTypeReferenceDataDeletePopupComponent,
    ],
    providers: [
        PaymentAccountTypeReferenceDataService,
        PaymentAccountTypeReferenceDataPopupService,
        PaymentAccountTypeReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataPaymentAccountTypeReferenceDataModule {}
