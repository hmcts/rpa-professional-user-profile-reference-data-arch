package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.AddressTypeService;
import uk.gov.hmcts.reform.ref.pup.domain.AddressType;
import uk.gov.hmcts.reform.ref.pup.repository.AddressTypeRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.AddressTypeDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.AddressTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing AddressType.
 */
@Service
@Transactional
public class AddressTypeServiceImpl implements AddressTypeService {

    private final Logger log = LoggerFactory.getLogger(AddressTypeServiceImpl.class);

    private final AddressTypeRepository addressTypeRepository;

    private final AddressTypeMapper addressTypeMapper;

    public AddressTypeServiceImpl(AddressTypeRepository addressTypeRepository, AddressTypeMapper addressTypeMapper) {
        this.addressTypeRepository = addressTypeRepository;
        this.addressTypeMapper = addressTypeMapper;
    }

    /**
     * Save a addressType.
     *
     * @param addressTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AddressTypeDTO save(AddressTypeDTO addressTypeDTO) {
        log.debug("Request to save AddressType : {}", addressTypeDTO);
        AddressType addressType = addressTypeMapper.toEntity(addressTypeDTO);
        addressType = addressTypeRepository.save(addressType);
        return addressTypeMapper.toDto(addressType);
    }

    /**
     * Get all the addressTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<AddressTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AddressTypes");
        return addressTypeRepository.findAll(pageable)
            .map(addressTypeMapper::toDto);
    }

    /**
     * Get one addressType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public AddressTypeDTO findOne(Long id) {
        log.debug("Request to get AddressType : {}", id);
        AddressType addressType = addressTypeRepository.findOne(id);
        return addressTypeMapper.toDto(addressType);
    }

    /**
     * Delete the addressType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AddressType : {}", id);
        addressTypeRepository.delete(id);
    }
}
