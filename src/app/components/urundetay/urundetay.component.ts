import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.servis.UrunDetayById(urun_Id).subscribe((d: any = UrunBilgisi) => {
      this.urunler = d.urun_Id;
      console.log(d);
    })
  }
}
