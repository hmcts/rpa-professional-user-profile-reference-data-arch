import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessionalUserAccountAssignmentReferenceData } from './professional-user-account-assignment-reference-data.model';
import { ProfessionalUserAccountAssignmentReferenceDataPopupService } from './professional-user-account-assignment-reference-data-popup.service';
import { ProfessionalUserAccountAssignmentReferenceDataService } from './professional-user-account-assignment-reference-data.service';

@Component({
    selector: 'jhi-professional-user-account-assignment-reference-data-delete-dialog',
    templateUrl: './professional-user-account-assignment-reference-data-delete-dialog.component.html'
})
export class ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent {

    professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData;

    constructor(
        private professionalUserAccountAssignmentService: ProfessionalUserAccountAssignmentReferenceDataService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.professionalUserAccountAssignmentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'professionalUserAccountAssignmentListModification',
                content: 'Deleted an professionalUserAccountAssignment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-professional-user-account-assignment-reference-data-delete-popup',
    template: ''
})
export class ProfessionalUserAccountAssignmentReferenceDataDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private professionalUserAccountAssignmentPopupService: ProfessionalUserAccountAssignmentReferenceDataPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.professionalUserAccountAssignmentPopupService
                .open(ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
