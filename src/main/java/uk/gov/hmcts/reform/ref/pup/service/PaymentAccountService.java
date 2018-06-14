package uk.gov.hmcts.reform.ref.pup.service;

import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing PaymentAccount.
 */
public interface PaymentAccountService {

    /**
     * Save a paymentAccount.
     *
     * @param paymentAccountDTO the entity to save
     * @return the persisted entity
     */
    PaymentAccountDTO save(PaymentAccountDTO paymentAccountDTO);

    /**
     * Get all the paymentAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<PaymentAccountDTO> findAll(Pageable pageable);

    /**
     * Get the "id" paymentAccount.
     *
     * @param id the id of the entity
     * @return the entity
     */
    PaymentAccountDTO findOne(Long id);

    /**
     * Delete the "id" paymentAccount.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
