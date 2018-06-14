package uk.gov.hmcts.reform.ref.pup.repository;

import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUser;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProfessionalUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessionalUserRepository extends JpaRepository<ProfessionalUser, Long> {

}
