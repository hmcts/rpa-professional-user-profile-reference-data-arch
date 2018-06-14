package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "professional_user")
public class ProfessionalUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "surname")
    private String surname;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @OneToMany(mappedBy = "professionalUser")
    @JsonIgnore
    private Set<ProfessionalUserAccountAssignment> accountAssignments = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public ProfessionalUser firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurname() {
        return surname;
    }

    public ProfessionalUser surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public ProfessionalUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public ProfessionalUser phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<ProfessionalUserAccountAssignment> getAccountAssignments() {
        return accountAssignments;
    }

    public ProfessionalUser accountAssignments(Set<ProfessionalUserAccountAssignment> professionalUserAccountAssignments) {
        this.accountAssignments = professionalUserAccountAssignments;
        return this;
    }

    public ProfessionalUser addAccountAssignments(ProfessionalUserAccountAssignment professionalUserAccountAssignment) {
        this.accountAssignments.add(professionalUserAccountAssignment);
        professionalUserAccountAssignment.setProfessionalUser(this);
        return this;
    }

    public ProfessionalUser removeAccountAssignments(ProfessionalUserAccountAssignment professionalUserAccountAssignment) {
        this.accountAssignments.remove(professionalUserAccountAssignment);
        professionalUserAccountAssignment.setProfessionalUser(null);
        return this;
    }

    public void setAccountAssignments(Set<ProfessionalUserAccountAssignment> professionalUserAccountAssignments) {
        this.accountAssignments = professionalUserAccountAssignments;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ProfessionalUser professionalUser = (ProfessionalUser) o;
        if (professionalUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professionalUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessionalUser{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            "}";
    }
}
