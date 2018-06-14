import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    ProfessionalUserReferenceDataService,
    ProfessionalUserReferenceDataPopupService,
    ProfessionalUserReferenceDataComponent,
    ProfessionalUserReferenceDataDetailComponent,
    ProfessionalUserReferenceDataDialogComponent,
    ProfessionalUserReferenceDataPopupComponent,
    ProfessionalUserReferenceDataDeletePopupComponent,
    ProfessionalUserReferenceDataDeleteDialogComponent,
    professionalUserRoute,
    professionalUserPopupRoute,
    ProfessionalUserReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...professionalUserRoute,
    ...professionalUserPopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProfessionalUserReferenceDataComponent,
        ProfessionalUserReferenceDataDetailComponent,
        ProfessionalUserReferenceDataDialogComponent,
        ProfessionalUserReferenceDataDeleteDialogComponent,
        ProfessionalUserReferenceDataPopupComponent,
        ProfessionalUserReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        ProfessionalUserReferenceDataComponent,
        ProfessionalUserReferenceDataDialogComponent,
        ProfessionalUserReferenceDataPopupComponent,
        ProfessionalUserReferenceDataDeleteDialogComponent,
        ProfessionalUserReferenceDataDeletePopupComponent,
    ],
    providers: [
        ProfessionalUserReferenceDataService,
        ProfessionalUserReferenceDataPopupService,
        ProfessionalUserReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataProfessionalUserReferenceDataModule {}
