import { BaseEntity } from './../../shared';

export class OrganisationTypeReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public organisations?: BaseEntity[],
    ) {
    }
}
