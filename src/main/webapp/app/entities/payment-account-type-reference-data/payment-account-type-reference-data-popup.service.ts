import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PaymentAccountTypeReferenceData } from './payment-account-type-reference-data.model';
import { PaymentAccountTypeReferenceDataService } from './payment-account-type-reference-data.service';

@Injectable()
export class PaymentAccountTypeReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private paymentAccountTypeService: PaymentAccountTypeReferenceDataService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.paymentAccountTypeService.find(id)
                    .subscribe((paymentAccountTypeResponse: HttpResponse<PaymentAccountTypeReferenceData>) => {
                        const paymentAccountType: PaymentAccountTypeReferenceData = paymentAccountTypeResponse.body;
                        this.ngbModalRef = this.paymentAccountTypeModalRef(component, paymentAccountType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.paymentAccountTypeModalRef(component, new PaymentAccountTypeReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paymentAccountTypeModalRef(component: Component, paymentAccountType: PaymentAccountTypeReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.paymentAccountType = paymentAccountType;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
