import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import {Product} from '../../shared/product';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateProduct.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UpdateProductComponent implements OnInit {

  productData: any = {};
  productForm: FormGroup;


  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      product: [''],
      price: [''],
    });
  }

  ngOnInit() {
    this.authService.getProductData(this.route.snapshot.params.id)
      .subscribe(data => {
        this.productData = data;
      });
  }

  updateProduct(): void {
    this.authService.updateProduct(this.productData)
      .subscribe(data => {
        alert('Product updated successfully.');
        this.router.navigate(['/user-profile']);
      });
  }

}


//
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
//
// import { AuthService } from '../../shared/auth.service';
// import {Product} from '../../shared/product';
//
// @Component({
//   selector: 'app-updateproduct',
//   templateUrl: './updateProduct.component.html',
//   styleUrls: ['./user-profile.component.css']
// })
// export class UpdateProductComponent implements OnInit {
//
//   products: any = {};
//
//   constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
//
//   }
//
//   ngOnInit() {
//     this.authService.getProductData(this.route.snapshot.params.id)
//       .subscribe(data => {
//         this.products = data;
//         console.log(this.products.product.products.product);
//       });
//   }
//
//   updateProduct(): void {
//     this.authService.updateProduct(this.products)
//       .subscribe(data => {
//         alert('Employee updated successfully.');
//         this.router.navigate(['/employees']);
//       });
//
//   };
//
// }
