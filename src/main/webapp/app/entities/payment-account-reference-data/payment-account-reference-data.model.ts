import { BaseEntity } from './../../shared';

export class PaymentAccountReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public pbaNumber?: string,
        public organisationId?: number,
        public paymentAccountTypeId?: number,
        public accountAssignments?: BaseEntity[],
    ) {
    }
}
