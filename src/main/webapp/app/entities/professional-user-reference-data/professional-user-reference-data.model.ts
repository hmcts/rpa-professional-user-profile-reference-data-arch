import { BaseEntity } from './../../shared';

export class ProfessionalUserReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public surname?: string,
        public email?: string,
        public phoneNumber?: string,
        public accountAssignments?: BaseEntity[],
    ) {
    }
}
