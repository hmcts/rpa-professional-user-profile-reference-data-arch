import { BaseEntity } from './../../shared';

export class PaymentAccountTypeReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public paymentAccounts?: BaseEntity[],
    ) {
    }
}
