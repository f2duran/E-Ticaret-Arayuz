import { UrunBilgisi } from './../../models/UrunBilgisi';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SepetBilgisi } from 'src/app/models/SepetBilgisi';

@Component({
  selector: 'app-kategoriurunliste',
  templateUrl: './kategoriurunliste.component.html',
  styleUrls: ['./kategoriurunliste.component.css']
})
export class KategoriurunlisteComponent implements OnInit {
  urunler: UrunBilgisi;
  kategori_Id: string
  constructor(
    public servis: ApiService,
    public route: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.kategori_Id = p.kategori_Id;
        this.UrunKatByListele(this.kategori_Id);
      }

    })
  }
  SepeteEkle(urun: UrunBilgisi) {
    var sepetbilgi: SepetBilgisi = new SepetBilgisi();
    sepetbilgi.sepet_Uye_Id = localStorage.getItem("uyeId");
    sepetbilgi.sepet_Urun_Id = urun.urun_Id;
    sepetbilgi.sepet_Urun_Fiyat = urun.urun_Satis_Fiyat;
    if (sepetbilgi) {
      this.servis.SepetEkle(sepetbilgi).subscribe(d => {
        console.log("Sepete Eklendi");
        console.log(sepetbilgi);
      })
    }
  }
  UrunKatByListele(kategori_Id) {
    this.servis.UrunKatById(kategori_Id).subscribe((d: UrunBilgisi) => {
      this.urunler = d;
    })
  }


}
