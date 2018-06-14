import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    OrganisationReferenceDataService,
    OrganisationReferenceDataPopupService,
    OrganisationReferenceDataComponent,
    OrganisationReferenceDataDetailComponent,
    OrganisationReferenceDataDialogComponent,
    OrganisationReferenceDataPopupComponent,
    OrganisationReferenceDataDeletePopupComponent,
    OrganisationReferenceDataDeleteDialogComponent,
    organisationRoute,
    organisationPopupRoute,
    OrganisationReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...organisationRoute,
    ...organisationPopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OrganisationReferenceDataComponent,
        OrganisationReferenceDataDetailComponent,
        OrganisationReferenceDataDialogComponent,
        OrganisationReferenceDataDeleteDialogComponent,
        OrganisationReferenceDataPopupComponent,
        OrganisationReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        OrganisationReferenceDataComponent,
        OrganisationReferenceDataDialogComponent,
        OrganisationReferenceDataPopupComponent,
        OrganisationReferenceDataDeleteDialogComponent,
        OrganisationReferenceDataDeletePopupComponent,
    ],
    providers: [
        OrganisationReferenceDataService,
        OrganisationReferenceDataPopupService,
        OrganisationReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataOrganisationReferenceDataModule {}
