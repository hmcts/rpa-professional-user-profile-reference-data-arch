package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountService;
import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccount;
import uk.gov.hmcts.reform.ref.pup.repository.PaymentAccountRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.PaymentAccountMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PaymentAccount.
 */
@Service
@Transactional
public class PaymentAccountServiceImpl implements PaymentAccountService {

    private final Logger log = LoggerFactory.getLogger(PaymentAccountServiceImpl.class);

    private final PaymentAccountRepository paymentAccountRepository;

    private final PaymentAccountMapper paymentAccountMapper;

    public PaymentAccountServiceImpl(PaymentAccountRepository paymentAccountRepository, PaymentAccountMapper paymentAccountMapper) {
        this.paymentAccountRepository = paymentAccountRepository;
        this.paymentAccountMapper = paymentAccountMapper;
    }

    /**
     * Save a paymentAccount.
     *
     * @param paymentAccountDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PaymentAccountDTO save(PaymentAccountDTO paymentAccountDTO) {
        log.debug("Request to save PaymentAccount : {}", paymentAccountDTO);
        PaymentAccount paymentAccount = paymentAccountMapper.toEntity(paymentAccountDTO);
        paymentAccount = paymentAccountRepository.save(paymentAccount);
        return paymentAccountMapper.toDto(paymentAccount);
    }

    /**
     * Get all the paymentAccounts.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PaymentAccountDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PaymentAccounts");
        return paymentAccountRepository.findAll(pageable)
            .map(paymentAccountMapper::toDto);
    }

    /**
     * Get one paymentAccount by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PaymentAccountDTO findOne(Long id) {
        log.debug("Request to get PaymentAccount : {}", id);
        PaymentAccount paymentAccount = paymentAccountRepository.findOne(id);
        return paymentAccountMapper.toDto(paymentAccount);
    }

    /**
     * Delete the paymentAccount by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaymentAccount : {}", id);
        paymentAccountRepository.delete(id);
    }
}
