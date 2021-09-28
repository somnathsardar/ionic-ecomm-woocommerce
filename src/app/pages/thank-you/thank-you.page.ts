import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../Services/Woocommerce/Order/order.service'

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.page.html',
  styleUrls: ['./thank-you.page.scss'],
})
export class ThankYouPage implements OnInit {
  
  loading: any;
  orderId: any;
  orderData: any;

  constructor(private activatedRoute:ActivatedRoute, private orderService: OrderService) { }

  ngOnInit() {
    this.loading = "Loading...";
    this.activatedRoute.params.subscribe((data)=>{
      this.orderId = data.id;
      this.init();
    })
  }

  async init(){
    await this.getOrder();
  }

  getOrder(){
    return new Promise((resolve, reject)=>{
      console.log(this.orderId)
      this.orderService.getOrder(this.orderId)
      .then((data: any)=>{console.log(data); this.orderData = data;})
      .catch((err)=>{console.log("Error fetching order data: ", err)})
      .finally(()=>{resolve('')})
    })
  }

}
