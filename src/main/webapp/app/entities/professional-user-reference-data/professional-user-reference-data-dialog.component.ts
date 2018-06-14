import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessionalUserReferenceData } from './professional-user-reference-data.model';
import { ProfessionalUserReferenceDataPopupService } from './professional-user-reference-data-popup.service';
import { ProfessionalUserReferenceDataService } from './professional-user-reference-data.service';

@Component({
    selector: 'jhi-professional-user-reference-data-dialog',
    templateUrl: './professional-user-reference-data-dialog.component.html'
})
export class ProfessionalUserReferenceDataDialogComponent implements OnInit {

    professionalUser: ProfessionalUserReferenceData;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private professionalUserService: ProfessionalUserReferenceDataService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.professionalUser.id !== undefined) {
            this.subscribeToSaveResponse(
                this.professionalUserService.update(this.professionalUser));
        } else {
            this.subscribeToSaveResponse(
                this.professionalUserService.create(this.professionalUser));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ProfessionalUserReferenceData>>) {
        result.subscribe((res: HttpResponse<ProfessionalUserReferenceData>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ProfessionalUserReferenceData) {
        this.eventManager.broadcast({ name: 'professionalUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-professional-user-reference-data-popup',
    template: ''
})
export class ProfessionalUserReferenceDataPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professionalUserPopupService: ProfessionalUserReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.professionalUserPopupService
                    .open(ProfessionalUserReferenceDataDialogComponent as Component, params['id']);
            } else {
                this.professionalUserPopupService
                    .open(ProfessionalUserReferenceDataDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
