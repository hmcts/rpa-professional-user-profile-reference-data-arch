import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    OrganisationTypeReferenceDataService,
    OrganisationTypeReferenceDataPopupService,
    OrganisationTypeReferenceDataComponent,
    OrganisationTypeReferenceDataDetailComponent,
    OrganisationTypeReferenceDataDialogComponent,
    OrganisationTypeReferenceDataPopupComponent,
    OrganisationTypeReferenceDataDeletePopupComponent,
    OrganisationTypeReferenceDataDeleteDialogComponent,
    organisationTypeRoute,
    organisationTypePopupRoute,
    OrganisationTypeReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...organisationTypeRoute,
    ...organisationTypePopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganisationTypeReferenceDataComponent,
        OrganisationTypeReferenceDataDetailComponent,
        OrganisationTypeReferenceDataDialogComponent,
        OrganisationTypeReferenceDataDeleteDialogComponent,
        OrganisationTypeReferenceDataPopupComponent,
        OrganisationTypeReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        OrganisationTypeReferenceDataComponent,
        OrganisationTypeReferenceDataDialogComponent,
        OrganisationTypeReferenceDataPopupComponent,
        OrganisationTypeReferenceDataDeleteDialogComponent,
        OrganisationTypeReferenceDataDeletePopupComponent,
    ],
    providers: [
        OrganisationTypeReferenceDataService,
        OrganisationTypeReferenceDataPopupService,
        OrganisationTypeReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataOrganisationTypeReferenceDataModule {}
