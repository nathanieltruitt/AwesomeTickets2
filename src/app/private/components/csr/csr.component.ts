import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-csr',
  templateUrl: './csr.component.html',
  styleUrls: ['./csr.component.scss'],
})
export class CsrComponent implements OnInit {
  openMenu!: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {}

  changePath(value: string) {
    this.router.navigate([this.openMenu], { relativeTo: this.route });
  }
}
