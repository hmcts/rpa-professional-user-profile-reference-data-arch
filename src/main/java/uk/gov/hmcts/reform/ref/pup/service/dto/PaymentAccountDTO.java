package uk.gov.hmcts.reform.ref.pup.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the PaymentAccount entity.
 */
public class PaymentAccountDTO implements Serializable {

    private Long id;

    @NotNull
    private String pbaNumber;

    private Long organisationId;

    private Long paymentAccountTypeId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPbaNumber() {
        return pbaNumber;
    }

    public void setPbaNumber(String pbaNumber) {
        this.pbaNumber = pbaNumber;
    }

    public Long getOrganisationId() {
        return organisationId;
    }

    public void setOrganisationId(Long organisationId) {
        this.organisationId = organisationId;
    }

    public Long getPaymentAccountTypeId() {
        return paymentAccountTypeId;
    }

    public void setPaymentAccountTypeId(Long paymentAccountTypeId) {
        this.paymentAccountTypeId = paymentAccountTypeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PaymentAccountDTO paymentAccountDTO = (PaymentAccountDTO) o;
        if(paymentAccountDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), paymentAccountDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PaymentAccountDTO{" +
            "id=" + getId() +
            ", pbaNumber='" + getPbaNumber() + "'" +
            "}";
    }
}
