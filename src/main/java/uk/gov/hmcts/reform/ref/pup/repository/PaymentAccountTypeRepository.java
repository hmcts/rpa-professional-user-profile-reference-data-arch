package uk.gov.hmcts.reform.ref.pup.repository;

import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccountType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PaymentAccountType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentAccountTypeRepository extends JpaRepository<PaymentAccountType, Long> {

}
