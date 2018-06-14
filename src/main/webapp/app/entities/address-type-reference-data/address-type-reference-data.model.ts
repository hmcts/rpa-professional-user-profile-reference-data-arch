import { BaseEntity } from './../../shared';

export class AddressTypeReferenceData implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public addresses?: BaseEntity[],
    ) {
    }
}
