package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserAccountAssignmentService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserAccountAssignmentDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProfessionalUserAccountAssignment.
 */
@RestController
@RequestMapping("/api")
public class ProfessionalUserAccountAssignmentResource {

    private final Logger log = LoggerFactory.getLogger(ProfessionalUserAccountAssignmentResource.class);

    private static final String ENTITY_NAME = "professionalUserAccountAssignment";

    private final ProfessionalUserAccountAssignmentService professionalUserAccountAssignmentService;

    public ProfessionalUserAccountAssignmentResource(ProfessionalUserAccountAssignmentService professionalUserAccountAssignmentService) {
        this.professionalUserAccountAssignmentService = professionalUserAccountAssignmentService;
    }

    /**
     * POST  /professional-user-account-assignments : Create a new professionalUserAccountAssignment.
     *
     * @param professionalUserAccountAssignmentDTO the professionalUserAccountAssignmentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new professionalUserAccountAssignmentDTO, or with status 400 (Bad Request) if the professionalUserAccountAssignment has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/professional-user-account-assignments")
    @Timed
    public ResponseEntity<ProfessionalUserAccountAssignmentDTO> createProfessionalUserAccountAssignment(@RequestBody ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO) throws URISyntaxException {
        log.debug("REST request to save ProfessionalUserAccountAssignment : {}", professionalUserAccountAssignmentDTO);
        if (professionalUserAccountAssignmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new professionalUserAccountAssignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfessionalUserAccountAssignmentDTO result = professionalUserAccountAssignmentService.save(professionalUserAccountAssignmentDTO);
        return ResponseEntity.created(new URI("/api/professional-user-account-assignments/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /professional-user-account-assignments : Updates an existing professionalUserAccountAssignment.
     *
     * @param professionalUserAccountAssignmentDTO the professionalUserAccountAssignmentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated professionalUserAccountAssignmentDTO,
     * or with status 400 (Bad Request) if the professionalUserAccountAssignmentDTO is not valid,
     * or with status 500 (Internal Server Error) if the professionalUserAccountAssignmentDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/professional-user-account-assignments")
    @Timed
    public ResponseEntity<ProfessionalUserAccountAssignmentDTO> updateProfessionalUserAccountAssignment(@RequestBody ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO) throws URISyntaxException {
        log.debug("REST request to update ProfessionalUserAccountAssignment : {}", professionalUserAccountAssignmentDTO);
        if (professionalUserAccountAssignmentDTO.getId() == null) {
            return createProfessionalUserAccountAssignment(professionalUserAccountAssignmentDTO);
        }
        ProfessionalUserAccountAssignmentDTO result = professionalUserAccountAssignmentService.save(professionalUserAccountAssignmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, professionalUserAccountAssignmentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /professional-user-account-assignments : get all the professionalUserAccountAssignments.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of professionalUserAccountAssignments in body
     */
    @GetMapping("/professional-user-account-assignments")
    @Timed
    public ResponseEntity<List<ProfessionalUserAccountAssignmentDTO>> getAllProfessionalUserAccountAssignments(Pageable pageable) {
        log.debug("REST request to get a page of ProfessionalUserAccountAssignments");
        Page<ProfessionalUserAccountAssignmentDTO> page = professionalUserAccountAssignmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/professional-user-account-assignments");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /professional-user-account-assignments/:id : get the "id" professionalUserAccountAssignment.
     *
     * @param id the id of the professionalUserAccountAssignmentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the professionalUserAccountAssignmentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/professional-user-account-assignments/{id}")
    @Timed
    public ResponseEntity<ProfessionalUserAccountAssignmentDTO> getProfessionalUserAccountAssignment(@PathVariable Long id) {
        log.debug("REST request to get ProfessionalUserAccountAssignment : {}", id);
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = professionalUserAccountAssignmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(professionalUserAccountAssignmentDTO));
    }

    /**
     * DELETE  /professional-user-account-assignments/:id : delete the "id" professionalUserAccountAssignment.
     *
     * @param id the id of the professionalUserAccountAssignmentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/professional-user-account-assignments/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfessionalUserAccountAssignment(@PathVariable Long id) {
        log.debug("REST request to delete ProfessionalUserAccountAssignment : {}", id);
        professionalUserAccountAssignmentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
