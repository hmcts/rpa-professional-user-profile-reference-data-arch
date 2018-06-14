package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PaymentAccount.
 */
@Entity
@Table(name = "payment_account")
public class PaymentAccount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "pba_number", nullable = false)
    private String pbaNumber;

    @ManyToOne
    private Organisation organisation;

    @OneToMany(mappedBy = "paymentAccount")
    @JsonIgnore
    private Set<ProfessionalUserAccountAssignment> accountAssignments = new HashSet<>();

    @ManyToOne
    private PaymentAccountType paymentAccountType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPbaNumber() {
        return pbaNumber;
    }

    public PaymentAccount pbaNumber(String pbaNumber) {
        this.pbaNumber = pbaNumber;
        return this;
    }

    public void setPbaNumber(String pbaNumber) {
        this.pbaNumber = pbaNumber;
    }

    public Organisation getOrganisation() {
        return organisation;
    }

    public PaymentAccount organisation(Organisation organisation) {
        this.organisation = organisation;
        return this;
    }

    public void setOrganisation(Organisation organisation) {
        this.organisation = organisation;
    }

    public Set<ProfessionalUserAccountAssignment> getAccountAssignments() {
        return accountAssignments;
    }

    public PaymentAccount accountAssignments(Set<ProfessionalUserAccountAssignment> professionalUserAccountAssignments) {
        this.accountAssignments = professionalUserAccountAssignments;
        return this;
    }

    public PaymentAccount addAccountAssignments(ProfessionalUserAccountAssignment professionalUserAccountAssignment) {
        this.accountAssignments.add(professionalUserAccountAssignment);
        professionalUserAccountAssignment.setPaymentAccount(this);
        return this;
    }

    public PaymentAccount removeAccountAssignments(ProfessionalUserAccountAssignment professionalUserAccountAssignment) {
        this.accountAssignments.remove(professionalUserAccountAssignment);
        professionalUserAccountAssignment.setPaymentAccount(null);
        return this;
    }

    public void setAccountAssignments(Set<ProfessionalUserAccountAssignment> professionalUserAccountAssignments) {
        this.accountAssignments = professionalUserAccountAssignments;
    }

    public PaymentAccountType getPaymentAccountType() {
        return paymentAccountType;
    }

    public PaymentAccount paymentAccountType(PaymentAccountType paymentAccountType) {
        this.paymentAccountType = paymentAccountType;
        return this;
    }

    public void setPaymentAccountType(PaymentAccountType paymentAccountType) {
        this.paymentAccountType = paymentAccountType;
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
        PaymentAccount paymentAccount = (PaymentAccount) o;
        if (paymentAccount.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentAccount.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentAccount{" +
            "id=" + getId() +
            ", pbaNumber='" + getPbaNumber() + "'" +
            "}";
    }
}
