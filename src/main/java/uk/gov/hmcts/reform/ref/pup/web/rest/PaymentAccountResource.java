package uk.gov.hmcts.reform.ref.pup.web.rest;

import com.codahale.metrics.annotation.Timed;
import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountService;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.BadRequestAlertException;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.HeaderUtil;
import uk.gov.hmcts.reform.ref.pup.web.rest.util.PaginationUtil;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountDTO;
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
 * REST controller for managing PaymentAccount.
 */
@RestController
@RequestMapping("/api")
public class PaymentAccountResource {

    private final Logger log = LoggerFactory.getLogger(PaymentAccountResource.class);

    private static final String ENTITY_NAME = "paymentAccount";

    private final PaymentAccountService paymentAccountService;

    public PaymentAccountResource(PaymentAccountService paymentAccountService) {
        this.paymentAccountService = paymentAccountService;
    }

    /**
     * POST  /payment-accounts : Create a new paymentAccount.
     *
     * @param paymentAccountDTO the paymentAccountDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new paymentAccountDTO, or with status 400 (Bad Request) if the paymentAccount has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/payment-accounts")
    @Timed
    public ResponseEntity<PaymentAccountDTO> createPaymentAccount(@Valid @RequestBody PaymentAccountDTO paymentAccountDTO) throws URISyntaxException {
        log.debug("REST request to save PaymentAccount : {}", paymentAccountDTO);
        if (paymentAccountDTO.getId() != null) {
            throw new BadRequestAlertException("A new paymentAccount cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PaymentAccountDTO result = paymentAccountService.save(paymentAccountDTO);
        return ResponseEntity.created(new URI("/api/payment-accounts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /payment-accounts : Updates an existing paymentAccount.
     *
     * @param paymentAccountDTO the paymentAccountDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated paymentAccountDTO,
     * or with status 400 (Bad Request) if the paymentAccountDTO is not valid,
     * or with status 500 (Internal Server Error) if the paymentAccountDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/payment-accounts")
    @Timed
    public ResponseEntity<PaymentAccountDTO> updatePaymentAccount(@Valid @RequestBody PaymentAccountDTO paymentAccountDTO) throws URISyntaxException {
        log.debug("REST request to update PaymentAccount : {}", paymentAccountDTO);
        if (paymentAccountDTO.getId() == null) {
            return createPaymentAccount(paymentAccountDTO);
        }
        PaymentAccountDTO result = paymentAccountService.save(paymentAccountDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, paymentAccountDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /payment-accounts : get all the paymentAccounts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of paymentAccounts in body
     */
    @GetMapping("/payment-accounts")
    @Timed
    public ResponseEntity<List<PaymentAccountDTO>> getAllPaymentAccounts(Pageable pageable) {
        log.debug("REST request to get a page of PaymentAccounts");
        Page<PaymentAccountDTO> page = paymentAccountService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/payment-accounts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /payment-accounts/:id : get the "id" paymentAccount.
     *
     * @param id the id of the paymentAccountDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the paymentAccountDTO, or with status 404 (Not Found)
     */
    @GetMapping("/payment-accounts/{id}")
    @Timed
    public ResponseEntity<PaymentAccountDTO> getPaymentAccount(@PathVariable Long id) {
        log.debug("REST request to get PaymentAccount : {}", id);
        PaymentAccountDTO paymentAccountDTO = paymentAccountService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(paymentAccountDTO));
    }

    /**
     * DELETE  /payment-accounts/:id : delete the "id" paymentAccount.
     *
     * @param id the id of the paymentAccountDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/payment-accounts/{id}")
    @Timed
    public ResponseEntity<Void> deletePaymentAccount(@PathVariable Long id) {
        log.debug("REST request to delete PaymentAccount : {}", id);
        paymentAccountService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
