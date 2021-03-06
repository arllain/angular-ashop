import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id = null;

  constructor(
    private router: Router,
    private activetedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getCategories();
    this.id = this.activetedRoute.snapshot.paramMap.get('id');
    if (this.id) {
       this.productService.get(this.id).valueChanges().subscribe(p => this.product = p);
    }

  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product ?')) {
       this.productService.delete(this.id);
       this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
