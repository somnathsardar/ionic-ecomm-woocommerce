import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ProductService } from '../../Services/Woocommerce/Products/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  products: any = [];
  loading: any;

  constructor(private productApi: ProductService, public loadingCtrl: LoadingController) {
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

  getProducts()
  {
    this.productApi.getAllProducts()
    .then(data=>{
      console.log(data);
      this.products = data;
      this.loadingCtrl.dismiss();
    })
    .catch(err=>{
      console.log(err)
    })
  }

}
