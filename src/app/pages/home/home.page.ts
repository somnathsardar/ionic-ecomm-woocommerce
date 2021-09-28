import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/Woocommerce/Products/product.service';
import { StorageService } from '../../Services/Storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any = [];
  loading: any = '';
  cart = {
    addToCartStatus :{
      error: {
        status: null,
        message: ''
      },
      success: {
        status: null,
        message: ''
      }
    },
    hasCartItems: null,
  };

  constructor(private productService: ProductService, private storage:StorageService) {
  }

  ngOnInit() {
    this.loading = "Loading..."
    this.getProducts()
  }

  ionViewDidEnter(){
    this.storage.get('cart').then((cart)=>{
      if(cart)
        this.cart.hasCartItems = true;
      else
        this.cart.hasCartItems = false;
    })
  }

  getProducts() {
    this.productService.getAllProducts()
    .then(data=>{
      console.log(data);
      this.products = data;
    })
    .catch(err=>{
      console.log(err);
    })
    .finally(()=>{this.loading = '';})
  }

}
