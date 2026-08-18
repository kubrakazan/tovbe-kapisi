import { StoryScene } from '../types';

export const STORY_SCENES: StoryScene[] = [
  {
    id: 1,
    title: "1. Bölüm",
    character: "",
    imageIcon: "MessageSquareWarning",
    situation: "Yusuf, okulda çok yakın arkadaşı Ali'nin kendisine güvenerek paylaştığı kişisel bir sırrı teneffüste diğer arkadaşlarının ısrarı üzerine istemeden ağzından kaçırdı. Akşam eve döndüğünde Ali'nin bu duruma ne kadar kırıldığını ve aralarındaki güvenin zedelendiğini hissetti. Kalbinde derin bir vicdani huzursuzluk duydu.",
    question: "Bu aşamada Yusuf'un sergilemesi gereken en erdemli ve doğru tutum hangisidir?",
    choices: [
      {
        id: "A",
        text: "Hatasını önemsemeyip zamana bırakarak arkadaşıyla hiçbir şey olmamış gibi konuşmaya devam etmek",
        isBestChoice: false,
        points: 0,
        feedback: "Yanlış Yaklaşım: Yapılan hatayı küçük görmek veya sıradanlaştırmak, vicdani duyarlılığı azaltır ve hatayı tekrarlatır.",
        moralLesson: "Mümin, küçük de olsa bir hatayı fark ettiğinde hemen düzeltmeye çalışan kimsedir."
      },
      {
        id: "B",
        text: "Hatasını kabul edip pişmanlık duymak, Ali'den özür dileyip helallik istemek ve Allah'tan (cc) af dilemek",
        isBestChoice: true,
        points: 25,
        feedback: "Doğru Karar: Yusuf hem kalbiyle pişman oldu, hem arkadaşının hakkını gözetip helallik istedi, hem de Allah'a (cc) yöneldi.",
        moralLesson: "Tövbenin temeli samimi pişmanlık, helalleşme ve Allah'tan (cc) af dilemektir."
      },
      {
        id: "C",
        text: "Sırrı başkasının yaydığını iddia edip yalan söyleyerek suçu sınıftaki başka birinin üzerine atmak",
        isBestChoice: false,
        points: 0,
        feedback: "Hatalı Yaklaşım: Bir yanlışı yalan veya iftira ile örtbas etmeye çalışmak durumu çok daha kötü hale getirir.",
        moralLesson: "Doğruluk ve dürüstlük erdemdir; hatayı dürüstçe kabul etmek ise olgunluktur."
      }
    ]
  },
  {
    id: 2,
    title: "2. Bölüm",
    character: "",
    imageIcon: "Handshake",
    situation: "Ertesi gün Yusuf, Ali'nin yanına gitti. Ali kırgın bir şekilde 'Sana çok güvenmiştim Yusuf, neden böyle yaptın?' dedi. Yusuf'un önünde iki yol vardı: Bahane üretmek veya içtenlikle durumu telafi etmek.",
    question: "Yusuf, kul hakkından arınmak ve durumu düzeltmek için nasıl davranmalıdır?",
    choices: [
      {
        id: "A",
        text: "Yaptığı hatayı açıkça kabul edip Ali'den samimiyetle özür dilemek ve durumu düzelterek helallik istemek",
        isBestChoice: true,
        points: 25,
        feedback: "Doğru Davranış: Yusuf hem samimi bir özür diledi, hem sorumluluk aldı, hem de helallik diledi.",
        moralLesson: "Kul hakkından arınmak, zararı giderme gayreti ve samimi helalleşme ile tamamlanır."
      },
      {
        id: "B",
        text: "Ali'ye geçmişte yaptığı benzer bir hatayı hatırlatarak karşılıklı olarak ödeştiklerini öne sürmek",
        isBestChoice: false,
        points: 0,
        feedback: "Hatalı Tutum: Kötülüğe kötülükle veya geçmişi kurcalayarak karşılık vermek dostluk kapısını kapatır.",
        moralLesson: "İki yanlış bir doğru etmez; tövbe eden kişi kendi nefsini hesaba çeker."
      },
      {
        id: "C",
        text: "Hiçbir şey konuşmadan sadece hediye vererek konunun konuşulmadan kendiliğinden kapanmasını beklemek",
        isBestChoice: false,
        points: 0,
        feedback: "Yetersiz Yaklaşım: İçten bir özür ve helallik isteme olmaksızın geçiştirmek gerçek bir telafi sağlamaz.",
        moralLesson: "Manevi kırgınlıklar ancak içten bir pişmanlık ve helalleşme ile iyileşir."
      }
    ]
  },
  {
    id: 3,
    title: "3. Bölüm",
    character: "",
    imageIcon: "HeartHandshake",
    situation: "Ali, Yusuf'un samimiyetini görerek onu bağışladı ve aralarındaki arkadaşlık bağı yeniden güçlendi. Yusuf odasına çekildiğinde, bir daha asla emanete hıyanet etmemek ve insanların sırlarını korumak için Rabbine yöneldi.",
    question: "Yusuf'un bu tövbesini samimi bir 'Nasuh Tövbesi' kılan en temel adım nedir?",
    choices: [
      {
        id: "A",
        text: "Olay tatlıya bağlandığı için artık durumu hiç düşünmeyip günlük yaşantısına dikkatsizce devam etmek",
        isBestChoice: false,
        points: 0,
        feedback: "Eksik Bakış: Geleceğe dönük bir kararlılık ve manevi muhasebe olmazsa aynı hataya tekrar düşülür.",
        moralLesson: "Tövbe, geçmişi temizlerken geleceğe de güzel bir istikamet çizmektir."
      },
      {
        id: "B",
        text: "Yalnızca affedildiğini düşünüp kendisini her türlü kusurdan ve hatadan tamamen uzak ve üstün görmek",
        isBestChoice: false,
        points: 0,
        feedback: "Kibir Tehlikesi: İnsanın kendisini kusursuz görmesi manevi gelişime ve olgunluğa engeldir.",
        moralLesson: "Mümin daima mütevazı ve Allah'a (cc) karşı samimi olmalıdır."
      },
      {
        id: "C",
        text: "Allah'a (cc) şükredip istiğfar etmek ve bir daha asla başkalarının sırrını yaymamaya kesin karar vermek",
        isBestChoice: true,
        points: 25,
        feedback: "Tebrikler: Yusuf tövbenin bütün şartlarını samimiyetle yerine getirdi.",
        moralLesson: "Allah (cc) tövbe edip güzel davranışlar sergileyen kullarını sever ve affeder."
      }
    ]
  }
];
