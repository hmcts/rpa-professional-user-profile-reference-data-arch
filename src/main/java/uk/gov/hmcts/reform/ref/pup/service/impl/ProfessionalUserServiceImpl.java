package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserService;
import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUser;
import uk.gov.hmcts.reform.ref.pup.repository.ProfessionalUserRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.ProfessionalUserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProfessionalUser.
 */
@Service
@Transactional
public class ProfessionalUserServiceImpl implements ProfessionalUserService {

    private final Logger log = LoggerFactory.getLogger(ProfessionalUserServiceImpl.class);

    private final ProfessionalUserRepository professionalUserRepository;

    private final ProfessionalUserMapper professionalUserMapper;

    public ProfessionalUserServiceImpl(ProfessionalUserRepository professionalUserRepository, ProfessionalUserMapper professionalUserMapper) {
        this.professionalUserRepository = professionalUserRepository;
        this.professionalUserMapper = professionalUserMapper;
    }

    /**
     * Save a professionalUser.
     *
     * @param professionalUserDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProfessionalUserDTO save(ProfessionalUserDTO professionalUserDTO) {
        log.debug("Request to save ProfessionalUser : {}", professionalUserDTO);
        ProfessionalUser professionalUser = professionalUserMapper.toEntity(professionalUserDTO);
        professionalUser = professionalUserRepository.save(professionalUser);
        return professionalUserMapper.toDto(professionalUser);
    }

    /**
     * Get all the professionalUsers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProfessionalUserDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProfessionalUsers");
        return professionalUserRepository.findAll(pageable)
            .map(professionalUserMapper::toDto);
    }

    /**
     * Get one professionalUser by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProfessionalUserDTO findOne(Long id) {
        log.debug("Request to get ProfessionalUser : {}", id);
        ProfessionalUser professionalUser = professionalUserRepository.findOne(id);
        return professionalUserMapper.toDto(professionalUser);
    }

    /**
     * Delete the professionalUser by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProfessionalUser : {}", id);
        professionalUserRepository.delete(id);
    }
}
