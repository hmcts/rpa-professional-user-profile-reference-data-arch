import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AddressTypeReferenceData } from './address-type-reference-data.model';
import { AddressTypeReferenceDataService } from './address-type-reference-data.service';

@Injectable()
export class AddressTypeReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private addressTypeService: AddressTypeReferenceDataService

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
                this.addressTypeService.find(id)
                    .subscribe((addressTypeResponse: HttpResponse<AddressTypeReferenceData>) => {
                        const addressType: AddressTypeReferenceData = addressTypeResponse.body;
                        this.ngbModalRef = this.addressTypeModalRef(component, addressType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.addressTypeModalRef(component, new AddressTypeReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    addressTypeModalRef(component: Component, addressType: AddressTypeReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.addressType = addressType;
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
