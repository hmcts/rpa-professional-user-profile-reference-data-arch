package uk.gov.hmcts.reform.ref.pup.service.mapper;

import uk.gov.hmcts.reform.ref.pup.domain.*;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountTypeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity PaymentAccountType and its DTO PaymentAccountTypeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PaymentAccountTypeMapper extends EntityMapper<PaymentAccountTypeDTO, PaymentAccountType> {


    @Mapping(target = "paymentAccounts", ignore = true)
    PaymentAccountType toEntity(PaymentAccountTypeDTO paymentAccountTypeDTO);

    default PaymentAccountType fromId(Long id) {
        if (id == null) {
            return null;
        }
        PaymentAccountType paymentAccountType = new PaymentAccountType();
        paymentAccountType.setId(id);
        return paymentAccountType;
    }
}
