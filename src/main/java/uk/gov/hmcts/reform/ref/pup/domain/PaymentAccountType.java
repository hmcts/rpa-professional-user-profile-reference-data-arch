package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A PaymentAccountType.
 */
@Entity
@Table(name = "payment_account_type")
public class PaymentAccountType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "paymentAccountType")
    @JsonIgnore
    private Set<PaymentAccount> paymentAccounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public PaymentAccountType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<PaymentAccount> getPaymentAccounts() {
        return paymentAccounts;
    }

    public PaymentAccountType paymentAccounts(Set<PaymentAccount> paymentAccounts) {
        this.paymentAccounts = paymentAccounts;
        return this;
    }

    public PaymentAccountType addPaymentAccounts(PaymentAccount paymentAccount) {
        this.paymentAccounts.add(paymentAccount);
        paymentAccount.setPaymentAccountType(this);
        return this;
    }

    public PaymentAccountType removePaymentAccounts(PaymentAccount paymentAccount) {
        this.paymentAccounts.remove(paymentAccount);
        paymentAccount.setPaymentAccountType(null);
        return this;
    }

    public void setPaymentAccounts(Set<PaymentAccount> paymentAccounts) {
        this.paymentAccounts = paymentAccounts;
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
        PaymentAccountType paymentAccountType = (PaymentAccountType) o;
        if (paymentAccountType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentAccountType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentAccountType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
