package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Organisation.
 */
@Entity
@Table(name = "organisation")
public class Organisation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    private OrganisationType organisationType;

    @OneToMany(mappedBy = "organisation")
    @JsonIgnore
    private Set<PaymentAccount> pbas = new HashSet<>();

    @OneToMany(mappedBy = "organisation")
    @JsonIgnore
    private Set<Address> addresses = new HashSet<>();

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

    public Organisation name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public OrganisationType getOrganisationType() {
        return organisationType;
    }

    public Organisation organisationType(OrganisationType organisationType) {
        this.organisationType = organisationType;
        return this;
    }

    public void setOrganisationType(OrganisationType organisationType) {
        this.organisationType = organisationType;
    }

    public Set<PaymentAccount> getPbas() {
        return pbas;
    }

    public Organisation pbas(Set<PaymentAccount> paymentAccounts) {
        this.pbas = paymentAccounts;
        return this;
    }

    public Organisation addPbas(PaymentAccount paymentAccount) {
        this.pbas.add(paymentAccount);
        paymentAccount.setOrganisation(this);
        return this;
    }

    public Organisation removePbas(PaymentAccount paymentAccount) {
        this.pbas.remove(paymentAccount);
        paymentAccount.setOrganisation(null);
        return this;
    }

    public void setPbas(Set<PaymentAccount> paymentAccounts) {
        this.pbas = paymentAccounts;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public Organisation addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public Organisation addAddresses(Address address) {
        this.addresses.add(address);
        address.setOrganisation(this);
        return this;
    }

    public Organisation removeAddresses(Address address) {
        this.addresses.remove(address);
        address.setOrganisation(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
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
        Organisation organisation = (Organisation) o;
        if (organisation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organisation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Organisation{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
