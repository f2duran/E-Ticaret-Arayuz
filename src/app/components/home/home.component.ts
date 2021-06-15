import { Sonuc } from './../../models/Sonuc';
import { SepetBilgisi } from './../../models/SepetBilgisi';
import { Component, OnInit } from '@angular/core';
import { UrunBilgisi } from 'src/app/models/UrunBilgisi';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  urunbilgi!: UrunBilgisi[];
  constructor(
    public servis: ApiService,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UrunListele();
  }

  SepeteEkle(urun: UrunBilgisi) {
    var sepetbilgi: SepetBilgisi = new SepetBilgisi();
    sepetbilgi.sepet_Uye_Id = localStorage.getItem("uyeId");
    sepetbilgi.sepet_Urun_Id = urun.urun_Id;
    sepetbilgi.sepet_Urun_Fiyat = urun.urun_Satis_Fiyat;
    if (sepetbilgi) {
      this.servis.SepetEkle(sepetbilgi).subscribe(d => {
        alert("Sepete Eklendi");
        console.log(sepetbilgi);
      })
    }
  }
  UrunListele() {
    this.servis.UrunListele().subscribe((d: UrunBilgisi[]) => {
      this.urunbilgi = d;
    })
  }


}
