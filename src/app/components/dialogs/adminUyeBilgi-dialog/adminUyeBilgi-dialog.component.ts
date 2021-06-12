import { UyeBilgisi } from './../../../models/UyeBilgisi';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adminUyeBilgi-dialog',
  templateUrl: './adminUyeBilgi-dialog.component.html',
  styleUrls: ['./adminUyeBilgi-dialog.component.scss']
})
export class AdminUyeBilgiDialogComponent implements OnInit {
  dialogBaslik: string;
  islem: string;
  yeniKayit: UyeBilgisi;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AdminUyeBilgiDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder
  ) {
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Kategori Ekle";
      this.yeniKayit = new UyeBilgisi();
    }
    if (this.islem == 'duzenle') {
      this.dialogBaslik = "Admin Duzenle";
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() {
    return this.frmBuild.group({
      uye_Admin_Bilgisi: [this.yeniKayit.uye_Admin_Bilgisi]
    });
  }
}

