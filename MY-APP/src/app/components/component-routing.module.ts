import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoreComponent } from './customer/customer-list/core.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product/product.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { UserListComponent } from './users-roles/user-list/user-list.component';
import { RoleListComponent } from './users-roles/role-list/role-list.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, children: [{ path: '', redirectTo: '/home/core', pathMatch: 'full' },
    { path: 'customer', component: CustomerComponent },
    { path: 'core', component: CoreComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product/core', component: ProductListComponent },
    { path: 'user/core', component: UserListComponent },
    { path: 'role/core', component: RoleListComponent },
    { path: 'form', component: FormComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
