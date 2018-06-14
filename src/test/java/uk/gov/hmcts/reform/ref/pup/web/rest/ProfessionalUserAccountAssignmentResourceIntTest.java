package uk.gov.hmcts.reform.ref.pup.web.rest;

import uk.gov.hmcts.reform.ref.pup.ReferencedataApp;

import uk.gov.hmcts.reform.ref.pup.domain.ProfessionalUserAccountAssignment;
import uk.gov.hmcts.reform.ref.pup.repository.ProfessionalUserAccountAssignmentRepository;
import uk.gov.hmcts.reform.ref.pup.service.ProfessionalUserAccountAssignmentService;
import uk.gov.hmcts.reform.ref.pup.service.dto.ProfessionalUserAccountAssignmentDTO;
import uk.gov.hmcts.reform.ref.pup.service.mapper.ProfessionalUserAccountAssignmentMapper;
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
 * Test class for the ProfessionalUserAccountAssignmentResource REST controller.
 *
 * @see ProfessionalUserAccountAssignmentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReferencedataApp.class)
public class ProfessionalUserAccountAssignmentResourceIntTest {

    @Autowired
    private ProfessionalUserAccountAssignmentRepository professionalUserAccountAssignmentRepository;

    @Autowired
    private ProfessionalUserAccountAssignmentMapper professionalUserAccountAssignmentMapper;

    @Autowired
    private ProfessionalUserAccountAssignmentService professionalUserAccountAssignmentService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restProfessionalUserAccountAssignmentMockMvc;

    private ProfessionalUserAccountAssignment professionalUserAccountAssignment;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProfessionalUserAccountAssignmentResource professionalUserAccountAssignmentResource = new ProfessionalUserAccountAssignmentResource(professionalUserAccountAssignmentService);
        this.restProfessionalUserAccountAssignmentMockMvc = MockMvcBuilders.standaloneSetup(professionalUserAccountAssignmentResource)
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
    public static ProfessionalUserAccountAssignment createEntity(EntityManager em) {
        ProfessionalUserAccountAssignment professionalUserAccountAssignment = new ProfessionalUserAccountAssignment();
        return professionalUserAccountAssignment;
    }

    @Before
    public void initTest() {
        professionalUserAccountAssignment = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfessionalUserAccountAssignment() throws Exception {
        int databaseSizeBeforeCreate = professionalUserAccountAssignmentRepository.findAll().size();

        // Create the ProfessionalUserAccountAssignment
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = professionalUserAccountAssignmentMapper.toDto(professionalUserAccountAssignment);
        restProfessionalUserAccountAssignmentMockMvc.perform(post("/api/professional-user-account-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserAccountAssignmentDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalUserAccountAssignment in the database
        List<ProfessionalUserAccountAssignment> professionalUserAccountAssignmentList = professionalUserAccountAssignmentRepository.findAll();
        assertThat(professionalUserAccountAssignmentList).hasSize(databaseSizeBeforeCreate + 1);
        ProfessionalUserAccountAssignment testProfessionalUserAccountAssignment = professionalUserAccountAssignmentList.get(professionalUserAccountAssignmentList.size() - 1);
    }

    @Test
    @Transactional
    public void createProfessionalUserAccountAssignmentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = professionalUserAccountAssignmentRepository.findAll().size();

        // Create the ProfessionalUserAccountAssignment with an existing ID
        professionalUserAccountAssignment.setId(1L);
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = professionalUserAccountAssignmentMapper.toDto(professionalUserAccountAssignment);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfessionalUserAccountAssignmentMockMvc.perform(post("/api/professional-user-account-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserAccountAssignmentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ProfessionalUserAccountAssignment in the database
        List<ProfessionalUserAccountAssignment> professionalUserAccountAssignmentList = professionalUserAccountAssignmentRepository.findAll();
        assertThat(professionalUserAccountAssignmentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProfessionalUserAccountAssignments() throws Exception {
        // Initialize the database
        professionalUserAccountAssignmentRepository.saveAndFlush(professionalUserAccountAssignment);

        // Get all the professionalUserAccountAssignmentList
        restProfessionalUserAccountAssignmentMockMvc.perform(get("/api/professional-user-account-assignments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(professionalUserAccountAssignment.getId().intValue())));
    }

    @Test
    @Transactional
    public void getProfessionalUserAccountAssignment() throws Exception {
        // Initialize the database
        professionalUserAccountAssignmentRepository.saveAndFlush(professionalUserAccountAssignment);

        // Get the professionalUserAccountAssignment
        restProfessionalUserAccountAssignmentMockMvc.perform(get("/api/professional-user-account-assignments/{id}", professionalUserAccountAssignment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(professionalUserAccountAssignment.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingProfessionalUserAccountAssignment() throws Exception {
        // Get the professionalUserAccountAssignment
        restProfessionalUserAccountAssignmentMockMvc.perform(get("/api/professional-user-account-assignments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfessionalUserAccountAssignment() throws Exception {
        // Initialize the database
        professionalUserAccountAssignmentRepository.saveAndFlush(professionalUserAccountAssignment);
        int databaseSizeBeforeUpdate = professionalUserAccountAssignmentRepository.findAll().size();

        // Update the professionalUserAccountAssignment
        ProfessionalUserAccountAssignment updatedProfessionalUserAccountAssignment = professionalUserAccountAssignmentRepository.findOne(professionalUserAccountAssignment.getId());
        // Disconnect from session so that the updates on updatedProfessionalUserAccountAssignment are not directly saved in db
        em.detach(updatedProfessionalUserAccountAssignment);
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = professionalUserAccountAssignmentMapper.toDto(updatedProfessionalUserAccountAssignment);

        restProfessionalUserAccountAssignmentMockMvc.perform(put("/api/professional-user-account-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserAccountAssignmentDTO)))
            .andExpect(status().isOk());

        // Validate the ProfessionalUserAccountAssignment in the database
        List<ProfessionalUserAccountAssignment> professionalUserAccountAssignmentList = professionalUserAccountAssignmentRepository.findAll();
        assertThat(professionalUserAccountAssignmentList).hasSize(databaseSizeBeforeUpdate);
        ProfessionalUserAccountAssignment testProfessionalUserAccountAssignment = professionalUserAccountAssignmentList.get(professionalUserAccountAssignmentList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProfessionalUserAccountAssignment() throws Exception {
        int databaseSizeBeforeUpdate = professionalUserAccountAssignmentRepository.findAll().size();

        // Create the ProfessionalUserAccountAssignment
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = professionalUserAccountAssignmentMapper.toDto(professionalUserAccountAssignment);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restProfessionalUserAccountAssignmentMockMvc.perform(put("/api/professional-user-account-assignments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(professionalUserAccountAssignmentDTO)))
            .andExpect(status().isCreated());

        // Validate the ProfessionalUserAccountAssignment in the database
        List<ProfessionalUserAccountAssignment> professionalUserAccountAssignmentList = professionalUserAccountAssignmentRepository.findAll();
        assertThat(professionalUserAccountAssignmentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteProfessionalUserAccountAssignment() throws Exception {
        // Initialize the database
        professionalUserAccountAssignmentRepository.saveAndFlush(professionalUserAccountAssignment);
        int databaseSizeBeforeDelete = professionalUserAccountAssignmentRepository.findAll().size();

        // Get the professionalUserAccountAssignment
        restProfessionalUserAccountAssignmentMockMvc.perform(delete("/api/professional-user-account-assignments/{id}", professionalUserAccountAssignment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProfessionalUserAccountAssignment> professionalUserAccountAssignmentList = professionalUserAccountAssignmentRepository.findAll();
        assertThat(professionalUserAccountAssignmentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalUserAccountAssignment.class);
        ProfessionalUserAccountAssignment professionalUserAccountAssignment1 = new ProfessionalUserAccountAssignment();
        professionalUserAccountAssignment1.setId(1L);
        ProfessionalUserAccountAssignment professionalUserAccountAssignment2 = new ProfessionalUserAccountAssignment();
        professionalUserAccountAssignment2.setId(professionalUserAccountAssignment1.getId());
        assertThat(professionalUserAccountAssignment1).isEqualTo(professionalUserAccountAssignment2);
        professionalUserAccountAssignment2.setId(2L);
        assertThat(professionalUserAccountAssignment1).isNotEqualTo(professionalUserAccountAssignment2);
        professionalUserAccountAssignment1.setId(null);
        assertThat(professionalUserAccountAssignment1).isNotEqualTo(professionalUserAccountAssignment2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfessionalUserAccountAssignmentDTO.class);
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO1 = new ProfessionalUserAccountAssignmentDTO();
        professionalUserAccountAssignmentDTO1.setId(1L);
        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO2 = new ProfessionalUserAccountAssignmentDTO();
        assertThat(professionalUserAccountAssignmentDTO1).isNotEqualTo(professionalUserAccountAssignmentDTO2);
        professionalUserAccountAssignmentDTO2.setId(professionalUserAccountAssignmentDTO1.getId());
        assertThat(professionalUserAccountAssignmentDTO1).isEqualTo(professionalUserAccountAssignmentDTO2);
        professionalUserAccountAssignmentDTO2.setId(2L);
        assertThat(professionalUserAccountAssignmentDTO1).isNotEqualTo(professionalUserAccountAssignmentDTO2);
        professionalUserAccountAssignmentDTO1.setId(null);
        assertThat(professionalUserAccountAssignmentDTO1).isNotEqualTo(professionalUserAccountAssignmentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(professionalUserAccountAssignmentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(professionalUserAccountAssignmentMapper.fromId(null)).isNull();
    }
}
