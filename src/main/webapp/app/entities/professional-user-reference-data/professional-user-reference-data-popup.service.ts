import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ProfessionalUserReferenceData } from './professional-user-reference-data.model';
import { ProfessionalUserReferenceDataService } from './professional-user-reference-data.service';

@Injectable()
export class ProfessionalUserReferenceDataPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private professionalUserService: ProfessionalUserReferenceDataService

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
                this.professionalUserService.find(id)
                    .subscribe((professionalUserResponse: HttpResponse<ProfessionalUserReferenceData>) => {
                        const professionalUser: ProfessionalUserReferenceData = professionalUserResponse.body;
                        this.ngbModalRef = this.professionalUserModalRef(component, professionalUser);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.professionalUserModalRef(component, new ProfessionalUserReferenceData());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    professionalUserModalRef(component: Component, professionalUser: ProfessionalUserReferenceData): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.professionalUser = professionalUser;
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
