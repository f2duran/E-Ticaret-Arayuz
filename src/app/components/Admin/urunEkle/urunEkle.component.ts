import { UrunFoto } from './../../../models/UrunFoto';
import { UrunBilgisi } from './../../../models/UrunBilgisi';
import { Sonuc } from 'src/app/models/Sonuc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { KategoriBilgisi } from 'src/app/models/KategoriBilgisi';
import { MarkaBilgisi } from 'src/app/models/MarkaBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { UrunFotoDialogComponent } from '../../dialogs/urunFoto-dialog/urunFoto-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-urunEkle',
  templateUrl: './urunEkle.component.html',
  styleUrls: ['./urunEkle.component.css']
})
export class UrunEkleComponent implements OnInit {
  kategori: KategoriBilgisi;
  marka: MarkaBilgisi;
  frm: FormGroup;
  kategori_Id: number;
  marka_Id: number;
  secilenFoto: any;
  urunfoto: UrunFoto = new UrunFoto();
  securun: UrunBilgisi;
  ıd: string = "2e996901-7bd5-41e5-b222-90e6b4994144";

  fotoDialogRef: MatDialogRef<UrunFotoDialogComponent>

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;




  foto: UrunBilgisi = new UrunBilgisi();
  constructor(
    public apiservise: ApiService,
    public frmbuilder: FormBuilder,
    public matDialog: MatDialog,

  ) {
    this.frm = new FormGroup({
      urun_Adi: new FormControl(),
      kategori_Id: new FormControl(),
      marka_Id: new FormControl(),
      urun_Stok: new FormControl(),
      urun_Gelis_Fiyat: new FormControl(),
      urun_Satis_Fiyat: new FormControl(),
      urun_KDV: new FormControl(),
      urun_Aciklama: new FormControl()
    })
  }
  ngOnInit() {
    this.MarkaListele();
    this.KategoriListele();
  }
  MarkaListele() {
    this.apiservise.MarkaListe().subscribe((d: MarkaBilgisi) => {
      this.marka = d;
    });
  }
  KategoriListele() {
    this.apiservise.KategoriListe().subscribe((d: KategoriBilgisi) => {
      this.kategori = d;
    });
  }

  Kaydet(frm) {
    var urun: UrunBilgisi = new UrunBilgisi();
    urun.urun_Adi = frm.urun_Adi
    urun.urun_Kategori_Id = frm.kategori_Id
    urun.urun_Marka_Id = frm.marka_Id
    urun.urun_Stok = frm.urun_Stok
    urun.urun_Gelis_Fiyat = frm.urun_Gelis_Fiyat
    urun.urun_Satis_Fiyat = frm.urun_Satis_Fiyat
    urun.urun_KDV = frm.urun_KDV
    urun.urun_Aciklama = frm.urun_Aciklama
    urun.urunfoto = this.foto.urunfoto
    urun.urun_Admin_Bilgi = localStorage.getItem("uyeId")
    urun.urun_Eklenme_Tarih = new Date()


    if (urun) {
      //console.log(urun.urun_Admin_Bilgi);
      this.apiservise.UrunEkle(urun).subscribe((s: Sonuc) => {
        urun.urun_Id = s.mesaj;
        console.log(s);
        this.securun = urun;


        this.fotoDialogRef = this.matDialog.open(UrunFotoDialogComponent, {
          width: '400',
          data: this.securun
        });
        this.fotoDialogRef.afterClosed().subscribe(d => {
          console.log(this.securun);
          if (d) {
            d.urun_Foto_Urun_Id = urun.urun_Id
            this.apiservise.UrunFotoGuncelle(d).subscribe((s: Sonuc) => {
              // this.alert.AlertUygula(s);
              // if (s.islem) {
              //   this.UrunListele();
              // }
              console.log(s);
            })
          }
        })




      });
    } else {
      console.log("hata");
    };






  };




}
