import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { UyeBilgisi } from 'src/app/models/UyeBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { AdminUyeBilgiDialogComponent } from '../../dialogs/adminUyeBilgi-dialog/adminUyeBilgi-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-uyeIslemleri',
  templateUrl: './uyeIslemleri.component.html',
  styleUrls: ['./uyeIslemleri.component.scss']
})
export class UyeIslemleriComponent implements OnInit {
  uyeler: UyeBilgisi[];
  dataSource: any;
  displayedColumns = ['uye_Id', 'uye_Ad_Soyad', 'uye_E_Mail', 'islemler'];
  dialogRef: MatDialogRef<AdminUyeBilgiDialogComponent>;

  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public servis: ApiService,
    public matdialog: MatDialog,
  ) { }
  ngOnInit() {
    this.UyeListele();
  }
  UyeListele() {
    this.servis.UyeListele().subscribe((d: any = UyeBilgisi) => {
      this.uyeler = d;
      this.dataSource = new MatTableDataSource(this.uyeler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }


  Sil(kayit: UyeBilgisi) {
    this.dialogRefConfirm = this.matdialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.uye_Ad_Soyad + " Adlı Üye Silinecektir Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.servis.UyeSil(kayit.uye_Id).subscribe((s: Sonuc) => {
          console.log(s);
          this.UyeListele();
        });
      }
    });
  }

  AdminYap(kayit: UyeBilgisi) {
    this.dialogRef = this.matdialog.open(AdminUyeBilgiDialogComponent, {
      width: '500px',
      data: {
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
      kayit.uye_Admin_Bilgisi = d.uye_Admin_Bilgisi;
      if (d) {
        this.servis.UyeDuzenle(kayit).subscribe((s: Sonuc) => {
          console.log(s);
          this.UyeListele();
        });
      }
    });
  }


  UyeFiltrele(e) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}



