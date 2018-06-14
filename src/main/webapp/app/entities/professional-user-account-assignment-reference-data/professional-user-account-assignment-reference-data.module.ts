import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ReferencedataSharedModule } from '../../shared';
import {
    ProfessionalUserAccountAssignmentReferenceDataService,
    ProfessionalUserAccountAssignmentReferenceDataPopupService,
    ProfessionalUserAccountAssignmentReferenceDataComponent,
    ProfessionalUserAccountAssignmentReferenceDataDetailComponent,
    ProfessionalUserAccountAssignmentReferenceDataDialogComponent,
    ProfessionalUserAccountAssignmentReferenceDataPopupComponent,
    ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent,
    ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent,
    professionalUserAccountAssignmentRoute,
    professionalUserAccountAssignmentPopupRoute,
    ProfessionalUserAccountAssignmentReferenceDataResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...professionalUserAccountAssignmentRoute,
    ...professionalUserAccountAssignmentPopupRoute,
];

@NgModule({
    imports: [
        ReferencedataSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ProfessionalUserAccountAssignmentReferenceDataComponent,
        ProfessionalUserAccountAssignmentReferenceDataDetailComponent,
        ProfessionalUserAccountAssignmentReferenceDataDialogComponent,
        ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent,
        ProfessionalUserAccountAssignmentReferenceDataPopupComponent,
        ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent,
    ],
    entryComponents: [
        ProfessionalUserAccountAssignmentReferenceDataComponent,
        ProfessionalUserAccountAssignmentReferenceDataDialogComponent,
        ProfessionalUserAccountAssignmentReferenceDataPopupComponent,
        ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent,
        ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent,
    ],
    providers: [
        ProfessionalUserAccountAssignmentReferenceDataService,
        ProfessionalUserAccountAssignmentReferenceDataPopupService,
        ProfessionalUserAccountAssignmentReferenceDataResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataProfessionalUserAccountAssignmentReferenceDataModule {}
