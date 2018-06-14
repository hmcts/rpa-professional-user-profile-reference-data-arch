package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.AddressTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing AddressType.
 */
public interface AddressTypeService {

    /**
     * Save a addressType.
     *
     * @param addressTypeDTO the entity to save
     * @return the persisted entity
     */
    AddressTypeDTO save(AddressTypeDTO addressTypeDTO);

    /**
     * Get all the addressTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<AddressTypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" addressType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    AddressTypeDTO findOne(Long id);

    /**
     * Delete the "id" addressType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
