import { UrunListeleComponent } from './components/Admin/urunListele/urunListele.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrunEkleComponent } from './components/Admin/urunEkle/urunEkle.component';
import { LoginComponent } from './components/login/login/login.component';
import { SepetComponent } from './components/uye/sepet/sepet.component';
import { KategorieklelisteleComponent } from './components/Admin/kategorieklelistele/kategorieklelistele.component';
import { MarkaeklelisteleComponent } from './components/Admin/markaeklelistele/markaeklelistele.component';
import { SatılanComponent } from './components/Admin/satılan/satılan.component';
import { RegisterComponent } from './components/login/register/register.component';
import { UyeIslemleriComponent } from './components/Admin/uyeIslemleri/uyeIslemleri.component';
import { HesabımComponent } from './components/uye/hesabım/hesabım.component';
import { KategoriurunlisteComponent } from './components/kategoriurunliste/kategoriurunliste.component';
import { UrundetayComponent } from './components/urundetay/urundetay.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'sepet',
    component: SepetComponent
  },
  {
    path: 'hesabım',
    component: HesabımComponent
  },
  {
    path: 'kategoriurunliste/:kategori_Id',
    component: KategoriurunlisteComponent
  },
  {
    path: 'urundetay/:urun_Id',
    component: UrundetayComponent
  },




  {
    path: 'admin/kategorieklelistele',
    component: KategorieklelisteleComponent
  },
  {
    path: 'admin/markaeklelistele',
    component: MarkaeklelisteleComponent
  },
  {
    path: 'admin/satılan',
    component: SatılanComponent
  },
  {
    path: 'admin/urunlistele',
    component: UrunListeleComponent
  },
  {
    path: 'admin/urunekle',
    component: UrunEkleComponent
  },
  {
    path: 'admin/uyeislemleri',
    component: UyeIslemleriComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
