import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../Services/Storage/storage.service';
import { ProductService } from '../../Services/Woocommerce/Products/product.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: any = [];
  loading: any;
  subtotal: number = 0;

  constructor(private storage:StorageService, private productService:ProductService,) { }

  ngOnInit() {
    this.loading = 'Loading...';
    this.getLocalStorageData();
  }

  async getLocalStorageData(){
    this.storage.get('cart')
    .then(async (data:any)=>{
      if(data) {
        await Promise.all(data.map(async (element:any, index) => {
          let tempData:any = await this.productService.getSingleProduct(element.id);
          data[index].product = tempData;
          this.subtotal += parseFloat(tempData.price);
        }));
        this.cart = data;
        console.log(this.cart);
      }
      else {
        this.cart = [];
      }
    })
    .catch(err=>{console.log("Error=> ", err);})
    .finally(()=>{this.loading = '';})
  }

  removeCartItem(id){
    console.log(id)
    this.cart = this.cart.filter(d=>d.id != id)
    if(this.cart.length)
      this.storage.set('cart', this.cart)
    else
      this.storage.remove('cart')
  }

  setQuantity(e, id){
    let newQuantity = parseInt(e.target.value);
    console.log(newQuantity)
    this.cart.map((element=>{
      if(element.id === id){
        if(newQuantity > 1){
          element.quantity = newQuantity;
        }
        else{
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
