package uk.gov.hmcts.reform.ref.pup.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A OrganisationType.
 */
@Entity
@Table(name = "organisation_type")
public class OrganisationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "organisationType")
    @JsonIgnore
    private Set<Organisation> organisations = new HashSet<>();

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

    public OrganisationType name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Organisation> getOrganisations() {
        return organisations;
    }

    public OrganisationType organisations(Set<Organisation> organisations) {
        this.organisations = organisations;
        return this;
    }

    public OrganisationType addOrganisations(Organisation organisation) {
        this.organisations.add(organisation);
        organisation.setOrganisationType(this);
        return this;
    }

    public OrganisationType removeOrganisations(Organisation organisation) {
        this.organisations.remove(organisation);
        organisation.setOrganisationType(null);
        return this;
    }

    public void setOrganisations(Set<Organisation> organisations) {
        this.organisations = organisations;
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
        OrganisationType organisationType = (OrganisationType) o;
        if (organisationType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), organisationType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "OrganisationType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
