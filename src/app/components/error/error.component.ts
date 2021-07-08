import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    $(document).ready(function () {
      $('body').width(window.innerWidth).height(window.innerHeight);
      $('#abutton').on('click', albert);

      function albert() {
        $('h1').html(
          '<span>Oh</span> <span>gosh</span><span>,</span> <span>it</span> <span>crashed!</span><span>"!"+!</span>'
        );
        $('span, button').attr('style', 'cursor:move !important;');
        $('body').jGravity({
          target: 'span',
          ignoreClass: 'dontMove',
          weight: 25,
          depth: 100,
          drag: true,
        });
        $('#abutton').off('click', albert);
      }
    });
  }
}
