import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ReferencedataOrganisationReferenceDataModule } from './organisation-reference-data/organisation-reference-data.module';
import { ReferencedataOrganisationTypeReferenceDataModule } from './organisation-type-reference-data/organisation-type-reference-data.module';
import { ReferencedataAddressReferenceDataModule } from './address-reference-data/address-reference-data.module';
import { ReferencedataPaymentAccountReferenceDataModule } from './payment-account-reference-data/payment-account-reference-data.module';
import { ReferencedataPaymentAccountTypeReferenceDataModule } from './payment-account-type-reference-data/payment-account-type-reference-data.module';
import { ReferencedataProfessionalUserReferenceDataModule } from './professional-user-reference-data/professional-user-reference-data.module';
import {
    ReferencedataProfessionalUserAccountAssignmentReferenceDataModule
} from './professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ReferencedataOrganisationReferenceDataModule,
        ReferencedataOrganisationTypeReferenceDataModule,
        ReferencedataAddressReferenceDataModule,
        ReferencedataPaymentAccountReferenceDataModule,
        ReferencedataPaymentAccountTypeReferenceDataModule,
        ReferencedataProfessionalUserReferenceDataModule,
        ReferencedataProfessionalUserAccountAssignmentReferenceDataModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReferencedataEntityModule {}
