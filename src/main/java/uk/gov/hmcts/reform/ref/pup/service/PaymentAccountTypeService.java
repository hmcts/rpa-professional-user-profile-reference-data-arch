package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountTypeDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PaymentAccountType.
 */
public interface PaymentAccountTypeService {

    /**
     * Save a paymentAccountType.
     *
     * @param paymentAccountTypeDTO the entity to save
     * @return the persisted entity
     */
    PaymentAccountTypeDTO save(PaymentAccountTypeDTO paymentAccountTypeDTO);

    /**
     * Get all the paymentAccountTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PaymentAccountTypeDTO> findAll(Pageable pageable);

    /**
     * Get the "id" paymentAccountType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PaymentAccountTypeDTO findOne(Long id);

    /**
     * Delete the "id" paymentAccountType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
