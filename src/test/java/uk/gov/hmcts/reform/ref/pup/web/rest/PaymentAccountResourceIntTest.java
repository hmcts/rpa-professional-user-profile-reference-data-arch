package uk.gov.hmcts.reform.ref.pup.web.rest;

import uk.gov.hmcts.reform.ref.pup.ReferencedataApp;

import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccount;
import uk.gov.hmcts.reform.ref.pup.repository.PaymentAccountRepository;
import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountService;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.PaymentAccountMapper;
import uk.gov.hmcts.reform.ref.pup.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static uk.gov.hmcts.reform.ref.pup.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PaymentAccountResource REST controller.
 *
 * @see PaymentAccountResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReferencedataApp.class)
public class PaymentAccountResourceIntTest {

    private static final String DEFAULT_PBA_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PBA_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PaymentAccountRepository paymentAccountRepository;

    @Autowired
    private PaymentAccountMapper paymentAccountMapper;

    @Autowired
    private PaymentAccountService paymentAccountService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPaymentAccountMockMvc;

    private PaymentAccount paymentAccount;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaymentAccountResource paymentAccountResource = new PaymentAccountResource(paymentAccountService);
        this.restPaymentAccountMockMvc = MockMvcBuilders.standaloneSetup(paymentAccountResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PaymentAccount createEntity(EntityManager em) {
        PaymentAccount paymentAccount = new PaymentAccount()
            .pbaNumber(DEFAULT_PBA_NUMBER);
        return paymentAccount;
    }

    @Before
    public void initTest() {
        paymentAccount = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentAccount() throws Exception {
        int databaseSizeBeforeCreate = paymentAccountRepository.findAll().size();

        // Create the PaymentAccount
        PaymentAccountDTO paymentAccountDTO = paymentAccountMapper.toDto(paymentAccount);
        restPaymentAccountMockMvc.perform(post("/api/payment-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountDTO)))
            .andExpect(status().isCreated());

        // Validate the PaymentAccount in the database
        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentAccount testPaymentAccount = paymentAccountList.get(paymentAccountList.size() - 1);
        assertThat(testPaymentAccount.getPbaNumber()).isEqualTo(DEFAULT_PBA_NUMBER);
    }

    @Test
    @Transactional
    public void createPaymentAccountWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentAccountRepository.findAll().size();

        // Create the PaymentAccount with an existing ID
        paymentAccount.setId(1L);
        PaymentAccountDTO paymentAccountDTO = paymentAccountMapper.toDto(paymentAccount);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentAccountMockMvc.perform(post("/api/payment-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentAccount in the database
        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPbaNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = paymentAccountRepository.findAll().size();
        // set the field null
        paymentAccount.setPbaNumber(null);

        // Create the PaymentAccount, which fails.
        PaymentAccountDTO paymentAccountDTO = paymentAccountMapper.toDto(paymentAccount);

        restPaymentAccountMockMvc.perform(post("/api/payment-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountDTO)))
            .andExpect(status().isBadRequest());

        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPaymentAccounts() throws Exception {
        // Initialize the database
        paymentAccountRepository.saveAndFlush(paymentAccount);

        // Get all the paymentAccountList
        restPaymentAccountMockMvc.perform(get("/api/payment-accounts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentAccount.getId().intValue())))
            .andExpect(jsonPath("$.[*].pbaNumber").value(hasItem(DEFAULT_PBA_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getPaymentAccount() throws Exception {
        // Initialize the database
        paymentAccountRepository.saveAndFlush(paymentAccount);

        // Get the paymentAccount
        restPaymentAccountMockMvc.perform(get("/api/payment-accounts/{id}", paymentAccount.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paymentAccount.getId().intValue()))
            .andExpect(jsonPath("$.pbaNumber").value(DEFAULT_PBA_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPaymentAccount() throws Exception {
        // Get the paymentAccount
        restPaymentAccountMockMvc.perform(get("/api/payment-accounts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentAccount() throws Exception {
        // Initialize the database
        paymentAccountRepository.saveAndFlush(paymentAccount);
        int databaseSizeBeforeUpdate = paymentAccountRepository.findAll().size();

        // Update the paymentAccount
        PaymentAccount updatedPaymentAccount = paymentAccountRepository.findOne(paymentAccount.getId());
        // Disconnect from session so that the updates on updatedPaymentAccount are not directly saved in db
        em.detach(updatedPaymentAccount);
        updatedPaymentAccount
            .pbaNumber(UPDATED_PBA_NUMBER);
        PaymentAccountDTO paymentAccountDTO = paymentAccountMapper.toDto(updatedPaymentAccount);

        restPaymentAccountMockMvc.perform(put("/api/payment-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountDTO)))
            .andExpect(status().isOk());

        // Validate the PaymentAccount in the database
        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeUpdate);
        PaymentAccount testPaymentAccount = paymentAccountList.get(paymentAccountList.size() - 1);
        assertThat(testPaymentAccount.getPbaNumber()).isEqualTo(UPDATED_PBA_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentAccount() throws Exception {
        int databaseSizeBeforeUpdate = paymentAccountRepository.findAll().size();

        // Create the PaymentAccount
        PaymentAccountDTO paymentAccountDTO = paymentAccountMapper.toDto(paymentAccount);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPaymentAccountMockMvc.perform(put("/api/payment-accounts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountDTO)))
            .andExpect(status().isCreated());

        // Validate the PaymentAccount in the database
        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePaymentAccount() throws Exception {
        // Initialize the database
        paymentAccountRepository.saveAndFlush(paymentAccount);
        int databaseSizeBeforeDelete = paymentAccountRepository.findAll().size();

        // Get the paymentAccount
        restPaymentAccountMockMvc.perform(delete("/api/payment-accounts/{id}", paymentAccount.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PaymentAccount> paymentAccountList = paymentAccountRepository.findAll();
        assertThat(paymentAccountList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentAccount.class);
        PaymentAccount paymentAccount1 = new PaymentAccount();
        paymentAccount1.setId(1L);
        PaymentAccount paymentAccount2 = new PaymentAccount();
        paymentAccount2.setId(paymentAccount1.getId());
        assertThat(paymentAccount1).isEqualTo(paymentAccount2);
        paymentAccount2.setId(2L);
        assertThat(paymentAccount1).isNotEqualTo(paymentAccount2);
        paymentAccount1.setId(null);
        assertThat(paymentAccount1).isNotEqualTo(paymentAccount2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentAccountDTO.class);
        PaymentAccountDTO paymentAccountDTO1 = new PaymentAccountDTO();
        paymentAccountDTO1.setId(1L);
        PaymentAccountDTO paymentAccountDTO2 = new PaymentAccountDTO();
        assertThat(paymentAccountDTO1).isNotEqualTo(paymentAccountDTO2);
        paymentAccountDTO2.setId(paymentAccountDTO1.getId());
        assertThat(paymentAccountDTO1).isEqualTo(paymentAccountDTO2);
        paymentAccountDTO2.setId(2L);
        assertThat(paymentAccountDTO1).isNotEqualTo(paymentAccountDTO2);
        paymentAccountDTO1.setId(null);
        assertThat(paymentAccountDTO1).isNotEqualTo(paymentAccountDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(paymentAccountMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(paymentAccountMapper.fromId(null)).isNull();
    }
}
