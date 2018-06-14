package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ProfessionalUser.
 */
@RestController
@RequestMapping("/api")
public class ProfessionalUserResource {

    private final Logger log = LoggerFactory.getLogger(ProfessionalUserResource.class);

    private static final String ENTITY_NAME = "professionalUser";

    private final ProfessionalUserService professionalUserService;

    public ProfessionalUserResource(ProfessionalUserService professionalUserService) {
        this.professionalUserService = professionalUserService;
    }

    /**
     * POST  /professional-users : Create a new professionalUser.
     *
     * @param professionalUserDTO the professionalUserDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new professionalUserDTO, or with status 400 (Bad Request) if the professionalUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/professional-users")
    @Timed
    public ResponseEntity<ProfessionalUserDTO> createProfessionalUser(@Valid @RequestBody ProfessionalUserDTO professionalUserDTO) throws URISyntaxException {
        log.debug("REST request to save ProfessionalUser : {}", professionalUserDTO);
        if (professionalUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new professionalUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfessionalUserDTO result = professionalUserService.save(professionalUserDTO);
        return ResponseEntity.created(new URI("/api/professional-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /professional-users : Updates an existing professionalUser.
     *
     * @param professionalUserDTO the professionalUserDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated professionalUserDTO,
     * or with status 400 (Bad Request) if the professionalUserDTO is not valid,
     * or with status 500 (Internal Server Error) if the professionalUserDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/professional-users")
    @Timed
    public ResponseEntity<ProfessionalUserDTO> updateProfessionalUser(@Valid @RequestBody ProfessionalUserDTO professionalUserDTO) throws URISyntaxException {
        log.debug("REST request to update ProfessionalUser : {}", professionalUserDTO);
        if (professionalUserDTO.getId() == null) {
            return createProfessionalUser(professionalUserDTO);
        }
        ProfessionalUserDTO result = professionalUserService.save(professionalUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, professionalUserDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /professional-users : get all the professionalUsers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of professionalUsers in body
     */
    @GetMapping("/professional-users")
    @Timed
    public ResponseEntity<List<ProfessionalUserDTO>> getAllProfessionalUsers(Pageable pageable) {
        log.debug("REST request to get a page of ProfessionalUsers");
        Page<ProfessionalUserDTO> page = professionalUserService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/professional-users");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /professional-users/:id : get the "id" professionalUser.
     *
     * @param id the id of the professionalUserDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the professionalUserDTO, or with status 404 (Not Found)
     */
    @GetMapping("/professional-users/{id}")
    @Timed
    public ResponseEntity<ProfessionalUserDTO> getProfessionalUser(@PathVariable Long id) {
        log.debug("REST request to get ProfessionalUser : {}", id);
        ProfessionalUserDTO professionalUserDTO = professionalUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(professionalUserDTO));
    }

    /**
     * DELETE  /professional-users/:id : delete the "id" professionalUser.
     *
     * @param id the id of the professionalUserDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/professional-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteProfessionalUser(@PathVariable Long id) {
        log.debug("REST request to delete ProfessionalUser : {}", id);
        professionalUserService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
