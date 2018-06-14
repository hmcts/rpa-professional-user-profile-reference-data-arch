import { BaseEntity } from './../../shared';

export class ProfessionalUserAccountAssignmentReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public paymentAccountId?: number,
        public professionalUserId?: number,
    ) {
    }
}
