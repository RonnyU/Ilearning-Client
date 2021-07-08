import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../services/course.service';
import { OrderService } from '../../../services/order.service';
import { environment } from '../../../../environments/environment';
import { NOTYF } from '../../../../assets/ts/notyf.token';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-buy-course',
  templateUrl: './buy-course.component.html',
  styleUrls: ['./buy-course.component.css'],
})
export class BuyCourseComponent implements OnInit {
  public id;
  public course = {
    _id: '',
    title: '',
    courseDesc: '',
    imagePath: '',
    coursePrice: 0,
    activeCourse: '',
    deleted: '',
    chapter: [],
    subcategory: [],
    user: '',
    purchases: [],
    Profits: [],
    createdAt: '',
    updatedAt: '',
  };
  public imageUrl;
  public url;
  public cuttedDesc;

  public user = JSON.parse(localStorage.getItem('identity'));

  public orderDetails = {
    name: this.user.name || '',
    surname: this.user.surname || '',
    product: '',
    email: this.user.email || '',
    phone: '',
    price: 0,
    productId: '',
    total: 0,
  };

  constructor(
    @Inject(NOTYF) private notyf: Notyf,
    public _courseService: CourseService,
    public _orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.getCourseDetails(this.id);
    });
    this.url = environment.url;
  }

  ngOnInit(): void {}
  getCourseDetails(id: string) {
    this._courseService.getCourse(id).subscribe((res) => {
      if (res.status) {
        this.course = res.course;
        this.cuttedDesc = this.cutDescription(this.course.courseDesc);
        this.imageUrl = this.url + 'course/image/' + this.course.imagePath;
        this.orderDetails.product = res.course.title;
        this.orderDetails.price = this.course.coursePrice;
        this.orderDetails.productId = this.course._id;
        this.orderDetails.total =
          this.course.coursePrice + this.course.coursePrice * 0.13;
      } else {
        this.notyf.error('Error obteniendo la información.');
      }
    });
  }
  cutDescription(desc) {
    const splittedDesc = desc.split(' ');
    let newDesc = '';
    for (let i = 0; i < splittedDesc.length; i++) {
      const el = splittedDesc[i];
      newDesc = '' ? (newDesc += el) : (newDesc += ' ' + el);
      if (i > 32) {
        newDesc += '...';
        return newDesc;
      }
    }
    return newDesc;
  }
  createOrder() {
    // console.log(this.orderDetails);
    // if (
    //   this.orderDetails.name == '' ||
    //   this.orderDetails.surname == '' ||
    //   this.orderDetails.email == '' ||
    //   this.orderDetails.product == '' ||
    //   this.orderDetails.productId == '' ||
    //   this.orderDetails.price == 0 ||
    //   this.orderDetails.total == 0
    // ) {
    //   this.notyf.error('Por favor completar los campos obligatorios.');
    // } else {
    //   this._orderService.create(this.orderDetails).subscribe((res) => {
    //     console.log(res);
    //     if (res.status) {
    //       this.notyf.success('Solicitud de compra enviada.');
    //       setTimeout(() => {
    //         this.router.navigate(['/inicio']);
    //       }, 2000);
    //     } else {
    //       this.notyf.error('Ha ocurrido un error procesando la solicitud.');
    //     }
    //   });
    // }
  }

  public switchTab(option) {
    let btnSinpe = document.getElementById('btnsinpe');
    //console.log(btnTrans);
    let btnCard = document.getElementById('btncard');

    //console.log(btnCard);
    let tabSinpe = document.getElementById('prod-sinpe');

    //console.log(tabTrans);
    let tabCard = document.getElementById('prod-creditcard');
    //console.log(tabCard);

    switch (option) {
      case 'btn1': {
        btnSinpe.className = 'active-btn tab-btn';
        tabSinpe.className = 'tab active-tab';
        btnCard.className = 'tab-btn';
        tabCard.className = 'tab';
        break;
      }
      case 'btn2': {
        btnSinpe.className = 'tab-btn';
        tabSinpe.className = 'tab';
        btnCard.className = 'active-btn tab-btn';
        tabCard.className = 'tab active-tab';
        break;
      }

      default: {
        //statements;
        break;
      }
    }
  }
  noavailable() {
    this.notyf.open({
      message: 'These options have been disabled for this test',
      type: 'warning',
      duration: 3500,
    });
  }
}
