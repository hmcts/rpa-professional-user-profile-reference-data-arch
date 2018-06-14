package uk.gov.hmcts.reform.ref.pup.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ProfessionalUserAccountAssignment.
 */
@Entity
@Table(name = "pba_assignment")
public class ProfessionalUserAccountAssignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private PaymentAccount paymentAccount;

    @ManyToOne
    private ProfessionalUser professionalUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentAccount getPaymentAccount() {
        return paymentAccount;
    }

    public ProfessionalUserAccountAssignment paymentAccount(PaymentAccount paymentAccount) {
        this.paymentAccount = paymentAccount;
        return this;
    }

    public void setPaymentAccount(PaymentAccount paymentAccount) {
        this.paymentAccount = paymentAccount;
    }

    public ProfessionalUser getProfessionalUser() {
        return professionalUser;
    }

    public ProfessionalUserAccountAssignment professionalUser(ProfessionalUser professionalUser) {
        this.professionalUser = professionalUser;
        return this;
    }

    public void setProfessionalUser(ProfessionalUser professionalUser) {
        this.professionalUser = professionalUser;
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
        ProfessionalUserAccountAssignment professionalUserAccountAssignment = (ProfessionalUserAccountAssignment) o;
        if (professionalUserAccountAssignment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), professionalUserAccountAssignment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProfessionalUserAccountAssignment{" +
            "id=" + getId() +
            "}";
    }
}
