import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../Services/Woocommerce/Countries/country.service';
import { StorageService } from '../../Services/Storage/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../Services/Woocommerce/Checkout/checkout.service';
import { app_settings } from '../../constants/constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  loading: any;
  countries: any;
  states_billing: any;
  states_shipping: any;
  user: any;
  currentSegmentStep: string;
  shipping_billing_address_same: boolean;
  paymentGateways: any;
  cart: any;
  taxes: any;
  shipping: any;
  cartTotal: number = 0;
  totalTax: number = 0;
  subTotal: number = 0;
  orderForm: FormGroup = this.fb.group({
    payment_method: [''],
    payment_method_title: [''],
    set_paid: false,
    billing: this.fb.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      address_2: [''],
      country: [''],
      state: [''],
      city: [''],
      postcode: [''],
      email: [''],
      phone: [''],
    }),
    shipping: this.fb.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      postcode: [''],
      country: [''],
    }),
    line_items: [],
    shipping_lines: []
  });
  shippingForm: FormGroup = this.fb.group({
    billing: this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      address_1: ['', [Validators.required]],
      address_2: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    }),
    shipping: this.fb.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      postcode: [''],
      country: [''],
    }),
  });
  paymentForm: FormGroup = this.fb.group({
    payment_method: ['', [Validators.required]],
    payment_method_title: ['', [Validators.required]],
    set_paid: false,
    shipping_lines: ['', [Validators.required]]
  })


  constructor(private countryService:CountryService, private storage:StorageService, private fb: FormBuilder, private checkoutService: CheckoutService) {}

  ngOnInit() {
    this.loading = 'Loading...';
    this.currentSegmentStep = 'orderSummary';
    this.shipping_billing_address_same = true;
    this.init();
  }

  async init(){
    await this.getUserFromLocalStorage();
    await this.getCartData();
    await this.getAllCountries();
    await this.getAllPaymentGateways();
    await this.getTaxes();
    await this.getShipping();
    await this.getCartTotal();
    console.log(this.cartTotal, this.subTotal)
    this.loading = ""
  }

  getUserFromLocalStorage(){
    return new Promise((resolve, reject)=>{
      this.storage.get('user')
      .then((data:any) => { console.log("User: ", data); this.user = data; })
      .catch(err=>{console.log("Error fetching user data from local storage: ", err)})
      .finally(()=>{resolve('')})
    })
  }

  getCartData(){
    return new Promise((resolve, reject)=>{
      this.storage.get('cart')
      .then(data=>{console.log("Cart data: ",data); this.cart = data;})
      .catch(err=>{console.log("Error getting cart data: ", err);})
      .finally(()=>{resolve('')})
    })
  }

  getCartTotal(){
    return new Promise((resolve, reject)=>{
      if(this.cart){
        let temp: any = [];
        this.cart.map((value, index)=>{
          temp.push({ product_id: value.id, quantity: value.quantity })
          this.cartTotal += (value.quantity * parseFloat(value.product.price));
        })
        // if(this.totalTax){
        //   let temp = (this.cartTotal * this.totalTax) / 100;
        //   this.subTotal = this.cartTotal + temp;
        // }
        // else{
        //   this.subTotal = this.cartTotal;
        // }
        this.orderForm.controls['line_items'].setValue(temp)
        resolve('');
      }
      else{
        this.cartTotal = 0;
        resolve('');
      }
    })
  }

  getAllCountries(){
    return new Promise((resolve, reject)=>{
      this.countryService.getAllCountries()
      .then(data=>{this.countries = data; console.log("Countries: ",data)})
      .catch(err=>{console.log("Error fetching countries: ", err)})
      .finally(()=>{resolve('')})
    })
  }

  getAllPaymentGateways(){
    return new Promise((resolve, reject)=>{
      let tempData = [];
      this.checkoutService.getPaymentGateways()
      .then((data:any) =>{
        data.map((value, index)=>{
          if(value.enabled)
            tempData.push(value);
        })
        console.log("Payment gateways: ", tempData);
        this.paymentGateways = tempData;
      })
      .catch(err=>{console.log("Error fetching payment gateways: ", err)})
      .finally(()=>{resolve('')})
    })
  }

  getTaxes(){
    return new Promise((resolve, reject)=>{
      this.checkoutService.getTaxes()
      .then((data: any)=>{
        console.log("Taxes: ", data); 
        this.taxes = data;
        data.map((value, index)=>{
          this.totalTax += parseFloat(value.rate);
        })
      })
      .catch(err=>{console.log("Error fetching taxes: ", err)})
      .finally(()=>{resolve('')})
    })
  }

  getShipping(){
    return new Promise((resolve, reject)=>{
      this.checkoutService.getShippingMethods()
      .then((data: any)=>{console.log("Shipping info: ", data); this.shipping = data;})
      .catch(err=>{console.log("Error in fetching shipping info: ", err);})
      .finally(()=>{resolve('');})
    })
  }

  setStateVariable(event, eventFor){
    let countryCode = event.target.value;
    let x = this.countries.find(d=> d.code === countryCode)
    if(eventFor === 'billing')
      this.states_billing = x.states;
    else if(eventFor === 'shipping')
      this.states_shipping = x.states;
  }

  toggleShippingFormSection(event){
    this.shipping_billing_address_same = event.detail.checked;
  }

  changeShippingMethod(event){
    console.log(event.detail);
    let selectedShippingMethod = this.shipping.find(d=> d.id === event.detail.value);
    selectedShippingMethod.total = app_settings.shipping.charge;
    let temp = [];
    temp.push(selectedShippingMethod);
    this.paymentForm.controls['shipping_lines'].setValue(temp)
  }

  changePaymentMethod(event){
    console.log(event.detail);
    let selectedPaymentMethod = this.paymentGateways.find(d=> d.id === event.detail.value);
    this.paymentForm.controls['payment_method'].setValue(selectedPaymentMethod.id);
    this.paymentForm.controls['payment_method_title'].setValue(selectedPaymentMethod.method_title);
  }

  proceedToPayment(){
    if(this.shipping_billing_address_same){
      this.shippingForm.patchValue({
        shipping: this.shippingForm.value.billing
      })
    }
    this.orderForm.patchValue({
      shipping: this.shippingForm.value.shipping,
      billing: this.shippingForm.value.billing
    })
    this.currentSegmentStep = 'payment'
  }

  orderSummary(){
    this.orderForm.patchValue({
      payment_method: this.paymentForm.value.payment_method,
      payment_method_title: this.paymentForm.value.payment_method_title,
      set_paid: this.paymentForm.value.set_paid,
      shipping_lines: this.paymentForm.value.shipping_lines,
    });
    console.log(this.orderForm.value);
  }

}
