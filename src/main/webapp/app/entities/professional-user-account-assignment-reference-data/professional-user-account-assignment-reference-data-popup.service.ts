import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProfessionalUserAccountAssignmentReferenceData } from './professional-user-account-assignment-reference-data.model';
import { ProfessionalUserAccountAssignmentReferenceDataService } from './professional-user-account-assignment-reference-data.service';

@Injectable()
export class ProfessionalUserAccountAssignmentReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private professionalUserAccountAssignmentService: ProfessionalUserAccountAssignmentReferenceDataService

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
                this.professionalUserAccountAssignmentService.find(id)
                    .subscribe((professionalUserAccountAssignmentResponse: HttpResponse<ProfessionalUserAccountAssignmentReferenceData>) => {
                        const professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData = professionalUserAccountAssignmentResponse.body;
                        this.ngbModalRef = this.professionalUserAccountAssignmentModalRef(component, professionalUserAccountAssignment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.professionalUserAccountAssignmentModalRef(component, new ProfessionalUserAccountAssignmentReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    professionalUserAccountAssignmentModalRef(component: Component,
        professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.professionalUserAccountAssignment = professionalUserAccountAssignment;
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
