import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { KategoriBilgisi } from 'src/app/models/KategoriBilgisi';
import { Sonuc } from 'src/app/models/Sonuc';
import { UrunBilgisi } from 'src/app/models/UrunBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-urunListele',
  templateUrl: './urunListele.component.html',
  styleUrls: ['./urunListele.component.css']
})
export class UrunListeleComponent implements OnInit {
  urunler: UrunBilgisi[];
  dataSource: any;
  kategori_Id: string
  kategori!: KategoriBilgisi[];
  seckatıd: string;

  // dialogRef: MatDialogRef<KategoriDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  displayedColumns = ['urun_Foto1', 'UrunId', 'urun_Adi', 'urun_Satis_Fiyat', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public servis: ApiService,
    public matdialog: MatDialog,
    public route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.UrunListele();
    this.route.params.subscribe(p => {
      if (p) {
        this.kategori_Id = p.kategori_Id;
        //  this.UrunKatByListele(this.kategori_Id);
        console.log(this.kategori_Id)
      }

    })
  }
  UrunListele() {
    this.servis.UrunListele().subscribe((d: any = UrunBilgisi) => {
      this.urunler = d;

      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  DetayYonlendir() {
    location.href = ("/kategoriurunliste/" + this.kategori_Id)
  }

  Sil(UrunBilgisi: UrunBilgisi) {
    this.dialogRefConfirm = this.matdialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = UrunBilgisi.urun_Adi + " Ürünü Silinecektir Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.servis.UrunSil(UrunBilgisi.urun_Id).subscribe((s: Sonuc) => {
          alert(s.mesaj);
          this.UrunListele();
        });
      }
    });
  }
}
