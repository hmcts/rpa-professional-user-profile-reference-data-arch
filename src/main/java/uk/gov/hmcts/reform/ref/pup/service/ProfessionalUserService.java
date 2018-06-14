package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing ProfessionalUser.
 */
public interface ProfessionalUserService {

    /**
     * Save a professionalUser.
     *
     * @param professionalUserDTO the entity to save
     * @return the persisted entity
     */
    ProfessionalUserDTO save(ProfessionalUserDTO professionalUserDTO);

    /**
     * Get all the professionalUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<ProfessionalUserDTO> findAll(Pageable pageable);

    /**
     * Get the "id" professionalUser.
     *
     * @param id the id of the entity
     * @return the entity
     */
    ProfessionalUserDTO findOne(Long id);

    /**
     * Delete the "id" professionalUser.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
