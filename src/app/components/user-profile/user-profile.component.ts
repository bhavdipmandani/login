import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import {Product} from '../../shared/product';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {
  name = localStorage.getItem('name');
  products: Product[];
  productForm: FormGroup;


  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      product: [''],
      price: [''],
    });
  }

  ngOnInit() {
    this.authService.getProducts()
      .subscribe( data => {
        this.products = data;
      });
  }

  insertProduct() {
    this.authService.addProduct(this.productForm.value).subscribe((res) => {
      if (res) {
        this.productForm.reset();
      }
    });
  }

  deleteProduct(products: Product): void {
    this.authService.deleteProduct(products)
      .subscribe( data => {
        alert('Product deleted successfully');
        this.products = this.products.filter(u => u !== products);
      });
  }

}
