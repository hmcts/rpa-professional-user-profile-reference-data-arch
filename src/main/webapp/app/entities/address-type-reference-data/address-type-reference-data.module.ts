import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    AddressTypeReferenceDataService,
    AddressTypeReferenceDataPopupService,
    AddressTypeReferenceDataComponent,
    AddressTypeReferenceDataDetailComponent,
    AddressTypeReferenceDataDialogComponent,
    AddressTypeReferenceDataPopupComponent,
    AddressTypeReferenceDataDeletePopupComponent,
    AddressTypeReferenceDataDeleteDialogComponent,
    addressTypeRoute,
    addressTypePopupRoute,
    AddressTypeReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressTypeRoute,
    ...addressTypePopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AddressTypeReferenceDataComponent,
        AddressTypeReferenceDataDetailComponent,
        AddressTypeReferenceDataDialogComponent,
        AddressTypeReferenceDataDeleteDialogComponent,
        AddressTypeReferenceDataPopupComponent,
        AddressTypeReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        AddressTypeReferenceDataComponent,
        AddressTypeReferenceDataDialogComponent,
        AddressTypeReferenceDataPopupComponent,
        AddressTypeReferenceDataDeleteDialogComponent,
        AddressTypeReferenceDataDeletePopupComponent,
    ],
    providers: [
        AddressTypeReferenceDataService,
        AddressTypeReferenceDataPopupService,
        AddressTypeReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataAddressTypeReferenceDataModule {}
