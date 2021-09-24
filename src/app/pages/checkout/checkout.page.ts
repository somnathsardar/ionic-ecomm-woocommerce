import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../Services/Woocommerce/Countries/country.service';
import { StorageService } from '../../Services/Storage/storage.service';
import { Order } from '../../interfaces/order';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  loading: any;
  countries: any;
  states: any;
  user: any;
  currentSegmentStep: string;
  orderObj: Order;
  shippingDetailsForm: FormGroup = this.fb.group({
    billing: this.fb.group({
      first_name: [''],
      last_name: [''],
      address_1: [''],
      address_2: [''],
      city: [''],
      state: [''],
      postcode: [''],
      country: [''],
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
    })
  })

  constructor(private countryService:CountryService, private storage:StorageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.loading = 'Loading...';
    this.getUserFromLocalStorage();
  }

  getUserFromLocalStorage(){
    this.storage.get('user')
    .then((data:any) => {
      this.user = data;
      if(data)
        this.currentSegmentStep = 'payment';
      else
      this.currentSegmentStep = 'shipping';
    })
    .catch(err=>{console.log("Error fetching user data from local storage: ", err)})
    .finally(()=>{this.init()})
  }

  init(){
    this.countryService.getAllCountries()
    .then(data=>{this.countries = data; console.log(data)})
    .catch(err=>{console.log("Error fetching countries: ", err)})
    .finally(()=>{this.loading = ""})
  }

  setShippingData(){
    console.log(this.shippingDetailsForm.value.billing)
  }

}
