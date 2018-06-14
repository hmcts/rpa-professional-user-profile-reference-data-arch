import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    AddressReferenceDataService,
    AddressReferenceDataPopupService,
    AddressReferenceDataComponent,
    AddressReferenceDataDetailComponent,
    AddressReferenceDataDialogComponent,
    AddressReferenceDataPopupComponent,
    AddressReferenceDataDeletePopupComponent,
    AddressReferenceDataDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
    AddressReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressReferenceDataComponent,
        AddressReferenceDataDetailComponent,
        AddressReferenceDataDialogComponent,
        AddressReferenceDataDeleteDialogComponent,
        AddressReferenceDataPopupComponent,
        AddressReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        AddressReferenceDataComponent,
        AddressReferenceDataDialogComponent,
        AddressReferenceDataPopupComponent,
        AddressReferenceDataDeleteDialogComponent,
        AddressReferenceDataDeletePopupComponent,
    ],
    providers: [
        AddressReferenceDataService,
        AddressReferenceDataPopupService,
        AddressReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataAddressReferenceDataModule {}
