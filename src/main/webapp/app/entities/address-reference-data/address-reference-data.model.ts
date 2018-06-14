import { BaseEntity } from './../../shared';

export class AddressReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public addressLine1?: string,
        public addressLine2?: string,
        public addressLine3?: string,
        public city?: string,
        public county?: string,
        public postcode?: string,
        public organisationId?: number,
    ) {
    }
}
