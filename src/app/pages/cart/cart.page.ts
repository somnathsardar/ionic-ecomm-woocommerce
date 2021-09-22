import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Services/Storage/storage.service';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../../Services/Woocommerce/Products/product.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: any;
  loading: any;

  constructor(private storage:StorageService, private loadingCtrl:LoadingController, private productService:ProductService,) { }

  ngOnInit() {
    this.loading = this.loadingCtrl.create({
      message: 'Please wait...',
      cssClass: 'loading-icon',
    }).then((res)=>{
      res.present();
    });

    this.getLocalStorageData();
  }

  async getLocalStorageData(){
    this.storage.get('cart')
    .then(async (data)=>{
      if(data) {
        await Promise.all(data.map(async (element:any, index) => {
          const tempData = await this.productService.getSingleProduct(element.id);
          data[index].product = tempData;
        }));
        this.cart = data;
        console.log(this.cart);
        this.loadingCtrl.dismiss();
      }
      else {
        this.cart = [];
        this.loadingCtrl.dismiss()
      }
    })
  }

  removeCartItem(id){
    console.log(id)
  }

  setQuantity(e, id){
    let newQuantity = parseInt(e.target.value);
    console.log(newQuantity)
    this.cart.map((element=>{
      if(element.id === id){
        if(newQuantity > 1){
          console.log("If")
          element.quantity = newQuantity;
        }
        else{
          console.log("Else")
          element.quantity = 1;
        }
      }
    }))
  }

  decreaseQuantity(id){
    this.cart.map((element=>{
      if(element.id === id){
        if(element.quantity > 1)
          element.quantity --;
      }
    }))
    this.storage.set('cart', this.cart);
  }

  increaseQuantity(id){
    this.cart.map((element=>{
      if(element.id === id){
        element.quantity ++;
      }
    }))
    this.storage.set('cart', this.cart);
  }

}
