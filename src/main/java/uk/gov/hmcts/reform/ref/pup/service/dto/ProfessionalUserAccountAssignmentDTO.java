package uk.gov.hmcts.reform.ref.pup.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ProfessionalUserAccountAssignment entity.
 */
public class ProfessionalUserAccountAssignmentDTO implements Serializable {

    private Long id;

    private Long paymentAccountId;

    private Long professionalUserId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPaymentAccountId() {
        return paymentAccountId;
    }

    public void setPaymentAccountId(Long paymentAccountId) {
        this.paymentAccountId = paymentAccountId;
    }

    public Long getProfessionalUserId() {
        return professionalUserId;
    }

    public void setProfessionalUserId(Long professionalUserId) {
        this.professionalUserId = professionalUserId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProfessionalUserAccountAssignmentDTO professionalUserAccountAssignmentDTO = (ProfessionalUserAccountAssignmentDTO) o;
        if(professionalUserAccountAssignmentDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professionalUserAccountAssignmentDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessionalUserAccountAssignmentDTO{" +
            "id=" + getId() +
            "}";
    }
}
