package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.OrganisationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Organisation and its DTO OrganisationDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganisationTypeMapper.class})
public interface OrganisationMapper extends EntityMapper<OrganisationDTO, Organisation> {

    @Mapping(source = "organisationType.id", target = "organisationTypeId")
    OrganisationDTO toDto(Organisation organisation);

    @Mapping(source = "organisationTypeId", target = "organisationType")
    @Mapping(target = "pbas", ignore = true)
    @Mapping(target = "addresses", ignore = true)
    Organisation toEntity(OrganisationDTO organisationDTO);

    default Organisation fromId(Long id) {
        if (id == null) {
            return null;
        }
        Organisation organisation = new Organisation();
        organisation.setId(id);
        return organisation;
    }
}
