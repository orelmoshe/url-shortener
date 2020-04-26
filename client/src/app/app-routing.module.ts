import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { shortenerUrlComponent } from './components/shortener-url/shortener-url.component';


const routes: Routes = [
  { path: "", component: shortenerUrlComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
