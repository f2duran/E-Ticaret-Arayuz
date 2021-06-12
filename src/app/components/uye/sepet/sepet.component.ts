import { UrunBilgisi } from './../../../models/UrunBilgisi';

import { Component, OnInit, ViewChild } from '@angular/core';
import { SepetBilgisi } from 'src/app/models/SepetBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { SepetUrunBilgisi } from 'src/app/models/SepetUrunBilgisi';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.scss']
})
export class SepetComponent implements OnInit {

  sepeturun: SepetUrunBilgisi[]
  displayedColumns = ['urun_Adi', 'sepet_Urun_Fiyat', 'islemler'];
  UyeId: string = localStorage.getItem("uyeId");
  dataSource: any;

  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public apiservice: ApiService,
    public matdialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.SepetListele(this.UyeId)
  }
  SepetListele(UyeId: string) {

    this.apiservice.SepetUyeById(this.UyeId).subscribe((d: any = SepetBilgisi) => {
      this.sepeturun = d;
      this.dataSource = new MatTableDataSource(this.sepeturun);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }


  Sil(sepeturun: SepetUrunBilgisi) {
    this.dialogRefConfirm = this.matdialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = " Ürün Silinecektir Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiservice.SepetSil(sepeturun.sepet_Id).subscribe((s: Sonuc) => {
          console.log(s);
          this.SepetListele(this.UyeId);
        });
      }
    });
  }

  SepetFilter(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}

