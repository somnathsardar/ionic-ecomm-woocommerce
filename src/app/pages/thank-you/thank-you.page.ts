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
  subTotal: number = 0;
  taxTotal: number = 0;
  shippingCharge: number = 0;
  shopCurrency: string;

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
    await this.calculateOrderTotal();
    this.loading = '';
  }

  getOrder(){
    return new Promise((resolve, reject)=>{
      this.orderService.getOrder(this.orderId)
      .then((data: any)=>{console.log(data); this.orderData = data;})
      .catch((err)=>{console.log("Error fetching order data: ", err)})
      .finally(()=>{resolve('')})
    })
  }

  calculateOrderTotal(){
    return new Promise((resolve, reject)=>{
      this.orderData.line_items.map((value, index)=>{
        this.subTotal += (value.price * value.quantity);
      });
      this.subTotal = Number(this.subTotal.toFixed(2));
      this.taxTotal = this.orderData.total_tax;
      this.shippingCharge = this.orderData.shipping_total;
      this.shopCurrency = this.orderData.currency_symbol;
      resolve('');
    })
  }

}
