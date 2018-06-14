package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.OrganisationTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity OrganisationType and its DTO OrganisationTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OrganisationTypeMapper extends EntityMapper<OrganisationTypeDTO, OrganisationType> {


    @Mapping(target = "organisations", ignore = true)
    OrganisationType toEntity(OrganisationTypeDTO organisationTypeDTO);

    default OrganisationType fromId(Long id) {
        if (id == null) {
            return null;
        }
        OrganisationType organisationType = new OrganisationType();
        organisationType.setId(id);
        return organisationType;
    }
}
