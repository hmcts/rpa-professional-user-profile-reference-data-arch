package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.AddressTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AddressType and its DTO AddressTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AddressTypeMapper extends EntityMapper<AddressTypeDTO, AddressType> {


    @Mapping(target = "addresses", ignore = true)
    AddressType toEntity(AddressTypeDTO addressTypeDTO);

    default AddressType fromId(Long id) {
        if (id == null) {
            return null;
        }
        AddressType addressType = new AddressType();
        addressType.setId(id);
        return addressType;
    }
}
