export class SepetUrunBilgisi {
     sepet_Id: string
     sepet_Uye_Id: string
     sepet_Urun_Id: string
     sepet_Urun_Fiyat: 0
     uyebilgi: {
          uye_Id: string;
          uye_Ad_Soyad: string;
          uye_E_Mail: string;
          uye_Sifre: string;
          uye_Adres_Bilgisi: string;
          uye_Admin_Bilgisi: boolean;
     }
     urunbilgi: {
          urun_Id: string
          urun_Marka_Id: string
          urun_Kategori_Id: string
          urun_Adi: string
          urun_Gelis_Fiyat: number
          urun_Satis_Fiyat: number
          urun_Stok: number
          urun_Eklenme_Tarih: Date
          urun_KDV: number
          urun_Satılan: number
          urun_İmage: string
          urun_Admin_Bilgi: string
          urun_Aciklama: string
          urunfoto: string
          urunfoto1: string
          urunfoto2: string
          markabilgi: {
               marka_Id: string;
               marka_Adi: string;
          }
          kategoribilgi: {
               kategori_Id: string;
               kategori_Adi: string;
          }

     }
}




