import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SepetBilgisi } from 'src/app/models/SepetBilgisi';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-satılan',
  templateUrl: './satılan.component.html',
  styleUrls: ['./satılan.component.scss']
})
export class SatılanComponent implements OnInit {
  satılan: SepetBilgisi[];
  dataSource: any;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  displayedColumns = ['urunfoto', 'satis_Urun_Id', 'satis_Top_Fiyat', 'islemler'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public servis: ApiService,
    public matdialog: MatDialog
  ) { }
  ngOnInit() {
    this.MarkaListele();
  }
  MarkaListele() {
    this.servis.SepetListe().subscribe((d: any = SepetBilgisi) => {
      this.satılan = d;
      this.dataSource = new MatTableDataSource(this.satılan);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  Sil(SatisBilgisi: SepetBilgisi) {
    this.dialogRefConfirm = this.matdialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = SatisBilgisi.sepet_Id + " Id'ye Sahip Sepet Silinecektir Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.servis.SepetSil(SatisBilgisi.sepet_Id).subscribe((s: Sonuc) => {
          console.log(s);
          this.MarkaListele();
        });
      }
    });
  }
}

