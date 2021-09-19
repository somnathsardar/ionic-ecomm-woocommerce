import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/Woocommerce/Products/product.service';
import { LoadingController } from '@ionic/angular';
import { CoverflowSlideOptions, CubeSlideEffect, FadeSlideEffect, FlipSlideEffect } from '../../constants/sliderEffects';
import { app_settings } from '../../constants/constants';
import { StorageService } from '../../Services/Storage/storage.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  productId: any;
  product: any = '';
  loading: any;
  productImageSliderOption : {} = {}
  productQuantity: number;
  addToCartBtnText: any;
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

  constructor( private activatedRoute:ActivatedRoute, private productService:ProductService, private loadingCtrl:LoadingController, private storage:StorageService) {
    this.productImageSliderOption = FlipSlideEffect(1);
    this.productQuantity = 1;
    this.addToCartBtnText = app_settings.cart.addToCartBtnText;
    this.cart.addToCartStatus.error = {status:false, message: app_settings.cart.addToCartErrorText};
    this.cart.addToCartStatus.success = {status: false, message: app_settings.cart.addToCartSuccessText};
  }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'loading-icon',
    }).then((res)=>{
      res.present();
    });

    this.activatedRoute.params.subscribe((data)=>{
      this.productId = data.id;
      this.getProduct()
    })
  }

  getProduct(){
    this.productService.getSingleProduct(this.productId)
    .then(data=>{
      this.product = data;
      console.log(this.product)
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

  addToCart(event){
    this.addToCartBtnText = app_settings.cart.onAddingBtnText;
    event.target.setAttribute('disabled', true);
    this.storage.get('cart').then(data=>{
      if(data){
        let addedProductData = data.find(d=>d.id === this.product.id)
        if(addedProductData){
          data = data.filter(d=>d.id != this.product.id)
          addedProductData.quantity += this.productQuantity;
        }
        else{
          addedProductData = {
            quantity: this.productQuantity,
            id: this.product.id,
            product: this.product
          }
        }
        data.push(addedProductData);
        this.updateCartStorage(event,data)
      }
      else{
        let data = [{
          quantity: this.productQuantity,
          id: this.product.id,
          product: this.product
        }]
        this.updateCartStorage(event,data)
      }
    })
  }

  updateCartStorage(event,data){
    this.storage.set('cart', data)
    .then(()=>{
      this.cart.addToCartStatus.success.status = true;
      this.cart.hasCartItems = true;
      setTimeout(()=>{
        this.cart.addToCartStatus.success.status = false;
      }, 2000)
    })
    .catch(()=>{
      this.cart.addToCartStatus.error.status = true;
      setTimeout(()=>{
        this.cart.addToCartStatus.error.status = false;
      }, 2000)
    })
    .finally(()=>{
      this.addToCartBtnText = app_settings.cart.addToCartBtnText;
      event.target.setAttribute('disabled', false);
    })
  }

  setQuantity(){
    if(this.productQuantity == null || this.productQuantity <= 0)
      this.productQuantity = 1;
  }

  increaseQuantity(){
    this.productQuantity += 1;
  }

  decreaseQuantity(){
    if(this.productQuantity <= 1)
      this.productQuantity = 1;
    else
      this.productQuantity -= 1;
  }

}
