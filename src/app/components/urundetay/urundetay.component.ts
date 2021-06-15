import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SepetBilgisi } from 'src/app/models/SepetBilgisi';
import { UrunBilgisi } from 'src/app/models/UrunBilgisi';
import { UrunDetay } from 'src/app/models/urunDetay';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urundetay',
  templateUrl: './urundetay.component.html',
  styleUrls: ['./urundetay.component.scss']
})
export class UrundetayComponent implements OnInit {
  urunler: UrunDetay[];
  urun_Id: string;
  urun_Adi: string;
  constructor(
    public servis: ApiService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p) {
        this.urun_Id = p.urun_Id;
        this.UrunDetay(this.urun_Id);
      }
    })
  }
  UrunDetay(urun_Id) {
    this.servis.UrunDetayById(urun_Id).subscribe((d: any = UrunDetay) => {
      this.urunler = d;
      console.log(d);
    })
  }
  SepeteEkle(Urunler: UrunDetay) {
    var sepetbilgi: SepetBilgisi = new SepetBilgisi();
    sepetbilgi.sepet_Uye_Id = localStorage.getItem("uyeId");
    sepetbilgi.sepet_Urun_Id = Urunler.urun_Id;
    sepetbilgi.sepet_Urun_Fiyat = Urunler.urun_Satis_Fiyat;
    if (sepetbilgi) {
      this.servis.SepetEkle(sepetbilgi).subscribe(d => {
        alert("Sepete Eklendi");
        console.log(sepetbilgi);
      })
    }
  }
}
