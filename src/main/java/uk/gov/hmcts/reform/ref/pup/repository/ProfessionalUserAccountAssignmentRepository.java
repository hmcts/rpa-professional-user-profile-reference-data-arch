package uk.gov.hmcts.reform.ref.pup.repository;

import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUserAccountAssignment;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ProfessionalUserAccountAssignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfessionalUserAccountAssignmentRepository extends JpaRepository<ProfessionalUserAccountAssignment, Long> {

}
