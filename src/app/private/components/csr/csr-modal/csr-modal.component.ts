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
import { CsrModalService } from 'src/app/private/services/component-communication/csr-modal.service';

@Component({
  selector: 'app-csr-modal',
  templateUrl: './csr-modal.component.html',
  styleUrls: ['./csr-modal.component.scss'],
})
export class CsrModalComponent implements OnInit {
  isCompany!: boolean;
  inputForm!: FormGroup;
  // routeId!: string | number;
  @ViewChild('content', { static: true }) public content!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private csrModalService: CsrModalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // set is company to true meaning we are getting a company
    this.inputForm = this.csrModalService.getCompanyForm();
    if (this.router.url.includes('companies')) {
      this.isCompany = true;
      this.inputForm = this.csrModalService.getCompanyForm();
    }
    // TODO: implement Contact Form
    else {
      this.inputForm = this.csrModalService.getContactForm();
    }

    // ? might use
    // this.route.params.subscribe((params) => {
    //   this.routeId = Object.values(params)[0];
    // });

    this.modalService.open(this.content, {
      ariaLabelledBy: 'csr-modal-title',
      size: 'xl',
    });
  }

  dismissModal(modal: any) {
    modal.dismiss();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
