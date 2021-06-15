import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sonuc } from 'src/app/models/Sonuc';
import { UyeBilgisi } from 'src/app/models/UyeBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-hesabım',
  templateUrl: './hesabım.component.html',
  styleUrls: ['./hesabım.component.scss']
})
export class HesabımComponent implements OnInit {
  UyeId: string = localStorage.getItem("uyeId");
  uye_Ad_Soyad: string;
  uye_E_Mail: string;
  uye_Admin_Bilgisi: boolean
  uye_Sifre: string
  uye_Adres_Bilgisi: string
  frmsifre: FormGroup;
  frmadres: FormGroup;
  d: UyeBilgisi
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiservis: ApiService,
    public frmbuilder: FormBuilder,
    public alert: MyAlertService,
  ) {
    this.frmsifre = new FormGroup({
      uye_Sifre: new FormControl(),
      uye_Adres_Bilgisi: new FormControl()
    });
    this.frmadres = new FormGroup({
      uye_Adres_Bilgisi: new FormControl()
    })
  }

  ngOnInit() {
    this.UyeGetir()
  }

  UyeGetir() {
    this.apiservis.UyeById(this.UyeId).subscribe((d: UyeBilgisi) => {
      this.uye_Ad_Soyad = d.uye_Ad_Soyad;
      this.uye_E_Mail = d.uye_E_Mail;
      this.uye_Sifre = d.uye_Sifre
      this.uye_Admin_Bilgisi = d.uye_Admin_Bilgisi
      this.uye_Adres_Bilgisi = d.uye_Adres_Bilgisi
    })
  }

  SifreYenile(frmsifre) {

    var uye: UyeBilgisi = new UyeBilgisi();
    uye.uye_Id = this.UyeId
    uye.uye_Sifre = frmsifre.uye_Sifre
    uye.uye_Ad_Soyad = this.uye_Ad_Soyad
    uye.uye_E_Mail = this.uye_E_Mail
    uye.uye_Adres_Bilgisi = this.uye_Adres_Bilgisi
    uye.uye_Admin_Bilgisi = this.uye_Admin_Bilgisi

    if (uye) {
      this.apiservis.UyeDuzenle(uye).subscribe((s: Sonuc) => {
        this.alert.AlertUygula(s);
        location.href = "/hesabım"

      });
    } else {
      console.log("hata");
    };
  };

  AdresGuncelle(frmadres) {

    var uye: UyeBilgisi = new UyeBilgisi();
    uye.uye_Id = this.UyeId
    uye.uye_Sifre = this.uye_Sifre
    uye.uye_Ad_Soyad = this.uye_Ad_Soyad
    uye.uye_E_Mail = this.uye_E_Mail
    uye.uye_Adres_Bilgisi = frmadres.uye_Adres_Bilgisi
    uye.uye_Admin_Bilgisi = this.uye_Admin_Bilgisi

    if (uye) {
      this.apiservis.UyeDuzenle(uye).subscribe((s: Sonuc) => {
        //this.alert.AlertUygula(s);
        location.href = "/hesabım"
      });
    } else {
      console.log("hata");
    };
  };

}

