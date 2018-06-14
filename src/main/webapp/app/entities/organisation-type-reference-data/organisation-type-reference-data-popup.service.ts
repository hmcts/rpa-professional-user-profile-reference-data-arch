import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OrganisationTypeReferenceData } from './organisation-type-reference-data.model';
import { OrganisationTypeReferenceDataService } from './organisation-type-reference-data.service';

@Injectable()
export class OrganisationTypeReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private organisationTypeService: OrganisationTypeReferenceDataService

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
                this.organisationTypeService.find(id)
                    .subscribe((organisationTypeResponse: HttpResponse<OrganisationTypeReferenceData>) => {
                        const organisationType: OrganisationTypeReferenceData = organisationTypeResponse.body;
                        this.ngbModalRef = this.organisationTypeModalRef(component, organisationType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.organisationTypeModalRef(component, new OrganisationTypeReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    organisationTypeModalRef(component: Component, organisationType: OrganisationTypeReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.organisationType = organisationType;
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
