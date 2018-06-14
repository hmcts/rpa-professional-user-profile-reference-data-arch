package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PaymentAccount and its DTO PaymentAccountDTO.
 */
@Mapper(componentModel = "spring", uses = {OrganisationMapper.class, PaymentAccountTypeMapper.class})
public interface PaymentAccountMapper extends EntityMapper<PaymentAccountDTO, PaymentAccount> {

    @Mapping(source = "organisation.id", target = "organisationId")
    @Mapping(source = "paymentAccountType.id", target = "paymentAccountTypeId")
    PaymentAccountDTO toDto(PaymentAccount paymentAccount);

    @Mapping(source = "organisationId", target = "organisation")
    @Mapping(target = "accountAssignments", ignore = true)
    @Mapping(source = "paymentAccountTypeId", target = "paymentAccountType")
    PaymentAccount toEntity(PaymentAccountDTO paymentAccountDTO);

    default PaymentAccount fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaymentAccount paymentAccount = new PaymentAccount();
        paymentAccount.setId(id);
        return paymentAccount;
    }
}
