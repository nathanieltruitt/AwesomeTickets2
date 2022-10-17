import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CsrModalService } from 'src/app/private/services/component-communication/csr-modal.service';

@Component({
  selector: 'app-csr-modal',
  templateUrl: './csr-modal.component.html',
  styleUrls: ['./csr-modal.component.scss'],
})
export class CsrModalComponent implements OnInit {
  isCompany!: boolean;
  inputForm!: FormGroup;
  routeId!: number | string;
  private _routeSub!: Subscription;
  @ViewChild('content', { static: true }) public content!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private csrModalService: CsrModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // TODO: refactor discovering whether company or contact.
    this.inputForm = this.csrModalService.getCompanyForm();
    if (this.router.url.includes('companies')) {
      this.isCompany = true;
      this.inputForm = this.csrModalService.getCompanyForm();
    } else {
      this.inputForm = this.csrModalService.getContactForm();
    }

    this._routeSub = this.route.params.subscribe(
      (params) =>
        (this.routeId =
          Number(Object.values(params)[0]) || Object.values(params)[0])
    );

    if (typeof this.routeId === 'number') {
      this.inputForm.get('id')?.setValue(this.routeId);
      this.inputForm = this.csrModalService.fetch(
        this.inputForm,
        this.isCompany ? true : false
      );
    } else if (this.routeId === 'new') {
      this.inputForm.reset();
    }

    this.modalService.open(this.content, {
      ariaLabelledBy: 'csr-modal-title',
      size: 'xl',
    });
  }

  dismissModal(modal: any) {
    modal.dismiss();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSaveData(modal: any) {
    this.csrModalService.saveData(this.routeId, this.inputForm.value);
    modal.close();
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }
}
