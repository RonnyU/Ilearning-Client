import { Component, OnInit, Inject } from '@angular/core';
import { NOTYF } from '../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public email = '';
  constructor(@Inject(NOTYF) private notyf: Notyf) {}

  ngOnInit(): void {}

  createOrder(gOrder) {
    this.email = '';
    this.notyf.open({
      message: 'Ya estas subscrito gracias!',
      type: 'success',
      duration: 2500,
    });
  }
}
