package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountTypeService;
import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccountType;
import uk.gov.hmcts.reform.ref.pup.repository.PaymentAccountTypeRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountTypeDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.PaymentAccountTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing PaymentAccountType.
 */
@Service
@Transactional
public class PaymentAccountTypeServiceImpl implements PaymentAccountTypeService {

    private final Logger log = LoggerFactory.getLogger(PaymentAccountTypeServiceImpl.class);

    private final PaymentAccountTypeRepository paymentAccountTypeRepository;

    private final PaymentAccountTypeMapper paymentAccountTypeMapper;

    public PaymentAccountTypeServiceImpl(PaymentAccountTypeRepository paymentAccountTypeRepository, PaymentAccountTypeMapper paymentAccountTypeMapper) {
        this.paymentAccountTypeRepository = paymentAccountTypeRepository;
        this.paymentAccountTypeMapper = paymentAccountTypeMapper;
    }

    /**
     * Save a paymentAccountType.
     *
     * @param paymentAccountTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public PaymentAccountTypeDTO save(PaymentAccountTypeDTO paymentAccountTypeDTO) {
        log.debug("Request to save PaymentAccountType : {}", paymentAccountTypeDTO);
        PaymentAccountType paymentAccountType = paymentAccountTypeMapper.toEntity(paymentAccountTypeDTO);
        paymentAccountType = paymentAccountTypeRepository.save(paymentAccountType);
        return paymentAccountTypeMapper.toDto(paymentAccountType);
    }

    /**
     * Get all the paymentAccountTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<PaymentAccountTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all PaymentAccountTypes");
        return paymentAccountTypeRepository.findAll(pageable)
            .map(paymentAccountTypeMapper::toDto);
    }

    /**
     * Get one paymentAccountType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public PaymentAccountTypeDTO findOne(Long id) {
        log.debug("Request to get PaymentAccountType : {}", id);
        PaymentAccountType paymentAccountType = paymentAccountTypeRepository.findOne(id);
        return paymentAccountTypeMapper.toDto(paymentAccountType);
    }

    /**
     * Delete the paymentAccountType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete PaymentAccountType : {}", id);
        paymentAccountTypeRepository.delete(id);
    }
}
