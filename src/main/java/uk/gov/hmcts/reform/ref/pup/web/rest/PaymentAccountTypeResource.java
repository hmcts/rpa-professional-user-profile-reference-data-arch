package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountTypeService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountTypeDTO;
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
 * REST controller for managing PaymentAccountType.
 */
@RestController
@RequestMapping("/api")
public class PaymentAccountTypeResource {

    private final Logger log = LoggerFactory.getLogger(PaymentAccountTypeResource.class);

    private static final String ENTITY_NAME = "paymentAccountType";

    private final PaymentAccountTypeService paymentAccountTypeService;

    public PaymentAccountTypeResource(PaymentAccountTypeService paymentAccountTypeService) {
        this.paymentAccountTypeService = paymentAccountTypeService;
    }

    /**
     * POST  /payment-account-types : Create a new paymentAccountType.
     *
     * @param paymentAccountTypeDTO the paymentAccountTypeDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paymentAccountTypeDTO, or with status 400 (Bad Request) if the paymentAccountType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payment-account-types")
    @Timed
    public ResponseEntity<PaymentAccountTypeDTO> createPaymentAccountType(@RequestBody PaymentAccountTypeDTO paymentAccountTypeDTO) throws URISyntaxException {
        log.debug("REST request to save PaymentAccountType : {}", paymentAccountTypeDTO);
        if (paymentAccountTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new paymentAccountType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentAccountTypeDTO result = paymentAccountTypeService.save(paymentAccountTypeDTO);
        return ResponseEntity.created(new URI("/api/payment-account-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payment-account-types : Updates an existing paymentAccountType.
     *
     * @param paymentAccountTypeDTO the paymentAccountTypeDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentAccountTypeDTO,
     * or with status 400 (Bad Request) if the paymentAccountTypeDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentAccountTypeDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payment-account-types")
    @Timed
    public ResponseEntity<PaymentAccountTypeDTO> updatePaymentAccountType(@RequestBody PaymentAccountTypeDTO paymentAccountTypeDTO) throws URISyntaxException {
        log.debug("REST request to update PaymentAccountType : {}", paymentAccountTypeDTO);
        if (paymentAccountTypeDTO.getId() == null) {
            return createPaymentAccountType(paymentAccountTypeDTO);
        }
        PaymentAccountTypeDTO result = paymentAccountTypeService.save(paymentAccountTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentAccountTypeDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payment-account-types : get all the paymentAccountTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of paymentAccountTypes in body
     */
    @GetMapping("/payment-account-types")
    @Timed
    public ResponseEntity<List<PaymentAccountTypeDTO>> getAllPaymentAccountTypes(Pageable pageable) {
        log.debug("REST request to get a page of PaymentAccountTypes");
        Page<PaymentAccountTypeDTO> page = paymentAccountTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payment-account-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /payment-account-types/:id : get the "id" paymentAccountType.
     *
     * @param id the id of the paymentAccountTypeDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentAccountTypeDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payment-account-types/{id}")
    @Timed
    public ResponseEntity<PaymentAccountTypeDTO> getPaymentAccountType(@PathVariable Long id) {
        log.debug("REST request to get PaymentAccountType : {}", id);
        PaymentAccountTypeDTO paymentAccountTypeDTO = paymentAccountTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(paymentAccountTypeDTO));
    }

    /**
     * DELETE  /payment-account-types/:id : delete the "id" paymentAccountType.
     *
     * @param id the id of the paymentAccountTypeDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payment-account-types/{id}")
    @Timed
    public ResponseEntity<Void> deletePaymentAccountType(@PathVariable Long id) {
        log.debug("REST request to delete PaymentAccountType : {}", id);
        paymentAccountTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
