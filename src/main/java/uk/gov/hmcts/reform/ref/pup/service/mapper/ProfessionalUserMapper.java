package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProfessionalUser and its DTO ProfessionalUserDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ProfessionalUserMapper extends EntityMapper<ProfessionalUserDTO, ProfessionalUser> {


    @Mapping(target = "accountAssignments", ignore = true)
    ProfessionalUser toEntity(ProfessionalUserDTO professionalUserDTO);

    default ProfessionalUser fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProfessionalUser professionalUser = new ProfessionalUser();
        professionalUser.setId(id);
        return professionalUser;
    }
}
