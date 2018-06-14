package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AddressType.
 */
@Entity
@Table(name = "address_type")
public class AddressType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "addressType")
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

    public AddressType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public AddressType addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public AddressType addAddresses(Address address) {
        this.addresses.add(address);
        address.setAddressType(this);
        return this;
    }

    public AddressType removeAddresses(Address address) {
        this.addresses.remove(address);
        address.setAddressType(null);
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
        AddressType addressType = (AddressType) o;
        if (addressType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
