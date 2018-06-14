package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {AddressTypeMapper.class, OrganisationMapper.class})
public interface AddressMapper extends EntityMapper<AddressDTO, Address> {

    @Mapping(source = "addressType.id", target = "addressTypeId")
    @Mapping(source = "organisation.id", target = "organisationId")
    AddressDTO toDto(Address address);

    @Mapping(source = "addressTypeId", target = "addressType")
    @Mapping(source = "organisationId", target = "organisation")
    Address toEntity(AddressDTO addressDTO);

    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
