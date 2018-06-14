package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserAccountAssignmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ProfessionalUserAccountAssignment and its DTO ProfessionalUserAccountAssignmentDTO.
 */
@Mapper(componentModel = "spring", uses = {PaymentAccountMapper.class, ProfessionalUserMapper.class})
public interface ProfessionalUserAccountAssignmentMapper extends EntityMapper<ProfessionalUserAccountAssignmentDTO, ProfessionalUserAccountAssignment> {

    @Mapping(source = "paymentAccount.id", target = "paymentAccountId")
    @Mapping(source = "professionalUser.id", target = "professionalUserId")
    ProfessionalUserAccountAssignmentDTO toDto(ProfessionalUserAccountAssignment professionalUserAccountAssignment);

    @Mapping(source = "paymentAccountId", target = "paymentAccount")
    @Mapping(source = "professionalUserId", target = "professionalUser")
    ProfessionalUserAccountAssignment toEntity(ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO);

    default ProfessionalUserAccountAssignment fromId(Long id) {
        if (id == null) {
            return null;
        }
        ProfessionalUserAccountAssignment professionalUserAccountAssignment = new ProfessionalUserAccountAssignment();
        professionalUserAccountAssignment.setId(id);
        return professionalUserAccountAssignment;
    }
}
