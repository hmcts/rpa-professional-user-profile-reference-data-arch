import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PaymentAccountReferenceData } from './payment-account-reference-data.model';
import { PaymentAccountReferenceDataService } from './payment-account-reference-data.service';

@Injectable()
export class PaymentAccountReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private paymentAccountService: PaymentAccountReferenceDataService

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
                this.paymentAccountService.find(id)
                    .subscribe((paymentAccountResponse: HttpResponse<PaymentAccountReferenceData>) => {
                        const paymentAccount: PaymentAccountReferenceData = paymentAccountResponse.body;
                        this.ngbModalRef = this.paymentAccountModalRef(component, paymentAccount);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.paymentAccountModalRef(component, new PaymentAccountReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    paymentAccountModalRef(component: Component, paymentAccount: PaymentAccountReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.paymentAccount = paymentAccount;
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
