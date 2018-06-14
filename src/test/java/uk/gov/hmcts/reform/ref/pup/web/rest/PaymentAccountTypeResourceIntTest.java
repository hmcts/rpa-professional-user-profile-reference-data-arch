package uk.gov.hmcts.reform.ref.pup.web.rest;

import uk.gov.hmcts.reform.ref.pup.ReferencedataApp;

import uk.gov.hmcts.reform.ref.pup.domain.PaymentAccountType;
import uk.gov.hmcts.reform.ref.pup.repository.PaymentAccountTypeRepository;
import uk.gov.hmcts.reform.ref.pup.service.PaymentAccountTypeService;
import uk.gov.hmcts.reform.ref.pup.service.dto.PaymentAccountTypeDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.PaymentAccountTypeMapper;
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
 * Test class for the PaymentAccountTypeResource REST controller.
 *
 * @see PaymentAccountTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReferencedataApp.class)
public class PaymentAccountTypeResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private PaymentAccountTypeRepository paymentAccountTypeRepository;

    @Autowired
    private PaymentAccountTypeMapper paymentAccountTypeMapper;

    @Autowired
    private PaymentAccountTypeService paymentAccountTypeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPaymentAccountTypeMockMvc;

    private PaymentAccountType paymentAccountType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PaymentAccountTypeResource paymentAccountTypeResource = new PaymentAccountTypeResource(paymentAccountTypeService);
        this.restPaymentAccountTypeMockMvc = MockMvcBuilders.standaloneSetup(paymentAccountTypeResource)
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
    public static PaymentAccountType createEntity(EntityManager em) {
        PaymentAccountType paymentAccountType = new PaymentAccountType()
            .name(DEFAULT_NAME);
        return paymentAccountType;
    }

    @Before
    public void initTest() {
        paymentAccountType = createEntity(em);
    }

    @Test
    @Transactional
    public void createPaymentAccountType() throws Exception {
        int databaseSizeBeforeCreate = paymentAccountTypeRepository.findAll().size();

        // Create the PaymentAccountType
        PaymentAccountTypeDTO paymentAccountTypeDTO = paymentAccountTypeMapper.toDto(paymentAccountType);
        restPaymentAccountTypeMockMvc.perform(post("/api/payment-account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the PaymentAccountType in the database
        List<PaymentAccountType> paymentAccountTypeList = paymentAccountTypeRepository.findAll();
        assertThat(paymentAccountTypeList).hasSize(databaseSizeBeforeCreate + 1);
        PaymentAccountType testPaymentAccountType = paymentAccountTypeList.get(paymentAccountTypeList.size() - 1);
        assertThat(testPaymentAccountType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createPaymentAccountTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = paymentAccountTypeRepository.findAll().size();

        // Create the PaymentAccountType with an existing ID
        paymentAccountType.setId(1L);
        PaymentAccountTypeDTO paymentAccountTypeDTO = paymentAccountTypeMapper.toDto(paymentAccountType);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPaymentAccountTypeMockMvc.perform(post("/api/payment-account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountTypeDTO)))
            .andExpect(status().isBadRequest());

        // Validate the PaymentAccountType in the database
        List<PaymentAccountType> paymentAccountTypeList = paymentAccountTypeRepository.findAll();
        assertThat(paymentAccountTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllPaymentAccountTypes() throws Exception {
        // Initialize the database
        paymentAccountTypeRepository.saveAndFlush(paymentAccountType);

        // Get all the paymentAccountTypeList
        restPaymentAccountTypeMockMvc.perform(get("/api/payment-account-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(paymentAccountType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())));
    }

    @Test
    @Transactional
    public void getPaymentAccountType() throws Exception {
        // Initialize the database
        paymentAccountTypeRepository.saveAndFlush(paymentAccountType);

        // Get the paymentAccountType
        restPaymentAccountTypeMockMvc.perform(get("/api/payment-account-types/{id}", paymentAccountType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(paymentAccountType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPaymentAccountType() throws Exception {
        // Get the paymentAccountType
        restPaymentAccountTypeMockMvc.perform(get("/api/payment-account-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePaymentAccountType() throws Exception {
        // Initialize the database
        paymentAccountTypeRepository.saveAndFlush(paymentAccountType);
        int databaseSizeBeforeUpdate = paymentAccountTypeRepository.findAll().size();

        // Update the paymentAccountType
        PaymentAccountType updatedPaymentAccountType = paymentAccountTypeRepository.findOne(paymentAccountType.getId());
        // Disconnect from session so that the updates on updatedPaymentAccountType are not directly saved in db
        em.detach(updatedPaymentAccountType);
        updatedPaymentAccountType
            .name(UPDATED_NAME);
        PaymentAccountTypeDTO paymentAccountTypeDTO = paymentAccountTypeMapper.toDto(updatedPaymentAccountType);

        restPaymentAccountTypeMockMvc.perform(put("/api/payment-account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountTypeDTO)))
            .andExpect(status().isOk());

        // Validate the PaymentAccountType in the database
        List<PaymentAccountType> paymentAccountTypeList = paymentAccountTypeRepository.findAll();
        assertThat(paymentAccountTypeList).hasSize(databaseSizeBeforeUpdate);
        PaymentAccountType testPaymentAccountType = paymentAccountTypeList.get(paymentAccountTypeList.size() - 1);
        assertThat(testPaymentAccountType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingPaymentAccountType() throws Exception {
        int databaseSizeBeforeUpdate = paymentAccountTypeRepository.findAll().size();

        // Create the PaymentAccountType
        PaymentAccountTypeDTO paymentAccountTypeDTO = paymentAccountTypeMapper.toDto(paymentAccountType);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPaymentAccountTypeMockMvc.perform(put("/api/payment-account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(paymentAccountTypeDTO)))
            .andExpect(status().isCreated());

        // Validate the PaymentAccountType in the database
        List<PaymentAccountType> paymentAccountTypeList = paymentAccountTypeRepository.findAll();
        assertThat(paymentAccountTypeList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePaymentAccountType() throws Exception {
        // Initialize the database
        paymentAccountTypeRepository.saveAndFlush(paymentAccountType);
        int databaseSizeBeforeDelete = paymentAccountTypeRepository.findAll().size();

        // Get the paymentAccountType
        restPaymentAccountTypeMockMvc.perform(delete("/api/payment-account-types/{id}", paymentAccountType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PaymentAccountType> paymentAccountTypeList = paymentAccountTypeRepository.findAll();
        assertThat(paymentAccountTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentAccountType.class);
        PaymentAccountType paymentAccountType1 = new PaymentAccountType();
        paymentAccountType1.setId(1L);
        PaymentAccountType paymentAccountType2 = new PaymentAccountType();
        paymentAccountType2.setId(paymentAccountType1.getId());
        assertThat(paymentAccountType1).isEqualTo(paymentAccountType2);
        paymentAccountType2.setId(2L);
        assertThat(paymentAccountType1).isNotEqualTo(paymentAccountType2);
        paymentAccountType1.setId(null);
        assertThat(paymentAccountType1).isNotEqualTo(paymentAccountType2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentAccountTypeDTO.class);
        PaymentAccountTypeDTO paymentAccountTypeDTO1 = new PaymentAccountTypeDTO();
        paymentAccountTypeDTO1.setId(1L);
        PaymentAccountTypeDTO paymentAccountTypeDTO2 = new PaymentAccountTypeDTO();
        assertThat(paymentAccountTypeDTO1).isNotEqualTo(paymentAccountTypeDTO2);
        paymentAccountTypeDTO2.setId(paymentAccountTypeDTO1.getId());
        assertThat(paymentAccountTypeDTO1).isEqualTo(paymentAccountTypeDTO2);
        paymentAccountTypeDTO2.setId(2L);
        assertThat(paymentAccountTypeDTO1).isNotEqualTo(paymentAccountTypeDTO2);
        paymentAccountTypeDTO1.setId(null);
        assertThat(paymentAccountTypeDTO1).isNotEqualTo(paymentAccountTypeDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(paymentAccountTypeMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(paymentAccountTypeMapper.fromId(null)).isNull();
    }
}
