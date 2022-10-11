import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-csr-modal',
  templateUrl: './csr-modal.component.html',
  styleUrls: ['./csr-modal.component.scss'],
})
export class CsrModalComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'csr-modal-title' });
  }
}
