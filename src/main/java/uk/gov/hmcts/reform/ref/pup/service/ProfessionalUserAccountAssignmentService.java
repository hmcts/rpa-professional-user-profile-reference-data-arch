package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserAccountAssignmentDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ProfessionalUserAccountAssignment.
 */
public interface ProfessionalUserAccountAssignmentService {

    /**
     * Save a professionalUserAccountAssignment.
     *
     * @param professionalUserAccountAssignmentDTO the entity to save
     * @return the persisted entity
     */
    ProfessionalUserAccountAssignmentDTO save(ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO);

    /**
     * Get all the professionalUserAccountAssignments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProfessionalUserAccountAssignmentDTO> findAll(Pageable pageable);

    /**
     * Get the "id" professionalUserAccountAssignment.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProfessionalUserAccountAssignmentDTO findOne(Long id);

    /**
     * Delete the "id" professionalUserAccountAssignment.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
