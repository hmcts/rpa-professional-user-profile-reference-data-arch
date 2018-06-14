package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.AddressTypeService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.AddressTypeDTO;
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
 * REST controller for managing AddressType.
 */
@RestController
@RequestMapping("/api")
public class AddressTypeResource {

    private final Logger log = LoggerFactory.getLogger(AddressTypeResource.class);

    private static final String ENTITY_NAME = "addressType";

    private final AddressTypeService addressTypeService;

    public AddressTypeResource(AddressTypeService addressTypeService) {
        this.addressTypeService = addressTypeService;
    }

    /**
     * POST  /address-types : Create a new addressType.
     *
     * @param addressTypeDTO the addressTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressTypeDTO, or with status 400 (Bad Request) if the addressType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-types")
    @Timed
    public ResponseEntity<AddressTypeDTO> createAddressType(@RequestBody AddressTypeDTO addressTypeDTO) throws URISyntaxException {
        log.debug("REST request to save AddressType : {}", addressTypeDTO);
        if (addressTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new addressType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressTypeDTO result = addressTypeService.save(addressTypeDTO);
        return ResponseEntity.created(new URI("/api/address-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-types : Updates an existing addressType.
     *
     * @param addressTypeDTO the addressTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressTypeDTO,
     * or with status 400 (Bad Request) if the addressTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the addressTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-types")
    @Timed
    public ResponseEntity<AddressTypeDTO> updateAddressType(@RequestBody AddressTypeDTO addressTypeDTO) throws URISyntaxException {
        log.debug("REST request to update AddressType : {}", addressTypeDTO);
        if (addressTypeDTO.getId() == null) {
            return createAddressType(addressTypeDTO);
        }
        AddressTypeDTO result = addressTypeService.save(addressTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-types : get all the addressTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of addressTypes in body
     */
    @GetMapping("/address-types")
    @Timed
    public ResponseEntity<List<AddressTypeDTO>> getAllAddressTypes(Pageable pageable) {
        log.debug("REST request to get a page of AddressTypes");
        Page<AddressTypeDTO> page = addressTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/address-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /address-types/:id : get the "id" addressType.
     *
     * @param id the id of the addressTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/address-types/{id}")
    @Timed
    public ResponseEntity<AddressTypeDTO> getAddressType(@PathVariable Long id) {
        log.debug("REST request to get AddressType : {}", id);
        AddressTypeDTO addressTypeDTO = addressTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(addressTypeDTO));
    }

    /**
     * DELETE  /address-types/:id : delete the "id" addressType.
     *
     * @param id the id of the addressTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressType(@PathVariable Long id) {
        log.debug("REST request to delete AddressType : {}", id);
        addressTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
