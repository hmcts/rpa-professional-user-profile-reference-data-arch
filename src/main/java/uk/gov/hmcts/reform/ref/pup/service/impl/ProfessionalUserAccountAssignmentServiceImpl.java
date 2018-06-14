package uk.gov.hmcts.reform.ref.pup.service.impl;

import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserAccountAssignmentService;
import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUserAccountAssignment;
import uk.gov.hmcts.reform.ref.pup.repository.ProfessionalUserAccountAssignmentRepository;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserAccountAssignmentDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.ProfessionalUserAccountAssignmentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * Service Implementation for managing ProfessionalUserAccountAssignment.
 */
@Service
@Transactional
public class ProfessionalUserAccountAssignmentServiceImpl implements ProfessionalUserAccountAssignmentService {

    private final Logger log = LoggerFactory.getLogger(ProfessionalUserAccountAssignmentServiceImpl.class);

    private final ProfessionalUserAccountAssignmentRepository professionalUserAccountAssignmentRepository;

    private final ProfessionalUserAccountAssignmentMapper professionalUserAccountAssignmentMapper;

    public ProfessionalUserAccountAssignmentServiceImpl(ProfessionalUserAccountAssignmentRepository professionalUserAccountAssignmentRepository, ProfessionalUserAccountAssignmentMapper professionalUserAccountAssignmentMapper) {
        this.professionalUserAccountAssignmentRepository = professionalUserAccountAssignmentRepository;
        this.professionalUserAccountAssignmentMapper = professionalUserAccountAssignmentMapper;
    }

    /**
     * Save a professionalUserAccountAssignment.
     *
     * @param professionalUserAccountAssignmentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ProfessionalUserAccountAssignmentDTO save(ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO) {
        log.debug("Request to save ProfessionalUserAccountAssignment : {}", professionalUserAccountAssignmentDTO);
        ProfessionalUserAccountAssignment professionalUserAccountAssignment = professionalUserAccountAssignmentMapper.toEntity(professionalUserAccountAssignmentDTO);
        professionalUserAccountAssignment = professionalUserAccountAssignmentRepository.save(professionalUserAccountAssignment);
        return professionalUserAccountAssignmentMapper.toDto(professionalUserAccountAssignment);
    }

    /**
     * Get all the professionalUserAccountAssignments.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ProfessionalUserAccountAssignmentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProfessionalUserAccountAssignments");
        return professionalUserAccountAssignmentRepository.findAll(pageable)
            .map(professionalUserAccountAssignmentMapper::toDto);
    }

    /**
     * Get one professionalUserAccountAssignment by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ProfessionalUserAccountAssignmentDTO findOne(Long id) {
        log.debug("Request to get ProfessionalUserAccountAssignment : {}", id);
        ProfessionalUserAccountAssignment professionalUserAccountAssignment = professionalUserAccountAssignmentRepository.findOne(id);
        return professionalUserAccountAssignmentMapper.toDto(professionalUserAccountAssignment);
    }

    /**
     * Delete the professionalUserAccountAssignment by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProfessionalUserAccountAssignment : {}", id);
        professionalUserAccountAssignmentRepository.delete(id);
    }
}
