import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrunBilgisi } from 'src/app/models/UrunBilgisi';
import { UrunFoto } from 'src/app/models/UrunFoto';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urunFoto-dialog',
  templateUrl: './urunFoto-dialog.component.html',
  styleUrls: ['./urunFoto-dialog.component.scss']
})
export class UrunFotoDialogComponent implements OnInit {
  secilenFoto: any;
  UrunFoto: UrunFoto = new UrunFoto();
  secUrun: UrunBilgisi;
  constructor(
    public dialogRef: MatDialogRef<UrunFotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) {
    this.secUrun = this.data
  }
  ngOnInit() {
  }
  FotoSec(e) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onloadend = () => {
      this.secilenFoto = fr.result;
      this.UrunFoto.urun_Foto_data = fr.result.toString();
      this.UrunFoto.urun_Foto_Uzanti = foto.type;
    };
    fr.readAsDataURL(foto);
  }
}