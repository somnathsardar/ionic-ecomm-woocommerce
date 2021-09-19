import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../../Services/Woocommerce/Products/product.service';
import { StorageService } from '../../Services/Storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any = [];
  loading: any;
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

  constructor(private productService: ProductService, private loadingCtrl: LoadingController, private storage:StorageService) {
  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'loading-icon',
    }).then((res)=>{
      res.present();
    })
  
    this.getProducts()
  }

  getProducts() {
    this.productService.getAllProducts()
    .then(data=>{
      console.log(data);
      this.products = data;
    })
    .catch(err=>{
      console.log(err)
    })
    .finally(()=>{
      this.storage.get('cart').then((cart)=>{
        if(cart)
          this.cart.hasCartItems = true;
        else
          this.cart.hasCartItems = false;
        this.loadingCtrl.dismiss();
      })
    })
  }

}
