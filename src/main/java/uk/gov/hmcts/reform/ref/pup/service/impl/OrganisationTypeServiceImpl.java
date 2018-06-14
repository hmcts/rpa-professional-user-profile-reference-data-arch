package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.OrganisationTypeService;
import uk.gov.hmcts.reform.ref.pup.domain.OrganisationType;
import uk.gov.hmcts.reform.ref.pup.repository.OrganisationTypeRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.OrganisationTypeDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.OrganisationTypeMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing OrganisationType.
 */
@Service
@Transactional
public class OrganisationTypeServiceImpl implements OrganisationTypeService {

    private final Logger log = LoggerFactory.getLogger(OrganisationTypeServiceImpl.class);

    private final OrganisationTypeRepository organisationTypeRepository;

    private final OrganisationTypeMapper organisationTypeMapper;

    public OrganisationTypeServiceImpl(OrganisationTypeRepository organisationTypeRepository, OrganisationTypeMapper organisationTypeMapper) {
        this.organisationTypeRepository = organisationTypeRepository;
        this.organisationTypeMapper = organisationTypeMapper;
    }

    /**
     * Save a organisationType.
     *
     * @param organisationTypeDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public OrganisationTypeDTO save(OrganisationTypeDTO organisationTypeDTO) {
        log.debug("Request to save OrganisationType : {}", organisationTypeDTO);
        OrganisationType organisationType = organisationTypeMapper.toEntity(organisationTypeDTO);
        organisationType = organisationTypeRepository.save(organisationType);
        return organisationTypeMapper.toDto(organisationType);
    }

    /**
     * Get all the organisationTypes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<OrganisationTypeDTO> findAll(Pageable pageable) {
        log.debug("Request to get all OrganisationTypes");
        return organisationTypeRepository.findAll(pageable)
            .map(organisationTypeMapper::toDto);
    }

    /**
     * Get one organisationType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public OrganisationTypeDTO findOne(Long id) {
        log.debug("Request to get OrganisationType : {}", id);
        OrganisationType organisationType = organisationTypeRepository.findOne(id);
        return organisationTypeMapper.toDto(organisationType);
    }

    /**
     * Delete the organisationType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete OrganisationType : {}", id);
        organisationTypeRepository.delete(id);
    }
}
