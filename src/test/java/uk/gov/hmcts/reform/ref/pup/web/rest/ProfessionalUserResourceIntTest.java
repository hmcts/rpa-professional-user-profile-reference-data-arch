package uk.gov.hmcts.reform.ref.pup.web.rest;

import uk.gov.hmcts.reform.ref.pup.ReferencedataApp;

import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUser;
import uk.gov.hmcts.reform.ref.pup.repository.ProfessionalUserRepository;
import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserService;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.ProfessionalUserMapper;
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
 * Test class for the ProfessionalUserResource REST controller.
 *
 * @see ProfessionalUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReferencedataApp.class)
public class ProfessionalUserResourceIntTest {

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_FIRST_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FIRST_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PHONE_NUMBER = "BBBBBBBBBB";

    @Autowired
    private ProfessionalUserRepository professionalUserRepository;

    @Autowired
    private ProfessionalUserMapper professionalUserMapper;

    @Autowired
    private ProfessionalUserService professionalUserService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfessionalUserMockMvc;

    private ProfessionalUser professionalUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfessionalUserResource professionalUserResource = new ProfessionalUserResource(professionalUserService);
        this.restProfessionalUserMockMvc = MockMvcBuilders.standaloneSetup(professionalUserResource)
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
    public static ProfessionalUser createEntity(EntityManager em) {
        ProfessionalUser professionalUser = new ProfessionalUser()
            .userId(DEFAULT_USER_ID)
            .firstName(DEFAULT_FIRST_NAME)
            .surname(DEFAULT_SURNAME)
            .email(DEFAULT_EMAIL)
            .phoneNumber(DEFAULT_PHONE_NUMBER);
        return professionalUser;
    }

    @Before
    public void initTest() {
        professionalUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessionalUser() throws Exception {
        int databaseSizeBeforeCreate = professionalUserRepository.findAll().size();

        // Create the ProfessionalUser
        ProfessionalUserDTO professionalUserDTO = professionalUserMapper.toDto(professionalUser);
        restProfessionalUserMockMvc.perform(post("/api/professional-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalUser in the database
        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeCreate + 1);
        ProfessionalUser testProfessionalUser = professionalUserList.get(professionalUserList.size() - 1);
        assertThat(testProfessionalUser.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testProfessionalUser.getFirstName()).isEqualTo(DEFAULT_FIRST_NAME);
        assertThat(testProfessionalUser.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testProfessionalUser.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testProfessionalUser.getPhoneNumber()).isEqualTo(DEFAULT_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void createProfessionalUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professionalUserRepository.findAll().size();

        // Create the ProfessionalUser with an existing ID
        professionalUser.setId(1L);
        ProfessionalUserDTO professionalUserDTO = professionalUserMapper.toDto(professionalUser);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessionalUserMockMvc.perform(post("/api/professional-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalUser in the database
        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = professionalUserRepository.findAll().size();
        // set the field null
        professionalUser.setUserId(null);

        // Create the ProfessionalUser, which fails.
        ProfessionalUserDTO professionalUserDTO = professionalUserMapper.toDto(professionalUser);

        restProfessionalUserMockMvc.perform(post("/api/professional-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserDTO)))
            .andExpect(status().isBadRequest());

        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllProfessionalUsers() throws Exception {
        // Initialize the database
        professionalUserRepository.saveAndFlush(professionalUser);

        // Get all the professionalUserList
        restProfessionalUserMockMvc.perform(get("/api/professional-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professionalUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].firstName").value(hasItem(DEFAULT_FIRST_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phoneNumber").value(hasItem(DEFAULT_PHONE_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getProfessionalUser() throws Exception {
        // Initialize the database
        professionalUserRepository.saveAndFlush(professionalUser);

        // Get the professionalUser
        restProfessionalUserMockMvc.perform(get("/api/professional-users/{id}", professionalUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professionalUser.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.firstName").value(DEFAULT_FIRST_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phoneNumber").value(DEFAULT_PHONE_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingProfessionalUser() throws Exception {
        // Get the professionalUser
        restProfessionalUserMockMvc.perform(get("/api/professional-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessionalUser() throws Exception {
        // Initialize the database
        professionalUserRepository.saveAndFlush(professionalUser);
        int databaseSizeBeforeUpdate = professionalUserRepository.findAll().size();

        // Update the professionalUser
        ProfessionalUser updatedProfessionalUser = professionalUserRepository.findOne(professionalUser.getId());
        // Disconnect from session so that the updates on updatedProfessionalUser are not directly saved in db
        em.detach(updatedProfessionalUser);
        updatedProfessionalUser
            .userId(UPDATED_USER_ID)
            .firstName(UPDATED_FIRST_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .phoneNumber(UPDATED_PHONE_NUMBER);
        ProfessionalUserDTO professionalUserDTO = professionalUserMapper.toDto(updatedProfessionalUser);

        restProfessionalUserMockMvc.perform(put("/api/professional-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserDTO)))
            .andExpect(status().isOk());

        // Validate the ProfessionalUser in the database
        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeUpdate);
        ProfessionalUser testProfessionalUser = professionalUserList.get(professionalUserList.size() - 1);
        assertThat(testProfessionalUser.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testProfessionalUser.getFirstName()).isEqualTo(UPDATED_FIRST_NAME);
        assertThat(testProfessionalUser.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testProfessionalUser.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testProfessionalUser.getPhoneNumber()).isEqualTo(UPDATED_PHONE_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessionalUser() throws Exception {
        int databaseSizeBeforeUpdate = professionalUserRepository.findAll().size();

        // Create the ProfessionalUser
        ProfessionalUserDTO professionalUserDTO = professionalUserMapper.toDto(professionalUser);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfessionalUserMockMvc.perform(put("/api/professional-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalUser in the database
        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfessionalUser() throws Exception {
        // Initialize the database
        professionalUserRepository.saveAndFlush(professionalUser);
        int databaseSizeBeforeDelete = professionalUserRepository.findAll().size();

        // Get the professionalUser
        restProfessionalUserMockMvc.perform(delete("/api/professional-users/{id}", professionalUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProfessionalUser> professionalUserList = professionalUserRepository.findAll();
        assertThat(professionalUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalUser.class);
        ProfessionalUser professionalUser1 = new ProfessionalUser();
        professionalUser1.setId(1L);
        ProfessionalUser professionalUser2 = new ProfessionalUser();
        professionalUser2.setId(professionalUser1.getId());
        assertThat(professionalUser1).isEqualTo(professionalUser2);
        professionalUser2.setId(2L);
        assertThat(professionalUser1).isNotEqualTo(professionalUser2);
        professionalUser1.setId(null);
        assertThat(professionalUser1).isNotEqualTo(professionalUser2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalUserDTO.class);
        ProfessionalUserDTO professionalUserDTO1 = new ProfessionalUserDTO();
        professionalUserDTO1.setId(1L);
        ProfessionalUserDTO professionalUserDTO2 = new ProfessionalUserDTO();
        assertThat(professionalUserDTO1).isNotEqualTo(professionalUserDTO2);
        professionalUserDTO2.setId(professionalUserDTO1.getId());
        assertThat(professionalUserDTO1).isEqualTo(professionalUserDTO2);
        professionalUserDTO2.setId(2L);
        assertThat(professionalUserDTO1).isNotEqualTo(professionalUserDTO2);
        professionalUserDTO1.setId(null);
        assertThat(professionalUserDTO1).isNotEqualTo(professionalUserDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(professionalUserMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(professionalUserMapper.fromId(null)).isNull();
    }
}
