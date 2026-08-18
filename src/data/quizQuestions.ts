import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "İslam dininde 'tövbe' ile 'istiğfar' kavramları arasındaki temel fark ve ilişki aşağıdakilerin hangisinde doğru açıklanmıştır?",
    options: [
      "İstiğfar ibadetlerin başında yerine getirilirken, tövbe sadece bayramlarda yapılan bir ibadettir.",
      "İstiğfar dille Allah'tan (cc) af dilemek, tövbe ise hatayı kalben terk edip O'na samimiyetle yönelmektir.",
      "İstiğfar kul hakkı içeren durumlarda başvurulan, tövbe ise yalnızca ibadet eksikliğinde yapılan duadır.",
      "İstiğfar sadece başkalarının yanında söylenirken, tövbe kimseye duyurmadan gizlice yapılan bir eylemdir."
    ],
    correctIndex: 1,
    explanation: "İstiğfar, kulun diliyle 'Estağfirullah' diyerek Allah'tan (cc) bağışlanma dilemesidir. Tövbe ise hatadan pişman olup vazgeçerek Allah'a (cc) yönelmektir.",
    sourceNote: "Temel Dinî Bilgiler: Hatalardan Arınma: Tövbe"
  },
  {
    id: 2,
    question: "Kur'an-ı Kerim'de Tahrîm Suresi 8. ayette emredilen ve 'içten, samimi ve hatayı bir daha yapmamaya kararlı olarak' yapılan tövbe türü aşağıdakilerden hangisidir?",
    options: [
      "Nasuh Tövbesi",
      "Geçici Tövbe",
      "Sözlü Tövbe",
      "Toplu Tövbe"
    ],
    correctIndex: 0,
    explanation: "Nasuh Tövbesi; gösterişten uzak, tam bir samimiyetle ve bir daha o hatayı işlememeye kararlı olarak yapılan içten tövbedir.",
    sourceNote: "Tahrîm Suresi, 8. Ayet"
  },
  {
    id: 3,
    question: "Peygamberimiz günahsız olmasına rağmen günde birçok kez istiğfar etmiştir. Peygamberimizin bu tutumunun temel gayesi aşağıdakilerden hangisidir?",
    options: [
      "İbadetlerin yalnızca belirli gün ve gecelerde kabul edilebileceğini insanlara ilan etmek",
      "Müslümanlara tövbe ve istiğfarı ilerleyen yaşlara ertelemeleri gerektiğini hatırlatmak",
      "Müminlere daima Allah'ı (cc) anmayı, kalbi arındırmayı ve kulluk şuurunu korumayı öğretmek",
      "İstiğfar etmenin yalnızca büyük hatalar işleyen kimselere yönelik bir ceza olduğunu belirtmek"
    ],
    correctIndex: 2,
    explanation: "Peygamberimiz daima istiğfar ederek Allah'a (cc) olan şükrünü göstermiş, bize de kalbimizi arındırma bilincini kazandırmıştır.",
    sourceNote: "Buhârî, Daavât, 3"
  },
  {
    id: 4,
    question: "Bir arkadaşının eşyasına zarar veren veya kalbini kıran bir öğrencinin tövbesinin geçerli olması için öncelikle hangi adımı atması gerekir?",
    options: [
      "Durumu hiç kimseye hissettirmeden unutturmaya çalışarak arkadaşından zamanla uzaklaşmak",
      "Yalnızca dua edip arkadaşına durumu açıklamaktan ve onunla yüzleşmekten çekinmek",
      "Yaptığı hatanın sorumluluğunu başkasına yükleyerek kendini her durumda haklı çıkarmak",
      "Arkadaşından özür dileyip zararını karşılayarak onunla helalleşmek ve Allah'tan (cc) af dilemek"
    ],
    correctIndex: 3,
    explanation: "Kul hakkı içeren hatalarda tövbenin geçerli olması için mağdur olan kişiden helallik almak, zararı gidermek ve ardından Allah'a (cc) tövbe etmek gerekir.",
    sourceNote: "Temel Dinî Bilgiler: Kul Hakkı ve Helalleşme"
  },
  {
    id: 5,
    question: "Yüce Allah'ın kullarının samimi pişmanlıklarını ve tövbelerini çokça kabul eden anlamına gelen esmaülhüsna ismi aşağıdakilerden hangisidir?",
    options: [
      "Halık",
      "Tevvab",
      "Samed",
      "Alim"
    ],
    correctIndex: 1,
    explanation: "Tevvab; kullarının tövbelerini kabul buyuran, pişmanlıklarını bağışlayan ve sonsuz merhamet sahibi olan Yüce Allah'ın güzel ismidir.",
    sourceNote: "Esmaülhüsna"
  },
  {
    id: 6,
    question: "Hata yaptıktan sonra tövbe eden bir Müslümanın Allah'ın (cc) affına yönelik taşıması gereken en doğru tutum hangisidir?",
    options: [
      "Allah'ın (cc) bağışlayıcılığına güvenip hatasını düzeltmek için içtenlikle gayret göstermek",
      "Allah'ın (cc) rahmetinden ümidini kesip ibadetleri tamamen terk eden karamsar bir hale girmek",
      "Yaptığı hatanın önemsiz olduğunu savunup hiçbir pişmanlık duymadan hayatına devam etmek",
      "Tövbe ettikten sonra bir daha hiçbir sorumluluk üstlenmeyip her şeyi tamamen akışına bırakmak"
    ],
    correctIndex: 0,
    explanation: "Müslüman, Allah'ın (cc) rahmet ve mağfiretinden asla ümidini kesmez. Tövbe ederek kalbini temizler ve iyi ameller işlemeye gayret eder.",
    sourceNote: "Zümer Suresi, 53. Ayet"
  },
  {
    id: 7,
    question: "Peygamberimiz: 'Günahından samimiyetle tövbe eden kimse, ... gibidir.' buyurmuştur. Hadisteki boşluğa gelmesi gereken en uygun ifade hangisidir?",
    options: [
      "dünyadan tamamen el çekmiş",
      "insanlardan bütünüyle uzaklaşmış",
      "hiç günah işlememiş",
      "kendi içine kapanmış"
    ],
    correctIndex: 2,
    explanation: "Peygamberimiz: 'Günahından samimiyetle tövbe eden kimse, sanki hiç günah işlememiş gibidir.' buyurarak tövbenin arındırıcı gücünü müjdelemiştir.",
    sourceNote: "İbn Mâce, Zühd, 30"
  },
  {
    id: 8,
    question: "Aşağıdaki tutumlardan hangisi samimi bir tövbenin temel şartları ve göstergeleri arasında <u>yer almaz</u>?",
    options: [
      "İşlenen yanlış davranıştan dolayı kalpte derin bir pişmanlık ve üzüntü hissetmek",
      "Kötü davranışı, zararlı alışkanlığı ve ona götüren ortamı kararlılıkla terk etmek",
      "Bir daha aynı hataya dönmemek üzere güçlü bir irade ve azim ortaya koymak",
      "Aynı hatayı bilerek ve önemsemeyerek bir alışkanlık halinde sürdürmeye devam etmek"
    ],
    correctIndex: 3,
    explanation: "Tövbenin özü, hatada ısrar etmemek ve ondan uzak durmaktır. Hatayı sürdürmek samimi tövbe bilinciyle bağdaşmaz.",
    sourceNote: "Temel Dinî Bilgiler: Tövbenin Özü"
  },
  {
    id: 9,
    question: "Hatasından dönüp tövbe eden bir kimse, ruhunu arındırmak ve manevi dengesini kurmak için öncelikle ne yapmalıdır?",
    options: [
      "Sosyal çevresinden tamamen kopup sessizce kendi kabuğuna çekilmeyi tercih etmek",
      "İşlediği yanlışın ardından vakit kaybetmeden güzel bir iyilik ve faydalı iş yapmak",
      "Geçmişte yaptığı hataları arkadaş ortamlarında övünerek başkalarına anlatmak",
      "Kendisine olan inancını bütünüyle yitirip günlük sorumluluklarını yerine getirmemek"
    ],
    correctIndex: 1,
    explanation: "Peygamberimiz: 'Bir kötülüğün peşinden hemen bir iyilik yap ki onu silsin, yok etsin.' buyurmuştur.",
    sourceNote: "Tirmizî, Birr, 55"
  },
  {
    id: 10,
    question: "Diliyle 'Estağfirullah' zikrini söyleyen bir Müslüman, bu sözüyle Yüce Allah'tan temel olarak ne talep etmektedir?",
    options: [
      "Dünyada hiçbir kurala ve sorumluluğa bağlı kalmadan serbestçe yaşamayı",
      "Yaptığı hataların diğer insanlar tarafından hiçbir zaman fark edilmemesini",
      "Kusurlarından dolayı Yüce Allah'tan bağışlanma, af ve merhamet dilemeyi",
      "Hiçbir emek ve çaba harcamadan tüm isteklerine zahmetsizce ulaşabilmeyi"
    ],
    correctIndex: 2,
    explanation: "'Estağfirullah', 'Allah'tan (cc) bağışlanma ve af dilerim' anlamına gelen temel bir istiğfar ifadesidir.",
    sourceNote: "Temel Dinî Bilgiler: İstiğfar Bilinci"
  },
  {
    id: 11,
    question: "İslam anlayışına göre hata yapıldığında tövbe etmeyi ertelememek ve acele davranmak niçin önemlidir?",
    options: [
      "Kalpte manevi kir ve leke oluşmasını önleyip arınmayı geciktirmemek için",
      "Sadece çevredeki insanların beğenisini ve takdirini hızlıca toplamak için",
      "Toplum içerisinde hiç hata yapmayan kusursuz biri izlenimi vermek için",
      "Gelecekte hiçbir kurala uymak zorunda kalmamak amacıyla hareket etmek için"
    ],
    correctIndex: 0,
    explanation: "Hatanın hemen ardından tövbe etmek, kalbin kararmasını önler ve insanı daima manevi olarak diri tutar.",
    sourceNote: "Temel Dinî Bilgiler: Tövbede Acele Etmek"
  },
  {
    id: 12,
    question: "Peygamberimiz tövbenin özünü ve kalpteki yerini belirtirken hangi temel ilkeyi buyurmuştur?",
    options: [
      "Tövbe sadece sözlü bir tekrardır.",
      "Tövbe zamanın akışına bırakmaktır.",
      "Pişmanlık duymak, tövbenin ta kendisidir.",
      "Tövbe hatayı başkasına yüklemektir."
    ],
    correctIndex: 2,
    explanation: "Peygamberimiz: 'Pişmanlık duymak, tövbenin ta kendisidir.' buyurarak tövbenin temelinin kalpteki samimi pişmanlık olduğunu vurgulamıştır.",
    sourceNote: "İbn Mâce, Zühd, 30"
  },
  {
    id: 13,
    question: "Kul hakkı içeren bir hata yapan kişinin tövbesinde aşağıdaki adımlardan hangisinin bulunması zorunludur?",
    options: [
      "Hak sahibine hakkını eksiksiz teslim edip ondan içtenlikle helallik istemek",
      "Olayı zamana bırakıp hak sahibi kişiyle hiçbir şekilde iletişim kurmamak",
      "Yalnızca gizlice dua edip haksızlığa uğrayan kişiye durumu hiç bildirmemek",
      "Yapılan haksızlığı örtbas etmek için konuyu sürekli başka yönlere çekmek"
    ],
    correctIndex: 0,
    explanation: "Kul hakkı söz konusu olduğunda, doğrudan hak sahibiyle helalleşmek ve mağduriyeti gidermek tövbenin vazgeçilmez şartıdır.",
    sourceNote: "Temel Dinî Bilgiler: Kul Hakkı"
  },
  {
    id: 14,
    question: "Tövbe eden bir müminin Yüce Allah'a yönelirken kalbinde dengede tutması gereken iki duygu aşağıdakilerden hangisidir?",
    options: [
      "Kibir ve bencillik duyguları",
      "Korku ve ümit (havf ve reca) duyguları",
      "Karamsarlık ve umursamazlık duyguları",
      "Öfke ve hırs duyguları"
    ],
    correctIndex: 1,
    explanation: "Mümin; Yüce Allah'ın azabından çekinme (korku / havf) ve O'nun sonsuz rahmetine sığınma (ümit / reca) duygularını kalbinde dengede tutar.",
    sourceNote: "Temel Dinî Bilgiler: Havf ve Reca"
  },
  {
    id: 15,
    question: "Aşağıdaki davranışlardan hangisi 'Nasuh Tövbesi' bilincine sahip bir öğrencinin sergileyeceği en olgun tutumdur?",
    options: [
      "Birkaç gün sonra aynı yanlışı bilerek tekrar etmeyi son derece doğal karşılamak",
      "Hatasından dolayı sürekli çevresini suçlayıp bahanelerin arkasına sığınmak",
      "Yaptığı yanlışı önemsemeyip büyüklerinin ve öğretmenlerinin uyarılarına kulak tıkamak",
      "Hatasından samimiyetle ders çıkarıp o yanlışa bir daha dönmemeye kararlı olmak"
    ],
    correctIndex: 3,
    explanation: "Nasuh Tövbesi, hatadan kesin bir iradeyle vazgeçmeyi ve bir daha o hataya dönmemeyi gerektirir.",
    sourceNote: "Temel Dinî Bilgiler: Nasuh Tövbesi"
  }
];
