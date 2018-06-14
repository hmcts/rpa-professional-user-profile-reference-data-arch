package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.OrganisationTypeService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.OrganisationTypeDTO;
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
 * REST controller for managing OrganisationType.
 */
@RestController
@RequestMapping("/api")
public class OrganisationTypeResource {

    private final Logger log = LoggerFactory.getLogger(OrganisationTypeResource.class);

    private static final String ENTITY_NAME = "organisationType";

    private final OrganisationTypeService organisationTypeService;

    public OrganisationTypeResource(OrganisationTypeService organisationTypeService) {
        this.organisationTypeService = organisationTypeService;
    }

    /**
     * POST  /organisation-types : Create a new organisationType.
     *
     * @param organisationTypeDTO the organisationTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new organisationTypeDTO, or with status 400 (Bad Request) if the organisationType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/organisation-types")
    @Timed
    public ResponseEntity<OrganisationTypeDTO> createOrganisationType(@RequestBody OrganisationTypeDTO organisationTypeDTO) throws URISyntaxException {
        log.debug("REST request to save OrganisationType : {}", organisationTypeDTO);
        if (organisationTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new organisationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrganisationTypeDTO result = organisationTypeService.save(organisationTypeDTO);
        return ResponseEntity.created(new URI("/api/organisation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /organisation-types : Updates an existing organisationType.
     *
     * @param organisationTypeDTO the organisationTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated organisationTypeDTO,
     * or with status 400 (Bad Request) if the organisationTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the organisationTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/organisation-types")
    @Timed
    public ResponseEntity<OrganisationTypeDTO> updateOrganisationType(@RequestBody OrganisationTypeDTO organisationTypeDTO) throws URISyntaxException {
        log.debug("REST request to update OrganisationType : {}", organisationTypeDTO);
        if (organisationTypeDTO.getId() == null) {
            return createOrganisationType(organisationTypeDTO);
        }
        OrganisationTypeDTO result = organisationTypeService.save(organisationTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, organisationTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /organisation-types : get all the organisationTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of organisationTypes in body
     */
    @GetMapping("/organisation-types")
    @Timed
    public ResponseEntity<List<OrganisationTypeDTO>> getAllOrganisationTypes(Pageable pageable) {
        log.debug("REST request to get a page of OrganisationTypes");
        Page<OrganisationTypeDTO> page = organisationTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/organisation-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /organisation-types/:id : get the "id" organisationType.
     *
     * @param id the id of the organisationTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the organisationTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/organisation-types/{id}")
    @Timed
    public ResponseEntity<OrganisationTypeDTO> getOrganisationType(@PathVariable Long id) {
        log.debug("REST request to get OrganisationType : {}", id);
        OrganisationTypeDTO organisationTypeDTO = organisationTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(organisationTypeDTO));
    }

    /**
     * DELETE  /organisation-types/:id : delete the "id" organisationType.
     *
     * @param id the id of the organisationTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/organisation-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteOrganisationType(@PathVariable Long id) {
        log.debug("REST request to delete OrganisationType : {}", id);
        organisationTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
