package uk.gov.hmcts.reform.ref.pup.repository;

import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccount;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the PaymentAccount entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PaymentAccountRepository extends JpaRepository<PaymentAccount, Long> {

}
