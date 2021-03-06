import { BaseEntity } from './../../shared';

export class OrganisationReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public organisationTypeId?: number,
        public pbas?: BaseEntity[],
        public addresses?: BaseEntity[],
    ) {
    }
}
