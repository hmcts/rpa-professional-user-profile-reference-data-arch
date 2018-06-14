package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.OrganisationTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing OrganisationType.
 */
public interface OrganisationTypeService {

    /**
     * Save a organisationType.
     *
     * @param organisationTypeDTO the entity to save
     * @return the persisted entity
     */
    OrganisationTypeDTO save(OrganisationTypeDTO organisationTypeDTO);

    /**
     * Get all the organisationTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<OrganisationTypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" organisationType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    OrganisationTypeDTO findOne(Long id);

    /**
     * Delete the "id" organisationType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
