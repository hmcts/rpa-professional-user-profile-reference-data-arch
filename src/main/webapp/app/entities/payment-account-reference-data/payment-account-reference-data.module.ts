import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    PaymentAccountReferenceDataService,
    PaymentAccountReferenceDataPopupService,
    PaymentAccountReferenceDataComponent,
    PaymentAccountReferenceDataDetailComponent,
    PaymentAccountReferenceDataDialogComponent,
    PaymentAccountReferenceDataPopupComponent,
    PaymentAccountReferenceDataDeletePopupComponent,
    PaymentAccountReferenceDataDeleteDialogComponent,
    paymentAccountRoute,
    paymentAccountPopupRoute,
    PaymentAccountReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...paymentAccountRoute,
    ...paymentAccountPopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PaymentAccountReferenceDataComponent,
        PaymentAccountReferenceDataDetailComponent,
        PaymentAccountReferenceDataDialogComponent,
        PaymentAccountReferenceDataDeleteDialogComponent,
        PaymentAccountReferenceDataPopupComponent,
        PaymentAccountReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        PaymentAccountReferenceDataComponent,
        PaymentAccountReferenceDataDialogComponent,
        PaymentAccountReferenceDataPopupComponent,
        PaymentAccountReferenceDataDeleteDialogComponent,
        PaymentAccountReferenceDataDeletePopupComponent,
    ],
    providers: [
        PaymentAccountReferenceDataService,
        PaymentAccountReferenceDataPopupService,
        PaymentAccountReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataPaymentAccountReferenceDataModule {}
