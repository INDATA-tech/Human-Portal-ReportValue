import { Client, Databases } from "node-appwrite";

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // fetch('files/dosya.txt')
  //     .then(response => response.text())
  //     .then(data => {
  //         const satirlar = data.split('\n'); // Satırları ayır
  //         console.log(satirlar[0]); // İlk satırı yazdır
  //         // Burada istediğiniz satırı `satirlar[index]` ile alabilirsiniz
  //     })
  //     .catch(error => console.error('Dosya okunamadı:', error));

  function getAllGates(jsonData) {
    let gates = [];

    // Personality kısmındaki gate değerlerini diziye ekle
    Object.values(jsonData.Personality).forEach((item) => {
      gates.push(String(item.Gate));
    });

    // Design kısmındaki gate değerlerini diziye ekle
    Object.values(jsonData.Design).forEach((item) => {
      gates.push(String(item.Gate));
    });

    return gates;
  }

  function Map2SektorName(sektorName) {
    if (sektorName == "Teknoloji") {
      return "tech";
    } else if (sektorName == "Perakende") {
      return "retail";
    } else if (sektorName == "Moda ve Hazır Giyim") {
      return "dress";
    } else if (sektorName == "Otomotiv") {
      return "auto";
    } else if (sektorName == "Sağlık ve İlaç") {
      return "health";
    } else if (sektorName == "Mutfak Sanatları") {
      return "meal";
    } else if (sektorName == "Diğer") {
      return "other";
    } else {
      return sektorName;
    }
  }

  function siralaValueUzunlugunaGore(gates) {
    // 1. Adım: value değerlerini bir diziye al
    const valueSiralama = gates.map((gate) => gate.value.length);

    // 2. Adım: valueSiralama dizisini sırala
    valueSiralama.sort((a, b) => a - b);

    // 3. Adım: Sıralanmış dizine göre orijinal veriyi sıralayalım
    const siraliGates = gates.sort((a, b) => {
      const aIndex = valueSiralama.indexOf(a.value.length);
      const bIndex = valueSiralama.indexOf(b.value.length);
      return bIndex - aIndex;
    });

    console.log(siraliGates);
    // 4. Adım: Sıralanmış veriyi döndür
    return siraliGates;
  }
  // Why not try the Appwrite SDK?
  //
  const client = new Client()
    .setEndpoint("https://appwrite.anahtarsensin.com/v1")
    .setProject("665474aa001cd7ecbebd") //process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(
      "c4aa87b551e3aa52c257f74c13a80f6d2bdc6d9e3ef0c7696d05fd4241956e94915f2746aaabe9311f04ef10c0571b0503c3e6ad60f0323a440a660d1beb5d5716157030bd25a7478fcbec0835083eb2b09c313df0c9ce56c334c01e7dbea72522d6783d93bb935a6be15ca4efb8e76f4e9aa965dd6589c92ce74d455bff382e",
    ); //process.env.APPWRITE_API_KEY)
  var database = new Databases(client);
  //log(req.body);
  var answers = await database.getDocument(
    "65dc57b1e8322b0426ae",
    "65e97978db53e3998c12",
    String(req),
  );
  var processedData = JSON.parse(answers.ProcessedData);
  var rawData = JSON.parse(answers.RawData);

  var api = processedData.api;
  var usergates = getAllGates(api);

  var hollandData = processedData.holland;
  var big5Data = processedData.big5;
  var aiData = processedData.ai;
  var teamworkData = processedData.teamwork;
  var lifestyleData = processedData.api.Properties.Type;
  var communicationData = processedData.api.Properties.Type;
  var worklearnData = api.Properties.Definition;
  var is_y_rData = api.Properties.Profile;
  var decision_strategyData = {
    strategy:
      strategy
        ?.find((x) => x.name === api.Properties.Strategy[0])
        ?.value?.find((y) => y.name === api.Properties.InnerAuthority[0])
        ?.value ?? api.Properties.Strategy[0],
    innerAuthority: api.Properties.InnerAuthority[0],
    sectorName: Map2SektorName(
      Object.entries(rawData).find(
        (x) => x[0] == "İlgilendiğin-İçinde Olduğun Sektör",
      )[1],
    ),
  };

  hollandData.sort((a, b) => b.value - a.value);
  big5Data.sort((a, b) => b.value - a.value);
  var type = [
    {
      name: "Manifesting Generator",
      value: `İş dünyasında ve kariyerinde kendine has ve benzersiz bir enerjin var. İşleri halletmede, bir şeyler inşa etmede ve büyütmede harikasın. Enerjini yapmayı sevdiğin işlere kullandıktan sonra başını yastığa koyduğunda bir bebek gibi uyuyabilirsin. \n\nHayatta ve işte tatmininin anahtarı sadece çok çalışmak değil, enerjini nasıl etkili ve verimli kullandığın. Yaptığın iş refahın ve esenliğin için çok önemli. İçinde harekete geçmene ve bir şeyler yaratmana yardımcı olan güçlü bir enerji kaynağın var. \n\nBirçoğumuz bir şeyleri başlatmamız gerektiğine inandırılarak büyüdük, senin dikkatli olman gereken konu başlamak ya da başlatmak zorunda olmadığını bilmek. Gücün, içgüdülerine dayanarak hayata cevap vermekte ve doğru ipuçlarını beklemekte yatıyor. \n\nİçgüdülerine ne kadar güvenir ve doğru anı beklersen, hayatın o kadar tatmin edici ve keyifli hale gelir. Kendini bir mıknatıs gibi düşünebilirsin, enerjinin fırsatları doğal olarak sana çektiğini gözlemleyebilirsin. \n\nGelecek için endişelenmene gerek yok; eforsuz ve doğal olan yolun, şu anda hayatın sunduklarına cevap verdiğinde kendini gösterecektir. Enerjin, hayatın sana getirdiklerine cevap vermek aracılığıyla taahhüt ettiğin şeyde ustalaşmana yardımcı olmak için burada. Doğru yolda olduğunun işareti, işlerin doğal olarak yerine oturmaya başlaması ve içinde bir tatmin hissidir. \n\nÇok büyük bir enerjin olduğu için seni gerçekten ilgilendirmeyen veya seni tatmin etmeyen şeylere evet dememeye ve bağlanmamaya dikkat etmelisin. Gücün, en başından itibaren hangi işe ya da kişiye bağlanacağını bilmekte yatar. İç pusulan içgüdülerin aracılığıyla seninle iletişim kurar. Hayatı doğru yaşamak için stratejin hayatın sana getirmesini beklemek ve gelene cevap vermektir. Bu tepkilere uyum sağladığında, gerçek potansiyelini ortaya çıkartacak kararları verebilirsin. \n\nİş yaşamın boyunca engellerle karşılaşabilirsin. İş yaşamında bir çalışan olduğunu ve bir köle olmadığını unutma. Önce içgüdülerini dinle ve başkalarının ne yapman gerektiğini dikte etmesine izin verme. Sen monoton bir rutin için yaratılmadın. Tek yapman gereken hayatın sana getirdiklerine yanıt vermek ve böylece senin için doğru ve tatmin dolu olacak kariyer yolun kendini gösterecek. Üretmeye, inşa etmeye devam et ve inanılmaz enerjine her zaman güven. \n\nHayat tatmini için benimseyeceğin slogan: Yaptığın işi sev ve sevdiğin işi yap!`,
      images: [
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/generatork/view?project=65dc554eb069bed83c59",
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/generatore/view?project=65dc554eb069bed83c59",
      ],
    },
    {
      name: "Generator",
      value: `İş dünyasında ve kariyerinde kendine has ve benzersiz bir enerjin var. İşleri halletmede, bir şeyler inşa etmede ve büyütmede harikasın. Enerjini yapmayı sevdiğin işlere kullandıktan sonra başını yastığa koyduğunda bir bebek gibi uyuyabilirsin. \n\nHayatta ve işte tatmininin anahtarı sadece çok çalışmak değil, enerjini nasıl etkili ve verimli kullandığın. Yaptığın iş refahın ve esenliğin için çok önemli. İçinde harekete geçmene ve bir şeyler yaratmana yardımcı olan güçlü bir enerji kaynağın var. \n\nBirçoğumuz bir şeyleri başlatmamız gerektiğine inandırılarak büyüdük, senin dikkatli olman gereken konu başlamak ya da başlatmak zorunda olmadığını bilmek. Gücün, içgüdülerine dayanarak hayata cevap vermekte ve doğru ipuçlarını beklemekte yatıyor. \n\nİçgüdülerine ne kadar güvenir ve doğru anı beklersen, hayatın o kadar tatmin edici ve keyifli hale gelir. Kendini bir mıknatıs gibi düşünebilirsin, enerjinin fırsatları doğal olarak sana çektiğini gözlemleyebilirsin. \n\nGelecek için endişelenmene gerek yok; eforsuz ve doğal olan yolun, şu anda hayatın sunduklarına cevap verdiğinde kendini gösterecektir. Enerjin, hayatın sana getirdiklerine cevap vermek aracılığıyla taahhüt ettiğin şeyde ustalaşmana yardımcı olmak için burada. Doğru yolda olduğunun işareti, işlerin doğal olarak yerine oturmaya başlaması ve içinde bir tatmin hissidir. \n\nÇok büyük bir enerjin olduğu için seni gerçekten ilgilendirmeyen veya seni tatmin etmeyen şeylere evet dememeye ve bağlanmamaya dikkat etmelisin. Gücün, en başından itibaren hangi işe ya da kişiye bağlanacağını bilmekte yatar. İç pusulan içgüdülerin aracılığıyla seninle iletişim kurar. Hayatı doğru yaşamak için stratejin hayatın sana getirmesini beklemek ve gelene cevap vermektir. Bu tepkilere uyum sağladığında, gerçek potansiyelini ortaya çıkartacak kararları verebilirsin. \n\nİş yaşamın boyunca engellerle karşılaşabilirsin. İş yaşamında bir çalışan olduğunu ve bir köle olmadığını unutma. Önce içgüdülerini dinle ve başkalarının ne yapman gerektiğini dikte etmesine izin verme. Sen monoton bir rutin için yaratılmadın. Tek yapman gereken hayatın sana getirdiklerine yanıt vermek ve böylece senin için doğru ve tatmin dolu olacak kariyer yolun kendini gösterecek. Üretmeye, inşa etmeye devam et ve inanılmaz enerjine her zaman güven. \n\nHayat tatmini için benimseyeceğin slogan: Yaptığın işi sev ve sevdiğin işi yap!`,
      images: [
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/generatork/view?project=65dc554eb069bed83c59",
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/generatore/view?project=65dc554eb069bed83c59",
      ],
    },
    {
      name: "Projector",
      value: `Kariyer ve liderlik dünyasındaki yolculuğun benzersiz. Çevrendekiler yeteneklerini fark ettiğinde, bireyleri, grupları ve sistemleri organize etmeyi ve yönetmeyi içeren rollerde gerçekten parlarsın. Uyumlu bir sonuç için tüm unsurları yöneten bir orkestranın şefi gibisin. \n\nKariyerinde yetenekli bir organizatör, yönetici, ağ oluşturucu veya arabulucu olma potansiyeline sahipsin. Rolün, enerji kaynaklarını en verimli şekilde kullanmak için diğerlerine rehberlik etmek etrafında döner. Enerjiyi verimli bir şekilde anlama ve yönetme konusunda mükemmelsin ve bu beceri sende doğal olarak var. \n\nDoğuştan gelen yeteneklerinden biri, başkalarındaki potansiyeli tanımak. Bu, yetenekleri tespit edebileceğin ve onları doğru görevler ve projelerle eşleştirebileceğin için seni modern dünya için ideal bir lider ve rehber yapar. Enerji dinamiklerine dikkat etmen çok önemli. Çevrendekilerin enerjilerinden beslenir ve bu enerjiyi katlayarak büyütebilirsin. Enerjin iyi yönetilmezse, ileriki yaşlarda tükenmişliğe ve bitkinliğe yol açabilir. Durmayı bilmek ve dinlenmek sağlığını korumak için çok önemli. \n\nTanınmayı ve doğru davetleri beklemek, başarının anahtarıdır.  Enerjini ve bilgeliğini en anlamlı ve etkili şekilde yönlendirmeni sağlar. Yalnızca yolunla gerçekten rezonansa giren davetleri kabul etme konusunda seçici ol. Bu süreçte sana rehberlik etmesi için sezgilerine güven. \n\nİnsanları ve fırsatları doğal olarak sana çeken benzersiz bir varlığın var. Auran açıklık ve odaklanmayı yansıtır. Her seferinde bir kişiye odaklanma yeteneğin, son derece kişisel ve anlamlı etkileşimler yaratır. \n\nBecerilerin, yeteneklerin ve dünyayı benzersiz algılama şeklinle tanındığında ve doğru davetleri aldığında, gerçek potansiyelini gerçekleştirme yolundasın demektir. Senin için başarı, zekanı ve bilgeliğini gerçekten takdir eden ve kabul eden doğru insanları ve fırsatları seçmekle ilgili. Çevrendekiler için bilge ve zeki bir rehber olabilirsin.`,
      images: [
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/projector/view?project=65dc554eb069bed83c59",
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/projector/view?project=65dc554eb069bed83c59",
      ],
    },
    {
      name: "Reflector",
      value: `Doğru ortamda, insanların, toplulukların ve işletmelerin objektif bir değerlendirmesini sağlayan bir kişi olarak parlayabilirsin. Bakış açın tamamen benzersiz ve ilerlemeyi veya dikkat edilmesi gereken alanları doğru bir şekilde değerlendirerek düşünmene ve genel bir bakış açısı kazanmana olanak tanır. \n\nBaşkalarını kabul etme, doğru gitmeyen şeyleri vurgulayarak onları işbirliğine, barışa ve eşitliğe doğru yönlendirme konusunda olağanüstü bir yeteneğe sahipsin. Bir işletmenin, topluluğun veya bir grubun merkezinde olduğunda, özgürce hareket ettiğinde ve işlerin bir bütün olarak nasıl yürüdüğünü yansıtmak için buradasın. \n\nÇevrendekilere çeşitliliği kucaklamanın önemini öğreterek özellikle etkili olabilirsin. \n\nVarlığın sessizlik, nezaket ve müdahaleci olmama ile tanımlanabilir. Çevreyi bir bütün olarak yansıtırsın ve diğerleri kim olduğunu tam olarak anlamakta zorlanabilir. Objektif bir bakış açısı sunarak etrafındaki her şeyi ve herkesi yansıtmak yeteneklerin arasında. \n\nKarar verirken acele etmemelisin. Önemli konularda önce bekle, düşünün ve güvendiğin kişiler ile konuyu konuş. Başkalarıyla etkileşim kurarken, yanlış ortamda olmak veya herkese uymaya çalışmak gibi tuzakların farkında ol. Başkalarına aşırı bağımlı olmaktan veya görünmez hissetmekten kaçın, gerçek benliğinden ödün verme. \n\nBir şeyleri başlatma, hayata geçirme veya olmaya zorlama dürtüsüne diren, çünkü bu başkalarında dirence neden olabilir ve hayal kırıklığına yol açabilir. Başkalarının korkularına, duygularına, stresine ve kaygılarına kapılmaktan kaçın. Etrafındakilerle sağlıklı bir mesafeyi her zaman koru ve acele etmekten veya karar vermek için baskı altında kalmaktan kaçın. Dünyaya benzersiz bir bakış açısı getirmede hayati bir rol oynamak için buradasın.`,
      images: [
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/reflector/view?project=65dc554eb069bed83c59",
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/reflector/view?project=65dc554eb069bed83c59",
      ],
    },
    {
      name: "Manifestor",
      value: `Benzersiz ve güçlü bir yeteneğe sahipsin - Çevrendeki bir çok kişiden farklı olarak, bir şeyleri başlatmak  için doğuştan gelen bir beceriye sahipsin. Rolün çok önemli, çünkü ilk adımı atmazsan, işler olması gerektiği gibi gelişmez. Kendi kendine yetebilirsin, bağımsız çalışmak ve hareket etmek için buradasın, yaptıklarınla başkalarını etkilersin. \n\nİlişkiler ve işler alanında da, başlatıcı rolünü oynarsın – ilk hamleyi yapan kişi sen olmalısın. Kendini sık sık geleceğe bakarken, başkalarının vizyonunu yakalamasını beklerken bulabilirsin. Çevrendekiler senin enerjini kapalı ve dışarı doğru kuvvetlice iten bir güç gibi algılayabilir. \n\nSenin için başarılı etkileşimlerin anahtarı, bir şeyler yapmak ve başlatmak için tasarlanmış biri olduğunu kabul etmekte yatar. Bununla birlikte, bu güç, başkalarını savunmaya geçirerek bilinçli veya bilinçsiz kontrol edilme korkusuyla birlikte gelir. Bunun üstesinden gelmek için, harekete geçmeden önce bilgilendirme sanatını öğrenmen çok önemlidir. \n\nHarekete geçmeden önce çevrendekileri bilgilendirdiğinde açık, verimli ve barışçıl bir iletişimin önünü açmış olursun. Bilgilendirmek sana doğal gelmese de, ustalaşmaya değer bir uygulamadır. \n\nBaşlatma gücün ile bilgilendirme sanatı arasındaki dengeyi anlamak ve uygulamak iş yaşamındaki başarının ve içsel huzurunun kaynağı olacaktır.`,
      images: [
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/manifestor/view?project=65dc554eb069bed83c59",
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/manifestor/view?project=65dc554eb069bed83c59",
      ],
    },
  ];
  var definition = [
    {
      name: "herkes",
      title: "",
      value: `Bilgiyi öğrenmemizin, işlememizin ve bütünleştirmemiz herkes için farklıdır. Her stilin kendine özgü bir avantajı vardır.\nTarzını bildiğinizde ve kullandığında:\n- Öğrenme potansiyelini en üst düzeye çıkarabilir\n- Bilgiyi kendi hızınızda bütünleştirebilir\n- Doğal sürecinin benzersiz faydalarından yararlanabilirsin.\n- Bu aynı zamanda başkalarının öğrenme stillerine saygı duymanızı sağlar.\n\nTarzını bilmediğinde veya kullanmadığında:\n- Kendininkini fark etmeden başkalarının tarzlarının avantajlarını gördüğün için kendinizi çoğu zaman yetersiz hissedebilir veya senden daha hızlı veya daha yavaş çalışanlardan dolayı hayal kırıklığına uğrayabilirsin.`,
    },
    {
      name: "No Definition",
      title: "Objectif Çalışma Stili",
      value: `Bilgiyi özümseme tarzın, Objektifdir. Bilgiyi yargılayıcı olmayan bir şekilde içeri alma ve iç görülerini objektif olarak paylaşma konusunda dikkate değer bir yetenek gösterirsin. Yaklaşımın, herhangi bir günde çevrenin kalitesini örneklemeyi, yansıtmayı ve değerlendirmeyi içerir ve bir topluluğun, grubun ve hatta daha geniş bir çevrenin fiziksel, psişik veya duygusal sağlığını nesnel olarak algılamana olanak tanır.\n\nUyumlanma yeteneğin yakın çevrenin ötesine uzanır, çevrendekiler ve tüm evrenden  bilgi toplamanı sağlar. Keskin bir algı, insanlığın içindeki adaletsizlikleri yansıtan özgünlüğü ayırt etmeni sağlar.\n\nAçık fikirliliğin, nesnel olarak değerlendirirken her şeyin senden geçmesine izin veren tanımlayıcı bir özelliktir. Bu perspektif genişliği seni, insan deneyiminin ve genel olarak dünyanın çeşitli boyutlarını kapsayan içgörüler sağlayabilen değerli bir gözlemci olarak konumlandırır.`,
    },
    {
      name: "Single Definition",
      title: "Tekil - Bireysel Çalışma Stili",
      value: `Bilgileri Bağımsız olarak öğrenirsin.  Çalışma tarzın özerklik için uyarlanmıştır, görevleri tek başına yerine getirirken ve bilgileri bağımsız olarak işlerken başarılı olursun. İçinde, tutarlı ve güvenilir bir bilgi işleme yöntemi tarafından yönlendirilen doğal bir bütünlük duygusu bulunur. Tekil bir odağı sürdürme yeteneğin dikkat çekicidir ve iş yaşamında çok işine yarar.\n\nBilgiyi hızlı ve yetkin bir şekilde sindiren bağımsız bir birim olarak çalışırsın. Bununla birlikte, yavaşlamak ve bilgilerin daha bilinçli bir şekilde işlenmesine izin vermek için biraz zaman ayırman, ilerleme hızının değerini anlaman çok önemlidir. İşbirlikçi çabalarında, anlamak için ek zamana ihtiyaç duyabilecek diğerlerine sabır göstermen faydalı olacaktır. Hızlı anlama yeteneğin ile diğerlerinin düşünceli temposu arasındaki bu dengeyi benimsemek, profesyonel ortamındaki kolektif anlayışı geliştirebilir.`,
    },
    {
      name: "Split Definition",
      title: "İş Birlikçi Çalışma Stili",
      value: `Bilgileri İşbirlikçi yaklaşımın ile anlar ve öğrenirsin. Profesyonel tasarımın, başkalarıyla birlikte çalışmaya, işbirliği yoluyla tatmin ve bütünlük duygusu bulmaya yöneliktir. Çevrendekilerin varlığı, iş dinamiklerinin ayrılmaz bir parçasıdır ve bütünlük hissine katkıda bulunur. Bazen, bir eksiklik varmış gibi hissedebilir ve algıladığın eksiklikleri telafi etmeye çalışabilirsin. Bununla birlikte, işbirlikçi doğan ile doğal olarak tamamlayıcı becerilere ve güçlü yönlere sahip diğer kişileri kendine çektiğini anlaman önemlidir.\n\nBilgiyi almak, işlemek ve sindirmek senin açından biraz daha fazla zaman gerektirebilir ve bu süreç boyunca kendine karşı sabırlı olman çok önemlidir. Kararlar ve bilgi işleme, yalnızlık içinde yapıldığında rahatsız edici olabilir, ancak zamana ve sabra izin vermek bir bütünlük duygusu getirebilir. Kalabalık ortamlar senin için değerli arenalar haline gelir, yeni bakış açıları sunar ve anlama sürecine yardımcı olur.\n\nÖğrenme stilinin avantajını benimseyerek, tam olarak kavramanız biraz uzun sürebilir, ancak bir kez kavradığında, anlayışın gerçekten derindir. Bunun nedeni, bilgilere çeşitli açılardan yaklaşman ve profesyonel içgörülerini zenginleştiren kapsamlı ve derin bir anlayışla sonuçlanmasıdır.`,
    },
    {
      name: "Triple Split Definition",
      title: "Sentezleyen Çalışma Stili",
      value: `Bilgiyi öğrenmede, farklı kaynaklardan ve bireylerden gelen içgörüleri birleştirmek için benzersiz bir yetenek sergileyerek Sentezlersin. Profesyonelliğin gün boyunca çeşitli insanlarla hareket edebileceğin, işbirliği yapabileceğin ve etkileşimde bulunabileceğin ortamlarda gelişir. Bu dinamik angajmana bir sağlık duygusu eşlik eder ve her gün aynı kişi ve yerle sınırlı kalmak sana iyi gelmeyebilir.\n\nProfesyonel tavrını tanımlayan karakteristik bir dürtü, hırs ve atılganlık vardır. Bununla birlikte, sabırsızlığa ve erken harekete geçmeye yönelik potansiyel bir eğilimin olabilir.  Sabır geliştirmen, karar vermeden veya harekete geçmeden önce bilgileri kapsamlı bir şekilde sentezlemek için gereken zamanı ayrıman çok önemlidir.\n\nİlgi çekici bir yönün, oyunda üç farklı role sahip olma duygusudur. Bu çok yönlü özellik, karmaşık durumlarda gezinme ve zorluklara çeşitli açılardan yaklaşma yeteneğine katkıda bulunur. Bu sentezleri benimsemek, yenilikçi çözümlere ve eldeki bilgilerin kapsamlı bir şekilde anlaşılmasına imkan sağlar.`,
    },
    {
      name: "Quadruple Split Definition",
      title: "Öznel Çalışma Stili",
      value: `Bilgileri özümseme stilin, bilgileri sabit ve kişiselleştirilmiş bir şekilde işlemek için güçlü bir eğilim gösterir ve Özneldir. Yaklaşımın, kendi  derin deneyimlerinden gelir ve farklı ve öznel bir bakış açısına katkıda bulunur. Bu sabit yapı, daha az esnek görünmene neden olabilir ve çevrendekilerin senin tercih ettiğin bilgi işleme yöntemine uyum sağlamasını gerektirebilir.\n\nBiraz kapalı olma, seçici olarak belirli kişilerin yakın çevrene girmesine izin verme eğilimin olabilir. Küçük grup ortamları sende rahatsızlık uyandırabilir.\n\nOptimal anlama ve öğrenme sürecin zaman ve belli bir hız gerektirdiğinden, hızlı karar verme dürtüsüne direnmen çok önemlidir. Başkalarının beklentilerini karşılamak için zorlanmak zihinsel, fiziksel ve duygusal sağlığını olumsuz etkileyebilir. Bunun yerine, bilgiyi özümserken, bu yaklaşımın genel sağlığın ve etkinliğin için önemini kabul ederek kendi hızınıza ve zamanlaman öncelik ver.`,
    },
  ];
  var profile = [
    {
      name: "1 / 3",
      value1: `Alanında ustalık geliştirirsin ve kendini ayrıntıları derinlemesine anlayan bir otorite olmaya adarsın. Kararlılığın seni sürekli olarak cevaplar aramaya, deneme yanılma ile öğrenmeye yönlendirir. Hayat senin için hem gerçek hem de mecazi olarak zorluklarla karşılaştığın, esnek bir ruhla uyum sağladığın ve geliştiğin dinamik bir etkileşim. Esnekliğin, seçtiğin yolun karmaşıklıklarında gezinmedeki başarına katkıda bulunur.`,
      value2: `Sağlam bir temel kurulması senin için önemli ve böyle bir zeminde durmadığında bir güvensizlik duygusu hissedebilirsin. Alçakgönüllülük ve yaratıcılık, konunda uzmanlık ve yeniliğin dengeli bir karışımını yaratarak yaklaşımını pekiştirirsin. Kararlı bir kâşif olarak rolünde, adaptasyon ve deneyim yoluyla öğrenme konusunda başarılı olursun. Genellikle düşe kalka yaşanan deneme yanılma süreci, neyin işe yarayıp neyin yaramadığını keşfetmen için değerli bir araç haline gelir. Başarısızlık karşısındaki dayanıklılığın ve kararlılığın, devrim niteliğinde değişiklikler ve yenilikçi çözümler getirme yeteneğine katkıda bulundukları için övgüye değerdir. Öncü ruhun alanının ön saflarında kalmanı sağlayacaktır. Kararlı bir kâşif olarak yolculuğun, sürekli bir bilgi arayışı, zorluklar karşısında dayanıklılık ve alanında olumlu ve dönüştürücü değişiklikler ortaya çıkarma ile pekişir.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/1-3/view?project=65dc554eb069bed83c59",
    },
    {
      name: "1 / 4",
      value1: `Birincil önceliğin ilgi alanlarının temellerini derinlemesine anlamak ve kendini bu alanlarda bir uzman ve otorite olmak için hazırlamaktır. Uzmanlığının temelini oluşturacak bilgileri sağlamak için araştırma yapmak seni keyiflendirir.`,
      value2: `Yaratıcı eğilimin, bulgularını başkalarıyla yenilikçi yollarla paylaşmaya seni motive eder.Dostluk ve yakın ilişkiler kurmak için yaratıldın, hayatta ve tüm iş yaşamında fırsatların bu ağlar aracılığıyla sana gelecektir. Bilgeliği dışsallaştırma ve başkalarını etkileme yeteneğin seni çeşitli sosyal ve profesyonel çevrelerde değerli bir varlık haline getirir. Bununla birlikte, ağlar ve bağlantı kurmak sana neşe getirirken, yaratıcılığınla baş başa kalmak ta sana iyi gelir.Başkaları aracılığıyla gelen fırsatlara açık kalmak iş hayatında çok önemli olacak.Dışa dönük doğana rağmen, periyodik olarak yalnız kalmak sana iyi gelir, zira bağlı olduğun insanlardan ve ağlardan sıkılıp daralabilirsin. Etkileyici ve ağ oluşturucu olarak rolün, hem profesyonel hem de kişisel alanlarında kalıcı bir etki yaratarak başkalarıyla bağlantı kurma, etkileşimde bulunma ve başkalarını olumlu yönde etkileme yeteneğine sahip olduğun için insan kaynakları alanında çok önemlidir.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/1-4/view?project=65dc554eb069bed83c59",
    },
    {
      name: "2 / 4",
      value1: `Doğal ve doğuştan gelen yeteneklere sahip bir birey olarak benzersiz özelliklerin ön planda. Yaşam amacın, yeteneklerinin başkaları tarafından tanınması ve kabul edilmesine karmaşık bir şekilde bağlı. Dünyaya vermeye geldiğin hediyelerinin ortaya çıkması dış doğrulama ve teşvik yoluyla olur, bu da çevrendekilerin bakış açılarına açık olmayı önemli hale getirir.`,
      value2: `Doğal yeteneklerin göz önüne alındığında, sana kolay gelen işlere ve görevlere odaklanman önemlidir. Bir iş sana zorlayıcı geliyorsa, doğuştan gelen güçlü yönlerinle uyumlu olmayabilir. Yeteneklerinin değerini görmüyor olabilirsin, bu yüzden başkalarının onları fark etmesi önemlidir.Enerjinin doğru kullanımı iyi olman için önemli. Yanlış yönlendirilmiş enerji yorgunluğa, tükenmişliğe ve bitkinliğe neden olabilir. Kendin için yalnız kalma ihtiyacın ve başkalarıyla bağlantı kurma yeteneğin de dahil olmak üzere, hayatındaki denge senin için önemlidir. Doğal ve etkili bir networker olarak, derin bağlantılar kurmak için tasarlandın ve ilişkiler hayatında büyük önem taşıyor. Yalnız zamanını sosyal etkileşimlerle dengelemek, tatmin edici ve sürdürülebilir bir yaşam tarzına katkıda bulunacaktır.Derin ve anlamlı bağlantılarda başarılı olurken, yabancılarla çalışmak senin için en iyi seçim olmayabilir. İnsanlarla bağlantı kurma ve tanışman, bu konudaki doğal yeteneğin ve yerleşik ağların aracılığıyla kolaylaş olur. Bu ağları beslemek sana kişisel ve profesyonel gelişim için gerekli fırsatları ve bağlantıları sağlayacaktır.Doğal yeteneklerini kucaklayarak ve yalnızlık ile sosyal etkileşim arasındaki uyumu bularak, başarılı ve tatmin edici bir kariyer ve yaşam yolunu açarsın.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/2-4/view?project=65dc554eb069bed83c59",
    },
    {
      name: "2 / 5",
      value1: `Doğal bir münzevi olman ve problem çözücülüğün ayırt edici niteliklerin. Yalnızlıkta teselli bulur ve gelişirsin, pratikliğe ve sessiz, uyumlu bir yaşama değer verirsin. Doğal utangaçlığına rağmen, Diğerleri, yardım sunma yeteneğine çekilir. Hayatın pratik yönlerini anlayarak ve başkalarıyla etkileşimlerini yöneterek bu dinamikte gezinmen önemlidir.`,
      value2: `Yaklaşımın, insanları kendine çekmeyi, ihtiyaçlarını pratik çözümlerle ele almayı ve ardından stratejik olarak geri çekilmeyi içerir. Bu gelgit, itibarını ve enerji seviyeni korumak için gereklidir. Çözümler sunduktan sonra geri çekilmek, enerjinin, doğal yeteneklerinin ve itibarının oluşması için sana zaman kazandırır ve ihtiyaç duyulduğunda pratik ve bazen değişik çözümler sunmaya hazır olmanı sağlar. Çevrendekiler sana güven duyuyorlarsa, küçük veya büyük kriz zamanlarında rehberliğini aradıklarında onlara etkili bir şekilde yardım edebilirsin. En güçlü etkin, pratik dehan başkalarının sana yansıttığı projeksiyonlarla aynı hizaya geldiğinde ortaya çıkar. Yeteneklerin tam olarak ortaya çıktıkça, işlerinde ifade edilebilir ve kalıcı bir etki yaratır. Kariyer yolculuğun özünde hassas bir yalnızlık, pratik problem çözme ve başkalarıyla stratejik etkileşim dengesini içerir. Doğal eğilimlerini benimseyerek ve yansıtma ve geri çekilme dinamiklerinde gezinerek, yeteneklerinin parlamasının ve pratik çözümlerinin anlamlı bir etki kaynağı olmasının yolunu açarsın.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/2-5/view?project=65dc554eb069bed83c59",
    },
    {
      name: "3 / 5",
      value1: `Neyin işe yarayıp neyin yaramadığını anlamak için kararlı ve dinamik bir yaklaşıma, sorumluluk alma ve yenilikçi ve pratik çözümler sunma kabiliyetine sahipsin. Etrafındakiler, özellikle kriz zamanlarında, rehberliğini, liderliğini ve durumu düzeltme veya kurtarma yeteneğine başvurmak için doğal olarak sana yönelir.`,
      value2: `Koşullara uyum sağlayabilmen, dayanıklılığın ve değişime açık doğan seni fiziksel dünyada deneme yanılma yoluyla gelişen esnek bir öğrenci yapar. Karşına çıkan zorluklar öğrenme sürecinin ayrılmaz bir parçasıdır. Başarıya ulaşsın ya da ulaşmasın, her deneyim, yeni içgörüler ve bilgelik kazanman için birer fırsat olarak sana hizmet eder.Hayattaki şeyler hızla sana gelirken, sen de hızla onlara doğru ilerlersin.  Dünyayla dinamik ilişkin ve bu deneyimler yoluyla biriken bu bilgelik, dönüştürücü gücünün kaynağı olur. Sadece gelişmen için seni güçlendirmekle kalmaz, aynı zamanda seni hem kendinde hem de başkalarında olumlu bir değişim yaratabilecek etkili bir güç olarak konumlandırır.Kariyer yolculuğun sürekli bir öğrenme, uyarlama ve deneyimleri bilgeliğe dönüştürme süreciyle karakterize olur. Yoluna çıkan zorlukları ve fırsatları kucaklayarak, yalnızca kendi yolunu şekillendirme gücünü kullanmakla kalmaz, aynı zamanda çevrenizdekilerin dönüşümüne de katkıda bulunursun. Denemek istediğin şeyleri denemekten asla vazgeçme.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/3-5/view?project=65dc554eb069bed83c59",
    },
    {
      name: "3 / 6",
      value1: `Değişimi yönlendirmek için buradasın, neyin işe yarayıp neyin yaramadığını anlamak sana göre. Keşif sürecinin dönüştürücü potansiyelini ifade etmek, bilgeliğin çeşitli olgunlaşma aşamalarında benzersiz bir şekilde geliştiğini ve nihayetinde otantik bireysel benzersizlik olarak ortaya çıktığını çevrendekilere gösterebilirsin.`,
      value2: `Güven senin için önemlidir ve bir mükemmellik arayışı içinde de olabilirsin. Bu yüksek standartlarını karşılayamayan ilişkilerde, işlerde ve kariyerlerde stres yaratabilecek bir unsur olabilir ve senin için önem taşır. Özgüven ve ustalık geliştirmenin anahtarı, hayatı uygulamalı bir şekilde kucaklamak ve dibine kadar dalmakta yatar. Deneyimlere aktif olarak katılarak güven, mükemmellik ve kararsızlığın karmaşıklıklarında gezinebilir, kişisel gelişimi teşvik edebilir ve hem profesyonel hem de kişisel alanlarında olumlu değişime katkıda bulunabilirsin. Özellikle genç yaşlarda deneyimlediklerinden elde ettiğin bilgeliği yaşamının ileriki dönemlerinde çevrendekiler ile paylaşabilir, onlara bir rol model olabilirsin.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/3-6/view?project=65dc554eb069bed83c59",
    },
    {
      name: "4 / 1",
      value1: `Kendini gerçekleştirme yolculuğun, sağlam bir alt yapı oluşturmayı ve daha sonra bilgi ağını etkilemek için otorite konumuna geçmeyi içeren bir süreçtir. Sosyal ve samimi bir yaklaşıma sahip olman, içtenlikle başkalarıyla etkileşimde bulunman ve merakını araştırma ve uzmanlıkla dönüştürerek otorite ve yetkinlik kazanman anlamına gelir.`,
      value2: `Otorite pozisyonunda olduğunda, uzmanlık alanında etkili bir şekilde liderlik yapabilirsin. Bilgiyi başkalarına aktarma konusundaki doğal yeteneğin, öğrendiklerini paylaşmayı istemene neden olur. Hayatındaki hareket, sabit bir rotada ilerleyen bir tren gibi belirgin bir yöne sahiptir. Bu, bazı belirsizlikleri beraberinde getirirken, aynı zamanda kimliğine bağlı kalmanın önemini vurgular. Kendi rotanı koruman ve yolculuğunun tadını çıkarman sana bağlıdır. Senin etrafındakilere uyum sağlaman zor olabileceğinden, çevrendekilerden bu esnekliği bekleyebilirsin. Kendi özelliklerini saygıyla karşılayarak bilgiyi etkileme ve iletişim kurma yeteneğini geliştirmek, çevrende kalıcı bir etki bırakmana ve tatmin edici bir hayat yaşamana olanak tanır.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/4-1/view?project=65dc554eb069bed83c59",
    },
    {
      name: "4 / 6",
      value1: `Etki alanını genişletmek için sosyal yeteneklerini ve kişisel ağlarını bilinçli olarak kullanabilirsin ve bireysel ve etkili bir yaşam için rol modelsin. Engelsiz bir bakış açısını korumak için çevrendekilerden biraz ayrı kalarak, başkalarının düşünme biçimlerini değiştirebilecek yeni bir bakış açısına katkıda bulunmak için uygun anı objektif ve sabırla beklersin.`,
      value2: `İstikrar ve sağlam bir temel için özlem duyarken, gerçeği arayan deneyimsel yolculuğunu kucaklayarak kendi gelişimine katkıda bulunursun. Herkes için en iyisini arzulayan cömert ruhun her zaman parlar, ancak güvenin kırıldığında hassas kalbin kolayca yaralanabilir.Senin için ilişkiler büyük önem taşır ve yaşam kaliten ağlarının kalitesiyle doğrudan bağlantılıdır. Bu bağlantıları aktif olarak beslemek yalnızca kişisel yaşamını geliştirmekle kalmayacak, aynı zamanda etkinin derinliğine ve genişliğine de katkıda bulunacaktır. Bireyselliğin ve başkalarıyla olan bağlantın arasındaki hassas dengede gezinme yeteneğin, otantik bir şekilde yaşamak için etkili bir model olarak potansiyelini ortaya çıkarmanın anahtarıdır.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/4-6/view?project=65dc554eb069bed83c59",
    },
    {
      name: "5 / 1",
      value1: `Liderlik, rehberlik ve problem çözme oldukça başarılı olabilirsin. Doğal olarak dikkat çekersin ve insanlar kriz zamanlarında pratik çözümler için içgüdüsel olarak sana gelirler. Doğal bir işleri yoluna koyucu olarak rolün, problem çözme becerileri çevrendekilere sunman ile uyumludur ve seni çeşitli senaryolarda paha biçilmez bir kişi haline getirir.`,
      value2: `Keskin gözlem becerileri ve disiplinli sabrın, hazırlıklı olma ve doğru zamanlamaya olan bağlılığının altını çizerek, kapsamlı çalışma ve araştırma yoluyla güvenli bir bilgi temeli oluşturur. Bu sağlam temel, uzmanlığının üzerine inşa edildiği temel haline gelir ve parçası olduğu ekip ya da topluluğu etkilemene ve gerektiğinde yeniden şekillendirmene olanak tanır. Başkalarının beklentileriyle ilgili dikkatli olmalısın, çevrendekilerin san a yüklediği birtakım projeksiyonların yeteneklerinle uyumlu olup olmadığını ayırt etmen oldukça önemlidir. Doğru fırsatlara "evet" demek, itibarını artırır ve genellikle olağan dışı ve pratik çözümlerinizle önemli bir fark yaratmanı sağlar. Pratik pazarlama becerilerine sahip biri olarak, yeni kavramları evrenselleştirme, çözümler sunma ve bir kurtarıcı olarak görülme konusunda yetkinsin. Herhangi bir konuya dahil olma, gerekli düzeltmeleri yapma ve işler yoluna girince konudan ayrılma yeteneği, doğal liderlik tarzını yansıtır. İlgini çeken alanlarda uzmanlığını geliştirirken, iç gözlemlerin, araştırman ve sağlam bir temel kurmaya olan bağlılığın, alçakgönüllülüğünü ve yaratıcılığını da vurgular. Empati gücün ve çalışma ve araştırmaya olan bağlılığın, olumlu bir değişim yaratma yeteneğini daha da geliştirir. Genel olarak, kariyer yolun güvenlik, hayatta kalma içgüdüleri ve benzersiz pratik çözümler sunma yeteneğin ile anlamlı bir etki yaratma niyetin arasında dikkatli bir denge ile işaretlenmiş bir yoldur.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/5-1/view?project=65dc554eb069bed83c59",
    },
    {
      name: "5 / 2",
      value1: `Liderlik, rehberlik ve problem çözme oldukça başarılı olabilirsin. Benzersiz niteliklerin ve sıradanlığın ötesinde devrim niteliğinde bir şeye doğru içsel çağrıyı bekleyen derin ve bilinçsiz bir dehan var.`,
      value2: `Çevrendekilerin sorunlarına yardım edip onlara pratik çözümler sağlayabilirsin. Dikkatli olman gereken bir konu, çevrendekilerin beklentileri karşılamak zorunda olmadığındır. Onların düşündüğü kadar iyi olmak, ya da olmanı istedikleri kalıba girmek zorunda değilsin.  İhtiyaç duyulduğunda çevrendekilere pratik çözümlerin ile yardımcı olup sonra çekilmek yapabileceğin en iyi şeydir. Bunun yanı sıra nereden geldiğini bilmediğin bazı doğal yeteneklerin var ve bunları kolaylıkla kullanabilirsin. Başkalarının beklentilerine bire bir uymaman, gerçek yeteneklerin hakkında belirsizliğe yol açarak kendini izole etmene ve hediyelerini saklamana neden olabilir. Sevdiğin şeylere yaptığında ve dış müdahale olmadan keşfetmene izin verildiğinde hediyelerini ortaya koyman çok kolay olur.Hem iş hem de kişisel ilişkilerde sağlığını ve esenliği korumak için, kendini gerektiğinde başkalarının talep ve beklentilerinden uzaklaştırman ve yalnız zaman geçirmen çok önemlidir. Bu yalnızlık, benzersiz ve devrimci katkın için gereken enerjiyi yeniden şarj etmene ve korumanı sağlar.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/5-2/view?project=65dc554eb069bed83c59",
    },
    {
      name: "6 / 2",
      value1: `Çevrendekilere bağımlı olmadan kendine has bir şekilde yaşayarak diğerlerine örnek olmak, çevrendekilere benzersiz mükemmelliklerini tanımaları ve kabul etmeleri için rehberlik etmek için buradasın.`,
      value2: `Hayatın dramalarından uzak durma konusundaki yeteneğin, seni dağın tepesindeki bir bilgeye benzer şekilde objektif bir gözlemci olarak konumlandırır. Bu bakış açısı sana hayata kuşbakışı bakma kabiliyeti kazandırarak büyük resmi görmeni ve yaşının ötesinde bir bilgeliğe sahip olmanı da sağlar. Doğal olarak yeteneklisin ve birçok şeyi nereden bildiğini bilmeden çok iyi yapabilirsin.  Doğal yetenekleri olan ve bilge bir kişi olarak görülürsün ve çevrendekiler içgüdüsel olarak sana güvenir ve tavsiyelerin onlar için önemli bir ağırlık taşır. Özgünlüğü somutlaştırarak ve bağımsız bakış açından edindiğin bilgeliği aktararak, çevrendekilerin refahına ve gelişimine katkıda bulunabilirsin. Başkalarının sana duyduğu güven, hem kendin hem de içgörülerinden yararlanacak kadar şanslı olanlar için uyumlu bir yaşamı teşvik eden bir rehberlik ve bilgelik kaynağıdır ve bu dünyada ve iş yaşamındaki benzersiz rolünün bir kanıtıdır.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/6-2/view?project=65dc554eb069bed83c59",
    },
    {
      name: "6 / 3",
      value1: `İş yaşamındaki ve hayattaki rolün öncü bir figür, başkalarının takip etiği bir rol model olarak öne çıkıyor. Neyin işe yarayıp neyin yaramadığını anlama konusundaki doğuştan gelen kararlılığın, keşif sürecinin dönüştürücü gücünü ifade etmek için burada olduğunun altını çiziyor.`,
      value2: `Bu süreç, bakış açının olgunlaşmasının çeşitli aşamalarında bilgeliğinin gelişmesine yol açıyor ve benzersizliğinin bireysel ifadesiyle sonuçlanıyor. Güven, senin için merkezi bir tema ve zaman zaman yüksek standartların ilişkilerini, içinde bulunduğun ekibi ve kariyerini zorlayan bir mükemmellik arayışıyla iç içe geçebilir. Çevrendekiler ile aranda güven tesis edildiğinde, kendini ideal bir iş veya yaşam vizyonunla uyumlu bir yerde bulursun. Alışılmışın ötesinde, hayatın beklentilerinden uzaklaştığında ara sıra geri çekilmene neden olan bir asalet duygusu yayarsın. Çeşitli deneyimlere girme ve taahhütte bulunmadan gözlemleme arasındaki etkileşim hem işinde hem de yaşamında bir git gel dinamiği yaratabilir. Hayatı uygulamalı bir şekilde kucaklamak, özgüven ve ustalık geliştirmenin temel unsurudur. Deneyimlerle aktif olarak ilgilenmek, güven, mükemmellik ve kararsızlığın karmaşıklıklarında gezinmene, kişisel gelişimi teşvik etmene ve hem profesyonel hem de kişisel alanlarda olumlu değişim için öncü bir rol model olarak konumlandırmana olanak tanır.`,
      image:
        "https://appwrite.indata.com.tr/v1/storage/buckets/images/files/6-3/view?project=65dc554eb069bed83c59",
    },
  ];
  var strategyevery = {
    name: "herkes",
    value: `Aldığın kararlar yolunu şekillendirmede kilit rol oynar, sadece profesyonel gidişatını değil, güvenini, iç huzurunu ve genel başarını da etkiler. Karar Alma Stratejini iş yaşamın boyunca sana yön ve güven sunan bir pusula gibi düşünebilirsin.`,
  };
  var strategy = [
    {
      name: "To Respond",
      value: [
        {
          name: "Emotional - Solar Plexus",
          value: `Karşılık Ver ve Netlikle Karar Al\nİş yaşamında doğru kararları alabilmen ve rahatlıkla ilerleyebilmen için Karar Alma stratejin 3 adımdan oluşuyor:\n\n1. Adım: Hayatın sana bir şeyler getirmesine izin ver \n- Bir mıknatıs gibisin, konsantre olduğun şeyler yaşamında belirir. \n- Fırsatların doğal olarak yoluna çıkmasını izle\n- Bir şeyleri başlatmak için acele etme\n\n2. Adım: İçgüdülerini Takip Et\n- Hayat sana bir şeyler getirdiğinde, içinde (tam olarak alt karnında) kuvvetli bir his senin için doğru olup olmadığını  söyler. \n- Enerjini çoğaltan, seni heyecanlandıran şeyler senin için doğru şeyler. \n\n3. Adım: Duygusal Netlik Bekle\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma. \n- Sabret ve bir netlik bekle. \n- Seçiminde sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin. `,
        },
        {
          name: "Emotional",
          value: `Karşılık Ver ve Netlikle Karar Al\nİş yaşamında doğru kararları alabilmen ve rahatlıkla ilerleyebilmen için Karar Alma stratejin 3 adımdan oluşuyor:\n\n1. Adım: Hayatın sana bir şeyler getirmesine izin ver \n- Bir mıknatıs gibisin, konsantre olduğun şeyler yaşamında belirir. \n- Fırsatların doğal olarak yoluna çıkmasını izle\n- Bir şeyleri başlatmak için acele etme\n\n2. Adım: İçgüdülerini Takip Et\n- Hayat sana bir şeyler getirdiğinde, içinde (tam olarak alt karnında) kuvvetli bir his senin için doğru olup olmadığını  söyler. \n- Enerjini çoğaltan, seni heyecanlandıran şeyler senin için doğru şeyler. \n\n3. Adım: Duygusal Netlik Bekle\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma. \n- Sabret ve bir netlik bekle. \n- Seçiminde sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin. `,
        },
        {
          name: "Sacral",
          value: `Karşılık Vermek için Bekle ve İçgüdülerini Takip Et\nİş yaşamında doğru kararları alabilmen ve rahatlıkla ilerleyebilmen için Karar Alma stratejin 2 adımdan oluşuyor:\n\n1. Adım: Hayatın sana bir şeyler getirmesine izin ver \n- Bir mıknatıs gibisin\n- Konsantre olduğun şeyler yaşamında belirir. \n- Fırsatların doğal olarak yoluna çıkmasını izle, bir şeyleri başlatmak için acele etme.\n\n2. Adım: İçgüdülerini Takip Et\n- Hayat sana bir şeyler getirdiğinde, içinde (tam olarak alt karnında) kuvvetli bir his senin için doğru olup olmadığını  söyler. \n- Enerjini çoğaltan, seni heyecanlandıran şeyler senin için doğru şeyler. `,
        },
      ],
    },
    {
      name: "Wait for the Invitation",
      value: [
        {
          name: "Emotional - Solar Plexus",
          value: `Tanınma ve Davet Al, Netlik ile Karar Al\nBir Rehber olarak, bir orkestranın şefi gibisin. Başarılı bir sonuç için organizasyon ve yönlendirme senin yeteneklerinden. Karar Alma Stratejinin 2 adımı var:\n\n1. Adım: Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin.\n- Tanınma ve davet alana kadar bekle ve enerjini ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini kabul ve takdir eden doğru insanları ve fırsatları seçmekle ilgili. \n\n2. Adım: Duygusal Netlik Bekle\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma. \n- Anahtar sabretmek ve netlik beklemektir. \n- Biraz bekle ve konuyla ilgili hissiyatının aynı olup olmadığına bak. \n- Seçiminde sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin.`,
        },
        {
          name: "Emotional",
          value: `Tanınma ve Davet Al, Netlik ile Karar Al\nBir Rehber olarak, bir orkestranın şefi gibisin. Başarılı bir sonuç için organizasyon ve yönlendirme senin yeteneklerinden. Karar Alma Stratejinin 2 adımı var:\n\n1. Adım: Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin.\n- Tanınma ve davet alana kadar bekle ve enerjini ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini kabul ve takdir eden doğru insanları ve fırsatları seçmekle ilgili. \n\n2. Adım: Duygusal Netlik Bekle\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma. \n- Anahtar sabretmek ve netlik beklemektir. \n- Biraz bekle ve konuyla ilgili hissiyatının aynı olup olmadığına bak. \n- Seçiminde sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin.`,
        },
        {
          name: "Splenic",
          value: `Tanınma ve Davet Al, İçgüdülerini Takip Et\nBir Rehber olarak, bir orkestranın şefi gibisin. Başarılı bir sonuç için organizasyon ve yönlendirme senin yeteneklerinden. Karar Alma Stratejinin 2 adımı var:\n\n1. Adım: Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin. \n- Tanınma ve davet alana kadar bekle ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini takdir ve kabul eden doğru insanları ve fırsatları seçmekle ilgili. \n\n2. Adım: İçgüdülerin Takip Et\n- İçgüdülerin anlık olarak o anda senin için bir şeyin doğru olup olmadığını belirlemede sana rehberlik eder. \n- Vücudunun sana söylediklerinin farkında ol.\n- Hislerini dikkate alarak doğru zamanda doğru kararları alabilirsin.`,
        },
        {
          name: "Ego Projected",
          value: `Tanınma ve Davet Al, İradeli Kararlılığını Takip Et\nBir Rehber olarak, bir orkestranın şefi gibisin. Başarılı bir sonuç için organizasyon ve yönlendirme senin yeteneklerinden. Karar Alma Stratejinin 2 adımı var:\n\n1. Adım: Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin. \n- Tanınma ve davet alana kadar bekle ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini takdir ve kabul eden doğru insanları ve fırsatları seçmekle ilgili. \n\n2. Adım: İradeli Kararlılığını Takip Et\n- İradeli kararlılığın senin için bir şeyin doğru olup olmadığını belirlemede sana rehberlik eder. \n- Karar verirken, kişisel çıkarlarına dikkat et ve "Ben ne istiyorum?" diye sor. \n- Kalbindeki iraden bu konuda ilerleyip ilerlememen gerektiğini sana bildirir.`,
        },
        {
          name: "Self Projected",
          value: `Tanınma ve Davet Al, Söylediklerini Dinle\nBir Rehber olarak, bir orkestranın şefi gibisin. Başarılı bir sonuç için organizasyon ve yönlendirme senin yeteneklerinden. Karar Alma Stratejinin 2 adımı var:\n\n1. Adım:  Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin. \n- Tanınma ve davet alana kadar bekle ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini takdir ve kabul eden doğru insanları ve fırsatları seçmekle ilgili. \n\n2. Adım: Söylediklerini Dinle\n- Ağzından çıkanlara kulak ver. \n- Güvendiğin birkaç kişi ile karar alacağın konuyu konuş - onların fikirlerini almak için değil, senin bu konuda ne söylediğini dinlemek için. \n- Bu karar senin için doğru mu, mutluluk getirecek mi? Kendini ifade etmene izin veriyor mu?\n- Ağzından çıkanları zihinsel olarak değerlendirme ve yargılama, ne diyorsan doğrun odur.`,
        },
        {
          name: "Mental",
          value: `Tanınma ve Davet Al, Söylediklerini Dinle\nBir Rehber olarak, karar alma becerini geliştirmek, sabırla tanınmayı, davet edilmeyi ve aktif olarak kendi sesine uyum sağlamayı içerir. Bu strateji iki temel adımdan oluşur:\n\n1. Adım: Tanınma veya Davet Bekle\n- İş yaşamında tanınma ve davet aldığın alanlarda ilerlemelisin. \n- Tanınma ve davet alana kadar bekle ve bilgeliğini en anlamlı ve etkili şekilde yönlendireceğin şeylerde ilerle. \n- Senin için başarı, zekanı ve bilgeliğini kabul ve takdir eden doğru insanları ve fırsatları seçmekle ilgili.\n\n2. Adım: Söylediklerini Dinle\n- Söylediklerini aktif olarak dinle. \n- Güvendiğin birden fazla kişi ile karar alacağın konuyu konuş- onların fikirlerini almak için değil, senin bu konuda ne söylediğini dinlemek için. \n- Bu karar senin için doğru mu, mutluluk getirecek mi? Kendini ifade etmene izin veriyor mu?\n- Her konuşmanda bakış açındaki değişimleri ve konuyu nasıl tartıştığını gözlemle. Tutarlı olan bölümler karar almanda sana doğru yolu gösterecektir.`,
        },
      ],
    },
    {
      name: "To Inform",
      value: [
        {
          name: "Emotional - Solar Plexus",
          value: `Gör, Netlik Bekle ve Bilgi Ver\nİşleri başlatma ve harekete geçirme konusunda benzersiz bir yeteneğe sahipsin. Karar Alma Stratejin 2 adımdan oluşuyor.\n\n1. Adım: Gör ve Netlik bekle\n- Harekete geçmek için neyin yapılması, başlaması gerektiğini gör ve hisset.\n- Eylemi başlatmadan önce duygusal netliği bekle.\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma.\n- Biraz bekle ve konuyla ilgili hissiyatının aynı olup olmadığına bak.\n- Sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin.\n\n2. Adım: Harekete Geçmeden Önce Bilgilendir.\n- Harekete geçmeden önce etkilenecek kişileri bilgilendir.\n- Kararlarının başkalarını savunma veya koruma moduna sokabileceğini bil. Bilgilendirmek önünü ve iletişimi açar.`,
        },
        {
          name: "Emotional",
          value: `Gör, Netlik Bekle ve Bilgi Ver\nİşleri başlatma ve harekete geçirme konusunda benzersiz bir yeteneğe sahipsin. Karar Alma Stratejin 2 adımdan oluşuyor.\n\n1. Adım: Gör ve Netlik bekle\n- Harekete geçmek için neyin yapılması, başlaması gerektiğini gör ve hisset.\n- Eylemi başlatmadan önce duygusal netliği bekle.\n- Duygusal olarak çok aşağıda ya da yukarıda olduğun zaman karar alma.\n- Biraz bekle ve konuyla ilgili hissiyatının aynı olup olmadığına bak.\n- Sakin ve kesin bir güven durumuna ulaştığında kendin için doğru kararı alabilirsin.\n\n2. Adım: Harekete Geçmeden Önce Bilgilendir.\n- Harekete geçmeden önce etkilenecek kişileri bilgilendir.\n- Kararlarının başkalarını savunma veya koruma moduna sokabileceğini bil. Bilgilendirmek önünü ve iletişimi açar.`,
        },
        {
          name: "Splenic",
          value: `Gör, İç güdülerine Kulak ver ve Bilgi Ver\nİşleri başlatma ve harekete geçirme konusunda benzersiz bir yeteneğe sahipsin. Karar Alma Stratejin 2 adımdan oluşuyor.\n\n1. Adım: Gör ve İçgüdülerine Kulak Ver\n- Harekete geçmek için neyin yapılması, başlaması gerektiğini gör ve hisset. \n- Eylemi başlatırken içgüdülerin anlık olarak sana doğru yolda olup olmadığını bildirir. Anda kalman ve çok kısık gelen bu sinyallere kulak vermen önemli.\n\n2. Adım: Harekete Geçmeden Önce Bilgilendir\n- Harekete geçmeden önce etkilenecek kişileri bilgilendir.\n- Kararlarının başkalarını savunma veya koruma moduna sokabileceğini bil.  Bu şekilde savunmaları kırar, açık, üretken ve barışçıl iletişime giden yolu açarsın.`,
        },
        {
          name: "Ego Manifested",
          value: `Gör, İradeni Dinle ve Bilgi Ver\nİşleri başlatma ve harekete geçirme konusunda benzersiz bir yeteneğe sahipsin. Karar Alma Stratejin 2 adımdan oluşuyor.\n\n1. Adım: Gör ve İradene Kulak Ver\n- Harekete geçmek için neyin yapılması, başlaması gerektiğini gör ve hisset. \n- İradeli kararlılığın senin için bir şeyin doğru olup olmadığını belirlemede sana rehberlik eder. \n- Karar verirken, kişisel çıkarlarına dikkat et ve "Ben ne istiyorum?" diye sor. İraden bu konuda ilerleyip ilerlememen gerektiğini sana bildirir.\n\n2. Adım: Harekete Geçmeden Önce Bilgilendir\n- Harekete geçmeden önce etkilenecek kişileri bilgilendir.\n- Kararlarının başkalarını savunma veya koruma moduna sokabileceğini bil.  Bu şekilde savunmaları kırar, açık, üretken ve barışçıl iletişime giden yolu açarsın.`,
        },
      ],
    },
    {
      name: "Wait a Lunar Cycle",
      value: [
        {
          name: "Lunar",
          value: `Senin için önemli konularda en doğru kararları almak, yansıtmak, değerlendirmek ve tartışmak için yaklaşık bir ay beklemelisin. Karar Alma Stratejin 2 adımdan oluşuyor:\n\n1. Adım: Yansıtmak, Değerlendirmek ve Tartışmak için Yaklaşık Bir Ay Geçir\n- Bu süre boyunca çevrene çok dikkat et, kendini iyi hissettiren, sana pozitif gelen insanlarla çevrili olmak senin için önemli. \n- Bu bir ay boyunca konu hakkındaki hissiyatını takip et. \n\n2. Adım: Güvendiğin kişilerle konuyu konuş\n- Güvendiğin kişiler ile - onların fikirlerini almak için değil - kendi düşüncelerini ifade etmen için konuş. \n- Zaman içinde konuştuğunu dinlemek, içsel gerçeğini bulmanda yardımcı olur. \n- Bu bekleme ve tartışma sürecinde bir kararın senin için doğru olup olmadığını gösteren derin bir içsel hissiyat geliştirirsin. Bu şekilde kendin için en doğru kararları alabilirsin.`,
        },
      ],
    },
  ];
  var gates = [
    {
      name: "15",
      title: "Güvenilirlik",
      value: `Parçası olduğun ekibi uyumlu ve güvenilir bir ekip halinde bir araya getirme yeteneğin var.  Sen ekipteyken kişiler daha güvenilir ve stabil olur.`,
    },
    {
      name: "5",
      title: "Kültür",
      value: `İçinde bulunduğun ekibin, iç kurallarını belirleme yeteneğin var. Bu ekipte nasıl giyinilir, toplantılar nasıl yapılır, birbirine nasıl davranılır gibi ekibin iç yaşamını belirleme yeteneğidir.  Ekibin "Buralarda işleri böyle yapıyoruz!" algısını sen sağlayaiblirsin.
    `,
    },
    {
      name: "14",
      title: "Kapasite",
      value: `İçinde bulunduğun ekip ya da işletmenin gelişmesine yardımcı olan kaynakları üretme yeteneğidir.  Kaynaklar = para, insanlar ve/veya ihtiyaç duyulan malzemeler.  Bu, herhangi bir işi hızlı bir şekilde başlatan şeydir, sen bu konuda yeteneklisin.`,
    },
    {
      name: "2",
      title: "Vizyon",
      value: `İçinde bulunduğun ekibin ya da işletmenin yönünü belirleme yeteneğin var.  Ayrıca, edinilen karın en iyi yönlendirilmesinin yolunu gösterebilirsin.  Ekip için "ilerlediğimiz yön bu" algısını oluşturabilirsin.
    `,
    },
    {
      name: "46",
      title: "Koordinasyon",
      value: `İçinde bulunduğun ekibin uyumlu işleyen bir ekip olmasını sağlama yeteneğin var. Grubun kişiliğinin geliştiği yer de burasıdır.`,
    },
    {
      name: "29",
      title: "Bağlılık (Dedikasyon)",
      value: `İçinde bulunduğun ekibin bir hedefe bağlı kalmasına ve ona ulaşmasına yardımcı olma yeteneğin var.   Ekipte şu hissi yaratırsın: Hepimiz aynı fikirdeyiz ve birlikte çalışmaya kararlıyız.`,
    },
    {
      name: "7",
      title: "Planlama",
      value: `İçinde bulunduğun ekipte, planlama, Ar-Ge ve doğru işi yapan doğru insanlara sahip olma yoluyla geleceğe başarılı bir şekilde ilerleme yeteneğin var.  İlerledikçe ne olması gerektiğini belirlemek senin işin.`,
    },
    {
      name: "31",
      title: "Uygulama",
      value: `Herkesin rollerini doldurduğundan ve gerekli işi yaptığından emin olarak planı eyleme geçirme yeteneğin var.  Bu, organize olma ve her şeyi takip edip yönetebilme yeteneğidir.`,
    },
    {
      name: "1",
      title: "Satış",
      value: `Ekibin ürettiği ürün veya hizmetleri müşteriler ile buluşturma konusunda yetkinsin.`,
    },
    {
      name: "8",
      title: "Halkla İlişkiler",
      value: `Gerekli dikkati çekme yeteneğine sahipsin.  İçinde bulunduğun ekibin, ürün ve hizmetlerin fark edilmesini sağlayabilirsin.`,
    },
    {
      name: "13",
      title: "Sayısal Takip",
      value: `Bu, yapılan işin ne kadar karlı olduğunu bilme yeteneğidir.  Ekibin işini sürdürmesi için doğru sayıları ve ayrıntıları takip edebilirsin.`,
    },
    {
      name: "33",
      title: "Gözetim",
      value: `Bu, tüm operasyonu denetleme ve her şeyin sorunsuz çalıştığından emin olma yeteneğidir. Müşterileri ve çalışanları denetleyen gözler ve kulaklar sen olabilirsin`,
    },
  ];
  var channels = [
    {
      name: "59-6",
      title: "Etkileşim",
      value: `İş yaşamındaki kimseler ile hızlı ve kolay bir şekilde bağlantı kurabilirsin. Kurduğun sıcak bağlar ile yapılan işlerde yaratıcılığın önünü açarsın. Yaratıcılık ve ilişki gerektiren işlerde başarılı olabilirsin.`,
    },
    {
      name: "45-21",
      title: "Yönetim",
      value: `Bir şeyleri yönetmek için buradasın. İradenin gücü ile para ve kaynakların maddi dünyasında ustalaşabilirsin. Başarılı olmak için bağımsız ve kontrolde olmalısın, aynı zamanda başkalarını da başarılı olmak için ne yapmaları gerektiği konusunda eğitebilirsin. Başarın, liderlik etmen için sana güvenen ekibin tam desteğine ve iş birliğine sahip olmakta yatar.`,
    },
    {
      name: "9-52",
      title: "Konsantrasyon",
      value: `Odaklanmak için lazer benzeri bir yeteneğin var. Ayrıntılara odaklandığında, seni yerinde tutmaya yardımcı olan sessiz, stresli olmayan bir baskı yaşarsın. Kendini adadığın her şeyin ayrıntılarını sürekli  değerlendirirsin. Parçası olduğun ekibin de bir konuya odaklanmasına yardımcı olabilirsin.`,
    },
    {
      name: "60-3",
      title: "Inovasyon",
      value: `Yenilik ve inovasyon gücü, seni ve çevrendekileri değişim ve yeni bir şeyler yaratma potansiyeli ile güçlendirir. Bu değişim seviyesini kucaklamak için körü körüne kendine inanç gereklidir, çünkü aniden gerçekleşebilir ve kuantum sıçraması gibi hissedilir. İçgüdülerine güven. Yaşam için sloganın "değişim, olması gerektiği zaman mutlaka olur".`,
    },
    {
      name: "2-14",
      title: "Yön",
      value: `Mevcut kaynakların doğru dağıtımı yoluyla çevrendekilerin yönünü ve gelişimini güçlendirme potansiyelin var. Sevdiğin bir şeyi yaparak uzun saatler boyunca yaratıcı çalışmayı sürdürecek potansiyele ve enerjiye sahipsin. Yaptığın işi sevdiğinde, büyük bir zenginlik ve güç üretme potansiyeline sahipsin. Oluşturduğun veya erişimin olan kaynaklar sadece kendi kullanımı için değil, çevrendekileri güçlendirmek için de kullanabilirsin.`,
    },
    {
      name: "20-34",
      title: "Karizma",
      value: `Bir şeye, kişiye, fikre veya bir plana olumlu yanıt verdikten sonra harekete geçtiğinde mükemmel şekilde çalışan ve gerçekleştirme kapasitesi olan bir güçle donatıldın. İş yaşamında çok işine yarayacak bu kişisel güç, bağımsız olman için seni desteklemek, inançlarına göre hareket etmek, zafer kazanmak ve kendin olarak hayatta devam etmek için sadece senin kullanımına açık bir gerçekleştirme gücüdür.`,
    },
    {
      name: "57-20",
      title: "Anın Gücü",
      value: `Hayat seni kendi refahını güçlendirmek ve anda gerçeğini ve sezgisel içgörülerini dile getirmek için sezgisel farkındalığını kullanmaya teşvik eder. Bu, iç sansür olmadan "ayaklarının üzerinde düşünme ve konuşma" yeteneğidir. Spontane kelimelerinin ve içgüdülerinin, düşünmene gerek kalmadan bir durumun özüne hızlı bir şekilde ulaştığını sık sık göreceksin.`,
    },
    {
      name: "39-55",
      title: "Kışkırtma",
      value: `Çevrendekilerin inançlarını körükleyebilirsin. Tutkudan melankoliye, mutluluktan üzüntüye sürekli değişen duyguların ile en derin yaratıcılık seviyelerine erişebilirsin. Ruh halini ve şu anda hissettiğin her şeyi kucaklamayı öğrendiğinde, etrafındakileri etkileme ve değiştirme gücüne de sahip olursun. Tutkun, kendini iyi hissettiğin zamanlarda çavrendekiler ve iş arkadaşlarının gerçek doğasını ve ruhunu ortaya çıkartabilir.`,
    },
    {
      name: "61-24",
      title: "Yaratıcı Süreç",
      value: `İlham, içsel gerçeklik ve bireysel bilgelik ile dolu zihinsel kapasiten kendini ve çevrendekileri yüreklendirir. Bireysel olarak yaratıcı zihinsel bilme sürecinin deneyimi senin için oldukça spontane olabilir. Bazen sanki başka bir yerden bir şey duyuyormuşsun ve ilham alıyormuşsun gibi hissedersin, bu da hayatı tamamen yeni bir şekilde görme potansiyelini sunar. Zihnin bu yeni farkındalıklarla başkalarına ilham vermek için tasarlanmıştır ve bu iş yaşamında oldukça işine yarayacak bir güçtür.`,
    },
    {
      name: "43-23",
      title: "Verimlilik",
      value: `İşleri daha verimli hale getirmek için özümsenebilecek ve benzersiz bir içgörü olarak ifade edilebilecek spontane bir atılım potansiyeline sahipsin. Zihnin sadece bildiklerini kucaklamak için değil, bilinmeyenleri keşfetmek için burada. İçgörülerin zaman zaman ışık yılı ilerideymiş gibi gelebilir. Davet almadan değerli fikirlerini etrafındakiler ile paylaşma. Tanındığında ve benzersiz içgörünü paylaşmaya davet edildiğinde, dehan doğal olarak ortaya çıkar.`,
    },
    {
      name: "51-25",
      title: "Rekabetçilik",
      value: `İlk olmaya ve yeni bir şeyler başlatmayı seversin. Rekabetçi olmak doğanda var ve başkalarında rekabet gücü uyandırabilir ve güçlendirebilirsin. Her rekabetçi atılım, başkalarını güçlendirmek için kendi ruhunun derinliğine dair neşe ve yeni bir farkındalık getirir.`,
    },
    {
      name: "10-34",
      title: "İnancın Gücü",
      value: `Ne kadar olağandışı olursa olsun kendi inançlarını takip etmek ve müdahaleye rağmen bağımsız ve kendin gibi davranmak için buradasın. Kendin olarak yaşayarak, başkalarını da kendi inançlarıyla temasa geçmeleri için güçlendirebilirsin.`,
    },
    {
      name: "34-57",
      title: "Güç",
      value: `İstediklerini hayata geçirmek için inanılmaz bir güce sahipsin. Bu kişisel gücü, bağımsız olmak, kendini desteklemek ve eşsiz inançlarına göre hareket etmek içim kullanabilirsin. Açık ve hızlı bir şekilde tepki verebilmek için, sürekli olarak beden bilince bağlı olmalısın. Yaşamsal olarak canlı olmanın ve an be an yaşamanın ne anlama geldiğinin ilham verici bir örneği olabilirsin.`,
    },
    {
      name: "10-57",
      title: "Mükemmelleştirilmiş Form",
      value: `Bu yaratıcı bir güçtür. Derin sezgisel dürtülerin, kendini ve hayatını tamamen sevmek, güvenmek ve kucaklamak için geleceğin korkularını serbest bırakmak için davranışlarına rehberlik eder. "Tek ayak üzerinde hızlı düşünme" yeteneğine sahipsin. Yaratıcılığın, hayatta kalmanın garanti altına alınacağı ve yarının korkusundan korunma sağlayan ortamlar yaratma/tasarlama şeklinde ortaya çıkar. `,
    },
    {
      name: "20-10",
      title: "Yüksek İlkeler",
      value: `Şu anda, kim olduğunun gerçeğini ifade etme potansiyeline sahipsin. Tanındığında ve davet edildiğinde, çevrendekilere yüksek gerçeklerine başarılı bir şekilde uyum sağlamaları için rehberlik edebilecek daha yüksek ilkeli davranışların savunucusu olmak için buradasın.  Bireysellik yoluyla liderlik potansiyeline sahipsin.`,
    },
    {
      name: "28-38", 
      title: "Azim",
      value: `Kendini ve çevrendekileri, işin ve yaşamın doğal bir parçası olan mücadelelerde anlam ve amaç bulmaları için yüreklendirip güçlendirebilirsin. En zor ihtimallere karşı bile kendi yolunda gitmek için inatçı ve kararlı olman sağlıklı. Anlamlı olduğunu düşündüğün bir amaç için savaşmak senin için değerli. Çevrendekileri daha derin bir kariyer ve yaşam amacı sürdürmeye teşvik ederek onları güçlendirebilirsin.`,
    },
    {
      name: "12-22",
      title: "Sosyallik",
      value: `Açıklığınla, ifadeni ayarlamana ve sosyal ortama veya duruma göre doğru kelimeleri veya duyguyu kullanmana izin veren özelliklere sahipsin. Sosyallik seviyen, ruh haline bağlı olabilir. Keskin bir zamanlama duygusu ve hedef kitlenin ne kadar açık olduğunun farkındalığı ile - insanların dikkatini çekmek için sıcaklığını ve sosyal becerilerini ne zaman kullanacağını bilirsin, böylece sözlerin çevrendekilerin hayatlarında değişim için bir katalizör olabilir.`,
    },
    {
      name: "33-13",
      title: "Tanık Olan Lider",
      value: `Dinleme, duyduğun bilgileri ve sırları saklama ve ders alınabilecek anıları toplama yeteneğine sahipsin. Yüzeyin altında olanın kendisini daha derin bir gerçek şeklinde ortaya çıkarmasını sabırla beklerken, tanık olduğun deneyimler üzerine düşünüp bunları yansıtabilirsin. Doğal bir kayıt tutucu olarak, etrafındakilerin hikayelerini toparlayabilirsin.
    `,
    },
    {
      name: "30-41",
      title: "Hayal Kurma",
      value: `Odaklanmış enerjini, 'olabileceklere' dair sayısız senaryoyu hayal etmek için kullanma yeteneğine sahipsin. Yeni deneyimler kazanmak için sonsuz bir özlemle, hayallerin ve arzuların, yerine getirilebilecek veya getirilemeyecek beklentiler yaratabilir. Yeni deneyimler isteğin, net kararlar vermek için yeterli zaman ayırmak için sabır ve öz kontrol geliştirerek en iyi şekilde dengelenir. Güçlü hayal gücü ile yenilikçi fikirler üretebilir, kalıpların dışında düşünebilir ve zorluklara yeni çözümler önerebilirsin. Bu yaratıcılık, problem çözmede ve ekip içinde bir inovasyon kültürünü teşvik etmede paha biçilmez olabilir.`,
    },
    {
      name: "56-11",
      title: "Merak",
      value: `Sürekli olarak zihinsel uyarılara açık ve çevrendeki dünyayı görmenin yeni yollarını keşfetmeye heveslisin. Belirli bir şey bulmak için yola çıkmazsın, bunun yerine çevrendekiler ile "Ne keşfettiğime bakın" paylaşımını yapmayı tercih edersin. Yaratıcılığın ve sunum tarzın, hayatı deneyimleyen bir insan olmanın ne anlama geldiğine dair felsefi düşüncelerine dayanan fikirleri ve hikayeleri bir araya getirdiğinde büyülü bir hale gelir. Soyut fikirleri almak ve onlardan bir izleyici kitlesine öğretebilecek veya eğlendirebilecek bir hikaye oluşturmak için kıskanılacak bir yeteneğin var. Davet aldığında bu harika hikayeleri çevrendekiler ile paylaş.`,
    },
    {
      name: "27-50",
      title: "Sorumluluk",
      value: `Diğerleri doğal olarak onları desteklemen ve gelişimleri için beslemen için sana bakar. Çevrendekilerin doğal olarak güvendiği birisin. Çok fazla sorumluluk üstlenmeye yatkın olabilirsin. Bir işletmenin veya ekibin değerlerini ve kurallarını oluşturma ve savunmayı istersin. Çevrendekilerin bakımına katılma konusunda destek olabilir, başkalarını da destekleyebilirsin. Sorumluluğu üstlenecek enerjiye sahip olup olmadığını yalnızca içgüdüsel tepkin aracılığıyla anlayabilirsin. Yapman gerektiğini düşündüğün için ek sorunluluklar almamaya dikkat et.`,
    },
    {
      name: "54-32",
      title: "Tutku",
      value: `Gerçekten neyin dönüştürülebileceğini ortaya çıkartmaya dair tutarlı bir çaban ve içgüdülerinle beslenen bir motivasyonun var. Hayattaki konumunu daha iyi hale getirmek için çabalarının tanınması ihtiyacıyla ilerlersin ve çevrendekilere hizmet edersin. Sadakat ve özverili çalışmaların, iş yaşamında ilerleme ile ödüllendirilir. Potansiyelini gerçekleştirebileceğin, hedeflerine ulaşabileceğin, finansal olarak başarılı olabileceğin ve çevrendekilerin potansiyellerine ulaşmalarına yardımcı olmak için benzersiz yeteneklerini kullanabileceğin bir kariyerde ilerlemek için içgüdülerine güven.`,
    },
    {
      name: "49-19",
      title: "Kaynaklar",
      value: `Yiyecek, barınak, bölge, koruma, idealler ve değerler dahil olmak üzere çevrendekilerin ihtiyaçlarına duyarlı olma yeteneğine sahipsin. Ekibinin, şirketinin veya müşterilerinin istikrarı ve refahı için nelerin sağlanması gerektiğini bilirsin. Çevrendekileri onlara hizmet etmeyen ve çıkarlarına uygun olmayan şeyleri reddetmeye teşvik edebilirsin. Pratikliği ve adaleti her zaman dengeleyebilen biri olarak tanınabilirsin. İşlerin akışında kendi konumuna karşı hassasiyet gösterirsin. İhtiyaç duyulmayı istemek ve istenmeye ihtiyaç duymak mutluluğun için önemlidir. Bulunduğun iş ortamının fiziksel ve duygusal olarak sağlıklı olmasını sağlayabilirsin. Hem pratik hem duygusal ihtiyaçlar da dahil olmak üzere çevrendekilerin ihtiyaçlarına duyarlı olma yeteneği, şefkatli ve empatik bir yaklaşıma katkıda bulunur. Bu, ekip içinde ve müşterilerle olumlu ilişkileri teşvik edebilir.`,
    },
    {
      name: "37-40",
      title: "Topluluk",
      value: `Arkadaşlıklar ve topluluklar yaratabilme armağanına sahipsin. Bireylerin, herkesin onurlu bir yere ve saygın bir işleve sahip olduğu bir topluluğun parçası olmaları için köprüler oluşturabilirsin. Topluluğun parçası bireylerin aldıkları karşısında vermeleri gerekliliğini anlayan ve anlatansın. "Sen bunu yapacaksın, biz de senin için şunu yapacağız. Üzerinde el sıkışalım ve anlaşalım" şeklinde anlaşmalar sana göre. İnandığın, parçası olmaktan hoşlandığın ve sana inanan bir topluluğu var etmek ve sürdürmek için çalışmaya hazırsın. Herkesi bir arada tutan kişi sen olabilirsin. İçinde bulunduğun ekibin işbirliğini, iletişimini ve genel etkinliğini artırabilirsin.`,
    },
    {
      name: "53-42",
      title: "Döngülerin Gücü",
      value: `Hayatın farklı başlangıçları, ortaları ve sonları olan döngüler halinde çalışır. İşlerin olgunlaşması, büyümesi ve gelişmesi zaman alır. Sonunda aşağı doğru seyreder ve sona ererler - bu da yeni bir döngünün başlamasına vesile olur ve yeni bir şeyi başlatır. Bir deneyime girerek ve tamamlayarak, tamamlanan döngüden öğrendiğin değerli dersleri ve bilgeliği yansıtabilir ve paylaşabilirsin. Tamamlanan döngüler üzerinde düşünme yeteneği, sürekli iyileştirmeye katkı sağlayabileceğini gösterir. Geçmiş deneyimlerden elde ettiğin içgörülerin devam eden gelişime katkıda bulunduğu bir öğrenme ortamını teşvik ederek ekip içinde bir düşünme kültürünü teşvik edebilirsin.`,
    },
    {
      name: "46-29",
      title: "Keşif",
      value: `Yeni farkındalıklar için potansiyelin ve tamamlanana kadar bir deneyimde kalma azmin var. Kararlılık ve azim sende doğal olarak bulunan yetenekler. Doğru zamanda doğru yerde sağlayan bir gücün var. Keşif sürecinden elde edebileceğin memnuniyet ve paylaşabileceğin bilgelik için her deneyime beklenti olmadan gir ve yaşa. Sonunda elde ettiğin nihai çıktı bu deneyim ile mümkün olacaktır. Yeni fikirler üretme, keşif sürecine bağlı kalma ve sezgisel içgörülerden yararlanma becerin, içinde bulunduğun ekibin yenilik yapma, uyum sağlama ve iş ortamındaki fırsatları yakalama becerisini önemli ölçüde artırabilir.`,
    },
    {
      name: "35-36",
      title: "Deneyimci",
      value: `İşleri ilerleme yönünde ilerletmek için her şeyi denemeye isteklisin. İşinde ve yaşamında yeni ve daha iyi bir şey vaat eden kolektif deneyimlerden bilgelik aramaya ve toplamaya yönlendirilirsin. Yeni bir deneyim beklentilerini karşılayamazsa hayal kırıklığına uğramak yerine, her deneyimi kendi iyiliği için yaşamayı kucaklamak, kabul etmek ve teslim olmak sana iyi gelir. Potansiyel yaşam başarın, birçok şeyi tatmış, dokunmuş ve hissetmiş birisi olarak, çevrendekilerin kullanımına sunabileceğin bilgeliği edinmiş olmaktır. Böylece çevrendekilere ilham olabilirsin. Senin topladığın ve paylaştığın deneyimler sayesinde içinde bulunduğun ekip her şeyi sıfırdan kurgulamadan, bu deneyimlerden öğrenerek kolayca ilerleme kaydedebilir.`,
    },
    {
      name: "47-64",
      title: "Süreçsel Deneyimleme",
      value: `Yeni bir bakış açısı kazanmak için geçmişi gözden geçirmek ve anlamlandırmak için zihinsel kapasiteni sürekli kullanırsın. Olasılıklarla oynamayı asla bırakmayan çok aktif bir zihnin var.  Keşif sürecinde sabırlı ol, geçmişi değerlendirerek zamanla diğerleri ile paylaşmak için yeni bir bakış açısıyla yeni bir anlayış yaratma kapasitesine sahipsin. Hissettiğin geçmişi anlamlandırma baskısı, stratejik düşünmene yardımcı olabilir. Bulunduğun iş yeri ya da ekipte, karar verme ve gelecekteki eylemleri tasarlamak için geçmiş verilerden ve deneyimlerden yararlanarak stratejik planlamaya katkıda bulunabilirsin.`,
    },
    {
      name: "5-15",
      title: "Paternler ve Ritim",
      value: `Akışın ve ritminle uyumlu olduğunda, yaptığın her şey zahmetsiz ve doğal hissettirir. Sana hizmet eden sabit kalıplar veya rutinler sana iyi gelir. Ayrıca, çevrendekileri tüm farklılıkları ile kabul etme ve kucaklama yeteneğine de sahipsin, ki bu yeni iş dünyasında çok önemli bir yetenektir. Tamamen kişisel içsel ritmin tarafından belirlenen kendi zamanlama ve akış duygunla ilerlemek sana ve içinde bulunduğun ekibe iyi gelir. Sabit kalıplara veya rutinlere bağlı kalma yeteneği, iş yaşamında tutarlı ve güvenilir bir iş çıktısı ile sonuçlanabilir.`,
    },
    {
      name: "8-1",
      title: "İlham",
      value: `Herkesin deneyimlemesi için tanıtılabilecek ve sergilenebilecek bir biçimde farklı bir bakış açısını yaratıcı bir şekilde ifade etme yeteneğine sahipsin. Kendini ifade eden, yaratıcı bir birey olmanın ne anlama geldiğini modellemek ve başkalarının dikkatini çekmek için tasarlandın. Kalabalığın arasından sıyrılmak cesaret ister ve bu sende var. Böylece başkalarına eşit derecede cesur olmaları için ilham verirsin. Bu yeteneğin ile iyi bir lider olabilir, yaratıcı konularda ileri gidebilirsin.`,
    },
    {
      name: "31-7",
      title: "Liderlik",
      value: `Çevrendekileri geleceğe güvenli bir şekilde götürme potansiyeline sahipsin. Bu, kesin olarak takip edilebilecek test edilmiş ve yerleşik kalıplara dayanan mantıklı bir liderlik türüdür. Liderlik etmek için önce güven kazanmalısın. Mevcut kalıpları kavrayan, eğilimleri anlayan ve insanların ihtiyaçlarıyla temas halinde olan biri olarak tanınmalısın. Sesin çevrendekilerde bir etki yaratır, ancak liderlik etmek için çoğunluk tarafından davet edilmen gerekir. Ayrıca nüfuz ederek perdenin arkasından da liderlik etme yeteneğine de sahipsin.`,
    },
    {
      name: "18-58", 
      title: "Yargılama",
      value: `Herhangi bir kalıbı yargılamak, meydan okumak, düzeltmek ve mükemmelleştirmek için doyumsuz bir dürtüye sahipsin. Sadece en iyi cevaplara sahip olduğunu kanıtlamayı amaçlayan mantığın için hiçbir zorluk çok büyük değil. Hataları görüp düzeltebilirsin. Düzeltmelerini isteyenler, cevaplarına hazırlıklı ve açık olan kişilerdir.`,
    },
    {
      name: "48-16",
      title: "Yetenek",
      value: `Bir soruna potansiyel bir çözüm bulmak veya mükemmelleştirilmesi gereken bir şeyi düzeltmek ve iyileştirmek için derinliğe ve becerilere sahipsin. İçsel bir beceriyi mükemmelleştirmek için sezgisel derinliği tekrarlayan deneyler ve pratikle birleştirebilirsin. Yeteneğini başarılı bir şekilde geliştirmenin anahtarı, yapmayı sevdiğin bir şeyle tamamen özdeşleşmektir - ustalığa ulaşmak için büyük bir özveri gösterebilirsin. Derinliğini ustalığa ulaşmak veya bir becerinin mükemmelleştirilmesi için kullanarak, becerilerini bir yeteneğe dönüştürebilirsin.`,
    },
    {
      name: "63-4",
      title: "Mantıksal Süreç",
      value: `Bir soru sorabilir, tanınabilir paternleri bulabilir, mevcut verileri hesaba katabilir ve gelecek hakkında iyi bir tahminde bulunabilirsin. Şüphe, mantıksal süreç için kesinlikle gereklidir, çünkü mantık formülasyonunda kusursuz olsa da ve yine de yanlış olabilir!  Tutarlı olup olmadıklarını görmek için kalıpları sürekli filtreleyen çok aktif bir zihnin var. Bir model tutarsız olduğu anda, baskı yoğunlaşır ve sonunda cevap gerektiren bir soru haline gelir. Mantıksal sürecini en iyi şekilde çevrendekilere fayda sağlamak için kullanabilirsin.`,
    },
    {
      name: "17-62",
      title: "Organizasyon",
      value: `Devam eden bir iç süreçte, zaten kanıtlanmış ayrıntılara dayanan bilgileri zihinsel olarak yönetme yeteneğine sahipsin. Zihnin sürekli olarak ayrıntıları kendi zihinsel dosyalama sisteminde düzenlemekle meşgul ve her zaman başkalarının ne düşündüğüne veya söylediğine bakarak büyük resmi düzenler. İş gruplarını, etkinlikleri ve projeleri mantıklı bir şekilde organize etmek için çok aranan bir gücün var. `,
    },
    {
      name: "26-44",
      title: "Girişim",
      value: `Hedeflediğin kişilere, bir şeyi ikna edici bir şekilde anlatma ve kabul ettirme ya da satma yeteneğine sahipsin. Başkalarını içgüdüsel olarak değerlendirmek ve onları "ihtiyaç duydukları" ürünler, işler ve hatta ideolojilerle eşleştirmek için bir yeteneğin var. İçgüdülerine güven - bir şey doğru 'kokmuyorsa', ondan uzaklaş.`,
    },
  ];
  var holland = [
    {
      name: "Araştırıcı",
      nameBig: "ARAŞTIRICI",
      value: {
        description: `Harekete geçmek yerine düşünmeyi ve gözlemlemeyi seçmek\nİkna etmek yerine bilgiyi düzenlemeyi ve anlamayı seçmek\nİnsanlarla çalışmak yerine verilerle çalışmak`,
        feature: `Entelektüel, analitik düşünce yapısına sahip, rasyonel, eleştirel, titiz, sabırlı, yöntemci, bağımsız, popüler olmaktan hoşlanmayan`,
        value: 0,
      },
    },
    {
      name: "Sosyal",
      nameBig: "SOSYAL",
      value: {
        description: `Diğer insanlarla yakın ilişkiler kurmak için daha fazla çekilirler.\nEntellektüel veya fiziksel olmak istemeye daha az eğilimlidirler.\nÖğretme veya yardım durumlarında, ihtiyaçlarını karşılıyor gibi görünen insanlarla çalışmayı severler`,
        feature: `Yardımsever, sorumluluk sahibi, sosyal işbirliğine yatkın, empatik, arkadaş canlısı, içten, sabırlı, nazik, anlayışlı`,
        value: 0,
      },
    },
    {
      name: "Gerçekçi",
      nameBig: "GERÇEKÇİ",
      value: {
        description: `Nesnelerle çalışmayı seven, “iddialı ve rekabetçi” dirler.\nMotor koordinasyon, beceri ve güç gerektiren faaliyetlere odaklanırlar.\nKonuşmak ya da oturup düşünmek yerine bir problem üzerinde çalışmayı tercih eder.\nSoyut olandan ziyade somuta odaklanırlar.\nEstetikten ziyade bilimsel ve mekanik olanı seçerler.`,
        feature: `Sabırlı ve hoşgörülü, pratik, maddeci, eril, antisosyal, uyumlu, içten, doğal, sabırlı, iç görüleri ve başarma güdüleri fazla`,
        value: 0,
      },
    },
    {
      name: "Girişimci",
      nameBig: "GİRİŞİMCİ",
      value: {
        description: `İnsanlar ve veriler ile çalışmayı severler.\nOnlar iyi konuşmacılardır ve bu beceriyi başkalarına liderlik etmek veya ikna etmek için kullanırlar.\nAyrıca "güce, paraya ve statüye" değer vererek yüksek güçlü durumlara çekilirler`,
        feature: `Dışa dönük, enerjik, kendine güvenli, atılgan, fevri, ikna yeteneği yüksek, sabırsız, meraklı, maceracı, iyimser, sosyal, konuşkan`,
        value: 0,
      },
    },
    {
      name: "Artistik Sanatsal",
      nameBig: "ARTİSTİK SANATSAL",
      value: {
        description: `Estetik faaliyetler yaparlar\nTutkulu, bağımsız, sistematik olmayan aktiviteleri severler\nSanatsal etkinlik ve ürünler yaratmayı tercih ederler\nBağımsız, yaratıcı çalışmalar içindedirler`,
        feature: `Heyecan ve coşkuları dengesiz, hayalci, fevri, karmaşık, sezgileri güçlü, bağımsız, duygusal, uyumlu olmayan, duyarlı ve etkileyici`,
        value: 0,
      },
    },
    {
      name: "Geleneksel",
      nameBig: "GELENEKSEL",
      value: {
        description: `Sistemli kurallara bağlı aktiviteler\nNesnelerle ilgili sistematik çalışmalar\nKayıt tutma, hesaplama, kontrol işlemleri, veri`,
        feature: `Dikkatli, titiz, itaatkar, tutarlı, esnek olmayan, düzenli, sabırlı, vicdanlı, özdenetimli, hayal gücünden yoksun, dengeli`,
        value: 0,
      },
    },
  ];
  var big5 = [
    {
      name: "Deneyime Açıklık",
      nameBig: "DENEYİME AÇIKLIK",
      value: {
        karakter: `Deneyime açıklık, kişinin yeni fikirleri ve deneyimleri ne kadar istekli bir şekilde kabul ettigini yansıtır.`,
        arti: `Deneyime açıklık, yaratıcılığı, esnekliği ve yeni fikirleri benimseme yeteneğini yansıtır. Bu özellik, sanat ve inovasyon alanlarında başarı getirebilir.`,
        eksi: `Deneyime aşırı açık olmak, bazen odak kaybına veya sabit bir kariyer hedefine sahip olmama sorunlarına neden olabilir.`,
        value: 0,
      },
    },
    {
      name: "Uyumluluk",
      nameBig: "UYUMLULUK",
      value: {
        karakter: `Uyumluluk, kişinin diğer insanlarla nasıl etkileşimde bulunduğunu, empati yeteneğini ve işbirliği yapma istegini yansıtır.`,
        arti: `Uyumluluk, işbirliği, empati ve iletişim becerilerini yansıtır. iş yerinde diğer insanlarla iyi geçinme yeteneği için avantaj saglayabilir.`,
        eksi: `Aşırı uyumlu olmak, sınırların belirsizleşmesine ve iş yerinde zor kararlar almada güçlük yaşanmasına neden olabilir.`,
        value: 0,
      },
    },
    {
      name: "Öz Disiplin",
      nameBig: "ÖZ DİSİPLİN",
      value: {
        karakter: `Öz Disiplinli olma, kişinin disiplini, organizasyon yeteneği ve hedeflerine nasıl sadık kaldığını yansıtır.`,
        arti: `Öz Disiplinli olma, disiplini, organizasyon becerilerini ve sorumluluk hissini yansıtır. Bu, zaman yönetimi ve verimlilik açısından avantaj sağlayabilir.`,
        eksi: `Aşırı öz disiplinli olmak, esneklik eksikliğine yol açabilir ve iş yerinde aşırı mükemmeliyetçiliğe neden olabilir.`,
        value: 0,
      },
    },
    {
      name: "Dışa Dönüklük",
      nameBig: "DIŞA DÖNÜKLÜK",
      value: {
        karakter: `Dışa Dönükler, sosyal ilişkileri geliştirmeye ve yeni arkadaşlar edinmeye açık olabilirler. Kişinin sosyal çevresiyle daha fazla etkileşimde bulunma eğilimini yansıtabilir.`,
        arti: `Sosyal etkileşimlere yatkınlık, liderlik pozisyonlarına uygunluk ve ekip çalışması yeteneği gibi dışa dönüklük özellikleri, iş yerinde iş birligi ve iletişim becerilerini geliştirebilir.`,
        eksi: `İş yerinde fazla dışa dönük olmak, odak kaybına neden olabilir ve bazen kişinin kendi görevlerine odaklanmasını zorlaştırabilir.`,
        value: 0,
      },
    },
    {
      name: "Duygusal Dayanıklılık",
      nameBig: "DUYGUSAL DAYANIKLILIK",
      value: {
        karakter: `Duygusal kararlılık, kişinin stresle nasıl başa çıktığını, duygusal dengeyi koruma yeteneğini ve özsaygısını yansıtabilir.`,
        arti: `Duygusal istikrar, stresle başa çıkma yeteneği ve iş yerinde olumsuz durumları tolere etme yeteneğini yansıtır. Bu, kriz anlarında sakin kalma ve etkili kararlar alabilme yeteneğini artırabilir.`,
        eksi: `Aşırı Duygusal istikrar, stresli işlerde veya kriz durumlarında zorluk yaratabilir ve ilişkileri etkileyebilir.`,
        value: 0,
      },
    },
  ];
  var careerSelectionKey = {
    1: [
      { name: "15", value: [2, 1, 4, 4, 3, 4, 5, 3, 4] },
      { name: "5", value: [2, 4, 3, 2, 1, 2, 5, 2, 2] },
      { name: "14", value: [3, 2, 4, 3, 3, 3, 3, 5, 3] },
      { name: "2", value: [2, 3, 4, 3, 2, 3, 3, 5, 3] },
      { name: "46", value: [2, 1, 4, 4, 4, 4, 5, 4, 4] },
      { name: "29", value: [2, 1, 4, 4, 3, 4, 4, 5, 4] },
      { name: "7", value: [3, 1, 4, 3, 4, 3, 5, 4, 3] },
      { name: "31", value: [2, 1, 4, 3, 3, 4, 5, 3, 3] },
      { name: "1", value: [1, 5, 4, 3, 3, 5, 3, 5, 2] },
      { name: "8", value: [1, 3, 4, 4, 2, 5, 3, 5, 2] },
      { name: "13", value: [3, 1, 3, 2, 3, 2, 5, 4, 2] },
      { name: "33", value: [3, 1, 5, 4, 4, 4, 5, 4, 4] },
      { name: "60-3", value: [5, 5, 4, 3, 3, 4, 3, 5, 3] },
      { name: "14-2", value: [5, 5, 4, 3, 3, 4, 3, 5, 3] },
      { name: "34-20", value: [5, 5, 4, 3, 3, 4, 3, 5, 3] },
      { name: "57-20", value: [3, 5, 3, 4, 3, 4, 3, 4, 3] },
      { name: "39-55", value: [4, 4, 4, 4, 4, 4, 3, 4, 3] },
      { name: "61-24", value: [4, 5, 4, 4, 4, 4, 4, 5, 4] },
      { name: "43-23", value: [4, 4, 4, 3, 4, 4, 4, 4, 4] },
      { name: "51-25", value: [4, 4, 4, 4, 4, 4, 3, 4, 3] },
      { name: "34-10", value: [4, 3, 4, 4, 4, 4, 3, 4, 3] },
      { name: "34-57", value: [3, 3, 5, 3, 3, 4, 4, 5, 3] },
      { name: "57-10", value: [3, 3, 4, 3, 4, 4, 3, 3, 4] },
      { name: "10-20", value: [3, 3, 5, 5, 3, 3, 4, 3, 5] },
      { name: "38-28", value: [3, 4, 4, 5, 4, 4, 4, 5, 4] },
      { name: "22-12", value: [3, 3, 4, 5, 3, 5, 4, 3, 5] },
      { name: "13-33", value: [4, 3, 4, 5, 3, 4, 4, 3, 5] },
      { name: "41-30", value: [3, 5, 4, 5, 3, 5, 4, 5, 5] },
      { name: "11-56", value: [5, 4, 4, 4, 5, 5, 4, 5, 5] },
      { name: "59-6", value: [3, 4, 5, 5, 3, 5, 5, 4, 5] },
      { name: "27-50", value: [3, 4, 5, 5, 3, 4, 5, 4, 5] },
      { name: "45-21", value: [3, 3, 5, 5, 3, 4, 5, 5, 4] },
      { name: "32-54", value: [4, 4, 5, 5, 4, 5, 5, 5, 4] },
      { name: "19-49", value: [4, 4, 4, 5, 5, 5, 5, 5, 4] },
      { name: "37-40", value: [4, 4, 5, 5, 4, 5, 5, 5, 5] },
      { name: "53-42", value: [3, 4, 4, 4, 3, 4, 4, 4, 4] },
      { name: "29-46", value: [4, 4, 4, 5, 4, 4, 4, 5, 4] },
      { name: "36-35", value: [3, 4, 4, 4, 3, 4, 4, 4, 4] },
      { name: "64-47", value: [4, 4, 4, 4, 4, 4, 4, 4, 4] },
      { name: "5-15", value: [5, 5, 4, 5, 4, 5, 4, 4, 5] },
      { name: "1-8", value: [2, 5, 4, 5, 3, 5, 3, 5, 5] },
      { name: "52-9", value: [5, 5, 5, 4, 5, 4, 5, 5, 5] },
      { name: "7-31", value: [3, 4, 5, 5, 3, 5, 5, 5, 5] },
      { name: "58-18", value: [5, 5, 5, 5, 5, 5, 5, 5, 5] },
      { name: "48-16", value: [4, 5, 4, 4, 4, 5, 4, 4, 5] },
      { name: "63-4", value: [5, 3, 5, 5, 5, 4, 5, 4, 5] },
      { name: "17-62", value: [5, 3, 5, 5, 5, 4, 5, 4, 5] },
      { name: "26-44", value: [4, 3, 4, 5, 4, 5, 4, 4, 5] },
    ],
    2: [
      //big5
      { name: "Dışa Dönüklük", value: [2, 4, 3, 1, 3, 5, 3, 5, 4] },
      { name: "Uyumluluk", value: [4, 3, 5, 5, 2, 4, 5, 3, 5] },
      { name: "Öz Disiplin", value: [5, 2, 4, 2, 5, 2, 4, 2, 2] },
      { name: "Duygusal Dayanıklılık", value: [1, 1, 2, 4, 1, 1, 1, 1, 3] },
      { name: "Deneyime Açıklık", value: [3, 5, 1, 3, 4, 3, 2, 4, 1] },
    ],
    3: [
      //holland
      { name: "Araştırıcı", value: [5, 2, 3, 3, 4, 3, 3, 5, 4] },
      { name: "Artistik Sanatsal", value: [1, 5, 2, 2, 1, 1, 2, 2, 4] },
      { name: "Sosyal", value: [1, 4, 4, 5, 2, 5, 3, 3, 5] },
      { name: "Girişimci", value: [2, 4, 5, 2, 3, 4, 4, 4, 2] },
      { name: "Geleneksel", value: [5, 1, 1, 3, 3, 2, 4, 3, 2] },
      { name: "Gerçekçi", value: [4, 2, 3, 3, 5, 3, 2, 1, 1] },
    ],
  };

  var careerSelectionResult = [
    { name: "1", value: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "2", value: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { name: "3", value: [0, 0, 0, 0, 0, 0, 0, 0, 0] },
  ];
  careerSelectionKey[1].forEach((x) => {
    var isok = usergates.find((y) => x.name == y);
    if (isok != undefined) {
      for (let index = 0; index < 9; index++) {
        careerSelectionResult[0].value[index] += x.value[index];
      }
    }

    var isok2 = api.DefinedChannels.find((y) => x.name == y);
    if (isok2 != undefined) {
      for (let index = 0; index < 9; index++) {
        careerSelectionResult[0].value[index] += x.value[index];
      }
    }
  });

  var usageGate = [];
  gates.forEach((x) => {
    var isok = usergates.find((y) => x.name == y);
    if (isok !== undefined) {
      usageGate.push(x);
    }
  });
  channels.forEach((x) => {
    var isok = api.DefinedChannels.find((y) => x.name == y);
    if (isok !== undefined) {
      usageGate.push(x);
    }
  });
  var bigdataPercent = [];
  var hollanddataPercent = [];
  big5Data.forEach((x) => {
    var deger = Math.round(((x.value * 2) / 100) * 5);
    var percent = { name: x.name, value: x.value * 2 };
    bigdataPercent.push(percent);
    var list = careerSelectionKey[2].find((y) => y.name == x.name).value;
    for (let index = 0; index < 9; index++) {
      careerSelectionResult[1].value[index] += list[index] * deger;
    }
  });
  hollandData.forEach((x) => {
    var deger = Math.round(((x.value * 100) / 15 / 100) * 5);
    var percent = { name: x.name, value: Math.round((x.value * 100) / 15) };
    hollanddataPercent.push(percent);
    var list = careerSelectionKey[3].find((y) => y.name == x.name).value;
    for (let index = 0; index < 9; index++) {
      careerSelectionResult[2].value[index] += list[index] * deger;
    }
  });
  var careerSelectionLastResult = [
    { id: 0, name: "Analitik", value: 0 },
    { id: 1, name: "Yaratıcı ve Sanatsal", value: 0 },
    { id: 2, name: "Liderlik ve Yönetim", value: 0 },
    { id: 3, name: "Sosyal", value: 0 },
    { id: 4, name: "Teknik ve Mühendislik", value: 0 },
    { id: 5, name: "Satış ve İlişkisel", value: 0 },
    { id: 6, name: "Organizasyonel", value: 0 },
    { id: 7, name: "Girişimci", value: 0 },
    { id: 8, name: "Öğretici ve Mentor", value: 0 },
  ];
  for (let index = 0; index < 9; index++) {
    careerSelectionLastResult[index].value += Math.round(
      (careerSelectionResult[0].value[index] * 40) / 100,
    );
    careerSelectionLastResult[index].value += Math.round(
      (careerSelectionResult[1].value[index] * 30) / 100,
    );
    careerSelectionLastResult[index].value += Math.round(
      (careerSelectionResult[2].value[index] * 30) / 100,
    );
  }
  careerSelectionLastResult.sort((a, b) => b.value - a.value);
  console.log(careerSelectionLastResult);
  console.log(hollanddataPercent);
  console.log(bigdataPercent);

  var careerSelectionData = [
    {
      id: "1",
      name: "Yaratıcı ve Sanatsal Kariyerler",
      value:
        "Estetik ve yaratıcılık gerektiren kariyerleri tercih edebilirsin. Tasarım, bir şeyleri sıfırsan ortaya çıkarma, müzik, resim ve yazma gibi çeşitli alanlarda kendini ifade edebileceğin meslekler ya da alanlarda başarıyla ilerleyebilirsin.",
    },
    {
      id: "2",
      name: "Liderlik ve Yönetim Kariyerleri",
      value:
        "Liderlik becerileri gerektiren ve iş yönetimini içeren kariyerleri tercih edebilirsin. İnsanları yönlendirme, organizasyon yönetimi veya proje liderliği gibi alanlar başarılı olabileceğin alanlar.",
    },
    {
      id: "3",
      name: "Yardım ve Sosyal Kariyerler",
      value:
        "Sosyal etkileşim ve kişilere yardım etmeyi içeren meslekler seni cezbedebilir. Sağlık hizmetleri, sosyal hizmetler, kar amacı gütmeyen kuruluşlar gibi alanlarda topluma katkı sağlayabileceğin kariyer seçenekleri seni mutlu edebilir.",
    },
    {
      id: "4",
      name: "Teknik ve Mühendislik Kariyerleri",
      value:
        "Analitik düşünce ve teknik becerileri gerektiren mühendislik ve teknik alanlarda kariyer tercih edebilirsin. Bilgisayar, elektrik mühendisliği veya yazılım geliştirme gibi teknoloji odaklı kariyerlerde mutlu olabilirsin.",
    },
    {
      id: "5",
      name: "Satış ve İlişki Kurma Kariyerleri",
      value:
        "Satis becerileri ve iliski yönetimi içeren kariyerleri tercih edebilirsin. Pazarlama, satis, müsteri iliskileri veya is gelistirme gibi alanlar basarili olabilegin kariyer seçenekleri arasindadir.",
    },
    {
      id: "6",
      name: "Organizasyonel ve İdari Kariyerler",
      value:
        "Düzenleme ve yönetim becerilerini gerektiren organizasyonel ve idari görevleri tercih edebilirsin.  İnsan kaynakları, ofis yönetimi veya proje koordinasyonu gibi alanlarda kariyer yapabilirsin.",
    },
    {
      id: "7",
      name: "Yenilikçi ve Girişimci Kariyerler",
      value:
        "Yenilikçi düşünce ve girişimcilikle ilgili alanları tercih edebilirsin. Girişimcilik, kendi işinei kurmak, start-up'lar veya ürün geliştirme gibi alanlardaki kariyer seçenekleri sana uygun.",
    },
    {
      id: "8",
      name: "Öğretim ve Mentorluk Kariyerleri",
      value:
        "Öğretim ve rehberlik becerilerini kullanabileceğin alanları tercih edebilirsin. Eğitim, öğretim veya koçluk, mentorluk gibi alanlarda kariyer seçeneklerini değerlendirebilirsin.  ",
    },
    {
      id: "0",
      name: "Analitik ve Veri Odaklı Kariyerler",
      value:
        "Analitik düşünce ve veri analizi becerilerini kullanabileceğin meslkeleri tercih edebilirsin. Veri bilimi, analitik pazarlama veya iş zekası gibi alanlarda sayısal verilerle çalışarak çözüm odaklı kariyer seçenekleri arasından seçim yapabilirsin.",
    },
  ];
  var careerSelectionData2 = [
    {
      id: "1",
      name: "Yaratıcı ve Sanatsal Kariyerler",
      geleneksel: `Grafik Tasarımcı\nİçerik Yazarı\nFotoğrafçı\nIllustrator\nMüzisyen\nYönetmen\nSanat Yönetmeni\nAnimatör\nReklam Sanat Yönetmeni\nİç Mimar\nModa Tasarımcısı\nWeb Tasarımcısı\nVideo Düzenleyici\nSes Mühendisi\nKreatif Direktör`,
      futurist: `Sanal Gerçeklik Tasarımcısı\nArtırılmış Gerçeklik Sanatçısı\nNFT Sanatçısı\nXR Deneyim Tasarımcısı (Genişletilmiş Gerçeklik)\nYapay Zeka Tarafından Oluşturulan Sanat Geliştiricisi\nHolografik Sanatçı\nSosyal Medya İçerik Üreticisi\nBiyo-Sanatçı (Biyoteknoloji Sanatı)\nSanal Moda Tasarımcısı\n3D Baskı Sanatçısı\nYapay Zeka ile Geliştirilmiş Müzik Bestecisi\nOyun Anlatı Tasarımcısı\nYapay Zeka Tarafından Oluşturulan Hikaye Anlatıcısı\nMetaverse Mimarı\nYapay Zeka Destekli Film Yapımcısı`,
    },

    {
      id: "2",
      name: "Liderlik ve Yönetim Kariyerleri",
      geleneksel: `Proje Yöneticisi\nİnsan Kaynakları Müdürü\nPazarlama Müdürü\nFinans Müdürü\nOperasyon Müdürü\nTedarik Zinciri Yöneticisi\nGenel Müdür\nSatış Müdürü\nÜretim Müdürü\nİcra Direktörü\nKalite Güvence Müdürü\nBilgi İşlem Müdürü\nAğırlama Müdürü\nPerakende Mağaza Müdürü\nEtkinlik Planlayıcısı`,
      futurist: `Sürdürülebilirlik Direktörü\nDijital Dönüşüm Yöneticisi\nUzaktan Çalışma Koordinatörü\nYapay Zeka Strateji Direktörü\nBlockchain Proje Yöneticisi\nBaş İnovasyon Sorumlusu\nESG (Çevresel, Sosyal ve Yönetişim) Yöneticisi\nVeri Yönetişimi Sorumlusu\nSiber Güvenlik Yöneticisi\nAI Etik Görevlisi\nYapay Zeka Benimseme Stratejisti\nSanal Ekip Lideri\nKriz Yönetimi Koordinatörü\nTedarik Zinciri Dayanıklılık Yöneticisi\nUzay Turizmi Operasyon Direktörü`,
    },

    {
      id: "3",
      name: "Yardım ve Sosyal Kariyerler",
      geleneksel: `Sosyal Hizmet Uzmanı\nDanışman/Psikolog\nHemşire\nÖğretmen\nEvlilik ve Aile Terapisti\nMadde Bağımlılığı Danışmanı\nKlinik Psikolog\nOkul Danışmanı\nRehabilitasyon Danışmanı\nKâr Amacı Gütmeyen Program Yöneticisi\nGeriatrik Bakım Müdürü\nÇocuk Esirgeme Kurumu Çalışanı\nRuh Sağlığı Teknisyeni\nDarülaceze Çalışanı\nToplum Sağlığı Çalışanı`,
      futurist: `Telesağlık Uzmanı\nYapay Zeka Terapisti\nSanal Gerçeklik Terapisti\nTeletıp Koordinatörü\nRuh Sağlığı Yapay Zeka Koçu\nGerontolog (yaşlı bakımında uzmanlaşmış)\nDijital Sağlık Koçu\nTopluluk Dayanıklılık Görevlisi\nYapay Zeka Destekli Özel İhtiyaç Eğitimcisi\nAfet Müdahale Koordinatörü\nYapay Zeka ile Geliştirilmiş Yaşlı Refakatçi\nRobotik Rehabilitasyon Terapisti\nUzaktan Ruh Sağlığı Danışmanı\nKriz İletişimi Müdürü\nÇevre Adaleti Savunucusu`,
    },

    {
      id: "4",
      name: "Teknik ve Mühendislik Kariyerleri",
      geleneksel: `Yazılım Mühendisi\nMakina Mühendisi\nElektrik Mühendisi\nİnşaat Mühendisi\nHavacılık ve Uzay Mühendisi\nBiyomedikal Mühendisi\nÇevre Mühendisi\nKimya Mühendisi\nVeri Bilimcisi\nAğ Yöneticisi\nSistem Mühendisi\nKalite Kontrol Mühendisi\nEndüstri Mühendisi\nProses Mühendisi\nTelekomünikasyon Mühendisi`,
      futurist: `Kuantum Bilişim Mühendisi\nYapay Zeka (AI) Etik Uzmanı\nRobotik Proses Otomasyon Mühendisi\n3D Baskı Mühendisi\nUzay Araştırmaları Mühendisi\nYenilenebilir Enerji Mühendisi\nOtonom Araç Mühendisi\nArtırılmış Gerçeklik Mühendisi\nBlockchain Geliştiricisi\nSiber Güvenlik Analisti\nSağlık Mühendisi için Yapay Zeka\nNanoteknoloji Mühendisi\nBiyoinformatik Bilimcisi\nSu Kaynakları Mühendisi (Sürdürülebilir Altyapı)\nUzaktan Drone Teknisyeni`,
    },

    {
      id: "5",
      name: "Satış ve İlişki Kurma Kariyerleri",
      geleneksel: `Satış Temsilcisi\nMuhasebe Müdürü\nİş Geliştirme Müdürü\nEmlakçı\nPazarlama Koordinatörü\nMüşteri İlişkileri Yöneticisi\nReklam Satış Temsilcisi\nMarka Elçisi\nKilit Müşteri Yöneticisi\nİç Satış Temsilcisi\nHalkla İlişkiler Uzmanı\nSatış Operasyonları Analisti\nPerakende Mağaza Müdürü\nEtkinlik Planlayıcısı\nAğırlama Müdürü`,
      futurist: `Dijital Satış Stratejisti\nYapay Zeka Satış Uzmanı\nSanal Gerçeklik Satış Müdürü\nSürdürülebilirlik Satış Danışmanı\nChatbot Satış Temsilcisi\nMüşteri Deneyimi Direktörü\nVeriye Dayalı Satış Analisti\nE-ticaret Müdürü\nSosyal Ticaret Uzmanı\nYapay Zeka Destekli Kişisel Alışverişçi\nInfluencer Pazarlama Müdürü\nBlockchain Satış Danışmanı\nArtırılmış Gerçeklik Satış Uzmanı\nUzaktan Satış Koçu\nMüşteri Deneyimi Yapay Zeka Tasarımcısı`,
    },

    {
      id: "6",
      name: "Organizasyonel ve İdari Kariyerler",
      geleneksel: `Yönetici Asistanı\nOfis Müdürü\nYönetici Asistanı\nProje Koordinatörü\nEtkinlik Planlayıcısı\nOfis Yöneticisi\nKayıt Yöneticisi\nİnsan Kaynakları Koordinatörü\nVeri Giriş Uzmanı\nHukuk Sekreteri\nTesis Müdürü\nSatınalma Uzmanı\nSeyahat Koordinatörü\nMüşteri Hizmetleri Sorumlusu\nFaturalandırma Uzmanı`,
      futurist: `Sanal Asistan\nAI Ofis Müdürü\nİşyeri Refahı Koordinatörü\nBlok Zinciri Yöneticisi\nDijital Etkinlik Yöneticisi\nSürdürülebilirlik Yöneticisi\nSiber Güvenlik Yöneticisi\nVeri Yönetişimi Uzmanı\nUzak Ekip Koordinatörü\nYapay Zeka Destekli İK Koordinatörü\nRobotik Süreç Otomasyonu Yöneticisi\nAkıllı Ofis Danışmanı\nUzay Turizmi Operasyon Koordinatörü\nUzak Etkinlik Planlayıcısı\nNFT Sanat Galerisi Yöneticisi`,
    },

    {
      id: "7",
      name: "Yenilikçi ve Girişimci Kariyerler",
      geleneksel: `Girişimci/Startup Kurucusu\nGirişim Kapitalisti\nÜrün Müdürü\nİş Geliştirme Uzmanı\nİnovasyon Danışmanı\nGrowth Hacker\nFranchise Sahibi\nTasarım Odaklı Düşünme Kolaylaştırıcısı\nİnovasyon Koçu\nSosyal Girişimci\nPatent Analisti\nBaş İnovasyon Sorumlusu\nSürdürülebilirlik Danışmanı\nBiyolojik korsan\nESG (Çevresel, Sosyal ve Yönetişim) Uzmanı`,
      futurist: `Blockchain Girişimcisi\nAI Startup Kurucusu\nUzay Turizmi Girişimcisi\nSürdürülebilir Ürün Yenilikçisi\nDijital Sağlık Yenilikçisi\nDrone Hizmetleri Girişimcisi\nNFT Startup Kurucusu\nSanal Gerçeklik Arcade Sahibi\nUzay Madenciliği Girişimcisi\nArtırılmış Gerçeklik Turizm Operatörü\nYeşil Teknoloji Yenilikçisi\nSosyal Etki Girişimcisi için Yapay Zeka\nKuantum Bilişim Girişimcisi\nKişisel Markalaşma Koçu\nMetaverse Deneyim Tasarımcısı`,
    },

    {
      id: "8",
      name: "Öğretim ve Mentorluk Kariyerleri",
      geleneksel: `Öğretmen/Eğitimci\nProfesör\nOkul Müdürü\nMüfredat Geliştirici\nÖğretim Tasarımcısı\nEğitim Danışmanı\nÇevrimiçi Eğitmen\nÖzel Eğitim Öğretmeni\nESL Öğretmeni\nOkul Danışmanı\nKütüphaneci\nMentor/Koç\nKariyer Danışmanı\nEğitim Teknoloğu\nGençlik Mentoru`,
      futurist: `Virtual Reality Education Specialist\nAI Education Coach\nEdTech Developer\nOnline Learning Experience Designer\nAugmented Reality Instructor\nLifelong Learning Facilitator\nYouth Mentor in Virtual Worlds\nAI Mentorship Coordinator\nRemote Education Specialist\nDigital Wellness Educator\nMetaverse Learning Experience Designer\nBlockchain Education Specialist\nGaming and Esports Mentor\nCybersecurity Education Specialist\nAI-Powered Language Instructor`,
    },

    {
      id: "0",
      name: "Analitik ve Veri Odaklı Kariyerler",
      geleneksel: `Veri Analisti\nFinansal Analist\nPazar Araştırması Analisti\nİstatistikçi\nYöneylem Araştırması Analisti\nAktüerya\nKantitatif Analist\nRisk Analisti\nİş Zekası Analisti\nTedarik Zinciri Analisti\nKredi Analisti\nFiyatlandırma Analisti\nKalite Güvence Analisti\nSağlık Veri Analisti\nUyumluluk Analisti`,
      futurist: `Veri Bilimcisi\nMakine Öğrenimi Mühendisi\nYapay Zeka (AI) Etikçisi\nVeri Gizliliği Görevlisi\nBlockchain Veri Analisti\nBaş Veri Sorumlusu\nTahmine Dayalı Analitik Modelleyici\nArtırılmış Analitik Uzmanı\nSiber Güvenlik Veri Analisti\nKuantum Veri Analisti\nSağlık Bilişiminde Veri Bilimcisi\nVeriye Dayalı Pazarlama Uzmanı\nSürdürülebilirlik Veri Analisti\nİnsan Kaynakları Analisti için Yapay Zeka\nIoT (Nesnelerin İnterneti) Veri Analisti`,
    },
  ];

  var image_karar_verme_stratejileri_1 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b247000e1713375d/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_2 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b251000cce3d6d50/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_3 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b25a003c37dfb678/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_4 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b264001b1ad7c5e8/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_5 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b26e002a5b306e61/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_6 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b276003d72002671/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_7 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b27e0009dd74fad5/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_8 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b2840004691d8ed4/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_9 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b28b0007742258d3/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_10 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b2910026e301602b/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_karar_verme_stratejileri_11 =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6756b297003dca7ce90e/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";

  var image_6_3_leader_explorer =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322ea0023c9901d57/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_6_2_talented_leader =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322e2001fdd7852d7/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_5_2_solution_gives_talent =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322d9002bce8dd6a6/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_5_1_practice_authority =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322d20033d27b4f32/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_4_6_impactful_leader =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322c8001d23247b88/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_4_1_attractive_authority =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322c0000834ab763b/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_3_6_explorer_role_model =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322b60012aa7e3499/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_3_5_exploration_solver =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322ad0011d4c5a403/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_2_5_talented_solution_creator =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322a50018baefc20b/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_2_4_talented_connector =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6733229a0030e4ce5812/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_1_4_information_connector =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322910004bac07424/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_1_3_explorer_proffessor =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/67332285001c81e3bf63/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";

  var image_projector =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/projector/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_generator_w =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-w/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_generator_m =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-m/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_reflector =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/reflector/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
  var image_manifestor =
    "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/manifestor/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";

  var sortedUsageGate = siralaValueUzunlugunaGore(usageGate);
  var guclu_yanlarinData = sortedUsageGate;

// Çalışma ve Öğrenme Stilin
var c_o_s_indivudal_title = "Bağımsız";
var c_o_s_individual = "Bağımsız çalışma ve öğrenme tarzın sayesinde bilgileri işleme ve kendi başına çalışma konusunda benzersiz bir yeteneğe sahipsin. Profesyonel duruşun, dışarıdan onay almadan da kendini güvende hissetmeni sağlayan doğal bir tamlık duygusuyla karakterizedir. Bu odaklanma, bilgiyi hızlıca sindirip uyum sağlamana olanak tanır ve hızla değişen iş dünyasında sana bir avantaj kazandırır. Bu hızlı düşünme tarzın, özellikle zamanın kritik olduğu ortamlarda seni değerli bir hale getirir.\n\nBağımsız ve tutarlı bir şekilde bilgi işleyebildiğin için genellikle hızlı hareket edebilirsin. Hızlı işlem yeteneğin büyük bir güç olsa da, sabırlı olmayı unutmaman gerekir. İş dünyası ve sosyal hayat genellikle kolektif bir ritimde ilerler ve senin de bu ritme uyum sağlaman gerekebilir. Biraz yavaşlamak, diğerlerinin senin hızına yetişmesini sağlar ve içgörülerine dayalı olarak harekete geçtiğinde, zamanlamanın hem bireysel hem de organizasyonel olarak doğru olmasına yardımcı olur.\n\nBilgiyi işlemekte başkalarına ihtiyaç duymasan da, iş birliği çalışmalarının derinliğini artırabilir. Diğerlerine, kendi bakış açılarını sunmaları için zaman tanımak önemlidir. Çoğu zaman, çalışma arkadaşların meseleleri birçok farklı açıdan incelemek ve daha fazla düşünmek isteyebilirler. Onların bu süreçlerine katılman, hem kendi içgörülerini zenginleştirecek hem de iş birliği ve liderlik çalışmalarını güçlendirecektir.\n\nDoğal, bağımsız çalışma ve öğrenme tarzını onurlandırırken, ekibindeki farklı yaklaşımlara da saygı göstererek, hem kendinden emin hem de empati dolu bir lider olarak iş dünyasında başarıya katkı sağlayabilirsin. Bu da hem kişisel olarak tatmin edici hem de geniş çapta etkili sonuçlar yaratır.";
var c_o_s_individual_s3_1 = "• Kararlarını verirken kendine ne kadar güveniyorsun ve dış onaya ne kadar ihtiyaç duyuyorsun?";
var c_o_s_individual_s3_2 = "• Hızlı kararlar alırken başkalarının senin tempoya ayak uydurabilmesi için nasıl sabırlı olabilirsin?";
var c_o_s_individual_s3_3 = "• Bilgiyi hızlı bir şekilde işlemek doğal yeteneğin, ama hangi durumlarda daha yavaş ve derinlemesine düşünmek gerektiğini fark ediyorsun? ";
var c_o_s_individual_s3_4 = "• Ekibinle iş birliği yaparken farklı bakış açılarına nasıl daha fazla yer açabilirsin? ";
var c_o_s_individual_s3_5 = "• Kendi başına çalıştığında, başkalarından gelebilecek potansiyel katkıları göz ardı etmeden nasıl dengeli hareket edebilirsin? ";

var c_o_s_collaborative_titie = "İş Birlikçi";
var c_o_s_collaborative = "Senin İşbirlikçi çalışma ve öğrenme tarzın sayesinde, başkalarıyla bir aradayken en parlak halini sergiliyorsun. Diğer insanlarla çalışırken, ortaya çıkan enerji ve fikirler seni canlandırıyor, doğal enerjin iş birliği içinde güçleniyor. Sadece düşünceleri paylaşmıyorsun; başka biriyle çalışmak ya da grup ortamında olmak, en iyi yanlarını ortaya çıkarmana yardımcı oluyor. Takım çalışması senin için adeta bir 'güç artışı' gibi, kendi yeteneklerini ve fikirlerini yükseltiyor. Bu yüzden, başkalarıyla çalışmakta gerçekten başarılısın çünkü herkes bir araya geldiğinde, bilgiyi anlama ve işleme yeteneğin hızla gelişiyor.\n\nYalnız çalışırken bazen işleri tamamlayamama hissine kapılabilirsin. Bu bir eksiklik değil, tam potansiyelinin iş birliği yoluyla ortaya çıktığının bir göstergesi. Başkalarının varlığı, senin bilgi işleme gücünü tamamlıyor ve bilgiyi uyumlaştırma yeteneğini harekete geçiriyor.\n\nİş dünyasında, ortaklıklar kurmak senin için özellikle faydalı olabilir. Bu bir bağımlılık değil, diğer insanlarla yaratıcı bir alanı paylaşmanın getirdiği canlı bir değişimdir. İçgörülerinin derinliği, doğal olarak senin yeteneklerini tamamlayan becerilere ve güçlü yönlere sahip insanları kendine çektiğin için genişler.\n\nSenin tarzın, bilgiyi sindirip tam anlamıyla işlemeye daha fazla zaman ayırmanı gerektirebilir.Bu, konuları derinlemesine keşfetmeni ve bir sorun ya da fırsatın farklı yönlerini değerlendirmeni sağlar.İşte bu yaklaşımın büyük avantajı: Bir şeyi tam olarak anladığında, onu her açıdan incelediğin için bu sadece anlamış olmak değil, adeta içini dışını bilmek anlamına gelir.Bu derin anlayış, iş dünyasında senin için bir süper güçtür.Bir karar ya da projeye ilerlemeye hazır olduğunda, sağlam bir temel ve ayrıntılı bir kavrayışla hareket ediyorsun.\nKarar verirken içgüdüsel olarak hemen sonuca ulaşmak isteyebilirsin.Bunun yerine, doğal ritmini kucakla ve karar verme sürecinin başkalarının varlığıyla gelişmesine izin ver.Doğru kişilerle birlikte olduğunda, açık fikirlerin aktığı bir ortamda, bütünlük ve kesinlik duyguların ortaya çıkacak ve seni doğru sonuca yönlendirecek.\n\nCanlı bir ortamda olmak — hareketli bir ofis, işbirlikçi bir atölye ya da halka açık bir toplantı yeri fark etmez — senin uyum sürecin için bir katalizör görevi görür. Bu ortamların enerjisi, bilgi işleme yeteneğini artırır ve zihinsel keskinliğini yükseltir.\nİşbirlikçi alanların enerjisini ve başkalarıyla çalışma eğilimini kullanarak iş dünyasında başarıya ulaşabilirsin.";
var c_o_s_collaborative_s3_1 = "• Birden fazla kaynaktan bilgi toplarken, bu bilgileri nasıl daha sabırlı bir şekilde sindirebilirsin? ";
var c_o_s_collaborative_s3_2 = "• Farklı insanlarla etkileşim içinde olduğunda enerjin nasıl artıyor? Bu enerjiyi iş hayatında daha etkin kullanmak için neler yapabilirsin? ";
var c_o_s_collaborative_s3_3 = "• Kararlarını aceleye getirmek yerine, düşünmek ve farklı açılardan bakmak için yeterince zaman ayırıyor musun? ";
var c_o_s_collaborative_s3_4 = "• Kararlarını aceleye getirmek yerine, düşünmek ve farklı açılardan bakmak için yeterince zaman ayırıyor musun? ";
var c_o_s_collaborative_s3_5 = "• Çeşitliliğin iş süreçlerine katkısını daha iyi anlamak ve kullanmak için kendini nasıl geliştirebilirsin? ";

var c_o_s_synthesizing_title = "Sentezleyen";
var c_o_s_synthesizing = "Senin sentezleyici çalışma ve öğrenme tarzın, farklı bilgi kaynaklarını bir araya getirip anlamlandırma konusunda benzersiz bir yetenek sağlıyor. En iyi performansı, özgürce hareket edip çeşitli insanlarla etkileşime girebildiğinde gösterirsin. Farklı perspektiflerden bilgi toplamak ve bu bilgileri bir yapboz gibi birleştirmek senin doğal yeteneğin.\n\nDeğişim ve çeşitlilikten beslenirsin.Gün içinde farklı ortamlarda, çeşitli insanlarla etkileşim kurduğunda kendini daha enerjik ve sağlıklı hissedersin.Aynı ortamda veya aynı grupla sınırlı kalmak seni kısıtlanmış hissettirebilir, bu yüzden seni meşgul eden ve zihinsel olarak uyarıcı çeşitli iş deneyimlerini aramalısın.\n\nDoğal eğilimin hızla hareket etmek ve kararlarını anlık olarak vermek olabilir, çünkü bu senin hırsın ve itici gücünle bağlantılıdır.Ancak, asıl gücün, elindeki bilgileri sentezleyebilme yeteneğinden gelir ve bu da sabır gerektirir.Farklı girdileri tam anlamıyla bütünleştirip anlamadan harekete geçmeden önce kendine zaman tanıdığında, daha dengeli ve etkili sonuçlar elde edersin.\n\nÇoğu zaman sanki aynı anda üç rolü birden üstleniyormuş gibi hissedebilirsin, her biri kendi istekleri ve bakış açılarıyla.Bu bir bölünme değil, üç güçlü yönün bir araya gelmesiyle oluşan bir bütünlüktür.Bu üç yönü bir arada kullanmayı başardığında, durumlara, zorluklara ve çözümlere üç boyutlu bir bakış açısıyla yaklaşabilirsin.\n\nİş birliği, farklı bakış açılarını sentezlemek için faydalı olsa da, yalnız çalışmakta da oldukça iyisin.Kendi başına işleri halledebilme yeteneğin, farklı ortamlarda esnek bir şekilde çalışma özgürlüğü sağlar—ister hareketli bir ofiste ister sessiz bir özel alanda.Unutma, sentezleyici çalışma ve öğrenme tarzın, kendi kendine yetebilme ve farklı kaynaklardan gelen içgörüleri birleştirebilme yeteneğinin güçlü bir birleşimidir.Bu da seni iş dünyasında dinamik ve çok yönlü bir değer haline getirir.";
var c_o_s_synthesizing_s3_1 = "• Başkalarıyla çalışırken enerjinin yükseldiğini ne kadar fark ediyorsun ve bunu projelerine nasıl yansıtabilirsin? ";
var c_o_s_synthesizing_s3_2 = "• Tek başına çalışırken hangi zorlukları yaşıyorsun ve bu durumlarda kendini nasıl daha iyi motive edebilirsin? ";
var c_o_s_synthesizing_s3_3 = "• İş birliği ortamlarında diğer kişilerin bakış açılarına nasıl yer veriyorsun ve bu sürecin sonucunda nasıl daha zengin içgörüler elde edebilirsin?";
var c_o_s_synthesizing_s3_4 = "• Bilgiyi sindirirken, karşındaki insanlarla etkileşime girmenin senin düşünme sürecini nasıl hızlandırdığını fark ediyor musun? ";
var c_o_s_synthesizing_s3_5 = "• Karar alma sürecinde başkalarının enerjisini ve fikirlerini nasıl daha etkin bir şekilde kullanabilirsin? ";

var c_o_s_subjective_title = "Öznel";
var c_o_s_subjective = "Senin Öznel Çalışma ve Öğrenme tarzın, bilgiyi işleme konusunda oldukça özel ve sabit bir yaklaşıma sahip olmanı sağlar. Bu, tamamen kişisel deneyimlerine dayanan, derinlemesine ve öznel bir yöntemdir. Diğerleri sana daha az esnek görünebilir, ancak bu, bilgiyi kendine özgü bir şekilde özümseme sürecinden kaynaklanıyor. Bilgileri doğal olarak kendi bakış açınla yorumlayarak, çevrendeki dünyayı benzersiz bir biçimde anlamlandırıyorsun.\n\nYaklaşımın seçici gibi görünebilir ve bu, sınırların önemini ve derin bağlantıların değerini bildiğin içindir. Doğal olarak belirli insanlara yakınlık duyarak, güvenilir ve samimi bir çevre oluşturma eğilimindesin. Bu, bazen 'taraf tutuyormuşsun' gibi görünebilir ama aslında, gerçek ve derin ilişkiler kurma ihtiyacının bir yansımasıdır.\n\nKüçük gruplarda sık sık uyum sağlamanı gerektiren durumlar sana zor gelebilir, çünkü en iyi işlerini, farklı insanlarla ve farklı ortamlarda etkileşim kurma özgürlüğüne sahip olduğunda ortaya koyarsın. Bu çeşitlilik ihtiyacı, nicelikten çok nitelik arayışından kaynaklanıyor; seni zenginleştiren farklı bakış açıları, öznel analizini derinleştiriyor.\n Hızlı kararlar vermek sana göre değildir çünkü bilgiyi kendi ritmine uygun şekilde işlemen için zamana ihtiyacın var. Bu zaman, yeni bilgileri mevcut bilgi birikimine tam anlamıyla dahil etmene olanak tanır, böylece verdiğin kararlar kişisel anlayışına dayalı sağlam temellere oturur.\n\nKendi hızında hareket etmek senin için çok önemli. Başkalarının beklentilerine veya zaman çizelgelerine uymaya zorlanmak, zihinsel, fiziksel ve duygusal sağlığını olumsuz etkileyebilir. Kendi ritmini benimsemek, sürecine sadık kalmanı ve işte de, hayatta da etkili ve tatmin edici sonuçlar elde etmeni sağlar.\n İş dünyasında, Öznel çalışma ve öğrenme tarzın büyük bir avantajdır. Derinlemesine düşünülmüş ve yenilikçi çözümler ortaya koymana yardımcı olur. Kişisel işleme tarzına sadık kalarak, her profesyonel ortamda tartışmalara ve projelere önemli bir değer katabilir ve daha çeşitli, zengin bir bakış açısına katkıda bulunabilirsin.";
var c_o_s_subjective_s3_1 = "• Kararlarını kendi kişisel deneyimlerine dayandırırken, farklı bakış açılarını nasıl dahil edebilirsin? ";
var c_o_s_subjective_s3_2 = "• Derin ve samimi ilişkiler kurma eğilimin iş hayatında sana nasıl fayda sağlıyor? ";
var c_o_s_subjective_s3_3 = "• Kendine zaman ayırarak bilgiyi özümsemek için hangi stratejileri kullanıyorsun? ";
var c_o_s_subjective_s3_4 = "• Farklı insanlardan gelen bilgilerle kendi deneyimlerini nasıl birleştiriyorsun ve bu birleşimden nasıl yararlanıyorsun? ";
var c_o_s_subjective_s3_5 = "• Dış baskılar altında çalışırken, kendi doğal ritmine sadık kalmayı nasıl başarabilirsin? ";

var c_o_s_objective_title = "Objektif";
var c_o_s_objective = "Senin Objektif çalışma ve öğrenme tarzın, bilgiyi önyargısız bir şekilde alma yeteneğine sahip olmanı sağlar ve bu da bulgularını gerçekten tarafsız bir şekilde paylaşmanı mümkün kılar. Bilgiye yaklaşımın, çevreyi örnekleme, karşılaştığın şeyleri yansıtma ve algıladıklarını net ve tarafsız bir bakış açısıyla değerlendirme üzerine kuruludur.\n\nÇevrendeki ortamın genel sağlığını, ister ofisinin fiziksel alanı ister ekibinin duygusal durumu olsun, sezme yeteneğin çok değerlidir. İnce ipuçlarını doğal olarak yakalayarak, bir durumun iyi mi yoksa altında çözülmesi gereken sorunlar mı barındırdığını objektif bir şekilde algılayabilirsin.\n\nSamimiyete olan keskin duyarlılığın sayesinde, çevrendeki insanların ne zaman kendilerine sadık olduğunu ya da olmadığını sezebilirsin. Bu yetenek, iş dünyasında kime güvenebileceğini anlamana ve kimlerin kendini açması için cesaretlendirilmesi gerektiğini belirlemene yardımcı olur.\n\n Açık yaklaşımın, adeta bir ayna gibi, insanlara ve gruplara, eylemlerinin ve tercihlerinin gerçekliğini yansıtmanı sağlar, özellikle de zarar verici ya da adaletsiz durumlarla karşılaştıklarında. Bu, seni güçlü bir değişim temsilcisi yapar, çünkü etrafındakilerin daha net görmelerine ve herkesin yararına olacak ayarlamalar yapmalarına yardımcı olabilirsin.\n\nDeğerlendirici olarak, Objektif çalışma ve öğrenme ile her şeyi kişisel filtrelerden geçirmeden, anlamak ve değerlendirmek amacıyla işlersin. Bu geniş ve açık yaklaşım, her şeyden etkilenmek anlamına gelmez; aksine, bilgilerin senden geçmesine izin verir ve böylece diğerlerinin kaçırabileceği bir netlik sağlar.\n\nProfesyonel alanda, objektif değerlendirme yeteneğin sayesinde tarafsız içgörüler ve rehberlik sunabilirsin. İster yeni bir projenin uygulanabilirliğini değerlendiriyor, ister potansiyel bir ortaklığın havasını ölçüyor ol, değerlendirmelerin net ve bulandırılmamış gözlemlere dayanır. İş dünyasında, işletmelerin misyonlarına sadık kalmalarına ve sağlıklı, samimi bir şekilde faaliyet göstermelerine yardımcı olmak için önemli bir rol oynarsın. Objektif çalışma ve öğrenme tarzını kullanarak iş dünyasında çok gerekli bir perspektif sunar, kararların mevcut bilgilerin doğru ve adil bir değerlendirmesine dayalı olarak verilmesini sağlarsın.";
var c_o_s_objective_s3_1 = "• Çevrende olup bitenleri tarafsız bir şekilde değerlendirirken bu içgörülerini iş hayatına nasıl yansıtıyorsun? ";
var c_o_s_objective_s3_2 = "• İnsanların samimiyetini veya uyumsuzluklarını sezdiğinde nasıl tepki veriyorsun ve bu bilgiyi nasıl kullanıyorsun? ";
var c_o_s_objective_s3_3 = "• Ortamın duygusal ve fiziksel sağlığını sezme yeteneğinle iş süreçlerini nasıl daha verimli hale getirebilirsin? ";
var c_o_s_objective_s3_4 = "• İş yerinde bir ayna gibi davranarak başkalarına hangi farkındalıkları kazandırıyorsun ve bu süreçte nasıl bir değişim yarattığını düşünüyorsun? ";
var c_o_s_objective_s3_5 = "• Tarafsız değerlendirmen sayesinde işletmenin misyonuna daha sadık kalmasını nasıl sağlıyorsun? ";

//Çalışma ve Öğrenme Stilin İngilizce
var c_o_s_indivudal_eng_title = "Individual"
var c_o_s_individual_eng = "With Independent Assimilation, you carry the unique capability to process information and work autonomously. Your professional demeanor is marked by an innate sense of completeness, needing no external confirmation to feel secure in your understanding and actions. Your focus allows you to digest and assimilate information swiftly, giving you the edge in rapidly evolving business situations. This fast-paced cognitive approach enables you to act decisively, making you an invaluable asset in high-stakes environments where time is of the essence.\n\nWith your consistent and independent way of processing, you could move fast. While your ability to process rapidly is a strength, it's vital to temper it with patience. The business world often operates on collective rhythms that require synchronization. Slowing down allows others to catch up to your pace, ensuring that when you act on your insights, the timing is aligned with both individual and organizational readiness.";
var c_o_s_individual_eng_s3_1 = "How confident are you in making decisions, and how much do you rely on external approval?";
var c_o_s_individual_eng_s3_2 = "When making quick decisions, how can you be patient to allow others to keep up with your pace?";
var c_o_s_individual_eng_s3_3 = "Processing information quickly is your natural talent, but in which situations do you recognize the need to slow down and think more deeply?";
var c_o_s_individual_eng_s3_4 = "How can you make more room for different perspectives when collaborating with your team?";
var c_o_s_individual_eng_s3_5 = "When working independently, how can you maintain a balanced approach without overlooking potential contributions from others?";


//Kariyer Seçim
//12-25
var kariyer_secim_12_25_s2_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s2_1_2 = "Görünen o ki geniş bir hayal gücün var ve kendini ifade etmeyi seviyorsun. Bu kariyerler tam sana göre olabilir. Tasarım, moda, müzik, resim ya da yazarlık gibi alanlarda yaratıcılığını kullanarak özgün projeler geliştirebilirsin. Örneğin, bir grafik tasarımcı olup yeni bir marka için logo tasarlayabilir ya da müzikle uğraşıp kendi bestelerini yapabilirsin. Bu tür kariyerlerde fikirlerini hayata geçirerek fark yaratma şansın çok yüksek.";
var kariyer_secim_12_25_s2_2_1 = "Liderlik ve Yönetim Kariyerleri ";
var kariyer_secim_12_25_s2_2_2 = "İnsanları yönlendirme ve organizasyonları yönetme konularında doğal bir yeteneğin var, bu alanlarda başarılı olabilirsin.  Proje liderliği, organizasyon yönetimi veya insan kaynakları gibi alanlarda çalışmak, büyük bir ekip içinde insanları bir araya getirerek hedeflere ulaşmayı sağlar. Mesela bir okul projesinde takım liderliği yaptığını düşün, bu becerilerini iş hayatında da kullanarak kariyerinde yükselebilirsin.";
var kariyer_secim_12_25_s2_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s2_3_2 = "Başkalarına yardım etmek seni mutlu ediyor gibi, sosyal hizmetler veya sağlık sektöründe kendine uygun bir yol bulmaya ne dersin. Örneğin, bir hemşire veya sosyal hizmet uzmanı olarak insanlara destek olabilir ya da bir kar amacı gütmeyen kuruluşta çalışarak topluma katkı sağlayabilirsin. Bu kariyerler, hem başkalarına yardım etme hem de anlamlı bir iş yapma fırsatı sunar.";
var kariyer_secim_12_25_s2_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s2_4_2 = "Analitik düşünme ve teknik beceriler senin güçlü yanların, mühendislik ya da teknoloji alanlarında bir kariyer tam sana göre olabilir. Bilgisayar mühendisliği, yazılım geliştirme ya da elektrik mühendisliği gibi mesleklerde karmaşık problemleri çözme ve yeni teknolojiler geliştirme şansına sahip olursun. Mesela, bir bilgisayar programcısı olarak yeni bir mobil uygulama geliştirebilirsin. ";
var kariyer_secim_12_25_s2_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s2_5_2 = "İletişim becerilerin kuvvetli ve insanlarla kolayca bağlantı kurabiliyorsun, satış ve müşteri ilişkileri alanlarında başarılı olabilirsin.  Pazarlama, satış veya müşteri temsilciliği gibi alanlarda çalışarak, ürün ya da hizmetleri doğru kişilere ulaştırmayı sağlayabilirsin. Örneğin, bir mağazada satış danışmanı olarak müşterilere yardımcı olabilir ya da bir şirkette satış temsilcisi olarak çalışabilirsin. ";
var kariyer_secim_12_25_s2_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s2_6_2 = "Düzenli olmayı ve işleri planlamayı seviyorsun, idari ve organizasyonel kariyerlerde kendine yer bulabilirsin. İnsan kaynakları, ofis yönetimi ya da proje koordinasyonu gibi alanlarda çalışarak, bir kurumun işleyişini daha verimli hale getirme fırsatın olur. Mesela, bir proje yöneticisi olarak ekipleri organize edip işlerin sorunsuz ilerlemesini sağlayabilirsin.";
var kariyer_secim_12_25_s2_7_1 = "Yenilikçi ve Girişimci Kariyerler ";
var kariyer_secim_12_25_s2_7_2 = "Yenilikçi ve yaratıcı düşüncelerin var, kendi işini kurmak ya da bir startup’ta çalışmak senin için uygun olabilir.  Girişimcilik, risk almayı ve yeni fikirlerle bir şeyler başarmayı gerektirir. Örneğin, kendi online mağazanı açarak ürünlerini satabilir ya da bir teknoloji girişiminde yeni bir uygulama geliştirebilirsin. ";
var kariyer_secim_12_25_s2_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s2_8_2 = "Bilgini başkalarıyla paylaşmaktan hoşlanıyorsun, öğretim ve mentorluk kariyerleri tam sana göre.  Öğretmenlik, eğitmenlik ya da koçluk yaparak, başkalarına rehberlik edebilir ve onların gelişimine katkıda bulunabilirsin. Mesela, bir öğretmen olarak öğrencilere ders verebilir ya da bir koç olarak kişisel gelişimlerine destek olabilirsin. ";
var kariyer_secim_12_25_s2_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s2_9_2 = "Sayılarla ve analizlerle aranın iyi olduğunu görüyoruz, veri bilimi ya da iş analitiği gibi kariyerlerde başarılı olabilirsin. Bu tür kariyerler, büyük miktarda veriyi analiz edip kararlar almaya yardımcı olmayı içerir. Örneğin, bir veri bilimcisi olarak bir şirketin satış verilerini analiz edebilir ve gelecekte nasıl daha iyi performans gösterebileceklerini belirleyebilirsin.";

var kariyer_secim_12_25_s5_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s5_1_2 = "Grafik Tasarımı";
var kariyer_secim_12_25_s5_1_3 = "Güzel Sanatlar";
var kariyer_secim_12_25_s5_1_4 = "İç Mimarlık";
var kariyer_secim_12_25_s5_1_5 = "Moda Tasarımı";
var kariyer_secim_12_25_s5_1_5 = "Reklamcılık";
var kariyer_secim_12_25_s5_1_5 = "Sinema ve Televizyon";
var kariyer_secim_12_25_s5_1_6 = "Müzik";
var kariyer_secim_12_25_s5_1_6 = "Yaratıcı Yazarlık";
var kariyer_secim_12_25_s5_1_7 = "Sahne Sanatları";

var kariyer_secim_12_25_s5_2_1 = "Liderlik ve Yönetim Kariyerleri ";
var kariyer_secim_12_25_s5_2_1 = "İşletme";
var kariyer_secim_12_25_s5_2_3 = "Yönetim ve Organizasyon";
var kariyer_secim_12_25_s5_2_4 = "İnsan Kaynakları Yönetimi";
var kariyer_secim_12_25_s5_2_5 = "Endüstri Mühendisliği";
var kariyer_secim_12_25_s5_2_6 = "Kamu Yönetimi";
var kariyer_secim_12_25_s5_2_7 = "Lojistik Yönetimi";
var kariyer_secim_12_25_s5_2_8 = "Proje Yönetimi (Yüksek Lisans)";
var kariyer_secim_12_25_s5_2_9 = "Uluslararası İlişkiler";
var kariyer_secim_12_25_s5_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s5_3_2 = "Sosyal Hizmet";
var kariyer_secim_12_25_s5_3_3 = "Psikoloji";
var kariyer_secim_12_25_s5_3_4 = "Rehberlik ve Psikolojik Danışmanlık";
var kariyer_secim_12_25_s5_3_5 = "Hemşirelik";
var kariyer_secim_12_25_s5_3_6 = "Fizyoterapi ve Rehabilitasyon";
var kariyer_secim_12_25_s5_3_7 = "Sağlık Yönetimi";
var kariyer_secim_12_25_s5_3_8 = "Sosyoloji";
var kariyer_secim_12_25_s5_3_9 = "Çocuk Gelişimi";
var kariyer_secim_12_25_s5_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s5_4_2 = "Bilgisayar Mühendisliği";
var kariyer_secim_12_25_s5_4_3 = "Elektrik-Elektronik Mühendisliği";
var kariyer_secim_12_25_s5_4_4 = "Makine Mühendisliği";
var kariyer_secim_12_25_s5_4_5 = "İnşaat Mühendisliği";
var kariyer_secim_12_25_s5_4_6 = "Yazılım Mühendisliği";
var kariyer_secim_12_25_s5_4_7 = "Endüstri Mühendisliği";
var kariyer_secim_12_25_s5_4_8 = "Mekatronik Mühendisliği";
var kariyer_secim_12_25_s5_4_9 = "Matematik Mühendisliği";

var kariyer_secim_12_25_s5_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s5_5_2 = "İşletme";
var kariyer_secim_12_25_s5_5_3 = "Pazarlama";
var kariyer_secim_12_25_s5_5_4 = "Halkla İlişkiler ve Reklamcılık";
var kariyer_secim_12_25_s5_5_5 = "İletişim";
var kariyer_secim_12_25_s5_5_6 = "Uluslararası Ticaret";
var kariyer_secim_12_25_s5_5_7 = "İktisat";
var kariyer_secim_12_25_s5_5_8 = "Ticaret Hukuku (Yüksek Lisans)";
var kariyer_secim_12_25_s5_5_9 = "Satış Yönetimi (Sertifika ve Lisansüstü Programlar)";
var kariyer_secim_12_25_s5_5_1 = "Organizasyonel ve İdari Kariyerler";

var kariyer_secim_12_25_s5_6_1 = "İnsan Kaynakları Yönetimi";
var kariyer_secim_12_25_s5_6_2 = "İşletme";
var kariyer_secim_12_25_s5_6_3 = "Büro Yönetimi";
var kariyer_secim_12_25_s5_6_4 = "Kamu Yönetimi";
var kariyer_secim_12_25_s5_6_5 = "Yönetim Bilişim Sistemleri";
var kariyer_secim_12_25_s5_6_6 = "Endüstri Mühendisliği";
var kariyer_secim_12_25_s5_6_7 = "İşletme Mühendisliği";
var kariyer_secim_12_25_s5_6_8 = "Proje Yönetimi (Yüksek Lisans)";

var kariyer_secim_12_25_s5_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s5_7_2 = "İşletme";
var kariyer_secim_12_25_s5_7_3 = "Girişimcilik";
var kariyer_secim_12_25_s5_7_4 = "E-Ticaret ve Dijital Pazarlama";
var kariyer_secim_12_25_s5_7_5 = "Endüstri Mühendisliği";
var kariyer_secim_12_25_s5_7_6 = "Bilgisayar Bilimleri";
var kariyer_secim_12_25_s5_7_7 = "İnovasyon Yönetimi (Yüksek Lisans)";
var kariyer_secim_12_25_s5_7_8 = "Ürün Geliştirme ve Tasarım";

var kariyer_secim_12_25_s5_8_1 = "Eğitim Fakülteleri (Fizik, Kimya, Matematik, Türk Dili ve Edebiyatı gibi alanlarda öğretmenlik)";
var kariyer_secim_12_25_s5_8_2 = "Psikoloji";
var kariyer_secim_12_25_s5_8_3 = "Rehberlik ve Psikolojik Danışmanlık";
var kariyer_secim_12_25_s5_8_4 = "Pedagojik Formasyon Eğitimi";
var kariyer_secim_12_25_s5_8_4 = "Eğitim Yönetimi ve Denetimi (Yüksek Lisans)";
var kariyer_secim_12_25_s5_8_4 = "Yaşam Koçluğu (Sertifika Programları)";

var kariyer_secim_12_25_s5_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s5_9_2 = "Veri Bilimi ve İş Analitiği";
var kariyer_secim_12_25_s5_9_3 = "İstatistik";
var kariyer_secim_12_25_s5_9_4 = "Matematik";
var kariyer_secim_12_25_s5_9_5 = "Ekonomi";
var kariyer_secim_12_25_s5_9_6 = "Finans";
var kariyer_secim_12_25_s5_9_7 = "Bilgisayar Mühendisliği";
var kariyer_secim_12_25_s5_9_8 = "Yapay Zeka ve Veri Mühendisliği (Yüksek Lisans)";
var kariyer_secim_12_25_s5_9_9 = "Endüstri Mühendisliği";

var kariyer_secim_12_25_s6_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s6_1_2 = "Üniversite diploması olmadan da yaratıcı ve sanatsal alanlarda başarılı olabilirsiniz. Özellikle meslek liselerinde tasarım, grafik, moda, görsel sanatlar gibi bölümlerden mezun olduktan sonra şu yolları izleyebilirsiniz: ";
var kariyer_secim_12_25_s6_1_3 = "Freelance Tasarımcı: Grafik tasarım, web tasarımı, illüstrasyon gibi alanlarda kendi portföyünüzü oluşturarak freelance çalışabilirsiniz.";
var kariyer_secim_12_25_s6_1_4 = "Moda Tasarımcısı: Moda atölyelerinde çalışarak, sektörde deneyim kazanabilir, kendi markanızı oluşturabilirsiniz.";
var kariyer_secim_12_25_s6_1_5 = "Fotoğrafçılık: Bir fotoğraf stüdyosunda çalışarak ya da kendi ekipmanlarınızı edinerek, düğün, etkinlik veya moda fotoğrafçısı olabilirsiniz.";
var kariyer_secim_12_25_s6_1_6 = "Müzisyen veya Sanatçı: Kendinizi müzik veya sanat alanında geliştirebilir, sosyal medya ve dijital platformlar üzerinden eserlerinizi paylaşarak tanınabilirsiniz.";

var kariyer_secim_12_25_s6_2_1 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_12_25_s6_2_2 = "Meslek lisesi ya da lise mezuniyeti ile liderlik ve yönetim kariyerlerinde ilerlemek de mümkündür:";
var kariyer_secim_12_25_s6_2_3 = "Süpervizör veya Takım Lideri: Perakende, lojistik veya üretim sektörlerinde çalışarak takım liderliği ya da süpervizör pozisyonuna yükselebilirsiniz.";
var kariyer_secim_12_25_s6_2_4 = "İşletme Yönetimi: Kendi küçük işletmenizi kurabilir ya da bir aile işletmesinde yönetici olarak deneyim kazanabilirsiniz.";
var kariyer_secim_12_25_s6_2_5 = "Satış Ekipleri Yönetimi: Satış alanında deneyim kazandıktan sonra bir satış ekibini yönetebilir, liderlik becerilerinizi geliştirebilirsiniz.";
var kariyer_secim_12_25_s6_2_6 = "Mağaza Müdürü: Perakende sektöründe satış temsilcisi olarak başlayıp, mağaza müdürlüğü seviyesine çıkabilirsiniz.";

var kariyer_secim_12_25_s6_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s6_3_2 = "Üniversite okumadan da yardım ve sosyal kariyerlerde çalışabilirsiniz:";
var kariyer_secim_12_25_s6_3_3 = "Hasta Bakıcı: Sağlık meslek liselerinde hasta bakım eğitimi aldıktan sonra sağlık sektöründe çalışabilirsiniz.";
var kariyer_secim_12_25_s6_3_4 = "Sosyal Yardım Çalışanı: Sosyal yardım kurumlarında gönüllü çalışarak, deneyim kazandıktan sonra profesyonel olarak bu alanda çalışabilirsiniz.";
var kariyer_secim_12_25_s6_3_5 = "Rehabilitasyon ve Huzurevi Çalışanı: Yaşlı bakımı ya da engelli bireylerle ilgili kurumlarda iş bulabilir, topluma katkı sağlayabilirsiniz.";
var kariyer_secim_12_25_s6_3_6 = "Özel Eğitim Yardımcısı: Özel eğitim alanında eğitim yardımcısı olarak, bireylere destek sağlayabilirsiniz.";

var kariyer_secim_12_25_s6_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s6_4_2 = "Teknik ve mühendislik kariyerlerinde, meslek lisesi ya da doğrudan iş deneyimiyle başarılı olabilirsiniz:";
var kariyer_secim_12_25_s6_4_3 = "Tekniker/Teknisyen: Meslek liselerinden mezun olup elektrik, elektronik, makine, bilgisayar gibi alanlarda tekniker veya teknisyen olarak çalışabilirsiniz.";
var kariyer_secim_12_25_s6_4_4 = "Bilgisayar Destek Uzmanı: Bilgisayar donanımı ve yazılımı konularında bilgi edinerek, bilgisayar desteği sağlayabilirsiniz.";
var kariyer_secim_12_25_s6_4_5 = "Ustalık ve Çıraklık: Elektrik ustası, makine tamircisi, otomotiv teknisyeni gibi alanlarda usta-çırak ilişkisi ile kariyer yapabilirsiniz.";
var kariyer_secim_12_25_s6_4_6 = "Yazılım Geliştirici: Kendinizi yazılım ve kodlama konusunda online kurslar ve sertifika programlarıyla geliştirebilir, freelance yazılım projelerinde yer alabilirsiniz.";

var kariyer_secim_12_25_s6_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s6_5_2 = "Satış ve ilişki yönetimi kariyerlerinde, üniversite eğitimi olmadan da başarılı olabilirsiniz:";
var kariyer_secim_12_25_s6_5_3 = "Satış Temsilcisi: Doğrudan satış veya perakende sektöründe çalışarak deneyim kazanabilir, satış ekiplerinde liderliğe yükselebilirsiniz.";
var kariyer_secim_12_25_s6_5_4 = "Müşteri Temsilcisi: Müşteri hizmetleri alanında çalışarak, iletişim becerilerinizi geliştirip kariyerinizi bu yönde ilerletebilirsiniz.";
var kariyer_secim_12_25_s6_5_5 = "Kendi İşinizi Kurma: Küçük ölçekli ticaret yaparak veya pazarlama becerilerinizi geliştirerek, kendi satış odaklı işinizi kurabilirsiniz.";
var kariyer_secim_12_25_s6_5_6 = "E-Ticaret Satıcı: Online platformlarda (Trendyol, Etsy, Amazon gibi) ürün satarak dijital ticaret yapabilirsiniz.";

var kariyer_secim_12_25_s6_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s6_6_2 = "Düzen ve organizasyon becerilerinizi iş hayatında kullanarak, bu alanlarda ilerleyebilirsiniz:";
var kariyer_secim_12_25_s6_6_3 = "Ofis Asistanı: Bir ofiste sekreterlik veya idari asistanlık yaparak organizasyonel becerilerinizi geliştirebilirsiniz.";
var kariyer_secim_12_25_s6_6_4 = "Proje Asistanı: Proje yönetim ekiplerinde asistan olarak başlayıp, deneyim kazandıkça daha sorumlu pozisyonlara geçebilirsiniz.";
var kariyer_secim_12_25_s6_6_5 = "İnsan Kaynakları Asistanı: İnsan kaynakları departmanlarında yardımcı pozisyonlarda çalışarak deneyim kazanabilirsiniz.";
var kariyer_secim_12_25_s6_6_6 = "Lojistik veya Stok Yönetimi: Lojistik sektöründe ya da depo yönetiminde çalışarak, organizasyonel süreçleri öğrenebilirsiniz.";

var kariyer_secim_12_25_s6_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s6_7_2 = "Girişimcilik ve yenilikçilik için üniversite diplomasına ihtiyaç duymadan da birçok adım atabilirsiniz:";
var kariyer_secim_12_25_s6_7_3 = "Kendi İşini Kurma: Yeteneklerinize ve ilgi alanlarınıza dayalı olarak bir iş kurabilir, örneğin küçük çaplı bir atölye ya da e-ticaret platformu açabilirsiniz.";
var kariyer_secim_12_25_s6_7_4 = "Start-up Kurucusu: Teknoloji odaklı ya da yaratıcı bir girişim fikri ile yatırım alarak start-up projeleri geliştirebilirsiniz.";
var kariyer_secim_12_25_s6_7_5 = "Sosyal Medya Girişimciliği: Sosyal medya platformları üzerinden içerik üreticiliği yapabilir, markalarla iş birliği içinde gelir elde edebilirsiniz.";
var kariyer_secim_12_25_s6_7_6 = "Ürün Geliştirme: Atölyelerde veya fabrikalarda çalışarak ürün geliştirme sürecinde yer alabilir, yenilikçi fikirler üretebilirsiniz.";

var kariyer_secim_12_25_s6_7_7 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s6_8_1 = "Öğretim ve mentorluk alanında deneyim kazanarak da üniversite eğitimi olmadan kariyer yapabilirsiniz:";
var kariyer_secim_12_25_s6_8_2 = "Özel Ders: Belirli bir konuda (matematik, yabancı dil, müzik gibi) uzmanlaşıp öğrencilere özel ders verebilirsiniz.";
var kariyer_secim_12_25_s6_8_3 = "Koçluk ve Mentorluk: Yaşam koçluğu, kariyer koçluğu gibi alanlarda sertifika programlarına katılarak insanlara rehberlik edebilirsiniz.";
var kariyer_secim_12_25_s6_8_4 = "Eğitim Asistanı: Okullarda veya eğitim kurumlarında asistan olarak çalışarak deneyim kazanabilirsiniz.";
var kariyer_secim_12_25_s6_8_5 = "Gelişim Atölyeleri: Çocuklar ve gençler için yaratıcı atölyeler düzenleyebilir, kendi eğitim programlarınızı geliştirebilirsiniz.";

var kariyer_secim_12_25_s6_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s6_9_2 = "Analitik ve veri odaklı kariyerlerde, üniversite eğitimi olmadan da pratik yollarla ilerleyebilirsiniz:";
var kariyer_secim_12_25_s6_9_3 = "Veri Analiz Kursları: Online veri analitiği, SQL, Python gibi araçları öğrenerek veri analiz projelerinde çalışabilirsiniz.";
var kariyer_secim_12_25_s6_9_4 = "Finansal Danışmanlık: Finansal analiz ve muhasebe alanlarında iş deneyimi kazanarak, küçük işletmelere danışmanlık yapabilirsiniz.";
var kariyer_secim_12_25_s6_9_5 = "Pazarlama Analitiği: Dijital pazarlama araçlarını öğrenip, sosyal medya veya SEO analizleri yaparak şirketlere danışmanlık verebilirsiniz.";
var kariyer_secim_12_25_s6_9_6 = "Staj ve Sertifikalar: Veri analitiği alanında staj yaparak ya da online sertifika programlarıyla uzmanlık kazanabilirsiniz.";
var kariyer_secim_12_25_s6_9_7 = "Bu yollar, üniversite diploması olmadan da farklı kariyer alanlarında deneyim kazanmanızı ve yeteneklerinizi geliştirmenizi sağlar.";

//25+
var kariyer_secim_25_40_s2_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_25_40_s2_1_2 = "Eğer yaratıcı yönünüzü iş hayatında kullanmak istiyorsanız, bu alanlar size uygun olabilir. Reklamcılık, grafik tasarım, moda, müzik, sinema ya da yazarlık gibi alanlarda kariyer yapmak, estetik anlayışınızı ve özgün fikirlerinizi profesyonel projelere yansıtmanızı sağlar. Örneğin, bir marka için yenilikçi reklam kampanyaları tasarlayabilir ya da bir içerik yazarı olarak yaratıcı projelere imza atabilirsiniz. Sanatın her dalında kariyer fırsatları geniş ve esnektir, freelance çalışabilir ya da bir ajansla iş birliği yapabilirsiniz. ";
var kariyer_secim_25_40_s2_2_1 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_25_40_s2_2_2 = "Doğal bir liderlik yeteneğiniz var, ekip yönetimi ve stratejik karar alma konularında başarılı olabilirsiniz.  Proje yönetimi, takım liderliği, operasyon yönetimi veya üst düzey yöneticilik pozisyonları, sorumluluk alarak hedeflere ulaşmanızı gerektirir. Örneğin, bir işletme müdürü olarak organizasyonun tüm süreçlerini yönetebilir, yeni stratejiler geliştirerek büyümeye katkı sağlayabilirsiniz. Bu kariyerler, uzun vadeli başarı ve kariyer ilerlemesi için güçlü liderlik becerileri gerektirir.";
var kariyer_secim_25_40_s2_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_25_40_s2_3_2 = "İnsanlara yardım etme tutkunuzu görebiliyoruz. Sağlık, sosyal hizmetler ya da kar amacı gütmeyen organizasyonlarda tatmin edici bir kariyer bulabilirsiniz.  Sosyal sorumluluk projelerinde yer almak, bir terapist ya da sağlık çalışanı olarak insanların hayatlarını iyileştirmek gibi meslekler bu alanda öne çıkar. Örneğin, bir sosyal hizmet uzmanı olarak dezavantajlı gruplara yardım edebilir ya da bir sağlık yöneticisi olarak sağlık hizmetlerinin daha verimli işlemesini sağlayabilirsiniz.";
var kariyer_secim_25_40_s2_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_25_40_s2_4_2 = "Teknik becerileriniz ve analitik düşünce yapınızla, mühendislik ya da teknoloji alanlarında uzmanlaşabilirsiniz.  Yazılım geliştirme, makine mühendisliği ya da siber güvenlik gibi alanlarda çalışarak iş dünyasının sürekli değişen taleplerine yanıt verebilirsiniz. Örneğin, bir yazılım mühendisi olarak yeni uygulamalar geliştirebilir ya da bir ağ güvenliği uzmanı olarak şirketlerin dijital altyapılarını koruyabilirsiniz. Bu alanlar, hızla gelişen teknolojilere ayak uydurma ve sürekli öğrenmeyi gerektirir.";
var kariyer_secim_25_40_s2_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_25_40_s2_5_2 = "İletişim becerileriniz ve insan ilişkilerini yönetme yeteneğiniz sayesinde satış ve müşteri ilişkileri alanlarında başarılı olabilirsiniz. Satış yönetimi, iş geliştirme ya da müşteri hizmetleri gibi alanlarda çalışarak, şirketin büyümesine doğrudan katkı sağlayabilirsiniz. Örneğin, bir satış yöneticisi olarak ekiplerinizi hedeflere yönlendirebilir ya da bir iş geliştirme uzmanı olarak yeni müşteriler kazanabilirsiniz. Bu kariyerler, ikna kabiliyetinizi ve ilişki yönetimi yetkinliklerinizi ön plana çıkarır. ";
var kariyer_secim_25_40_s2_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_25_40_s2_6_2 = "Düzen, planlama ve organizasyon becerileriniz güçlü, idari yönetim ve organizasyon alanlarında kariyer yapabilirsiniz. İnsan kaynakları, ofis yönetimi ya da proje koordinasyonu gibi roller, iş süreçlerinin düzenli ve etkili şekilde yürümesini sağlar. Örneğin, bir insan kaynakları yöneticisi olarak işe alım süreçlerini yönetebilir ya da bir proje yöneticisi olarak farklı ekiplerin aynı hedefe ulaşması için çalışabilirsiniz. Bu alanlarda detaylara hakimiyet ve çok yönlü düşünme önemlidir.";
var kariyer_secim_25_40_s2_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_25_40_s2_7_2 = "Girişimci bir ruha sahipsiniz, yenilikçi fikirlerinizi hayata geçirme fırsatını bulabileceğiniz alanlar mevcuttur. Kendi işinizi kurabilir, bir start-up'ı yönlendirebilir ya da yeni ürün ve hizmetler geliştirerek piyasada fark yaratabilirsiniz. Örneğin, teknoloji alanında bir start-up kurarak yeni bir mobil uygulama geliştirebilir ya da e-ticaret sektöründe yenilikçi bir iş modeli hayata geçirebilirsiniz. Bu kariyerler risk almayı ve yaratıcılığı birleştirir. ";
var kariyer_secim_25_40_s2_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_25_40_s2_8_2 = "Bilginizi ve deneyimlerinizi başkalarıyla paylaşmaktan keyif alıyorsunuz, öğretim ve mentorluk alanında kariyer yapabilirsiniz.  Eğitim sektöründe öğretmenlik, akademik danışmanlık ya da koçluk yaparak, bireylerin gelişimine katkı sağlayabilirsiniz. Örneğin, bir eğitmen olarak yetişkinlere mesleki beceriler kazandırabilir ya da bir mentor olarak genç profesyonellere rehberlik edebilirsiniz. Bu kariyerlerde etkili iletişim ve rehberlik becerileri ön plandadır. ";
var kariyer_secim_25_40_s2_9_1 = "Analitik ve Veri Odaklı Kariyerler ";
var kariyer_secim_25_40_s2_9_2 = "Veri analizi ve problem çözme yetenekleriniz güçlü görünüyor, analitik ve veri odaklı kariyerler size uygun olabilir. Veri bilimi, iş zekası ya da finansal analiz gibi alanlarda çalışarak, şirketlerin stratejik kararlar almasına yardımcı olabilirsiniz. Örneğin, bir veri analisti olarak büyük verileri analiz edip şirketlerin pazarlama stratejilerini iyileştirebilir ya da bir iş zekası uzmanı olarak yönetime raporlar sunabilirsiniz. Bu kariyerler, sayısal analiz yeteneği ve detaylara dikkat gerektirir. ";

var kariyer_secim_s3_1_0 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_s3_1_1 = "Grafik Tasarımcı\nİçerik Yazarı\nFotoğrafçı\İllüstratör\nMüzisyen\nYönetmen\nSanat Yönetmeni\nAnimatör\nReklam Sanat Yönetmeni\nİç MimarModa Tasarımcısı\nWeb Tasarımcısı\nVideo Düzenleyici\nSes Mühendisi\nKreatif Direktör";
var kariyer_secim_s3_2_0 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_s3_2_1 = "Proje Yöneticisi\nİnsan Kaynakları Müdürü\nPazarlama Müdürü\nFinans Müdürü\nOperasyon Müdürü\nTedarik Zinciri Yöneticisi\nGenel Müdür\nSatış Müdürü\nÜretim Müdürü\nİcra Direktörü\nKalite Güvence Müdürü\nBilgi İşlem Müdürü\nAğırlama Müdürü\nPerakende Mağaza Müdürü\nEtkinlik Planlayıcısı";
var kariyer_secim_s3_3_0 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_s3_3_1 = "Sosyal Hizmet Uzmanı\nDanışman/Psikolog\nHemşire\nÖğretmen\nEvlilik ve Aile Terapisti\nMadde Bağımlılığı Danışmanı\nKlinik Psikolog\nOkul Danışmanı\nRehabilitasyon Danışmanı\nKâr Amacı Gütmeyen Program Yöneticisi\nGeriatrik Bakım Müdürü\nÇocuk Esirgeme Kurumu Çalışanı\nRuh Sağlığı Teknisyeni\nDarülaceze Çalışanı\nToplum Sağlığı Çalışanı";
var kariyer_secim_s3_4_0 = "Teknik ve Mühendislik Kariyerler";
var kariyer_secim_s3_4_1 = "Yazılım Mühendisi\nMakina Mühendisi\nElektrik Mühendisi\nİnşaat Mühendisi\nHavacılık ve Uzay Mühendisi\nBiyomedikal Mühendisi\nÇevre Mühendisi\nKimya Mühendisi\nVeri Bilimcisi\nAğ Yöneticisi\nSistem Mühendisi\nKalite Kontrol Mühendisi\nEndüstri Mühendisi\nProses Mühendisi\nTelekomünikasyon Mühendisi";
var kariyer_secim_s3_5_0 = "Satış ve İlişkisel Kariyerler";
var kariyer_secim_s3_5_1 = "Satış Temsilcisi\nMuhasebe Müdürü\nİş Geliştirme Müdürü\nEmlakçı\nPazarlama Koordinatörü\nMüşteri İlişkileri Yöneticisi\nReklam Satış Temsilcisi\nMarka Elçisi\nKilit Müşteri Yöneticisi\nİç Satış Temsilcisi\nHalkla İlişkiler Uzmanı\nSatış Operasyonları Analisti\nPerakende Mağaza Müdürü\nEtkinlik Planlayıcısı\nAğırlama Müdürü";
var kariyer_secim_s3_6_0 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_s3_6_1 = "Yönetici Asistanı\nOfis Müdürü\nProje Koordinatörü\nEtkinlik Planlayıcısı\nOfis Yöneticisi\nKayıt Yöneticisi\nİnsan Kaynakları Koordinatörü\nVeri Giriş Uzmanı\nHukuk Sekreteri\nTesis Müdürü\nSatınalma Uzmanı\nSeyahat Koordinatörü\nMüşteri Hizmetleri Sorumlusu\nFaturalandırma Uzmanı";
var kariyer_secim_s3_7_0 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_s3_7_1 = "Girişimci/Startup Kurucusu\nGirişim Kapitalisti\nÜrün Müdürü\nİş Geliştirme Uzmanı\nİnovasyon Danışmanı\nGrowth Hacker\nFranchise Sahibi\nTasarım Odaklı Düşünme Kolaylaştırıcısı\nİnovasyon Koçu\nSosyal Girişimci\nPatent Analisti\nBaş İnovasyon Sorumlusu\nSürdürülebilirlik Danışmanı\nBiyolojik korsan\nESG (Çevresel, Sosyal ve Yönetişim) Uzmanı";
var kariyer_secim_s3_8_0 = "Öğretim ve Mentorluk Kariyerleri"; 
var kariyer_secim_s3_8_1 = "Öğretmen/Eğitimci\nProfesör\nOkul Müdürü\nMüfredat Geliştirici\nÖğretim Tasarımcısı\nEğitim Danışmanı\nÇevrimiçi Eğitmen\nÖzel Eğitim Öğretmeni\nESL Öğretmeni\nOkul Danışmanı\nKütüphaneci\nMentor/Koç\nKariyer Danışmanı\nEğitim Teknoloğu\nGençlik Mentoru";
var kariyer_secim_s3_9_0 = "Analitik ve Veriye Dayalı Kariyerler";
var kariyer_secim_s3_9_1 = "Veri Analisti\nFinansal Analist\nPazar Araştırması Analisti\nİstatistikçi\nYöneylem Araştırması Analisti\nAktüerya\nKantitatif Analist\nRisk Analisti\nİş Zekası Analisti\nTedarik Zinciri Analisti\nKredi Analisti\nFiyatlandırma Analisti\nKalite Güvence Analisti\nSağlık Veri Analisti\nUyumluluk Analisti";

var kariyer_secim_s4_1_0 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_s4_1_1 = "Sanal Gerçeklik Tasarımcısı\nArtırılmış Gerçeklik Sanatçısı\nNFT Sanatçısı\nXR Deneyim Tasarımcısı\nYapay Zeka ile Sanat Geliştiricisi\nHolografik Sanatçı\nSosyal Medya İçerik Üreticisi\nBiyo-Sanatçı\nSanal Moda Tasarımcısı\n3D Baskı Sanatçısı\nYapay Zeka ile Müzik Bestecisi\nOyun Anlatı Tasarımcısı\nYapay Zeka ile Hikaye Anlatıcısı\nMetaverse Mimarı";
var kariyer_secim_s4_2_0 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_s4_2_1 = "Sürdürülebilirlik Direktörü\nDijital Dönüşüm Yöneticisi\nUzaktan Çalışma Koordinatörü\nYapay Zeka Strateji Direktörü\nBlockchain Proje Yöneticisi\nESG Yöneticisi\nVeri Yönetişimi Sorumlusu\nSiber Güvenlik Yöneticisi\nAI Etik Görevlisi\nYapay Zeka Benimseme Stratejisti\nSanal Ekip Lideri\nKriz Yönetimi Koordinatörü\nTedarik Zinciri Dayanıklılık Yöneticisi\nUzay Turizmi Operasyon Direktörü";
var kariyer_secim_s4_3_0 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_s4_3_1 = "Telesağlık Uzmanı\nYZ Terapisti\nSanal Gerçeklik Terapisti\nTeletıp Koordinatörü\nRuh Sağlığı YZ Koçu\nGerontolog\nDijital Sağlık Koçu\nTopluluk Dayanıklılık Görevlisi\nYZ Destekli Özel İhtiyaç Eğitimcisi\nAfet Müdahale Koordinatörü\nYZ ile Geliştirilmiş Yaşlı Refakatçi\nRobotik Rehabilitasyon Terapisti\nUzaktan Ruh Sağlığı Danışmanı\nKriz İletişimi Müdürü\nÇevre Adaleti Savunucusu"; // sonuncuda silinebilir.
var kariyer_secim_s4_4_0 = "Teknik ve Mühendislik Kariyerler";
var kariyer_secim_s4_4_1 = "Kuantum Bilişim Mühendisi\nYZ Etik Uzmanı\nRobotik Otomasyon Mühendisi\n3D Baskı Mühendisi\nUzay Araştırmaları Mühendisi\nYenilenebilir Enerji Mühendisi\nOtonom Araç Mühendisi\nArtırılmış Gerçeklik Mühendisi\nBlockchain Geliştiricisi\nSiber Güvenlik Analisti\nNanoteknoloji Mühendisi\nBiyoinformatik Bilimcisi\nSu Kaynakları Mühendisi\nUzaktan Drone Teknisyeni";
var kariyer_secim_s4_5_0 = "Satış ve İlişkisel Kariyerler";
var kariyer_secim_s4_5_1 = "Dijital Satış Stratejisti\nYZ Satış Uzmanı\nSanal Gerçeklik Satış Müdürü\nSürdürülebilirlik Satış Danışmanı\nChatbot Satış Temsilcisi\nMüşteri Deneyimi Direktörü\nVeriye Dayalı Satış Analisti\nSosyal Ticaret Uzmanı\nYZ Destekli Kişisel Alışverişçi\nInfluencer Pazarlama Müdürü\nBlockchain Satış Danışmanı\nArtırılmış Gerçeklik Satış Uzmanı\nUzaktan Satış Koçu\nMüşteri Deneyimi YZ Tasarımcısı";
var kariyer_secim_s4_6_0 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_s4_6_1 = "Sanal Asistan\nAI Ofis Müdürü\nİşyeri Refahı Koordinatörü\nBlok Zinciri Yöneticisi\nDijital Etkinlik Yöneticisi\nSürdürülebilirlik Yöneticisi\nSiber Güvenlik Yöneticisi\nVeri Yönetişimi Uzmanı\nUzak Ekip Koordinatörü\nYapay Zeka Destekli İK Koordinatörü\nRobotik Otomasyonu Yöneticisi\nAkıllı Ofis Danışmanı\nUzay Turizmi Operasyon Koordinatörü\nUzak Etkinlik Planlayıcısı\nNFT Sanat Galerisi Yöneticisi";
var kariyer_secim_s4_7_0 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_s4_7_1 = "Blockchain Girişimcisi\nAI Startup Kurucusu\nUzay Turizmi Girişimcisi\nSürdürülebilir Ürün Yenilikçisi\nDijital Sağlık Yenilikçisi\nDrone Hizmetleri Girişimcisi\nNFT Startup Kurucusu\nSanal Gerçeklik Alan Sahibi\nUzay Madenciliği Girişimcisi\nArtırılmış Gerçeklik Operatörü\nSosyal Etki Girişimcisi için Yapay Zeka\nKuantum Bilişim Girişimcisi\nKişisel Markalaşma Koçu\nMetaverse Deneyim Tasarımcısı";
var kariyer_secim_s4_8_0 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_s4_8_1 = "Sanal Gerçeklik Eğitim Uzmanı\nYZ Eğitim Koçu\nEğitim Teknolojisi Geliştiricisi\NArtırılmış Gerçeklik Eğitmeni\nSanal Dünyalarda Gençlik Mentoru\nYZ Mentorluk Koordinatörü\nUzaktan Eğitim Uzmanı\nDijital Sağlık Eğitimcisi\nMetaverse Öğrenme Deneyimi Tasarımcısı\nBlockchain Eğitim Uzmanı\nOyun ve Espor Danışmanı\nSiber Güvenlik Eğitim Uzmanı\nYZ Destekli Dil Eğitmeni";
var kariyer_secim_s4_9_0 = "Analitik ve Veriye Dayalı Kariyerler";
var kariyer_secim_s4_9_1 = "Veri Bilimcisi\nMakine Öğrenimi Mühendisi\nYapay Zeka (AI) Etikçisi\nVeri Gizliliği Görevlisi\nBlockchain Veri Analisti\nVeri Sorumlusu\nAnalitik Modelleyici\nArtırılmış Analitik Uzmanı\nSiber Güvenlik Veri Analisti\nKuantum Veri Analisti\nSağlık Bilişiminde Veri Bilimcisi\nVeriye Dayalı Pazarlama Uzmanı\nSürdürülebilirlik Veri Analisti\nIoT (Nesnelerin İnterneti) Veri Analisti";

//perakende
var kariyer_secim_12_25_s7_retail_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s7_retail_1_2 = "Perakende sektöründe yaratıcı becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_retail_1_3 = "• Vitrin Tasarımcısı: Mağazaların dış görünüşlerini ve vitrinlerini tasarlayarak yaratıcı vizyonunuzu sergileyebilirsiniz.";
var kariyer_secim_12_25_s7_retail_1_4 = "• Görsel Düzenleme Uzmanı (Visual Merchandiser): Ürünlerin mağazada nasıl sunulacağını planlayarak, müşteri çekmek için estetik düzenlemeler yapabilirsiniz.";
var kariyer_secim_12_25_s7_retail_1_5 = "• Grafik Tasarımcı: Perakende firmalarının tanıtım materyallerini (afiş, broşür, sosyal medya görselleri) tasarlayabilirsiniz.";
var kariyer_secim_12_25_s7_retail_1_6 = "• Moda Danışmanı: Giyim mağazalarında stil danışmanlığı yaparak müşterilere yaratıcı giyim önerilerinde bulunabilirsiniz.";
var kariyer_secim_12_25_s7_retail_1_7 = "• İç Mekan Dekoratörü: Mağaza içi düzenlemeleri ve dekorasyonları yaparak perakende alanında yaratıcılığınızı kullanabilirsiniz."; 

var kariyer_secim_12_25_s7_retail_2_1 = "Liderlik ve Yönetim Kariyerleri"; 
var kariyer_secim_12_25_s7_retail_2_2 = "Perakende sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir:"; 
var kariyer_secim_12_25_s7_retail_2_3 = "• Mağaza Müdürü: Bir mağazanın operasyonel süreçlerini yöneterek, çalışanları ve müşteri ilişkilerini koordine edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_2_4 = "• Bölge Müdürü: Birden fazla mağazayı denetleyerek, satış ve performans hedeflerine ulaşmalarını sağlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_2_5 = "• Proje Yöneticisi: Yeni mağaza açılışları, kampanya yönetimleri ve lojistik projelerinde liderlik edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_2_6 = "• Ekip Lideri: Satış ekibinin verimli çalışmasını sağlamak için ekibi yönlendirebilir ve hedeflere ulaşmaları için destek olabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_2_7 = "• Müşteri Deneyimi Yöneticisi: Müşterilere daha iyi bir alışveriş deneyimi sunmak için stratejiler geliştirebilir ve ekibi buna göre yönlendirebilirsiniz."; 

var kariyer_secim_12_25_s7_retail_3_1 = "Yardım ve Sosyal Kariyerler"; 
var kariyer_secim_12_25_s7_retail_3_2 = "• Perakende sektöründe insanlarla etkileşim içinde olup sosyal yardım ya da destek sağlayabileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_3_3 = "• Müşteri Hizmetleri Temsilcisi: Mağazada ya da çağrı merkezinde müşterilere ürünler, hizmetler ve iade süreçleri hakkında yardım edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_3_4 = "• Satış Danışmanı: Müşterilere ihtiyaçlarına yönelik ürün önerilerinde bulunarak onlara yardımcı olabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_3_5 = "• Kasa Sorumlusu: Müşteri ödeme işlemlerinde sorunsuz bir deneyim yaşatabilir, onların sorularını yanıtlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_3_6 = "• Mağaza Asistanı: Müşterilere alışveriş sürecinde rehberlik edebilir, onların ihtiyaçlarına yönelik kişisel yardım sağlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_3_7 = "• İade ve Değişim Sorumlusu: İade ve değişim işlemlerini yürütüp, müşteri memnuniyeti sağlamak için etkili çözümler sunabilirsiniz."; 

var kariyer_secim_12_25_s7_retail_4_1 = "Teknik ve Mühendislik Kariyerleri"; 
var kariyer_secim_12_25_s7_retail_4_2 = "Perakende sektöründe teknik becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_retail_4_3 = "• Mağaza Teknoloji Uzmanı: Mağaza içindeki teknolojik sistemlerin (POS cihazları, güvenlik sistemleri, yazılımlar) sorunsuz çalışmasını sağlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_4_4 = "• Bakım ve Onarım Teknisyeni: Perakende mağazalarında kullanılan elektronik cihazların bakım ve onarımlarını gerçekleştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_4_5 = "• IT Destek Uzmanı: Perakende şirketlerinin teknik altyapılarını destekleyebilir, bilgisayar sistemleri ve ağ sorunlarına çözüm üretebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_4_6 = "• E-Ticaret Uzmanı: Online satış platformlarının teknik altyapısını yönetebilir, web site geliştirme ve bakımını yapabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_4_7 = "• Envanter ve Lojistik Uzmanı: Stok yönetimi ve lojistik süreçlerinin verimli işlemesini sağlamak için teknik analizler yapabilirsiniz."; 

var kariyer_secim_12_25_s7_retail_5_1 = "Satış ve İlişki Kurma Kariyerleri "; 
var kariyer_secim_12_25_s7_retail_5_2 = "Perakende sektöründe satış becerilerinizi ve müşteri ilişkilerinizi geliştirebileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_5_3 = "• Satış Temsilcisi: Mağaza içerisinde ürünlerin satışını gerçekleştirerek, müşteri ilişkileri ve satış performansını geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_5_4 = "• Müşteri İlişkileri Yöneticisi: Büyük müşterilerle uzun vadeli ilişkiler kurabilir, onların taleplerine uygun çözümler geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_5_5 = "• Satış Müdürü: Mağaza satış ekibini yönetebilir, hedeflere ulaşmak için stratejik satış planları oluşturabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_5_6 = "• Promosyon ve Tanıtım Uzmanı: Yeni ürün tanıtımları ve satış kampanyalarını organize ederek müşteri ilgisini çekebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_5_7 = "• Satış Analisti: Satış verilerini analiz edip, müşteri davranışlarını inceleyerek stratejik kararlar alabilirsiniz."; 

var kariyer_secim_12_25_s7_retail_6_1 = "Organizasyonel ve İdari Kariyerler"; 
var kariyer_secim_12_25_s7_retail_6_2 = "Perakende sektöründe organizasyon ve idari süreçlerde çalışabileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_6_3 = "• Ofis Yöneticisi: Mağazanın idari süreçlerini, personel takvimlerini ve genel operasyonları koordine edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_6_4 = "• Stok Yöneticisi: Mağaza stoklarını takip edebilir, envanter kontrolü yaparak stok seviyelerinin optimum düzeyde olmasını sağlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_6_5 = "• Personel Yönetimi Uzmanı: Mağaza çalışanlarının işe alım süreçlerini, eğitimlerini ve performans değerlendirmelerini organize edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_6_6 = "• Lojistik Koordinatörü: Mağazanın ürün teslimatlarını, tedarik zincirini ve lojistik süreçlerini organize edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_6_7 = "• Proje Koordinatörü: Mağaza yenileme projeleri veya satış kampanyalarının uygulanmasını yönetebilirsiniz."; 

var kariyer_secim_12_25_s7_retail_7_1 = "Yenilikçi ve Girişimci Kariyerler"; 
var kariyer_secim_12_25_s7_retail_7_2 = "• Perakende sektöründe yenilikçi fikirler ve girişimcilik ruhuyla çalışabileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_7_3 = "• E-Ticaret Girişimcisi: Kendi online mağazanızı kurabilir, ürünlerinizi dijital platformlar üzerinden satabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_7_4 = "• Mağaza Sahibi: Kendi perakende mağazanızı açabilir, iş fikirlerinizi hayata geçirerek girişimcilik kariyerinize adım atabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_7_5 = "• Ürün Geliştirme Uzmanı: Perakende sektöründe yeni ürünler geliştirebilir veya mevcut ürünleri yenilikçi yaklaşımlarla pazarlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_7_6 = "• Dijital Pazarlama Uzmanı: Sosyal medya ve dijital platformlar üzerinden mağaza veya ürünlerin tanıtımını yaparak yenilikçi pazarlama stratejileri geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_7_7 = "• Franchise Sahibi: Bir markanın franchise hakkını alarak, yenilikçi yönetim yöntemleriyle işletmenizi büyütebilirsiniz."; 

var kariyer_secim_12_25_s7_retail_8_1 = "Öğretim ve Mentorluk Kariyerleri "; 
var kariyer_secim_12_25_s7_retail_8_2 = "• Perakende sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_8_3 = "• Satış Eğitmeni: Yeni satış personeline eğitim vererek, onların becerilerini geliştirebilir ve mentorluk yapabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_8_4 = "• Mağaza İçi Eğitmen: Mağaza personelinin gelişimi için düzenli eğitimler vererek mağaza içi bilgi akışını sağlayabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_8_5 = "• Mağaza Yöneticisi Mentor: Mağaza yöneticilerini yetiştirerek, onların liderlik becerilerini geliştirmelerine yardımcı olabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_8_6 = "• Müşteri Deneyimi Koçu: Müşteri hizmetleri ekibine koçluk yaparak, onların müşteri memnuniyetini artırmalarına rehberlik edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_8_7 = "• Satış Koçu: Satış ekibine hedeflerine ulaşmaları için stratejik koçluk yaparak, performanslarını artırabilirsiniz."; 

var kariyer_secim_12_25_s7_retail_9_1 = "Analitik ve Veri Odaklı Kariyerler "; 
var kariyer_secim_12_25_s7_retail_9_2 = "Perakende sektöründe analitik düşünce ve veri odaklı çalışabileceğiniz işler: "; 
var kariyer_secim_12_25_s7_retail_9_3 = "• Stok ve Envanter Analisti: Mağazanın stok hareketlerini analiz ederek, envanter yönetimini optimize edebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_9_4 = "• Satış Veri Analisti: Satış verilerini analiz edip, mağaza performansını artırmak için stratejik kararlar verebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_9_5 = "• Pazarlama Analitiği Uzmanı: Pazarlama kampanyalarının etkisini ölçüp, veri odaklı pazarlama stratejileri geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_9_6 = "• E-Ticaret Analitiği Uzmanı: Online mağaza verilerini analiz ederek müşteri davranışlarını anlamaya yönelik çözümler geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_retail_9_7 = "• Müşteri Analitiği Uzmanı: Müşteri verilerini analiz ederek müşteri segmentasyonları ve hedeflemeleri yapabilirsiniz."; 
var kariyer_secim_12_25_s7_retail_9_8 = "Perakende sektöründe geniş bir yelpazede kariyer seçenekleri bulunuyor ve her kariyer tipi için uygun fırsatlar mevcut.";

//sağlık
var kariyer_secim_12_25_s7_health_1_1 = "Yaratıcı ve Sanatsal Kariyerler ";
var kariyer_secim_12_25_s7_health_1_2 = "Sağlık ve ilaç sektöründe yaratıcı becerilerinizi kullanabileceğiniz işler şunlar olabilir: ";
var kariyer_secim_12_25_s7_health_1_3 = "• Sağlık İletişimi Uzmanı: Sağlık kampanyalarının tanıtımını yapabilir, broşür, web sitesi ve sosyal medya için yaratıcı içerikler üretebilirsiniz. ";
var kariyer_secim_12_25_s7_health_1_4 = "• Medikal İllüstratör: Tıbbi konuları ve prosedürleri görsel olarak açıklayan çizimler yaparak doktorlar, hastalar ve öğrenciler için bilgi sağlayabilirsiniz. ";
var kariyer_secim_12_25_s7_health_1_5 = "• Grafik Tasarımcı: Sağlık kuruluşlarının ya da ilaç firmalarının tanıtım materyallerini tasarlayarak yaratıcı çözümler sunabilirsiniz. ";
var kariyer_secim_12_25_s7_health_1_6 = "• Reklam ve Tanıtım Uzmanı: İlaç firmalarının ve sağlık hizmetlerinin pazarlama stratejilerini yönetebilir, yaratıcı kampanyalar geliştirebilirsiniz. ";
var kariyer_secim_12_25_s7_health_1_7 = "• İçerik Üreticisi: Sağlıkla ilgili bloglar, videolar ya da sosyal medya içerikleri oluşturarak sektörel farkındalık yaratabilirsiniz. ";

var kariyer_secim_12_25_s7_health_2_1 = "Liderlik ve Yönetim Kariyerleri ";
var kariyer_secim_12_25_s7_health_2_2 = "Sağlık ve ilaç sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir: ";
var kariyer_secim_12_25_s7_health_2_3 = "• Hastane Yöneticisi: Bir hastanenin operasyonel süreçlerini yönetebilir, personel ve kaynak yönetiminden sorumlu olabilirsiniz. ";
var kariyer_secim_12_25_s7_health_2_4 = "• İlaç Firması Yöneticisi: İlaç üretim ve pazarlama süreçlerini yöneterek firmanın stratejik hedeflerine ulaşmasını sağlayabilirsiniz. ";
var kariyer_secim_12_25_s7_health_2_5 = "• Sağlık Projesi Yöneticisi: Sağlık projeleri (hastane açılışları, tıbbi cihaz geliştirme) veya araştırmalarının başında bulunabilirsiniz. ";
var kariyer_secim_12_25_s7_health_2_6 = "• Klinik Araştırma Müdürü: Yeni ilaçların klinik araştırma süreçlerini yöneterek, ilaç güvenliği ve etkinliğinin değerlendirilmesini sağlayabilirsiniz. ";
var kariyer_secim_12_25_s7_health_2_7 = "• İnsan Kaynakları Yöneticisi (Sağlık): Sağlık çalışanlarının işe alım, eğitim ve performans yönetiminden sorumlu olabilirsiniz. ";

var kariyer_secim_12_25_s7_health_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s7_health_3_2 = "Sağlık ve ilaç sektöründe insanlara yardım edebileceğiniz işler şunlar olabilir: ";
var kariyer_secim_12_25_s7_health_3_3 = "• Hemşire: Hastaların bakımını üstlenebilir, tedavi süreçlerinde doktorlara yardımcı olabilirsiniz. ";
var kariyer_secim_12_25_s7_health_3_4 = "• Sosyal Hizmet Uzmanı: Hastalar ve aileleri için rehberlik sağlayabilir, sosyal destek hizmetleri sunabilirsiniz. ";
var kariyer_secim_12_25_s7_health_3_5 = "• Hasta Danışmanı: Hastaların tedavi süreçlerinde rehberlik ederek, onların sorularını yanıtlayabilirsiniz. ";
var kariyer_secim_12_25_s7_health_3_6 = "• Terapist: Psikolojik ya da fiziksel tedavi sağlayarak hastaların sağlığına katkıda bulunabilirsiniz (fizyoterapist, psikolog, ergoterapist vb.). ";
var kariyer_secim_12_25_s7_health_3_7 = "• Eczane Teknisyeni: İlaçların dağıtımı ve hastalara ilaç kullanımı konusunda danışmanlık hizmeti verebilirsiniz. ";

var kariyer_secim_12_25_s7_health_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s7_health_4_2 = "Sağlık ve ilaç sektöründe teknik becerilerinizi kullanabileceğiniz işler şunlar olabilir: ";
var kariyer_secim_12_25_s7_health_4_3 = "• Biyomedikal Mühendisi: Tıbbi cihazlar geliştirerek hastaların tedavi süreçlerine katkı sağlayabilirsiniz. ";
var kariyer_secim_12_25_s7_health_4_4 = "• Tıbbi Teknolog: Laboratuvarlarda tıbbi testler yapabilir, kan ve doku örnekleri analiz edebilirsiniz. ";
var kariyer_secim_12_25_s7_health_4_5 = "• Sağlık IT Uzmanı: Sağlık sistemleri ve veri tabanları üzerinde çalışarak sağlık hizmetlerinin teknolojik altyapısını sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_health_4_6 = "• Tıbbi Cihaz Teknisyeni: Tıbbi cihazların bakım ve onarımını gerçekleştirerek hastanelerin teknik altyapısını destekleyebilirsiniz. ";
var kariyer_secim_12_25_s7_health_4_7 = "• Eczacılık Mühendisi: İlaç üretim süreçlerini denetleyebilir ve iyileştirme projeleri üzerinde çalışabilirsiniz. ";

var kariyer_secim_12_25_s7_health_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s7_health_5_2 = "Sağlık ve ilaç sektöründe satış becerilerinizi ve müşteri ilişkilerinizi kullanabileceğiniz işler şunlar olabilir: ";
var kariyer_secim_12_25_s7_health_5_3 = "• Tıbbi Satış Temsilcisi: Doktorlara, hastanelere veya eczanelere yeni ilaçlar ve tıbbi ürünler hakkında bilgi verip satış yapabilirsiniz. ";
var kariyer_secim_12_25_s7_health_5_4 = "• Eczane Satış Danışmanı: Eczanelerde çalışarak müşterilere ilaçlar ve sağlık ürünleri hakkında bilgi verebilir, satış yapabilirsiniz. ";
var kariyer_secim_12_25_s7_health_5_5 = "• İlaç Satış Müdürü: İlaç firmalarının satış ekiplerini yönetebilir, stratejik satış hedeflerine ulaşmak için ekibinizi yönlendirebilirsiniz. ";
var kariyer_secim_12_25_s7_health_5_6 = "• Tıbbi Ürün Pazarlama Uzmanı: İlaçların ve medikal ürünlerin pazarlama stratejilerini yöneterek, sağlık sektöründe marka bilinirliği yaratabilirsiniz. ";
var kariyer_secim_12_25_s7_health_5_7 = "• Müşteri İlişkileri Yöneticisi (Sağlık): Sağlık hizmeti sağlayıcıları ve hastalarla uzun vadeli ilişkiler kurarak ihtiyaçlarına uygun çözümler sunabilirsiniz.";

var kariyer_secim_12_25_s7_health_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s7_health_6_2 = "Sağlık ve ilaç sektöründe organizasyon ve idari becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_health_6_3 = "• Hastane Yönetim Asistanı: Hastane içi organizasyonel süreçleri, personel ve hasta kayıt işlemlerini koordine edebilirsiniz.";
var kariyer_secim_12_25_s7_health_6_4 = "• Tedarik Zinciri Uzmanı: İlaçların ve tıbbi malzemelerin tedarik süreçlerini yöneterek, stok ve dağıtım zincirini optimize edebilirsiniz.";
var kariyer_secim_12_25_s7_health_6_5 = "• Sağlık Proje Koordinatörü: Sağlık hizmeti sunan kuruluşların projelerini yönetebilir, ekipleri organize edebilirsiniz.";
var kariyer_secim_12_25_s7_health_6_6 = "• Tıbbi Sekreter: Hastaların randevu süreçlerini yönetebilir, doktorlar ve hastalar arasında iletişimi sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_health_6_7 = "• İnsan Kaynakları Uzmanı: Sağlık sektöründeki personel alımlarını ve çalışan eğitimlerini organize edebilirsiniz.";

var kariyer_secim_12_25_s7_health_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s7_health_7_2 = "Sağlık ve ilaç sektöründe yenilikçi fikirler ve girişimcilik ruhuyla çalışabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_health_7_3 = "• Sağlık Teknolojisi Girişimcisi: Yeni sağlık teknolojileri (mobil uygulamalar, tıbbi cihazlar) geliştiren bir girişim başlatabilirsiniz.";
var kariyer_secim_12_25_s7_health_7_4 = "• Biyoteknoloji Girişimcisi: Yeni biyoteknolojik çözümler veya ilaçlar geliştirmek üzere kendi girişiminizi kurabilirsiniz.";
var kariyer_secim_12_25_s7_health_7_5 = "• Dijital Sağlık Girişimcisi: Dijital sağlık hizmetleri sunan bir platform veya uygulama geliştirerek sektörde fark yaratabilirsiniz.";
var kariyer_secim_12_25_s7_health_7_6 = "• Medikal Ürün Girişimcisi: Yenilikçi tıbbi ürünler geliştirip pazarlayarak sağlık sektöründe girişimcilik yapabilirsiniz.";
var kariyer_secim_12_25_s7_health_7_7 = "• İlaç Ar-Ge Yöneticisi: İlaç firmalarında araştırma ve geliştirme süreçlerini yönetebilir, yeni ilaçlar ve tedaviler üzerine çalışmalar yapabilirsiniz.";

var kariyer_secim_12_25_s7_health_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s7_health_8_2 = "Sağlık ve ilaç sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_health_8_3 = "• Sağlık Eğitmeni: Hemşirelere, sağlık teknisyenlerine ya da doktorlara yönelik eğitimler vererek onların mesleki gelişimlerine katkıda bulunabilirsiniz.";
var kariyer_secim_12_25_s7_health_8_4 = "• Tıp Fakültesi Öğretim Görevlisi: Tıp öğrencilerine ders vererek, yeni nesil doktorların yetişmesine katkı sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_health_8_5 = "• Eczacılık Eğitmeni: Eczacılık öğrencilerine veya teknisyenlerine yönelik eğitimler vererek ilaç bilimi konusunda bilgi aktarabilirsiniz.";
var kariyer_secim_12_25_s7_health_8_6 = "• Sağlık ve Güvenlik Eğitmeni: Sağlık kurumlarında çalışanlara iş güvenliği ve hasta güvenliği eğitimleri sunabilirsiniz.";
var kariyer_secim_12_25_s7_health_8_7 = "• Mentor (Sağlık Profesyonelleri): Deneyimli bir sağlık profesyoneli olarak, yeni mezunlara ya da genç çalışanlara rehberlik edebilirsiniz.";

var kariyer_secim_12_25_s7_health_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s7_health_9_2 = "Sağlık ve ilaç sektöründe analitik becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_health_9_3 = "• Sağlık Veri Analisti: Hastaların tedavi süreçlerini ve sağlık hizmetlerinin performansını analiz ederek veri odaklı çözümler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_health_9_4 = "• Klinik Veri Yöneticisi: İlaç firmaları veya hastanelerde klinik araştırmalardan elde edilen verileri yönetebilir, analiz edebilirsiniz.";
var kariyer_secim_12_25_s7_health_9_5 = "• Sağlık Ekonomisi Analisti: Sağlık hizmetlerinin maliyetlerini analiz edip, ekonomik çözümler sunabilirsiniz.";
var kariyer_secim_12_25_s7_health_9_6 = "• Biyoinformatik Uzmanı: Genom ve biyomedikal verileri analiz ederek ilaç geliştirme süreçlerine katkıda bulunabilirsiniz.";
var kariyer_secim_12_25_s7_health_9_7 = "• Kalite Kontrol Analisti: İlaç üretim süreçlerinin kalitesini analiz ederek, güvenli ve etkili ürünler üretilmesini sağlayabilirsiniz.";

//teknoloji
var kariyer_secim_12_25_s7_tech_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s7_tech_1_2 = "Teknoloji sektöründe yaratıcılığınızı kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_1_3 = "• UX/UI Tasarımcısı: Web siteleri ve mobil uygulamaların kullanıcı deneyimini ve arayüzünü tasarlayarak kullanıcı dostu çözümler üretebilirsiniz.";
var kariyer_secim_12_25_s7_tech_1_4 = "• Oyun Tasarımcısı: Video oyunlarının konseptini ve görsellerini geliştirerek yaratıcı dünyalar ve karakterler oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_tech_1_5 = "• Grafik Tasarımcı (Dijital): Teknoloji firmalarının dijital pazarlama materyalleri ve web grafikleri için görseller tasarlayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_1_6 = "• Web Tasarımcısı: Web sitelerinin estetik görünümünü ve işlevselliğini oluşturabilir, yaratıcı çözümler sunabilirsiniz.";
var kariyer_secim_12_25_s7_tech_1_7 = "• Animasyon Uzmanı: 3D modelleme, animasyon ve dijital efektler oluşturarak reklamlar, oyunlar ya da filmler için görsel içerik üretebilirsiniz.";

var kariyer_secim_12_25_s7_tech_2_1 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_12_25_s7_tech_2_2 = "Teknoloji sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_2_3 = "• Proje Yöneticisi (Teknoloji): Yazılım geliştirme veya teknoloji projelerini yönetebilir, takımları organize ederek projeleri zamanında tamamlayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_2_4 = "• IT Yöneticisi: Şirketin bilgi teknolojileri altyapısını yönetebilir, yazılım ve donanım çözümleri geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_2_5 = "• Ürün Yöneticisi: Yeni teknolojik ürünlerin geliştirilmesinde sorumluluk alarak, ürünün pazara uyumlu olmasını sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_2_6 = "• Teknoloji Danışmanı: Firmalara teknoloji stratejileri geliştirerek iş süreçlerini optimize etmelerine yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_tech_2_7 = "• CTO (Chief Technology Officer): Bir şirketin teknoloji vizyonunu belirleyebilir, teknolojik yatırımları ve inovasyonu yönetebilirsiniz.";

var kariyer_secim_12_25_s7_tech_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s7_tech_3_2 = "Teknoloji sektöründe yardımsever yönlerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_3_3 = "• IT Destek Uzmanı: Kullanıcılara teknik destek sağlayarak bilgisayar, yazılım ve ağ sorunlarını çözebilirsiniz.";
var kariyer_secim_12_25_s7_tech_3_4 = "• Teknoloji Eğitmeni: Çalışanlara veya öğrencilere teknoloji ve yazılım eğitimleri vererek dijital becerilerini geliştirmelerine yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_tech_3_5 = "• Kullanıcı Destek Uzmanı: Yazılım ya da teknoloji ürünleri hakkında kullanıcıların sorularını yanıtlayabilir, teknik problemlerini çözmelerine yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_tech_3_6 = "• Sosyal Girişimci (Teknoloji): Teknoloji yoluyla sosyal problemlere çözüm üreten projeler geliştirerek toplum yararına işler yapabilirsiniz.";
var kariyer_secim_12_25_s7_tech_3_7 = "• Dijital Erişilebilirlik Uzmanı: Engelli bireylerin teknolojiyi daha rahat kullanabilmesi için yazılım ve donanım çözümleri geliştirebilirsiniz.";

var kariyer_secim_12_25_s7_tech_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s7_tech_4_2 = "Teknoloji sektöründe teknik ve mühendislik becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_4_3 = "• Yazılım Geliştirici: Web, mobil uygulama ya da oyun yazılımları geliştirebilir, kodlama becerilerinizi kullanarak çözümler üretebilirsiniz.";
var kariyer_secim_12_25_s7_tech_4_4 = "• Veri Mühendisi: Büyük veri setlerini işleyerek, şirketlerin veri yönetim süreçlerini optimize edebilirsiniz.";
var kariyer_secim_12_25_s7_tech_4_5 = "• Ağ Mühendisi: Şirketlerin bilgi ağlarını kurabilir, güvenli ve verimli ağ çözümleri sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_4_6 = "• Siber Güvenlik Uzmanı: Sistemlerin güvenliğini sağlamak için siber saldırılara karşı güvenlik önlemleri alabilirsiniz.";
var kariyer_secim_12_25_s7_tech_4_7 = "• Yapay Zeka Mühendisi: Yapay zeka algoritmaları geliştirerek makine öğrenmesi, robotik ve otomasyon gibi alanlarda projeler üretebilirsiniz.";

var kariyer_secim_12_25_s7_tech_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s7_tech_5_2 = "Teknoloji sektöründe satış ve ilişki yönetimi becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_5_3 = "• Teknoloji Satış Uzmanı: Şirketlere ya da bireylere yazılım, donanım ve bulut çözümleri satarak müşterilere uygun teknolojik çözümler sunabilirsiniz. ";
var kariyer_secim_12_25_s7_tech_5_4 = "• Müşteri Başarı Yöneticisi: Teknoloji ürünlerini kullanan müşterilere destek sağlayarak, ürünlerin verimli kullanımlarını sağlamalarına yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_tech_5_5 = "• Teknoloji Ürünleri Satış Müdürü: Satış ekiplerini yönetebilir, teknoloji ürünlerinin pazar stratejilerini geliştirip uygulayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_5_6 = "• Dijital Pazarlama Uzmanı: Teknoloji firmalarının ürünlerini dijital platformlarda tanıtarak satış stratejileri oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_tech_5_7 = "• İş Geliştirme Uzmanı (Teknoloji): Yeni müşteri ve iş fırsatları geliştirerek teknoloji firmalarının büyümesine katkı sağlayabilirsiniz.";

var kariyer_secim_12_25_s7_tech_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s7_tech_6_2 = "Teknoloji sektöründe organizasyon ve idari becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_6_3 = "• Ofis Yöneticisi (Teknoloji): Bir teknoloji firmasının günlük operasyonlarını ve idari süreçlerini yönetebilirsiniz.";
var kariyer_secim_12_25_s7_tech_6_4 = "• Proje Koordinatörü: Teknoloji projelerinde ekipler arasında koordinasyon sağlayarak işlerin zamanında ve düzenli bir şekilde ilerlemesini sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_tech_6_5 = "• Bilgi Teknolojileri Yönetici Asistanı: IT yöneticilerinin programlarını düzenleyebilir, toplantıları ve proje süreçlerini takip edebilirsiniz.";
var kariyer_secim_12_25_s7_tech_6_6 = "• İnsan Kaynakları Uzmanı (Teknoloji): Teknoloji firmalarında personel alımı, çalışan eğitimleri ve performans yönetimi gibi süreçleri organize edebilirsiniz.";
var kariyer_secim_12_25_s7_tech_6_7 = "• Dijital İşlem Uzmanı: Teknoloji firmalarının dijital operasyonlarını yöneterek veri işleme, dosya yönetimi ve dijital süreçleri optimize edebilirsiniz.";

var kariyer_secim_12_25_s7_tech_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s7_tech_7_2 = "Teknoloji sektöründe yenilikçi düşünceler ve girişimcilik ruhunuzu kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_7_3 = "• Start-Up Kurucusu (Teknoloji): Yeni teknoloji girişimleri kurarak inovatif ürünler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_7_4 = "• Yazılım Girişimcisi: Kendi yazılım projelerinizi geliştirerek piyasaya yeni dijital çözümler sunabilirsiniz.";
var kariyer_secim_12_25_s7_tech_7_5 = "• Teknoloji İnovasyon Danışmanı: Şirketlere yenilikçi teknolojik çözümler sunarak iş süreçlerini dijitalleştirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_7_6 = "• Dijital Ürün Geliştirici: Yeni dijital ürünler, uygulamalar ya da platformlar oluşturarak teknoloji dünyasında fark yaratabilirsiniz.";
var kariyer_secim_12_25_s7_tech_7_7 = "• Blockchain Girişimcisi: Blockchain teknolojisi üzerine projeler geliştirerek finans, güvenlik ya da lojistik gibi sektörlere yenilikçi çözümler sunabilirsiniz.";

var kariyer_secim_12_25_s7_tech_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s7_tech_8_2 = "Teknoloji sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_8_3 = "• Yazılım Eğitmeni: Genç yazılımcılara ya da profesyonellere yazılım dilleri ve teknolojik çözümler konusunda eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_tech_8_4 = "• Teknoloji Koçu: Teknoloji alanında yeni başlayanlara ya da genç profesyonellere rehberlik ederek kariyer gelişimlerine katkıda bulunabilirsiniz.";
var kariyer_secim_12_25_s7_tech_8_5 = "• Dijital Eğitim Uzmanı: Online eğitim platformlarında ya da eğitim kurumlarında teknoloji odaklı dersler ve eğitim materyalleri oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_tech_8_6 = "• STEM Eğitmeni: Okullarda ya da özel kurslarda fen, teknoloji, mühendislik ve matematik (STEM) eğitimleri vererek gençleri bu alanlara yönlendirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_8_7 = "• Mentor (Teknoloji): Start-up kurucuları ya da teknoloji profesyonellerine iş geliştirme, ürün yönetimi ya da yazılım geliştirme konularında rehberlik edebilirsiniz.";

var kariyer_secim_12_25_s7_tech_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s7_tech_9_2 = "Teknoloji sektöründe analitik düşünce ve veri becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_tech_9_3 = "• Veri Bilimcisi: Büyük veri setlerini analiz ederek, şirketlerin iş süreçlerini optimize edecek içgörüler üretebilirsiniz.";
var kariyer_secim_12_25_s7_tech_9_4 = "• İş Zekası Analisti: Şirketlerin stratejik kararlarını desteklemek için veri analizi yaparak raporlar ve çözümler sunabilirsiniz.";
var kariyer_secim_12_25_s7_tech_9_5 = "• Yapay Zeka Analisti: Yapay zeka algoritmaları ve makine öğrenmesi üzerine çalışmalar yaparak veri odaklı projeler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_9_6 = "• SEO Uzmanı: Web sitelerinin arama motorlarında daha iyi performans göstermesi için analizler yapabilir ve stratejiler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_tech_9_7 = "• Blockchain Analisti: Blockchain teknolojisi ile ilgili verileri analiz ederek, güvenli ve şeffaf dijital çözümler üretebilirsiniz.";
var kariyer_secim_12_25_s7_tech_9_8 = "• Teknoloji sektörü, her kariyer tipine uygun geniş bir yelpazede iş fırsatları sunuyor. Bu sektör, yenilikçi, teknik, yaratıcı ve organizasyonel becerilere sahip kişiler için oldukça uygun kariyer seçenekleri barındırıyor.";

//hazır giyim ve mode
var kariyer_secim_12_25_s7_dress_1_1 = "Yaratıcı ve Sanatsal Kariyerler "; 
var kariyer_secim_12_25_s7_dress_1_2 = "Hazır giyim sektöründe yaratıcılığınızı kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_1_3 = "• Moda Tasarımcısı: Kendi kıyafet koleksiyonlarınızı tasarlayarak veya bir moda markası için özgün tasarımlar geliştirerek yaratıcı yönünüzü ortaya koyabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_1_4 = "• Stylist (Stilist): Ünlüler, markalar veya moda çekimleri için kıyafet seçimleri yapabilir, kombin önerileri sunabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_1_5 = "• Görsel Düzenleme Uzmanı (Visual Merchandiser): Mağaza vitrinlerini ve iç tasarımlarını yaparak ürünlerin daha çekici görünmesini sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_1_6 = "• Moda İllüstratörü: Moda koleksiyonlarının çizimlerini yaparak tasarımları görsel olarak ifade edebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_1_7 = "• Kostüm Tasarımcısı: Tiyatro, film veya dizi prodüksiyonları için karakterlerin kostümlerini tasarlayarak giyim alanındaki yaratıcılığınızı kullanabilirsiniz. ";

var kariyer_secim_12_25_s7_dress_2_1 = "Liderlik ve Yönetim Kariyerleri "; 
var kariyer_secim_12_25_s7_dress_2_2 = "Hazır giyim sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_2_3 = "• Mağaza Müdürü: Büyük bir moda perakende mağazasını yönetebilir, satış stratejileri geliştirebilir ve personeli yönlendirebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_2_4 = "• Üretim Müdürü: Giyim üretim süreçlerini yönetebilir, kalite kontrol ve verimlilik konularında sorumluluk alabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_2_5 = "• Satış Müdürü: Hazır giyim ürünlerinin satış stratejilerini belirleyebilir ve satış ekibini yönetebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_2_6 = "• Tedarik Zinciri Yöneticisi: Giyim markalarının üretimden mağazalara kadar olan tedarik zincirini yöneterek, ürünlerin doğru zamanda doğru yerlere ulaşmasını sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_2_7 = "• Bölge Müdürü: Birden fazla mağazanın performansını denetleyerek, satış ve operasyon süreçlerini koordine edebilirsiniz. ";

var kariyer_secim_12_25_s7_dress_3_1 = "Yardım ve Sosyal Kariyerler "; 
var kariyer_secim_12_25_s7_dress_3_2 = "Hazır giyim sektöründe yardımsever yönlerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_3_3 = "• Moda Danışmanı (Mağaza): Müşterilere kıyafet seçimlerinde yardımcı olabilir, onların tarzlarına uygun kombinler önererek sosyal becerilerinizi kullanabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_3_4 = "• Sürdürülebilir Moda Uzmanı: Çevre dostu ve etik giyim üretimi üzerine çalışmalar yaparak topluma ve çevreye katkıda bulunabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_3_5 = "• Müşteri Hizmetleri Uzmanı: Giyim mağazalarında ya da moda markalarında müşterilere yardımcı olabilir, ürünler hakkında destek sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_3_6 = "• Moda Bağış Organizasyonları Koordinatörü: İhtiyaç sahiplerine giyim bağışı yapmak üzere organizasyonlar düzenleyebilir, sosyal sorumluluk projelerinde yer alabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_3_7 = "• Kariyer Danışmanı (Moda): Gençlere ve öğrencilere moda sektöründe kariyer olanakları hakkında rehberlik yapabilirsiniz. ";

var kariyer_secim_12_25_s7_dress_4_1 = "Teknik ve Mühendislik Kariyerleri "; 
var kariyer_secim_12_25_s7_dress_4_2 = "Hazır giyim sektöründe teknik ve mühendislik becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_4_3 = "• Tekstil Mühendisi: Giyim üretiminde kullanılan kumaş ve malzemelerin kalitesini denetleyebilir, üretim süreçlerini iyileştirebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_4_4 = "• Üretim Teknolojileri Uzmanı: Giyim üretiminde kullanılan makinelerin ve üretim teknolojilerinin verimli çalışmasını sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_4_5 = "• Kalıp Tasarımcısı: Kıyafetlerin kalıplarını teknik çizimlerle oluşturabilir, üretim aşamasında doğru kesimlerin yapılmasını sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_4_6 = "• Kumaş Teknoloğu: Kumaşların üretimi, geliştirilmesi ve performans testlerini yaparak teknik bilgi birikiminizi kullanabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_4_7 = "• Üretim Otomasyonu Uzmanı: Giyim üretim hatlarının otomatikleşmesini sağlayacak çözümler geliştirerek üretim süreçlerini optimize edebilirsiniz. ";

var kariyer_secim_12_25_s7_dress_5_1 = "Satış ve İlişki Kurma Kariyerleri "; 
var kariyer_secim_12_25_s7_dress_5_2 = "Hazır giyim sektöründe satış ve ilişki yönetimi becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_5_3 = "• Perakende Satış Danışmanı: Mağazalarda müşteri ilişkilerini yöneterek giyim ürünlerinin satışını yapabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_5_4 = "• Bayi Yöneticisi: Giyim markalarının bayilikleriyle ilişkileri yönetebilir, satış süreçlerini takip edebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_5_5 = "• Moda Pazarlama Uzmanı: Giyim markalarının reklam kampanyalarını ve dijital pazarlama stratejilerini oluşturarak ürünlerin tanıtımını yapabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_5_6 = "• Müşteri İlişkileri Yöneticisi: Büyük moda markaları için müşteri deneyimini yönetebilir, müşteri memnuniyetini artırmak için stratejiler geliştirebilirsiniz."; 
var kariyer_secim_12_25_s7_dress_5_7 = "• İş Geliştirme Uzmanı (Moda): Giyim markalarının yeni iş fırsatlarını değerlendirmelerine ve müşteri portföylerini genişletmelerine yardımcı olabilirsiniz. ";

var kariyer_secim_12_25_s7_dress_6_1 = "Organizasyonel ve İdari Kariyerler "; 
var kariyer_secim_12_25_s7_dress_6_2 = "Hazır giyim sektöründe organizasyon ve idari becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_6_3 = "• Mağaza Yönetici Asistanı: Mağazanın idari işlerini ve personel yönetimini destekleyerek, mağaza operasyonlarının sorunsuz ilerlemesini sağlayabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_6_4 = "• Stok Kontrol Uzmanı: Mağazaların stok yönetimini yapabilir, ürünlerin tedarik ve satış süreçlerini optimize edebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_6_5 = "• İnsan Kaynakları Uzmanı (Moda): Giyim firmalarında personel alımı, eğitim ve performans yönetimi gibi idari süreçleri organize edebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_6_6 = "• Proje Koordinatörü (Moda Etkinlikleri): Moda markalarının düzenlediği etkinlikleri ve lansmanları organize edebilir, etkinlik süreçlerini yönetebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_6_7 = "• Lojistik Uzmanı: Giyim ürünlerinin depolanması ve dağıtılması süreçlerini organize ederek tedarik zinciri yönetimine katkı sağlayabilirsiniz. ";

var kariyer_secim_12_25_s7_dress_7_1 = "Yenilikçi ve Girişimci Kariyerler "; 
var kariyer_secim_12_25_s7_dress_7_2 = "Hazır giyim sektöründe yenilikçi düşünceler ve girişimcilik ruhunuzu kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_7_3 = "• Moda Girişimcisi: Kendi moda markanızı kurarak yenilikçi tasarımlarınızı piyasaya sürebilir ve kendi işinizi yönetebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_7_4 = "• E-Ticaret Girişimcisi: Kendi online giyim mağazanızı kurarak dijital ortamda moda ürünleri satabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_7_5 = "• Sürdürülebilir Moda Girişimcisi: Çevre dostu ve geri dönüştürülebilir materyallerle giyim ürünleri üreterek bu alanda bir girişim başlatabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_7_6 = "• Moda Teknoloji Girişimcisi: Giyim teknolojisi, akıllı kumaşlar veya inovatif üretim yöntemleri üzerine çalışmalar yaparak sektörde fark yaratabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_7_7 = "• Tasarım Danışmanlığı: Moda tasarım danışmanlığı yaparak diğer markalara yenilikçi tasarımlar geliştirme konusunda rehberlik edebilirsiniz. ";

var kariyer_secim_12_25_s7_dress_8_1 = "Öğretim ve Mentorluk Kariyerleri "; 
var kariyer_secim_12_25_s7_dress_8_2 = "Hazır giyim sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler şunlar olabilir: "; 
var kariyer_secim_12_25_s7_dress_8_3 = "• Moda Eğitmeni: Moda tasarımı, stil danışmanlığı veya tekstil üretimi üzerine öğrencilere ya da çalışanlara eğitim verebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_8_4 = "• Stilist Danışmanı: Yeni başlayan stilistlere rehberlik ederek kariyerlerinde gelişmelerine yardımcı olabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_8_5 = "• Moda Koçu: Moda dünyasında kariyer yapmak isteyen bireylere profesyonel koçluk yaparak onların gelişim süreçlerini yönlendirebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_8_6 = "• Kariyer Mentoru (Moda): Moda sektöründe kariyer yapan profesyonellere rehberlik ederek, iş dünyasında karşılaştıkları zorluklarla başa çıkmalarına yardımcı olabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_8_7 = "• Moda Okulu Yöneticisi: Bir moda okulunda yönetici olarak, eğitim programlarını yönetebilir ve öğrencilere kaliteli bir eğitim sunulmasını sağlayabilirsiniz. ";

var kariyer_secim_12_25_s7_dress_9_1 = "Analitik ve Veri Odaklı Kariyerler "; 
var kariyer_secim_12_25_s7_dress_9_2 = "Hazır giyim sektöründe analitik düşünce ve veri becerilerinizi kullanabileceğiniz işler şunlar olabilir:"; 
var kariyer_secim_12_25_s7_dress_9_3 = "• Moda Trend Analisti: Pazar araştırmaları yaparak moda trendlerini ve tüketici tercihlerini analiz edebilir, markalara gelecekteki stratejileri hakkında önerilerde bulunabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_9_4 = "• E-Ticaret Veri Analisti: Online giyim mağazalarının satış verilerini analiz ederek müşteri davranışlarını ve satış performansını değerlendirebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_9_5 = "• Stok Analisti: Giyim ürünlerinin satış ve stok hareketlerini analiz ederek tedarik zincirinin daha verimli işlemesine yardımcı olabilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_9_6 = "• Fiyatlandırma Uzmanı: Moda ürünlerinin fiyatlandırılmasında veri odaklı analizler yaparak şirketin kar marjını optimize edebilirsiniz. "; 
var kariyer_secim_12_25_s7_dress_9_7 = "• Müşteri Analitiği Uzmanı: Müşteri alışkanlıklarını ve geri bildirimlerini analiz ederek, markaların müşteri deneyimini geliştirmelerine yardımcı olabilirsiniz. ";

// otomotiv
var kariyer_secim_12_25_s7_auto_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s7_auto_1_2 = "Otomotiv sektöründe yaratıcılığınızı kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_1_3 = "• Otomotiv Tasarımcısı: Araçların dış tasarımlarını veya iç mekan düzenlemelerini yaparak otomotiv dünyasına estetik katabilirsiniz.";
var kariyer_secim_12_25_s7_auto_1_4 = "• Endüstriyel Tasarımcı: Araçların kullanıcı dostu ve estetik açıdan çekici olmasını sağlayacak tasarımlar geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_1_5 = "• Grafik Tasarımcı: Otomotiv markaları için reklam, logo veya ürün tanıtımı gibi grafik çalışmalar yapabilirsiniz.";
var kariyer_secim_12_25_s7_auto_1_6 = "• Renk ve Malzeme Tasarımcısı: Araçlarda kullanılacak renk paletlerini ve malzemeleri belirleyerek, araçların estetik görünümüne katkıda bulunabilirsiniz.";
var kariyer_secim_12_25_s7_auto_1_7 = "• Görsel Sunum Uzmanı: Otomobil fuarları, reklam kampanyaları ve lansmanlar için görsel sunumlar ve konsept tasarımlar hazırlayabilirsiniz.";

var kariyer_secim_12_25_s7_auto_2_1 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_12_25_s7_auto_2_2 = "Otomotiv sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_2_3 = "• Fabrika Müdürü: Otomobil üretim fabrikasında üretim süreçlerini yönetebilir, kalite kontrol ve üretim hedeflerinin yerine getirilmesini sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_auto_2_4 = "• Satış Müdürü: Otomobil bayileri veya distribütörler için satış stratejileri geliştirip, satış ekibini yönlendirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_2_5 = "• Servis Müdürü: Otomobil servislerinin operasyonlarını yönetebilir, müşteri memnuniyetini artırmak için ekipleri yönlendirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_2_6 = "• Lojistik Müdürü: Üretimden dağıtıma kadar olan tedarik zinciri süreçlerini yönetebilir, araçların zamanında bayilere ulaşmasını sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_auto_2_7 = "• Proje Yöneticisi: Yeni araç modelleri geliştirme süreçlerini yönetebilir, farklı departmanları bir araya getirerek projelerin zamanında tamamlanmasını sağlayabilirsiniz.";

var kariyer_secim_12_25_s7_auto_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s7_auto_3_2 = "Otomotiv sektöründe yardımsever yönlerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_3_3 = "• Müşteri Hizmetleri Uzmanı: Otomobil sahiplerine servis ve bakım konusunda rehberlik edebilir, müşteri şikayetlerini çözüme kavuşturabilirsiniz.";
var kariyer_secim_12_25_s7_auto_3_4 = "• Garanti Danışmanı: Otomobil garantileri hakkında müşterilere bilgi verip, garanti kapsamındaki işlemleri organize edebilirsiniz.";
var kariyer_secim_12_25_s7_auto_3_5 = "• Eğitim ve Gelişim Uzmanı: Otomotiv çalışanlarına servis, satış veya teknik eğitimler vererek sektörde bilgi paylaşımına katkı sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_auto_3_6 = "• Topluluk İlişkileri Uzmanı: Otomotiv firmalarının sosyal sorumluluk projelerini yönetebilir, topluma fayda sağlayacak projeler oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_auto_3_7 = "• Sürdürülebilirlik Uzmanı: Çevre dostu otomobil üretimi ve sürdürülebilir enerji kaynaklarının kullanımı üzerine çalışarak sektörde çevresel farkındalık yaratabilirsiniz.";

var kariyer_secim_12_25_s7_auto_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s7_auto_4_2 = "Otomotiv sektöründe teknik ve mühendislik becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_4_3 = "• Makine Mühendisi: Araçların motor, şasi ve diğer mekanik parçalarını tasarlayabilir ve geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_4_4 = "• Otomotiv Mühendisi: Araçların performansını artırmak, güvenliğini sağlamak ve enerji verimliliğini optimize etmek için çalışabilirsiniz.";
var kariyer_secim_12_25_s7_auto_4_5 = "• Elektrik-Elektronik Mühendisi: Araçların elektronik sistemleri, sensörleri ve otonom sürüş teknolojilerini geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_4_6 = "• Üretim Mühendisi: Araçların üretim süreçlerini planlayarak, verimliliği artırmak ve maliyetleri azaltmak üzerine çalışmalar yapabilirsiniz.";
var kariyer_secim_12_25_s7_auto_4_7 = "• Kalite Kontrol Uzmanı: Üretilen araçların kalite standartlarına uygun olup olmadığını denetleyerek, üretim süreçlerini iyileştirebilirsiniz.";

var kariyer_secim_12_25_s7_auto_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s7_auto_5_2 = "Otomotiv sektöründe satış ve ilişki yönetimi becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_5_3 = "• Otomobil Satış Danışmanı: Bayilerde müşteri ilişkilerini yöneterek, araç satışını gerçekleştirebilir ve müşteri taleplerini karşılayabilirsiniz.";
var kariyer_secim_12_25_s7_auto_5_4 = "• Filo Satış Yöneticisi: Büyük firmalar veya filo alıcıları için araç satış stratejileri geliştirebilir, kurumsal müşterilerle ilişkiler kurabilirsiniz.";
var kariyer_secim_12_25_s7_auto_5_5 = "• Satış Sonrası Hizmetler Uzmanı: Müşterilerin araç servisi, bakım ve yedek parça ihtiyaçları için destek sağlayabilir, satış sonrası hizmet kalitesini artırabilirsiniz.";
var kariyer_secim_12_25_s7_auto_5_6 = "• Pazarlama Uzmanı: Otomobil markalarının pazarlama kampanyalarını yönetebilir, reklam ve tanıtım stratejileri geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_5_7 = "• Müşteri Deneyimi Yöneticisi: Müşterilerin satın alma sürecinde ve sonrasında yaşadıkları deneyimleri analiz ederek, müşteri memnuniyetini artıracak stratejiler geliştirebilirsiniz.";

var kariyer_secim_12_25_s7_auto_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s7_auto_6_2 = "Otomotiv sektöründe organizasyon ve idari becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_6_3 = "• Ofis Yöneticisi: Otomobil firmalarında idari süreçleri yönetebilir, personel ve günlük operasyonları organize edebilirsiniz.";
var kariyer_secim_12_25_s7_auto_6_4 = "• İnsan Kaynakları Uzmanı: Otomotiv sektöründe çalışan personelin alım süreçlerini, eğitimlerini ve performans değerlendirmelerini yapabilirsiniz.";
var kariyer_secim_12_25_s7_auto_6_5 = "• Stok Yönetimi Uzmanı: Bayilerde ya da üretim tesislerinde araç ve parça stoklarını yönetebilir, taleplere göre stok seviyelerini optimize edebilirsiniz.";
var kariyer_secim_12_25_s7_auto_6_6 = "• Satış Operasyonları Yöneticisi: Otomobil satış süreçlerinin operasyonel detaylarını yönetebilir, bayi ve distribütörler arasındaki iletişimi koordine edebilirsiniz.";
var kariyer_secim_12_25_s7_auto_6_7 = "• Lojistik ve Dağıtım Uzmanı: Üretilen araçların bayilere veya distribütörlere zamanında teslim edilmesi için lojistik süreçlerini organize edebilirsiniz.";

var kariyer_secim_12_25_s7_auto_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s7_auto_7_2 = "• Otomotiv sektöründe yenilikçi düşünceler ve girişimcilik ruhunuzu kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_7_3 = "• Elektrikli Araç Girişimcisi: Elektrikli otomobil üretimi veya şarj altyapısı geliştirme üzerine bir girişim başlatabilirsiniz.";
var kariyer_secim_12_25_s7_auto_7_4 = "• Otomotiv Teknoloji Girişimcisi: Otonom sürüş, yapay zeka veya bağlantılı araç teknolojileri üzerine yenilikçi çözümler sunan bir girişim kurabilirsiniz.";
var kariyer_secim_12_25_s7_auto_7_5 = "• Start-up Kurucusu (Otomobil Paylaşımı): Araç paylaşımı veya kiralama üzerine bir platform geliştirebilir, mobilite çözümleri sunabilirsiniz.";
var kariyer_secim_12_25_s7_auto_7_6 = "• İnovasyon Danışmanı: Otomotiv firmalarına yeni teknoloji ve trendler hakkında danışmanlık yaparak, yenilikçi stratejiler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_7_7 = "• Ar-Ge Yöneticisi: Yeni araç teknolojileri geliştirmek üzere Ar-Ge projeleri yönetebilir ve sektördeki yenilikleri takip edebilirsiniz.";

var kariyer_secim_12_25_s7_auto_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s7_auto_8_2 = "Otomotiv sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_8_3 = "• Otomotiv Eğitmeni: Teknik liselerde veya üniversitelerde otomotiv teknolojisi, mühendislik veya üretim süreçleri üzerine eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_auto_8_4 = "• Sürücü Eğitmeni: Araç kullanımı konusunda sürücü adaylarına eğitim vererek onların güvenli sürüş becerilerini geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_8_5 = "• Teknik Servis Eğitmeni: Servis teknisyenlerine otomobil tamiri, bakım ve onarım konusunda eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_auto_8_6 = "• Kariyer Koçu (Otomotiv): Otomotiv sektöründe kariyer yapmayı planlayan bireylere mentorluk yaparak onların kariyer yollarını çizmelerine yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_auto_8_7 = "• Mentor (Ar-Ge ve Yenilik): Genç mühendis ve girişimcilere Ar-Ge ve inovasyon projelerinde rehberlik edebilir, yeni nesil otomotiv çözümleri geliştirmelerine yardımcı olabilirsiniz.";

var kariyer_secim_12_25_s7_auto_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s7_auto_9_2 = "Otomotiv sektöründe analitik düşünce ve veri becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_auto_9_3 = "• Veri Analisti (Otonom Sürüş): Otonom sürüş sistemlerinin topladığı verileri analiz ederek araç güvenliğini artırmaya yönelik çözümler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_9_4 = "• Satış ve Pazar Analisti: Araç satış verilerini ve pazar trendlerini analiz ederek, satış stratejilerine yön verebilirsiniz.";
var kariyer_secim_12_25_s7_auto_9_5 = "• Veri Bilimci (Telemetri): Araçların sürüş performansını izleyen telemetri verilerini analiz ederek, araç performansını ve güvenliğini iyileştirebilirsiniz.";
var kariyer_secim_12_25_s7_auto_9_6 = "• Müşteri Analitiği Uzmanı: Otomotiv müşterilerinin tercih ve satın alma davranışlarını analiz ederek, kişiselleştirilmiş müşteri deneyimi stratejileri oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_auto_9_7 = "• Üretim Analisti: Araç üretim süreçlerindeki verileri analiz ederek, üretim verimliliğini ve kaliteyi artıracak iyileştirmeler yapabilirsiniz.";

// mutfak sanatları
var kariyer_secim_12_25_s7_meal_1_1 = "Yaratıcı ve Sanatsal Kariyerler";
var kariyer_secim_12_25_s7_meal_1_2 = "Mutfak sanatları sektöründe yaratıcılığınızı kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_1_3 = "• Şef (Chef): Restoranlarda veya otellerde menüleri tasarlayarak, yaratıcı yemekler hazırlayabilir ve mutfak sanatlarını yüksek seviyede icra edebilirsiniz.";
var kariyer_secim_12_25_s7_meal_1_4 = "• Pasta Şefi: Özel pastalar, tatlılar ve şekerlemeler hazırlayarak tatlı dünyasında yaratıcı dokunuşlar yapabilirsiniz.";
var kariyer_secim_12_25_s7_meal_1_5 = "• Gıda Tasarımcısı: Yemeklerin görsel sunumunu tasarlayarak, şık ve estetik tabaklar hazırlayabilir, yemeklerin görsel estetiğini artırabilirsiniz.";
var kariyer_secim_12_25_s7_meal_1_6 = "• Gıda Fotoğrafçısı: Yiyeceklerin etkileyici fotoğraflarını çekerek, yemeklerin tanıtımı için görsel içerikler oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_meal_1_7 = "• Yemek Stilisisti: Yemeklerin sunumu, tabak düzeni ve fotoğraf çekimleri için profesyonel stil düzenlemeleri yapabilirsiniz.";

var kariyer_secim_12_25_s7_meal_2_1 = "Liderlik ve Yönetim Kariyerleri";
var kariyer_secim_12_25_s7_meal_2_2 = "Mutfak sanatları sektöründe liderlik ve yönetim becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_2_3 = "• Mutfak Şefi: Bir mutfağı yönetebilir, menüleri oluşturabilir ve mutfak personelini yönlendirebilirsiniz.";
var kariyer_secim_12_25_s7_meal_2_4 = "• Restoran Müdürü: Restoran operasyonlarını yönetebilir, müşteri ilişkilerini düzenleyebilir ve işletme stratejilerini belirleyebilirsiniz.";
var kariyer_secim_12_25_s7_meal_2_5 = "• Catering Müdürü: Büyük etkinlikler için yemek hizmetlerini organize edebilir, ekibi yönetebilir ve etkinliklerin başarılı bir şekilde gerçekleşmesini sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_meal_2_6 = "• Mutfak Koordinatörü: Mutfak içindeki günlük operasyonları, malzeme yönetimini ve personel koordinasyonunu sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_meal_2_7 = "• Gıda ve İçecek Müdürü: Restoran veya otel içindeki yiyecek ve içecek hizmetlerini yönetebilir, kalite kontrol ve müşteri memnuniyetini artırabilirsiniz.";

var kariyer_secim_12_25_s7_meal_3_1 = "Yardım ve Sosyal Kariyerler";
var kariyer_secim_12_25_s7_meal_3_2 = "Mutfak sanatları sektöründe yardımsever yönlerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_3_3 = "• Topluluk Mutfakları Yöneticisi: Gıda yardımı sağlayan organizasyonlarda, ihtiyaç sahiplerine yemek hizmetleri sunabilir ve topluma katkıda bulunabilirsiniz.";
var kariyer_secim_12_25_s7_meal_3_4 = "• Gıda Güvenliği Eğitmeni: Restoran ve mutfaklarda gıda güvenliği ve hijyen konularında eğitimler vererek sağlığı koruyabilirsiniz.";
var kariyer_secim_12_25_s7_meal_3_5 = "• Aşçılık Eğitmeni: Genç aşçılara veya yemek meraklılarına mutfak becerileri ve tarifler hakkında eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_meal_3_6 = "• Sosyal Yardım Projeleri Koordinatörü: Gıda bağışları veya mutfak destek projelerinde görev alarak, toplumsal yardımlaşmayı destekleyebilirsiniz.";
var kariyer_secim_12_25_s7_meal_3_7 = "• Gıda Danışmanı: Sağlıklı yemek planları ve beslenme konularında rehberlik yaparak bireylerin yaşam kalitesini artırabilirsiniz.";

var kariyer_secim_12_25_s7_meal_4_1 = "Teknik ve Mühendislik Kariyerleri";
var kariyer_secim_12_25_s7_meal_4_2 = "Mutfak sanatları sektöründe teknik ve mühendislik becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_4_3 = "• Mutfak Ekipmanları Mühendisi: Mutfak ekipmanlarının tasarımını yapabilir, yeni teknolojiler geliştirebilir ve mevcut ekipmanları optimize edebilirsiniz.";
var kariyer_secim_12_25_s7_meal_4_4 = "• Gıda Teknologu: Gıda ürünlerinin üretim süreçlerini denetleyebilir, kalite kontrol ve ürün geliştirme üzerine çalışabilirsiniz.";
var kariyer_secim_12_25_s7_meal_4_5 = "• Mutfak Tasarımcısı: Profesyonel mutfak alanlarının planlanması ve tasarımı konusunda çalışmalar yapabilirsiniz.";
var kariyer_secim_12_25_s7_meal_4_6 = "• Yemek Üretim Süreçleri Mühendisi: Gıda üretim süreçlerini analiz ederek, verimlilik ve kaliteyi artırmak için teknik çözümler geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_meal_4_7 = "• Gıda Paketleme Uzmanı: Gıda ürünlerinin paketleme süreçlerini optimize ederek, ürünlerin güvenliğini ve tazeliğini koruyabilirsiniz.";

var kariyer_secim_12_25_s7_meal_5_1 = "Satış ve İlişki Kurma Kariyerleri";
var kariyer_secim_12_25_s7_meal_5_2 = "Mutfak sanatları sektöründe satış ve ilişki yönetimi becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_5_3 = "• Restoran Satış Temsilcisi: Restoranların veya catering hizmetlerinin satışını yapabilir, müşteri ilişkilerini yönetebilirsiniz.";
var kariyer_secim_12_25_s7_meal_5_4 = "• Yiyecek ve İçecek Satış Müdürü: Gıda ürünleri ve içeceklerin satışını artırmak için stratejiler geliştirebilir, müşterilerle ilişkileri yönetebilirsiniz.";
var kariyer_secim_12_25_s7_meal_5_5 = "• Gıda Ürünleri Satış Danışmanı: Yeni gıda ürünlerini tanıtarak, marketler veya restoranlar için satış stratejileri geliştirebilirsiniz.";
var kariyer_secim_12_25_s7_meal_5_6 = "• Restoran Pazarlama Uzmanı: Restoranların tanıtımını yaparak, pazarlama kampanyalarını yönetebilir ve müşteri çekme stratejileri oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_meal_5_7 = "• Müşteri İlişkileri Yöneticisi: Restoran veya catering hizmetlerinde müşteri deneyimini yönetebilir, geri bildirimleri değerlendirip iyileştirme yapabilirsiniz.";

var kariyer_secim_12_25_s7_meal_6_1 = "Organizasyonel ve İdari Kariyerler";
var kariyer_secim_12_25_s7_meal_6_2 = "Mutfak sanatları sektöründe organizasyon ve idari becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_6_3 = "• Mutfak Yönetici Asistanı: Mutfak yöneticisinin günlük işlerini destekleyebilir, organizasyon ve idari süreçlerde yardımcı olabilirsiniz.";
var kariyer_secim_12_25_s7_meal_6_4 = "• Gıda Stok Kontrol Uzmanı: Yiyecek ve içecek stoklarının yönetimini yapabilir, malzeme taleplerini organize edebilirsiniz.";
var kariyer_secim_12_25_s7_meal_6_5 = "• Yemek Servis Koordinatörü: Restoran veya catering hizmetlerinde yemek servislerinin düzenlenmesini ve koordinasyonunu sağlayabilirsiniz.";
var kariyer_secim_12_25_s7_meal_6_6 = "• İnsan Kaynakları Uzmanı: Mutfak personelinin işe alım süreçlerini, eğitimlerini ve performans değerlendirmelerini yönetebilirsiniz.";
var kariyer_secim_12_25_s7_meal_6_7 = "• Restoran Operasyon Yöneticisi: Restoran operasyonlarının idaresini yaparak, müşteri hizmetlerini ve günlük iş akışını yönetebilirsiniz.";

var kariyer_secim_12_25_s7_meal_7_1 = "Yenilikçi ve Girişimci Kariyerler";
var kariyer_secim_12_25_s7_meal_7_2 = "Mutfak sanatları sektöründe yenilikçi düşünceler ve girişimcilik ruhunuzu kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_7_3 = "• Gıda Start-up Kurucusu: Kendi gıda markanızı veya restoranınızı kurarak yenilikçi menüler ve hizmetler sunabilirsiniz.";
var kariyer_secim_12_25_s7_meal_7_4 = "• Gastronomi Girişimcisi: Yeni yemek trendleri ve gastronomi deneyimleri üzerine girişim başlatarak sektörde farklılık yaratabilirsiniz.";
var kariyer_secim_12_25_s7_meal_7_6 = "• Yemek Tarifleri Geliştiricisi: Kendi tariflerinizi oluşturarak, yemek kitapları yazabilir veya dijital platformlarda tariflerinizi paylaşabilirsiniz.";
var kariyer_secim_12_25_s7_meal_7_7 = "• Sağlıklı Gıda Girişimcisi: Sağlıklı ve doğal gıda ürünleri üretimi üzerine bir girişim kurarak, sağlıklı yaşamı teşvik edebilirsiniz.";
var kariyer_secim_12_25_s7_meal_7_8 = "• Gıda İnovasyon Danışmanı: Restoranlar ve gıda firmalarına yenilikçi yemek çözümleri ve menü geliştirme konularında danışmanlık yapabilirsiniz.";

var kariyer_secim_12_25_s7_meal_8_1 = "Öğretim ve Mentorluk Kariyerleri";
var kariyer_secim_12_25_s7_meal_8_2 = "Mutfak sanatları sektöründe öğretim ve mentorluk becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_8_3 = "• Aşçılık Eğitmeni: Mutfak sanatları okulunda veya kurslarda aşçılık ve mutfak teknikleri üzerine eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_meal_8_4 = "• Gıda Güvenliği Eğitmeni: Gıda güvenliği ve hijyen konularında eğitimler vererek profesyonellere rehberlik edebilirsiniz.";
var kariyer_secim_12_25_s7_meal_8_5 = "• Mutfak Mentoru: Genç aşçılara ve mutfak çalışanlarına rehberlik yaparak, kariyer gelişimlerini destekleyebilirsiniz.";
var kariyer_secim_12_25_s7_meal_8_6 = "• Yemek Tarifi Danışmanı: Yemek tarifleri oluşturma ve yemek pişirme teknikleri üzerine bireylere veya gruplara eğitim verebilirsiniz.";
var kariyer_secim_12_25_s7_meal_8_7 = "• Gastronomi Koçu: Mutfak sanatları alanında kariyer yapmak isteyen bireylere koçluk yaparak, onların yeteneklerini geliştirmelerine yardımcı olabilirsiniz.";

var kariyer_secim_12_25_s7_meal_9_1 = "Analitik ve Veri Odaklı Kariyerler";
var kariyer_secim_12_25_s7_meal_9_2 = "Mutfak sanatları sektöründe analitik düşünce ve veri becerilerinizi kullanabileceğiniz işler şunlar olabilir:";
var kariyer_secim_12_25_s7_meal_9_3 = "• Menü Analisti: Menü performansını analiz ederek, müşteri geri bildirimlerine göre menü iyileştirmeleri yapabilirsiniz.";
var kariyer_secim_12_25_s7_meal_9_4 = "• Gıda Ürünleri Veri Analisti: Gıda ürünlerinin pazar trendlerini ve müşteri tercihlerine dair verileri analiz ederek, ürün geliştirme stratejileri oluşturabilirsiniz.";
var kariyer_secim_12_25_s7_meal_9_5 = "• Müşteri Deneyimi Analisti: Restoran veya mutfak hizmetlerindeki müşteri deneyimlerini analiz ederek, hizmet kalitesini artıracak önerilerde bulunabilirsiniz.";
var kariyer_secim_12_25_s7_meal_9_6 = "• Satış Verileri Analisti: Restoran satış verilerini analiz ederek, satış stratejilerini optimize edebilir ve iş kararlarını destekleyebilirsiniz.";
var kariyer_secim_12_25_s7_meal_9_7 = "• Gıda Güvenliği Analisti: Gıda güvenliği verilerini analiz ederek, hijyen standartlarının ve kalite kontrol süreçlerinin iyileştirilmesine katkıda bulunabilirsiniz.";

//Kariyer Seçim İngilizce
var kariyer_secim_25_40_eng_s2_1_1 = "Creative and Artistic Careers"
var kariyer_secim_25_40_eng_s2_1_2 = "If you want to use your creativity in your professional life, these fields might be a great fit for you. Careers in advertising, graphic design, fashion, music, film, or writing allow you to reflect your aesthetic sense and original ideas in professional projects. For example, you could design innovative ad campaigns for a brand or work as a content writer on creative projects. Artistic careers offer broad and flexible opportunities—whether you choose to work freelance or collaborate with an agency.";

var kariyer_secim_25_40_eng_s2_2_1 = "Leadership and Management Careers"
var kariyer_secim_25_40_eng_s2_2_2 = "You have a natural ability for leadership and can excel in managing teams and making strategic decisions. Careers in project management, team leadership, operations management, or senior executive roles require taking responsibility and achieving goals. For example, as a business manager, you could oversee the entire operations of an organization and develop new strategies to contribute to its growth. These careers demand strong leadership skills for long-term success and career advancement.";





var kariyer_secim_eng_s3_1_0 = "Creative and Artistic Careers"
var kariyer_secim_eng_s3_1_1 = "Graphic Designer\nContent Creator\nPhotographer\nIllustrator\nMusician\nDirector\nArt Director\nAnimator\nAdvertising Art Director\nInterior Designer\nFashion Designer\nWeb Designer\nVideo Editor\nSound Engineer\nCreative Director";



var kariyer_secim_eng_s4_1_0 = "Creative and Artistic Careers"
var kariyer_secim_eng_s4_1_1 = "Virtual Reality Designer\nAugmented Reality Artist\nNFT Artist\nXR (Extended Reality)\nExperience Designer\nAI-Generated Art Developer\nHolographic Artist\nSocial Media Content Producer\nBio-Artist (Biotechnology Art)\nVirtual Fashion Designer\nChief Artist\nAI-Enhanced Music Composer\nGame Story Designer\nAI-Generated Storyteller\nMetaverse Architect";


//perakende
var kariyer_secim_12_25_s7_eng_retail_1_1 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_retail_1_2 = "Jobs Available in the Retail Sector:";
var kariyer_secim_12_25_s7_eng_retail_1_3 = "• Window Display Designer: Showcase your creative vision by designing the exterior displays of stores.";
var kariyer_secim_12_25_s7_eng_retail_1_4 = "• Visual Merchandiser: Plan how products are presented in-store to attract customers with aesthetic arrangements.";
var kariyer_secim_12_25_s7_eng_retail_1_5 = "• Graphic Designer: Design promotional materials (posters, brochures, social media visuals) for retail companies";
var kariyer_secim_12_25_s7_eng_retail_1_6 = "• Fashion Consultant: Provide creative style advice to customers in clothing stores.";
var kariyer_secim_12_25_s7_eng_retail_1_7 = "• Interior Decorator: Use your creativity to design and arrange store interiors in the retail space.";


//sağlık
var kariyer_secim_12_25_s7_eng_health_1_1 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_health_1_2 = "Jobs in the Healthcare and Pharmaceutical Sector:";
var kariyer_secim_12_25_s7_eng_health_1_3 = "• Health Communication Specialist: You can promote health campaigns and create creative content for brochures, websites, and social media.";
var kariyer_secim_12_25_s7_eng_health_1_4 = "• Medical Illustrator: By making visual illustrations of medical topics and procedures, you can provide information for doctors, patients, and students.";
var kariyer_secim_12_25_s7_eng_health_1_5 = "• Graphic Designer: You can offer creative solutions by designing promotional materials for healthcare institutions or pharmaceutical companies.";
var kariyer_secim_12_25_s7_eng_health_1_6 = "• Advertising and Promotion Specialist: You can manage the marketing strategies of pharmaceutical companies and healthcare services and develop creative campaigns.";
var kariyer_secim_12_25_s7_eng_health_1_7 = "• Content Creator: By creating health-related blogs, videos, or social media content, you can raise awareness in the sector.";


//teknoloji
var kariyer_secim_12_25_s7_eng_tech_1_1 = "Jobs Available in the Technology Sector";
var kariyer_secim_12_25_s7_eng_tech_1_2 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_tech_1_3 = "• UX/UI Designer: You can design user experiences and interfaces for websites and mobile apps, creating user-friendly solutions.";
var kariyer_secim_12_25_s7_eng_tech_1_4 = "• Game Designer: Develop concepts and visuals for video games, creating imaginative worlds and characters.";
var kariyer_secim_12_25_s7_eng_tech_1_5 = "• Digital Graphic Designer: Design visuals for digital marketing materials and web graphics for tech companies.";
var kariyer_secim_12_25_s7_eng_tech_1_6 = "• Web Designer: Shape the aesthetics and functionality of websites, offering creative solutions.";
var kariyer_secim_12_25_s7_eng_tech_1_7 = "• Animation Specialist: Produce 3D models, animations, and digital effects for ads, games, or films.";


//hazır giyim ve moda
var kariyer_secim_12_25_s7_eng_dress_1_1 = "Fashion Industry";
var kariyer_secim_12_25_s7_eng_dress_1_2 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_dress_1_3 = "• Fashion Designer: You can express your creative side by designing your own clothing collections or creating original designs for a fashion brand.";
var kariyer_secim_12_25_s7_eng_dress_1_4 = "• Stylist: You can select outfits and offer styling advice for celebrities, brands, or fashion shoots.";
var kariyer_secim_12_25_s7_eng_dress_1_5 = "• Visual Merchandiser: By designing store windows and interior displays, you can help make products more appealing.";
var kariyer_secim_12_25_s7_eng_dress_1_6 = "• Fashion Illustrator: You can visually express designs by sketching fashion collections.";
var kariyer_secim_12_25_s7_eng_dress_1_7 = "• Costume Designer: You can use your creativity in clothing by designing costumes for theater, film, or TV productions.";


//otomotiv
var kariyer_secim_12_25_s7_eng_auto_1_1 = "Automotive Industry";
var kariyer_secim_12_25_s7_eng_auto_1_2 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_auto_1_3 = "• Automotive Designer: Add aesthetic value to the automotive world by designing exterior or interior layouts of vehicles. ";
var kariyer_secim_12_25_s7_eng_auto_1_4 = "• Industrial Designer: Develop designs that ensure vehicles are user-friendly and aesthetically pleasing.";
var kariyer_secim_12_25_s7_eng_auto_1_5 = "• Graphic Designer: Create graphics such as advertisements, logos, or product promotions for automotive brands.";
var kariyer_secim_12_25_s7_eng_auto_1_6 = "• Color and Material Designer: Contribute to the aesthetic appeal of vehicles by selecting color palettes and materials.";
var kariyer_secim_12_25_s7_eng_auto_1_7 = "• Visual Presentation Specialist: Prepare visual presentations and concept designs for car shows, advertising campaigns, and launches.";


//mutfak sanatları
var kariyer_secim_12_25_s7_eng_meal_1_1 = "Culinary Arts";
var kariyer_secim_12_25_s7_eng_meal_1_2 = "Creative and Artistic Careers";
var kariyer_secim_12_25_s7_eng_meal_1_3 = "• Chef: You can design menus, prepare creative dishes, and perform culinary arts at a high level in restaurants or hotels.";
var kariyer_secim_12_25_s7_eng_meal_1_4 = "• Pastry Chef: By preparing special cakes, desserts, and sweets, you can bring creative touches to the world of desserts.";
var kariyer_secim_12_25_s7_eng_meal_1_5 = "• Food Designer: You can design the visual presentation of dishes, prepare elegant and aesthetic plates, and enhance the visual appeal of the food.";
var kariyer_secim_12_25_s7_eng_meal_1_6 = "• Food Photographer: Capture impressive photos of food and create visual content for promoting dishes";
var kariyer_secim_12_25_s7_eng_meal_1_7 = "• Food Stylist: Professionally arrange the presentation and plate layout of dishes for photo shoots and food presentations.";






//Güçlü Yanların + 25
var guclu_yanlarin_57_10_1 = "Mükemmelleştirilmiş Form” Gücü (57-10)";
var guclu_yanlarin_57_10_2 = "Hızlı düşünme yeteneğin dinamik iş ortamlarında çok değerli. Yaratıcılığın ile hayatta kalmayı garanti eden ve gelecekteki belirsizliklerden koruma sağlayan ortamlar yaratma ve tasarlama kabiliyetin var.\nFormu Mükemmelleştirmek Kendini, sanatı, müziği, yazıyı, iç tasarımı, yiyeceği, bahçeciliği, mimariyi – kendi ve başkalarının davranışlarını içeren her şeyi mükemmelleştirmeyi seversin. Bu detaylara gösterdiğin özen ve mükemmellik arzusu, herhangi bir profesyonel alanda yüksek kaliteli çıktılar üretmene yardımcı olur.\n\nKendin Olmak Sadece kendin olarak yaşayarak sağlıklı ve güzel bir şey yaratırsın. Bu otantiklik başkalarına ilham verebilir ve olumlu ve üretken bir çalışma ortamı yaratabilir. Rolün, kendin ve hayatın da dahil olmak üzere, sevdiğin şeyi yaratmak ve yarattığın şeyi sevmektir.\n\nİş Dünyasında Gücünü Kullanmak Yaratıcılık ve tasarım gerektiren rollerde, detaylara gösterdiğin özen ve sezgisel yaklaşım, yenilikçi ve estetik açıdan hoş sonuçlara doğurur. Liderlikte, işinin her yönünü kucaklama ve mükemmelleştirme yeteneğin, ekibini mükemmellik için çabalamaya teşvik edebilir.\n\nMükemmelleştirilmiş form gücün, iş dünyasında sezgi, yaratıcılık ve mükemmelik arzusu açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak yaratıcı olabilir, üretkenliği artırabilir, olumlu bir çalışma ortamı yaratabilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin. Bu gücü benimsemen ve geliştirmen, anlamlı ve etkili bir kariyere vesile olabilir.";

var guclu_yanlarin_20_10_1 = "Yüksek İlkeler” Gücü (10-20)";
var guclu_yanlarin_20_10_2 = "Yüksek ilkeli davranışların savunucusu olmak için buradasın ve bu davranışlar tanındığında ve davet edildiğinde, etrafındaki insanlara yüksek gerçeklerine başarılı bir şekilde uyum sağlamaları için rehberlik edebilirsin.\n\nLiderliğin Sesis: Sadece kendin olarak başkalarına ilham verebilirsin. Herkesin kendisi olmasını savunabilir, organizasyonunda otantiklik ve bireysel ilkeler kültürünü teşvik edebilirsin.\n\nTercih Edilen Ortam Kendi gerçeğine duyarlı ve bireysel ilkelere bağlı olanlarla birlikte olmayı tercih edersin. Bu ortam, senin gelişmeni sağlar ve başkalarını bütünlüklerini ve benzersiz bakış açılarını korumaya teşvik eder.\n\nİş Dünyasında Gücünü Kullanmak Liderlik ve savunuculuk rollerinde, bütünlüğün ve ilkelere olan bağlılığın ile, etik kararlar almayı sağlayabilir ve başkalarına ilham verebilirsin. Ekip ortamlarında, otantikliğin güven ve iş birliği sağlar, daha uyumlu ve motive bir ekip oluşmasına yardımcı olur.\n\nYüksek ilkeler gücün, iş dünyasında otantiklik ve bütünlük açısından benzersiz bir karışım sunan güçlü bir liderlik özelliğidir. Bu gücü kullanarak, başkalarına ilham verebilir, etik uygulamaları teşvik edebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin. Bu gücü benimsemek ve geliştirmek, anlamlı ve etkili bir kariyere yol açabilir.";

var guclu_yanlarin_6_59_1 = "“Etkileşim” Gücü (6-59)";
var guclu_yanlarin_6_59_2 = "Başkalarının savunmalarını kolayca aşma kapasitesine sahipsin, bu da son derece destekleyici ve üretken hale gelebilecek derin, anlamlı bağlar kurmana olanak tanır. Başkalarıyla hızlı ve kolay bir şekilde iletişim kurabilirsin, bu da seni mükemmel bir iletişimci ve ağ kurucu yapar. Bu beceri, sosyal ve profesyonel ortamlarda kolayca gezinmeni sağlar, geniş bir iletişim ağı ve çevre oluşturmanı mümkün kılar. Bu derin seviyede bağlantı kurma yeteneği, ekip çalışmasında, müşteri ilişkilerinde ve liderlik rollerinde çok değerlidir. Hızla güven inşa ederek, başarıyı artıran güçlü, işbirlikçi ilişkiler geliştirebilirsin.\n\nYaratıcılığı Kolaylaştırmak Bir rahatlık ve konfor hissi yaratarak, herhangi bir yaratıcı girişimde verimlilik sağlarsın. Kapsayıcı ve davetkar bir atmosfer yaratma yeteneğin, yaratıcı düşünmeyi ve işbirliğini teşvik eder. Bu da seni beyin fırtınası oturumlarında, proje ekiplerinde ve inovasyonun önemli olduğu her ortamda değerli bir varlık haline getirir.\n\nİş Dünyasında Gücünü Kullanmak Etkileşim gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Ekip liderliğinde, derin bağlantılar kurma yeteneğin, uyumlu ve motive bir ekip oluşturur. Müşteri ilişkilerinde, hızla güven ve ilişki kurma becerin, müşteri memnuniyetini ve sadakatini artırır. Ayrıca, yaratıcı rollerde, rahat ve kapsayıcı bir ortam yaratma yeteneğin, yenilikçilik ve işbirliğini teşvik eder.\n\nEtkileşim gücün, iş dünyasında empati, bağlantı ve sezgisel karar verme açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, güçlü, destekleyici ilişkiler kurabilir, yaratıcılığı teşvik edebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin. Büyük organizasyonlarda yönetici pozisyonlarına davet edilebilirsin. Bu gücü benimsemek ve geliştirmek, anlamlı ve etkili bir kariyere ve profesyonel ortamda önemli bir fark yaratmaya yol açabilir.";

var guclu_yanlarin_63_4_1 = "“Mantıksal Süreç” Gücü (63-4)";
var guclu_yanlarin_63_4_2 = "Bu beceri, stratejik planlama ve karar alma süreçlerinde çok değerlidir, potansiyel sonuçları öngörmene ve organizasyonunu başarıya yönlendirecek seçimler yapmana olanak tanır.\n\nŞüpheyi Kucaklamak Şüphe, mantıksal sürecin vazgeçilmez bir parçasıdır çünkü mantık kusursuz bir şekilde formüle edilebilir ve yine de yanlış olabilir. Şüpheyi kucaklamak, düşünceni sürekli olarak rafine etmeni ve rahatlığa kapılmamanı sağlar. Bu eleştirel yaklaşım, analizlerinde ve kararlarında titiz ve dikkatli olmanı, sürekli olarak doğrulama ve iyileştirme arayışında olmanı sağlar.\n\nAktif Zihin Çok aktif bir zihne sahipsin ve sürekli olarak kalıpları süzerek tutarlı olup olmadıklarını kontrol ediyorsun. Bu dikkat, tutarsızlıkları ve potansiyel sorunları erken tespit etmene yardımcı olur, böylece proaktif bir şekilde sorun çözebilirsin. Hızlı bir şekilde tutarsızlıkları tespit etme yeteneğin ile kalite kontrol, risk yönetimi ve operasyonel verimlilikte önemli rol oynayabilirsin.\n\nBaskı ve Sorular Bir kalıp tutarsız hale geldiğinde, baskı yoğunlaşır ve nihayetinde bir soru haline gelir, bu da bir cevap gerektirir. Bu tutarsızlıkları çözme dürtüsü, doğruluk ve güvenilirlik arayışında hiçbir taşı çevirmeden bırakmamanı sağlar. Bu amansız cevap arayışı, seni analist, denetçi veya araştırmacı olarak mükemmel kılar, bu rollerde hassasiyet ve titizlik çok önemlidir.\n\nİş Dünyasında Gücünü Kullanmak Mantıksal süreç gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Stratejik planlamada, eğitimli tahminler yapma yeteneğin, gerçekçi hedefler belirlemeye ve pazar trendlerini öngörmeye yardımcı olur. Veri analizinde, kalıpları ve tutarsızlıkları tanıma becerin, doğru ve uygulanabilir içgörüler sağlar. Ayrıca, kalite güvence ve risk yönetiminde, titiz yaklaşımın yüksek standartları sağlar ve potansiyel riskleri azaltır.\n\nMantıksal süreç gücün, iş dünyasında analitik titizlik, eleştirel düşünme ve tahmin edici doğruluk açısından benzersiz bir karışım sunan güçlü bir özelliktir. Mantıksal yeteneklerini dış zorluklar ve fırsatlara odaklayarak, organizasyonel başarıyı sağlayacak paha biçilmez içgörüler ve çözümler sunabilirsin, bilinçli karar alma süreçlerini yönlendirebilir, operasyonel mükemmeliyet sağlayabilir ve organizasyonunun stratejik başarısına katkıda bulunabilirsin.";

var guclu_yanlarin_45_21_1 = "“Liderlik” Gücü (45-21) ";
var guclu_yanlarin_45_21_2 = "Çevrendekileri güvenle geleceğe yönlendirebilirsin. Liderlik tarzın mantıklıdır, test edilmiş ve kesinlikle takip edilebilecek yerleşik kalıplara dayanır. İş ortamında, bu mantıksal liderlik tarzı, ekibinde güven ve güvence uyandıran net, uygulanabilir planlar oluşturmanı sağlar.\n\nGüveni Kazanmak Etkili bir şekilde liderlik yapmak için önce güven kazanmalısın. Güven, liderliğinin temelidir ve güçlü, uyumlu ekipler oluşturmanı sağlar. Dürüstlük, yetkinlik ve ekibinin ihtiyaçlarını ve isteklerini gerçek anlamda anladığını göstererek, kendini güvenilir bir lider olarak kabul ettirirsin.\n\nKalıpları ve Trendleri Tanımak Mevcut kalıpları kavrayan, trendleri anlayan ve insanların ihtiyaçlarıyla uyumlu biri olarak tanınmalısın. Bu yetenek, değişiklikleri öngörmene ve ekibini gelecekteki zorluklara hazırlamanı sağlar. Kalıplar ve trendler konusundaki keskin içgörün, liderliğinin hem proaktif hem de uyumlu olmasını sağlar.\n\nEtkileyici Ses Sesin etki yaratır, ve liderlik yapman için çoğunluk tarafından davet edilmelisin. Ekip arkadaşların tarafından lider olarak seçilmek, yeteneklerine duyulan güveni ve inancı gösterir.\n\nTahtın Arkasında Liderlik Ayrıca “tahtın arkasında” etki ile liderlik yapma yeteneğine sahipsin. Bu ince liderlik biçimi, her zaman ön planda olmadan rehberlik etmeni ve ilham vermeni sağlar. Karar vericileri etkileyerek ve stratejileri perde arkasından şekillendirerek, önemli değişiklikler ve ilerlemeler sağlayabilirsin.\n\nİleriye Giden Yolu Gösterme Sen ileriye giden yolu göstermek için buradasın. Bir lider olarak rolün, vizyon ve yön sağlamak, başkalarının harekete geçmesini sağlamaktır. Bu yaklaşım, etkinliğini maksimize ederken, ekip üyelerinde sahiplenme ve sorumluluk duygusunu da artırır.\n\nİş Dünyasında Gücünü Kullanmak Liderlik gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Üst düzey yönetim rollerinde, mantıklı ve güvenilir yaklaşımın, organizasyonunu uzun vadeli başarıya yönlendirebilirsin. Proje yönetiminde, kalıpları ve trendleri tanıma yeteneğin, projelerin gelecekteki taleplerle uyumlu olmasını sağlar. Ayrıca, danışmanlık rollerinde, perde arkasındaki etkileyici gücün, stratejik kararları yönlendirebilir ve sürekli iyileşme kültürünü teşvik edebilir.\n\nLiderlik gücün, iş dünyasında mantıksal düşünme, güvenilirlik ve etkileyici rehberlik açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, organizasyonunu güvenle geleceğe yönlendirebilir, ekibini ilham verebilir ve sürdürülebilir başarı sağlayabilirsin.";

var guclu_yanlarin_3_60_1 = "“Yenilik” Gücü (3-60) ";
var guclu_yanlarin_3_60_2 = "Kendini ve çevrendekileri değişim ve yenilik potansiyeli ile güçlendirirsin. Bu seviyede bir değişimi kucaklamak için körü körüne bir inanç gereklidir, çünkü bu ani bir şekilde gerçekleşebilir ve bir kuantum sıçraması gibi hissedilebilir. \"Senin için değişim olması gerektiğinde olur.\"\n\nKaostan Düzene Geçiş Yeniliğin doğasında bulunan kaostan düzene geçişi kucaklarsın. Bu dönüşüm süreci sabır ve olayların zamanlamasına güven gerektirir. Geçişi yönetme ve kolaylaştırma yeteneğin, yenilikçi projeleri ve girişimleri sürdürmek için çok önemlidir.\n\nYaratıcı ve Melankolik Süreç Yaratıcılığının ortaya çıkması için değişken bir ruh hali ile melankolik bir süreçten geçebilirsin. Zamanlaman içsel bir yanıtla sana gelir ve bu seni gerçekten tatmin edici olana yönlendirir. İçgüdülerine ve içsel saatine güvenmek, doğal yeteneklerin ve enerji seviyelerinle uyum içinde kararlar almanı sağlar.\n\nİş Dünyasında Gücünü Kullanmak Yenilik gücün, iş dünyasının çeşitli alanlarında kullanılabilir. Ürün geliştirmede, önemli değişiklikler yapma yeteneğin çığır açan yeniliklere yol açabilir. Proje yönetiminde, kaostan düzene geçişteki becerin, projelerin verimli ve yaratıcı bir şekilde tamamlanmasını sağlar. Büyük organizasyonlarda yeniliğe liderlik etmek için yönetici pozisyonlarına çağrılabilirsin. Pproblem çözme ve stratejik düşünme gerektiren rollerde, yenilikçi yaklaşımın, organizasyonu yeni ve başarılı yönlere doğru yönlendirebilir.\n\nSonuç Yenilik gücün, iş dünyasında yaratıcılık, dayanıklılık ve dönüştürücü potansiyel açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, önemli değişiklikler yapabilir, yaratıcı ortamlar oluşturabilir ve organizasyonunu yeni ve yenilikçi yönlere yönlendirebilirsin. ";

var guclu_yanlarin_5_15_1 = "“Kalıplar ve Ritim” Gücü (5-15) ";
var guclu_yanlarin_5_15_2 = "Bu güç, akışın ve ritminle uyum sağladığında, yaptığın her şeyin zahmetsiz ve doğal hissettirmesini sağlar. Bu uyum hali, işinde en iyi performansı göstermene, üretkenliğini ve yaratıcılığını artırmana olanak tanır. Doğal ritimlerini kucaklaman, iş tatminine ve etkinliğini sağlar.\n\nRutinlere Bağlı Kalmak Sana hizmet eden kalıplara veya rutinlere bağlı kalma yeteneğine sahipsin. Bu rutinler, yapı ve istikrar sağlar, görevlerini kolaylıkla ve tutarlılıkla yürütmene olanak tanır. Profesyonel bir ortamda, bu yetenek, verimliliği artıran ve stresi azaltan güvenilir süreçler ve iş akışları oluşturmanı sağlar.\n\nÇeşitliliği Kucaklamak Ayrıca çevrendekilerin sabit olandan aşırıya kadar çeşitlilik gösteren rutinlerini tanımlama ve kucaklama yeteneğine sahipsin. Bu anlayış, çevrendekiler ile etkili bir şekilde çalışmana, onların benzersizliklerini ve ritimlerini takdir etmene olanak tanır. Bu farklılıkları tanıyarak ve bunlara uyum sağlayarak, daha uyumlu ve işbirlikçi bir çalışma ortamı oluşturabilirsin.\n\nKişisel Zamanlama ve Akış Kişisel iç ritmin tarafından tamamen belirlenen kendi zamanlama ve akış anlayışına sahipsin. Hiçbir şeyin veya hiç kimsenin akışına müdahale etmesine izin vermemeye dikkat et. Ritmini korumak, üretkenliğini ve esenliğini sürdürmek için çok önemlidir. Doğal kalıplarına saygı gösteren destekleyici bir ortam yaratmak ve sınırlar koymak, en optimal performansta kalmana yardımcı olabilir.\n\nBaşkalarına Fayda Sağlamak Çevrendekilere doğru ritim ve zamanlamaya uyum sağlamalarında yardım ederek, onları da dolaylı olarak faydalandırabilirsin. Başkalarının ritimlerini tanımlama ve onlarla uyum sağlama yeteneğin, daha uyumlu ve üretken bir ekip dinamiği yaratabilir. Herkes için daha etkili ve tatmin edici bir çalışma ortamı oluşturabilirsin.\n\nİş Dünyasında Gücünü Kullanmak Kalıplar ve ritim gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Proje yönetiminde, etkili rutinler oluşturma ve sürdürme yeteneğin, zamanında ve tutarlı ilerleme sağlar. Ekip liderliğinde, çeşitliliği anlama yeteneğin, çok değişik yelpazede kişileri yönetmene ve motive etmene yardımcı olabilir. Ayrıca, yaratıcı problem çözme gerektiren rollerde, doğal akışın yenilikçi ve verimli çözümler üretmene yol açabilir.\n\nKalıplar ve ritim gücün, iş dünyasında uyum, yapı ve uyarlanabilirlik açısından benzersiz bir karışım sunan güçlü bir özelliktir.Bu gücü kullanarak, üretkenliği artırabilir, işbirliğini teşvik edebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_64_47_1 = "“Deneyimsel Süreç” Gücü (64-47) ";
var guclu_yanlarin_64_47_2 = "Doğrudan deneyim yoluyla öğrenme ve içgörüler kazanma yeteneğine sahipsin. Bu pratik yaklaşım, karmaşık durumları derinlemesine ve pratik bir şekilde anlamanı sağlar. İş dünyasında bu güç, sahada problem çözme ve uyum sağlama gerektiren rollerde çok değerlidir.\n\nPaternleri ve Süreçleri Anlamak Deneyimleyip bu deneyimleri yansıtarak paternleri ve süreçleri etkili bir şekilde anlama yeteneğine sahipsin. Bu içgörü, bilinçli kararlar almanı ve geri bildirimlere dayalı sistemleri iyileştirmeni sağlar. Deneyimsel öğrenme yaklaşımın, çözümlerin gerçeklik ve pratiklikle temellendirilmesini sağlar.\n\nUyum Sağlama ve Dayanıklılık Deneyimsel öğrenme, uyum sağlama ve dayanıklılık geliştirir. Zorluklarla doğrudan etkileşimde bulunarak, değişen koşullara uyum sağlama ve yanıt verme esnekliğini geliştirirsin. Bu uyum sağlama yeteneği, koşulların hızla değişebileceği dinamik iş ortamlarında çok önemlidir.\n\nİçgörüleri Etkili Bir Şekilde Anlatmak İçgörülerini ve deneyimlerini başkalarına etkili bir şekilde aktarma yeteneğine sahipsin, karmaşık kavramları pratik örneklerle anlamalarına yardımcı olursun. Bu beceri, özellikle eğitim ve mentorluk rollerinde faydalıdır, çünkü pratik bilgi aktarmak, öğrenme ve gelişimi önemli ölçüde artırabilir.\n\nİş Dünyasında Gücünü Kullanmak Deneyimsel süreç gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Proje yönetiminde, deneyimlerden öğrenme ve uyum sağlama yeteneğin, projelerin tahmin edilemeyen koşullarda bile etkili bir şekilde yönetilmesini sağlar. Operasyonlarda, pratik yaklaşımın, verimliliği artırır ve sorun çözme yeteneklerini geliştirir. Ayrıca, eğitim ve gelişim gerektiren rollerde, deneyimsel içgörüler, öğrenme deneyimini önemli ölçüde artırabilir.\n\nDeneyimsel süreç gücün, iş dünyasında pratik anlayış, uyum sağlama ve etkili iletişim açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, sürekli iyileştirmeyi sürükleyebilir, dayanıklılığı artırabilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.  ";

var guclu_yanlarin_27_50_1 = "“Koruyuculuk” Gücü (Quantum 27-50) ";
var guclu_yanlarin_27_50_2 = "Kaynakları, ortamları ve toplulukları koruma ve sürdürme gücün var.\n\nBesleme ve Sürdürme Kaynakları, ister insanlar, projeler, ister fiziksel varlıklar olsun, doğal olarak besleyip sürdürme yeteneğine sahipsin. Bu rol gözetimin altındaki her şeyin gelişmesini ve değerini korumasını sağlar. İş dünyasında, bu güç uzun vadeli planlama ve bakım gerektiren rollerde çok değerlidir.\n\nSorumluluk ve Yöneticilik Sorumluluk ve yöneticilik anlayışın, kaynakları etkili bir şekilde koruma ve yönetme konusunda seni yönlendirir. Kaynakların akıllıca kullanılmasını ve gelecekteki kullanım için korunmasını sağlama konusunda kararlılık sergileyebilirsin. Bu da seni sürdürülebilirlik, çevre yönetimi ve kaynak tahsisi içeren rollere mükemmel bir aday yapar.\n\nTopluluk Oluşturma Güçlü ve destekleyici topluluklar oluşturma yeteneğine sahipsin. İnsanların değerli hissettiği ortamlar yaratarak, ekip uyumunu ve üretkenliğini artırabilirsin. Bu beceri, pozitif bir organizasyon kültürü oluşturmanın önemli olduğu liderlik rollerinde özellikle faydalıdır.\n\nDeğeri Koruma ve Artırma Koruyuculuk rolün, kaynakların değerinin korunmasını ve zamanla artırılmasını sağlar. Kaynakları iyileştirme ve optimize etme yollarını belirleme konusunda yeteneklisin ve bu, kaynakların uzun vadede fayda sağlamaya devam etmesini sağlar. Bu, varlık yönetimi ve optimizasyon gerektiren rollerde seni değerli bir varlık yapar.\n\nİş Dünyasında Gücünü Kullanmak Koruyuculuk gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Büyük organizasyonlarda yönetici rollerine davet edilebilirsin. Tesis yönetiminde, fiziksel varlıkları koruma ve geliştirme yeteneğin, uzun vadeli operasyonel verimliliği sağlayabilir. İnsan kaynaklarında, besleyici yaklaşımın, çalışanların refahını ve bağlılığını artırabilir. Ayrıca, sürdürülebilirlik rollerinde, sorumlu yöneticilik anlayışın, çevresel etkiyi azaltma ve sürdürülebilirliği teşvik etme çabalarını yönlendirebilir.\n\nKoruyuculuk gücün, iş dünyasında sorumlu yönetim ve uzun vadeli sürdürülebilirlik sunan güçlü bir özelliktir. Bu gücü kullanarak kaynakların refahını ve uzun ömürlülüğünü sağlayabilir, güçlü topluluklar oluşturabilir ve organizasyonunu sürdürülebilir başarıya yönlendirebilirsin. Bu gücü benimsemek ve geliştirmek, anlamlı ve etkili bir kariyere ve profesyonel ortamda önemli bir fark yaratmaya yol açabilir. ";

var guclu_yanlarin_26_44_1 = "“Satış ve Pazarlama” Gücü (Quantum 26-44) ";
var guclu_yanlarin_26_44_2 = "Hayati bilgileri net ve etkili bir şekilde aktarma yeteneğine sahipsin. Bu beceri, sürekli etkileşim ve bilgi alışverişi gerektiren satış, pazarlama ve müşteri ilişkileri gibi rollerde çok önemlidir. Mesajları doğru bir şekilde iletme yeteneğin, herkesin aynı fikirde olmasını sağlar ve yanlış anlamaların en aza indirilmesini sağlar.\n\nDuygusal Bağlantı Gücün, başkalarıyla duygusal olarak bağ kurmanı sağlar, bu da iletişimini daha etkili kılar. Duyguları etkili bir şekilde anlamak ve ifade etmek, güçlü ilişkiler kurmanı ve güven oluşturmanı sağlar. Bu, duygusal zekanın önemli olduğu liderlik ve ekip oluşturma rollerinde özellikle değerlidir.\n\nEnerji ve Motivasyon Çevrendekilere enerji ve motivasyon verme yeteneğine sahipsin. Coşkun ve tutkun, ekibini hedeflerine doğru yönlendirebilir. Başkalarını motive etme yeteneğin, liderlik ve ekip yönetimi gerektiren rollerde çok önemlidir.\n\nEtkileme ve İkna Etme İletişim becerilerin, başkalarını etkileme ve ikna etme gücünü sana verir. Yeni bir fikir sunarken, bir anlaşma müzakere ederken veya bir ekibi yönetirken, ikna kabiliyetin, olumlu sonuçlar elde etmene yardımcı olabilir. Bu, müzakere, satış ve liderlik içeren rollerde seni değerli bir varlık yapar.\n\nİş Dünyasında Gücünü Kullanmak Satış ve Pazarlama gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Satış ve pazarlamada, etkili ve ikna edici iletişim yeteneğin, müşteri etkileşimini ve satış büyümesini artırabilir. Liderlik rollerinde, enerji ve motivasyon iletme kapasiten, ekibini ilham verip olumlu bir çalışma ortamı oluşturabilir. Ayrıca, müşteri ilişkilerinde, duygusal bağlantılar kurma becerin, müşteri memnuniyetini ve sadakatini artırabilir.\n\nSatış ve pazarlama gücün iş dünyasında etkili iletişim, duygusal zeka ve motivasyonel yetenek açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, etkileşimi artırabilir, güçlü ilişkiler kurabilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_32_54_1 = "“Tutku” Gücü (Quantum 32-54) ";
var guclu_yanlarin_32_54_2 = "Hedeflerine ve arzularına ulaşmak için bitmeyen bir azime sahipsin. Bu kararlılık, engeller ve zorluklarla karşılaştığında seni ileriye taşır. İş dünyasında bu güç, girişimcilik, satış ve liderlik gibi azim, dayanıklılık ve güçlü bir iş etiği gerektiren rollerde çok değerlidir.\n\nHedef Odaklı Tutkun, hedefler belirleme ve bu hedeflere ulaşma konusunda güçlü bir odaklanma ile karakterizedir. Ne başarmak istediğin konusunda net bir vizyona sahipsin ve bunu gerçekleştirmek için gerekli çabayı göstermeye hazırsın. Bu hedef odaklı yaklaşım hedeflerine doğru ilerlemeye devam etmeni sağlar.\n\nYüksek Standartlar Kendine yüksek standartlar koyar ve yaptığın her şeyde mükemmellik için çaba gösterirsin. Bu kalite ve gelişim taahhüdü, becerilerini sürekli olarak geliştirmeni ve olağanüstü sonuçlar elde etmeni sağlar. Profesyonel ortamlarda, yüksek standartların başkalarını da mükemmellik için çaba göstermeye teşvik eder.\n\nBaşkalarını Motive Etme Hırslı doğan, çevrendekileri de motive edebilir ve ilham verebilir. Yoğun çalışma ve özveri örneği göstererek ekip üyelerini sınırlarını zorlamaya ve başarıya ulaşmaya teşvik edersin. Bu, liderlik rollerinde, tutku kültürü oluşturarak önemli organizasyonel başarılar elde etmeyi sağlayan bir yetenek olarak özellikle değerlidir.\n\nİş Dünyasında Gücünü Kullanmak Tutku gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Girişimcilikte, bitmeyen azmin ve hedef odaklı yaklaşımın, fikirleri başarılı girişimlere dönüştürmene yardımcı olabilir. Satışta, ısrarcılığın ve yüksek standartların, olağanüstü performans ve müşteri memnuniyeti sağlayabilir. Ayrıca, liderlik rollerinde, ekibini motive etme ve ilham verme yeteneğin, genel organizasyonel başarıyı artırabilir.\n\nTutku gücün, iş dünyasında güçlü bir varlıktır ve kararlılık, yüksek standartlar ve motivasyon yeteneğinin benzersiz bir karışımını sağlar. Bu güçten yararlanarak hedeflerine ulaşabilir, çevrendekilere ilham verebilir ve organizasyonunu daha büyük başarılara yönlendirebilirsin.  ";

var guclu_yanlarin_19_49_1 = "“Kaynaklar” Gücü (Quantum 19-49)  ";
var guclu_yanlarin_19_49_2 = "Kaynakları verimli bir şekilde yönetme ve tahsis etme konusunda doğal bir yeteneğe sahipsin. Bu beceri, kaynakların optimal kullanıldığını ve organizasyon içindeki tüm ihtiyaçların karşılanmasını sağlar. İş dünyasında bu güç, kaynak planlaması, bütçeleme ve lojistik gerektiren rollerde çok değerlidir.\n\nEtkili Kaynak Yönetimi Kaynak yönetimindeki gücün, operasyonların sorunsuz ve verimli bir şekilde yürütülmesini sağlar. Kaynakları etkili bir şekilde dağıtarak, israfı minimize eder ve üretkenliği maksimize edersin. Bu verimlilik odaklı yaklaşım, süreçleri hızlandırmanın ve genel performansı artırmanın amaçlandığı operasyonel rollerde çok önemlidir.\n\nİhtiyaçları Karşılamak Farklı paydaşların çeşitli ihtiyaçlarını dengeleme ve karşılama konusunda içgüdüsel bir anlayışa sahipsin. Bu yetenek, kaynak tahsisini organizasyonun hedeflerini desteklerken bireysel gereksinimleri karşılayacak şekilde önceliklendirmeni sağlar. Müşteri hizmetleri ve proje yönetiminde bu beceri, memnuniyeti sürdürmek ve başarılı sonuçlar elde etmek için esastır.\n\nUyum Sağlama Kaynak yönetimindeki esnekliğin, değişen koşullara uyum sağlamanı sağlar. Yeni durumları hızla değerlendirebilir ve ortaya çıkan zorluklara yanıt olarak kaynakları yeniden tahsis edebilirsin. Bu uyum yeteneği, esneklik ve hızlı düşünmenin gerektiği dinamik ortamlarda özellikle değerlidir.\n\nİş Dünyasında Gücünü Kullanmak Kaynaklar gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Operasyonlarda, kaynakları verimli bir şekilde yönetme yeteneğin, üretkenliği artırabilir ve maliyetleri azaltabilir. Finans alanında, bütçeleme ve kaynak tahsisi konusundaki becerilerin, fonların iş hedeflerini desteklemek için etkili bir şekilde kullanılmasını sağlar. Ayrıca, proje yönetiminde, kaynak ihtiyaçları ve öncelikleri anlama yeteneğin, projelerin başarılı bir şekilde tamamlanmasını sağlar.\n\nKaynaklar gücün iş dünyasında verimlilik, uyum sağlama ve etkili yönetim açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, kaynakların optimal kullanıldığını, operasyonların sorunsuz yürüdüğünü ve organizasyonel hedeflerin karşılandığını sağlayabilirsin.";

var guclu_yanlarin_37_40_1 = "“Topluluk” Gücü (Quantum 37-40)";
var guclu_yanlarin_37_40_2 = "Güçlü ve destekleyici ağlar kurma ve besleme konusunda doğal bir yeteneğe sahipsin. Bu beceri, ekip çalışması, işbirliği ve ilişki yönetimi gerektiren rollerde çok değerlidir. Bir topluluk duygusu oluşturarak, insanların değerli ve bağlantılı hissettikleri ortamlar yaratırsın.\n\nGüçlü Ağlar Kurma Topluluk oluşturma konusundaki gücün, ekip üyeleri arasında işbirliğini artırır. Aidiyet ve karşılıklı saygı duygusu yaratarak, etkili ekip çalışmasını kolaylaştırır ve üretkenliği artırırsın. Bu yetenek, ekip uyumunun başarı için gerekli olduğu liderlik ve proje yönetimi rollerinde çok önemlidir.\n\nDestekleyici Ortam Bireylerin gelişebileceği destekleyici ortamlar yaratmada mükemmelsin. Başkalarının ihtiyaçlarını anlayarak ve karşılayarak, herkesin başarılı olmak için ihtiyaç duyduğu kaynaklara ve desteğe sahip olmasını sağlarsın. Bu besleyici yaklaşım, özellikle insan kaynakları ve mentorluk rollerinde çok değerlidir.\n\nSadakati Teşvik Etme Güçlü topluluklar oluşturma yeteneğin, ekip üyeleri ve paydaşlar arasında sadakat ve bağlılık geliştirir. Pozitif ve kapsayıcı bir kültür yaratarak, uzun vadeli katılımı ve bağlılığı teşvik edersin. Bu, yüksek düzeyde çalışan memnuniyeti ve bağlılığı sürdürmenin gerektiği rollerde çok önemlidir.\n\nİş Dünyasında Gücünü Kullanmak Topluluk gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Ekip yönetiminde, destekleyici ağlar oluşturma yeteneğin, işbirliğini ve üretkenliği artırabilir. İnsan kaynaklarında, destekleyici ortamlar yaratma odaklı yaklaşımın, çalışan refahını ve bağlılığını artırabilir. Ayrıca, müşteri ilişkilerinde, güçlü ilişkiler kurma becerin, müşteri sadakatini ve memnuniyetini artırabilir.\n\nTopluluk gücün, iş dünyasında ilişki kurma, işbirliği ve destek açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, bireylerin ve ekiplerin gelişebileceği ortamlar yaratabilir, üretkenliği artırabilir ve sadakati teşvik edebilirsin.";

var guclu_yanlarin_34_57_1 = "“Kuvvet” Gücü (Quantum 34-57)";
var guclu_yanlarin_34_57_2 = "Zorluklara hızla ve kararlılıkla yanıt verme konusunda doğal bir yeteneğe sahipsin, bu da yüksek baskı altındaki iş ortamlarında hayati bir beceri sağlar. Sezgilerin ve beden bilincin, ekipleri yönetmen ve projeleri ilerletmen için net ve hızlı kararlar almana yardımcı olur.\n\nOperasyonel Verimlilik, İşlerin sorunsuz yürümesini sağlama konusunda doğal bir eğilimin var ve bu özellik operasyon yönetiminde değerli olabilir. Sorunları hızla tespit edip hemen harekete geçerek bunları çözebilir, böylece süreçlerin ve sistemlerin optimize edilmesini ve operasyonel gecikmelerin en aza indirilmesini sağlayabilirsin.\n\nKriz Yönetimi, Yüksek farkındalık seviyen, kriz durumlarında soğukkanlı kalmanı ve harekete geçmeni sağlayabilir. Bu özellik, risk yönetimi gibi, öngörülemeyen durumlara hızlı yanıtların gerekli olduğu roller için seni güçlü bir aday yapar.\n\nProje Liderliği, Proje yönetimi rollerinde projelerin verimli bir şekilde ilerlemesini sağlayabilirsin. Dikkat dağıtan unsurları ortadan kaldırabilir, zor kararlar alabilir ve ekibini hedefe odaklı tutabilirsin. Bu da bitirme tarihlerine uyulmasını ve sonuçların etkili bir şekilde teslim edilmesini sağlar.\n\nİş Dünyasında Gücünü Kullanmak, Hızlı hareket etme yeteneğin, hızlı ilerleyen sektörlerde veya hızlı ve net yanıtların hayati olduğu ortamlarda önemli bir varlık sağlar. Sezgisel netliğine ve hızlı hareket etme yeteneğine güvenerek, büyük projeleri tamamlayabilir, ekipleri başarıya yönlendirebilir ve organizasyonu rekabet karşısında çevik tutabilirsin.\n\nKuvvet gücün, iş dünyasında güçlü bir özelliktir. Her ana tepki verebilme yeteneğin, başkalarını güven ve amaçla hareket etmeye ilham veren bir rol modeli olmanı sağlar. Sonuç olarak, etrafındaki insanları daha verimli, odaklı ve hedef odaklı olmaya motive edebilir, ekibinde veya organizasyonunda olumlu bir etki yaratabilirsin.";

var guclu_yanlarin_20_34_1 = "“Karizma” Gücü (Quantum 34-20)";
var guclu_yanlarin_20_34_2 = "Manyetik varlığınla çevrendekileri etkileyip kendine çekme konusunda doğal bir yeteneğe sahipsin. Bu karizma, güçlü ilişkiler kurmayı ve fikirlerin için destek kazanmayı kolaylaştırır. İş dünyasında, bu güç, ikna, ağ kurma ve liderlik gerektiren rollerde çok değerlidir.\n\nEtkileme ve İkna Karizmatik doğan, başkalarını etkili bir şekilde etkileme ve ikna etme yeteneği sağlar. Bir şeyi yapmaya karar verdiğinde ve yaptığın şeyi sevdiğinde, çevrendekiler bundan etkilenir. Bir ekibi yönetirken, bir anlaşma müzakere ederken veya yeni bir fikir sunarken, insanlarla bağlantı kurma ve güvenlerini kazanma yeteneğin kritik önemdedir. Bu, satış, pazarlama ve üst düzey liderlik rolleri için seni değerli bir varlık yapar.\n\nGüçlü İlişkiler Kurma Karizma, müşteriler ve paydaşlarla güçlü, kalıcı ilişkiler kurmana yardımcı olur. Başkalarını değerli ve anlaşılmış hissettirerek, işbirliğini ve sadakati teşvik eden pozitif ve kapsayıcı bir ortam yaratırsın. Bu ilişki kurma becerisi, müşteri ilişkileri ve ekip yönetiminde esastır.\n\nBaşkalarına İlham Verme Karizman, çevrendekilere ilham verip motive edebilir. Pozitif bir örnek oluşturarak ve coşku ve güven sergileyerek, başkalarını mükemmellik için çaba göstermeye ve hedeflerine ulaşmaya teşvik edersin. Bu ilham verici yetenek, bir ekibi motive etmenin başarı için anahtar olduğu liderlik rollerinde özellikle değerlidir.\n\nİş Dünyasında Gücünü Kullanmak Karizma gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Satış ve pazarlamada, ikna yeteneklerin, müşteri etkileşimini ve satış büyümesini artırabilir. Liderlik rollerinde, ilham verme ve motive etme yeteneğin, ekip performansını ve moralini yükseltebilir. Ayrıca, ağ kurma ve iş geliştirmede, manyetik varlığın kapıları açabilir ve yeni fırsatlar yaratabilir.\n\nKarizma gücün, iş dünyasında etkileme, ilişki kurma ve ilham verme açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, güçlü ağlar kurabilir, etkileşimi artırabilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_51_25_1 = "“Rekabet” Gücü (Quantum 51-25)";
var guclu_yanlarin_51_25_2 = "Başkalarını geride bırakma ve mükemmelliğe ulaşma konusunda güçlü bir dürtüye sahipsin. Bu rekabet ruhu, sürekli olarak daha iyi performans ve daha yüksek standartlar için çaba göstermeni sağlar. İş dünyasında bu güç, yüksek başarı ve sonuç odaklılık gerektiren satış, pazarlama ve üst düzey liderlik gibi rollerde çok değerlidir.\n\nMükemmellik Peşinde Koşma Rekabetçiliğin, durmaksızın mükemmellik peşinde koşmanı sağlar. Hırslı hedefler belirlersin ve bunları gerçekleştirmeye kararlısındır. Genellikle geleneksel sınırların ötesine geçersin. Bu dürtü, senin ve ekibinin her zaman en üst düzey performansa ve sürekli iyileşmeye odaklanmasını sağlar.\n\nDayanıklılık ve Kararlılık Rekabetçilik, dayanıklılık ve kararlılık gerektirir. Zorlayıcı ortamlarda gelişir ve aksiliklerle kolayca yılmazsın. Bu dayanıklılık, yüksek risk ve sürekli baskı içeren rollerde kritik önemdedir ve zor durumlarda bile odaklanmanı ve gayretini korumana olanak tanır.\n\nBaşkalarına İlham Verme Rekabetçi doğan, çevrendekilere ilham verip motive edebilir. Yüksek standartlar belirleyerek ve mükemmelliğe bağlılığını göstererek, meslektaşlarını ve ekip üyelerini performanslarını yükseltmeye teşvik edersin. Bu, yüksek performans kültürünü teşvik etmenin anahtar olduğu liderlik rollerinde özellikle değerlidir.\n\nİş Dünyasında Gücünü Kullanmak Rekabet gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Satış ve pazarlamada, mükemmelliğe ulaşma dürtün, olağanüstü performans ve pazar başarısı sağlayabilir. Liderlik rollerinde, mükemmellik peşinde koşman, organizasyonun genel başarısını sürükleyebilir. Ayrıca, proje yönetiminde, dayanıklılık ve kararlılık, projelerin zorluklara rağmen başarılı bir şekilde tamamlanmasını sağlar.\n\nRekabet gücün, iş dünyasında dürtü, dayanıklılık ve ilham açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, yüksek performans seviyelerine ulaşabilir, ekibine ilham verebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_1_8_1 = "“İlham” Gücü (Quantum 1-8)";
var guclu_yanlarin_1_8_2 = "Farklı bir perspektifi yaratıcı bir şekilde ifade etme konusunda benzersiz bir yeteneğe sahipsin. Bu, varlığınla veya başkalarının deneyimleyip takdir edebileceği çeşitli araçlarla kendini gösterebilir. İş dünyasında bu nitelik, yenilikçilik, satış, pazarlama ve yaratıcı liderlik gerektiren roller için çok değerlidir.\n\nYaratıcı Öz-İfadeyi Modellemek Kendini ifade eden, yaratıcı bir birey olmanın ne anlama geldiğini modellemek üzere tasarladın. Bu güç, başkalarının dikkatini ve hayranlığını doğal olarak çeker, seni yaratıcı bir rol model yapar. Bu mentorluk, takım liderliği ve yaratıcı yönlendirme içeren rollerde kritik önemdedir.\n\nÖne Çıkma Cesareti Kalabalıktan sıyrılmak cesaret ister ve bunu yapma yeteneğin, başkalarını da aynı derecede cesur olmaya teşvik eder. Farklı olma ve risk alma isteğin, yenilikçiliği teşvik edebilir ve organizasyonun içinde bir yaratıcılık kültürü geliştirebilir. Bu cesaret, özellikle girişimcilik, ürün geliştirme ve stratejik planlama alanlarında değerlidir.\n\nAlgıları Değiştirme Otantik ve yaratıcı bir şekilde yaşayarak, algıları değiştirme ve başkalarını kendi benzersizliklerini ifade etmeleri için özgürleştirme potansiyeline sahipsin. Etkin daha kapsayıcı ve dinamik bir işyeri yaratabilir ve burada çeşitli fikirler değerli görülür ve keşfedilir. Bu yetenek, çeşitlilik ve kapsayıcılık girişimleri, satış, halkla ilişkiler ve organizasyonel gelişim içeren rollerde çok önemlidir.\n\nİlham gücün, iş dünyasında yaratıcı ifade, cesaret ve etki açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, yenilikçiliği teşvik edebilir, ekibine ilham verebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_38_28_1 = "“Azim” Gücü (Quantum 38-28)";
var guclu_yanlarin_38_28_2 = "Engelleri aşmanı ve hedeflerine odaklanmanı sağlayan sarsılmaz bir kararlılığa sahipsin. Bu azim, proje yönetimi, satış ve girişimcilik gibi dayanıklılık ve ısrar gerektiren rollerde çok değerlidir.\n\nZorlukların Üstesinden Gelme Azimli doğan, önemli zorluklarla yüzleşmeni ve bunların üstesinden gelmeni sağlar. Geri çekilmelerden kolayca yılmazsın ve bunları öğrenme ve büyüme fırsatları olarak görürsün. Bu güç yüksek riskli ortamlarda, zorlukların üstesinden gelmenin başarı için anahtar olduğu durumlarda kritiktir.\n\nTutarlı Çaba Azmin hedeflerine yönelik tutarlı çaba göstermeni sağlar. İşine bağlısın ve hedeflerine ulaşmak için ekstra çaba göstermeye hazırsın. Bu düzeydeki adanmışlık, uzun vadeli bağlılık ve sürekli çaba gerektiren araştırma ve geliştirme, stratejik planlama ve operasyon yönetimi gibi rollerinde esastır.\n\nBaşkalarına İlham Verme Azim ve kararlılığın, çevrendekilere ilham verip motive edebilir. Sarsılmaz bağlılık ve sıkı çalışmanın bir örneğini göstererek, ekip üyelerini benzer bir zihniyet benimsemeye teşvik edersin. Bu ilham verici yetenek, liderlik ve mentorluk rollerinde özellikle değerlidir.\n\nAzim gücün, iş dünyasında kararlılık, dayanıklılık ve ilham açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, zorlukların üstesinden gelebilir, hedeflerine ulaşabilir ve ekibini de aynısını yapmaya teşvik edebilirsin.";

var guclu_yanlarin_7_31_1 = "“Liderlik” Gücü (Quantum 7-31)";
var guclu_yanlarin_7_31_2 = "Çevrendekilere net ve vizyoner rehberlik sağlama yeteneğine sahipsin. Bu güç, çekici bir yön belirlemeni ve başkalarına bu yönde ilham vermeni sağlar. Bu, iş dünyasında nitelik, stratejik planlama ve liderlik gerektiren roller için çok değerlidir.\n\nGüven Kazanmak Etkili bir lider olabilmek için önce liderlik ettiğin kişilerin güvenini kazanmalısın. Liderlik gücün, dürüstlük, güvenilirlik ve ekibinin refahına gerçek bir ilgi göstererek güven inşa etme yeteneğinle karakterizedir. Bu güven, güçlü ve uyumlu ekipler için temel oluşturur.\n\nOtorite ile Etkilemek Sesin, etki ve otorite niteliği taşır, ve lider olmak için davet edilmen veya seçilmen gerekir. Bu, liderliğinin dayatılmadığı, aksine memnuniyetle karşılandığı anlamına gelir, bu da etkini daha sürdürülebilir kılar. Bu, yön, müzakere, ekip liderliği ve üst düzey yönetim içeren rollerde kritik önemdedir.\n\nPerde Arkası Liderliği Perde arkasından liderlik yapma yeteneğine sahipsin, her zaman ön planda olmasan bile karar vericileri yönlendirir ve stratejileri şekillendirirsin. Bu liderlik biçimi, önemli değişiklikler ve ilerlemeler sağlarken başkalarının harekete geçmesini ve tanınmasını sağlar.\n\nYön Vermek Buradaki rolün, her şeyi kendin yapmak değil, yolu göstermek ve başkalarına harekete geçmeleri ve karar vermeleri için güç vermektir. Bu yaklaşım, etkini maksimize eder ve ekip üyeleri arasında sahiplenme ve sorumluluk duygusunu geliştirir.\n\nİş Dünyasında Gücünü Kullanmak Liderlik gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Yönetim rollerinde, vizyoner rehberliğin, organizasyonu uzun vadeli başarıya yönlendirebilir. Proje yönetiminde, güven kazanma ve net yön verme yeteneğin, projelerin stratejik hedeflerle uyumlu olmasını ve etkili bir şekilde uygulanmasını sağlar. Ayrıca, danışmanlık rollerinde, perde arkası liderliğin stratejik kararları yönlendirebilir ve sürekli iyileştirme kültürünü teşvik edebilir.\n\nLiderlik gücün, iş dünyasında vizyoner rehberlik, güven inşa etme ve etkili otorite açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, organizasyonunu güvenli bir şekilde geleceğe yönlendirebilir, ekibine ilham verebilir ve sürdürülebilir başarıyı sağlayabilirsin.";

var guclu_yanlarin_57_20_1 = "“Spontanlık” Gücü (Quantum 57-20)  ";
var guclu_yanlarin_57_20_2 = "Durumları hızla anlama ve yanıt verme konusunda gelişmiş bir sezgisel farkındalığa sahipsin. Bu güç, içsel sansür olmadan hızlı düşünme ve konuşma yeteneği sağlar. İş dünyasında, bu nitelik kriz yönetimi, müşteri hizmetleri ve müzakereler gibi hızlı karar verme ve uyum sağlama gerektiren rollerde çok değerlidir.\n\nÖzün Hızla Anlaşılması Spontan sözlerin ve içgüdülerin, durumu hızla anlamanı sağlar, uzun süre düşünmene gerek kalmadan. Karmaşıklıkları aşma ve anahtar sorunları belirleme yeteneği, zamanın önemli olduğu yüksek baskılı ortamlarda çok önemlidir. Bu özellik, problem çözme, stratejik planlama ve liderlik içeren rollerde özellikle değerlidir.\n\nYanlış Anlamaları Azaltma Başkalarının alıcılığına olan farkındalığın, sezgisel içgörülerini gerçek bilgi olarak paylaşmanı sağlar, bu da yanlış anlamaları ve direnci azaltır. Bu yetenek, ekip işbirliği, müşteri ilişkileri ve çatışma çözümü gibi alanlarda net ve etkili iletişimi teşvik eder.\n\nBilinmeyen Korkusunu Yenmek Spontanlık, bilinmeyenin korkusunu yenmek, sezgisel dürtülerini tamamen dinlemek, harekete geçmek ve güvenmek anlamına gelir. Bu gücü kucaklayarak, belirsizlikle güvenle başa çıkabilir ve başkalarına da aynı şeyi yapmaları için ilham verebilirsin. Bu, esneklik ve yaratıcılığın önemli olduğu yenilikçi ve dinamik alanlarda özellikle önemlidir.\n\nKendiliğindenlik gücün, iş dünyasında sezgisel farkındalık, hızlı düşünme ve etkili iletişimin benzersiz bir karışımını sunan güçlü bir özelliktir. Bu gücü kullanarak, hızlı kararlar verebilir, temel sorunları ele alabilir ve ekibin içinde net iletişimi teşvik edebilirsin.   ";

var guclu_yanlarin_39_55_1 = "“Kışkırtma” Gücü (Quantum 39-55)  ";
var guclu_yanlarin_39_55_2 = "Başkalarını kışkırtma ve ilham verme yeteneğine sahipsin, onların ruhunu güçlendirebilir ve tam potansiyellerine ulaşmaları için motive edebilirsin. Bu güç, ilham vermenin ve başkalarını zorlamanın anahtar olduğu liderlik ve mentorluk rollerinde çok değerlidir.\n\nDerin Yaratıcılığa Erişim Tutkudan melankoliye, mutluluktan üzüntüye kadar uzanan duygusal dalgaların, en derin yaratıcılık seviyelerine erişmeni sağlar. Ruh halini kucaklamak, bu yaratıcı enerjileri etkili bir şekilde kullanmanı sağlar. Bu, duygusal derinliğin çığır açan çalışmalara yol açabileceği sanat, tasarım ve yenilik gibi yaratıcı alanlarda özellikle değerlidir.\n\nÇevrendekileri Etkileme Ruh halini ve o anda hissettiklerini kucaklamayı öğrendiğinde, çevrendekileri etkileme ve değiştirme gücünü de kazanırsın. Tutkun, başkalarının gerçek doğasını ve ruhunu kışkırtabilir veya ortaya çıkarabilir. Bu yetenek, dinamik ve ilham verici bir ekip ruhu geliştirmenin kritik olduğu takım ortamlarında çok önemlidir.\n\nBaşkalarıyla Uyum Ruh hali ve modu seninkiyle uyumlu olan insanları sezgisel olarak hissedebilirsin. Bu farkındalık, güçlü, uyumlu ilişkiler kurmana yardımcı olur ve işbirlikçi projeler ve ortaklıklarda esastır. Seni tamamlayan ve güçlü yönlerini geliştiren bireylerle çevrili olmanı sağlar.\n\nKışkırtma gücün, iş dünyasında güçlendirme, yaratıcılık ve sezgisel farkındalık açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, başkalarına ilham verebilir ve onları zorlayabilir, yaratıcılığı teşvik edebilir ve güçlü, uyumlu ilişkiler kurabilirsin.   ";

var guclu_yanlarin_2_14_1 = "“Yönlendirme” Gücü (Quantum 14-2) ";
var guclu_yanlarin_2_14_2 = "Sadece içgüdülerini dinleyip güvenerek çevrendekilere, projelere ve daha geniş girişimlere yenilikçi ve güçlendirici yeni yönler getirme konusunda benzersiz bir yeteneğe sahipsin. Bu güç, stratejik vizyon ve başkalarına ilham verme yeteneği gerektiren üst düzey liderlik, proje yönetimi ve danışmanlık rolleri için çok değerlidir.\n\nYaratıcı Çabaları Sürdürme Kendi yaratıcı çabalarını sürdürebilir veya çevrendekileri kendi yaratıcı yönlerinde kaynaklar ile destekleyip teşvik edebilirsin. Bu yetenek, hem projelerin hem de desteklediğin kişilerin gelişmesini sağlar. Bu girişimcilik, araştırma ve geliştirme ve yaratıcı endüstriler gibi alanlarda özellikle değerlidir.\n\nRol model Olarak Liderlik Rol modellik yoluyla çevrendekileri güçlendirme gücünün özünde yatar. İlk önceliğin kendi yönünde ilerlerken kendine sadık olmaktır. Bu ilkeleri benimseyerek, doğal olarak başkalarına ilham verir ve liderlik edersin. Bu güç, mentorluk, koçluk ve başkalarını yönlendirmenin anahtar olduğu herhangi bir rolde çok önemlidir.\n\nBaşkalarını Mekanik Olarak Güçlendirme Sadece çevrelerinde bulunarak insanlara bir yön duygusu verebilir onları tamamen mekanik bir şekilde güçlendirebilirsin. Varlığın ve kendi yoluna olan güvenin, çevrendekiler üzerinde istikrar sağlayıcı ve motive edici bir etki yaratır. Bu, takım ortamlarında, liderlik rollerinde ve topluluk oluşturma alanlarında özellikle etkili olabilir.\n\nYönlendirme gücün, iş dünyasında stratejik vizyon, yaratıcı destek ve ilham verici liderliğin benzersiz bir karışımını sunan güçlü bir özelliktir. Bu gücü kullanarak, yenilikçi projeleri yönlendirebilir, yaratıcı çabaları destekleyebilir ve örnek olarak liderlik edebilir, sonuçta çevrendekileri güçlendirebilirsin. ";

var guclu_yanlarin_22_12_1 = "“Sosyallik” Gücü (Quantum 22-12) ";
var guclu_yanlarin_22_12_2 = "İfadelerini sosyal bağlama uyacak şekilde ayarlayabilirsin. Bu yetenek, halkla ilişkiler, müşteri hizmetleri ve diplomatik roller gibi ince iletişim ve uyum gerektiren rollerde çok değerlidir. Doğru kelimeleri ve duyguları ifade etmedeki ustalığın, çeşitli kitlelerle etkili bir şekilde bağlantı kurmana yardımcı olur.\n\nRuh Haline Göre Sosyallik Sosyallik seviyen, ruh hallerinin gelgitlerine bağlı. Kendi duygusal ritimlerinin bu içsel anlayışı, başkalarıyla daha otantik bir şekilde etkileşimde bulunmanı sağlar. İş dünyasında bu özellikle duygusal zeka ve empati gerektiren insan kaynakları, danışmanlık ve ekip liderliği gibi rollerde faydalıdır.\n\nDeğişim İçin Katalizör Zamanlamaya ve kitlenin ne kadar açık olduğuna dair keskin bir anlayışla, insanların dikkatini çekmek için sıcaklığını ve sosyal becerilerini ne zaman kullanacağını bilirsin. Sözlerin, hayatlarında değişim için bir katalizör olma potansiyeline sahiptir. Bu güç, özellikle motive edici konuşmalar, koçluk ve başkalarına ilham vermenin ve etkilemenin anahtar olduğu herhangi bir rolde çok değerlidir.\n\nAçık Medyayı Kullanma Konuşma, oyunculuk, şiir veya müzik gibi çeşitli medyalar aracılığıyla ses tonunu ve vurgusunu kullanarak başkalarını etkileme, dokunma ve güçlendirme yeteneğine sahipsin. İfade biçimleri aracılığıyla özellikle kişisel olarak tanımadığın insanlarla bağlantı kurma ve onlara hitap etme yeteneğin, seni medya, eğlence ve savunuculuk gibi alanlarda güçlü bir iletişimci yapar.\n\nSosyallik gücün, iş dünyasında uyum sağlama, duygusal zeka ve ilham verici iletişim açısından güçlü bir özelliktir. Bu gücü kullanarak, başkalarıyla etkili bir şekilde etkileşime geçebilir ve onları etkileyebilir, anlamlı bağlantılar kurabilir ve olumlu değişimi teşvik edebilirsin. ";

var guclu_yanlarin_61_24_1 = "“Yaratıcı Süreç” Gücü (Quantum 61-24) ";
var guclu_yanlarin_61_24_2 = "Kendini ve başkalarını önemli ölçüde güçlendiren bir ilham gücün, içsel hakikat ve bireysel biliş içeren zihinsel kapasiteye sahipsin.\nİlham ve İçsel Hakikat İlham, içsel hakikat ve bireysel biliş için zihinsel kapasiten, sana benzersiz içgörüler ve perspektifler sunma gücü verir. Bu güç, stratejik planlama, araştırma ve geliştirme ve yaratıcı endüstriler gibi yenilikçi düşünme ve vizyoner liderlik gerektiren rollerde çok değerlidir. Çığır açan fikirler ve çözümler sunabilir.\n\nSpontane Yaratıcı Süreç Bireysel yaratıcılık sürecin oldukça spontane olabilir. Bazen başka bir yerden bir şey duyuyormuş gibi hissetmek, hayatı tamamen yeni bir şekilde görme potansiyeli sunar. Bu spontanelik, teknoloji, pazarlama ve tasarım gibi yenilik ve uyum sağlama üzerine kurulu alanlarda özellikle değerlidir.\n\nBaşkalarına İlham Verme Zihnin yeni realizasyonlarla başkalarına ilham vermek için tasarlanmıştır. Benzersiz perspektiflerini ve içgörülerini paylaşarak, çevrendeki insanları motive edebilir ve etkileyebilirsin. İlham verme yeteneği, rehberlik ve başkalarını yükseltmenin anahtar olduğu mentorluk, öğretim ve liderlik pozisyonları gibi rollerde kullanılabilir.\n\nİçsel Hakikate Teslim Olma Zihnin, kendi zamanında kendini gösterecek yeniliklere teslim olduğunda güçlenir. Bu sürece güvenmek, yeni fikirlere ve içgörülere açık kalmana olanak tanır ve dinamik ve duyarlı bir problem çözme yaklaşımını teşvik eder. Bu, esneklik ve değişime açıklığın değerli olduğu herhangi bir ortamda faydalıdır.\n\nYaratıcı süreç gücün, iş dünyasında ilham, yenilikçi düşünme ve başkalarına ilham verme yeteneğinin sunan kuvvetli bir özelliktir. Bu gücü kullanarak, inovasyonu teşvik edebilir, çevrendekileri motive edebilir ve değişen koşullara kolayca uyum sağlayabilirsin. ";

var guclu_yanlarin_43_23_1 = "“Verimlilik” Gücü (Quantum 43-23) ";
var guclu_yanlarin_43_23_2 = "Kendini ve başkalarını önemli ölçüde güçlendiren anlık atılımlar ve benzersiz içgörüler sunma yeteneğin var. Bu yetenek, yenilik ve problem çözme gerektiren süreç iyileştirme, proje yönetimi ve stratejik planlama gibi rollerde çok değerlidir. Verimli çözümler bulma yeteneğin, operasyonlar ve üretkenlikte önemli iyileştirmelere yol açabilir.\n\nBilinmeyeni Keşfetmek Zihnin sadece bildiklerini değil, aynı zamanda bilinmeyeni de kucaklamak için tasarlanmıştır. Bu merak ve keşfedilmemiş alanlara adım atma isteği, araştırma ve geliştirme, teknoloji ve yaratıcı endüstrilerde özellikle faydalıdır. Geleneksel düşüncenin sınırlarını zorlayarak, başkalarının gözden kaçırabileceği yeni yöntemler ve yaklaşımlar keşfedebilirsin.\n\nİletişim Yetkinliği Geliştirmek Bildiğini basit ve net bir şekilde açıklama yetkinliği geliştirebilirsin. Tanındığında ve davet edildiğin zamanlarda benzersiz içgörülerini paylaşman dahiliğini doğal olarak ortaya çıkarır. Bu güç, öğretim, danışmanlık ve liderlik pozisyonları gibi etkili iletişim ve bilgi transferi gerektiren rollerde özellikle değerlidir.\n\nVerimlilik gücün, iş dünyasında yenilikçi düşünme, keşfetme ve etkili iletişim açısından benzersiz bir karışım sunan güçlü bir özelliktir. Bu gücü kullanarak, operasyonel iyileştirmeler sağlayabilir, yeniliği teşvik edebilir ve karmaşık fikirleri başkalarının anlayabileceği ve takdir edebileceği şekilde iletebilirsin. Bu gücü benimsemek ve geliştirmek, anlamlı ve etkili bir kariyere ve profesyonel ortamda önemli bir fark yaratmaya yol açabilir. ";

var guclu_yanlarin_52_9_1 = "“Konsantrasyon” Gücü (Quantum 52-9)  ";
var guclu_yanlarin_52_9_2 = "Lazer gibi bir odaklanma yeteneğine sahipsin, bu da seni sakin ve ele alınan meseleye odaklanmış tutar. Bu beceri, araştırma, veri analizi ve kalite kontrol gibi derin odaklanma ve dikkat gerektiren roller için değerlidir. Detaylara inme yeteneğin, işinde titizlik ve doğruluk sağlayabilir.\n\nSessiz ve Stresiz Baskı Detaylara odaklandığında, seni yerinde tutan sessiz ve stresiz bir baskı hissedebilirsin. Bu sakin ancak üretken durum, hassasiyet ve sakinliğin önemli olduğu yüksek riskli ortamlarda faydalıdır. Mühendislik, denetim ve cerrahi gibi mesleklerde bu güç büyük fayda sağlar.\n\nDetay Odaklı Değerlendirme Kendini adadığın herhangi bir şeyin detaylarını sürekli olarak değerlendirebilirsin. Bu titiz doğa, yasal işler, finansal planlama ve stratejik danışmanlık gibi titiz değerlendirme ve eleştirel düşünme gerektiren roller için mükemmeldir. Sürekli değerlendirme yapman, hiçbir ayrıntının gözden kaçmamasını sağlar.\n\nOdaklanma Odaklanacak değerli bir şey olmadığında kendini huzursuz ve depresif hissedebilirsin. Bu güçlü enerjiyi birçok şeyle uğraşarak dağıtmanız sağlıklı olmayabilir. İçgüdüsel tepkilerin neye odaklanacağını, neyi mükemmelleştireceğini ve ne zaman paylaşacağını ortaya çıkarır. Bir seferde tek bir şeye derinlemesine odaklanma yeteneğin, seçtiğin alanda uzman olmanı sağlayabilirr ve derin bilgi ve uzmanlık sunar.\n\nKonsantrasyon gücün, işine odaklanmış ve adanmış bir yaklaşım sunmanı sağlar, bu da seni titizlik, detay ve eksiksizlik gerektiren her profesyonel ortamda değerli bir varlık haline getirir. Bu gücü kullanarak, derin odaklanma, kritik değerlendirme ve adanmış uzmanlık gerektiren rollerde mükemmel olabilir, katkılarının etkili ve yüksek değerli olmasını sağlayabilirsin.  ";

var guclu_yanlarin_58_18_1 = "“Mantıklı Yargı” Gücü Quantum 58-18  ";
var guclu_yanlarin_58_18_2 = "Herhangi bir kalıbı yargılama, meydan okuma, düzeltme ve mükemmelleştirme konusundaki doyumsuz bir dürtü tarafından yönlendirilirsin. Bu mükemmellik arayışı, en iyi olası cevabı aramanda taş taş üstünde bırakmamanı sağlar. Sorunları mantıklı bir yaklaşımla ele alarak, konuları titizlikle parçalara ayırır ve hassasiyetle ele alırsın.\n\nUstalık ve İyileştirme Ustalık sanatı ve kalıpların iyileştirilmesi için kaynak sağlama ve paylaşma yeteneğin rakipsiz. Süreçleri, sistemleri ve yöntemleri sürekli olarak iyileştirme ve geliştirme arayışındasın. Bu iyileştirme dürtüsü en çok tatmin olmadığında veya yüksek standartlarına uymayan bir şeyi sorgulama ihtiyacı hissettiğinde ortaya çıkar.\n\nDavet Edilen Fikir Neşe Getirir Sorulmadan ortaya koyduğun yargılar eleştiri olarak algılanabilirken, mantıklı değerlendirmenin paylaşılmasının istenmesi sana gerçek bir neşe getirir. İçgörülerini ve düzeltmelerini sunmaya davet edildiğinde gelişirsin, uzmanlığının altı çizilir ve anlamlı bir şekilde katkıda bulunmana olanak tanır. “Burada yanlış bir şey var mı?” gibi sorular aldığında değerli perspektifini sunabilirsin.\n\nİş Dünyasında Gücünü Kullanmak İş dünyasında, mantıklı yargı gücün, eleştirel analiz, stratejik planlama ve kalite kontrol gerektiren rollerde paha biçilmezdir. Süreçleri ve sistemleri mükemmelleştirme yeteneğin, verimlilik ve üretkenlikte önemli iyileştirmelere yol açabilir. Bu gücü benimsemek ve geliştirmek, organizasyonunu daha büyük bir başarıya yönlendirmenize ve sürekli iyileştirmeyi sağlamana yardımcı olabilir.\n\nMantıklı yargı gücün, iyileştirmeyi sürdürmek ve mükemmelliğe ulaşmak için güçlü bir araçtır. Bu gücü kullanarak, her alanda önemli katkılarda bulunabilir, sürekli iyileştirme ve yüksek standartlar kültürü oluşturabilirsin. Mantıklı yargını benimsemek, profesyonel çabalarında değerli bir varlık olarak kalmanı sağlar.  ";

var guclu_yanlarin_48_16_1 = "“Yetenek” Gücü Quantum 48-16  ";
var guclu_yanlarin_48_16_2 = "Sezgisel içgörülerini tekrarlayan deneyimler ve pratik ile birleştirebilirsin. Bu süreç, içsel bir yeteneği mükemmelleştirmene yardımcı olur ve tutkuyla bağlı olduğun herhangi bir alanda yenilikçi çözümler ve rafine teknikler geliştirmene olanak tanır.\n\nSevdiğiniz Şeyle Özdeşleşmek, Yeteneklerini başarılı bir şekilde geliştirebilmenin anahtarı, tamamen sevdiğin bir şeyle özdeşleşmekten geçer. Adanmışlık ve tutkun, ustalığa ulaşmak için kritik öneme sahiptir. Tutkulu olduğun faaliyetlere kendini kaptırarak, yeteneklerini öne çıkan becerilere dönüştürebilirsin.\n\nİş Dünyasında Gücünü Kullanmak, İş dünyasında, sezgiyi tekrarlı pratikle birleştirme yeteneğin yenilikçi çözümler ve rafine süreçler geliştirebilir. İster problem çözme ister proje yönetimi veya yaratıcı alanlarda olsun, yeteneğin verimlilik ve mükemmelliği artırabilir.\n\nYetenek gücün, sezgi, adanmışlık ve ustalık açısından kuvvetli bir özelliktir. Bu gücü kullanarak, üretkenliği artırabilir, yeniliği teşvik edebilir ve organizasyonunuzu daha büyük bir başarıya yönlendirebilirsiniz.   ";

var guclu_yanlarin_17_62_1 = "“Organizasyon” Gücü Quantum 17-62  ";
var guclu_yanlarin_17_62_2 = "Zihinsel olarak bilgiyi yönetme yeteneğin, doğrulanmış detaylara dayalı olarak devam eden bir iç süreçte gerçekleşir. Yeni bilgileri özümseme, işleme ve mevcut bilgi çerçevene entegre etme kapasitesine sahipsin, bu da karmaşık iş ortamlarında çok değerlidir.\n\nZihinsel Yönetim Zihnin sürekli olarak detayları kendi zihinsel dosyalama sistemine organize eder ve diğerlerinin düşüncelerini veya söylediklerini büyük resme uydurarak sürekli ayarlamalar yapar. Bu, bilgiyi verimli bir şekilde yönetmeni ve hatırlamanı sağlar, seni herhangi bir organizasyonel ortamda değerli bir varlık yapar.\n\nSürekli Dikkat İçsel kalıplarına sürekli bir dikkat gösterir, tüm yeni verilerin mantıksal olarak organize edilip perspektifine uygun şekilde entegre edilmesini sağlarsın. Bu titiz bilgi yönetimi yaklaşımı, işinde doğruluğu ve ayrıntılı olmayı garantiler.\n\nİfade ve Zamanlama Sürekli konuşma baskısı hissedebilir ve görüşlerini detaylı bir şekilde paylaşarak veya anladıklarını açıklayarak tatmin ve rahatlama duygusu elde edebilirsin. Zamanlamana ve dinleyicilerinin alıcılığına dikkat etmek çok önemlidir, çünkü bu içgörülerinin iyi karşılanmasını ve etkili olmasını sağlar.\n\nİş Dünyasında Gücünü Kullanmak İş gruplarını, etkinlikleri ve projeleri mantıksal olarak organize etme konusunda çok aranan bir yeteneğin var. Organizasyon becerilerin süreçleri düzene sokar, üretkenliği artırır ve görevlerin ve projelerin başarılı bir şekilde yürütülmesini sağlar.\n\nOrganizasyon gücün, zihinsel yönetim, dikkat ve zamanlamayı içeren güçlü bir özelliktir. Bu gücü kullanarak, verimliliği artırabilir, iyi yapılandırılmış bir çalışma ortamı oluşturabilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.   ";

var guclu_yanlarin_53_42_1 = "“Döngüler” Gücü (Quantum 53-42)  ";
var guclu_yanlarin_53_42_2 = "Hayatın belirgin başlangıçlar, ortalar ve sonlarla döngüler halinde işler. Her döngünün kendi ritmi vardır, olgunlaşmak, büyümek ve gelişmek zaman alır, ardından nihayetinde düşüşe geçer ve sona erer – sadece süreci yeniden başlatmak için. Bir deneyime girip onu tamamladığında, tamamlanan döngüden elde edilen değerli dersleri ve bilgeliği yansıtabilir ve paylaşabilirsin. Yeni deneyimler, eskiler üzerine inşa edilebilir, sürekli büyüme ve anlayış için bir temel sağlar.\n\nYeni bir deneyime başlarken içgüdülerine güven – bu, ilgini kaybettiğin veya süreci tamamlayamadığın bir döngüye sıkışıp kalmaktan kaçınmana yardımcı olabilir. Beklentilerin olduğunda, hayal kırıklığına açık hale gelirsin. Beklenti olmadan, sadece bir deneyimde olmak, sağlıklı ve ödüllendirici olur.\n\nDeneyimden Öğrenmek, hayatın döngüler halinde işlediğini kabul et ve her aşamanın büyüme ve yenilenme için gerekli olduğunu anla. Bu anlayış, kişisel ve profesyonel zorlukları daha büyük bir kolaylık ve dirençle yönetmene yardımcı olabilir. Her tamamlanan döngü, yansıtma ve büyüme fırsatı sunar. Öğrenilen dersleri paylaşarak, kolektif bilgeliğe katkıda bulunabilir ve başkalarının benzer deneyimleri yönetmelerine yardımcı olabilirsin.\n\nTuzaklardan Kaçınmak, Yeni girişimlere başlarken içgüdülerine güvenmek çok önemlidir. Bu, verimsiz kalıplara sıkışıp kalmanı engelleyebilir ve çabalarının gerçek amacına uygun olmasını sağlayabilir.\n\nBeklentisiz yaşamak, deneyimlere önceden belirlenmiş beklentiler olmadan yaklaşmak, anın tadını çıkarmanı sağlar. Bu zihniyet, daha tatmin edici ve otantik etkileşimlere ve başarılara yol açabilir.\n\nİş dünyasında gücünü kullanmak, İş dünyasında, döngüleri anlamak ve kucaklamak, daha stratejik planlama ve yürütmeye imkan tanır. Projelerin ve girişimlerin doğal akışını tanıyarak, kaynakları ve beklentileri daha iyi yönetebilirsin. Geçmişteki başarıları ve başarısızlıkları yansıtmak, gelecekteki girişimler için değerli içgörüler sağlar. Karar verme süreçlerinde içgüdülerine güvenmek, tuzaklardan kaçınmana ve sürekli ilerleme sağlamana yardımcı olabilir.\n\nDöngüler gücün, büyüme ve gelişim üzerinde benzersiz bir bakış açısı sunan güçlü bir yetenektir. Bu gücü kullanarak, hayatın zorluklarını zarafet ve dirençle yönetebilir, kişisel ve profesyonel başarıya katkıda bulunabilirsin. Hayatın döngüsel doğasını kucaklamak, daha tatmin edici ve etkili bir yolculuğa yol açabilir.  ";

var guclu_yanlarin_46_29_1 = "“Keşif” Gücü Quantum 29-46";
var guclu_yanlarin_46_29_2 = "Keşif Gücü, yeni farkındalıklara dalmana ve bir deneyim tamamlanana kadar azimle devam etmene olanak tanır. Bu güç, doğru zamanda doğru yerde olmanı sağlayan içgüdüsel yanıtın aracılığıyla erişilen derin bir dayanıklılık ile beslenir. Keşif sürecinden elde edebileceğin memnuniyet ve bilgelik için net bir bağlılık çok önemlidir. Bir deneyim o anda anlamlı gelmese de tamamen kendini kaybedebilir, arkana bakmadan devam edebilirsin. Döngünün sonu, nihai keşfini bulacağın yerdir. İçgüdüsel yanıtını takip etmek ve beklentilerini bırakmak, başkalarının başarısız olduğu yerlerde başarılı olma potansiyelini artırır.\n\nFarkındalıkları ve Azmi Kucaklamak. Bir deneyim tamamlanana kadar onunla kalma yeteneğin çok değerli. Bu azim, içgüdüsel yanıtınla yönlendirilerek her zaman olması gereken yerde olmanı sağlar. Bu güç, sürekli çaba ve derin bağlılık gerektiren rollerde özellikle faydalı olabilir.\n\nBağlılık ve Memnuniyet, Sürece net bir bağlılık şarttır. Bu bağlılık, sadece memnuniyet getirmekle kalmaz, aynı zamanda keşiflerinden elde edilen değerli bilgeliği paylaşmana da olanak tanır. Profesyonel ortamlarda, bu bağlılık, başarıyı artıran ve yenilikçi çözümler getiren buluşlara yol açabilir.\n\nDeneyime Dalmak, Bir deneyimde kendini tamamen kaybedebilmek eşsiz bir güçtür. Deneyim başlangıçta anlam ifade etmese bile genellikle önemli keşiflere yol açar. İş dünyasında bu, zorlu projelerde devam edebilmek ve çığır açan içgörülerle ortaya çıkmak anlamına gelebilir.\n\nKeşif Gücü, azim, bağlılık ve sezgiyi birleştiren güçlü bir özelliktir. Bu gücü kullanarak yenilikçi çözümler üretebilir, gizli gerçekleri ortaya çıkarabilir ve başkalarının tökezleyebileceği alanlarda başarı elde edebilirsin.   ";

var guclu_yanlarin_13_33_1 = "“Tanıklık” Gücü (Kuantum 13-33)  ";
var guclu_yanlarin_13_33_2 = "Dikkatle dinleme, duyduğun bilgileri ve sırları saklama ve ders çıkarılabilecek anılar toplama yeteneğine sahipsin. Tanık olduğun deneyimlere çekilip, yüzeyin altındaki daha derin bir gerçeğin ortaya çıkmasını sabırla bekleyerek bu deneyimleri yansıtabilirsin. Bu bilgi toplama ve yansıtma yeteneği, dikkatli gözlem ve analiz gerektiren rollerde çok değerlidir.\n\nDoğal Bir Kayıt Tutucu Doğal bir kayıt tutucu olarak, etrafındaki her şeyin hayat hikayelerini toplayabilirsin. Sesin Hatırlıyorum der. Bu özellik, tarihi doğruluğun ve detaylı kayıtların önemli olduğu ortamlarda seni değerli bir kaynak yapar.\n\nZamanlama ve Bilgeliği Paylaşma Zamanlama her şeydir - davet edildiğinde, deneyimlerden elde edilen büyük bilgeliği paylaşabilirsin. Senin sabırlı yansıtma şeklin, genellikle kolektif tarihimizdeki en büyük gerçeklerden bazılarını ortaya çıkarır. İçgörülerini ne zaman paylaşacağını bilmek, profesyonel ve kişisel etkileşimlerinde önemli bir etki yaratabilir.\n\nİş Dünyasında Gücünü Kullanmak Tanıklık gücünü, iş dünyasında çeşitli alanlarında kullanılabilirsin. Araştırma ve geliştirmede, gözlemleme, kayıt tutma ve yansıtma yeteneğin, çığır açan keşiflere yol açabilir. Liderlik rollerinde, sabırlı gözlem ve zamanında içgörü paylaşma kapasiten, ekibini etkili bir şekilde ilham verebilir ve yönlendirebilir. Herhangi bir profesyonel ortamda, geçmiş deneyimlerini hatırlama ve yansıtma yeteneğin, stratejik planlama ve karar verme için sağlam bir temel sağlayabilir.\n\nTanıklık gücün, iş dünyasında gözlem, yansıtma ve zamanında bilgelik paylaşımını birleştiren güçlü bir özelliktir. Bu gücü kullanarak, başkalarını yönlendirme, bilinçli kararlar alma ve organizasyonunun uzun vadeli başarısına katkıda bulunma yeteneğini artırabilirsin. Bu gücü benimsemek ve geliştirmek, anlamlı ve etkili bir kariyere yol açabilir.  ";

var guclu_yanlarin_41_30_1 = "“Hayal Etme” Gücü (Kuantum 41-30)  ";
var guclu_yanlarin_41_30_2 = "Odaklanmış enerjini kullanarak olabilecek sayısız senaryoyu hayal etme yeteneğine sahipsin. Bu farklı olasılıkları hayal etme kapasitesi, yenilikçi çözümler ve yaratıcı atılımlar sağlayabilir. Hayal gücün, seni mevcut durumun ötesine ve potansiyel dolu bir geleceğe bakmaya teşvik eden güçlü bir araçtır.\n\nYeni Deneyimler Yeni deneyimler edinmek için bitmek bilmeyen bir özlemle, hayallerin ve arzuların beklentiler yaratabilir ve bu beklentiler gerçekleşebilir ya da gerçekleşmeyebilir. Bu yeni deneyimler arayışı, yaratıcılığını besler ve keşfedilmemiş alanları keşfetme motivasyonunu sağlar. Bu beklentileri yönetmek, hayal kırıklığını önlemek ve gerçeklikte kalmak için önemlidir.\n\nİsteği Dengelemek Yeni deneyimlere olan açıklığın, sabır ve özdenetim geliştirerek, net kararlar almak için yeterli zaman ayırarak en iyi şekilde dengelenir. Harekete geçmeden önce durup düşünmek, hayal gücünün enerjisini üretken ve iyi düşünülmüş eylemlere yönlendirmene olanak tanır. Bu denge, hayallerini ulaşılabilir hedeflere dönüştürmek için önemlidir.\n\nGücünü Kullanmak Gücünü kullanmanın sırrı, sadece hayallerinin ve her deneyimin kendisinden zevk almak ve beklentilerin baskısına boyun eğmemektir. Yolculuğun ve yaratıcı sürecin tadını çıkararak, ilhama açık kalabilir ve karşılanmayan beklentilerin getirdiği stresten kaçınabilirsin. Bu zihniyet, hayal gücüyle ortaya çıkan fikirlerine tam anlamıyla katılmanı ve onları hayata geçirmeni sağlar.\n\nİş Dünyasında Gücünü Kullanmak Hayal etme gücün, iş dünyasının çeşitli alanlarında kullanılabilir. Yaratıcı problem çözme gerektiren rollerde, birden fazla senaryo hayal etme yeteneğin, yenilikçi çözümler sağlayabilir. Pazarlama ve ürün geliştirmede, hayal gücün, ilgi çekici hikayeler ve benzersiz teklifler oluşturulmasına yardımcı olabilir. Liderlikte, vizyoner düşüncen, ekibini yeni olasılıkları keşfetmeye ve organizasyonu ileriye taşımaya ilham verebilir ve motive edebilir.\n\nHayal etme gücün, iş dünyasında yaratıcılık, vizyon ve büyük hayaller kurma yeteneğini birleştiren güçlü bir özelliktir. Bu gücü kullanarak, yenilik yapma, ilham verme ve anlamlı bağlantılar kurmayı artırabilirsin.";

var guclu_yanlarin_35_36_1 = "“Deneyimleyen” Gücü (Quantum 36-35)";
var guclu_yanlarin_35_36_2 = "İş ve hayatında ilerlemeyi sağlamak için birçok şeyi denemeye gönüllü olabilirsin. Büyüme ve yenilik vaat eden toplu deneyimlerden bilgelik toplama konusunda motive oluyorsun. Çeşitli deneyimlerin birikimi olan değerli içgörülerini etrafındakiler ile paylaşabilirsin. Çevrenizdeki insanlara her anı değerlendirmeleri ve 'anı yaşamaları' için ilham verebilirsin.\n\nYeni Deneyimleri Kucaklamak, Yeni deneyimler aracılığıyla bilgelik edinme ve keşfetme arzun, yenilik ve adaptasyonla beslenen iş dünyasında çok önemli bir yer tutar. Her duruma yeni bir bakış açısıyla yaklaşarak iyileştirme ve yenilik yapma yollarını arayabilirsin. Geriye dönüşler veya zorluklarla karşılaştığında bile, deneyimin içinde kaybolmadan ilerlemeyi sürdürme kapasiten var.\n\nBaşkalarına İlham Vermek, Çok çeşitli durumlar yaşamış biri olarak, başkaları için bir ilham kaynağı olabilirsin. Yeni şeyler deneme konusundaki açıklığın, zorluklar karşısındaki dayanıklılığın ve kazandığın bilgeliği paylaşma yeteneğin, başkalarını kendi deneyimlerini kucaklamaya ve hedeflerine coşkuyla ulaşmaya teşvik edebilir. Başarıya ulaşmanın bilinmeyeni keşfetmekten ve her fırsatı en iyi şekilde değerlendirmekten geçtiğini göstererek liderlik edebilirsin.\n\nİş Dünyasında Gücünü kullanmak, Deneyimleme gücün, uyum sağlama, yenilik ve hızlı tempolu ortamlarda liderlik gerektiren rollerde değerli bir değerdir. Ürün geliştirme, araştırma-geliştirme, stratejik planlama gibi sürekli keşif ve değişim gerektiren pozisyonlarda başarılı olabilirsin. Liderlik rollerinde, yeni deneyimlere olan coşkun, deneme ve sürekli öğrenme kültürünü teşvik ederek ekibini başarıya yönlendirebilirsin. Her deneyimi korkusuzca kucaklama yeteneğin, sınırları zorlamana, yenilikçi çözümler üretmene ve organizasyonun büyümesini sağlamana olanak tanıyabilir.\n\nBu gücün, karmaşık projeleri ve hızlı hareket eden endüstrileri yönetmene yardımcı olur ve seni dinamik ortamlarda liderlik pozisyonlarına uygun hale getirir. Keşiflerini paylaşarak ilerlemeyi teşvik edersin ve çevrendekilere de aynı keşif ve büyüme zihniyetini benimsemeleri için ilham verebilirsin.";

var guclu_yanlarin_11_56_1 = "“Merak” Gücü (11-56)";
var guclu_yanlarin_11_56_2 = "Sürekli zihinsel uyarımlar aramaya, yeni fikirleri ve etrafındaki dünyayı görmenin yollarını keşfetmeye meraklısın. Spesifik bir şey bulmayı amaçlamazsın, daha ziyade “Bakın ne keşfettim!” diyerek paylaşımda bulunmak sana daha uygun olabilir.\n\nYaratıcılığı Serbest Bırakmak, Felsefi yansımalarına dayanan fikirleri ve hikayeleri bir araya getirdiğinde, yaratıcılığın ve sunum tarzın büyüleyici hale gelir. Bu eşsiz merak ve yaratıcılık karışımı, bilgiyi başkalarını büyüleyecek ve ilham verecek şekilde sunmana olanak tanır.\n\nHikayeler Yaratmak, Soyut fikirleri alıp onları bir hikayeye dönüştürme yeteneğine sahipsin, bu da izleyicilerin için öğretici ve eğlenceli olabilir. Karmaşık kavramları çekici anlatılara dönüştürme yeteneğin seni mükemmel bir iletişimci yapar ve çeşitli izleyicilerin dikkatini çekmene olanak tanır.\n\nVizyonuna İnanmak, Bir şeye inanma kapasiten onu senin için gerçek kılar ve hikayelerinin hayat deneyimlerini paylaşma şeklinin, gerçeklerden ziyade, daha çok nasıl paylaşıldığına ilgi duyarsın. Bu inanç odaklı yaklaşım, izleyicinle derin bir bağ kurmanı sağlar ve onlara da yeni bir perspektif sunar.\n\nİş Dünyasında Gücünü Kullanmak, Merak gücünü iş dünyasının çeşitli alanlarında kullanabilirsin. Yenilik ve ürün geliştirme alanında, yeni fikirleri keşfetme yeteneğin çığır açan çözümler getirebilir. Pazarlama ve hikaye anlatımında, çekici anlatılar yaratma yeteneğin izleyicileri etkileyip dönüştürebilir. Ayrıca, liderlik rollerinde, merak odaklı yaklaşımın sürekli öğrenme ve gelişim kültürünü teşvik edebilir.\n\nMerak gücün, iş dünyasında yaratıcılık, inanç odaklı vizyon ve hikaye anlatma yeteneği sentezleyen güçlü bir özelliktir. Bu gücü kullanarak, başkalarına ilham verebilir, yeniliği teşvik edebilir ve organizasyonunu daha büyük bir başarıya yönlendirebilirsin.";

var guclu_yanlarin_34_10_1 = "“İnanç” Gücü (34-10)  ";
var guclu_yanlarin_34_10_2 = "Kendi gerçeğini sarsılmaz bir inançla takip etme gücüne sahipsin. Karşına çıkan engellere rağmen bağımsız ve otantik bir şekilde davranma içsel gücüne sahipsin. Belirli bir inancı benimsediğinde, ne kadar alışılmadık görünse de, seni bu inançtan döndürmek neredeyse imkansız olabilir. Güçlü varlığın ve bireyselliğin doğal olarak dikkat çeker, ancak asıl olarak kendin olmaya bağlı kalarak başkalarına da kendi inançları ve gerçekleriyle bağlantı kurmaları için ilham verirsin.\n\nKendin Olmak, Davranışlarını çeşitli durumlara uyarlayabilirken, kim olduğuna sadık kalma yeteneğine sahipsin. Kendine güvenmeyi, kendini sevmeyi ve kabul etmeyi öğrendiğinde, seni benzersiz kılan özellikleri tam anlamıyla kucaklarsın. Bu otantiklik, seni kendi hayatını kendi olarak yaşaman için güçlendirir ve başkalarını da aynı şeyi yapmaları için cesaretlendirir.\n\nKişisel Güç, Kişisel gücün, seni benzersizliğini sergilemeye iten etkileyici bir enerji kaynağıdır. Bu özellik tamamen senin kullanımına özgüdür, başkaları tarafından hayranlıkla karşılanıp kullanılmak istense bile başkalarının erişimine açık değildir. Bu kişisel güç, bağımsızlığını destekler, seni inançlarına göre hareket etmeye yönlendirir ve otantik bir şekilde hayatta kalman ve başarılı olman için seni güçlendirir.\n\nİş Dünyasında Gücünü Kullanmak, İnanç gücün iş dünyasında değerli bir özelliktir. Karşına çıkan zorluklara rağmen inançlarının arkasında durma ve bağımsız hareket etme yeteneğin, ekiplerin ortak hedeflere ulaşması için güven aşılamak ve onları motive etmek adına çok önemli olabilir. Yenilikçilik ve otantikliğin ön planda olduğu sektörlerde, ilkelere sarsılmaz bağlılığın, sınırları zorlamana ve örnek olarak liderlik etmene olanak tanır. Özellikle üst düzey liderlik rolleri için, güçlü inançlar şirketleri belirsiz veya zorlu zamanlarda yönlendirmeye yardımcı olabilir. Diğer insanlara da otantik ve kararlı bir şekilde hareket etmeleri için ilham verme yeteneğin, ekibinde veya organizasyonunda bütünlük ve dayanıklılık kültürü oluşturur.\n\nİnanç gücün, otantik bir şekilde liderlik yapmanı, başkalarına inançlarının arkasında durmaları için ilham vermeni ve bütünlük ile kişisel gücün geliştiği bir ortam yaratmanı sağlar. Kendi gerçeğine sarılarak ve bu doğrultuda hareket ederek, ilerleme kaydedebilir ve dayanıklılık ve yenilikçilik kültürü yaratabilirsin.  ";
  
//Bunlar gates 
var guclu_yanlarin_15_1 = "Güven Kaynağı";
var guclu_yanlarin_15_2 = "Güven ve İstikrar İnşa Etmek, İnsanları bir araya getirip uyumlu ve güvenilir bir ekip oluşturma konusunda doğal bir yeteneğe sahipsin. Varlığın, gruba istikrar ve güvenlik hissi katar. Farklı bireyleri bağlı ve uyumlu bir ortamda bir araya getirerek, insanların rahat ve desteklenmiş hissettiği bir atmosfer yaratabilirsin.\n\nBağlantıyı Güçlendirmek, Güvenilirliğin sayesinde ekip üyeleri arasında aidiyet hissini artırırsın. İnsanlar birbirlerine güçlü bir bağ hisseder, bu da grup içinde sadakati teşvik eder. Tutarlı bir yaklaşım sergileyerek, güven ve karşılıklı saygıya dayalı ilişkilerin gelişmesini sağlayabilirsin.\n\nGüvenilir Bir Çevre Yaratmak, Ekip içinde güven duygusu oluşturma yeteneğin çok değerli. İnsanlar birbirlerine güvenebildiklerinde, kendilerini güvende hisseder ve iş birliği içinde çalışmak için motive olurlar. Bu durum, liderlik ve ekip yönetimi rollerinde özellikle önemlidir, çünkü güven duygusu, daha yüksek verimlilik ve çalışan memnuniyeti sağlar.\n\nİş Dünyasında Yetkinliğini Kullanmak, İş dünyasında, güvenilirlik yetkinliğin ekip liderliği, insan kaynakları veya proje yönetimi gerektiren rollerde kullanılabilir. Tutarlı ve güvenilir yaklaşımın, grup dinamiklerini sağlamlaştırır ve uzun vadeli istikrarı garanti eder. Bağlantı ve güven oluşturma yeteneğini kucaklayarak, ekiplerin geliştiği, verimli çalıştığı ve birlikte büyüdüğü ortamlar yaratabilirsin.  ";

var guclu_yanlarin_5_1 = "Kültür Mimarı";
var guclu_yanlarin_5_2 = "Kapsayıcı ve Etkili Bir Ortam Yaratmak, Bir grubun kültürünü oluşturma konusunda doğal bir yeteneğe sahipsin. Grubun nasıl işlediğini düzenlemekten, insanların nasıl etkileşime girdiğini yönlendirmeye, giyim kurallarını ve toplantı saatlerini belirlemeye kadar olan süreçlerde etkili olabilirsin. Etkin, tutarlılık ve profesyonellik dolu bir atmosfer yaratmaya yardımcı olur.\n\nGrup Kimliğini Şekillendirmek, Yetkinliğin, bir grubun kendini nasıl tanımladığı üzerinde şekillendirici bir güce sahiptir. İnsanların nasıl iletişim kurduğundan, nelere odaklandıklarına kadar pek çok alanda söz sahibi olabilirsin. Grubun sözsüz kurallarını oluşturur, herkesin “burada işler böyle yürür” anlayışını benimsemesini sağlarsın. Bu tutarlılık, başarılı davranışları ve grupta aidiyet duygusunu teşvik eder.\n\nBaşarıyı Yapılandırma ile Desteklemek, Güvenilir kalıplar ve normlar yaratarak bireylerin kendilerini güvende ve desteklenmiş hissettiği bir ortam yaratırsın. Bu yerleşik uygulamalar, verimliliği artırır ve daha iyi grup dinamiklerine yol açar, böylece ekip üyelerinin gelişmesini sağlarsın. Davranış kalıplarını şekillendirmedeki rolün, başarılı ve uyumlu bir çalışma ortamının korunmasında hayati bir öneme sahiptir.\n\nİş Dünyasında Yetkinliğini Kullanmak, İş dünyasında, kültür oluşturma yetkinliğin insan kaynakları, ekip yönetimi ve organizasyon geliştirme ve liderlik gibi rollerde çok değerlidir. Uyumlu bir kültür oluşturarak, ekiplerin iyi performans gösterdiği, birbirine güvendiği ve ortak hedeflere ulaştığı ortamlar yaratmana yardımcı olursun. Tutarlı uygulamalar oluşturma yeteneğin, bir grubun iç işleyişinin sorunsuz ve etkili bir şekilde yürümesini sağlar, hem organizasyonun hem de çalışanların başarıya ulaşmasını kolaylaştırır. ";

var guclu_yanlarin_46_1 = "Harmoni Yaratıcısı";
var guclu_yanlarin_46_2 = "Ekibi Stabilize Etmek, Parçası olduğun ekibe doğal bir stabilite kazandırma yeteneğine sahipsin, bu da uyumlu ve iyi işleyen bir ekip oluşturmanı sağlar. Herkesin görevlere odaklanmasını ve hazır olmasını sağlayarak grubun karakterinin gelişmesine olanak tanırsın.\n\nOdaklanmak, Ekibi yapılması gereken işe odaklı tutarsın. Bu odak duygusunu yaratma yeteneğin, ekibin verimli kalmasına ve hedeflerine uyum sağlamasına yardımcı olur.\n\nDenge ve Uyumu Teşvik Etmek,  Ekibin dengeli ve uyumlu bir şekilde çalışmasını sağlarsın, böylece herkes müşterilerle, tedarikçilerle ve birbirleriyle rahatça etkileşime girebilir. Bu içsel uyum, pozitif bir çalışma ortamı yaratır ve güçlü dış ilişkiler kurar.\n\nDeğişime Uyum Sağlama, Koordinasyon becerilerin, grubun dış değişikliklere adapte olmasına yardımcı olur. Pazar değişiklikleri veya gelişen proje talepleri gibi durumlarda ekibin sorunsuz ve verimli bir şekilde uyum sağlamasına yardımcı olur, onları yeni zorluklara karşı çevik ve yanıt verebilir durumda tutabilirsin.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, grup koordinasyonu ve harmonizasyon yeteneğin proje yönetimi, ekip liderliği ve müşteri ilişkileri gibi rollerde kullanılabilir. Grubu stabil hale getirme ve dengeyi teşvik etme yeteneğin, verimli ekipler ve güçlü dış ilişkiler oluşturur. Uyum sağlama yeteneğini kucaklayarak, organizasyonunu değişimlerin üstesinden getirip sürekli başarıyı garanti edebilirsin.  ";

var guclu_yanlarin_29_1 = "Amaca Bağlayıcı";
var guclu_yanlarin_29_2 = "Takım Bağlılığını Güçlendirme, Bir grubu birleştirerek herkesi ortak bir hedefe yönlendirme konusunda doğal bir yeteneğe sahipsin. Varlığın, herkesin çalışmaya bağlı kalmasını sağlar ve ortak bir amaç ve adanmışlık duygusu yaratır.\n\nSadakat ve Güven Aşılamak, Takım içinde güçlü bir sadakat ve aidiyet duygusu oluşturabilirsin. Bağlılığı teşvik etme yeteneğin, herkesin grubun başarısına katkıda bulunma sorumluluğunu taşımasını sağlar. Bu, “Birimiz hepimiz, hepimiz birimiz için” ruhunu yansıtır.\n\nAdanmış Bir Takım Ortamı Yaratma, Varlığın, insanların takımın iyiliği için çalışmasını teşvik eder. Bireylerin sorumluluklarını yerine getirmesine ve uyum içinde iş birliği yapmasına yardımcı olursun. Bu, takımda yüksek düzeyde bağlılık ve sadakat sağlar.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, bağlılığı güçlendirme yetkinliğin ekip liderliği, proje yönetimi veya insan kaynakları gibi rollerde ve parçası olduğun tüm ekiplerde çok değerlidir. İnsanları bir araya getirip ortak bir hedefe bağlılıklarını sağlama yeteneğin, verimliliği artırır, sadakat oluşturur ve güven ortamı yaratır. Bu yetkinlik, uzun vadeli başarıyı elde etmek ve ekipleri motive edip odaklanmış tutmak için kritik önemdedir.  ";

var guclu_yanlarin_14_1 = "Kaynak Yaratıcı"
var guclu_yanlarin_14_2 = "Başarı İçin Kaynak Yaratmak, Bir işletmenin başarılı olması için gereken para, insan gücü veya gerekli malzemeler gibi kaynakları çekme ve üretme yeteneğine sahipsin. Varlığın, ekibin taahhütlerini yerine getirebileceği ve sözlerini tutabileceği güvenini verir. Bu yetkinlik, projelerin ilerlemesini ve hedeflerin karşılanmasını garanti eder.\n\nİş Başarısını Güvenceye Almak, Katkın ekip içinde bir güven duygusu yaratır çünkü insanlar başarmak istedikleri şeyleri elde edebileceklerine inanırlar. Ekibin ihtiyaç duyduğu para ve kaynakları sağlayabilir, uzun vadeli başarı ve istikrarın temelini oluşturursun.\n\nSözleri Gerçekleştirmek, Sen işin içinde olduğunda, insanlar ekibin gerekli olan her şeye sahip olacağına güvenirler. Hedeflere ulaşmak için gereken her şeyin mevcut olduğunu ya da üretilebileceğini bilerek, verimli ve motive olmuş bir ekip ortamı yaratabilirsin.\n\nİş Dünyasında Yetkinliğini Kullanmak, İş dünyasında, kaynak yaratma yetkinliğin kaynak yönetimi, proje yürütme ve finansal planlama gibi rollerde çok değerlidir. Ekibine gereken kaynakları toplayarak, işletmelerin planlanan hedeflerde ilerlemesini sağlayabilirsin. Bu yetkinlik, özellikle liderlik rollerinde önemli olup, organizasyonun  verimli ve üretken bir şekilde çalışmasını sağlar." 

var guclu_yanlarin_2_1 = "Yön Belirleyici";
var guclu_yanlarin_2_2 = "Başarı İçin Yön Belirleme, Bir işletme için net bir yön belirleme yeteneğine sahipsin ve ekibe mevcut kaynakların en iyi şekilde nasıl kullanılacağı konusunda rehberlik edersin. İçgörün, ekibin ürün veya hizmetlerini nasıl pazarlayacaklarını, geleceğe dair nasıl plan yapacaklarını ve günlük operasyonları hassasiyetle yönetmelerine yardımcı olur. Ekibi ortak bir vizyon etrafında hizalayarak, herkesin işin nereye gittiğini ve başarıya ulaşmak için kaynakların nasıl tahsis edilmesi gerektiğini bilmesini sağlarsın.\n\nBüyümeyi Destekleme, Planlama ve kaynak yönetimi konusundaki yetkinliğin, ekibin zaman ve parayı nereye yatırması gerektiğini görmesine olanak tanır. İşletmenin önceliklerini belirlemesine yardımcı olur ve kaynakları etkili bir şekilde tahsis ederek, ekibin doğru yolda ilerlemesini sağlarsın, zaman veya çaba boşa harcanmaz.\n\nKaynak Yönetimi, Ekibe kaynakları verimli bir şekilde kullanma konusunda rehberlik edebilir ve kapasitelerini anlamalarına ve akıllıca kullanmalarına yardımcı olabilirsin. Mevcut fonların veya malzemelerin en iyi kullanımını öngörme yeteneğin, finansal ve stratejik karar alma süreçlerinde kritik bir rol oynamanı sağlar.\n\nİş Dünyasında Yetkinliğini Kullanmak, İş dünyasında, vizyonun ve yön berlilemen ekiplerin hem uzun vadeli hedeflere odaklanmasına hem de kısa vadeli görevleri optimize etmesine olanak tanır. Liderlik, stratejik planlama veya finansal yönetim gibi alanlarda çalışsan da, sağladığın yön ile işletmelerin büyümesine katkıda bulunursun. Yetkinliğini kaynak tahsisini yönetmeye uygulayarak, projelerin yolunda gitmesini, hedeflerin karşılanmasını ve ekibin uyumlu kalmasını sağlayabilirsin.  ";

var guclu_yanlarin_1_1 = "Satış Ustası";
var guclu_yanlarin_1_2 = "Vizyonu Eyleme Dönüştürmek, Bir vizyonu eyleme geçirme yeteneğine sahipsin. Bu yetenek, fikirlerin somut sonuçlara dönüştüğü, ürün veya hizmetlerin müşterilere ulaştığı noktayı garanti eder. Yaratıcı stratejiler uygulayarak, ekibin çabalarının elle tutulur başarılar getirmesini sağlayabilirsin.\n\nSatışı Gerçekleştirmek, Ürün veya hizmetleri müşterilere ulaştırması sürecini yönetme konusunda beceriklisin. Etkili satış stratejileri ve pazarlama planları geliştirerek her şeyin hedef kitleye ulaşmasını garanti edersin. Operasyonların sorunsuz yürümesini sağlayarak, işlerin zamanında ve eksiksiz tamamlanmasını sağlarsın.\n\nSonuç Odaklı Olmak, Senin gücün, planların ve projelerin başarıyla uygulanmasını sağlamaktır. Stratejiler geliştirme ve bunları hayata geçirme becerin, satışların artmasını ve işlerin büyümesini destekler. Bu yetenek, iş dünyasında başarılı olmanın en kritik unsurlarından biridir.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında satış yetkinliğin, pazarlama, satış veya operasyon yönetimi gibi alanlarda çok değerlidir. Planları başarıyla hayata geçirme yeteneğin, ekibin vizyonunu gerçeğe dönüştürerek iş verimliliğini artırır. Bu yeteneğin, uzun vadeli iş başarısı ve müşteri memnuniyetini sağlamak için kilit rol oynar.  ";

var guclu_yanlarin_8_1 = "İmaj Yöneticisi";
var guclu_yanlarin_8_2 = "Görünürlük ve Bilinirlik Kazanmak Dikkat çekme ve ekibin ön plana çıkmasına yardımcı olma konusunda doğal bir yeteneğe sahipsin. Bu yetenek, ekibinin çabalarının ve başarılarının fark edilmesini ve takdir edilmesini sağlar. Ekibin hedeflerini tanıtmak için yaratıcı bir şekilde katkıda bulunarak, organizasyonun kalıcı bir izlenim bırakmasına yardımcı olursun.\n\nEkibin Çalışmalarını Tanıtmak Ekibin çalışmalarını öne çıkarma yeteneğin, olumlu bir imaj oluşturur. Ekibin ne yaptığını insanlara anlatmada ve bunu ilgi çekici bir şekilde sunmada iyisin. Bu, saygı ve takdir kazanan güçlü, tanınabilir bir marka oluşturulmasına yardımcı olur.\n\nRol Model Olmak ve İlham Vermek Grubun neyi temsil ettiğini göstermede ve öne çıkmada beceriklisin. Ekip değerlerini ve vizyonunu başkalarına nasıl aktaracağını göstererek bir rol model ve lider olarak hizmet edersin. Bu, meslektaşlarına ilham verir ve onları ortak hedeflere en iyi şekilde katkıda bulunmaya teşvik eder.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında yetkinliğin pazarlama, iletişim ve marka yönetimi gibi alanlarda çok önemlidir. Dikkat çekme ve ilgi yaratma becerin, ekibin tanınmasını, fırsatları yakalamasını ve güçlü bir itibar oluşturmasını sağlar. Bu yeteneğini etkili bir şekilde kullanarak, organizasyonunun anlamlı bağlantılar kurmasına ve başarıya ulaşmasına destek olabilirsin.";

var guclu_yanlarin_7_1 = "Stratejik Planlayıcı";
var guclu_yanlarin_7_2 = "Stratejik İleriye Yönelik Düşünme, Geleceğe başarılı bir şekilde ilerlemek için mantıklı ve ayrıntılı planlar yapma yeteneğine sahipsin. Yetkinliğin, ne yapılması gerektiğini belirlemede ve doğru kişilerin, doğru zamanda doğru işleri yapmasını sağlamada yatar. Etkili planlaman sayesinde grup, araştırma, geliştirme ve büyümeye yatırım yaparak gelecekteki başarıyı güvence altına alabilir.\n\nPazar Anlayışı, Planlama yeteneğin, grubun mevcut ihtiyaçlarının ötesine geçer. Pazar trendlerini belirlemeye, müşteri taleplerini anlamaya ve sektördeki ilerlemeleri takip etmeye yardımcı olursun. Bu öngörü, ekibin her zaman pazarın talepleriyle uyumlu olmasını ve gerektiğinde değişiklik yapabilmesini sağlar.\n\nKaynakların Verimli Kullanımı, Zaman çizelgelerini organize etme ve kaynakları verimli bir şekilde tahsis etme konusunda uzmansın. Doğru araçların, insanların ve malzemelerin yerinde olmasını sağlayarak ekibin odaklanmasını ve üretkenliğini artırabilirsin. Planlaman, çabaların boşa gitmesini en aza indirir ve çıktıyı maksimize ederek grubun hedeflerine ulaşmasını sağlar.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, stratejik planlama becerilerin stratejik planlama, operasyon yönetimi veya proje yönetimi ile ilgili rollerde çok değerlidir. Net bir yol haritası çizme yeteneğin, grubun hedeflerine ulaşmasını, son teslim tarihlerini karşılamasını ve projelerini başarıyla tamamlamasını sağlar. Planlama yeteneğin sayesinde işin uzun vadeli başarısını güvence altına alabilirsin.  ";

var guclu_yanlarin_31_1 = "Uygulama Ustası";
var guclu_yanlarin_31_2 = "Planları Verimli Şekilde Uygulamak, Bir planı alıp eyleme geçirme yeteneğin var. Ekibin her üyesinin görevlerini yerine getirmesini ve gereken işleri yapmasını sağlayabilirsin. Bu yetenek, işleri organize tutmayı ve hedeflerin sorunsuz bir şekilde gerçekleştirilmesini sağlamayı içerir.\n\nBaşarı İçin Roller Atamak, Ana yeteneklerinden biri, her ekip üyesine uygun bir rol vermek ve planın etkili bir şekilde uygulanmasını sağlamaktır. Doğru kişileri doğru rollere yerleştirerek projenin veya işin başarılı olmasını sağlayabilirsin.\n\nistemlerini Yönetmek, İşin verimli bir şekilde işlemesini sağlayan sistemler geliştirme ve yönetme yetkin var. Müşteri hizmetleri protokolleri oluşturmaktan çalışan el kitaplarına kadar, işin iç işleyişinin düzenli ve verimli olmasını sağlarsın.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, bu yetkinlik proje yönetimi, ekip koordinasyonu ve müşteri hizmetleri gibi rollerde çok değerlidir. İnsanları ve süreçleri organize etme becerin, planların verimli bir şekilde uygulanmasını sağlar ve daha iyi sonuçlara yol açar.";

var guclu_yanlarin_13_1 = "Rakam Stratejisti";
var guclu_yanlarin_13_2 = "Karlılık ve İş Sağlığını İzlemek, Bir işin finansal sağlığını takip etme konusunda kritik bir yeteneğe sahipsin. İster kar, zarar, ister kayıtların yönetimi olsun, yeteneğin işletmelerin sürdürülebilir bir şekilde büyümesine katkı sağlar.\n\nFinansal Büyümeyi Sağlamak, Bir işin karlı olup olmadığını belirlemede kilit rol oynarsın. Kârları, zararları ve genel finansal eğilimleri analiz ederek, şirketin büyümesi veya rekabetçi kalması için gerekli olan temel bilgileri sağlarsın.\n\nDetaylı Kayıtları Tutmak, Detaylı kayıtları yönetme yeteneğin, işletmenin finansal geçmişini takip etmesine yardımcı olur. Bu, fiyatlandırma, gelecekteki yatırımlar ve ürün geliştirme hakkında bilinçli kararlar almak için çok önemlidir. İnsanlar, net bir geçmişe sahip işletmelere güvenir ve sen bu güvenin doğru olarak  kazanıldığından emin olabilirsin.\n\nVerilerle Güveni Sürdürmek, Doğru ve güvenilir kayıtlar tutarak, müşterilere işletmeye olan güveni verirsin. Sağlam bir geçmişe sahip şirketler güven ve itibar kazandırır. Finansal doğruluğu sağlamadaki rolün, uzun vadeli güven inşa etmek için esastır.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, yetkinliğin finans, muhasebe, raporlama ve yönetimle ilgili rollerde paha biçilmezdir. Kârı izleme, finansal kayıtları yönetme ve önemli iş içgörüleri sağlama konusundaki uzmanlığın, organizasyonun sağlam bir finansal zeminde kalmasını sağlar.";

var guclu_yanlarin_33_1 = "Gözlem Ustası";
var guclu_yanlarin_33_2 = "Düzenli İşleyişi Sağlamak, Tüm operasyonları gözetim altında tutma ve her şeyin sorunsuz çalışmasını sağlama konusunda eşsiz bir yeteneğe sahipsin. Varlığın, görevlerin doğru bir şekilde tamamlanmasını, son teslim tarihlerine uyulmasını ve herkesin ne yapması gerektiğini bilmesini sağlar. Detaylara olan dikkatin, organizasyonun düzenini ve verimliliğini korumaya yardımcı olur.\n\nGeçmişten Ders Çıkarmak, Geçmişteki deneyimlerden öğrenerek, gelecekte başarıya ulaşmak için değerli dersleri uygulayabilirsin. Daha önce neyin işe yarayıp neyin yaramadığını gözlemleme yeteneğin, hataların önlenmesine ve süreçlerin iyileştirilmesine yardımcı olur.\n\nSorumluluğu Sağlamak, Gözetimin sayesinde insanlar işlerinden sorumlu kalırlar. Görevlerin planlandığı gibi tamamlanmasını ve karşılaşılan zorlukların ele alınmasını sağlarsın. İlerlemeyi izleme ve kontrol etme yeteneğin, hiçbir detayın gözden kaçmamasını sağlar ve ekibi hedefte tutar.\n\nİş Dünyasında Yeteneğini Kullanmak, İş dünyasında, operasyonları gözetme ve detayları yönetme yeteneğin, ekip liderliği veya yönetim gibi rollerde değerlidir. Politikalar oluşturabilir, şikayetleri etkin bir şekilde ele alabilir ve ekibinde sadakat duygusu yaratabilirsin. Bu yetkinlik, her şeyin zamanında ve en yüksek standartlarda yapılmasını sağlayarak verimliliği ve büyümeyi artırır.";

//Güçlü Yanların İngilizce
var guclu_yanlarin_57_10_eng_1 = "The Strength of “Perfected Form” (57-10) ";
var guclu_yanlarin_57_10_eng_2 = "You have the ability to “think on your feet” which is very valuable in dynamic business environments. You are great at creating and designing environments that ensure survival and provide protection from future uncertainties.\n\nPerfecting the Form You enjoy perfecting the form of things: yourself, art, music, writing, interior design, food, gardening, architecture – anything that comes into your realm, including your own and others’ behavior. This attention to detail and drive for perfection can lead to high-quality outputs in any professional field.\n\nLiving True to Yourself By simply living true to yourself, you create something healthy and beautiful with your life. This authenticity can inspire others and foster a positive and productive work environment. Your role is to create what you love and love what you create – including yourself and your life.\n\nUtilizing Your Strength in Business In roles that require creativity and design, your attention to detail and intuitive approach can lead to innovative and aesthetically pleasing outcomes. In leadership, your ability to embrace and perfect every aspect of your work can inspire your team to strive for excellence.\n\nYour strength of perfected form is a powerful asset in the business world, providing a unique blend of intuition, creativity, and a drive for perfection. By harnessing this strength, you can enhance productivity, foster a positive work environment, and drive your organization towards greater success. Embracing and developing this strength can lead to a fulfilling and impactful career.";

var guclu_yanlarin_20_10_eng_1 = "The Strength of “Higher Principles” (10-20)  ";
var guclu_yanlarin_20_10_eng_2 = "You are here to be an advocate of higher principled behaviors that, when recognized and invited, can guide those around you to be successfully aligned to their higher truth. Your need for self-integrity and voice of individual leadership can inspire others simply by being yourself.\n\nVoice of Leadership You have a need for self-integrity and can be a voice of individual leadership simply by being yourself. Speaking on behalf of everyone being themselves fosters a culture of authenticity and individual principles within your organization.\n\nPreferred Environment You prefer to be around others that share the same sensitivity to self-truth and a commitment to individual principles. This environment allows you to thrive and encourages others to maintain their integrity and unique perspectives.\n\nUtilizing Your Strength in Business Your strength of higher principles can be utilized in various domains within the business world. In leadership and advocacy roles, your integrity and commitment to principles can drive ethical decision-making and inspire others. In team settings, your authenticity fosters trust and collaboration, leading to a more cohesive and motivated team.\n\nYour strength of higher principles is a powerful asset in the business world, providing a unique blend of authenticity, integrity, and leadership. By harnessing this strength, you can inspire others, drive ethical practices, and lead your organization towards greater success. Embracing and developing this strength can lead to a fulfilling and impactful career.  ";

var guclu_yanlarin_6_59_eng_1 = "The Strength of “Interaction” (6-59)  ";
var guclu_yanlarin_6_59_eng_2 = "You have the capacity to easily penetrate the defenses of others, allowing you to create deep, meaningful bonds that can become highly supportive and productive. You can quickly and easily connect with others, making you an excellent communicator and networker. This ability to connect on a profound level is invaluable in team settings, client relationships, and leadership roles. By building trust quickly, you can foster strong, collaborative relationships that drive success. Your ease in connecting with people can open doors to new opportunities and partnerships.\n\nFacilitating Creativity By facilitating a sense of coziness and comfort, you pave the way for fertility in any creative endeavor. Your ability to create a welcoming and inclusive atmosphere encourages creative thinking and collaboration. This makes you an asset in brainstorming sessions, project teams, and any environment where innovation is key.\n\nUtilizing Your Strength in Business Your strength of interaction can be utilized across various domains in the business world. In team leadership, your ability to build deep connections fosters a cohesive and motivated team. In client relations, your skill in quickly establishing trust and rapport enhances customer satisfaction and loyalty. Additionally, in creative roles, your talent for facilitating a cozy, inclusive environment can drive innovation and collaboration.\n\nYour strength of logical process is a powerful asset in the business world, providing a unique blend of analytical rigor, critical thinking, and predictive accuracy. By harnessing this strength, you can provide invaluable insights and solutions that drive organizational success, you can drive informed decision-making, ensure operational excellence, and contribute to the strategic success of your organization.";

var guclu_yanlarin_45_21_eng_1 = "The Strength of “Leadership” (45-21)";
var guclu_yanlarin_45_21_eng_2 = "You have the ability to guide those around you safely into the future. Your leadership style is logical, based on tested and established patterns that can be followed with certainty. In a business setting, this logical leadership style helps you create clear, actionable plans that inspire confidence and trust in your team.\n\nEarning Trust To lead effectively, you must first earn trust. Trust is the foundation of your leadership, enabling you to build strong, cohesive teams. By demonstrating integrity, competence, and a genuine understanding of your team's needs and aspirations, you establish yourself as a trusted leader.\n\nRecognizing Patterns and Trends You must be recognized as someone who grasps present patterns, understands trends, and is in touch with the needs of the people. This ability allows you to stay ahead of the curve, anticipating changes and preparing your team for future challenges. Your keen insight into patterns and trends ensures that your leadership is both proactive and adaptive.\n\nInfluential Voice Your voice carries a quality of influence, and you must be invited by the majority to lead. Being elected to lead by your peers signifies their trust and confidence in your abilities.\n\nLeading Behind the Throne You also have the ability to lead with influence “behind the throne.” This subtle form of leadership allows you to guide and inspire without always being in the spotlight. By influencing decision-makers and shaping strategies from behind the scenes, you can drive significant change and progress.\n\nPointing the Way Forward You are here to point the way forward – not do it yourself – this is key to your success and maintaining a sense of well-being. Your role as a leader is to provide vision and direction, empowering others to take action. This approach not only maximizes your impact but also fosters a sense of ownership and responsibility among your team members.\n\nUtilizing Your Strength in Business Your strength of leadership can be utilized across various domains in the business world. In executive roles, your logical and trustworthy approach can steer your organization towards long-term success. In project management, your ability to recognize patterns and trends ensures that projects are aligned with future demands. Additionally, in advisory roles, your influence behind the throne can guide strategic decisions and foster a culture of continuous improvement.\n\nYour strength of leadership is a powerful asset in the business world, providing a unique blend of logical reasoning, trustworthiness, and influential guidance. By harnessing this strength, you can lead your organization safely into the future, inspire your team, and drive sustainable success. Embracing and developing this strength can lead to a fulfilling and impactful career, making a significant difference in any professional setting.";

var guclu_yanlarin_3_60_eng_1 = "The Strength of “Innovation” (3-60)";
var guclu_yanlarin_3_60_eng_2 = "This empowers you and those around you with the potential for change and something new. Blind faith is necessary in order to embrace this level of change, as it can happen suddenly and feel like a quantum leap. Your motto for life is “change happens when it’s meant to happen.”\n\nMoving from Chaos to Order Embrace the movement from chaos to order that is the inherent nature of innovation. This process of transformation requires patience and trust in the timing of events. Your ability to navigate and facilitate this transition is crucial in driving innovative projects and initiatives.\n\nCreative and Melancholic Process You are designed to move through a creative and melancholic process, a moodiness that comes and goes. It’s best for you to embrace your moods and simply watch where they take you. Your timing operates through a gut response, which is what will help lead you towards what is truly satisfying.\n\nUtilizing Your Strength in Business Your strength of innovation can be utilized across various domains in the business world. In product development, your ability to bring about significant changes can lead to groundbreaking innovations. In project management, your skill in moving from chaos to order ensures that projects are completed efficiently and creatively. Additionally, in roles that require problem-solving and strategic thinking, your innovative approach can drive the organization towards new and successful directions.\n\nYour strength of innovation is a powerful asset in the business world, providing a unique blend of creativity, resilience, and transformative potential. By harnessing this strength, you can drive significant changes, foster creative environments, and lead your organization towards new and innovative directions.";

var guclu_yanlarin_5_15_eng_1 = "The Strength of “Patterns & Rhythm” (5-15)";
var guclu_yanlarin_5_15_eng_2 = "This allows you to align with your flow and rhythm, making everything you do feel effortless and natural. This state of harmony allows you to perform at your best without strain, enhancing productivity and creativity in your work. Embracing your natural rhythms can lead to greater job satisfaction and effectiveness.\n\nHolding to Fixed Patterns You have the ability to hold to fixed patterns or routines that serve you. These routines provide structure and stability, enabling you to navigate your tasks with ease and consistency. In a professional setting, this ability helps you establish reliable processes and workflows that enhance efficiency and reduce stress.\n\nEmbracing Diversity in Patterns You also have the ability to identify and embrace the diversity of patterns in those around you, from fixed to extreme. This understanding allows you to work effectively with a variety of colleagues, appreciating their uniqueness. By recognizing and adapting to these differences, you can foster a more cohesive and collaborative work environment.\n\nPersonal Timing and Flow You have your own sense of timing and flow that is determined entirely by your personal inner rhythm. Be sure to not allow anything or anyone to interfere with your flow. Maintaining your rhythm is crucial for sustaining your productivity and well-being. Establishing boundaries and creating a supportive environment that respects your natural patterns can help you stay in your optimal state of performance.\n\nBenefiting Others You can subtly benefit those around you by bringing them into a correct rhythm and timing as well. Your ability to identify and align with the rhythms of others can create a more harmonious and productive team dynamic. By helping colleagues find their flow, you contribute to a more effective and satisfying work environment for everyone.\n\nUtilizing Your Strength in Business Your strength of patterns and rhythm can be utilized across various domains in the business world. In project management, your ability to establish and maintain effective routines can ensure timely and consistent progress. In team leadership, your understanding of diverse patterns can help you manage and motivate a diverse group of individuals. Additionally, in roles that require creative problem-solving, your natural flow can lead to innovative and efficient solutions.\n\nYour strength of patterns and rhythm is a powerful asset in the business world, providing a unique blend of harmony, structure, and adaptability. By harnessing this strength, you can enhance productivity, foster collaboration, and lead your organization towards greater success.";

var guclu_yanlarin_64_47_eng_1 = "The Strength of “Experiential Process” (64-47)";
var guclu_yanlarin_64_47_eng_2 = "You have the ability to learn and gain insights through direct experience. This hands-on approach allows you to understand complex situations deeply and practically. In the business world, this strength is invaluable in roles that require on-the-ground problem solving and adaptive learning.\n\nUnderstanding Patterns and Processes Your ability to experience and then reflect on those experiences helps you understand patterns and processes effectively. This insight allows you to make informed decisions and improve systems based on real-world feedback. Your experiential learning approach ensures that solutions are grounded in reality and practicality.\n\nAdaptability and Resilience Experiential learning fosters adaptability and resilience. By engaging directly with challenges, you develop the flexibility to adjust and respond to changing circumstances. This adaptability is crucial in dynamic business environments where conditions can shift rapidly.\n\nEffective Communication of Insights You can communicate your insights and experiences effectively to others, helping them understand complex concepts through practical examples. This skill is particularly useful in training and mentorship roles, where conveying practical knowledge can significantly enhance learning and development.\n\nUtilizing Your Strength in Business Your strength of experiential process can be utilized across various domains in the business world. In project management, your ability to adapt and learn from experience ensures that projects are managed effectively, even in unpredictable conditions. In operations, your hands-on approach can improve efficiency and problem-solving capabilities. Additionally, in roles that require training and development, your experiential insights can significantly enhance the learning experience.\n\nYour strength of experiential process is a powerful asset in the business world, providing a unique blend of practical understanding, adaptability, and effective communication. By harnessing this strength, you can drive continuous improvement, foster resilience, and lead your organization towards greater success.";

var guclu_yanlarin_27_50_eng_1 = "The Strength of “Custodianship” (Quantum 27-50)";
var guclu_yanlarin_27_50_eng_2 = "You have a natural ability to nurture and sustain resources, whether they are people, projects, or physical assets. This caretaking role ensures that everything under your supervision thrives and maintains its value. In the business world, this strength is valuable in roles that require long-term planning and maintenance.\n\nResponsibility and Stewardship: Your sense of responsibility and stewardship drives you to protect and manage resources effectively; You are committed to ensuring that resources are used wisely and preserved for future use; This makes you an excellent candidate for roles that involve sustainability, environmental management, and resource allocation.\n\nCommunity Building: You have the ability to foster strong, supportive communities; By creating environments where people feel valued and cared for, you enhance team cohesion and productivity; This skill is particularly useful in leadership roles, where building a positive organizational culture is essential.\n\nUtilizing Your Strength in Business: Your strength of custodianship can be utilized across various domains in the business world; You may be called to executive roles in large organizations; In facility management, your ability to maintain and improve physical assets ensures long-term operational efficiency; In human resources, your nurturing approach can enhance employee well-being and retention; Additionally, in sustainability roles, your commitment to responsible stewardship can drive organizational efforts to reduce environmental impact and promote sustainability.\n\nYour strength of custodianship is a powerful asset in the business world, providing a unique blend of nurturing care, responsible management, and long-term sustainability; By harnessing this strength, you can ensure the well-being and longevity of resources, foster strong communities, and lead your organization towards sustainable success; Embracing and developing this strength can lead to a fulfilling and impactful career, making a significant difference in any professional setting.";

var guclu_yanlarin_26_44_eng_1 = "The Strength of “Sales and Marketing” (Quantum 26-44)";
var guclu_yanlarin_26_44_eng_2 = "You have a natural ability to convey and communicate vital information clearly and effectively; This skill is crucial in roles that require constant interaction and information exchange, such as sales, marketing, and customer relations; Your ability to transmit messages accurately ensures that everyone is on the same page and that misunderstandings are minimized.\n\nEmotional Connection: Your strength allows you to connect emotionally with others, making your communication more impactful; By understanding and conveying emotions effectively, you can build strong relationships and foster a sense of trust and empathy; This is particularly valuable in leadership and team-building roles, where emotional intelligence is key.\n\nEnergy and Motivation: As a transmitter, you have the ability to convey energy and motivation to those around you; Your enthusiasm and passion can inspire and energize your team, driving them towards their goals; This ability to motivate others is essential in roles that require leadership and team management.\n\nInfluence and Persuasion: Your communication skills give you a powerful ability to influence and persuade others; Whether you are presenting a new idea, negotiating a deal, or leading a team, your persuasive abilities can help you achieve positive outcomes; This makes you a valuable asset in roles that involve negotiation, sales, and leadership.\n\nUtilizing Your Strength in Business: Your strength of sales and marketing can be utilized across various domains in the business world; In sales and marketing, your ability to communicate effectively and persuasively can drive customer engagement and sales growth; In leadership roles, your capacity to convey energy and motivation can inspire your team and foster a positive work environment; Additionally, in customer relations, your skill in building emotional connections can enhance customer satisfaction and loyalty.\n\nYour strength of sales and marketing is a powerful asset in the business world, providing a unique blend of effective communication, emotional intelligence, and motivational ability; By harnessing this strength, you can drive engagement, foster strong relationships, and lead your organization towards greater success.";

var guclu_yanlarin_32_54_eng_1 = "The Strength of “Ambition” (Quantum 32-54)";
var guclu_yanlarin_32_54_eng_2 = "You possess a relentless drive to achieve your goals and aspirations; This determination propels you forward, even in the face of obstacles and challenges; In the business world, this strength is invaluable in roles that require persistence, resilience, and a strong work ethic, such as entrepreneurship, sales, and leadership.\n\nGoal-Oriented: Your ambition is characterized by a strong focus on setting and achieving goals; You have a clear vision of what you want to accomplish and are willing to put in the necessary effort to make it happen; This goal-oriented approach ensures that you stay on track and maintain momentum towards your objectives.\n\nHigh Standards: You set high standards for yourself and strive for excellence in everything you do; This commitment to quality and improvement drives you to continually refine your skills and achieve outstanding results; In professional settings, your high standards inspire others to also aim for excellence.\n\nMotivating Others: Your ambitious nature can inspire and motivate those around you; By setting an example of hard work and dedication, you encourage your colleagues and team members to push their limits and strive for success; This ability to motivate others is particularly valuable in leadership roles, where fostering a culture of ambition can lead to significant organizational achievements.\n\nUtilizing Your Strength in Business: Your strength of ambition can be utilized across various domains in the business world; In entrepreneurship, your relentless drive and goal-oriented approach can help you turn ideas into successful ventures; In sales, your persistence and high standards can lead to exceptional performance and client satisfaction; Additionally, in leadership roles, your ability to motivate and inspire your team can drive overall organizational success.\n\nYour strength of ambition is a powerful asset in the business world, providing a unique blend of determination, high standards, and motivational ability; By harnessing this strength, you can achieve your goals, inspire those around you, and lead your organization towards greater success.";

var guclu_yanlarin_19_49_eng_1 = "The Strength of “Resources” (Quantum 19-49)";
var guclu_yanlarin_19_49_eng_2 = "You possess a natural ability to manage and allocate resources efficiently. This skill ensures that resources are used optimally and that all needs within the organization are met.\n\nEffective Resource Management Your strength in resource management helps to ensure that operations run smoothly and efficiently. By effectively distributing resources, you minimize waste and maximize productivity. This focus on efficiency is crucial in operational roles, where the goal is to streamline processes and improve overall performance.\n\nMeeting Needs You have an innate understanding of how to balance and meet the diverse needs of different stakeholders. This ability allows you to prioritize resource allocation in a way that supports the organization’s goals while addressing individual requirements. In customer service and project management, this skill is essential for maintaining satisfaction and delivering successful outcomes.\n\nAdaptability Your resourcefulness makes you adaptable to changing circumstances. You can quickly assess new situations and reallocate resources as needed to address emerging challenges. This adaptability is particularly valuable in dynamic environments where flexibility and quick thinking are required.\n\nUtilizing Your Strength in Business Your strength of resources can be utilized across various domains in the business world. In operations, your ability to manage resources efficiently can enhance productivity and reduce costs. In finance, your skill in budgeting and resource allocation ensures that funds are used effectively to support business objectives. Additionally, in project management, your understanding of resource needs and priorities can lead to the successful completion of projects.\n\nYour strength of resources is a powerful asset in the business world, providing a unique blend of efficiency, adaptability, and effective management. By harnessing this strength, you can ensure that resources are used optimally, operations run smoothly, and organizational goals are met."

var guclu_yanlarin_37_40_eng_1 = "The Strength of “Community” (Quantum 37-40)";
var guclu_yanlarin_37_40_eng_2 = "You have a natural ability to build and nurture strong, supportive networks. This skill is invaluable in roles that require teamwork, collaboration, and relationship management. By fostering a sense of community, you create environments where people feel valued and connected.\n\nBuilding Strong Networks Your strength in building community enhances collaboration and cooperation among team members. By creating a sense of belonging and mutual respect, you facilitate effective teamwork and improve overall productivity. This ability is crucial in leadership and project management roles where team cohesion is essential for success.\n\nSupportive Environment You excel at creating supportive environments where individuals can thrive. By understanding and addressing the needs of others, you ensure that everyone has the resources and support they need to succeed. This nurturing approach is particularly valuable in human resources and mentorship roles.\n\nFostering Loyalty Your ability to build strong communities fosters loyalty and commitment among team members and stakeholders. By creating a positive and inclusive culture, you encourage long-term engagement and dedication. This is essential in roles that require maintaining high levels of employee satisfaction and retention.\n\nUtilizing Your Strength in Business Your strength of community can be utilized across various domains in the business world. In team management, your ability to build supportive networks can enhance collaboration and productivity. In human resources, your focus on creating supportive environments can improve employee well-being and retention. Additionally, in customer relations, your skill in building strong relationships can enhance customer loyalty and satisfaction.\n\nYour strength of community is a powerful asset in the business world, providing a unique blend of relationship-building, collaboration, and support. By harnessing this strength, you can create environments where individuals and teams thrive, drive productivity, and foster loyalty."

var guclu_yanlarin_34_57_eng_1 = "The Strength of “Power” (Quantum 34-57)";
var guclu_yanlarin_34_57_eng_2 = "You have a natural ability to respond swiftly and decisively to challenges, which is a crucial skill in high-pressure business environments. Your intuition and body consciousness work together to guide you in making clear, quick decisions that are essential for leading teams and driving projects forward.\n\nOperational Efficiency You have a natural drive to keep things running smoothly, which may be valuable in operations management. You can swiftly identify issues and take immediate action to resolve them, ensuring that processes and systems are optimized and operational delays are minimized.\n\nCrisis Management Your acute sense of awareness allows you to remain composed and take action in crisis situations. This makes you a strong candidate for roles involving risk management, where timely responses to unpredictable circumstances are essential.\n\nProject Leadership In project management roles, your strength in power ensures that projects move forward efficiently. You can cut through distractions, make tough calls, and keep your team focused on the goal. This helps ensure deadlines are met, and results are delivered effectively.\n\nUtilizing Your Strength in Business Your strength of power can be leveraged to deliver significant impact. Your quick action capability is a key asset in fast-moving industries or environments where quick and clear responses are vital for success. By relying on your intuitive clarity and your ability to take fast action, you can drive major projects to completion, lead teams to victory, and keep the organization agile in the face of competition.\n\nYour strength of power is a powerful asset in the business world. Your ability to stay grounded and respond to each moment also makes you an excellent role model for inspiring others to act with confidence and purpose. As a result, you can motivate those around you to be more efficient, focused, and goal-oriented, creating a positive ripple effect across your team or organization.\n\n"

var guclu_yanlarin_34_20_eng_1 = "The Strength of “Charisma” (Quantum 34-20)";
var guclu_yanlarin_34_20_eng_2 = "You have a natural ability to captivate and influence those around you with your magnetic presence. This charisma draws people to you, making it easier to build strong relationships and gain support for your ideas. In the business world, this strength is invaluable in roles that require persuasion, networking, and leadership.\n\nInfluence and Persuasion Your charismatic nature allows you to influence and persuade others effectively. Whether you are leading a team, negotiating a deal, or presenting a new idea, your ability to connect with people and gain their trust is crucial. This makes you a valuable asset in sales, marketing, and executive leadership roles.\n\nBuilding Strong Relationships Charisma helps you build strong, lasting relationships with colleagues, clients, and stakeholders. By making others feel valued and understood, you create a positive and inclusive environment that fosters collaboration and loyalty. This relationship-building skill is essential in customer relations and team management.\n\nInspiring Others Your charisma can inspire and motivate those around you. By setting a positive example and demonstrating enthusiasm and confidence, you encourage others to strive for excellence and achieve their goals. This inspirational ability is particularly valuable in leadership roles, where motivating a team is key to success.\n\nUtilizing Your Strength in Business Your strength of charisma can be utilized across various domains in the business world. In sales and marketing, your persuasive abilities can drive customer engagement and sales growth. In leadership roles, your ability to inspire and motivate can lead to higher team performance and morale. Additionally, in networking and business development, your magnetic presence can open doors and create new opportunities.\n\nYour strength of charisma is a powerful asset in the business world, providing a unique blend of influence, relationship-building, and inspiration. By harnessing this strength, you can build strong networks, drive engagement, and lead your organization towards greater success."

var guclu_yanlarin_51_25_eng_1 = "The Strength of “Competitiveness” (Quantum 51-25)";
var guclu_yanlarin_51_25_eng_2 = "You possess a strong drive to excel and outperform others. This competitive spirit pushes you to continually strive for better performance and higher standards. In the business world, this strength is invaluable in roles that require high achievement and a focus on results, such as sales, marketing, and executive leadership.\n\nPursuit of Excellence Your competitiveness translates into a relentless pursuit of excellence. You set ambitious goals and are determined to achieve them, often pushing beyond conventional limits. This drive ensures that you and your team are always aiming for top-tier performance and continuous improvement.\n\nResilience and Determination Competitiveness fosters resilience and determination. You thrive in challenging environments and are not easily discouraged by setbacks. This resilience is crucial in roles that involve high stakes and constant pressure, enabling you to maintain focus and drive even in tough situations.\n\nInspiring Others Your competitive nature can inspire and motivate those around you. By setting high standards and demonstrating a commitment to excellence, you encourage your colleagues and team members to elevate their performance. This ability to inspire others is particularly valuable in leadership roles, where fostering a culture of high performance is key.\n\nUtilizing Your Strength in Business Your strength of competitiveness can be utilized across various domains in the business world. In sales and marketing, your drive to excel can lead to exceptional performance and market success. In leadership roles, your pursuit of excellence can set the tone for your organization, driving overall success. Additionally, in project management, your resilience and determination ensure that projects are completed successfully, even in the face of challenges.\n\nYour strength of competitiveness is a powerful asset in the business world, providing a unique blend of drive, resilience, and inspiration. By harnessing this strength, you can achieve high levels of performance, inspire your team, and lead your organization towards greater success.";

var guclu_yanlarin_1_8_eng_1 = "The Strength of “Inspiration” (Quantum 1-8)";
var guclu_yanlarin_1_8_eng_2 = "You have a unique ability to creatively express different perspectives. This can manifest through your presence or through various mediums that others can experience and appreciate. In the business world, this quality is invaluable for roles that require innovation, sales, marketing, and creative leadership.\n\nModeling Creative Self-Expression You are designed to model what it means to be a self-expressed, creative individual. This strength naturally attracts attention and admiration, making you a role model for creative empowerment. This is crucial in roles involving mentorship, team leadership, and creative direction.\n\nCourage to Stand Out It takes courage to stand out from the crowd, and your ability to do so inspires others to be equally bold. Your willingness to be different and take risks can drive innovation and encourage a culture of creativity within your organization. This courage is especially valuable in entrepreneurial ventures, product development, and strategic planning.\n\nChanging Perceptions Living authentically and creatively has the potential to change perceptions and free others to express their own uniqueness. Your influence can lead to a more inclusive and dynamic workplace where diverse ideas are valued and explored. This ability is vital in roles involving diversity and inclusion initiatives, public relations, and organizational development.\n\nYour strength of inspiration is a powerful asset in the business world, offering a blend of creative expression, courage, and influence. By harnessing this strength, you can drive innovation, inspire your team, and lead your organization towards greater success.\n\n";

var guclu_yanlarin_38_28_eng_1 = "The Strength of “Tenaciousness” (Quantum 38-28)";
var guclu_yanlarin_38_28_eng_2 = "You possess an unwavering determination that enables you to push through obstacles and stay focused on your goals. This tenacity is invaluable in roles that require resilience and persistence, such as project management, sales, and entrepreneurial ventures.\n\nOvercoming Challenges Your tenacious nature allows you to face and overcome significant challenges. You are not easily discouraged by setbacks and view them as opportunities to learn and grow. This strength is crucial in high-stakes environments where overcoming adversity is key to success.\n\nConsistent Effort Tenaciousness drives you to put in consistent effort towards your objectives. You are committed to your work and are willing to go the extra mile to achieve your goals. This level of dedication is essential in roles that require long-term commitment and sustained effort, such as research and development, strategic planning, and operations management.\n\nInspiring Others Your perseverance and determination can inspire and motivate those around you. By setting an example of unwavering commitment and hard work, you encourage your colleagues and team members to adopt a similar mindset. This ability to inspire is particularly valuable in leadership and mentorship roles.\n\nYour strength of tenaciousness is a powerful asset in the business world, providing a unique blend of determination, resilience, and inspiration. By harnessing this strength, you can overcome challenges, achieve your goals, and inspire your team to do the same."


// Kişilik Özelliklerin
var kslk_ozl_realistic_your_profile = "Gerçekçi";
var kslk_ozl_realistic_your_profile_ = "Pratik, uygulamalı problemler ve çözümler içeren iş aktivitelerinin tadını çıkarabilirsin. Bitkiler, hayvanlar ve ahşap, aletler ve makineler gibi gerçek dünya malzemeleriyle uğraşmayı sevebilirsin. Dışarıda çalışmaktan hoşlanabilirsin.";
var kslk_ozl_realistic_your_interests_1 = "Gerçekçi insanlar pratik, kendine güvenen ve mekanik işlere daha eğilimlidir. Gelenekseldirler ve görebildikleri ve dokunabildikleri şeylere değer verirler. Gerçekçi bireyler genellikle aletlerle çalışmak, makineleri çalıştırmak veya tarım ve hayvacılık için iyi gelişmiş becerilere sahiptir.";
var kslk_ozl_realistic_your_interests_2 = "Açık havada gerçekleşen ve fiziksel aktivite içeren işlerden hoşlanırlar. Somut problem çözmeyi içeren uygulamalı etkinliklerden hoşlandıkları için, insanlarla, soyut fikirlerle ve çok fazla veriyle uğraşmaktan kaçınmayı tercih ederler. Bir sorunla karşılaştıklarında sözel ya da kişilerarası çözümler yerine eylem odaklı çözümler üretirler.";
var kslk_ozl_realistic_your_work_areas = "Marangozlar, elektrikçiler, tamirciler, tesisatçılar; tarım ve ormancılık; askeriye.";
var kslk_ozl_realistic_you_may_not_like = "Topluluk önünde konuşma, sosyal etkinlikler, kültürel ve estetik faaliyetler, anlaşmazlıklarda arabuluculuk, yakın kişilerarası ilişkiler içeren çalışmalar.";
var kslk_ozl_12_25_realistic_questions_1 = "• Ellerimle bir şeyler yaptığımda (örneğin, bir proje hazırlarken ya da bir deney yaparken) kendimi nasıl hissediyorum? Bu yeteneğimi derslerde daha etkili kullanabilir miyim?";
var kslk_ozl_12_25_realistic_questions_2 = "• Pratik çözümler bulduğumda işlerimi daha kolay ve hızlı halledebiliyor muyum? Bu becerimi grup çalışmalarında nasıl öne çıkarabilirim?";
var kslk_ozl_12_25_realistic_questions_3 = "• Fiziksel aktiviteler yaptığımda veya açık havada çalıştığımda daha motive olduğumu fark ediyor muyum? Bu motivasyonu okul projelerine nasıl yansıtabilirim?";
var kslk_ozl_25_plus_realistic_questions_1 = "• Sorunları hızlı ve etkili bir şekilde çözmek, iş verimliliğimi nasıl etkiliyor? Bu yaklaşımı günlük iş akışımda daha fazla nasıl kullanabilirim?";
var kslk_ozl_25_plus_realistic_questions_2 = "• Açık hava veya fiziksel hareket gerektiren bir iş yaptığımda motivasyonumda bir artış oluyor mu? Bu motivasyonu işimde daha çok nasıl artırabilirim?";
var kslk_ozl_25_plus_realistic_questions_3 = "• İşimde ellerimle bir şeyler ürettiğimde veya somut sonuçlar aldığımda kendimi nasıl hissediyorum? Bu pratik beceriyi iş projelerimde daha iyi nasıl kullanabilirim?";

var kslk_ozl_researcher_your_profile = "Araştırıcı";
var kslk_ozl_researcher_your_profile_ = "Karmaşık sorunları çözmeyi içeren işlerin tadını çıkarabilirsin. Fikirleri keşfetmeyi, araştırma yapmayı ve teorilere bakmayı sevebilirsin. Yapmaktan çok düşünmeyi tercih edebilir ve verileri ve fikirleri insanlara tercih etme ihtimalin daha fazla olabilir.";
var kslk_ozl_researcher_your_interests_1 = "Araştırmacı insanlar meraklı, analitik ve entelektüeldir. Bir şeyleri araştırmayı severler ve karmaşık problemleri çözmek. Araştırmacı bireyler fikirleri keşfetmekten, yürütmekten hoşlanırlar.";
var kslk_ozl_researcher_your_interests_2 = "Tercih ettikleri okuma materyali bilimsel veya teknik dergileri içerir. Ayrıca yalnız çalışmaktan hoşlanabilirler. İnsanlar yerine veri ve fikirlerle çalışmayı tercih edebilirler. Sonuç olarak, liderlik, satış ya da başkalarını ikna gerektiren işlerden kaçınma eğilimindedirler.";
var kslk_ozl_researcher_your_work_areas = "Biyoloji, kimya, fizik, bilgisayar programlama, bilgisayar mühendisliği, tıp, farmakoloji, psikoloji, veterinerlik bilimi, teknik yazı.";
var kslk_ozl_researcher_you_may_not_like = "Satış, başkalarını ikna etme, insanları yönlendirme.";
var kslk_ozl_12_25_researcher_questions_1 = "• Zor sorularla karşılaştığımda nasıl bir çözüm yolu buluyorum? Bu problem çözme becerimi derslerde daha sık nasıl kullanabilirim?";
var kslk_ozl_12_25_researcher_questions_2 = "• Yeni şeyler öğrenmek ve araştırmak beni nasıl motive ediyor? Araştırmalarımı projelerde veya ödevlerde nasıl daha etkili kullanabilirim?";
var kslk_ozl_12_25_researcher_questions_3 = "• Zihinsel olarak zorlandığım bir konuda ne kadar derine inip öğrenmeyi seviyorum? Bu merakımı okulda hangi alanlarda daha fazla geliştirebilirim?";
var kslk_ozl_25_plus_researcher_questions_1 = "• Zorlu problemlerle karşılaştığımda, hangi çözüm yollarını kullanıyorum? Bu analitik düşünme becerimi iş yerinde daha sık nasıl uygulayabilirim?";
var kslk_ozl_25_plus_researcher_questions_2 = "• Detaylı araştırmalar yaptığımda işimde nasıl bir fark yaratıyorum? Bu merak duygusunu işimde daha fazla nasıl kullanabilirim?";
var kslk_ozl_25_plus_researcher_questions_3 = "• Karmaşık bir sorunu çözmek için derinlemesine düşündüğümde hangi yeteneklerimi geliştiriyorum? Bu problem çözme becerilerimi işimde daha çok nasıl öne çıkarabilirim?";

var kslk_ozl_artistic_your_profile = "Sanatsal";
var kslk_ozl_artistic_your_profile_ = "Formlar, tasarımlar ve desenler gibi şeylerin sanatsal yönüyle ilgilenen iş etkinliklerinin tadını çıkarırsın. İşinde kendini ifade etmeyi sevebilirsin. Net bir dizi kurala uymadan işin yapılabileceği ayarları tercih edebilirsin.";
var kslk_ozl_artistic_your_interests_1 = "Sanatsal insanlar yaratıcı ve yaratıcıdır. Kendilerini yaratıcı bir şekilde ifade etmek için güçlü bir arzuya sahip özgün, bağımsız insanlardır. Sanatsal bireyler estetiğe değer verir ve sanat, drama, yazı, dans ve müzik gibi yaratıcı etkinliklerden hoşlanırlar.";
var kslk_ozl_artistic_your_interests_2 = "Yeni fikirler geliştirmek için sezgilerini ve özgünlüklerini kullanmayı severler. Bu şekilde Araştırmacı insanlara benzerler. Bununla birlikte, bilimsel olanlardan çok kültürel-estetik arayışlarla ilgilenirler. Sanatsal insanlar, çeşitliliğin ve değişimin olduğu ortamlarda en fazla tatmini bulurlar. Yüksek düzeyde yapılandırılmış veya tekrarlayan iş faaliyetlerinden hoşlanmazlar. Verilerden veya somut şeylerden çok fikirlerle ve insanlarla ilgilenirler.";
var kslk_ozl_artistic_your_work_areas = "Müzisyenler, sanatçılar, grafik sanatçıları, reklam, tasarım, yazarlar/editörler, yaratıcılık gerektiren tüm alanlar.";
var kslk_ozl_artistic_you_may_not_like = "Tekrarlayan, yapılandırılmış görevler; çeşitlilik eksikliği; bilgi işleme; sayılarla çalışma.";
var kslk_ozl_12_25_artistic_questions_1 = "• Kendimi resim yaparak, yazı yazarak ya da başka yaratıcı yollarla ifade ettiğimde en çok hangi anlarda kendimi özgür hissediyorum? Bu yaratıcılığı ödevlerime nasıl ekleyebilirim?";
var kslk_ozl_12_25_artistic_questions_2 = "• Farklı fikirler bulduğumda arkadaşlarım ve öğretmenlerim nasıl tepkiler veriyor? Yaratıcı düşüncelerimi projelerde daha fazla nasıl gösterebilirim?";
var kslk_ozl_12_25_artistic_questions_3 = "• Sıkıcı bulduğum görevlerde yaratıcı bir dokunuş eklediğimde nasıl bir fark yaratıyorum? Yaratıcılığı günlük okul işlerine nasıl daha çok katabilirim?";
var kslk_ozl_25_plus_artistic_questions_1 = "• Yaratıcı bir çözüm ürettiğimde ya da özgün bir fikir sunduğumda iş yerinde nasıl geri bildirimler alıyorum? Bu yaratıcı bakış açısını projelerime daha fazla nasıl katabilirim?";
var kslk_ozl_25_plus_artistic_questions_2 = "• Rutin işler monotonlaştığında, işime daha yaratıcı bir dokunuş katmak performansımı nasıl etkiliyor? Yaratıcı düşünme tarzımı günlük görevlerde nasıl daha çok kullanabilirim?";
var kslk_ozl_25_plus_artistic_questions_3 = "• Yeni ve alışılmadık fikirler ürettiğimde, bu fikirlerin iş yerindeki katkılarını nasıl gözlemliyorum? Bu yaratıcı süreçleri projelerime nasıl daha sık entegre edebilirim?";

var kslk_ozl_social_your_profile = "Sosyal";
var kslk_ozl_social_your_profile_ = "Başkalarına yardımcı olan ve öğrenmeyi ve kişisel gelişimi teşvik eden iş etkinliklerinin tadını çıkarabilirsin. Nesnelerle, makinelerle veya verilerle çalışmak yerine insanlarla birlikte olmayı tercih edebilirsin. Öğretmeyi, tavsiye vermeyi, yardım etmeyi veya başka bir şekilde insanlara hizmet etmeyi sevme olasılığın çok yüksek.";
var kslk_ozl_social_your_interests_1 = "Sosyal insanlar arkadaş canlısı, dışa dönük ve anlayışlıdır. Kişisel etkileşim ve başkalarına yardım edebileceği işlerden hoşlanabilirler. İnsanlarla, veriden ve somut şeylerden çok daha fazla ilgilidirler. Sosyal bireyler yakın kişilerarası ilişkiler ararlar ve öğretmeyi severler. İnsan refahı konusunda endişeli olabilirler.";
var kslk_ozl_social_your_interests_2 = "Kişilerarası sorunların üstesinden gelmekten ve anlaşmazlıklarda arabuluculuk yapmaktan hoşlanabilirler. Makine veya alet kullanmaktan kaçınmaya eğilimlidirler.Kapsamlı entelektüel veya fiziksel çalışmalardan hoşlanmayabilirler.";
var kslk_ozl_social_your_work_areas = "Hemşirelik, Danışmanlık, Öğretim, Din";
var kslk_ozl_social_you_may_not_like = "Fiziksel çalışma; veri ve somut şeylerle uğraşmak; İnşa ve Onarım";
var kslk_ozl_12_25_social_questions_1 = "• Bir arkadaşımın problemini çözmesine yardım ettiğimde kendimi nasıl hissediyorum? Bu yardımlaşma yeteneğimi okul etkinliklerinde nasıl daha etkili kullanabilirim? ";
var kslk_ozl_12_25_social_questions_2 = "• Grup çalışmasında arkadaşlarımı motive ettiğimde işler nasıl ilerliyor? Bu motivasyon gücümü okul projelerinde daha fazla nasıl kullanabilirim?";
var kslk_ozl_12_25_social_questions_3 = "• Başkalarının neye ihtiyacı olduğunu anlamak, benim okul hayatımda nasıl avantajlar sağlıyor? Bu empatiyi daha çok nasıl geliştirebilirim?";
var kslk_ozl_25_plus_social_questions_1 = "• İş arkadaşlarıma yardım ettiğimde ya da onlara rehberlik ettiğimde, hangi becerilerim öne çıkıyor? Bu yardımseverliği iş hayatımda daha fazla nasıl kullanabilirim?";
var kslk_ozl_25_plus_social_questions_2 = "• Başkalarının ihtiyaçlarını anlamak ve uygun çözümler sunmak, işimde bana nasıl katkılar sağlıyor? Bu empatiyi iş yerinde daha da güçlendirmek için neler yapabtraditional";
var kslk_ozl_25_plus_social_questions_3 = "• Ekip çalışmalarında başkalarını motive ettiğimde, işlerin ilerleyişini nasıl etkiliyorum? Bu yeteneğimi daha fazla projeye nasıl yansıtabilirim? ";

var kslk_ozl_entrepreneur_your_profile = "Girişimci";
var kslk_ozl_entrepreneur_your_profile_ = "Projelerin başlatılması ve yürütülmesi, özellikle de ticari girişimler ile ilgili iş faaliyetlerinden daha çok keyif alabilirsin. İnsanları ikna etmeyi, yönlendirmeyi ve karar vermeyi seversin. Kâr için risk almayı tercih edebilirsin. Senin gibi insanlar düşünceden ziyade eylemi tercih edebilirler.";
var kslk_ozl_entrepreneur_your_interests_1 = "Girişimci insanlar ticari faaliyetlerden ve anlaşma yapmaktan hoşlanırlar. Kendine güvenen, iddialı, ikna edici ve enerjiktirler. Sözel yetenekli, Girişimci bireyler, sözel becerilerini başkalarını desteklemek için kullanan Sosyal bireylerin aksine, bu becerileri insanları ikna etmek için kullanırlar. Bir şeyler satmaktan, fikirleri tanıtmaktan ve insanları etkilemekten hoşlanırlar.";
var kslk_ozl_entrepreneur_your_interests_2 = "Ayrıca statü ve prestije değer verirler ve bu arzuları karşılayabilecek meslekler ararlar. Girişimci insanlar aynı zamanda rekabetçidir ve risk almaya isteklidir. Sonuç olarak, girişimci bir yapıya sahiptirler ve projeler başlatmayı ve başkalarını gemiye atlamaya ikna etmeyi severler. Girişimci bireyler, somut şeyler ve fikirler yerine, insanlarla ve verilerle çalışmaktan hoşlanırlar.";
var kslk_ozl_entrepreneur_your_work_areas = "İşletme yönetimi, satış, politika, küçük işletme sahibi, emlak";
var kslk_ozl_entrepreneur_you_may_not_like = "Yalnız çalışmak, entelektüel uğraşlara odaklanmak, karmaşık hesaplamalar yapmak, bilimsel ve matematiksel faaliyetler yapmak.";
var kslk_ozl_12_25_entrepreneur_questions_1 = "• Bir grup çalışmasında liderlik yapıp yönlendirdiğimde kendimi nasıl hissediyorum? Bu liderlik becerimi okulda hangi projelerde daha çok kullanabilirim?";
var kslk_ozl_12_25_entrepreneur_questions_2 = "• İnsanları ikna ettiğimde ve onları harekete geçirdiğimde neler başarıyorum? Bu ikna yeteneğimi okul aktivitelerinde daha sık nasıl kullanabilirim?";
var kslk_ozl_12_25_entrepreneur_questions_3 = "• Zor bir karar aldığımda, bu kararın sonuçları beni nasıl etkiliyor? Okulda risk almayı daha iyi nasıl yönetebilirim?";
var kslk_ozl_25_plus_entrepreneur_questions_1 = "• İnsanları motive edip yönlendirdiğimde projelerdeki ilerleme nasıl oluyor? Bu motivasyon becerilerimi iş yerinde daha etkili kullanmak için hangi yolları deneyebilirim? ";
var kslk_ozl_25_plus_entrepreneur_questions_2 = "• İşimde risk almayı gerektiren durumlarda, hangi stratejileri kullanıyorum ve sonuçları nasıl değerlendiriyorum? Risk yönetimimi daha da geliştirmek için neler yapabilirim? ";
var kslk_ozl_25_plus_entrepreneur_questions_3 = "• Karar alma süreçlerinde liderlik ettiğimde nasıl bir sonuç elde ediyorum? Bu liderlik becerimi iş yerimde hangi alanlarda daha çok kullanabilirim? ";

var kslk_ozl_traditional_your_profile = "Geleneksel";
var kslk_ozl_traditional_your_profile_ = "Belirlenen prosedürleri ve rutinleri takip eden iş aktivitelerini senin hoşuna gidebilir. Fikirlerden ziyade verilerle ve ayrıntılarla çalışmayı tercih edebilirsin. Yargıda bulunmaktan ziyade kesin standartların olduğu işleri tercih edebilirsin. Muhtemelen sen de diğerleri gibi otorite sınırlarının net olduğu yerlerde çalışmayı seversin.";
var kslk_ozl_traditional_your_interests_1 = "Geleneksel insanlar metodik, vicdanlı ve verimlidir. Doğrudurlar ve açıkça tanımlanmış prosedürleri takip etmeyi severler. İş yerinde, işlerin sorunsuz yürümesini sağlayan kural ve düzenlemelerden hoşlanırlar. Yapıyı ve düzeni belirsizliğe tercih ederler. Sonuç olarak, sistemler veya büyük kuruluşlar içinde iyi çalışırlar.";
var kslk_ozl_traditional_your_interests_2 = "Geleneksel insanlar kendileri için yüksek standartlara sahiptir, doğrudur ve ayrıntılara çok dikkat eder. Geleneksel bireyler, insanlardan ziyade verilerle ve şeylerle ilgilenir. Sonuç olarak, bir işletmenin muhasebe, kayıt tutma ve veri işleme gibi kağıt ve bilgisayar tabanlı yönleriyle çalışmayı tercih ederler.";
var kslk_ozl_traditional_your_work_areas = "Muhasebe, Bankacılık ve Finans, Büro / Sekreterlik, İşletme, Sigorta - Eksper / Sigortacı";
var kslk_ozl_traditional_you_may_not_like = "Belirsiz, yapılandırılmamış faaliyetler; kişilerarası sorunlarla başa çıkmak; çizim, resim, yaratıcı yazarlık, fotoğrafçılık; İçeren faaliyetler Kendini ifade etme";
var kslk_ozl_12_25_traditional_questions_1 = "• Ders çalışırken veya ödev yaparken kendimi ne kadar düzenli hissediyorum? Bu düzenli çalışma alışkanlığını sınav dönemlerinde nasıl daha iyi kullanabilirim?";
var kslk_ozl_12_25_traditional_questions_2 = "• Detaylara dikkat ettiğimde işlerimi daha iyi mi yapıyorum? Bu dikkatimi projelerde ve ödevlerde nasıl daha çok kullanabilirim?";
var kslk_ozl_12_25_traditional_questions_3 = "• Planlı olduğumda zamanımı daha iyi yönetebiliyor muyum? Bu planlama becerisini okul hayatımda daha fazla nasıl kullanabilirim?";
var kslk_ozl_25_plus_traditional_questions_1 = "• Düzenli ve sistematik bir şekilde çalıştığımda işlerimi ne kadar daha verimli yapıyorum? Bu düzenli çalışma alışkanlığımı daha büyük projelere nasıl yayabilirim? ";
var kslk_ozl_25_plus_traditional_questions_2 = "• Planlı ve organize olduğumda iş yerindeki zamanımı nasıl daha iyi yönetiyorum? Bu planlama becerisini iş hayatımda nasıl daha geniş çapta uygulayabilirim? ";
var kslk_ozl_25_plus_traditional_questions_3 = "• Detaylara gösterdiğim özen, iş yerimde hangi farkları yaratıyor? Bu dikkatimi projelerimde daha etkili nasıl kullanabilirim? ";

//Kişilik Özelliklerin İngilizce
var kslk_ozl_realistic_eng_your_profile = "Realistic"
var kslk_ozl_realistic_eng_your_profile_ = "Enjoy work activities that include practical, hands-on problems and solutions. You may like dealing with plants, animals, and real-world materials, like wood, tools, and machinery. You may enjoy outside work.";
var kslk_ozl_realistic_eng_your_interests_1 = "Realistic people are practical, self-reliant, and mechanically inclined. They tend to be traditional and value things they can see and touch. Realistic individuals usually have well developed skills for working with tools, operating machines or raising animals. They enjoy work that happens outdoors and involves physical activity.";
var kslk_ozl_realistic_eng_your_interests_2 = "They also like adventurous activities such as riding roller coasters or sky diving. Since they enjoy hands-on activities that involve concrete problem solving, they would rather avoid dealing with people, abstract ideas and lots of data. When faced with a problem, they come up with action oriented solutions instead of verbal or interpersonal ones.";
var kslk_ozl_realistic_eng_your_work_areas = "trades people – carpenters, electricians, mechanics, plumbers; agriculture and forestry; engineering; military";
var kslk_ozl_artistic_eng_you_may_not_like = "public speaking, social events, cultural and aesthetic activities, mediating disputes, work that involves close interpersonal relationships";
var kslk_ozl_12_25_realistic_eng_questions_1 = "• How do I feel when I work with my hands (e.g., when preparing a project or conducting an experiment)? Can I use this skill more effectively in class?";
var kslk_ozl_12_25_realistic_eng_questions_2 = "• Do I finish tasks more quickly and easily when I find practical solutions? How can I highlight this ability during group work?";
var kslk_ozl_12_25_realistic_eng_questions_3 = "• Do I notice that I feel more motivated when doing physical activities or working outdoors? How can I bring this motivation into school projects?";
var kslk_ozl_25_plus_realistic_eng_questions_1 = "• How do I feel when I produce something with my hands or achieve tangible results at work? How can I better utilize this practical skill in my work projects?";
var kslk_ozl_25_plus_realistic_eng_questions_2 = "• How does solving problems quickly and effectively impact my work efficiency? How can I incorporate this approach more into my daily workflow?";
var kslk_ozl_25_plus_realistic_eng_questions_3 = "• Do I experience increased motivation when working outdoors or engaging in physical activities? How can I boost this motivation more in my work?";



// İş Yaşamında Rolün
var is_y_r_1_s2_0 = "Otorite/Öncü";
var is_y_r_1_s2_1 = "Keşfeden Uzman";
var is_y_r_1_s2_1_1 = "Hayatın, seni ilgilendiren konularda derinlemesine keşifler yaparak ve deneyimlerden sürekli öğrenerek ilerlediğin bir yolculuk. Deneme yanılma yöntemiyle neyin işe yarayıp yaramadığını keşfederek doğal bir şekilde uzmanlık geliştirirsin. Bu pratik yaklaşım, seni seçtiğin alanda otorite olma yolunda nitelikli kılar. İster kariyerine yeni başlıyor ol, ister halihazırda köklü bir işe sahip ol, ayrıntıları anlamaya, sağlam bir temel oluşturmaya ve gerçek dünyadaki deneyimlerle ustalık kazanmaya yönelik bir arzu seni yönlendirir.";
var is_y_r_1_s2_2 = "İş Hayatında Güçlü Yönlerin";
var is_y_r_1_s2_2_1 = "En büyük gücün, çözüm bulana kadar araştırma ve deneme yeteneğinde yatar. Herhangi bir işte, sorunlara merakla ve kararlılıkla yaklaşır, her zaman daha derinlere inmeye ve en iyi yolu keşfetmeye istekli olursun. Zorlukların üstesinden gelme ve hatalardan öğrenme yeteneğin seni farklı kılar, başkalarının tavsiye ve içgörü almak için başvurduğu biri yapar. Zamanla, alanında derin bir anlayış geliştirirsin ve bu da seni yaşın veya deneyim seviyen ne olursa olsun bir otorite yapar.";
var is_y_r_1_s2_3 = "Otorite / Öncü Olmak";
var is_y_r_1_s2_3_1 = "İlgini gerçekten çeken konularda uzmanlık geliştirerek bir otorite olabilirsin. Bu pratik öğrenimlerin ile ustalaşmak ve bilgini başkalarıyla paylaşmakla ilgilidir. İnsanlar, derin anlayışın ve çözümler bulma yeteneğinden dolayı sana başvurur. İster bir ekiple çalış ister kendi projelerini yürüt ister daha büyük bir organizasyona katkıda bulun, gücün, başkalarının güvenebileceği sağlam, deneyime dayalı içgörüler sunmada yatar.";
var is_y_r_1_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_1_s3_1_1 = "Fırsatların, zorluklarla doğrudan yüzleşme isteğinden doğabilir. Yeni fikirleri veya süreçleri keşfetme, test etme ve geliştirme fırsatın olduğu durumlarda gelişir, ilerlersin. Henüz sağlam bir temel oluşturmadığında kendini güvensiz hissettiğin zamanlar olabilir. Bu hissiyat kendini geliştirme sürecinin bir parçasıdır—rolün, bu temeli deneyimlerinle inşa etmektir. Zamanla, bu zorluklar uzmanlık yolundaki basamak taşların haline gelecektir.";
var is_y_r_1_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_1_s3_2_1 = "Rolün, deneyimlerini kullanarak güçlü yönlerinle uyumlu bir hayat ve kariyer inşa etmekle ilgilidir. Yolculuğun boyunca karşılaştığın iniş ve çıkışlar sayesinde, alanında ustalık kazanmaya devam edeceksin. Öğrendiklerini paylaşarak ve anlayışına sıkı sıkıya tutunarak, başkalarına değerli içgörüler sunarak hayat amacını doğal olarak yerine getireceksin. İster kariyerine yeni başlıyor ol, ister yolunda çok ilerlemiş ol, rolünü benimsemek daha fazla özgüven, tatmin ve başarıya ulaşmanı sağlayacaktır.";

var is_y_r_2_s2_0 = "Otorite/Etkileyici";
var is_y_r_2_s2_1 = "Bilge Bağlanıcı";
var is_y_r_2_s2_1_1 = "Kendini alanında bir uzman olarak kanıtlama ihtiyacı ve bilgilerini, içgörülerini başkalarıyla paylaşma arzusu seni yönlendirir. Doğal olarak meraklısın ve ilgi duyduğun herhangi bir konunun temellerini araştırmayı ve anlamayı seversin. Sağlam bir temel oluşturduktan sonra, öğrendiklerini paylaşarak başkalarını etkilemekten ve yönlendirmekten keyif alırsın. Yolculuğun hem konunda ustalaşmayı hem de fikirlerini yaymak ve etkilemek için doğal ağ kurma yeteneğini kullanmayı içerir.";
var is_y_r_2_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_2_s2_2_1 = "Gücün, konuları derinlemesine araştırma ve ardından bulgularını başkalarıyla bağlantı kurabilecek şekilde iletişim kurma yeteneğinde yatar. İş dünyasında, ilişkiler kurmakta ve uzmanlığından faydalanabilecek insanlarla ağ oluşturmakta başarılısın. Fikirlerini meslektaşlarınla paylaşmak, bir projeye katkıda bulunmak ya da bir ekibi yönlendirmek olsun, doğal etki yaratma yeteneğin seni önemli bir oyuncu yapar. Kişisel bilginle sosyal bağlantılarını birleştirme yeteneğin, seni hem otorite hem de iş dünyasında güvenilen bir kaynak olarak öne çıkarır.";
var is_y_r_2_s2_3 = "Otorite ve Etkileyici Olma";
var is_y_r_2_s2_3_1 = "Otorite olmak, doğal ilerlemenle birlikte gelir ve gücün aynı zamanda başkalarını etkileme yeteneğinde de yatar. İnsanlar, uzmanlığına ve samimi, yaklaşılabilir doğana çekilir. Güçlü ağlar kurma eğilimindesin ve fırsatlar genellikle bu bağlantılar aracılığıyla sana gelir. İster kendi başına çalış ister bir ekibin parçası ol, başarın, derin bilginle başkaları üzerinde etkili olma ve yakın çevrenle bağlantı kurma yeteneğinden gelir. Güçlü bir temel ile sosyal etkinizi birleştirerek, çevreni şekillendirme ve kendin için fırsatlar yaratma potansiyeline sahipsin.";
var is_y_r_2_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_2_s3_1_1 = "Fırsatların hem sağlam bilgin hem de bağlantıların sayesinde gelir. Bir konuyu derinlemesine öğrenip ardından bu bilgiyi başkalarıyla paylaşabileceğin durumlarda gelişirsin. Fikir sunmak, meslektaşlarına mentorluk etmek veya bir projeyi yönetmek olsun, başkalarıyla iletişim kurma ve bağlantı sağlama yeteneğin seni farklı kılar. Doğal arkadaş canlılığını yalnız kalma ihtiyacıyla dengelemek önemlidir. Bazen insanlar yorgunluğu veya sürekli 'aktif' olma baskısı seni zorlayabilir, bu yüzden kendine zaman ayırmayı ve enerjini yenilemeyi unutma.";
var is_y_r_2_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_2_s3_2_1 = "Rolün, alanında ustalaşmak ve ardından bu bilgiyi başkalarının yararına olacak şekilde paylaşmakla ilgilidir. Hayat amacını, bir başvuru kaynağı haline gelerek ve ağlarını fikirler ve çözümler yaymak için kullanarak gerçekleştirirsin. Rolünle uyum içinde olduğunda, kariyerinin ve hayatının doğal olarak başkalarını etkileme fırsatlarını sana sunduğunu fark edeceksin. İster kariyerine yeni başlıyor ol, ister halihazırda yerleşmiş ol, rolünün hem otorite hem de etkileyici taraflarını benimsemek, tatmin edici ve etkili bir kariyere yol açacaktır.";

var is_y_r_3_s2_0 = "Doğal/Etkileyici";
var is_y_r_3_s2_1 = "Yetenekli Bağ Kurucu";
var is_y_r_3_s2_1_1 = "Doğuştan gelen yeteneklere sahipsin ve bu yetenekler senin için çabasız gibi görünse bile başkaları onları kolayca fark eder. Bu yetenekler o kadar doğal gelir ki bazen onları göz ardı edebilirsin, ancak başkaları uzmanlığını paylaşman için sık sık sana başvurur. Rolün, doğal yeteneklerini benimsemek ve başkalarıyla anlamlı bağlantılar kurmak arasında bir denge bulmakla ilgilidir. İlgi alanlarına odaklanmak için yalnız kalmayı seviyorsun, ancak etkilerin yakın çevrenle etkileşim kurduğunda artar.";
var is_y_r_3_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_3_s2_2_1 = "Derin, kişisel bağlantılar kurma yeteneğin, kariyer ve iş fırsatlarını doğal olarak sana çeker. Öne çıkmak için çok çalışmana gerek kalmaz; sana kolay ve doğal gelen şeylere sadık kaldığında başarılı olursun. Bu da seni ister bağımsız çalış ister bir ekibin parçası ol, değerli kılar. Hem yalnız çalışmalarda hem de sosyal ortamlarda rahatça hareket edebilir ve iş dünyasında oluşturduğun güven ve getirdiğin yetenekler sayesinde başarı elde edersin.";
var is_y_r_3_s2_3 = "Doğal / Etkileyici Olmak";
var is_y_r_3_s2_3_1 = "Liderlik ya da etki peşinde koşmana gerek yok—bu, başkalarının seni takdir etmesiyle sana gelir. Çaba gerektirmeyen şeylere odaklanarak, doğal yeteneklerinin parlamasına izin verirsin. İnsanlar sıcaklığına ve samimiyetine çekilir ve etkilerin ilişkilerin aracılığıyla doğal olarak büyür. Başarı, fırsatların ağların aracılığıyla sana akmasına izin verdiğinde ve doğal güçlü yönlerinle uyumlu rolleri üstlendiğinde gelir.";
var is_y_r_3_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_3_s3_1_1 = "En büyük fırsatların, başkalarının yeteneklerini fark edip bunları paylaşman için seni davet etmesiyle ortaya çıkar. Yeteneklerinin yeterli olduğuna güvenmeli ve zorlayıcı rolleri üstlenmekten kaçınmalısın. Bazen başkalarıyla derin bağlantıların, insanlardan yorulmana neden olabilir ya da her zaman ulaşılabilir olma baskısı hissedebilirsin. Yalnızlık ile sosyal etkileşim arasındaki dengeyi koruman, enerjini yüksek tutmak ve uzun vadeli başarıyı sağlamak için çok önemlidir.";
var is_y_r_3_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_3_s3_2_1 = "Rolün, yeteneklerini otantik ve sana uygun bir şekilde paylaşmakla ilgilidir. Doğal yeteneklerinle uyumlu fırsatlara kendini davet ettirerek, kendini zorlamadan tatmin edici bir kariyer veya iş hayatı yaratabilirsin. Doğal yeteneklerine güven ve başkalarının değerinin farkına varmasına izin ver. Bu yaklaşım hem etkili hem de tatmin edici bir kariyer ve yaşam yoluna seni götürecektir.";

var is_y_r_4_s2_0 = "Doğal/Haberci"; 
var is_y_r_4_s2_1 = "Yetenekli Çözüm Yaratıcı";
var is_y_r_4_s2_1_1 = "Derin, doğal yeteneklere sahipsin ve bu yetenekler genellikle senin farkına varmadığın ama başkaları tarafından büyük değer verilen yeteneklerdir. Yeteneklerin, özellikle pratik çözümlere ihtiyaç duyulduğunda, başkalarının yardımına başvurduğu anlarda kendini gösterir. Sessiz ve bağımsız çalışmayı tercih etsen de içgörülerinin büyük bir etki yaratabileceği durumlara sıkça çekilirsin. Rolün, yalnız kalma arzun ile başkalarına değerli çözümler sunma ve iletişim kurma yeteneğin arasında bir denge kurmayı gerektirir.";
var is_y_r_4_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_4_s2_2_1 = "Gücün, ihtiyaç duyulduğunda yenilikçi ve pratik çözümler sunabilme yeteneğinde yatar. Takdir edilmeyi aramana gerek yoktur—etkin, başkalarının yeteneklerini fark edip onları paylaşman için sana başvurduğunda büyür. Problem çözmede başarılısın ve genellikle “düzeltici” olarak görülürsün; gerekli içgörüleri sunar ve sonra sessiz, düşünceli çalışma alanına geri dönersin. Bu yetenek, pratik ve zamanında çözümlerin kritik olduğu iş ortamlarında seni vazgeçilmez kılar.";
var is_y_r_4_s2_3 = "Doğal / Haberci Olmak";
var is_y_r_4_s2_3_1 = "Rolün, başkalarının seni fark etmesiyle doğal olarak ortaya çıkar. Dikkat çekmek ya da görüşlerini başkalarına dayatmaya çalışan biri değilsin. Bunun yerine, başkaları senin derin ve pratik tavsiyeler sunma yeteneğini fark ettiğinde etkin artar. Sana ihtiyaç duyulduğunda, devreye girer, etkili çözümler sunar ve sonra doğal ritmine geri dönersin. Başarı, sürecine güvenip başkalarının en çok ihtiyaç duyduğu anda uzmanlığını aramalarına izin verdiğinde gelir.";
var is_y_r_4_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_4_s3_1_1 = "Fırsatların genellikle insanların, sorunlarını çözmelerine yardımcı olabileceğine inandıkları zaman beklentilerini sana yansıttıkları anlarda ortaya çıkar. Bu yansıtma hem bir fırsat hem de bir zorluk olabilir, çünkü bazen bunlar seni bunaltıcı veya zorlayıcı hissettirebilir. Görevin, hangi fırsatların gerçek yeteneklerinle uyumlu olduğunu ve hangilerinin enerjini tüketebileceğini ayırt etmektir. Yalnız kalma ihtiyacın ile başkalarına çözüm sunma eğilimin arasında denge kurmak, başarıyı sürdürülebilir kılmanın anahtarıdır.";
var is_y_r_4_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_4_s3_2_1 = "Rolün, yeteneklerinin doğru insanlar tarafından doğru zamanda fark edileceğine güvenmekle ilgilidir. Hayat amacını, en çok ihtiyaç duyulduğunda pratik çözümler sunarak ve katkıda bulunduktan sonra kendine geri çekilme alanı tanıyarak gerçekleştirirsin. Takdirin akışına güvenip doğru hissettiren fırsatlarla uyum sağlayarak ve ne zaman geri çekileceğini bilerek kariyerinde ve kişisel hayatında tatmin bulacaksın. Başarı, doğal yeteneklerini zorlamadan kabul ettiğinde gelir.";

var is_y_r_5_s2_0 = "Öncü/Haberci";
var is_y_r_5_s2_1 = "Keşfeden Çözümcü";
var is_y_r_5_s2_1_1 = "Değişimin doğal bir temsilcisisin. Neyin işe yarayıp yaramadığını kişisel deneyimlerle keşfetmeye yönelirsin ve genellikle deneme yanılma yoluyla öğrenirsin. Bu pratik yaklaşım, başkalarının fark edemediği pratik çözümleri bulmana olanak tanır. Dayanıklısın, uyum sağlarsın ve hayatın karşına çıkardığı zorluklardan öğrenebilirsin. Bir kez neyin işe yaradığını keşfettiğinde, bu içgörüleri başkalarıyla paylaşırsın, bu da seni ihtiyaç anlarında değerli bir kaynak haline getirir.";
var is_y_r_5_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_5_s2_2_1 = "Gücün, süreçleri deneme ve geliştirme yeteneğinde yatar, ta ki neyin işe yaradığını bulana kadar. Yenilik ve pratik çözümlerin gerektiği durumlarda başarılı olursun ve risk almaktan ya da hata yapmaktan korkmazsın. İş dünyasında, insanlar sık sık, özellikle başkaları bir çözüm bulmakta zorlandığında, senin sorunları çözme yeteneğine güvenir. Dayanıklılığın ve cevap bulma konusundaki kararlılığın seni diğerlerinden ayırır ve bulgularını başkalarına iletme yeteneğin, seni herhangi bir ekip veya organizasyonda kilit bir katılımcı yapar.";
var is_y_r_5_s2_3 = "Öncü / Haberci Olmak";
var is_y_r_5_s2_3_1 = "Rolün, yeni çözümler bulmanın yanı sıra, bunları başkalarıyla paylaşmayı da içerir. Farklı fikirleri test etmeye, uyarlamaya ve deney yapmaya doğal bir eğilimin vardır ve bir kez işe yarayan bir şey bulduğunda, bunu yaymaya hevesli olursun. Etkin, tanınma arzusundan değil, sunduğun pratik çözümlerden gelir. Yeni bakış açıları masaya getirip bilgilerin ve deneyimlerinle başkalarına yardımcı olabildiğinde gelişirsin.";
var is_y_r_5_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_5_s3_1_1 = "Fırsatlar genellikle zorluklar veya krizler şeklinde gelebilir. Bir şeylerin neden yanlış gittiğini anlamaya ve bunları nasıl düzelteceğini bulmaya çalışırken en iyi performansını sergilersin, süreçte ellerini kirletmekten çekinmezsin. Ancak, sürekli deneme ve öğrenme arzun, kendine dinlenme zamanı vermezsen tükenmişliğe yol açabilir. Keşif ihtiyacın ile kendine özen gösterme ihtiyacın arasındaki dengeyi korumak, enerjini ve odaklanmanı sürdürmek için çok önemlidir.";
var is_y_r_5_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_5_s3_2_1 = "Rolün, deneyimlerini kullanarak pratik çözümler bulmak ve ardından bu içgörüleri başkalarıyla paylaşmaktır. Hayat amacını, zorlukları kucaklayarak, onlardan öğrenerek ve başkalarına bilgeliğinle yardımcı olarak yerine getirirsin. İster iş hayatında ister kişisel yaşamında olsun, belirsizlik zamanlarında başkalarının başvurduğu birisin. Çözümler bulma ve bunları etkili bir şekilde paylaşma yeteneğine güvenerek, tatmin edici ve etkili bir kariyer yaratacaksın. Başarı, güçlü yönlerine yaslandığında ve doğal problem çözme yeteneklerinin parlamasına izin verdiğinde gelir.";

var is_y_r_6_s2_0 = "Öncü/Lider";
var is_y_r_6_s2_1 = "Keşifçi Rol Model";
var is_y_r_6_s2_1_1 = "Hayatın, deneyimlerinden sürekli öğrenip geliştiğin bir dizi aşama boyunca ilerler. Hayatının başlarında deneme yanılma yöntemiyle öğrenir, neyin işe yarayıp neyin yaramadığını bizzat yaşayarak keşfedersin. Bu deneyimler, seni pratik bir problem çözücü yaparak derin içgörüler kazanmana yardımcı olur. Olgunlaştıkça, aktif bir katılımcı olmaktan daha bağımsız bir gözlemci ve lider olmaya geçersin. Bu benzersiz yolculuğun, başkalarına rehberlik ederken onlara gerçek dünya deneyimlerinden kazandığın bilgileri sunmanı sağlar.";
var is_y_r_6_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_6_s2_2_1 = "Gücün, deneyimlerden öğrenme ve uyum sağlama yeteneğinde yatar. İş dünyasında, zorluklarla yüzleşmek ve yenilikçi çözümler bulmakta mükemmelsin. Kariyerinin ilk yıllarında, daha çok deneme ve hatalardan öğrenmeye odaklanabilirsin, ancak zamanla, başkalarının rehberlik ve liderlik için başvurduğu biri haline gelirsin. Kendi deneyimlerinden kaynaklanan bilgelik, stratejik düşünme ve problem çözmenin gerektiği her organizasyonda seni değerli bir kaynak yapar.";
var is_y_r_6_s2_3 = "Öncü / Lider Olmak";
var is_y_r_6_s2_3_1 = "Rolün, önce deneme yanılma yöntemiyle öğrenme ve ardından bir liderlik pozisyonuna geçme sürecini içerir. Olgunlaştıkça, uygulamalı bir rolden gözlemleyici, analiz eden ve başkalarına mentorluk yapan bir role doğal olarak geçersin. Liderliği zorlamana gerek yoktur—başkaları senin büyük resmi görme yeteneğini fark ettikçe ve seni rehber olarak kabul ettikçe kendiliğinden ortaya çıkar. Liderlik tarzın, deneyime ve neyin işe yaradığını derinlemesine anlama üzerine kuruludur.";
var is_y_r_6_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_6_s3_1_1 = "Fırsatlar, hayatın erken dönemlerinde zorluklarla yüzleşme ve bunlardan öğrenme yeteneğinden gelir. Deneme yapma, sorun çözme ve büyüme fırsatlarının olduğu ortamlarda gelişirsin. Liderlik odaklı bir aşamaya geçtikçe, insanlar doğal olarak tavsiyen için sana başvurur, seni güvenilir bir rehber olarak görür.";
var is_y_r_6_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_6_s3_2_1 = "Rolün, deneyimlerinden öğrenmek ve bu bilgiyi başkalarına rehberlik etmek için kullanmakla ilgilidir. Hem kişisel gelişiminde hem de profesyonel yolculuğunda hayatın sana sunduğu dersleri kucaklayarak hayat amacını yerine getirirsin. Hayatın farklı aşamalarından geçerken, uyum sağlama ve gelişme yeteneğin seni etkili bir lider yapar. İster aktif olarak sorunları çöz, ister stratejik tavsiyeler sun, katkıların başkalarına kendi yollarını bulmalarında yardımcı olur. Başarı, sürecine güvenip liderliğinin doğal olarak ortaya çıkmasına izin verdiğinde gelir.";

var is_y_r_7_s2_0 = "Etkileyici/Lider";
var is_y_r_7_s2_1 = "Etkileyici Lider";
var is_y_r_7_s2_1_1 = "Hayat yolculuğun güçlü ve anlamlı bağlantılar kurma ve çevrendekileri etkileme yeteneğinle şekillenir. Hayatının erken dönemlerinde, ilişkiler geliştirmeye ve ağ kurmaya odaklanırsın, bu da seni doğal olarak bir bağlantı sağlayıcı ve etkileyici pozisyonuna getirir. Olgunlaştıkça, Rolün liderlik yönüne kayar ve tecrüben ve bilgin, başkalarına rehberlik etmeni ve onları yönlendirmeni sağlar. İnsanlar doğal olarak sana çekilir ve etkileyici liderlik yeteneğini birleştirme becerin hem kişisel hem de profesyonel ortamlarda güvenilir bir figür olmanı sağlar.";
var is_y_r_7_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_7_s2_2_1 = "Gücün, güçlü kişisel bağlantılar kurma ve doğal bir otorite duygusuyla başkalarını etkileme yeteneğinde yatar. İş dünyasında, ağ kurma ve ittifaklar oluşturma konusunda mükemmelsin, bu da sana fırsat kapıları açar. Kiminle bağlantı kuracağını ve bu ilişkileri ekibin ya da organizasyonun yararına nasıl kullanacağını sezgisel olarak bilirsin. Zamanla, etkileyici liderlik yoluyla rehberlik yapma yeteneğin daha belirgin hale gelir ve başkalarına zorluklarla başa çıkmada ve başarıya ulaşmada yardımcı olan kilit bir figür olursun.";
var is_y_r_7_s2_3 = "Etkileyici / Lider Olmak";
var is_y_r_7_s2_3_1 = "Rolün, bağlantı sağlayıcı ve etkileyici olmaktan rehberlik isteyen bir lider olmaya doğru kademeli bir geçiş içerir. Kariyerinin erken dönemlerinde, daha çok ilişkiler geliştirmeye ve ağın üzerinden etki yaratmaya odaklanabilirsin. Deneyim kazandıkça, doğal olarak liderlik pozisyonlarına adım atarsın ve insanlar tavsiyeni arar ve yargına güvenir. Liderlik tarzın hem insanları hem de büyük resmi anlamaya dayanır, bu da empati ve içgörü ile liderlik etmene olanak tanır.";
var is_y_r_7_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_7_s3_1_1 = "Fırsatların güçlü ağlar kurma ve bu bağlantıları kullanma yeteneğinden gelir. İş birliğinin ve ilişki kurmanın anahtar olduğu ortamlarda gelişirsin. Liderliğe geçerken, insanlar rehberlik ve yön için sana bakar. Ancak, karşılaşabileceğin bir zorluk, bağlantı kurma ihtiyacın ile liderlik baskısı arasında denge kurmaktır. Bazen, başkalarının beklentilerinin ağırlığı bunaltıcı gelebilir ve yeniden enerji toplamak ve düşünmek için zaman ayırmak önemlidir.";
var is_y_r_7_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_7_s3_2_1 = "Rolün, ilişkiler kurma ve içgörülerini paylaşarak başkalarının başarıya ulaşmalarına yardımcı olma yeteneğini kullanmakla ilgilidir. Ağ kurma yeteneğini doğal liderlik becerilerinle birleştirerek, kişisel ve profesyonel zorluklar boyunca başkalarına rehberlik ederek hayat amacını gerçekleştirirsin. Liderlik Rolünü kucakladığında hem kariyerin hem de hayatın daha doyurucu hale gelir ve çevrendeki insanlarda önemli bir etki yaratırsın. Başarı, özgünlük ve güvenle liderlik etme yeteneğine güvendiğinde gelir.";

var is_y_r_8_s2_0 = "Etkileyici/Otorite"; 
var is_y_r_8_s2_1 = "Etkileyici Otorite";
var is_y_r_8_s2_1_1 = "Başkalarıyla derin bağlantılar kurma yeteneğini ve belirli bir alanda uzmanlaşma arzusunu birleştirirsin. Hem etkileyici bir ağ kurucusun hem de detaylı bir araştırmacısın. İnsanlarla bağlantı kurmayı sevsen de, asıl gücün seni büyüleyen konulara derinlemesine dalmak ve sağlam bir bilgi temeli oluşturmakta yatar. Sonuç olarak, genellikle alanında güvenilir bir otorite haline gelir ve etrafındakilerle bilgini paylaşarak onların bakış açılarını etkilersin.";
var is_y_r_8_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_8_s2_2_1 = "İş dünyasındaki güçlü yönlerin, başkalarıyla derin bağlar kurma ve seçtiğin uzmanlık alanında ustalaşma yeteneğinden kaynaklanır. Güçlü ağlar kurarak fırsatları kendine çekersin ve alanında derin bilgi birikimin, tavsiye ve rehberlik için başvurulan bir kişi olmanı sağlar. Profesyonel başarın, kişisel ilişkileri inceleme ve araştırma tutkusu ile harmanlayarak iş dünyasında hem etkileyici hem de otorite olarak öne çıkmanı sağlar.";
var is_y_r_8_s2_3 = "Etkileyici / Otorite Olmak";
var is_y_r_8_s2_3_1 = "Rolün, etki yaratma ve ustalık arasında bir dengeyi içerir. Seni ilgilendiren bir konuda derinlemesine çalışabilme ve ustalaşma yeteneğin sayesinde başarılı olursun. Bu ustalık, güçlü kişilerarası becerilerinle birleştiğinde, çevrendekileri etkileme gücünü artırır. Liderlik ya da tanınma aramana gerek yoktur—başkaları, uzmanlığını fark ettikçe etkili olman doğal olarak gelişir. Hem bilgi hem de ilişkiler inşa ederek iş dünyasında ya da kariyerinde kalıcı bir etki yaratabilirsin.";
var is_y_r_8_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_8_s3_1_1 = "Fırsatların, bilginin ve başkalarıyla bağlantı kurma yeteneğinin birleşiminden doğar. Hem derinlemesine çalışabileceğin hem de insanlarla anlamlı ilişkiler kurabileceğin ortamlarda gelişirsin. Ancak, karşılaşabileceğin zorluklardan biri, çalışmalarına odaklanma ihtiyacın ile sosyal bağlantıların talepleri arasında denge kurmaktır. Enerjini koruyup hem odaklanma hem de bağlantı kurma arasında denge sağlamak hem etkini hem de otoriteni sürdürmenin anahtarıdır.";
var is_y_r_8_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_8_s3_2_1 = "Rolün, bir konuda derinlemesine bilgi sahibi olma ve bu bilgiyi başkalarına rehberlik etmek için kullanmakla ilgilidir. Uzmanlığını paylaşarak ve başkalarının bundan faydalanmasına yardımcı olarak hayat amacını gerçekleştirirsin. Rolünle uyum içinde olduğunda, kendin ve çevrendekiler için fırsatlar yaratır ve tatmin edici bir kariyer inşa edersin. Hem bilgi hem de bağlantı yoluyla etki yaratma yeteneğine güvenmek, doğal yeteneklerinin parlamasını sağlayacaktır.";

var is_y_r_9_s2_0 = "Haberci/Otorite"; 
var is_y_r_9_s2_1 = "Pratik Otorite";
var is_y_r_9_s2_1_1 = "Özellikle kriz zamanlarında pratik çözümler sunman için sana başvurulur. Büyük resmi görebilme ve başkalarına zorlukların üstesinden gelmelerinde yardımcı olacak uygulanabilir içgörüler sunma yeteneğine sahipsin. Bu da seni, özellikle rehberlik ve cevap arandığında alanında bir otorite haline getirir. Rolün, konunda ustalaşmaya olan derin bağlılığın ile uzmanlığını başkalarına etki eden bir şekilde iletme yeteneğini birleştirir. İnsanların güvendiği bir problem çözücü olarak, neyin bozuk olduğunu anlamak ve doğru çözümleri sunmak için sana güvenilir.";
var is_y_r_9_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_9_s2_2_1 = "Gücün, seçtiğin alanda derinlemesine araştırma yapma, detayları öğrenme ve ardından bu bulguları net ve etkili bir şekilde iletme yeteneğinde yatar. İş dünyasında, zorluklar olduğunda pratik çözümler ve uzman bilgisi getiren biri olarak görülürsün. Bu da seni, özellikle düzeltme gereken durumlarda veya stratejik rehberlik gerektiğinde değerli bir kaynak yapar. Etkin, hem alanındaki derin anlayışından hem de insanlara güvenilir çözümler sunma yeteneğinden gelir.";
var is_y_r_9_s2_3 = "Haberci / Otorite Olmak";
var is_y_r_9_s2_3_1 = "Rolün, başkalarının aradığı değerli içgörüler ve çözümler sunmakla ilgilidir, özellikle ihtiyaç duyulan zamanlarda. Tanınma peşinde koşmana gerek yoktur—insanlar doğal olarak bilgeliğin için sana başvurur. Zamanla, bilgini derinleştirdikçe ve başkalarıyla paylaştıkça otoriten büyür. Alanında ustalaşmaya ve ihtiyaç anlarında başkalarına yardımcı olmaya odaklanarak hem haberci hem de otorite rolünü yerine getirirsin. Etkin, güven, bilgi ve açık iletişim üzerine inşa edilmiştir.";
var is_y_r_9_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_9_s3_1_1 = "Fırsatların, başkalarına çözüm sunmaları için çağrıldıklarında ortaya çıkar. Kritik anlarda devreye girip başkalarının güvenebileceği rehberliği sunduğun durumlarda gelişirsin. Ancak, bu roldeki zorluklardan biri, hangi fırsatların senin için doğru olduğunu ayırt etmeyi öğrenmektir. Her sorun senin çözmen gereken bir sorun değildir ve gerçek yeteneklerinle uyumlu olmayan projelerden kaçınarak enerjini korumalısın. Güçlü olduğun alanlara odaklanmak hem enerjini hem de etkinliğini sürdürebilmen için önemlidir.";
var is_y_r_9_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_9_s3_2_1 = "Rolün, başkalarına yardımcı olacak pratik çözümler sunmak ve kendi alanında güvenilen bir bilgelik kaynağı olmakla ilgilidir. Bilgini paylaşarak ve başkalarına rehberlik ederek hayat amacını yerine getirirsin. Rolünle uyum içinde olduğunda, güvenilir bir problem çözücü ve uzman olarak tanınacağın bir kariyer inşa edersin. Başarı, anlamlı içgörüler sunma yeteneğine ve ne zaman adım atıp uzmanlığını paylaşacağını bilme becerine güvendiğinde gelir.";

var is_y_r_10_s2_0 = "Haberci/Doğal";
var is_y_r_10_s2_1 = "Çözüm Sağlayan Yetenek";
var is_y_r_10_s2_1_1 = "Kendin bile farkına varmadan başkalarının sıklıkla fark ettiği doğuştan gelen yeteneklere sahipsin. Özellikle ihtiyaç anlarında, başkalarına yardımcı olacak pratik çözümler ve yenilikçi içgörüler sunma yeteneğine sahipsin. Genellikle sahne arkasında çalışmayı tercih etsen de, insanlar doğal olarak bilgeliğine çekilir ve senin onların sorunlarını çözebileceğine dair beklentiler geliştirir. Rolün, bu fırsatlara adım atıp yeteneklerini kendine özgü bir şekilde paylaşmakla ilgilidir.";
var is_y_r_10_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_10_s2_2_1 = "Gücün, başkalarının göremediği yenilikçi ve sıra dışı çözümler sunma yeteneğinde yatar. Doğal bir problem çözücüsün ve içgörülerin genellikle tam da ihtiyaç duyulduğunda ortaya çıkar. İş dünyasında, insanlar yargına ve sonuç elde etme yeteneğine güvenir. Bağımsız çalışmak için sana alan verildiğinde başarılı olursun ve doğru fırsatlar geldiğinde, pratik çözümlerini paylaşmak için öne çıkarsın. Bu da seni, özellikle kriz veya belirsizlik zamanlarında, herhangi bir ekibe ya da organizasyona değerli bir katkı sağlayan biri yapar.";
var is_y_r_10_s2_3 = "Haberci / Doğal Olmak";
var is_y_r_10_s2_3_1 = "Rolün, sana kolay gelen yetenekleri kucaklamak ve başkalarının bu yetenekleri fark edip seni çağırmalarına izin vermekle ilgilidir. Kendini öne çıkarmaya çalışmana gerek yok—insanlar doğal olarak içgörülerini aradıkça etkin büyür. En etkili katkıların, çözümlerini içten bir yerden sunduğunda ve seni zorlayan rollere girmediğinde gelir. Yeteneklerinin fark edileceğine ve doğru fırsatların sana geleceğine güvenmelisin.";
var is_y_r_10_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_10_s3_1_1 = "Fırsatların başkalarının senin yeteneklerini fark edip çözümler sunmanı beklediklerinde ortaya çıkar. Bu, yeteneklerini paylaşman için harika bir fırsat olabilir, ancak beklentiler senin gerçekten ilgilendiğin veya yapabileceğin şeylerle uyumlu değilse, bu durum bazen bunaltıcı gelebilir. Senin görevin, hangi fırsatların senin için doğru olduğunu ayırt etmek ve kendini fazla yormamaktır. Gerektiğinde 'hayır' demeyi öğrenmek ve başkalarına yardımcı olmak ile kendi ihtiyaçlarına saygı göstermek arasında denge kurmak uzun vadeli başarının anahtarıdır.";
var is_y_r_10_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_10_s3_2_1 = "Rolün, doğuştan gelen yeteneklerini başkalarıyla uyum içinde paylaşmakla ilgilidir. Hayat amacını, en çok ihtiyaç duyulduğunda pratik çözümler sunarak ve doğru insanların yeteneklerini fark edeceğine güvenerek gerçekleştirirsin. Doğal yeteneklerini kucaklayıp kendini zorlayan rollere girmediğinde, tatmin edici bir kariyer ve yaşam yaratmış olursun. Başarı, yeteneklerinin doğal olarak ortaya çıkmasına izin verdiğinde ve başkalarının seni benzersiz bilgeliğin için aramasına fırsat verdiğinde gelir.";

var is_y_r_11_s2_0 = "Lider/Doğal";
var is_y_r_11_s2_1 = "Yetenekli Lider";
var is_y_r_11_s2_1_1 = "Doğal yeteneklerin ve bilgeliğinle başkalarına otantik bir şekilde nasıl yaşayacaklarını gösterme rolüne sahipsin. Etrafındakiler için sıklıkla bir rol model görevi üstlenir, onlara benzersiz ve tarafsız bir bakış açısı sunma yeteneğine sahipsin. Sessiz ve bağımsız çalışmayı tercih etsen de, insanlar doğal olarak sana rehberlik için başvurur ve bilgeliğine güvenir. Olgunlaştıkça, özellikle hayatının ilerleyen dönemlerinde, bu bilgelik daha da belirgin hale gelir ve başkaları tarafından büyük değer görür.";
var is_y_r_11_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_11_s2_2_1 = "En büyük gücün, büyük resmi görebilme ve pratik, objektif içgörüler sunma yeteneğindedir. Kariyerinin erken aşamalarında, farklı yollar deneyerek ve deneme yanılma yoluyla öğrenebilirsin. Olgunlaştıkça, anlayışın derinleşir ve doğal olarak başkalarının tavsiye almak için başvurduğu bir liderlik rolüne adım atarsın. Liderlik yaparken, sakin ve tarafsız bir yaklaşım sunar, kendi deneyimlerinden elde ettiğin içgörülere dayalı rehberlik sunarsın. Bu, hem iş dünyasında hem de kişisel ilişkilerde seni etkili bir lider yapar.";
var is_y_r_11_s2_3 = "Lider / Doğal Olmak";
var is_y_r_11_s2_3_1 = "Rolün zamanla gelişir. Başlangıçta, kişisel büyümeye ve farklı fikirleri deneyimlemeye odaklanabilirsin. Zamanla, başkalarının rehber ve mentor olarak sana başvurduğu bir role doğal olarak geçersin. Bu geçiş, öğrendiğin dersleri içselleştirdikçe ve bilgeliği somutlaştırmaya başladıkça gerçekleşir. Liderliği aktif olarak aramana gerek yoktur; başkaları, örnek teşkil eden liderlik yeteneğini fark ettikçe bu rol kendiliğinden ortaya çıkar. Hayatının ilerleyen yıllarına girdikçe, bu liderlik daha da belirginleşir ve yaşam deneyimlerin seni güvenilir bir figür haline getirir.";
var is_y_r_11_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_11_s3_1_1 = "Fırsatların deneyimlerine dayalı olarak başkalarına rehberlik etme yeteneğinden gelir. Özellikle kariyerinin ilk yıllarında, keşfetme ve büyüme için alana sahip olduğunda gelişirsin. Olgunlaştıkça, kazandığın bilgelik sayesinde doğal olarak liderlik rollerine adım atarsın. Ancak, bu rolde karşılaşabileceğin zorluklardan biri, hayatın erken dönemlerinde başkalarının beklentilerine uyum sağlama baskısı olabilir. Kendi sürecine güvenmek ve kendi hızında büyümek için kendine alan tanımak, daha büyük bir tatmine ulaşmanı sağlayacaktır.";
var is_y_r_11_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_11_s3_2_1 = "Rolün, doğal yeteneklerini ve bilgeliğini kullanarak başkalarına rehberlik etmekle ilgilidir. Hem kişisel hem de profesyonel yaşamındaki yolculuğunu kucaklayarak hayat amacını gerçekleştirirsin. Hayat boyunca ilerledikçe, özellikle 50 yaş sonrasında, bilgelik, başkalarına rehberlik ve onları etkileme şeklinin temel bir parçası haline gelir. Başarı, örnek teşkil eden liderlik yeteneğine güvenip, kendini zorlamadan liderliğin doğal olarak ortaya çıkmasına izin verdiğinde gelir.";

var is_y_r_12_s2_0 = "Lider/Öncü";
var is_y_r_12_s2_1 = "Lider Keşfedici";
var is_y_r_12_s2_1_1 = "Olağanüstü dayanıklılığın ve kişisel deneyimler yoluyla öğrenip gelişme yeteneğinle tanımlanırsın. Karşına çıkan zorluklar veya aksilikler ne olursa olsun, her zaman ayağa kalkmanın ve ilerlemeye devam etmenin bir yolunu bulursun. Deneme yanılma yoluyla gelişir ve neyin işe yaradığını pratik deneyimlerle keşfedersin. Zamanla, bu dersler seni güvenilir bir lider yapar ve kişisel gelişiminle kazandığın bilgileri başkalarına rehberlik etmek için kullanırsın.";
var is_y_r_12_s2_2 = "İş Hayatında ve Kariyerde Güçlü Yönlerin";
var is_y_r_12_s2_2_1 = "İş dünyasındaki en büyük gücün, durmak bilmeyen dayanıklılığın ve risk almaya istekli olmandır. Kariyerinin erken dönemlerinde, hata yapmaktan korkmadan deneyimleyerek öğrenirsin çünkü her aksiliğin değerli içgörüler getireceğini bilirsin. Bu pratik yaklaşım, bilgi ve uzmanlık birikimi sağlar ve başkalarının yargına güvenmesine olanak tanır. Zamanla, hem pratik deneyimlerin hem de stratejik düşünce yeteneğin sayesinde daha objektif bir lider haline gelirsin. İnsanlar, bilgine güvenmelerinin yanı sıra, her düşüşten sonra ayağa kalkma yeteneğine hayran kalır, bu da seni iş dünyasında güçlü bir figür yapar.";
var is_y_r_12_s2_3 = "Lider / Öncü Olmak";
var is_y_r_12_s2_3_1 = "Rolün, uygulamalı bir problem çözücülükten dayanıklı ve stratejik bir lidere evrilmekle ilgilidir. Hayatının erken dönemlerinde, sınırları zorlamaya, denemeye ve hatalardan öğrenmeye odaklanırsın. Karşına çıkan her zorluk sadece kararlılığını güçlendirir ve anlayışını derinleştirir. Olgunlaştıkça, deneyimlerin seni başkalarının tavsiye ve destek için başvurduğu bir lider haline getirir. Liderliğin hem deneyimlere dayanır hem de başkalarına bilgelik sunma yeteneğinle pekişir. Hayatının ilerleyen yıllarında, liderliğin daha çok başkalarına rehberlik etmek ve kişisel yolculuğun boyunca kazandığın bilgileri paylaşmakla ilgilidir.";
var is_y_r_12_s3_1 = "Fırsatlar ve Zorluklar";
var is_y_r_12_s3_1_1 = "Fırsatların zorlukları kucaklama ve risk alma yeteneğinden gelir. Yeni olasılıkları keşfetme ve başarısızlıkların bile büyüme getireceğini bilme konularında gelişirsin. Dayanıklılığın seni diğerlerinden ayırır—ne kadar çok şey yanlış gitse de, ayağa kalkmanın ve devam etmenin bir yolunu bulursun. Zamanla bu deneme yanılma yaklaşımı, daha köklü bir liderlik tarzına evrilir ve insanlar seni mentor ve rehber olarak görmeye başlar. Bu rolde karşılaşabileceğin zorluklardan biri, uygulamalı bir yaklaşımdan daha bağımsız bir gözlemci ve lider rolüne geçiş yaparken kararsızlık veya belirsizlik hissetmektir. Sürecine güvenmek ve liderliğinin doğal olarak ortaya çıkmasına izin vermek, tatmin bulmanın anahtarıdır.";
var is_y_r_12_s3_2 = "Hayat Amacını Gerçekleştirmek";
var is_y_r_12_s3_2_1 = "Rolün, kişisel deneyimlerle kazandığın dayanıklılığı ve dersleri kullanarak başkalarına rehberlik etmekle ilgilidir. Hem başarılarını hem de başarısızlıklarını kucaklayarak, bunların seni bilge ve düşünceli bir lider haline getirmesine izin vererek hayat amacını gerçekleştirirsin. Hayatının ilerleyen dönemlerinde, 50 yaş sonrası, liderlik rolüne tam anlamıyla adım atar ve kazandığın zorluklarla yoğrulmuş bilgeliği başkalarına sunarsın. Başarı, sadece eylem yoluyla değil, aynı zamanda dayanıklılığın ve her ne olursa olsun ilerlemeye devam etme yeteneğinle liderlik edebilme kapasitenle gelir.";

var is_y_r_image_1_3 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/67332285001c81e3bf63/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_3_5 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322ad0011d4c5a403/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_3_6 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322b60012aa7e3499/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_1_3 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/67332285001c81e3bf63/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_1_4 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322910004bac07424/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_5_2 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322d9002bce8dd6a6/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_4_1 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322c0000834ab763b/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_4_6 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322c8001d23247b88/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_6_2 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322e2001fdd7852d7/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_2_5 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322a50018baefc20b/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_2_4 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/6733229a0030e4ce5812/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_5_1 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322d20033d27b4f32/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var is_y_r_image_6_3 = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/673322ea0023c9901d57/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";

//İş Yaşamında Rolün İngilizce
var is_y_r_eng_1_s2_0 = "Otorite/Öncü";
var is_y_r_eng_1_s2_1 = "The Expert Explorer";
var is_y_r_eng_1_s2_1_1 = "Your life is a journey of discovery and digging deep on things that interest you where you continuously learn through experience. You naturally develop expertise by exploring what works and what doesn’t through trial and error. This hands-on approach makes you uniquely qualified to become an authority in your chosen field. Whether you’re just starting out or are well-established in your career, you’re driven by a desire to understand the details, build a strong foundation, and master your craft through real-world experience.";
var is_y_r_eng_1_s2_2 = "Strengths in Business and Career";
var is_y_r_eng_1_s2_2_1 = "Your greatest strength lies in your ability to investigate and experiment until you find solutions that work. In any job or career, you approach problems with curiosity and persistence, always eager to dig deeper and discover the best way forward. This ability to navigate challenges and learn from mistakes sets you apart, making you someone others turn to for advice and insights. Over time, you develop a deep understanding of your field, which positions you as an authority or expert, regardless of your age or experience level.";
var is_y_r_eng_1_s2_3 = "Strengths in Business and Career";
var is_y_r_eng_1_s2_3_1 = "Your greatest strength lies in your ability to investigate and experiment until you find solutions that work. In any job or career, you approach problems with curiosity and persistence, always eager to dig deeper and discover the best way forward. This ability to navigate challenges and learn from mistakes sets you apart, making you someone others turn to for advice and insights. Over time, you develop a deep understanding of your field, which positions you as an authority or expert, regardless of your age or experience level.";
var is_y_r_eng_1_s3_1 = "Opportunities and Challenges";
var is_y_r_eng_1_s3_1_1 = "Your opportunities come from your willingness to face challenges head-on. You thrive in situations where you can explore, test, and refine new ideas or processes. There may be times when you feel insecure, especially if you don’t yet have a solid foundation to stand on. Recognize that this feeling is part of your growth process—your role is to build that foundation through experience. Over time, these challenges will become the steppingstones to your expertise.";
var is_y_r_eng_1_s3_2 = "Fulfilling Your Life Purpose";
var is_y_r_eng_1_s3_2_1 = "Your Role is about using your experience to build a life and career that aligns with your strengths. As you navigate the ups and downs of your journey, you’ll continue to develop mastery in your field. By sharing what you’ve learned and standing firm in your understanding, you’ll naturally fulfill your life purpose by contributing valuable insights to others. Whether you’re just starting out or well into your career, embracing your Role will lead to greater confidence, satisfaction, and success.";




// Karakter Özellikleri
var krktr_ozl_openness_to_experience = "Deneyime Açıklık"; 
var krktr_ozl_openness_to_experience_s1 = "Açıklık (deneyime açıklık olarak da bilinir), beş kişilik özelliği arasında en çok hayal gücü ve sezgiyi vurgular. Açıklık düzeyi yüksek olan kişiler genellikle geniş bir ilgi alanına sahiptir. Dünyaya ve diğer insanlara karşı meraklıdırlar, yeni şeyler öğrenmeye ve yeni deneyimlerden keyif almaya isteklidirler.\n\nBu kişilik özelliği yüksek olan insanlar, genellikle daha maceraperest ve yaratıcı olma eğilimindedir. Buna karşılık, bu özelliği düşük olan insanlar daha geleneksel olabilir ve soyut düşünmede zorlanabilirler.";
var krktr_ozl_strenghts_openness_to_experience_s2_1 = "Deneyime açıklık, yaratıcılığı, esnekliği ve yeni fikirleri benimseme yeteneğini yansıtır. Bu özellik, sanat ve inovasyon alanlarında başarı getirebilir.";
var krktr_ozl_weaknesses_openness_to_experience_s2_1 = "Deneyime aşırı açık olmak, bazen odak kaybına veya sabit bir kariyer hedefine sahip olmama isteğine neden olabilir.";
var krktr_ozl_other_attributes_openness_to_experience_s2 = "Meraklı,\nyaratıcı,\nestetik (sanatsal),\ngeniş ilgi alanlarına sahip,\nduygular odaklı,\nheyecanlı,\nalışılmadık değerlere sahip";
var krktr_ozl_12_25_openness_to_experience_questions_1 = "Yeni şeyler öğrendiğimde veya farklı bakış açıları keşfettiğimde kendimi nasıl hissediyorum? Bu merakımı okul projelerinde nasıl daha iyi kullanabilirim?";
var krktr_ozl_12_25_openness_to_experience_questions_2 = "Farklı konularla ilgili araştırmalar yaparken hangi alanlarda en çok ilham alıyorum? Bu ilhamı derslerimde nasıl daha yaratıcı hale getirebilirim?";
var krktr_ozl_12_25_openness_to_experience_questions_3 = "Alışılmadık bir düşünce tarzı geliştirdiğimde, bu yaklaşım okul performansımı nasıl etkiliyor? Yaratıcı düşünme becerilerimi hangi projelerde daha çok gösterebilirim?";
var krktr_ozl_25_plus_openness_to_experience_questions_1 = "• İşimde yeni fikirler ve farklı bakış açıları keşfettiğimde nasıl hissediyorum? Bu merak ve yaratıcılığı projelerimde nasıl daha etkili kullanabilirim?";
var krktr_ozl_25_plus_openness_to_experience_questions_2 = "• Farklı sorunları çözmek için alışılmadık yöntemler denediğimde hangi sonuçları alıyorum? Bu yenilikçi yaklaşımları işimde daha fazla nasıl uygulayabilirim?";
var krktr_ozl_25_plus_openness_to_experience_questions_3 = "• Çalışmalarımda yeniliğe açık olduğumda motivasyonum nasıl değişiyor? Yaratıcı düşünme tarzımı iş hayatımda daha geniş alanlara nasıl yayabilirim?";

var krktr_ozl_self_discipline = "Öz Disiplin"; 
var krktr_ozl_character_elements_self_discipline_s1 = "Her bir kişilik özelliği arasında, öz disiplin; yüksek seviyede düşüncelilik, iyi dürtü kontrolü ve hedef odaklı davranışlarla tanımlanır. Öz Disiplin duygusu yüksek olan kişiler genellikle düzenli ve ayrıntılara dikkat eden bireylerdir. Önceden plan yapar, davranışlarının başkalarını nasıl etkilediğini düşünür ve son teslim tarihlerine özen gösterirler.\n\nBu temel kişilik özelliğinden düşük puan alan bir kişi ise daha az yapısal ve daha düzensiz olabilir. İşleri son ana bırakabilir ve bazen teslim tarihlerini tamamen kaçırabilir.";
var krktr_ozl_strenghts_self_discipline_s2_1 = "Öz Disiplinli olma, disiplini, organizasyon becerilerini ve sorumluluk hissini yansıtır. Bu, zaman yönetimi ve verimlilik açısından avantaj sağlayabilir.";
var krktr_ozl_weaknesses_self_discipline_s2_1 = "Aşırı öz disiplinli olmak, esneklik eksikliğine yol açabilir ve iş yerinde aşırı mükemmeliyetçiliğe neden olabilir.";
var krktr_ozl_other_attributes_self_discipline_s2 = "Verimli,\norganize,\ngörev odaklı,\nbaşarı çabası içerisinde,\nmüzakereci,\ndürtüsel ve tembel olmayan";
var krktr_ozl_12_25_self_discipline_questions_1 = "Ödevlerimi planlı ve düzenli bir şekilde yaptığımda sonuçlarım nasıl oluyor? Bu planlama becerimi sınav dönemlerinde nasıl daha etkili hale getirebilirim?";
var krktr_ozl_12_25_self_discipline_questions_2 = "Hedeflerime ulaştığımda, bu başarıyı sağlayan en önemli alışkanlıklarım neler? Bu alışkanlıkları ders çalışmamda ve diğer görevlerimde nasıl daha da geliştirebilirim?";
var krktr_ozl_12_25_self_discipline_questions_3 = "Sorumluluklarımı yerine getirdiğimde kendimi nasıl motive ediyorum? Bu motivasyonu, uzun vadeli projelerimde daha sürdürülebilir hale nasıl getirebilirim?";
var krktr_ozl_25_plus_self_discipline_questions_1 = "• Görevlerimi planlı ve organize bir şekilde tamamladığımda nasıl sonuçlar alıyorum? Bu planlama becerisini daha büyük projelere nasıl yansıtabilirim?";
var krktr_ozl_25_plus_self_discipline_questions_2 = "• Koyduğum hedeflere ulaşmak için hangi alışkanlıklarımı daha sık kullanıyorum? Bu başarı alışkanlıklarını iş hayatımda nasıl daha fazla güçlendirebilirim?";
var krktr_ozl_25_plus_self_discipline_questions_3 = "• Sorumluluklarımı yerine getirdiğimde hangi içsel motivasyon kaynaklarından yararlanıyorum? Bu motivasyonu uzun vadeli projelerde nasıl daha sürdürülebilir hale getirebilirim?";

var krktr_ozl_extraversion = "Dışa Dönüklük"; 
var krktr_ozl_character_elements_extraversion_s1 = 'Dışadönüklük, heyecanlı olma, sosyallik, konuşkanlık, kendine güven ve yüksek duygusal ifade ile karakterize edilen bir kişilik özelliğidir. Dışadönüklük seviyesi yüksek olan kişiler, dışa dönük olup sosyal ortamlarda enerji kazanma eğilimindedir. Başkalarıyla bir arada olmak, onların kendilerini enerjik ve heyecanlı hissetmelerine yardımcı olur.\n\nBu kişilik özelliği düşük olan ya da içedönük kişiler ise genellikle daha sakindirler. Sosyal ortamlarda harcayacak daha az enerjileri vardır ve sosyal etkinlikler onları yorabilir. İçedönük bireyler genellikle \"yeniden şarj olmak\" için yalnızlığa ve sessizliğe ihtiyaç duyarlar.';
var krktr_ozl_strenghts_extraversion_s2_1 = "Sosyal etkileşimlere yatkınlık, liderlik pozisyonlarına uygunluk ve ekip çalışması yeteneği gibi dışa dönüklük özellikleri, iş birligi ve iletişim becerilerini geliştirebilir. Diğer insanların yanındayken enerjik hisseder.";
var krktr_ozl_weaknesses_extraversion_s2_1 = "İş yerinde fazla dışa dönük olmak, odak kaybına neden olabilir ve bazen kişinin kendi görevlerine odaklanmasını zorlaştırabilir.";
var krktr_ozl_other_attributes_extraversion_s2 = "Girişken,\nenerjik,\ngüçlü,\nheyecan arayan,\nmaceracı,\nçoşkulu,\nolumlu duygular yaşayan,\nsıcak";
var krktr_ozl_12_25_extraversion_questions_1 = "Grup çalışmalarında ya da sınıf etkinliklerinde aktif rol aldığımda nasıl hissediyorum? Bu enerjiyi okulda daha fazla hangi etkinliklerde kullanabilirim?";
var krktr_ozl_12_25_extraversion_questions_2 = "Arkadaşlarımla etkileşim kurarak öğrenmek beni nasıl etkiliyor? Grup çalışmalarında nasıl daha fazla liderlik yapabilirim?";
var krktr_ozl_12_25_extraversion_questions_3 = "Sosyal ortamlarda bulunmak ve konuşmak, okul başarımı nasıl etkiliyor? Bu becerilerimi derslerde ya da projelerde daha sık nasıl gösterebilirim?";
var krktr_ozl_25_plus_extraversion_questions_1 = "• İş yerinde grup çalışmalarına katıldığımda ya da liderlik yaptığımda nasıl hissediyorum? Bu enerjiyi ekip projelerinde daha etkili nasıl kullanabilirim?";
var krktr_ozl_25_plus_extraversion_questions_2 = "• İş arkadaşlarımla etkileşim kurarak çalışmak, performansımı nasıl etkiliyor? Bu sosyal becerilerimi daha fazla iş fırsatında nasıl gösterebilirim?";
var krktr_ozl_25_plus_extraversion_questions_3 = "• Toplantılarda veya sosyal ortamlarda aktif olduğumda, iş yerindeki başarıma nasıl katkı sağlıyorum? Bu beceriyi iş ortamında daha fazla nasıl kullanabilirim?";

var krktr_ozl_compatibility = "Uyumluluk"; 
var krktr_ozl_character_elements_compatibility_s1 = "Uyumluluk düzeyi yüksek olan kişiler, genellikle başkalarına yardım etme ve destek olma isteğiyle hareket ederler. Bu, onları grup çalışmalarında ve sosyal ortamlarda sevilen bireyler haline getirir. Ayrıca, uzlaşmacı yapıları nedeniyle çevreleriyle daha sağlıklı ilişkiler kurar ve işbirliği gerektiren ortamlarda başarılı olurlar. Buna karşın, uyumluluk seviyesi düşük bireyler, daha rekabetçi ve kendi çıkarlarına odaklı olabilir; bu da bazen ekip çalışmasında zorluklar yaşamalarına veya başkalarıyla daha zorlu ilişkiler kurmalarına neden olabilir.";
var krktr_ozl_strenghts_compatibility_s2_1 = "Uyumluluk, işbirliği, empati ve iletişim becerilerini yansıtır. İş yerinde veya okulda diğer insanlarla iyi geçinme yeteneği için avantaj saglayabilir.";
var krktr_ozl_weaknesses_compatibility_s2_1 = "Uyumluluk, işbirliği, empati ve iletişim becerilerini yansıtır. iş yerinde diğer insanlarla iyi geçinme yeteneği için avantaj saglayabilir."; // Burası mantıksız olabilir, düzeltilmesi gerekebilir.
var krktr_ozl_other_attributes_compatibility_s2 = "Bağışlayıcı,\naçık sözlü,\ntalepkar olmayan,\nfedakar,\nuyumlu,\nalçak gönüllü,\nsempatik,\nşefkatli";
var krktr_ozl_12_25_compatibility_questions_1 = "Sınıf arkadaşlarıma yardım ettiğimde veya onlarla iş birliği yaptığımda, hangi becerilerim öne çıkıyor? Bu iş birliğini grup projelerinde nasıl daha etkili kullanabilirim?";
var krktr_ozl_12_25_compatibility_questions_2 = "Başkalarının ihtiyaçlarını anlamak ve onlara destek olmak, sınıf içindeki ilişkilerimi nasıl güçlendiriyor? Bu empatiyi okulda daha fazla nasıl geliştirebilirim?";
var krktr_ozl_12_25_compatibility_questions_3 = "Anlayışlı ve sabırlı olduğum durumlarda nasıl bir etki yaratıyorum? Bu özellikleri grup çalışmaları veya sınıf içindeki tartışmalarda nasıl daha iyi kullanabilirim?";
var krktr_ozl_25_plus_compatibility_questions_1 = "• İş arkadaşlarıma yardım ettiğimde veya onlarla iş birliği yaptığımda hangi becerilerim öne çıkıyor? Bu iş birliğini projelerimde daha etkili nasıl kullanabilirim?";
var krktr_ozl_25_plus_compatibility_questions_2 = "• Anlayışlı ve sabırlı olduğumda iş yerinde nasıl bir etki yaratıyorum? Bu özellikleri zorlu projelerde ve ekip çalışmalarında nasıl daha iyi kullanabilirim?";
var krktr_ozl_25_plus_compatibility_questions_3 = "• Çalışma arkadaşlarımın ihtiyaçlarını anlamak ve onlara destek olmak, iş ortamındaki ilişkilerimi nasıl güçlendiriyor? Bu empatiyi iş hayatımda nasıl daha da geliştirebilirim?";

var krktr_ozl_emotional_resilience = "Duygusal Dayanıklılık"; 
var krktr_ozl_character_elements_emotional_resilience_s1 = "Duygusal denge, bir kişinin stresi nasıl yönettiğini, duygusal dengeyi nasıl koruduğunu ve sağlıklı bir özgüven sürdürebilme yeteneğini yansıtır. Duygusal dengesi yüksek olan bireyler, baskı altında daha sakin kalır ve zorluklardan çabuk toparlanabilirler.\n\nBuna karşılık, duygusal dengesi düşük olan kişiler, daha güçlü duygusal dalgalanmalar yaşayabilir, stres karşısında kolayca bunalmış hissedebilir ve zor zamanlarda olumlu bir benlik imajını sürdürmekte zorlanabilirler. Bu özellik, hem kişisel refah hem de profesyonel başarı açısından kritik öneme sahiptir ve zorluklarla başa çıkma şeklimizi doğrudan etkiler.";
var krktr_ozl_strenghts_emotional_resilience_s2_1 = "Duygusal istikrar, stresle başa çıkma yeteneği ve iş yerinde olumsuz durumları tolere etme yeteneğini yansıtır. Bu, kriz anlarında sakin kalma ve etkili kararlar alabilme yeteneğini artırabilir.";
var krktr_ozl_weaknesses_emotional_resilience_s2_1 = "Bu kişiler, çok fazla stres yaşar ve çeşitli konular hakkında sürekli endişelenir. Ruh hali sık sık değişir, kolayca üzülür ve stresli olaylardan sonra toparlanmakta zorluk çeker.";
var krktr_ozl_other_attributes_emotional_resilience_s2 = "Sakin,\nsoğuk kanlı,\nuyumlu,\nkendinden emin,\nesnek,\nmemnuniyetli";
var krktr_ozl_12_25_emotional_resilience_questions_1 = "Zorlandığım anlarda sakin kalmayı başarabildiğimde derslerimde nasıl bir ilerleme kaydediyorum? Bu duygusal dayanıklılığı sınav stresinde nasıl daha fazla kullanabilirim?";
var krktr_ozl_12_25_emotional_resilience_questions_2 = "Hatalar yaptığımda, bu hatalardan öğrenmek için nasıl bir yaklaşım izliyorum? Bu öğrenme sürecini okul hayatımda nasıl daha etkili hale getirebilirim?";
var krktr_ozl_12_25_emotional_resilience_questions_3 = "Zor bir durumu atlattıktan sonra nasıl daha güçlü hissediyorum? Bu dayanıklılığı günlük okul hayatımda nasıl daha fazla kullanabilirim?";
var krktr_ozl_25_plus_emotional_resilience_questions_1 = "• Hata yaptığımda, bu hatalardan nasıl ders çıkarıyorum? Öğrenme sürecimi iş hayatımda daha verimli hale getirmek için neler yapabilirim?";
var krktr_ozl_25_plus_emotional_resilience_questions_2 = "• Zor bir projeyi tamamladıktan sonra kendimi nasıl daha güçlü hissediyorum? Bu dayanıklılığı işimde sürekli başarı sağlamak için nasıl daha fazla kullanabilirim?";
var krktr_ozl_25_plus_emotional_resilience_questions_3 = "• İşte stresli durumlarla karşılaştığımda sakin kalmayı başardığımda nasıl sonuçlar elde ediyorum? Bu duygusal dayanıklılığı yoğun iş dönemlerinde nasıl daha iyi kullanabilirim?";

//Karakter Özellikleri İngilizce
var krktr_ozl_eng_openness_to_experience = "Openness to Experience";
var krktr_ozl_openness_to_experience_eng_s1 = "Openness (also referred to as openness to experience) emphasizes imagination and insight the most out of all five personality traits. People who are high in openness tend to have a broad range of interests. They are curious about the world and other people and are eager to learn new things and enjoy new experiences.\n\nPeople who are high in this personality trait also tend to be more adventurous and creative. Conversely, people low in this personality trait are often much more traditional and may struggle with abstract thinking.";
var krktr_ozl_strenghts_openness_to_experience_eng_s2_1 = "Very creative, open to trying new things, focused on tackling new challenges, happy to think about abstract concepts.";
var krktr_ozl_weaknesses_openness_to_experience_eng_s2_1 = "Dislikes change, does not enjoy new things, resists new ideas, not very imaginative, dislikes abstract or theoretical concepts.";
var krktr_ozl_other_attributes_openness_to_experience_eng_s2 = "Ideas (curious)\nFantasy (imaginative)\n Aesthetics (artistic)\nActions (wide interests)\nFeelings (excitable)\nValues (unconventional)";
var krktr_ozl_12_25_openness_to_experience_questions_eng_1 = "• How do I feel when I learn new things or discover different perspectives? How can I use this curiosity more effectively in my school projects?";
var krktr_ozl_12_25_openness_to_experience_questions_eng_2 = "• When researching various topics, which areas inspire me the most? How can I bring this inspiration into my schoolwork to make it more creative?";
var krktr_ozl_12_25_openness_to_experience_questions_eng_3 = "• When I develop an unconventional way of thinking, how does it affect my school performance? In which projects can I show my creative thinking skills more?";
var krktr_ozl_25_plus_openness_to_experience_questions_eng_1 = "• How do I feel when I explore new ideas and different perspectives in my work? How can I use this curiosity and creativity more effectively in my projects?";
var krktr_ozl_25_plus_openness_to_experience_questions_eng_2 = "• What results do I get when I try unconventional methods to solve different problems? How can I apply these innovative approaches more in my work?";
var krktr_ozl_25_plus_openness_to_experience_questions_eng_3 = "• How does my motivation change when I’m open to new experiences in my tasks? How can I expand my creative thinking style to broader areas of my work?";



// İletişim
//12-25
var ai_iletisim_ve_etkilesim_0 = "İLETİŞİM VE ETKİLEŞİM TARZIN";
var ai_iletisim_ve_etkilesim_1 =
  "Kariyerinde ve işinde başarılı olmak için, başkalarıyla etkileşim kurma sanatını öğrenmen çok önemli. Çevrendeki insanları nasıl etkilediğini anlamak ve kişiler arası dinamikleri yönetmeyi öğrenmek, başarını büyük ölçüde etkileyebilir. Etkileşim ve İletişim Dinamiğininin farkına vardığında, başkalarıyla kolayca iletişim kurma yeteneği kazanır, dirençleri ortadan kaldırır ve daha akıcı bir iletişim ortamı yaratabilirsin. ";
var ai_iletisim_ve_etkilesim_2 = "ENERJİK";
var ai_iletisim_ve_etkilesim_3 =
  "Etkili iletişimin merkezinde, sessiz bir iletişimci olarak hareket eden, başkalarını ve fırsatları sana çeken sözsüz varlığın var. Açık ve saran varlığın bir mıknatıs gibi davranır, doğal olarak insanları kendine çeker ve verimli etkileşimlerin yolunu açar. ";
var ai_iletisim_ve_etkilesim_4 =
  "Başkalarıyla Başarılı Etkileşimlerin Anahtarı... ";
var ai_iletisim_ve_etkilesim_5 =
  "Etkileşimde bulunmadan önce yanıt vermek için bekle:";
var ai_iletisim_ve_etkilesim_6 =
  "Etkileşimleri başlatmaktan kaçınarak ve bunun yerine yanıt vermeyi bekleyerek iletişim kanallarını açar ve direnci ortadan kaldırabilirsin. Farkındalığını açmak, fırsatları ortaya çıktıkça gözlemlemek ve başkalarıyla etkileşime girmeden önce sezgilerini dinlemek için pratik yapabilirsin. ";
var ai_iletisim_ve_etkilesim_7 = "Doğru Hissettiren Şeylere Yanıt Ver: ";
var ai_iletisim_ve_etkilesim_8 =
  "İç güdülerine güven ve seninle rezonansa giren şeylere olanak tanıyan durumlara yanıt vermeye çalış. Seni neyin heyecanlandırdığına ve değerlerinle uyumlu olduğuna dikkat et, gerçek coşkunun etkileşimlerine rehberlik etmesine izin ver. ";
var ai_iletisim_ve_etkilesim_9 =
  "Başlatma - yalnızca önce yanıt verdikten sonra etkileşime geç:";
var ai_iletisim_ve_etkilesim_10 =
  "Etkileşim başlatmak yerine, kişisel tercihlerin ve hedeflerinle uyumlu davetlere ve fırsatlara yanıt vermeye odaklan. Etkileşimlerin organik olarak ortaya çıkmasına izin vererek, karşılıklı anlayış ve saygıya dayanan özgün bağlantılar oluştururabilirsin. ";
var ai_iletisim_ve_etkilesim_11 = "İş yerinde etkili iletişim ve katılım ";
var ai_iletisim_ve_etkilesim_12 =
  "Doğal Manyetizmandan Yararlan: İnsanları varlığınla içine çekme konusundaki doğuştan gelen yeteneğin büyük bir varlık. İşyerinde, sürekli olarak ulaşılabilir olarak bu manyetizmanın senin için çalışmasına izin ver. İş arkadaşların doğal olarak sana yönelecek, projelerde girdilerini ve desteğini arayacak ve girişimleri ileriye taşıyan enerjiyi sağlama yeteneğini kabul edeceklerdir. ";
var ai_iletisim_ve_etkilesim_13 =
  "Niyetle Yanıt Ver: Harekete geçmek cazip gelse de, gücünün yanıt olarak yattığını unutma. Aktif dinleme pratiği yapabilir ve seni gerçekten heyecanlandıran ve değerlerinle uyumlu projelerle meşgul olabilirsin. Başlatmak yerine yanıt verdiğinde, çabalarının daha etkili olduğu ve temel katkılar olarak kabul edildiği bir dinamik yaratma olasılığın çok daha fazla. ";
var ai_iletisim_ve_etkilesim_14 =
  "Net Sınırlar Oluştur: Görevleri üstlenme kapasiten ve istekliliğin konusunda net ol. Bu, aşırı taahhütte bulunmamanı sağlar ve enerjini en üretken olabileceğin görevlere yönlendirmene olanak tanır. Kapasiten dahilinde çalıştığında, işteki memnuniyetin artar ve bu doğal olarak senin mutluluğunu ve başarını etkiler. ";
var ai_iletisim_ve_etkilesim_15 =
  "Katılımda Coşku Göster: Katılmayı seçtiğinde, bunu belirgin bir coşkuyla göster. Enerjin bulaşıcıdır ve ekibine ilham verebilir ve onları motive edebilir. İş için gerçek heyecanının etkileşimlerine rehberlik etmesine izin ver, bunun ekip dinamiklerin içinde daha da önemli hale geldiğinizi göreceksiniz. ";
var ai_iletisim_ve_etkilesim_16 = "Kendini Değerlendirme";
var ai_iletisim_ve_etkilesim_17 = "Enerjik";
var ai_iletisim_ve_etkilesim_18 =
  "Etkileşimlerde bulunmadan önce yanıt vermek için bekliyor musun? Sezgilerini dinleyip, doğru zamanın gelmesini nasıl fark edebilirsin? ";
var ai_iletisim_ve_etkilesim_19 =
  "Seni gerçekten heyecanlandıran şeylere yanıt veriyor musun? İçgüdülerine güvenip, sadece seninle uyumlu olan fırsatları seçmek için neler yapabilirsin? ";
var ai_iletisim_ve_etkilesim_20 =
  "Etkileşim başlatmadan önce gerçekten yanıt verdiğinden emin oluyor musun? Bu yaklaşımı iş ve sosyal hayatında nasıl daha fazla uygulayabilirsin? ";
var ai_iletisim_ve_etkilesim_21 =
  "İnsanların doğal olarak sana yöneldiğini fark ediyor musun? Doğal manyetizman sayesinde iş yerinde daha verimli etkileşimler yaratmak için hangi yolları izleyebilirsin? ";
var ai_iletisim_ve_etkilesim_22 =
  "İş yerinde doğru projelere yanıt verip, enerjini doğru yerlere yönlendirdiğinden emin misin? Seni en çok tatmin eden işleri bulmak için hangi stratejileri uygulayabilirsin? ";
var ai_iletisim_ve_etkilesim_23 = "Rehber";
var ai_iletisim_ve_etkilesim_24 =
  "Senin için etkili iletişimin merkezinde, ince ama güçlü bir güç olan sözsüz varlığın var. Başkalarını doğal olarak sana çeken açık, odaklanmış ve emici bir varlığın var. Bu manyetik kalite, dikkat talep etmek zorunda kalmadan başkaları tarafından tanınmak üzere tasarlandığın anlamına gelir. ";
var ai_iletisim_ve_etkilesim_25 =
  "Başkalarıyla Başarılı Etkileşimlerin Anahtarı... ";
var ai_iletisim_ve_etkilesim_26 =
  "Katılmadan Önce Tanınma ve Davet Bekle: Tanınma konusunda başarılı olursun. Katılmadan önce, becerilerin, yeteneklerin ve rehberlik etme ve liderlik etme kapasiten için fark edildiğinden ve kabul edildiğinden emin ol. Bu, etkileşimlerinin özgün ve tanınmış bir temele dayanmasını sağlar. ";
var ai_iletisim_ve_etkilesim_27 =
  "Tanınma ve Davet: Çevrene uyum sağla ve yoluna çıkan fırsatlara açık ol. Aldığın tanınma ve davetle bir rezonans hissettiğinde bu fırsatların doğru olduğunu bileceksin. Birisi büyük resmi görme yeteneklerini tanıyacak ve seni rehber niteliklerinle uyumlu bir role, projeye veya ortaklığa davet edecektir. ";
var ai_iletisim_ve_etkilesim_28 =
  "Tanındığında ve Davet Edildiğinde Etkileşim Kur: Katkıların tanınma ve ardından bir davet yoluyla istendiğinde, bu, etkileşim kurman için ipucudur. İç görülerine ve rehberliğine değer veren birinin takdiri, beklediğin sinyaldir. Bu sadece karar verme stratejininin ilk kısmı değil, aynı zamanda önündeki fırsatın doğru olmasını sağlamanın anahtarıdır. ";
var ai_iletisim_ve_etkilesim_29 =
  "Sabırlı Yanını Güçlendir: Yönlendirme ve organize etme konusunda istekli olsan da, devreye girmek için sabırlı olman önemlidir. Dikkatle dinlemeyi alışkanlık haline getirmen  ve fikirlerini yalnızca davet edildiğini hissettiğinde paylaşman önemli—bu bir baş selamı, meraklı bir bakış, konuşmada bir duraklama ya da doğrudan görüşünü paylaşman için yapılan bir davet olabilir. Genellikle bu tür anlarda, diğerlerinden gelen onayla devreye girmen gerektiğini anlarsın. ";
var ai_iletisim_ve_etkilesim_30 =
  "Davetlerde Ayırt Etme Gücüyle Gezin: Projelere liderlik etme, yeni roller üstlenme veya ekiplere katılma davetleri ortaya çıktığında, onlara ayırt edici bir şekilde yaklaşman lazım. Uzmanlığın ve içsel bilgeliğinle gerçekten rezonansa girenleri kabul etmeli ve uymayanları red etmelisin. Enerjinim çabaları yerine getirmeye yatırıldığından emin olun. ";
var ai_iletisim_ve_etkilesim_31 =
  "Bire Bir Etkileşimlerden Yararlan: Rehberler bire bir ortamlarda parlar. İlişkileri derinleştirmek ve iş arkadaşlarının ihtiyaçlarını anlamak için bireysel etkileşimleri kullanman daha doğru olur. Bu bağlantılar sayesinde, sana rehberlik etmek için doğru zamanı işaret eden tanınma ve davetleri sık sık bulacaksın. ";
var ai_iletisim_ve_etkilesim_32 =
  "Tanınmaya Açık Olduğunuzu Göster: Katkıda bulunma fırsatlarını memnuniyetle karşıladığını incelikle bil. Bu, projelere ilgi göstererek veya ulaşılabilir olarak yapılabilir. Açık tavrın, danışman rolünün en etkili olabileceği iş birliklerine davet edilmeye hazır ve istekli olduğunu başkalarına gösterecektir. ";
var ai_iletisim_ve_etkilesim_33 = "Kendini Değerlendirme";
var ai_iletisim_ve_etkilesim_34 =
  "Tanınma ve davet beklerken ne kadar sabırlı olabiliyorsun? ";
var ai_iletisim_ve_etkilesim_35 =
  "Hangi durumlarda aceleyle harekete geçmek yerine, doğru fırsatların sana gelmesini bekleyebilirsin? ";
var ai_iletisim_ve_etkilesim_36 =
  "Sana sunulan davetler ve tanınma fırsatlarıyla ne kadar uyum içindesin?";
var ai_iletisim_ve_etkilesim_37 =
  "Bu fırsatların gerçekten seni en iyi yansıttığını nasıl fark edebilirsin? ";
var ai_iletisim_ve_etkilesim_38 =
  "Fikirlerini paylaşmadan önce davet edildiğini hissettiğinden emin oluyor musun?";
var ai_iletisim_ve_etkilesim_39 =
  "İlişkilerinde bu ince işaretleri nasıl daha iyi gözlemleyebilirsin? ";
var ai_iletisim_ve_etkilesim_40 =
  "Bire bir ilişkilerde nasıl parladığını fark ediyor musun? ";
var ai_iletisim_ve_etkilesim_41 =
  "İş arkadaşlarınla daha derin bağlantılar kurmak için hangi yolları izleyebilirsin? ";
var ai_iletisim_ve_etkilesim_42 =
  "Projelerde veya rollerde tanınmaya açık olduğunu başkalarına nasıl hissettiriyorsun?";
var ai_iletisim_ve_etkilesim_43 =
  "Ulaşılabilir ve açık tavrını iş yerinde daha etkili bir şekilde nasıl gösterebilirsin? ";
var ai_iletisim_ve_etkilesim_44 = "Başlatıcı ";
var ai_iletisim_ve_etkilesim_45 =
  "Senin varlığın kapalı ve koruyucu, bir kalkan ve mızrak gibi işlev görüyor. İçsel bir güce sahip olup, dışa doğru bir itişle harekete geçiyor ve başkalarını doğrudan etkiliyorsun. Enerjin bazen baskın olarak yanlış anlaşılabilir, ancak bu sadece senin doğal olarak proaktif ve kararlı olma halindir. ";
var ai_iletisim_ve_etkilesim_46 =
  "Başkalarıyla Başarılı Etkileşimlerin Anahtarı... ";
var ai_iletisim_ve_etkilesim_47 =
  "Bilgilendirme ve Harekete Geçme: İçsel başlatma gücünü başkalarının ihtiyaçları ve sınırlarıyla uyumlu hale getirmek için, harekete geçmeden önce bilgilendirmek çok önemlidir. Bu uygulama sadece direnci azaltmakla kalmaz, aynı zamanda vizyonunu etkili bir şekilde tezahür ettirmek için ihtiyaç duyduğun özgürlüğün yolunu açar. ";
var ai_iletisim_ve_etkilesim_48 =
  "Başlatıcı Varlığını Yönet: Başlatıcı enerjinin bazen başkalarını savunmaya geçirebileceğini anlamalısın. İş birliği içinde bir ortam yaratmak için, çevrendekilere niyetlerin ve eylemlerin hakkında önceden bilgi vermeyi öğren. Bu açıklık, insanların motivasyonlarını daha iyi anlamalarına yardımcı olacak ve yanlış anlaşılmaların önüne geçecektir. ";
var ai_iletisim_ve_etkilesim_49 =
  'Eşsiz Rolünü Kucakla: Başka hiçbir türün yapamayacağı şekilde "Dışarı Çık ve Gerçekleşmesini Sağla" için benzersiz bir şekilde tasarlandın. Bunu benimse ve başlatma kapasitenin, farkındalıkla ve karar verme stratejinizle uzun süre kullanıldığında en büyük gücün olduğunu unutma. ';
var ai_iletisim_ve_etkilesim_50 = "İş yerinde etkili iletişim ve katılım ";
var ai_iletisim_ve_etkilesim_51 =
  "Bilgilendirmeyi Bir Alışkanlık Olarak Geliştir: İş yerinde, ekibini ve üstlerini planların ve eylemlerin hakkında bilgilendirme alışkanlığını uygulamayı unutma. Bu şeffaflık güven yaratır ve başkalarının girişimlerini daha etkili bir şekilde desteklemesine olanak tanır. ";
var ai_iletisim_ve_etkilesim_52 =
  "Başlatma Gücünü Akıllıca Kullan: Başlatma gücünün değişim ve ilerleme için bir katalizör olduğunu kabul et. Projelere liderlik etmek ve harekete geçmek için bu yeteneği kullan, ancak her zaman ekibinin girdilerini ve katkılarını dikkate alan dikkatli bir yaklaşımla. ";
var ai_iletisim_ve_etkilesim_53 =
  "Kontrol Edilme Korkusunun Üstesinden Gelmeye Çalış: Bir özerklik ortamı yaratarak altta yatan kontrol edilme korkunu gidermeye çalış. Hareket etme özgürlüğüne sahip olduğunda ve diğerleri bilgilendirildiğinde, direncin azaldığını ve üretkenliğin arttığını göreceksin. ";
var ai_iletisim_ve_etkilesim_54 =
  "Direnci İşbirliğine Dönüştür: Direnç fark ettiğinde, bunu bilgilendirme sürecini iyileştirmek için bir fırsat olarak kullanmaya çalış. Açık iletişim, muhalefeti işbirliğine dönüştürebilir, vizyonunu ve yönünün gelişebileceği bir işyerini teşvik edebilir. ";
var ai_iletisim_ve_etkilesim_55 =
  "Pratik Yap, Pratik Yap, Pratik Yap: Bilgilendirme sana doğal olarak gelmez, bu yüzden kendini bu beceride ustalaşmaya adaman lazım. Sürtünme olmadan liderlik etme yeteneğinin kilidini açacak ve çevrendekilerin desteği ve iş birliği ile hedeflerini ortaya koyacak olan kilit noktadır. ";
var ai_iletisim_ve_etkilesim_56 = "Kendini Değerlendirme ";
var ai_iletisim_ve_etkilesim_57 =
  "Harekete geçmeden önce çevrendekileri bilgilendiriyor musun? ";
var ai_iletisim_ve_etkilesim_58 =
  "Bu bilgilendirme süreci, iş yerinde ve sosyal çevrende direnci azaltmak için nasıl etkili olabilir? ";
var ai_iletisim_ve_etkilesim_59 =
  "Başlatıcı enerjinin başkalarını nasıl etkilediğini fark ediyor musun? ";
var ai_iletisim_ve_etkilesim_60 =
  "Proaktif yapını daha işbirlikçi bir ortam yaratmak için nasıl kullanabilirsin? ";
var ai_iletisim_ve_etkilesim_61 =
  "Kontrol edilme korkunu yenmek için hangi adımları atıyorsun?";
var ai_iletisim_ve_etkilesim_62 =
  "Özerkliğini koruyarak direnci nasıl işbirliğine dönüştürebilirsin? ";
var ai_iletisim_ve_etkilesim_63 =
  "Bilgilendirmeyi bir alışkanlık haline getirip, ekip arkadaşlarınla güven oluşturmaya nasıl katkıda bulunabilirsin? ";
var ai_iletisim_ve_etkilesim_64 =
  "Bu yaklaşım projelerini ileriye taşımada ne kadar etkili olabilir? ";
var ai_iletisim_ve_etkilesim_65 =
  "Başlatıcı gücünü dikkatli bir şekilde kullanarak, ekip arkadaşlarının katkılarını nasıl daha fazla dikkate alabilirsin?";
var ai_iletisim_ve_etkilesim_66 =
  "Bu sayede iş yerinde daha etkili bir lider olabilir misin? ";
var ai_iletisim_ve_etkilesim_67 = "Yansıtıcı ";
var ai_iletisim_ve_etkilesim_68 =
  "Dirençli, ancak çevreyi emmeden örnekleme ve yansıtma yeteneğine sahip bir varlığın var. Sözsüz varlığın sessiz, nazik ve müdahaleci değildir, çevreye ve içindeki insanlara bir ayna görevi görür. ";
var ai_iletisim_ve_etkilesim_69 =
  "Başkalarıyla Başarılı Etkileşimlerin Anahtarı... ";
var ai_iletisim_ve_etkilesim_70 =
  "Ne Kadar Eşsiz Olduğunu Fark Etmek ve Etkileşime Girmeden Önce Beklemek, Yansıtmak ve Tartışmak: Benzersizliğin, seni olağanüstü derecede nadir ve değerli kılan çevreyi yansıtmak ve örneklemektir. Nüfusun sadece %1ini temsil ettiğini ve dünyayı diğerlerinden farklı gördüğünü kabul etmen gerekiyor. Benzersizliğini kucaklayarak, başkalarıyla güç ve bilgelik dolu bir yerden etkileşime girebilirsin. ";
var ai_iletisim_ve_etkilesim_71 =
  "Yansıtıcı Doğanı Anla: Etrafındakileri yansıtma ve büyütme yeteneğin, çevrenin sağlığını objektif olarak gözlemlemene ve değerlendirmene olanak tanır. Etkileşime girmeden önce bekleyip düşündüğünde, direnci ortadan kaldırır ve iç görülerinin alınması ve değerlendirilmesi için alan açarsın. ";
var ai_iletisim_ve_etkilesim_72 =
  "Yansıtıcı İç görülerinden Yararlan: Bir Değerlendirici olarak, sana stratejik bir bakış açısı sağlayan kalıpları ve döngüleri gözlemleme konusunda doğuştan gelen bir yeteneğe sahipsin. Çeşitli durumlar üzerinde düşünmek ve düşünceli tartışmalara katılmak için gereken zamanı ayır. İyi düşünülmüş iç görülerinin ekibine ve projelerine katkılarını bilgilendirmesine izin ver. ";
var ai_iletisim_ve_etkilesim_73 = "İş yerinde etkili iletişim ve katılım  ";
var ai_iletisim_ve_etkilesim_74 =
  "İletişimde Sabır ve Derinlik Geliştir: İş yerinde, çevrendeki etkileşimler ve dinamikler üzerinde düşünmek için zaman ayır. Dikkatli değerlendirmen ve benzersiz bakış açın, ekibine ve projelerine fayda sağlayabilecek derin iç görülere yol açabilir. ";
var ai_iletisim_ve_etkilesim_75 =
  "İç görülerin İçin Alan Yarat: Başkalarının kendilerini rahatça açabilecekleri bir alan yaratmak için nazik varlığını kullan. Gösterişsiz doğan dürüst diyaloğu teşvik eder, görüşleri örneklemene ve tartışmaların özünü geri yansıtmana olanak tanır, bu da ekibi netlik ve fikir birliğine yönlendirebilir. ";
var ai_iletisim_ve_etkilesim_76 =
  "Harekete Geçmeden Önce Bekle, Düşün ve Tartış: Önemli kararlar vermeden önce düşünceli tartışmalara katılmayı alışkanlık haline getirmen gerekir. Düşüncelerin hemen ortaya çıkmaz ve en iyi katkıların, resmin tamamını işlemek ve anlamak için zamanın olduğunda gelir. ";
var ai_iletisim_ve_etkilesim_77 =
  "Doğuştan Gelen Bilgeliğinden Yararlan: İç görülerinin ve içsel bilgeliğinin işteki katkılarına rehberlik etmesine izin ver. Bu derin anlayış yerinden konuştuğunuzda, sözlerin ağırlık taşır ve genellikle ekibinin ve kuruluşun için dönüştürücü sonuçlara yol açabilir. ";
var ai_iletisim_ve_etkilesim_78 = "Kendini Değerlendirme ";
var ai_iletisim_ve_etkilesim_79 =
  "Etrafındaki insanları ve ortamları objektif bir şekilde yansıttığını fark ediyor musun?";
var ai_iletisim_ve_etkilesim_80 =
  "Bu yansıtma gücünü iş yerinde veya sosyal çevrende nasıl daha etkili kullanabilirsin? ";
var ai_iletisim_ve_etkilesim_81 =
  "Etkileşime girmeden önce bekleyip düşünmek sana nasıl bir içgörü sağlıyor? ";
var ai_iletisim_ve_etkilesim_82 =
  "Bu bekleme sürecini hangi durumlarda daha iyi uygulayabilirsin? ";
var ai_iletisim_ve_etkilesim_83 =
  "Nazik ve sessiz varlığın, başkalarının kendilerini rahatça ifade etmelerine nasıl yardımcı oluyor?";
var ai_iletisim_ve_etkilesim_84 =
  "Bu özelliğini ekip çalışmalarında daha fazla nasıl kullanabilirsin? ";
var ai_iletisim_ve_etkilesim_85 =
  "Yansıtıcı içgörülerini başkalarıyla paylaşmadan önce değerlendirme yapmak için yeterince zaman ayırıyor musun?";
var ai_iletisim_ve_etkilesim_86 =
  "Stratejik bakış açını daha derinleştirmek için ne tür tartışmalar sana faydalı olabilir? ";
var ai_iletisim_ve_etkilesim_87 =
  "Çevrenin sağlığını gözlemleme yeteneğin, ekip arkadaşlarına ve projelerine nasıl katkıda bulunuyor?";
var ai_iletisim_ve_etkilesim_88 =
  "Bu içsel bilgeliği iş yerinde daha etkili bir şekilde nasıl ortaya koyabilirsin? ";

//Yapay Zeka Çağı Yetkinliklerin
var ai_25_s3_1_1 = "Dijital Okuryazarlık ";
var ai_25_s3_1_2 = "• Temel Bilgisayar ve Teknoloji Becerileri: Bilgisayar kullanımını, yazılım ve donanım bilgilerini kapsar. Gençler teknolojiyi etkili ve verimli bir şekilde kullanabilmelidir. ";
var ai_25_s3_1_3 = "• Yapay Zeka Temelleri: AI'nın ne olduğu, nasıl çalıştığı ve hayatımızı nasıl şekillendirdiği hakkında temel bilgilere sahip olmak giderek önem kazanıyor.";

var ai_25_s3_2_1 = "Veri Okuryazarlığı";
var ai_25_s3_2_2 = "• Veri Analizi: Verileri toplama, analiz etme ve bu verilerden anlamlı sonuçlar çıkarabilme yeteneği. Günümüz dünyasında kararlar veri odaklı alındığı için bu beceri çok değerlidir.";
var ai_25_s3_2_3 = "• Veri Gizliliği ve Güvenlik: Gençlerin veri güvenliğinin ve gizliliğin önemini anlamaları, kişisel verilerin nasıl korunacağını bilmeleri gereklidir.";

var ai_25_s3_3_1 = "Kodlama ve Programlama";
var ai_25_s3_3_2 = "• Programlama Dilleri: Python, JavaScript gibi temel programlama dillerini öğrenmek, AI geliştirme ve teknolojiyle ilgili işlerde başarılı olmak için önemlidir.";
var ai_25_s3_3_3 = "• Algoritmik Düşünme: Problemleri çözmek için sistematik ve mantıklı yollar geliştirmek, AI çağında temel bir beceridir.";

var ai_25_s3_4_1 = "Eleştirel Düşünme ve Problem Çözme";
var ai_25_s3_4_2 = "• Analitik Düşünme: Verilerden veya olaylardan anlam çıkarma, çözüm yolları geliştirme yeteneği. AI araçlarını doğru ve etkili bir şekilde kullanabilmek için bu beceri hayati önem taşır. ";
var ai_25_s3_4_3 = "• Yaratıcı Problem Çözme: Yenilikçi ve yaratıcı yollarla çözümler üretebilme, özellikle AI ve teknoloji alanlarında avantaj sağlar.";

var ai_25_s3_5_1 = "Uyarlanabilirlik ve Sürekli Öğrenme";
var ai_25_s3_5_2 = "• Esneklik: Sürekli değişen teknoloji ve iş dünyasına hızla adapte olabilmek. Yeni AI araçlarını, sistemlerini öğrenme yeteneği önemlidir. ";
var ai_25_s3_5_3 = "• Yaşam Boyu Öğrenme: Teknoloji geliştikçe, yeni beceriler öğrenme ve mevcut becerileri güncelleme yeteneği daha da önem kazanıyor.";

var ai_25_s3_6_1 = "İletişim ve İşbirliği ";
var ai_25_s3_6_2 = "• Teknik ve İnsan Dili Arasındaki Köprü: AI ve teknoloji alanında çalışırken karmaşık bilgileri sade bir şekilde açıklayabilme yeteneği önemlidir.";
var ai_25_s3_6_3 = "• Takım Çalışması: Özellikle çok disiplinli projelerde işbirliği yapabilmek, AI projelerinde başarıya ulaşmanın anahtarlarından biridir.";

var ai_25_s3_7_1 = "Etik ve Sosyal Sorumluluk";
var ai_25_s3_7_2 = "• AI Etikleri: Yapay zekanın toplumsal etkileri, karar alma süreçlerindeki rolü ve insanlara olan etkileri konusunda bilinçli olmak.";
var ai_25_s3_7_3 = "• Sosyal Sorumluluk: AI'nın etkilerini anlamak ve bu teknolojiyi sosyal fayda yaratacak şekilde kullanmak, gençlerin sadece teknik anlamda değil, etik anlamda da gelişmiş bireyler olmalarını sağlar.";

var ai_25_s3_8_1 = "Duygusal Zeka (EQ)";
var ai_25_s3_8_2 = "• Empati ve Duygusal Anlayış: AI ve teknolojik araçlarla yoğun bir şekilde çalışırken, insan ilişkilerini ve duygusal farkındalığı kaybetmemek önemlidir.";
var ai_25_s3_8_3 = "• Stres Yönetimi: AI ve dijital dünyada sürekli öğrenme ve adaptasyonun getirdiği stresle başa çıkma becerileri de gelişmelidir.";

var ai_25_s3_9_1 = "Yenilikçi ve Girişimci Düşünce";
var ai_25_s3_9_2 = "• Girişimcilik: AI çağında yenilikçi iş fikirleri geliştirip bu fikirleri hayata geçirme becerisi.";
var ai_25_s3_9_3 = "• Risk Alma ve Deney Yapma: AI ve teknolojik inovasyonlar genellikle belirsizlik içerir. Bu yüzden gençlerin risk almaya istekli ve deneysel düşünceye açık olmaları gerekir.";

//gücünü kullan
var ai_25_s4u1_1_1 = "Dijital Okuryazarlık";
var ai_25_s4u1_1_2 = "• Bilgisayar ve teknoloji becerilerinle hangi alanlarda fark yaratabilirsin? Bu becerilerini okul projelerinde ya da gelecekteki kariyerinde nasıl daha etkin kullanabilirsin?";
var ai_25_s4u1_1_3 = "• AI hakkında sahip olduğun temel bilgileri derinleştirip, yapay zekanın gelecekte hangi mesleklerde önemli olacağını ön görebiliyor musun? Bu alanlarda nasıl bir kariyer planlayabilirsin?";

var ai_25_s4u1_2_1 = "Veri Okuryazarlığı";
var ai_25_s4u1_2_2 = "• Verileri analiz etme yeteneğini, okul projelerinde ya da iş hayatında nasıl kullanabilirsin? Verilere dayalı kararlar almanın sana nasıl avantaj sağlayacağını düşünüyorsun?";
var ai_25_s4u1_2_3 = "• Veri güvenliği ve gizliliği konusunda ne kadar bilinçlisin? Bu bilgini ileride çalışacağın bir şirkette ya da kendi girişiminde nasıl kullanabilirsin?";

var ai_25_s4u1_3_1 = "Kodlama ve Programlama";
var ai_25_s4u1_3_2 = "• Programlama becerilerini iş hayatında nasıl kullanabilir ve bu sayede farklı projelerde nasıl liderlik yapabilirsin? Hangi programlama dillerini öğrenmenin kariyer hedeflerine ulaşmada sana yardımcı olacağını düşünüyorsun?";
var ai_25_s4u1_3_3 = "•	Algoritmik düşünme yeteneğinle karşılaştığın problemleri nasıl daha sistematik çözümlerle çözebilirsin? Bu beceriyi ileride hangi mesleklerde avantaj olarak kullanabilirsin?";

var ai_25_s4u1_4_1 = "Eleştirel Düşünme ve Problem Çözme";
var ai_25_s4u1_4_2 = "•	Analitik düşünme becerinle verilerden ya da olaylardan anlam çıkarma yeteneğini hangi alanlarda geliştirebilir ve kullanabilirsin? Bu becerinin sana ileride hangi kariyer fırsatlarını sunacağını düşünüyorsun?";
var ai_25_s4u1_4_3 = "•	Yaratıcı problem çözme yeteneğini kullanarak hangi projelerde ya da iş alanlarında fark yaratabileceğini düşünüyorsun? Bu beceriyi nasıl daha fazla geliştirebilirsin?";

var ai_25_s4u1_5_1 = "Uyarlanabilirlik ve Sürekli Öğrenme";
var ai_25_s4u1_5_2 = "•	Hızla değişen teknoloji dünyasında nasıl adapte olabilirsin? Esnek olma yeteneğinle hangi mesleklerde daha başarılı olabileceğini düşünüyorsun?";
var ai_25_s4u1_5_3 = "•	Yaşam boyu öğrenme anlayışınla hangi yeni teknolojileri öğrenmeyi planlıyorsun? Bu öğrenme sürecini kariyerin boyunca nasıl sürdürebilirsin?";

var ai_25_s4u1_6_1 = "İletişim ve İşbirliği";
var ai_25_s4u1_6_2 = "•	Karmaşık teknik bilgileri sade bir şekilde açıklayabilme yeteneğinle hangi projelerde liderlik yapabilir ya da takım arkadaşlarına rehberlik edebilirsin? Bu beceriyi hangi iş alanlarında kullanabileceğini düşünüyorsun?";
var ai_25_s4u1_6_3 = "•	Takım çalışması becerinle hangi disiplinler arası projelerde başarılı olabilirsin? AI projelerinde işbirliği yaparak hangi hedeflere ulaşmayı planlıyorsun?";

var ai_25_s4u1_7_1 = "Etik ve Sosyal Sorumluluk";
var ai_25_s4u1_7_2 = "•	Yapay zekanın etik kullanımı hakkında sahip olduğun bilinçle hangi alanlarda fark yaratabilirsin? AI'nın sosyal etkilerini göz önünde bulundurarak, hangi projelerde yer almayı planlıyorsun?";
var ai_25_s4u1_7_3 = "•	AI teknolojilerini sosyal sorumluluk bilinciyle kullanarak toplumda nasıl bir etki yaratabilirsin? Bu farkındalığı okul ve kariyer hayatında nasıl kullanabilirsin?";

var ai_25_s4u1_8_1 = "Duygusal Zeka (EQ)";
var ai_25_s4u1_8_2 = "•	Empati yeteneğinle iş arkadaşların ya da müşterilerin ihtiyaçlarını nasıl daha iyi anlayabilirsin? Bu beceriyi liderlik ya da yönetim pozisyonlarında nasıl kullanabilirsin?";
var ai_25_s4u1_8_3 = "•	Stres yönetimi konusunda sahip olduğun yetkinliklerle yoğun ve zorlu projelerde nasıl başarılı olabilirsin? Bu beceriyi kariyer hayatında nasıl geliştirebilirsin?";

var ai_25_s4u1_9_1 = "Yenilikçi ve Girişimci Düşünce";
var ai_25_s4u1_9_2 = "•	Girişimci düşünme yeteneğinle AI çağında hangi yenilikçi iş fikirlerini hayata geçirebilirsin? Bu fikirleri gerçekleştirmek için hangi adımları atmayı düşünüyorsun?";
var ai_25_s4u1_9_3 = "•	Risk alma ve deney yapma konusunda ne kadar cesaretlisin? Bu cesareti okul projelerinde ya da iş hayatında nasıl fırsatlara dönüştürebilirsin?";

//kendine sorabilirsin
var ai_25_s4u2_1_1 = "Dijital Okuryazarlık";
var ai_25_s4u2_1_2 = "• Hangi temel bilgisayar becerilerine sahibim ve bu becerileri daha ileriye taşımak için neler yapabilirim?";
var ai_25_s4u2_1_3 = "• Teknolojiyi günlük yaşantımda nasıl kullanıyorum? Teknolojiyi sadece tüketici olarak mı kullanıyorum, yoksa üretici de olabiliyor muyum?";
var ai_25_s4u2_1_4 = "• Yapay zeka hakkında neler biliyorum? AI'nın hayatımı nasıl etkilediğini anlamaya ne kadar zaman ayırdım?";
var ai_25_s4u2_1_5 = "• Yapay zeka ve onun sunduğu fırsatlar hakkında bilgi edinmek beni heyecanlandırıyor mu? Bu alanda kendimi geliştirmek için hangi adımları atabilirim? ";

var ai_25_s4u2_2_1 = "Veri Okuryazarlığı";
var ai_25_s4u2_2_2 = "• Bir sorunla karşılaştığımda verilerden nasıl yararlanıyorum? Verilere dayalı kararlar almak işimi nasıl kolaylaştırıyor? ";
var ai_25_s4u2_2_3 = "• Kişisel verilerimi nasıl koruyorum? İnternette gizliliğimi sağlamak için hangi adımları atıyorum?";
var ai_25_s4u2_2_4 = "• Çevrim içi güvenlik ve veri gizliliği konularında ne kadar bilgi sahibiyim? Güvenlik açıkları konusunda farkındalığımı nasıl artırabilirim? ";
var ai_25_s4u2_2_5 = "• Kişisel ve başkalarına ait verileri koruma sorumluluğumun bilincinde miyim? Bu konuda geliştirmem gereken davranışlar neler? ";

var ai_25_s4u2_3_1 = "Kodlama ve Programlama";
var ai_25_s4u2_3_2 = "• Programlama dilleri öğrenmeye olan ilgim ne düzeyde? Yeni bir dil öğrenmeyi düşündüğümde nereden başlamalıyım? ";
var ai_25_s4u2_3_3 = "• Hangi alanlarda programlama bilgimi daha da geliştirebilirim? Mevcut projelerimde daha etkin olmak için hangi dilleri öğrenmeliyim?";
var ai_25_s4u2_3_4 = "• Problemleri çözmek için hangi adımları izliyorum? Mantıksal düşünme becerilerim ne kadar gelişmiş?";
var ai_25_s4u2_3_4 = "• Algoritmik düşünme yeteneğimi geliştirmek için hangi araçlardan faydalanabilirim? Bu beceriyi iş veya eğitim hayatımda nasıl daha iyi kullanabilirim? ";

var ai_25_s4u2_4_1 = "Eleştirel Düşünme ve Problem Çözme ";
var ai_25_s4u2_4_2 = "• Karar verirken olaylara nasıl yaklaşırım? Farklı seçenekleri değerlendirme konusunda ne kadar analitik düşünüyorum? ";
var ai_25_s4u2_4_3 = "• Analitik düşünme yeteneğimi geliştirmek için hangi kaynaklardan faydalanıyorum? Zorlu problemlere karşı nasıl bir strateji izliyorum? ";
var ai_25_s4u2_4_4 = "• Yaratıcı düşünceyi nasıl geliştirebilirim? Farklı perspektiflerden bakmayı nasıl öğrenebilirim?";
var ai_25_s4u2_4_5 = "• Teknoloji ve AI kullanarak daha yenilikçi çözümler üretme konusunda ne kadar isteklilik gösteriyorum?";

var ai_25_s4u2_5_1 = "Uyarlanabilirlik ve Sürekli Öğrenme";
var ai_25_s4u2_5_2 = "• Yeni teknolojilere ve değişen iş dünyasına ne kadar hızlı uyum sağlayabiliyorum? Değişikliklere karşı nasıl tepki veriyorum?";
var ai_25_s4u2_5_3 = "• Yapay zekanın hızlı gelişimi karşısında nasıl esnek olabilirim? İş hayatımda daha uyumlu olmak için hangi adımları atmalıyım?";
var ai_25_s4u2_5_4 = "• Kendimi geliştirmek için ne kadar istekliyim? Teknolojideki yenilikleri takip etme konusunda ne kadar aktifim? ";
var ai_25_s4u2_5_5 = "• Hangi alanlarda kendimi daha fazla geliştirmem gerektiğini düşünüyorum? AI dünyasında öğrenmeye nasıl devam edebilirim? ";

var ai_25_s4u2_6_1 = "İletişim ve İşbirliği";
var ai_25_s4u2_6_2 = "• Teknik konuları başkalarına açıklarken ne kadar başarılıyım? Kendi bilgimi sade ve anlaşılır hale getirme konusunda ne kadar becerikliyim? ";
var ai_25_s4u2_6_3 = "• Teknik bilgileri ekip arkadaşlarıma veya müşterilere daha net ifade edebilmek için hangi becerileri geliştirmeliyim?";
var ai_25_s4u2_6_4 = "• Takım içinde fikirlerimi paylaşırken ne kadar rahatım? Grup dinamiklerini anlamak ve katkı sağlamak için hangi becerilerimi geliştirmeliyim?";
var ai_25_s4u2_6_5 = "• AI projelerinde ekip üyeleriyle nasıl daha iyi iş birliği yapabilirim? Takım arkadaşlarımın güçlü yanlarını nasıl daha etkili kullanabilirim?";

var ai_25_s4u2_7_1 = "Etik ve Sosyal Sorumluluk";
var ai_25_s4u2_7_2 = "• AI kullanırken etik sorumluluklarım nelerdir? Bu sorumlulukları daha iyi yönetmek için neler yapmalıyım?";
var ai_25_s4u2_7_3 = "• AI projelerinde etik kararlar alırken, topluma ve çevreme nasıl bir fayda sağlayabilirim? ";
var ai_25_s4u2_7_4 = "• Yapay zeka projelerinde sosyal sorumluluk bilincimi nasıl geliştirebilirim? Toplumun iyiliği için hangi AI projelerine katkı sağlayabilirim?";
var ai_25_s4u2_7_5 = "• AI teknolojilerinin getirdiği fırsatları toplumsal faydaya nasıl dönüştürebilirim?";

var ai_25_s4u2_8_1 = "Duygusal Zeka (EQ)";
var ai_25_s4u2_8_2 = "• Yapay zeka ve teknolojiyle çalışırken insan ilişkilerime ne kadar önem veriyorum? Empati yeteneğimi nasıl geliştirebilirim?";
var ai_25_s4u2_8_3 = "• Teknoloji projelerinde duygusal zekamı ne kadar kullanıyorum? İş yerinde daha empatik olabilmek için neler yapabilirim?";
var ai_25_s4u2_8_4 = "• AI ve dijital dünyada sürekli öğrenmenin getirdiği stresle nasıl başa çıkıyorum? Stresle baş etme stratejilerim neler?";
var ai_25_s4u2_8_5 = "• Zorlayıcı projelerde kendimi nasıl rahatlatıyorum? Stres yönetimi konusunda hangi becerilerimi geliştirmeliyim? ";

var ai_25_s4u2_9_1 = "Yenilikçi ve Girişimci Düşünce";
var ai_25_s4u2_9_2 = "• Yapay zeka ile ilgili yenilikçi iş fikirleri geliştirme konusunda ne kadar istekliyim? Yeni projeler başlatmak için hangi adımları atıyorum? ";
var ai_25_s4u2_9_3 = "• Girişimcilik becerilerimi geliştirmek için hangi fırsatları değerlendiriyorum? AI projelerinde hangi iş fırsatlarını görebiliyorum?";
var ai_25_s4u2_9_4 = "• Deneysel düşünce yapısına ne kadar açığım? Yeni fikirleri test etmek için hangi stratejileri uyguluyorum? ";
var ai_25_s4u2_9_5 = "• Belirsizliklerle başa çıkarken nasıl kararlar alıyorum? Risk almanın getirdiği fırsatları nasıl değerlendirebilirim?";

//Yapay Zeka Çağı Yetkinliklerin İngilizce
var ai_25_eng_s3_1_1 = "Digital Literacy";
var ai_25_eng_s3_1_2 = "Fundamental Computer and Technology Skills: This encompasses computer usage, as well as knowledge of software and hardware. You should be able to use technology effectively and efficiently.";
var ai_25_eng_s3_1_3 = "Basics of Artificial Intelligence: Having foundational knowledge about what AI is, how it works, and how it shapes our lives.";


//gücünü kullan
var ai_25_eng_s4u1_1_1 = "Digital Literacy";
var ai_25_eng_s4u1_1_2 = "• In what areas can you make an impact with your computer and technology skills? How can you utilize these skills more effectively in school projects or your future career?";
var ai_25_eng_s4u1_1_3 = "• Do you think deepening your foundational knowledge about AI will help you understand which professions will be important in the future? How can you plan a career in these fields?";


//kendine sorabilirsin
var ai_25_eng_s4u2_1_1 = "Digital Literacy";
var ai_25_eng_s4u2_1_2 = "• What basic computer skills do I possess, and what can I do to advance these skills further? ";
var ai_25_eng_s4u2_1_3 = "• How do I use technology in my daily life? Am I using technology only as a consumer, or can I also be a producer? ";
var ai_25_eng_s4u2_1_4 = "• What do I know about artificial intelligence? How much time have I devoted to understanding how AI impacts my life? ";
var ai_25_eng_s4u2_1_5 = "• Am I excited about learning more about AI and the opportunities it presents? What steps can I take to develop myself in this field?";


//Ekip Çalışmasına Yatkınlık
var teamwork_1 = "Herhangi bir profesyonel ortamda, ekip çalışması başarının merkezinde yer alır. İster bir sağlık ekibinin, ister bir satış biriminin veya yaratıcı bir ajansın parçası olun, başkalarıyla etkili bir şekilde işbirliği yapma yeteneğiniz hem bireysel hem de kolektif başarılarda büyük rol oynar.  Ekip oluşturma becerileri, çalışanların uyumlu bir şekilde birlikte çalışmasına, çatışmaları çözmesine ve ortak hedefler peşinde koşmasına olanak tanıyan çok çeşitli davranışları, zihniyetleri ve yetkinlikleri kapsar.Günümüzün dinamik işyerinde, bir ekibin parçası olmak sadece teknik uzmanlıktan daha fazlasını gerektirir - duygusal zeka, uyarlanabilirlik ve insan davranışının derinlemesine anlaşılmasını gibi. Bu takım oluşturma becerileri, kişiliğini ve karakter özelliklerini özümseyerek değerlendirilebilir ve geliştirilebilir.Her iki modele birlikte bakarak, farklı bireylerin bir ekibe nasıl katkıda bulunabileceğine ve sorunsuz ekip çalışması için gerekli becerileri nasıl geliştirebileceklerine dair bütünsel bir resim elde etme şansımız var.";

var teamwork_best_1_1 = "Aktif Dinleme ve Empati";
var teamwork_best_1_2 = "Aktif dinleme ve empati, bir ekip içinde güven oluşturmak için çok önemlidir. Bu sadece kelimeleri duymakla ilgili değil, aynı zamanda arkalarındaki duyguları ve niyetleri anlamakla da ilgilidir. Bu bireyler cana yakın, duygusal olarak müsait ve başkalarının ihtiyaçlarına düşünceli bir şekilde yanıt verebilen kişilerdir, bu da onları herhangi bir işbirlikçi ortamda harika takım oyuncuları yapar.";

var teamwork_best_2_1 = "Etkili İletişim";
var teamwork_best_2_2 = "Bilgi alışverişinin ötesine geçer - açıklık ve duygusal zekayı içerir. Bireyin düşüncelerini başkalarının kolayca anlayabileceği şekilde ifade etme yeteneğini gösterir. Bu beceride güçlü çalışanlar, yanlış anlamaları azaltmaya, üretkenliği artırmaya ve olumlu çalışma ilişkilerini geliştirmeye yardımcı olur.";

var teamwork_best_3_1 = "İşbirliği";
var teamwork_best_3_2 = "Başkalarıyla iyi çalışma, ortak hedeflere ulaşmak için fikir ve sorumlulukları paylaşma yeteneğidir. Bu kişiler doğal olarak işbirliğinde mükemmeldir. İşbirlikçi, arkadaş canlısı ve uyumlu bir birim olarak çalışmaya isteklidirler ve herkesin kendini değerli hissettiği kapsayıcı bir ekip ortamına katkıda bulunurlar. ";

var teamwork_best_4_1 = "Uyumluluk";
var teamwork_best_4_2 = "Bunalmadan yeni durumlara, zorluklara ve taleplere uyum sağlama yeteneğini ifade eder. Bu kişiler, belirsiz ortamlarda değişimi benimseme ve başarılı olma olasılıkları daha yüksektir. Bu esneklik, önceliklerin beklenmedik bir şekilde değişebildiği hızlı tempolu iş yerlerinde çok önemlidir.";

var teamwork_best_5_1 = "Çatışma Çözümü";
var teamwork_best_5_2 = "Her ekip bir noktada çatışmayla karşı karşıya kalacaktır ve bu çatışmaları dostane bir şekilde çözme yeteneği, ekip uyumunu korumak için çok önemlidir. Bu bireyler, anlaşmazlıkları yönlendirmede etkili olma eğilimindedir. Baskı altında sakindirler, empatiktirler ve çatışmacı davranışlarda bulunmak yerine karşılıklı yarar sağlayan çözümler bulmaya odaklanırlar.";

var teamwork_best_6_1 = "İnisiyatif";
var teamwork_best_6_2 = "İnisiyatif almak, proaktif olmak, talimat beklememek ve görevleri bağımsız olarak ele almak anlamına gelir. Bu yetkinliğe sahip kişiler doğal olarak inisiyatif göstermeye daha meyillidir. Bu kişiler, genellikle masaya yeni fikirler ve enerji getiren, akranlarını da aynı şeyi yapmaya motive eden, kendi kendine başlayanlardır.";

var teamwork_best_7_1 = "Geri Bildirim";
var teamwork_best_7_2 = "Yapıcı geri bildirim vermek ve almak, ekip çalışmasının çok önemli bir yönüdür. Geri bildirimi şefkatli bir şekilde iletebilir, olumlu bir şekilde alınmasını sağlayabilirler ve ayrıca geri bildirimi kendileri duymaya ve uygulamaya açıktırlar. ";

var teamwork_best_8_1 = "Takım Oluşturma";
var teamwork_best_8_2 = "Güçlü, uyumlu bir ekip oluşturmak ve sürdürmek, ilişkilere ve morale odaklanmayı gerektirir. Genellikle karizmatik ve kapsayıcı olurlar, bu da çeşitli ekip üyeleri arasında birlik ve işbirliği duygusu geliştirmelerini kolaylaştırır. ";

var teamwork_best_9_1 = "Mesleki Gelişim";
var teamwork_best_9_2 = "Mesleki gelişim, sadece kendi becerilerini geliştirmeyi değil, aynı zamanda başkalarını da büyümeye teşvik etmeyi içerir. Bu bireyler sürekli gelişime değer verme eğilimindedir. Öğrenme fırsatlarını araştırma ve başkalarını da aynı şeyi yapmaya motive etme konusunda proaktiftirler ve ekibin genel büyümesini sağlarlar. ";

var teamwork_best_10_1 = "Liderlik";
var teamwork_best_10_2 = "Vizyon, iletişim ve başkalarına harekete geçmeleri için ilham verme yeteneğinin bir kombinasyonunu gerektirir. Kararlıdırlar, motive edicidirler ve ekiplerini bu hedeflere ulaşmaya yönlendirirken net hedefler belirleme yeteneğine sahiptirler. ";

//gücünü kullan
var teamwork_s3u1_1_1 = "Aktif Dinleme ve Empati";
var teamwork_s3u1_1_2 = "• Müşteri ihtiyaçlarını daha iyi anlamak ve çözümleri daha etkili bir şekilde uyarlamak için güçlü dinleme becerilerini nasıl kullanabilirsin? ";
var teamwork_s3u1_1_3 = "• Empati yeteneğin, daha iyi sonuçlar elde etmek için hem müşterilerle hem de ekip üyeleriyle daha güçlü ilişkiler geliştirmene nasıl yardımcı olabilir? ";

var teamwork_s3u1_2_1 = "Efektif İletişim";
var teamwork_s3u1_2_2 = "• Ekibinin içinde eyleme ve uyuma ilham vermek için iletişimininin netliğini nasıl daha da artırabilirsin? ";
var teamwork_s3u1_2_3 = "• Müzakerelerde veya zor paydaşlarla uğraşırken daha etkili olmak için iletişim tarzını nasıl uyarlayabilirsin?";

var teamwork_s3u1_3_1 = "İşbirliği";
var teamwork_s3u1_3_2 = "• İşbirliği becerilerini işlevler arası projelere nasıl taşıyabilir ve tüm ekip üyelerinin duyulduğunu hissetmelerini ve etkili bir şekilde katkıda bulunmalarını nasıl sağlayabilirsin? ";
var teamwork_s3u1_3_3 = "• İşbirlikçi ekip çalışması yoluyla daha yaratıcı problem çözmeyi teşvik etmek için hangi adımları atabilirsin? ";

var teamwork_s3u1_4_1 = "Uyumluluk";
var teamwork_s3u1_4_2 = "• Pazardaki veya endüstri trendlerindeki değişikliklerden daha iyi yararlanmak için uyumluluğunu nasıl kullnabilirsin? ";
var teamwork_s3u1_4_3 = "• Ekip süreçlerini iyileştirmek veya ekibe geçişlerde daha sorunsuz bir şekilde liderlik etmek için esnekliğini hangi yollarla kullanabilirsin? ";

var teamwork_s3u1_5_1 = "Çatışma Çözümü";
var teamwork_s3u1_5_2 = "• Çatışma çözme becerilerin, ekip dinamiklerini güçlendirecek ve üretkenliği artıracak şekilde anlaşmazlıkları ele almak için nasıl kullanılabilir? ";
var teamwork_s3u1_5_3 = "• Uzun vadeli iş ilişkilerinin bozulmadan kalmasını sağlamak için müşteriler veya ortaklarla olan çatışmalarda nasıl arabuluculuk yapabilirsin? ";

var teamwork_s3u1_6_1 = "Girişim";
var teamwork_s3u1_6_2 = "• İşletmen için büyüme fırsatlarını veya yeni pazarları belirleme konusunda nasıl daha fazla inisiyatif alabilirsin? ";
var teamwork_s3u1_6_3 = "• Ekibindeki diğer kişileri proaktif olma ve projeleri sahiplenme konusunda liderliğini takip etmeye nasıl teşvik edebilirsin?";

var teamwork_s3u1_7_1 = "Geri Bildirim";
var teamwork_s3u1_7_2 = "• Daha da yüksek performans elde etmek için geri bildirimi hem kişisel olarak hem de ekibin için sürekli iyileştirme aracı olarak nasıl kullanabilirsin? ";
var teamwork_s3u1_7_3 = "• Ekibinizniçinde hesap verebilirliği teşvik eden ve daha iyi sonuçlar elde edilmesini sağlayan bir geri bildirim kültürünü nasıl oluşturabilirsin? ";

var teamwork_s3u1_8_1 = "Takım Oluşturma";
var teamwork_s3u1_8_2 = "• Ekibinin hedeflerini şirketin uzun vadeli hedefleriyle uyumlu hale getirmek için ekip oluşturma gücünüzden nasıl yararlanabilirsin? ";
var teamwork_s3u1_8_3 = "• Ekibinin içinde daha yüksek düzeyde işbirliği ve başarıya yol açan daha güçlü bağlantılar kurmak için ne gibi eylemler gerçekleştirebilirsin?";

var teamwork_s3u1_9_1 = "Mesleki Gelişim";
var teamwork_s3u1_9_2 = "• Kurumunda bir öğrenme ve yenilik kültürünü teşvik etmek için mesleki gelişime olan bağlılığını nasıl kullanabilirsin? ";
var teamwork_s3u1_9_3 = "• Kendi profesyonel gelişiminin, ekibinizdeki diğer kişilere hem kendilerine hem de işletmeye fayda sağlayan gelişmeleri sürdürmeleri için nasıl ilham verebilir? ";

var teamwork_s3u1_10_1 = "Liderlik";
var teamwork_s3u1_10_2 = "• Liderlik gücün, ekibin satış veya müşteri hizmetleri hedeflerini aşmasına nasıl yardımcı olabilir? ";
var teamwork_s3u1_10_3 = "• Sürekli olarak güçlü sonuçlar elde eden yüksek performanslı bir kültür oluşturmak için liderliğini nasıl daha fazla kullanabilirsin? ";

//kendine sorabilirsin
var teamwork_s3u2_1_1 = "Aktif Dinleme ve Empati";
var teamwork_s3u2_1_2 = "• Ne sıklıkla başkalarının konuştuklarında duygularını ve bakış açılarını anlamaya gerçekten odaklanıyorum? ";
var teamwork_s3u2_1_3 = "• Hangi durumlarda konuşmalar sırasında dikkatim dağılıyor veya sabırsız oluyorum? ";
var teamwork_s3u2_1_4 = "• Aynı fikirde olmadığımda bile empati ve şefkatle yanıt verme yeteneğimi nasıl geliştirebilirim? ";

var teamwork_s3u2_2_1 = "Etkili İletişim";
var teamwork_s3u2_2_2 = "• İletişim tarzımı kiminle konuştuğuma göre uyarlıyor muyum ve eğer değilse, nasıl geliştirebilirim? ";
var teamwork_s3u2_2_3 = "• Mesajımın anlaşıldığından emin olmak için ne sıklıkla açıklama istiyorum ve bunu yapmamı engelleyen nedir? ";
var teamwork_s3u2_2_4 = "• Hem yazılı hem de sözlü olarak daha açık, özlü ve etkili iletişim kurmak için ne yapabilirim? ";

var teamwork_s3u2_3_1 = "İşbirliği";
var teamwork_s3u2_3_2 = "• Karar vermeden veya görevlerde ilerlemeden önce aktif olarak başkalarından girdi ve fikir alıyor muyum? ";
var teamwork_s3u2_3_3 = "• Kendi katkılarımı başkalarını düşüncelerini ve fikirlerini paylaşmaya teşvik etmekle ne kadar iyi dengeleyebilirim? ";
var teamwork_s3u2_3_3 = "• Ekibim içinde daha güçlü işbirlikçi ilişkiler kurmak için hangi adımları atabilirim? ";

var teamwork_s3u2_4_1 = "Uyumluluk";
var teamwork_s3u2_4_2 = "• Beklenmedik değişikliklere veya zorluklara genellikle nasıl yanıt veririm ve bu durumları daha olumlu bir şekilde kucaklamak için ne yapabilirim? ";
var teamwork_s3u2_4_3 = "• Değişimle karşı karşıya kaldığımda, bunalmış veya dirençli olmak yerine nasıl odaklanmış ve üretken kalabilirim? ";
var teamwork_s3u2_4_4 = "• Farklı çalışma ortamlarında esnekliğimi artırmak için hangi yeni beceriler veya tutumlar geliştirebilirim? ";

var teamwork_s3u2_5_1 = "Çatışma Çözümü";
var teamwork_s3u2_5_2 = "• Çatışmalar ortaya çıktığında, soruna mı yoksa ilgili kişilere mi odaklanıyorum ve ikisini nasıl daha iyi ayırabilirim? ";
var teamwork_s3u2_5_2 = "• Gergin durumlarda ne kadar sakin ve sakin kalıyorum ve bunu geliştirmeme hangi teknikler yardımcı olabilir? ";
var teamwork_s3u2_5_3 = "• Çatışma çözümüne hem kendi bakış açıma hem de başkalarının bakış açısına saygı duyacak şekilde nasıl daha iyi yaklaşabilirim?";

var teamwork_s3u2_6_1 = "Girişim";
var teamwork_s3u2_6_2 = "• İyileştirme fırsatlarını belirlemede veya işte yeni zorlukların üstesinden gelmede ne kadar proaktifim?";
var teamwork_s3u2_6_3 = "• Ne zaman inisiyatif almaktan çekiniyorum ve hangi korkular veya engeller beni engelliyor? ";
var teamwork_s3u2_6_4 = "• Risk olsa bile yeni fikirler veya çözümler önerme konusunda kendime daha fazla güvenmek için ne yapabilirim?";

var teamwork_s3u2_7_1 = "Geri Bildirim";
var teamwork_s3u2_7_2 = "• Geri bildirim aldığımda nasıl tepki veririm ve yapıcı bir şekilde yanıt verdiğimden nasıl emin olabilirim?";
var teamwork_s3u2_7_3 = "• Başkalarına geri bildirim verme konusunda tutarlı mıyım ve bunun hem zamanında hem de yardımcı olduğundan nasıl emin olabilirim? ";
var teamwork_s3u2_7_4 = "• Başkalarından gelen geri bildirimlere daha açık olmak ve bunu kişisel ve profesyonel gelişim için bir araç olarak kullanmak için hangi adımları atabilirim?";

var teamwork_s3u2_8_1 = "Takım Oluşturma";
var teamwork_s3u2_8_2 = "• Ekibim içinde olumlu ilişkiler geliştirmek için ne yapmalıyım ve nereleri geliştirebilirim?";
var teamwork_s3u2_8_3 = "• Daha kapsayıcı ve destekleyici bir ekip kültürü oluşturmaya nasıl yardımcı olabilirim? ";
var teamwork_s3u2_8_4 = "• Takım arkadaşlarımın güçlü ve zayıf yönlerini anlamak için çaba sarf ediyor muyum ve onları nasıl daha iyi destekleyebilirim? ";

var teamwork_s3u2_9_1 = "Mesleki Gelişim";
var teamwork_s3u2_9_2 = "• Aktif olarak yeni beceriler geliştirmek için fırsatlar arıyor muyum ve eğer değilse, beni engelleyen nedir?";
var teamwork_s3u2_9_3 = "• Mesleki gelişimimi mevcut iş yükümle nasıl dengelerim ve büyümeye nasıl öncelik verebilirim?";
var teamwork_s3u2_9_4 = "• Ekibimdeki diğer kişileri kendi gelişimlerine yatırım yapmaya teşvik etmek için ne yapabilirim?";

var teamwork_s3u2_10_1 = "Liderlik";
var teamwork_s3u2_10_2 = "• Kendim ve başkaları için net hedefler ve beklentiler ne kadar iyi belirlerim ve bu alanda nasıl gelişebilirim?";
var teamwork_s3u2_10_3 = "• Örnek olarak liderlik ediyor muyum ve başkalarına daha etkili bir şekilde ilham vermek ve motive etmek için hangi davranışları modelleyebilirim?";
var teamwork_s3u2_10_4 = "• Daha güçlü karar verme ve delegasyon becerileri geliştirmek için hangi adımları atabilirim?";


//Ekip Çalışmasına Yatkınlık İngilizce
var teamwork_best_eng_1_1 = "Active Listening and Empathy";
var teamwork_best_eng_1_2 = "Active listening and empathy are crucial for building trust within a team. It’s not just about hearing words but also understanding the emotions and intentions behind them. These individuals are approachable, emotionally available, and responsive to the needs of others, making them excellent team players in any collaborative environment.";

var teamwork_best_eng_2_1 = "Effective Communication";
var teamwork_best_eng_2_2 = "Communication goes beyond exchanging information—it involves clarity and emotional intelligence. It reflects the ability to convey thoughts in a way that others can easily understand. Employees who are strong in this skill help reduce misunderstandings, increase productivity, and foster positive working relationships.";

var teamwork_best_eng_3_1 = "Collaboration";
var teamwork_best_eng_3_2 = "Working well with others involves sharing ideas and responsibilities to achieve common goals. These individuals naturally excel in collaboration. They are eager to work as part of a cooperative, friendly, and cohesive unit, contributing to an inclusive team environment where everyone feels valued.";


//gücünü kullan
var teamwork_eng_s3u1_1_1 = "Active Listening and Empathy";
var teamwork_eng_s3u1_1_2 = "• How can you use your strong listening skills to better understand customer needs and tailor solutions more effectively?";
var teamwork_eng_s3u1_1_3 = "• How can your ability to empathize help you build stronger relationships with both customers and team members, leading to better outcomes?";

var teamwork_eng_s3u1_2_1 = "Effective Communication";
var teamwork_eng_s3u1_2_2 = "• How can you further enhance the clarity of your communication to inspire action and alignment within your team?";
var teamwork_eng_s3u1_2_3 = "• How can you adapt your communication style to be more effective in negotiations or when dealing with difficult stakeholders?";


//kendine sorabilirsin
var teamwork_eng_s3u2_1_1 = "Active Listening and Empathy";
var teamwork_eng_s3u2_1_2 = "• How often do I genuinely focus on understanding the emotions and perspectives of others when they speak?";
var teamwork_eng_s3u2_1_3 = "• In which situations do I get distracted or impatient during conversations?";
var teamwork_eng_s3u2_1_4 = "• How can I improve my ability to respond with empathy and compassion, even when I disagree?";

var teamwork_eng_s3u2_2_1 = "Effective Communication"
var teamwork_eng_s3u2_2_2 = "• Do I adapt my communication style based on who I’m talking to, and if not, how can I improve this?";
var teamwork_eng_s3u2_2_3 = "• How often do I ask for clarification to ensure my message is understood, and what stops me from doing so?";
var teamwork_eng_s3u2_2_4 = "• What can I do to communicate more clearly, concisely, and effectively, both in writing and verbally?";



//Yaşamda İlerleme Tarzın
var lifestyle_25_plus_manifesting_generator_image_w = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-w/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_manifesting_generator_image_m = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-m/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_manifesting_generator_name = "Enerjik";
var lifestyle_25_plus_manifesting_generator_1 = "Kariyer ve liderlik dünyasındaki yolculuğun benzersiz. Çevrendekiler yeteneklerini fark ettiğinde, bireyleri, grupları ve sistemleri organize etmeyi ve yönetmeyi içeren rollerde gerçekten parlarsın.\n\nUyumlu bir sonuç için tüm unsurları yöneten bir orkestranın şefi gibisin.Kariyerinde yetenekli bir organizatör, yönetici, ağ oluşturucu veya arabulucu olma potansiyeline sahipsin.\nRolün, enerji kaynaklarını en verimli şekilde kullanmak için diğerlerine rehberlik etmek etrafında döner.Enerji dinamiklerine dikkat etmen çok önemli.\n\n Çevrendekilerin enerjilerinden beslenir ve bu enerjiyi katlayarak büyütebilirsin.Enerjin iyi yönetilmezse, ileriki yaşlarda tükenmişliğe ve bitkinliğe yol açabilir.Durmayı bilmek ve dinlenmek sağlığını korumak için çok önemli.";
var lifestyle_25_plus_manifesting_generator_2 = "İçgüdülerine ne kadar güvenir ve doğru anı beklersen, hayatın o kadar tatmin edici ve keyifli hale gelir.Kendini bir mıknatıs gibi düşünebilirsin, enerjinin fırsatları doğal olarak sana çektiğini gözlemleyebilirsin.";
var lifestyle_25_plus_manifesting_generator_3 = "Eforsuz ve doğal olan yolun, anda hayatın sunduklarına cevap verdiğinde kendini gösterecektir.Enerjin, hayatın sana getirdiklerine cevap vermek aracılığıyla taahhüt ettiğin şeyde ustalaşmana yardımcı olmak için burada.Doğru yolda olduğunun işareti, işlerin doğal olarak yerine oturmaya başlaması ve içinde bir tatmin hissi.\n\nÇok büyük bir enerjin olduğu için seni gerçekten ilgilendirmeyen veya seni tatmin etmeyen şeylere evet dememeye ve bağlanmamaya dikkat etmelisin.İç pusulan içgüdülerin aracılığıyla seninle iletişim kurar.Hayatı doğru yaşamak için stratejin hayatın sana getirmesini beklemek ve gelene cevap vermektir.Önce içgüdülerini dinle ve başkalarının ne yapman gerektiğini dikte etmesine izin verme.\n\nSen monoton bir rutin için yaratılmadın.Üretmeye, inşa etmeye devam et ve inanılmaz enerjine her zaman güven.";
var lifestyle_25_plus_manifesting_generator_motto = "Hayat tatmini için benimseyeceğin slogan: Yaptığın işi sev ve sevdiğin işi yap!";

var lifestyle_25_plus_generator_image_w = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-w/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_generator_image_m = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/generator-m/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_generator_name = "Enerjik";
var lifestyle_25_plus_generator_1 = "İş dünyasında ve kariyerinde kendine has ve benzersiz bir enerjin var. İşleri halletmede, bir şeyler inşa etmede ve büyütmede harikasın. Enerjini yapmayı sevdiğin işlere kullandıktan sonra başını yastığa koyduğunda tatmin hissi ile uyuyabilirsin.\n\nHayatta ve işte tatmininin anahtarı sadece çok çalışmak değil, enerjini nasıl etkili ve verimli kullandığın. Yaptığın iş refahın ve esenliğin için çok önemli. İçinde harekete geçmene ve bir şeyler yaratmana yardımcı olan güçlü bir enerji kaynağın var.\n\nDikkat etmen gereken başlamak ya da başlatmak zorunda olmadığını bilmek. Gücün, içgüdülerine dayanarak hayata cevap vermekte ve doğru ipuçlarını beklemekte yatıyor.";
var lifestyle_25_plus_generator_2 = "İçgüdülerine ne kadar güvenir ve doğru anı beklersen, hayatın o kadar tatmin edici ve keyifli hale gelir. Kendini bir mıknatıs gibi düşünebilirsin, enerjinin fırsatları doğal olarak sana çektiğini gözlemleyebilirsin.";
var lifestyle_25_plus_generator_3 = "Eforsuz ve doğal olan yolun, anda hayatın sunduklarına cevap verdiğinde kendini gösterecektir.Enerjin, hayatın sana getirdiklerine cevap vermek aracılığıyla taahhüt ettiğin şeyde ustalaşmana yardımcı olmak için burada.Doğru yolda olduğunun işareti, işlerin doğal olarak yerine oturmaya başlaması ve içinde bir tatmin hissi.\n\nÇok büyük bir enerjin olduğu için seni gerçekten ilgilendirmeyen veya seni tatmin etmeyen şeylere evet dememeye ve bağlanmamaya dikkat etmelisin.İç pusulan içgüdülerin aracılığıyla seninle iletişim kurar.Hayatı doğru yaşamak için stratejin hayatın sana getirmesini beklemek ve gelene cevap vermektir.Önce içgüdülerini dinle ve başkalarının ne yapman gerektiğini dikte etmesine izin verme.\n\nSen monoton bir rutin için yaratılmadın.Üretmeye, inşa etmeye devam et ve inanılmaz enerjine her zaman güven.";
var lifestyle_25_plus_generator_motto = "Hayat tatmini için benimseyeceğin slogan: Yaptığın işi sev ve sevdiğin işi yap!";

var lifestyle_25_plus_projektor_image = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/projector/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_projektor_name = "Rehber";
var lifestyle_25_plus_projektor_1 = "Kariyer ve liderlik dünyasındaki yolculuğun benzersiz. Çevrendekiler yeteneklerini fark ettiğinde, bireyleri, grupları ve sistemleri organize etmeyi ve yönetmeyi içeren rollerde gerçekten parlarsın. Uyumlu bir sonuç için tüm unsurları yöneten bir orkestranın şefi gibisin.\n\nKariyerinde yetenekli bir organizatör, yönetici, ağ oluşturucu veya arabulucu olma potansiyeline sahipsin. Rolün, enerji kaynaklarını en verimli şekilde kullanmak için diğerlerine rehberlik etmek etrafında döner.\n\nEnerji dinamiklerine dikkat etmen çok önemli. Çevrendekilerin enerjilerinden beslenir ve bu enerjiyi katlayarak büyütebilirsin. Enerjin iyi yönetilmezse, ileriki yaşlarda tükenmişliğe ve bitkinliğe yol açabilir. Durmayı bilmek ve dinlenmek sağlığını korumak için çok önemli.";
var lifestyle_25_plus_projektor_2 = "Tanınmayı ve doğru davetleri beklemek, başarının anahtarıdır.  Enerjini ve bilgeliğini en anlamlı ve etkili şekilde yönlendirmeni sağlar. Senin için doğru davetleri kabul etme konusunda seçici ol. Bu süreçte sana rehberlik etmesi için sezgilerine güven.";
var lifestyle_25_plus_projektor_3 = "Doğuştan gelen yeteneklerinden biri, başkalarındaki potansiyeli tanımak. Bu, yetenekleri tespit edebileceğin ve onları doğru görevler ve projelerle eşleştirebileceğin için seni modern dünya için ideal bir lider ve rehber yapar.\n\nİnsanları ve fırsatları doğal olarak sana çeken benzersiz bir varlığın var. Her seferinde bir kişiye odaklanma yeteneğin, son derece kişisel ve anlamlı etkileşimler yaratır.\n\nBecerilerin, yeteneklerin ve dünyayı benzersiz algılama şeklinle tanındığında ve doğru davetleri aldığında, gerçek potansiyelini gerçekleştirme yolundasın demektir. Senin için başarı, zekanı ve bilgeliğini gerçekten takdir eden ve kabul eden doğru insanları ve fırsatları seçmekle ilgili. ";
var lifestyle_25_plus_projektor_motto = "Çevrendekiler için bilge ve zeki bir rehber olabilirsin. Bilgeliğini sadece sana davet verenler ile paylaş.";

var lifestyle_25_plus_manifestor_image = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/manifestor/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_manifestor_name = "Başlatıcı";
var lifestyle_25_plus_manifestor_1 = "Benzersiz ve güçlü bir yeteneğe sahipsin - Çevrendeki bir çok kişiden farklı olarak, bir şeyleri başlatmak  için doğuştan gelen bir beceriye sahipsin.Rolün çok önemli, çünkü ilk adımı atmazsan, işler olması gerektiği gibi gelişmez.Kendi kendine yetebilirsin, bağımsız çalışmak ve hareket etmek için buradasın, yaptıklarınla başkalarını etkilersin.\n\nİlişkiler ve işler alanında da, başlatıcı rolünü oynarsın – ilk hamleyi yapan kişi sen olmalısın.Kendini sık sık geleceğe bakarken, başkalarının vizyonunu yakalamasını beklerken bulabilirsin.Çevrendekiler senin enerjini kapalı ve dışarı doğru kuvvetlice iten bir güç gibi algılayabilir.";
var lifestyle_25_plus_manifestor_2 = "Senin için başarılı etkileşimlerin anahtarı, bir şeyler yapmak ve başlatmak için tasarlanmış biri olduğunu kabul etmekte yatar.Bir şeyleri başlatırken, etkilenecek tüm kişileri bilgilendirebilirsen, senin ve etrafındakiler için güzel bir etkileşimi sağlayabilirsin.";
var lifestyle_25_plus_manifestor_3 = "Kontrol edilmekten hiç hoşlanmadığın bir gerçek.Buna rağmen, harekete geçmeden önce bilgilendirme sanatını öğrenmen çok önemlidir.Harekete geçmeden önce çevrendekileri bilgilendirdiğinde açık, verimli ve barışçıl bir iletişimin önünü açmış olursun.Bilgilendirmek sana doğal gelmese de, ustalaşmaya değer bir uygulamadır ve tüm hayatında ve iş yaşamında sana yardımcı olacak önemli unsurlardan biridir.\n\nİş yaşamında ilerlerken, yapılması veya başlatılması gereken şeyleri doğal olarak göreceksin.Bu konularda iç görülerini takip ederek ilerle, ve etkilenecek herkesi de bilgilendir.İş yaşamında başarı ve huzurun anahtarı senin için tam olarak budur";
var lifestyle_25_plus_manifestor_motto = "Başlatma gücün ile bilgilendirme sanatı arasındaki dengeyi anlamak ve uygulamak iş yaşamındaki başarının ve içsel huzurunun kaynağı olacaktır.";

var lifestyle_25_plus_reflektor_image = "https://appwrite.anahtarsensin.com/v1/storage/buckets/6708de8e00054cee7bd1/files/reflector/view?project=665474aa001cd7ecbebd&project=665474aa001cd7ecbebd&mode=admin";
var lifestyle_25_plus_reflektor_name = "Yansıtıcı";
var lifestyle_25_plus_reflektor_1 = "Doğru ortamda, insanların, toplulukların ve işletmelerin objektif bir değerlendirmesini sağlayan bir kişi olarak parlayabilirsin.Bakış açın tamamen benzersiz ve ilerlemeyi veya dikkat edilmesi gereken alanları doğru bir şekilde değerlendirerek düşünmene ve genel bir bakış açısı kazanmana olanak tanır.\n\nBaşkalarını kabul etme, doğru gitmeyen şeyleri vurgulayarak onları işbirliğine, barışa ve eşitliğe doğru yönlendirme konusunda olağanüstü bir yeteneğe sahipsin.Bir işletmenin, topluluğun veya bir grubun merkezinde olduğunda, özgürce hareket ettiğinde ve işlerin bir bütün olarak nasıl yürüdüğünü yansıtmak için buradasın.\n\nÇevrendekilere çeşitliliği kucaklamanın önemini öğreterek özellikle etkili olabilirsin.";
var lifestyle_25_plus_reflektor_2 = "Objektif bir bakış açısı sunarak etrafındaki her şeyi ve herkesi yansıtmak yeteneklerin arasında. Varlığın sessizlik, nezaket ve müdahaleci olmama ile tanımlanabilir. Çevreyi bir bütün olarak yansıtırsın ve diğerleri kim olduğunu tam olarak anlamakta zorlanabilir. ";
var lifestyle_25_plus_reflektor_3 = "Karar verirken acele etmemelisin.Önemli konuları değerlendir ve güvendiğin kişiler ile konuyu konuş.Başkalarıyla etkileşim kurarken, yanlış ortamda olmak veya herkese uymaya çalışmak gibi tuzakların farkında ol.Başkalarına aşırı bağımlı olmaktan veya görünmez hissetmekten kaçın, gerçek benliğinden ödün verme.\n\nBir şeyleri başlatma, hayata geçirme veya olmaya zorlama dürtüsüne diren, çünkü bu başkalarında dirence neden olabilir ve hayal kırıklığına yol açabilir.Başkalarının korkularına, duygularına, stresine ve kaygılarına kapılmaktan kaçın.Etrafındakilerle sağlıklı bir mesafeyi her zaman koru ve acele etmekten veya karar vermek için baskı altında kalmaktan kaçın.\n\nKendin için doğru seçimleri yapabilmen ve iyi hissetmen için bulunduğun ortamın senin için doğru olması çok önemli.Çünkü sen bulunduğun ortamların enerjisini yansıtma yeteneğine sahipsin.Gerek özel yaşamında gerek iş yaşamında ortamına hep önem ver.";
var lifestyle_25_plus_reflektor_motto = "Dünyaya benzersiz bir bakış açısı getirmek için buradasın. Bulunduğun ortamın senin için doğru olduğuna emin ol!";

//gücünü kullan
var lifestyle_25_plus_starter_question_name = "Başlatıcı";
var lifestyle_25_plus_starter_evaluation_1 = "• Harekete geçmem için bana ne ilham veriyor ve direnci azaltmak için bunu yapmadan önce başkalarını nasıl bilgilendirebilirim? ";
var lifestyle_25_plus_starter_evaluation_2 = "• Dışarıdan izin veya onay beklemeden liderlik ettiğimde nasıl hissediyorum? ";
var lifestyle_25_plus_starter_evaluation_3 = "• Bir başlatıcı olarak doğal rolüme adım attığımda başkalarının tepkisiyle nasıl başa çıkabilirim ve olası çatışmayı hafifletmek için ne yapabilirim? ";
var lifestyle_25_plus_starter_evaluation_4 = "• Büyük projelere veya değişikliklere başladıktan sonra enerjimi yönetmek ve tükenmişliği önlemek için hangi stratejileri kullanıyorum? ";
var lifestyle_25_plus_starter_evaluation_5 = "• Hayatımın hangi alanlarında yeni şeylere başlamak için en çok güçlenmiş hissediyorum ve bu enerjiyi daha bilinçli bir şekilde nasıl kullanabilirim? ";

var lifestyle_25_plus_energetic_question_name = "Enerjik";
var lifestyle_25_plus_energetic_evaluation_1 = "• Hangi aktiviteler beni en çok tatmin ediyor ve günlük hayatımın daha fazlasını bu aktivitelerle nasıl uyumlu hale getirebilirim? ";
var lifestyle_25_plus_energetic_evaluation_2 = "• Fırsatlara yanıt verdiğimde ve beklemeden harekete geçtiğimde bedenimde nasıl hissediyorum? ";
var lifestyle_25_plus_energetic_evaluation_3 = "• Hayatımın hangi alanlarında bir şeyleri olmaya zorluyorum ve daha duyarlı bir yaklaşıma nasıl geçebilirim? ";
var lifestyle_25_plus_energetic_evaluation_4 = "• Sakral (içgüdüsel tepkim) doğru yolda olduğumda bana hangi sinyalleri veriyor ve onlara nasıl daha tutarlı bir şekilde güvenebilir ve takip edebilirim? ";
var lifestyle_25_plus_energetic_evaluation_5 = "• Hayal kırıklığına uğradığımda veya sıkışmış hissettiğimde enerjimi nasıl yeniden şarj ederim ve bu zamanlarda daha fazla sabır geliştirmek için ne yapabilirim? ";

var lifestyle_25_plus_starter_energetic_question_name = "Başlatıcı Enerjik";
var lifestyle_25_plus_starter_energetic_evaluation_1 = "• Harekete geçmeden önce hem başlatma arzumu hem de çevremdeki dünyaya yanıt verme ihtiyacımı nasıl onurlandırabilirim?";
var lifestyle_25_plus_starter_energetic_evaluation_2 = "• Hayatımın hangi alanları çoklu görev yeteneğimden yararlanır ve gereksiz dikkat dağıtıcı şeylerden kaçınmak için odağımı nasıl düzeltebilirim? ";
var lifestyle_25_plus_starter_energetic_evaluation_3 = "• Hayal kırıklığı veya sabırsızlık anlarıyla nasıl başa çıkabilirim ve şu anki yaklaşımım hakkında bu duygulardan ne öğrenebilirim? ";
var lifestyle_25_plus_starter_energetic_evaluation_4 = "• Yeni bir şeye başlama dürtüsünü hissettiğimde, bir sonraki adımın doğru olduğundan emin olmak için bağırsaklarımı (Sakral tepki) nasıl kontrol edebilirim? ";
var lifestyle_25_plus_starter_energetic_evaluation_5 = "• Yön değiştirme konusunda suçluluk hissetmeden hayatımda esnekliği ve deneyselliği hangi yollarla kucaklayabilirim? ";

var lifestyle_25_plus_projektor_question_name = "Rehber";
var lifestyle_25_plus_projektor_evaluation_1 = "• Görülmek veya duyulmak için zorlamak yerine davetiyeleri beklemem gerektiğini nasıl anlarım? ";
var lifestyle_25_plus_projektor_evaluation_2 = "• Son zamanlarda güçlü yönlerimle uyumlu olduğunu hissettiğim hangi davetler veya takdirler aldım ve bunlara nasıl yanıt verdim? ";
var lifestyle_25_plus_projektor_evaluation_3 = "• Enerjimi nasıl korurum ve tükenmişliği nasıl önlerim, özellikle de tanınmadığımı veya takdir edilmediğimi hissettiğimde? ";
var lifestyle_25_plus_projektor_evaluation_4 = "• Önüme çıkan doğru fırsatlara ve davetlere daha fazla sabır ve güven geliştirmek için ne yapabilirim? ";
var lifestyle_25_plus_projektor_evaluation_5 = "• Hayatımın hangi alanlarında benzersiz bakış açım için en çok görüldüğümü ve değer verildiğini hissediyorum ve oraya nasıl daha fazla enerji odaklayabilirim? ";

var lifestyle_25_plus_reflektor_evaluation_name = "Yansıtıcı";
var lifestyle_25_plus_reflektor_evaluation_1 = "• Şu anki ortamımda nasıl hissediyorum ve etrafımdaki insanlar ve alanlar hakkında ne yansıtıyor? ";
var lifestyle_25_plus_reflektor_evaluation_2 = "• Ay döngüsünün doğal ritmine güvenerek önemli kararlar almak için kendime nasıl daha fazla zaman verebilirim? ";
var lifestyle_25_plus_reflektor_evaluation_3 = "• Hangi durumlarda gerçek benliğimle en uyumlu hissediyorum ve hayatımda bu deneyimlerden daha fazlasını nasıl yaratabilirim? ";
var lifestyle_25_plus_reflektor_evaluation_4 = "• Başkalarının duygularını ve enerjilerini nasıl idare ederim ve kendi iyiliğimi korumak için hangi sınırları belirlemem gerekir? ";
var lifestyle_25_plus_reflektor_evaluation_5 = "• Eşsiz duyarlılığımı ve çevremin gerçeğini bunalmış hissetmeden yansıtma yeteneğimi onurlandırmak için ne yapabilirim? ";

//Yaşamda İlerleme Tarzın İngilizce
var lifestyle_25_plus_eng_manifesting_generator_name = "Initiator";
var lifestyle_25_plus_eng_manifesting_generator_1 = "In the professional world and your career, you possess a unique and distinctive energy. You're excellent at managing tasks, building things, and growing them. When you use your energy for the work you love, you can rest your head on the pillow with a sense of satisfaction.\n\nThe key to finding satisfaction in life and work isn't just about working hard; it’s about how effectively and efficiently you use your energy. The work you do is crucial for your well-being and prosperity. You have a powerful source of energy that helps you take action and create.\n\nBe mindful that you don’t always have to start or initiate things. Your strength lies in responding to life based on your instincts and waiting for the right cues.";
var lifestyle_25_plus_eng_manifesting_generator_2 = "Trusting your instincts and waiting for the right moment will make your life more fulfilling and enjoyable. Think of yourself as a magnet; you may notice that your energy naturally attracts opportunities to you.";
var lifestyle_25_plus_eng_manifesting_generator_3 = "Your effortless and natural path will reveal itself when you respond to what life offers in the present moment. Your energy is here to help you master what you commit to by responding to what life brings you. A sign that you are on the right track is when things start to fall into place naturally and you feel a sense of satisfaction.\n\nGiven your immense energy, be cautious about saying 'yes' or getting involved in things that don’t genuinely interest or satisfy you. Your inner compass communicates through your gut feeling. To live life correctly, your strategy should be to wait for what life brings and respond to it. Listen to your gut feeling first and don’t let others dictate what you should do.\n\nYou weren’t created for a monotonous routine. Continue to create and build, and always trust in your incredible energy.";
var lifestyle_25_plus_eng_manifesting_generator_motto = "For life satisfaction, embrace the slogan: Love what you do and do what you love!";


//gücünü kullan
var lifestyle_25_plus_eng_starter_question_name = "Initiator";
var lifestyle_25_plus_eng_starter_evaluation_1 = "• What inspires me to initiate action, and how can I inform others before doing so to reduce resistance?";
var lifestyle_25_plus_eng_starter_evaluation_2 = "• How do I feel when I take the lead without waiting for external permission or approval?";
var lifestyle_25_plus_eng_starter_evaluation_3 = "• In what areas of my life do I feel most empowered to start new things, and how can I use this energy more intentionally?";
var lifestyle_25_plus_eng_starter_evaluation_4 = "• How do I handle the reaction of others when I step into my natural role as an initiator, and what could I do to ease potential conflict?";
var lifestyle_25_plus_eng_starter_evaluation_5 = "• What strategies do I use to manage my energy and avoid burnout after initiating major projects or changes?";

//İletişim Ve Etkileşim Tarzın
var communication_generator_0 = "Enerjik";
var communication_generator_1 = "Etkili iletişimin merkezinde, sessiz bir iletişimci olarak hareket eden, başkalarını ve fırsatları sana çeken sözsüz varlığın var. Açık ve saran varlığın bir mıknatıs gibi davranır, doğal olarak insanları kendine çeker ve verimli etkileşimlerin yolunu açar. ";
var communication_generator_2 = "Başkalarıyla Başarılı Etkileşimlerin Anahtarı... ";
var communication_generator_3 = "Etkileşimde bulunmadan önce yanıt vermek için bekle:";
var communication_generator_3_1 = "Etkileşimleri başlatmaktan kaçınarak ve bunun yerine yanıt vermeyi bekleyerek iletişim kanallarını açar ve direnci ortadan kaldırabilirsin.Farkındalığını açmak, fırsatları ortaya çıktıkça gözlemlemek ve başkalarıyla etkileşime girmeden önce sezgilerini dinlemek için pratik yapabilirsin.";
var communication_generator_4 = "Doğru Hissettiren Şeylere Yanıt Ver:";
var communication_generator_5 = "İç güdülerine güven ve seninle rezonansa giren şeylere olanak tanıyan durumlara yanıt vermeye çalış. Seni neyin heyecanlandırdığına ve değerlerinle uyumlu olduğuna dikkat et, gerçek coşkunun etkileşimlerine rehberlik etmesine izin ver. ";
var communication_generator_6 = "Başlatma - yalnızca önce yanıt verdikten sonra etkileşime geç:";
var communication_generator_7 = "Etkileşim başlatmak yerine, kişisel tercihlerin ve hedeflerinle uyumlu davetlere ve fırsatlara yanıt vermeye odaklan. Etkileşimlerin organik olarak ortaya çıkmasına izin vererek, karşılıklı anlayış ve saygıya dayanan özgün bağlantılar oluşturabilirsin.";
var communication_generator_1_s2 = "Doğal manyetizmandan yararlan: İnsanları varlığınla içine çekme konusundaki doğuştan gelen yeteneğin büyük bir varlık. İşyerinde, sürekli olarak ulaşılabilir olarak bu manyetizmanın senin için çalışmasına izin ver. İş arkadaşların doğal olarak sana yönelecek, projelerde girdilerini ve desteğini arayacak ve girişimleri ileriye taşıyan enerjiyi sağlama yeteneğini kabul edeceklerdir.";
var communication_generator_2_s2 = "Niyetle yanıt ver: Harekete geçmek cazip gelse de, gücünün yanıt olarak yattığını unutma. Aktif dinleme pratiği yapabilir ve seni gerçekten heyecanlandıran ve değerlerinle uyumlu projelerle meşgul olabilirsin. Başlatmak yerine yanıt verdiğinde, çabalarının daha etkili olduğu ve temel katkılar olarak kabul edildiği bir dinamik yaratma olasılığın çok daha fazla.";
var communication_generator_3_s2 = "Net sınırlar oluştur: Görevleri üstlenme kapasiten ve istekliliğin konusunda net ol. Bu, aşırı taahhütte bulunmamanı sağlar ve enerjini en üretken olabileceğin görevlere yönlendirmene olanak tanır. Kapasiten dahilinde çalıştığında, işteki memnuniyetin artar ve bu doğal olarak senin mutluluğunu ve başarını etkiler.";
var communication_generator_4_s2 = "Katılımda coşku göster: Katılmayı seçtiğinde, bunu belirgin bir coşkuyla göster. Enerjin bulaşıcıdır ve ekibine ilham verebilir ve onları motive edebilir. İş için gerçek heyecanının etkileşimlerine rehberlik etmesine izin ver, bunun ekip dinamiklerin içinde daha da önemli hale geldiğini göreceksiniz.";
var communication_generator_1_s3 = "• Seni gerçekten heyecanlandıran şeylere yanıt veriyor musun? İçgüdülerine güvenip, sadece seninle uyumlu olan fırsatları seçmek için neler yapabilirsin?";
var communication_generator_2_s3 = "• Etkileşim başlatmadan önce gerçekten yanıt verdiğinden emin oluyor musun? Bu yaklaşımı iş ve sosyal hayatında nasıl daha fazla uygulayabilirsin?";
var communication_generator_3_s3 = "• İnsanların doğal olarak sana yöneldiğini fark ediyor musun? Doğal manyetizman sayesinde iş yerinde daha verimli etkileşimler yaratmak için hangi yolları izleyebilirsin?";
var communication_generator_4_s3 = "• İş yerinde doğru projelere yanıt verip, enerjini doğru yerlere yönlendirdiğinden emin misin? Seni en çok tatmin eden işleri bulmak için hangi stratejileri uygulayabilirsin?";
var communication_generator_5_s3 = "• Etkileşimlerde bulunmadan önce yanıt vermek için bekliyor musun? Sezgilerini dinleyip, doğru zamanın gelmesini nasıl fark edebilirsin?";

var communication_projector_0 = "Rehber";
var communication_projector_1 = "Senin için etkili iletişimin merkezinde, ince ama güçlü bir güç olan sözsüz varlığın var. Başkalarını doğal olarak sana çeken açık, odaklanmış ve emici bir varlığın var. Bu manyetik kalite, dikkat talep etmek zorunda kalmadan başkaları tarafından tanınmak üzere tasarlandığın anlamına gelir.";
var communication_projector_2 = "Başkalarıyla başarılı etkileşimlerin anahtarı...";
var communication_projector_3 = "Katılmadan önce tanınma ve davet bekle:";
var communication_projector_3_1 = "Tanınma konusunda başarılı olursun. Katılmadan önce, becerilerin, yeteneklerin ve rehberlik etme ve liderlik etme kapasiten için fark edildiğinden ve kabul edildiğinden emin ol. Bu, etkileşimlerinin özgün ve tanınmış bir temele dayanmasını sağlar.";
var communication_projector_4 = "Tanınma ve davet:";
var communication_projector_5 = "Çevrene uyum sağla ve yoluna çıkan fırsatlara açık ol. Aldığın tanınma ve davetle bir rezonans hissettiğinde bu fırsatların doğru olduğunu bileceksin. Birisi büyük resmi görme yeteneklerini tanıyacak ve seni rehber niteliklerinle uyumlu bir role, projeye veya ortaklığa davet edecektir.";
var communication_projector_6 = "Tanındığında ve davet edildiğinde etkileşim kur:";
var communication_projector_7 = "Katkıların tanınma ve ardından bir davet yoluyla istendiğinde, bu, etkileşim kurman için ipucudur. İç görülerine ve rehberliğine değer veren birinin takdiri, beklediğin sinyaldir. Bu sadece karar verme stratejinin ilk kısmı değil, aynı zamanda önündeki fırsatın doğru olmasını sağlamanın anahtarıdır.";
var communication_projector_1_s2 = "Sabırlı Yanını Güçlendir: Yönlendirme ve organize etme konusunda istekli olsan da, devreye girmek için sabırlı olman önemlidir. Dikkatle dinlemeyi alışkanlık haline getirmen ve fikirlerini yalnızca davet edildiğini hissettiğinde paylaşman önemli—bu bir baş selamı, meraklı bir bakış, konuşmada bir duraklama ya da doğrudan görüşünü paylaşman için yapılan bir davet olabilir. Genellikle bu tür anlarda, diğerlerinden gelen onayla devreye girmen gerektiğini anlarsın.";
var communication_projector_2_s2 = "Davetlerde Ayırt Etme Gücüyle Gezin: Projelere liderlik etme, yeni roller üstlenme veya ekiplere katılma davetleri ortaya çıktığında, onlara ayırt edici bir şekilde yaklaşman lazım. Uzmanlığın ve içsel bilgeliğinle gerçekten rezonansa girenleri kabul etmeli ve uymayanları red etmelisin. Enerjinim çabaları yerine getirmeye yatırıldığından emin olun.";
var communication_projector_3_s2 = "Bire Bir Etkileşimlerden Yararlan: Rehberler bire bir ortamlarda parlar. İlişkileri derinleştirmek ve iş arkadaşlarının ihtiyaçlarını anlamak için bireysel etkileşimleri kullanman daha doğru olur. Bu bağlantılar sayesinde, sana rehberlik etmek için doğru zamanı işaret eden tanınma ve davetleri sık sık bulacaksın.";
var communication_projector_4_s2 = "Tanınmaya Açık Olduğunuzu Göster: Katkıda bulunma fırsatlarını memnuniyetle karşıladığını incelikle bil. Bu, projelere ilgi göstererek veya ulaşılabilir olarak yapılabilir. Açık tavrın, danışman rolünün en etkili olabileceği iş birliklerine davet edilmeye hazır ve istekli olduğunu başkalarına gösterecektir.";
var communication_projector_1_s3 = "• Tanınma ve davet beklerken ne kadar sabırlı olabiliyorsun? Hangi durumlarda aceleyle harekete geçmek yerine, doğru fırsatların sana gelmesini bekleyebilirsin?";
var communication_projector_2_s3 = "• Sana sunulan davetler ve tanınma fırsatlarıyla ne kadar uyum içindesin? Bu fırsatların gerçekten seni en iyi yansıttığını nasıl fark edebilirsin?";
var communication_projector_3_s3 = "• Fikirlerini paylaşmadan önce davet edildiğini hissettiğinden emin oluyor musun? İlişkilerinde bu ince işaretleri nasıl daha iyi gözlemleyebilirsin?";
var communication_projector_4_s3 = "• Bire bir ilişkilerde nasıl parladığını fark ediyor musun? İş arkadaşlarınla daha derin bağlantılar kurmak için hangi yolları izleyebilirsin?";
var communication_projector_5_s3 = "• Projelerde veya rollerde tanınmaya açık olduğunu başkalarına nasıl hissettiriyorsun? Ulaşılabilir ve açık tavrını iş yerinde daha etkili bir şekilde nasıl gösterebilirsin?";

var communication_manifestor_0 = "Başlatıcı";
var communication_manifestor_1 = "Senin varlığın kapalı ve koruyucu, bir kalkan ve mızrak gibi işlev görüyor. İçsel bir güce sahip olup, dışa doğru bir itişle harekete geçiyor ve başkalarını doğrudan etkiliyorsun. Enerjin bazen baskın olarak yanlış anlaşılabilir, ancak bu sadece senin doğal olarak proaktif ve kararlı olma halindir.";
var communication_manifestor_2 = "Başkalarıyla Başarılı Etkileşimlerin Anahtarı...";
var communication_manifestor_3 = "Bilgilendirme ve Harekete Geçme:";
var communication_manifestor_3_1 = "İçsel başlatma gücünü başkalarının ihtiyaçları ve sınırlarıyla uyumlu hale getirmek için, harekete geçmeden önce bilgilendirmek çok önemlidir. Bu uygulama sadece direnci azaltmakla kalmaz, aynı zamanda vizyonunu etkili bir şekilde tezahür ettirmek için ihtiyaç duyduğun özgürlüğün yolunu açar.";
var communication_manifestor_4 = "Başlatıcı Varlığını Yönet:";
var communication_manifestor_5 = "Başlatıcı enerjinin bazen başkalarını savunmaya geçirebileceğini anlamalısın. İş birliği içinde bir ortam yaratmak için, çevrendekilere niyetlerin ve eylemlerin hakkında önceden bilgi vermeyi öğren. Bu açıklık, insanların motivasyonlarını daha iyi anlamalarına yardımcı olacak ve yanlış anlaşılmaların önüne geçecektir.";
var communication_manifestor_6 = "Eşsiz Rolünü Kucakla:";
var communication_manifestor_7 = 'Başka hiçbir türün yapamayacağı şekilde "Dışarı Çık ve Gerçekleşmesini Sağla" için benzersiz bir şekilde tasarlandın. Bunu benimse ve başlatma kapasitenin, farkındalıkla ve karar verme stratejinizle uzun süre kullanıldığında en büyük gücün olduğunu unutma.';
var communication_manifestor_1_s2 = "Bilgilendirmeyi Bir Alışkanlık Olarak Geliştir: İş yerinde, ekibini ve üstlerini planların ve eylemlerin hakkında bilgilendirme alışkanlığını uygulamayı unutma. Bu şeffaflık güven yaratır ve başkalarının girişimlerini daha etkili bir şekilde desteklemesine olanak tanır.";
var communication_manifestor_2_s2 = "Başlatma Gücünü Akıllıca Kullan: Başlatma gücünün değişim ve ilerleme için bir katalizör olduğunu kabul et. Projelere liderlik etmek ve harekete geçmek için bu yeteneği kullan, ancak her zaman ekibinin girdilerini ve katkılarını dikkate alan dikkatli bir yaklaşımla.";
var communication_manifestor_3_s2 = "Kontrol Edilme Korkusunun Üstesinden Gelmeye Çalış: Bir özerklik ortamı yaratarak altta yatan kontrol edilme korkunu gidermeye çalış. Hareket etme özgürlüğüne sahip olduğunda ve diğerleri bilgilendirildiğinde, direncin azaldığını ve üretkenliğin arttığını göreceksin.";
var communication_manifestor_4_s2 = "Direnci İşbirliğine Dönüştür: Direnç fark ettiğinde, bunu bilgilendirme sürecini iyileştirmek için bir fırsat olarak kullanmaya çalış. Açık iletişim, muhalefeti işbirliğine dönüştürebilir, vizyonunu ve yönünün gelişebileceği bir işyerini teşvik edebilir.";
var communication_manifestor_5_s2 = "Pratik Yap, Pratik Yap, Pratik Yap: Bilgilendirme sana doğal olarak gelmez, bu yüzden kendini bu beceride ustalaşmaya adaman lazım. Sürtünme olmadan liderlik etme yeteneğinin kilidini açacak ve çevrendekilerin desteği ve iş birliği ile hedeflerini ortaya koyacak olan kilit noktadır.";
var communication_manifestor_1_s3 = "• Harekete geçmeden önce çevrendekileri bilgilendiriyor musun? Bu bilgilendirme süreci, iş yerinde ve sosyal çevrende direnci azaltmak için nasıl etkili olabilir?";
var communication_manifestor_2_s3 = "• Başlatıcı enerjinin başkalarını nasıl etkilediğini fark ediyor musun? Proaktif yapını daha işbirlikçi bir ortam yaratmak için nasıl kullanabilirsin?";
var communication_manifestor_3_s3 = "• Kontrol edilme korkunu yenmek için hangi adımları atıyorsun? Özerkliğini koruyarak direnci nasıl işbirliğine dönüştürebilirsin?";
var communication_manifestor_4_s3 = "• Bilgilendirmeyi bir alışkanlık haline getirip, ekip arkadaşlarınla güven oluşturmaya nasıl katkıda bulunabilirsin? Bu yaklaşım projelerini ileriye taşımada ne kadar etkili olabilir?";
var communication_manifestor_5_s3 = "• Başlatıcı gücünü dikkatli bir şekilde kullanarak, ekip arkadaşlarının katkılarını nasıl daha fazla dikkate alabilirsin? Bu sayede iş yerinde daha etkili bir lider olabilir misin?";

var communication_reflektor_0 = "Yansıtıcı";
var communication_reflektor_1 = "Dirençli, ancak çevreyi emmeden örnekleme ve yansıtma yeteneğine sahip bir varlığın var. Sözsüz varlığın sessiz, nazik ve müdahaleci değildir, çevreye ve içindeki insanlara bir ayna görevi görür.";
var communication_reflektor_2 = "Başkalarıyla Başarılı Etkileşimlerin Anahtarı...";
var communication_reflektor_3 = "Ne Kadar Eşsiz Olduğunu Fark Etmek ve Etkileşime Girmeden Önce Beklemek, Yansıtmak ve Tartışmak:";
var communication_reflektor_3_1 = "Benzersizliğin, seni olağanüstü derecede nadir ve değerli kılan çevreyi yansıtmak ve örneklemektir. Nüfusun sadece %1'ini temsil ettiğini ve dünyayı diğerlerinden farklı gördüğünü kabul etmen gerekiyor. Benzersizliğini kucaklayarak, başkalarıyla güç ve bilgelik dolu bir yerden etkileşime girebilirsin.";
var communication_reflektor_4 = "Yansıtıcı Doğanı Anla:";
var communication_reflektor_5 = "Etrafındakileri yansıtma ve büyütme yeteneğin, çevrenin sağlığını objektif olarak gözlemlemene ve değerlendirmene olanak tanır. Etkileşime girmeden önce bekleyip düşündüğünde, direnci ortadan kaldırır ve iç görülerinin alınması ve değerlendirilmesi için alan açarsın.";
var communication_reflektor_6 = "Yansıtıcı İç görülerinden Yararlan:";
var communication_reflektor_7 = "Bir Değerlendirici olarak, sana stratejik bir bakış açısı sağlayan kalıpları ve döngüleri gözlemleme konusunda doğuştan gelen bir yeteneğe sahipsin. Çeşitli durumlar üzerinde düşünmek ve düşünceli tartışmalara katılmak için gereken zamanı ayır. İyi düşünülmüş iç görülerinin ekibine ve projelerine katkılarını bilgilendirmesine izin ver.";
var communication_reflektor_1_s2 = "İletişimde Sabır ve Derinlik Geliştir: İş yerinde, çevrendeki etkileşimler ve dinamikler üzerinde düşünmek için zaman ayır. Dikkatli değerlendirmen ve benzersiz bakış açın, ekibine ve projelerine fayda sağlayabilecek derin iç görülere yol açabilir.";
var communication_reflektor_2_s2 = "İç görülerin İçin Alan Yarat: Başkalarının kendilerini rahatça açabilecekleri bir alan yaratmak için nazik varlığını kullan. Gösterişsiz doğan dürüst diyaloğu teşvik eder, görüşleri örneklemene ve tartışmaların özünü geri yansıtmana olanak tanır, bu da ekibi netlik ve fikir birliğine yönlendirebilir.";
var communication_reflektor_3_s2 = "Harekete Geçmeden Önce Bekle, Düşün ve Tartış: Önemli kararlar vermeden önce düşünceli tartışmalara katılmayı alışkanlık haline getirmen gerekir. Düşüncelerin hemen ortaya çıkmaz ve en iyi katkıların, resmin tamamını işlemek ve anlamak için zamanın olduğunda gelir.";
var communication_reflektor_4_s2 = "Doğuştan Gelen Bilgeliğinden Yararlan: İç görülerinin ve içsel bilgeliğinin işteki katkılarına rehberlik etmesine izin ver. Bu derin anlayış yerinden konuştuğunuzda, sözlerin ağırlık taşır ve genellikle ekibinin ve kuruluşun için dönüştürücü sonuçlara yol açabilir.";
var communication_reflektor_1_s3 = "• Etrafındaki insanları ve ortamları objektif bir şekilde yansıttığını fark ediyor musun? Bu yansıtma gücünü iş yerinde veya sosyal çevrende nasıl daha etkili kullanabilirsin?";
var communication_reflektor_2_s3 = "• Etkileşime girmeden önce bekleyip düşünmek sana nasıl bir içgörü sağlıyor? Bu bekleme sürecini hangi durumlarda daha iyi uygulayabilirsin?";
var communication_reflektor_3_s3 = "• Nazik ve sessiz varlığın, başkalarının kendilerini rahatça ifade etmelerine nasıl yardımcı oluyor? Bu özelliğini ekip çalışmalarında daha fazla nasıl kullanabilirsin?";
var communication_reflektor_4_s3 = "• Yansıtıcı içgörülerini başkalarıyla paylaşmadan önce değerlendirme yapmak için yeterince zaman ayırıyor musun? Stratejik bakış açını daha derinleştirmek için ne tür tartışmalar sana faydalı olabilir?";
var communication_reflektor_5_s3 = "• Çevrenin sağlığını gözlemleme yeteneğin, ekip arkadaşlarına ve projelerine nasıl katkıda bulunuyor? Bu içsel bilgeliği iş yerinde daha etkili bir şekilde nasıl ortaya koyabilirsin?";


//Karar Verme Stratejilerin
var decision_strategy_s3_1_0 = "Karşılık Ver ve Netlikle Karar Al"; 
var decision_strategy_s3_1_1 = "Karşılık Vermek İçin Bekle ve Netlik İçin Sabret";
var decision_strategy_s3_1_2 = "Karar verme stratejin iki temel unsur üzerine kuruludur: içgüdülerini dinlemek ve ardından netliğin ortaya çıkmasını sabırla beklemek. İçgüdülerin, belirli bir eyleme adım atmaya enerjin olup olmadığını gösteren değerli bir rehberdir. Ancak, yanıtlarının zihin tarafından, özellikle aciliyet veya baskı hissettiğinde, etkilenebileceğini unutmamak önemlidir. Bu yüzden, bu baskıların hafiflemesini bekleyip, netliğe ulaşmak çok önemlidir.";
var decision_strategy_s3_1_3 = "İki Temel Unsur: ";
var decision_strategy_s3_1_4 = "• İçgüdüsel Tepki: Hayat sana bir fırsat sunduğunda, içgüdüsel yanıtın \"ah-huh\" (evet), \"uhn - un\" (hayır) ya da \"hmmmmm\" (şimdilik hayır veya başka bir şekilde sor) olarak kendini gösterir. Bu ince sinyallere dikkat et, ancak yalnızca anlık içgüdüsel tepkilere dayanarak karar vermekten kaçın.";
var decision_strategy_s3_1_5 = "• Netlik İçin Bekle: Aceleyle harekete geçmek yerine, netliğin ortaya çıkması için kendine zaman ve alan tanı.Duygusal iniş ve çıkışlar sırasında karar vermekten kaçın ve önemli seçimler yapmadan önce bir gece üzerinde düşün.Bu sabır, sakin ve emin bir güvenle karar vermeni sağlar.";

var decision_strategy_s3_2_0 = "Karşılık Vermek İçin Bekle ve İçgüdülerini Takip Et"; 
var decision_strategy_s3_2_1 = "Karşılık Vermek İçin Bekle ve İçgüdülerini Takip Edebilirsin";
var decision_strategy_s3_2_2 = "Karar verme stratejin iki temel unsura dayanır: cevap vermek için beklemek ve içgüdülerini takip etmek. İçgüdülerin, belirli bir eyleme adım atmaya enerjin ve eğilimin olup olmadığını güçlü bir şekilde gösterir. Ancak, bu içgüdü sadece evet ya da hayır sorularına yanıt verir, bu yüzden sorularını buna uygun şekilde şekillendirmen önemlidir.";
var decision_strategy_s3_2_3 = "İki Temel Unsur: ";
var decision_strategy_s3_2_4 = "• Cevap Vermek İçin Bekle: Düşünmeden ve aceleyle harekete geçmek yerine, kendine beklemek ve gözlemlemek için alan aç. Hayatın sana farklı şekillerde yaklaştığını fark et – bir soru, bir e-posta, bir insan ya da bir ses olabilir. Doğru zaman geldiğinde, hayat sana fırsatları sunacaktır, buna güven.";
var decision_strategy_s3_2_5 = "• İçgüdülerini Takip Et: İçgüdüsel tepkilerin ya \"ah-huh\" (evet), ya \"uhn - un\" (hayır) ya da \"hmmmmm\" (şimdilik hayır veya başka bir şekilde sor) olarak kendini gösterir. Vücudundaki hislere dikkat et – bir şeye heyecanla çekildiğini mi hissediyorsun yoksa midende bir düğüm hissi mi var, bu da huzursuzluk anlamına gelebilir.";

var decision_strategy_s3_3_0 = "Tanınma ve Davet Al, Netlik ile Karar Al "; 
var decision_strategy_s3_3_1 = "Tanınma, Davet ve Netlik için Bekle ";
var decision_strategy_s3_3_2 = "Karar verme stratejin, tanınmayı, davet almayı ve duygusal netliğin ortaya çıkmasını beklemeye dayanır. Süreci sabırla gözlemleyerek ve güvenerek, doğru zamanda ve duygusal gerçekliğinle uyumlu kararlar alabilirsin. ";
var decision_strategy_s3_3_3 = "İki Temel Unsur: ";
var decision_strategy_s3_3_4 = "• Tanınma ve Davet İçin Bekle: Sabırlı ol ve tanınmayı, ardından bir daveti beklerken güven içinde ol. Özellikle aşk, kariyer, ilişkiler ve yaşam düzenlemeleri gibi hayatının önemli alanlarında seçici ve dikkatli olmalısın.";
var decision_strategy_s3_3_5 = "• Duygusal Netlik İçin Bekle: Tanındıktan ve davet aldıktan sonra, harekete geçmeden önce duygusal netliği elde etmek için kendine zaman tanı. Duygusal dalgalanmalar sırasında karar vermekten kaçın ve doğru zamanın geldiğini gösteren sakin bir güvenin ortaya çıkmasını bekle. ";

var decision_strategy_s3_4_0 = "Tanınma ve Davet Al, İçgüdülerini Takip Et "; 
var decision_strategy_s3_4_1 = "Tanınmayı, Daveti Bekle ve İçgüdülerini Takip Et ";
var decision_strategy_s3_4_2 = "Karar verme stratejin, sabırla tanınmayı ve daveti beklemeye, ardından içgüdülerini takip ederek doğru yolu bulmaya dayanır. Duyularına dikkat ederek ve anlık bilgeliğine güvenerek, kararlarını güvenle ve özgün bir şekilde verebilirsin. ";
var decision_strategy_s3_4_3 = "İki Temel Unsur: ";
var decision_strategy_s3_4_4 = "• Tanınma ve Daveti Bekle: Sabırlı ol ve tanınmanın, ardından bir davetin ortaya çıkmasını beklerken sürece güven. İnce ipuçlarına dikkat et ve özellikle aşk, kariyer, ilişkiler ve yaşam düzenlemeleri gibi kritik alanlarda seçimlerinde dikkatli ol. ";
var decision_strategy_s3_4_5 = "• İçgüdülerini Takip Et: Tanındıktan ve davet aldıktan sonra, anın içindeki içgüdülerine güven. Bedeninin ince sinyallerine dikkat ederek, anlık bilgeliğinin kararlarını yönlendirmesine izin ver. ";

var decision_strategy_s3_5_0 = "Tanınma ve Davet Al, İradeli Kararlılığını Takip Et "; 
var decision_strategy_s3_5_1 = "Tanınmayı, Daveti Bekle ve İradeni Takip Et ";
var decision_strategy_s3_5_2 = "Karar verme stratejin, sabırla tanınmayı ve daveti beklemeye, ardından iradeni takip ederek harekete geçmeye dayanır. Kendi isteklerine öncelik verip bağlılığını değerlendirerek, kararlarının gerçek niyetlerinle uyumlu olmasını sağlayabilir ve tatmin edici sonuçlara ulaşabilirsin. ";
var decision_strategy_s3_5_3 = "İki Temel Unsur: ";
var decision_strategy_s3_5_4 = "• Tanınma ve Daveti Bekle: Sabırlı ol ve tanınmanın ardından bir davetin ortaya çıkmasını beklerken sürece güven. Özellikle aşk, kariyer, ilişkiler ve yaşam düzenlemeleri gibi hayati konularda dikkatli ve seçici ol. ";
var decision_strategy_s3_5_5 = '• İradeni Takip Et: Tanınıp davet aldıktan sonra, iradeni değerlendirerek bağlılık ve istek seviyeni ölç. "Ben ne istiyorum?" ve "Bu benim için ne ifade ediyor ? " sorularını bencilce sorarak, kalbinin tam anlamıyla işin içinde olup olmadığından emin ol. Bu, dengeni koruyarak sağlığını ve mutluluğunu sürdürmene yardımcı olur. ';

var decision_strategy_s3_6_0 = "Tanınma ve Davet Al, Söylediklerini Dinle "; 
var decision_strategy_s3_6_1 = "Tanınmayı, Daveti Bekle ve Söylediklerini Dinle  ";
var decision_strategy_s3_6_2 = "Karar verme stratejin, sabırla tanınmayı ve bir daveti beklemeye, ardından güvendiğin birkaç kişiyle konuşarak kendi sesini dikkatlice dinlemeye dayanır. Kendi kendine düşünmeye ve içsel bilgeliklerine güvenerek, kararlarının otantik ve gerçek arzularınla uyumlu olmasını sağlayabilirsin. ";
var decision_strategy_s3_6_3 = "İki Temel Unsur: ";
var decision_strategy_s3_6_4 = "• Tanınma ve Daveti Bekle: Tanınmanın ve davetin ortaya çıkmasını sabırla beklerken sürece güven. Özellikle aşk, kariyer, ilişkiler ve yaşam düzenlemeleri gibi önemli yaşam alanlarında seçici ve dikkatli ol. ";
var decision_strategy_s3_6_5 = "• Söylediklerini Dinle: Tanınıp davet aldıktan sonra, güvendiğin insanlarla konuşmalar yap, ancak onların tavsiyelerini almak için değil, kendi sesini dinlemek için. Kararlarının seni ne kadar mutlu ettiğine, kendini ifade etme biçiminle ve kişisel yönünle uyumlu olup olmadığına dikkat et. ";

var decision_strategy_s3_7_0 = "Tanınma ve Davet Al, Kendi Söylediklerini Dinle ";
var decision_strategy_s3_7_1 = "Tanınmayı, Daveti Bekle ve Söylediklerini Dinle ";
var decision_strategy_s3_7_2 = "Karar verme stratejin, sabırla tanınmayı ve bir daveti beklemeye, ardından güvendiğin kişilerle yapacağın sohbetlerde kendi sesini dinlemeye dayanır. Kendi kendini yansıtma ve çevresel duyarlılığa odaklanarak, kararlarının otantik arzuların ve niyetlerinle uyumlu olmasını sağlayabilirsin. ";
var decision_strategy_s3_7_3 = "İki Temel Unsur: ";
var decision_strategy_s3_7_4 = "• Tanınma ve Daveti Bekle: Tanınmayı ve bir davetin ortaya çıkmasını sabırla beklerken sürece güven. Ortamın doğru hissedip hissetmediğine dikkat et; çevresel ipuçlarına karşı hassassın. ";
var decision_strategy_s3_7_5 = "• Söylediklerini Dinle: Güvendiğin kişilerle yapacağın sohbetlerde, onların tavsiyelerini almak için değil, kendi sesini dinlemek için konuş. Kararlarının seni mutlu edip etmediğini, kendini ifade ediş şeklinle ve kişisel yönünle uyumlu olup olmadığını düşünürken, farklı kişilerle fikirlerini paylaşarak bakış açısı kazan. ";

var decision_strategy_s3_8_0 = "Gör, Netlik Bekle ve Bilgi Ver ";
var decision_strategy_s3_8_1 = "Duygusal Netlikle Harekete Geçmeden Önce Bekle ve Eylemden Önce Bilgilendir ";
var decision_strategy_s3_8_2 = "Bir başlatıcı olarak, karar verme stratejin, harekete geçmeden önce duygusal netliği beklemeye ve harekete geçmeden önce diğer insanları bilgilendirmeye dayanır. Eylemlerini duygusal netlikle hizalayarak ve başkaları üzerindeki etkisini göz önünde bulundurarak, kararlarını bilinçli ve özenli bir şekilde alabilirsin. ";
var decision_strategy_s3_8_3 = "İki Temel Unsur: ";
var decision_strategy_s3_8_4 = "• Netliği Bekle: Anlık dürtülere yenik düşmek yerine, harekete geçmeden önce duygusal netliği beklemek için kendine zaman ve alan tanı. Duygusal iniş çıkışlar sırasında karar vermekten kaçın ve durumu daha geniş bir perspektifle görebilmek için önce rahatlayarak düşün. ";
var decision_strategy_s3_8_5 = "• Harekete Geçmeden Önce Bilgilendir: Eylemlerinin başkalarını etkileyeceğini kabul et ve harekete geçmeden önce onları bilgilendirmek için inisiyatif al. Niyetlerini önceden ileterek engelleri ortadan kaldırır, barış, anlayış ve iş birliği ortamı oluşturursun. ";

var decision_strategy_s3_9_0 = "Gör, İç güdülerine Kulak ver ve Bilgi Ver. ";
var decision_strategy_s3_9_1 = "İçgüdülerine Güven ve Harekete Geçmeden Önce Bilgilendir ";
var decision_strategy_s3_9_2 = "Karar verme stratejin, içgüdülerine güvenmeye ve harekete geçmeden önce başkalarını bilgilendirmeye dayanır. Anın içinde kalarak ve bedeninin ince sinyallerine uyum sağlayarak, içgüdülerine güvenerek anlık kararlar verebilirsin. Aynı zamanda eylemlerinin başkaları üzerindeki etkisini göz önünde bulundurup etkili iletişimi güçlendirebilirsin. ";
var decision_strategy_s3_9_3 = "İki Temel Unsur: ";
var decision_strategy_s3_9_4 = "• İçgüdülerine Güven: İçinde aniden beliren içsel bilgiyi kucakla. O anın farkında olarak, bedeninin deneyimlediği ince hislere dikkat et ve içgüdülerinin seni yönlendirmesine izin ver. ";
var decision_strategy_s3_9_5 = "• Harekete Geçmeden Önce Bilgilendir: Eylemlerinin başkalarını etkileyeceğini kabul et ve harekete geçmeden önce onları bilgilendirmek için zaman ayır. Proaktif iletişim engelleri ortadan kaldırır, barış, anlayış ve iş birliği sağlar. ";

var decision_strategy_s3_10_0 = "Gör, İradeni Dinle ve Bilgi Ver.";
var decision_strategy_s3_10_1 = "İradene Dayanarak Harekete Geçme ve Bilgilendirerek İlerleme.";
var decision_strategy_s3_10_2 = "Karar verme stratejin, iradeni harekete geçirip başkalarını bilgilendirerek eyleme geçmene dayanır. Kendi kişisel otoriteni fark ederek ve eylemlerinin başkaları üzerindeki etkisini göz önünde bulundurarak, kararlarını netlik, niyet ve etkili iletişim ile yönetebilirsin.";
var decision_strategy_s3_10_3 = "İki Temel Unsur:";
var decision_strategy_s3_10_4 = '• İradene Dayanarak Harekete Geç: İradenin gücüne kulak vererek harekete geçmeye hazır olup olmadığını fark et. "Sahibim" ve "Yapacağım" gibi anlık ifadelerin, otoritenin ve kararlılığının göstergesi olduğunu unutma.';
var decision_strategy_s3_10_5 = "• Harekete Geçmeden Önce Bilgilendir: Eylemlerinin başkalarını etkileyeceğini kabul et ve harekete geçmeden önce onları bilgilendir. İletişim yoluyla engelleri ve direnci ortadan kaldırarak, anlayış ve iş birliği sağlarsın.";

var decision_strategy_s3_11_0 = "Senin için önemli konularda en doğru kararları almak, yansıtmak, değerlendirmek ve tartışmak için yaklaşık bir ay beklemelisin.";
var decision_strategy_s3_11_1 = "28 Günlük Bir Döngü Bekleyip Düşün, Değerlendir ve Tartış.";
var decision_strategy_s3_11_2 = "Karar verme stratejin, önemli kararlar almadan önce beklemek, düşünmek ve tartışmak üzerine kuruludur. Kendine zaman tanıyarak ve düşünceli bir değerlendirme sürecine girerek, kişisel gerçeğine ve netliğine dayanan doğru karara varabilirsin.";
var decision_strategy_s3_11_3 = "İki Temel Unsur:";
var decision_strategy_s3_11_4 = "• Bekleme, Düşünme ve Tartışma: Karar vermede sabırlı bir yaklaşımı benimse, bir ay veya daha uzun bir süreyi düşünme ve tartışma için ayır. Refahını destekleyen bir ortam yarat ve güvendiğin kişilerle düşüncelerini paylaşarak kendi gerçeğini duy.";
var decision_strategy_s3_11_5 = "• Derin ve Ani İçsel Bilgi: Bekleme, düşünme ve tartışma süreci boyunca, bir kararın gerçeğine uygun olup olmadığını gösteren derin bir içsel bilgi ya da farkındalık hissedeceksin.";
//---
var decision_strategy_s4_1_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_1_text = "Zihinle hareket etmek, içgüdüsel tepkilerini sorgulamaya, kaygı hissetmeye ve fırsatları kaçırmaya yol açabilir. Buna karşılık, tepki ve netliğe dayalı hareket etmek, hayatın sana gelmesini beklemeyi, içgüdülerine güvenmeyi ve karar vermeden önce duygusal netlik aramayı içerir.";
var decision_strategy_s4_1_1 = "1.Aktif Bekle: Hayatın sana verdiği işaretlere ve sinyallere açık ol, aceleyle harekete geçmeden gözlemle\n2.Cevap Ver: İçgüdülerinin verdiği yanıtı dinle – evet için \"ah-huh\", hayır için \"uhn - un\" ya da henüz değil için \"hmmmmm\".\n3.Karar Ver: İçgüdüsel yanıtın ve duygusal netliğin doğrultusunda karar ver – evet, hayır ya da şimdilik değil.\n4.Netlik İçin Bekle: Bir gece üzerinde düşün ve duygusal durumunun dalgalanmalarını hissetmene izin ver. Yüksek duygusal hallerde karar vermekten kaçın.\n5.Harekete Geç ya da Geçme: Son olarak, kararına göre harekete geç ya da geçme; içgüdülerin ve duygusal netliğinin bilgeliğine güven.";
var decision_strategy_s4_1_txt = "Bu karar verme stratejisine bağlı kalarak, seçimlerini sabır, sağduyu ve güvenle yapabilir, bu da kariyerinde ve iş hayatında daha büyük başarı ve tatmin sağlayabilir.";

var decision_strategy_s4_2_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_2_text = "Zihinden hareket etmek, içgüdüsel tepkilerini sorgulamana, kaygı duymana ve fırsatları kaçırmana neden olabilir. Buna karşılık, cevap vermek için beklemek, hayatın sana gelmesini beklemeyi ve içgüdülerinin rehberliğine güvenmeyi içerir. Hayatın büyüsüne teslim ol ve seni heyecanlandıran şeylere doğru çekilmeye, çekilmeyenlerden ise uzaklaşmaya izin ver.";
var decision_strategy_s4_2_1 = "1.Aktif Bekle: Hayatın sana verdiği işaretlere ve sinyallere açık ol, bunlar sorular, etkileşimler ya da deneyimler şeklinde gelebilir.\n2.Cevap Ver: İçgüdülerinin verdiği yanıtı dinle – evet için \"ah-huh\", hayır için \"uhn - un\" ya da \"hmmmmm\" ile henüz değil.\n3.Karar Ver: İçgüdülerine göre karar ver – evet, hayır ya da henüz değil. Bu aşamada zihninin müdahalesine karşı dikkatli ol.\n4.Harekete Geç ya da Geçme: Son olarak, kararına göre harekete geç ya da geçme, içgüdülerinin bilgeliğine güven.";
var decision_strategy_s4_2_txt = "Bu karar verme stratejisine sadık kalarak, seçimlerini netlik, güven ve otantiklikle yapabilir, bu da kariyerinde ve iş hayatında daha büyük bir başarı ve tatmin sağlayabilir";

var decision_strategy_s4_3_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_3_text = "Zihinle hareket etmek, dürtüselliğe, şüphelere ve fırsatların kaçmasına yol açabilir. Oysa tanınma, davet ve netliği beklemek, kimyanın ve fırsatların sessiz büyüsüne güvenmeni sağlar. ";
var decision_strategy_s4_3_1 = "1.Tanınma ve Davet İçin Aktif Bekle: Tanınmayı ve bir davetin ortaya çıkmasını sabır ve dikkatle bekle. Sürece güven ve seçimlerinde seçici ol.\n2.Netlik İçin Bekle: Tanındıktan ve davet aldıktan sonra, üzerinde düşün ve duygusal dalgalanmanı hissetmene izin ver. Duygusal dürtülerle karar vermekten kaçın ve netlik sinyalini bekle.\n3.Karar Ver: Duygusal netliğine dayanarak, evet, hayır veya şimdilik değil gibi kararını, kendi gerçeğin ve sezgilerinle uyumlu olacak şekilde ver.\n4.Harekete Geç ya da Geçme: Eğer kararın doğru hissediliyorsa güvenle harekete geç, yoksa daha fazla düşünmek için bekle. ";
var decision_strategy_s4_3_txt = "Bu karar verme stratejisine bağlı kalarak, sabır, güven ve duygusal netlikle seçim yapabilir ve böylece eylemlerini gerçek niyetlerinle uyumlu hale getirerek, daha büyük tatmin ve başarıya ulaşabilirsin. ";

var decision_strategy_s4_4_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_4_text = "Zihinden hareket etmek, şüphe, kaygı ve fırsatların kaçmasına neden olabilirken, tanınmayı, daveti ve içgüdülerini takip etmek, kimyanın ve fırsatların sessiz büyüsüne güvenmeni sağlar. ";
var decision_strategy_s4_4_1 = "1.Tanınma ve Daveti Aktif Bekle: Sabırlı ol ve keskin bir gözlemle tanınmayı ve davetin ortaya çıkmasını bekle. Sürece güven ve seçimlerinde dikkatli ol.\n2.İçgüdülerini Takip Et: Tanındıktan ve davet aldıktan sonra, o anki içgüdülerine güven. Bedeninin sinyallerine dikkat ederek, anlık bilgeliğinle kararlarını yönlendir. Unutma, içgüdüsel bilgi çoğu zaman sessiz ve ince bir şekilde, gürültü ve hareketin ortasında konuşur. Ne kadar yoğun bir anda olursan ol, bu rehberliğe açık kal. Bedenin senin için doğru olanı hissetmeye ayarlıdır; bu bilgeliğin kararlarını şekillendirmesine izin ver. Pratik yaptıkça, nerede olursan ol içgüdüsel bilginin gücünü kullanmayı öğrenirsin ve bu da sana daha fazla netlik ve güven kazandırır.\n3.Karar Ver: İçgüdülerine ve sezgisel bilgine dayanarak, evet, hayır ya da şimdilik değil kararı ver, ve bu karar senin gerçeğinle uyumlu olsun.\n4.Harekete Geç ya da Geçme: Kararın doğru hissettiriyorsa güvenle harekete geç ya da daha fazla düşünmeye ihtiyaç varsa bekle. ";
var decision_strategy_s4_4_txt = "Bu karar verme stratejisine sadık kalarak, seçimlerini sabır, güven ve özgünlükle yönlendirebilir, böylece içgüdülerinle uyumlu hareket ederek daha büyük tatmin ve başarıya ulaşabilirsin.  ";

var decision_strategy_s4_5_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_5_text = "Zihinden hareket etmek şüphe, kaygı ve kaçırılmış fırsatlara yol açabilirken, tanınmayı, daveti ve iradeni takip etmek, kimyanın ve fırsatların sessiz büyüsüne güvenmeni sağlar. ";
var decision_strategy_s4_5_1 = "1.Tanınma ve Daveti Aktif Bekle: Sabırlı ol, gözlem yap ve tanınmayı beklerken sürece güven. Fırsatların isteklerinle uyumlu olduğundan emin olarak seçici davran.\n2.İradeni Dinle: Tanınıp davet aldıktan sonra, bağlılık ve isteğini değerlendirmek için iradene kulak ver. Kendi ihtiyaçlarına ve arzularına öncelik vererek, gerçek niyetlerinle uyumlu olup olmadığını kontrol et.\n3.Karar Ver: İrade ve isteklerinin değerlendirmesi sonucunda, evet, hayır ya da şimdilik değil kararı ver; bu karar gerçek arzularını ve niyetlerini yansıtsın.\n4.Harekete Geç ya da Geçme: Kalbin tam anlamıyla işin içindeyse ve kararın gerçek niyetlerinle uyumluysa güvenle harekete geç. Daha fazla düşünmeye ihtiyaç varsa, eylemden kaçın. ";
var decision_strategy_s4_5_txt = "Bu karar verme stratejisine sadık kalarak, sabır, güven ve öz farkındalıkla seçimlerini yönlendirebilir, gerçek arzularınla uyum içinde hareket ederek daha büyük tatmin ve başarıya ulaşabilirsin. ";

var decision_strategy_s4_6_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_6_text = "Zihinden hareket etmek, şüphe, kaygı ve kaçırılmış fırsatlara yol açabilirken, tanınmayı, daveti ve kendi sesini dinlemeyi takip etmek, içsel sesinin sessiz bilgeliğine güvenmeni sağlar. ";
var decision_strategy_s4_6_1 = "1.Tanınma ve Daveti Aktif Bekle: Sabırlı ol, gözlem yap ve tanınmayı beklerken sürece güven. Fırsatların isteklerinle uyumlu olduğundan emin olarak seçici davran.\n2.Söylediklerini Dinle: Güvendiğin kişilerle sohbet ederken, onların tavsiyelerine değil, kendi sesine odaklan. Kararlarının seni mutlu edip etmediğini ve kişisel yönünle uyumlu olup olmadığını düşün.\n3.Karar Ver: Kendi yansımaların ve içsel bilgeliklerin doğrultusunda, evet, hayır ya da şimdilik değil kararı ver; bu karar gerçek arzularını ve niyetlerini yansıtsın.\n4.Harekete Geç ya da Geçme: Kararın gerçek arzularınla uyumluysa ve içsel sesinle rezonansa giriyorsa güvenle harekete geç. Daha fazla düşünmeye ihtiyaç duyarsan, eylemden kaçın.";
var decision_strategy_s4_6_txt = "Bu karar verme stratejisine sadık kalarak, içsel farkındalık, otantiklik ve içsel bilgeliğine güvenle hareket edebilir, kararlarının gerçek arzularınla uyumlu olmasını sağlayarak daha büyük tatmin ve başarıya ulaşabilirsin.";

var decision_strategy_s4_7_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_7_text = "Zihinden hareket etmek, şüphe, kaygı ve kaçırılmış fırsatlara yol açabilirken, tanınmayı, daveti ve kendi sesini dinlemeyi takip etmek, içsel sesinin sessiz bilgeliğine ve çevresel ipuçlarına güvenmeni sağlar. ";
var decision_strategy_s4_7_1 = "1.Tanınma ve Daveti Aktif Bekle: Sabırlı ol, gözlem yap ve tanınmayı beklerken sürece güven. Ortamın doğru hissettirdiğinden emin ol; çevresel ipuçlarına karşı duyarlısın.\n2.Kendi Söylediklerini Dinle: Güvendiğin kişilerle sohbet ederken, kendi sesini dinlemeye odaklan. Kararlarının mutluluğunla, kendini ifade etme şeklinle ve kişisel yönünle uyumlu olup olmadığını düşünürken, farklı bakış açıları kazanmak için görüş alışverişinde bulun.\n3.Karar Ver: Yansımaların ve içsel bilgeliklerine dayanarak, hem duygusal tepkilerini hem de çevresel ipuçlarını dikkate alarak evet, hayır ya da şimdilik değil kararı ver.\n4.Harekete Geç ya da Geçme: Kararın gerçek arzularınla uyumluysa ve içsel sesinle ve çevresel ipuçlarıyla rezonansa giriyorsa güvenle harekete geç. Daha fazla düşünmeye ya da çevresel ayarlamalara ihtiyaç duyarsan, eylemden kaçın. ";
var decision_strategy_s4_7_txt = "Bu karar verme stratejisine sadık kalarak, farkındalık, otantiklik ve içsel bilgeliğine güvenle hareket edebilir, kararlarının gerçek arzuların ve çevresel duyarlılıklarınla uyumlu olmasını sağlayarak daha büyük tatmin ve başarıya ulaşabilirsin. ";

var decision_strategy_s4_8_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_8_text = "Zihinden hareket etmek, dürtüsel eylemler, kaygı ve başkaları üzerinde olumsuz etkiler yaratabilir. Oysa harekete geçmeden önce bilgilendirmek, duygusal netliği beklemeyi ve başkaları üzerindeki olası etkileri dikkate almayı içerir, böylece etkili iletişim ve iş birliğini güçlendirirsin. ";
var decision_strategy_s4_8_1 = "1.Gör: Başlatılması gereken şeyleri fark et.\n2.Duygusal Netlikle Harekete Geçmeyi Bekle: Rahatla ve sinirlerin yatışmasına izin ver. Duygusal dalgalarını gözlemleyerek eylem planın hakkında netlik kazan.\n3.Karar Ver: Yansımaların ve içsel bilgeliklerine dayanarak, hem duygusal tepkilerini hem de çevresel ipuçlarını dikkate alarak evet, hayır ya da şimdilik değil kararı ver.\n4.Bilgilendir: Harekete geçmeden önce kararının kimleri etkileyeceğini düşün ve onları bilgilendir. Bu proaktif iletişim, direnci ortadan kaldırır ve anlayışı güçlendirir.\n5.Harekete Geç: Seçtiğin eylemi hayata geçirirken, başkaları üzerindeki etkiye duyarlı ol ve bilgilendirilmiş iletişimin gücüne güven. ";
var decision_strategy_s4_8_txt = "Bu karar verme stratejisine uyarak, bilinçli, özenli ve etkili iletişim ile kararlarını yönetebilir, iş birliklerini güçlendirerek daha büyük başarıya ulaşabilirsin. ";

var decision_strategy_s4_9_title = "Karar Verme Stratejini Takip Etmek: ";
var decision_strategy_s4_9_text = "Zihinden hareket etmek, içgüdülerini sorgulamaya, dürtüsel davranışlara ve başkaları üzerinde olumsuz etkilere yol açabilir. Oysa, harekete geçmeden önce bilgilendirmek, içgüdülerine güvenmeyi ve başkaları üzerindeki potansiyel etkileri dikkate almayı içerir, böylece etkili iletişim ve iş birliğini güçlendirirsin. ";
var decision_strategy_s4_9_1 = "1.Gör: Başlatılması gereken şeyleri fark et.\n2.İçgüdülerin Tarafından Hareket Ettirilmeyi Bekle: O an içinde hisset ve içsel sezgilerine güven.\n3.Karar Ver: İçgüdüsel bilginle bir karar ver – evet, hayır ya da şimdi değil.\n4.Bilgilendir: Kararının kimleri etkileyeceğini düşün ve harekete geçmeden önce onları bilgilendir. Bu, direnci ortadan kaldırır ve anlayışı artırır.\n5.Harekete Geç: Seçtiğin eylemi gerçekleştirirken, başkaları üzerindeki etkiye duyarlı ol ve bilgilendirilmiş iletişimin gücünü kullan. ";
var decision_strategy_s4_9_txt = "Bu karar verme stratejisine uyarak, anlık, bilinçli ve etkili iletişim ile kararlarını yönetebilir, iş birliğini güçlendirerek daha büyük başarıya ulaşabilirsin. ";
    
var decision_strategy_s4_10_title = "Karar Verme Stratejini Takip Etmek:";
var decision_strategy_s4_10_text = "Zihinden hareket etmek şüphelere, dürtüsel eylemlere ve başkaları üzerinde olumsuz etkilere neden olabilir. Oysa, harekete geçmeden önce bilgilendirmek, iradeni tanımanı ve başkalarına olan etkileri düşünmeni gerektirir, böylece etkili iletişim ve iş birliği sağlanır.";
var decision_strategy_s4_10_1 = "1.Gör: Başlatılması gereken şeyleri fark et.\n2.İradene Göre Harekete Geçmeye Hazır Ol: Eyleme geçmek için yeterli irade ve arzunun olup olmadığını değerlendir. Sana ne getireceğini ve kalbinin gerçekten işin içinde olup olmadığını düşün.\n3.Karar Ver: İradene göre bir karar ver – evet, hayır ya da şimdi değil.\n4.Bilgilendir: Kararının kimleri etkileyeceğini düşün ve harekete geçmeden önce onları bilgilendir. Bu, direnci ortadan kaldırır ve anlayışı artırır.\n5.Harekete Geç: Seçtiğin eylemi gerçekleştirirken, başkaları üzerindeki etkiye duyarlı ol ve bilgilendirilmiş iletişimin gücünü kullan.";
var decision_strategy_s4_10_txt = "Bu karar verme stratejisine uyarak, kararlılık, netlik ve etkili iletişim ile seçimlerini yönetebilir, iş birliğini güçlendirerek daha büyük başarıya ulaşabilirsin.";

var decision_strategy_s4_11_title = "Karar Verme Stratejini Takip Etmek:";
var decision_strategy_s4_11_text = "Zihinden hareket etmek, şüphelere, dürtüsel eylemlere ve kaçırılan fırsatlara yol açabilir. Oysa, bekleyip düşünmek ve tartışmak, algılarını olgunlaştırmana ve zamanla netliğe ulaşmana yardımcı olur, böylece daha bilinçli bir karar sürecine girersin.";
var decision_strategy_s4_11_1 = "1.Bir Teklif ya da Daveti Bekle: Kendi kendine girişimde bulunma isteğine diren. Diğerlerinin sana bir teklif ya da davet sunmasını bekle, bu doğal eğiliminle uyumludur.\n2.Bekle, Düşün, Tartış: Karar üzerinde düşünmek ve başkalarıyla tartışmak için yaklaşık bir ayını ayır. Bu konuşmaları tavsiye almak için değil, düşüncelerini ifade etmek ve potansiyel gerçeğini duymak için kullan.\n3.Derin ve Ani Bir İçsel Bilgi Hissini Bekle: İçsel rehberliğine güven, bir kararın senin gerçeğinle derin bir şekilde örtüştüğünü fark ettiğinde bunu kabul et.\n4.Karar Ver: Düşüncelerin ve tartışmaların ışığında, \"evet,\" \"hayır\" ya da \"şimdi değil\" şeklinde net bir karar ver.\n5.Harekete Geç: Kararının düşünceli bir değerlendirme ve diyalogla desteklendiğinden emin olarak, kendine güvenle ilerle.";
var decision_strategy_s4_11_txt = "Bu karar verme stratejisine uyarak, seçimlerini sabır, netlik ve derin bir anlayışla yönetebilir, böylece hayatında daha fazla uyum ve tatmin sağlayabilirsin.";

  let krktr_ozl = (big5Name, age, type) => {
    if (type == "name") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_self_discipline;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_extraversion;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_compatibility;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_emotional_resilience;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_openness_to_experience;
      }
    } else if (type == "character_elements") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_character_elements_self_discipline_s1;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_character_elements_extraversion_s1;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_character_elements_compatibility_s1;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_character_elements_emotional_resilience_s1;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_openness_to_experience_s1;
      }
    } else if (type == "strength") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_strenghts_self_discipline_s2_1;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_strenghts_extraversion_s2_1;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_strenghts_compatibility_s2_1;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_strenghts_emotional_resilience_s2_1;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_strenghts_openness_to_experience_s2_1;
      }
    } else if (type == "weakness") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_weaknesses_self_discipline_s2_1;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_weaknesses_extraversion_s2_1;;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_weaknesses_compatibility_s2_1;;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_weaknesses_emotional_resilience_s2_1;;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_weaknesses_openness_to_experience_s2_1;;
      }
    } else if (type == "other_attributes") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_other_attributes_self_discipline_s2;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_other_attributes_extraversion_s2;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_other_attributes_compatibility_s2;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_other_attributes_emotional_resilience_s2;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_other_attributes_openness_to_experience_s2;
      }
    } else if (type == "question1") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_25_plus_self_discipline_questions_1;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_25_plus_extraversion_questions_1;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_25_plus_compatibility_questions_1;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_25_plus_emotional_resilience_questions_1;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_25_plus_openness_to_experience_questions_1;
      }
    } else if (type == "question2") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_25_plus_self_discipline_questions_2;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_25_plus_extraversion_questions_2;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_25_plus_compatibility_questions_2;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_25_plus_emotional_resilience_questions_2;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_25_plus_openness_to_experience_questions_2;
      }
    } else if (type == "question3") {
      if (big5Name == "Öz Disiplin") {
        return krktr_ozl_25_plus_self_discipline_questions_3;
      } else if (big5Name == "Dışa Dönüklük") {
        return krktr_ozl_25_plus_extraversion_questions_3;
      } else if (big5Name == "Uyumluluk") {
        return krktr_ozl_25_plus_compatibility_questions_3;
      } else if (big5Name == "Duygusal Dayanıklılık") {
        return krktr_ozl_25_plus_emotional_resilience_questions_3;
      } else if (big5Name == "Deneyime Açıklık") {
        return krktr_ozl_25_plus_openness_to_experience_questions_3; 
      }
    }
  };

  let kslk_ozl = (hollandName, age, type) => {
    if (type == "name") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_your_profile;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_your_profile;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_your_profile;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_your_profile;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_your_profile;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_your_profile;
      }
    } else if (type == "interest_1") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_your_interests_1;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_your_interests_1;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_your_interests_1;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_your_interests_1;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_your_interests_1;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_your_interests_1;
      }
    } else if (type == "interest_2") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_your_interests_2;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_your_interests_2;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_your_interests_2;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_your_interests_2;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_your_interests_2;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_your_interests_2;
      }
    } else if (type == "profile") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_your_profile_;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_your_profile_;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_your_profile_;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_your_profile_;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_your_profile_;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_your_profile_;
      }
    } else if (type == "work_areas") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_your_work_areas;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_your_work_areas;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_your_work_areas;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_your_work_areas;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_your_work_areas;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_your_work_areas;
      }
    } else if (type == "may_not_like") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_realistic_you_may_not_like;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_researcher_you_may_not_like;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_artistic_you_may_not_like;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_social_you_may_not_like;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_entrepreneur_you_may_not_like;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_traditional_you_may_not_like;
      }
    } else if (type == "question_1") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_25_plus_realistic_questions_1;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_25_plus_researcher_questions_1;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_25_plus_artistic_questions_1;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_25_plus_social_questions_1;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_25_plus_entrepreneur_questions_1;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_25_plus_traditional_questions_1;
      }
    } else if (type == "question_2") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_25_plus_realistic_questions_2;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_25_plus_researcher_questions_2;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_25_plus_artistic_questions_2;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_25_plus_social_questions_2;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_25_plus_entrepreneur_questions_2;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_25_plus_traditional_questions_2;
      }
    } else if (type == "question_3") {
      if (hollandName == "Gerçekçi") {
        return kslk_ozl_25_plus_realistic_questions_3;
      } else if (hollandName == "Araştırıcı") {
        return kslk_ozl_25_plus_researcher_questions_3;
      } else if (hollandName == "Artistik Sanatsal") {
        return kslk_ozl_25_plus_artistic_questions_3;
      } else if (hollandName == "Sosyal") {
        return kslk_ozl_25_plus_social_questions_3;
      } else if (hollandName == "Girişimci") {
        return kslk_ozl_25_plus_entrepreneur_questions_3;
      } else if (hollandName == "Geleneksel") {
        return kslk_ozl_25_plus_traditional_questions_3;
      }
    }

    return null;
  };

  let ai = (aiName, age, type) => {
    if (type == "name") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s3_1_1;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s3_2_1;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s3_3_1;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s3_4_1;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s3_5_1;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s3_6_1;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s3_7_1;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s3_8_1;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s3_9_1;
      }
  } else if (type == "s3_x_2") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s3_1_2;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s3_2_2;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s3_3_2;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s3_4_2;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s3_5_2;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s3_6_2;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s3_7_2;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s3_8_2;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s3_9_2;
      }
    } else if (type == "s3_x_3") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s3_1_3;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s3_2_3;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s3_3_3;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s3_4_3;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s3_5_3;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s3_6_3;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s3_7_3;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s3_8_3;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s3_9_3;
      }
    } else if (type == "s4u1_x_2") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u1_1_2;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u1_2_2;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u1_3_2;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u1_4_2;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u1_5_2;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u1_6_2;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u1_7_2;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u1_8_2;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u1_9_2;
      }
    } else if (type == "s4u1_x_3") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u1_1_3;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u1_2_3;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u1_3_3;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u1_4_3;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u1_5_3;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u1_6_3;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u1_7_3;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u1_8_3;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u1_9_3;
      }
    } else if (type == "s4u2_x_2") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u2_1_2;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u2_2_2;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u2_3_2;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u2_4_2;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u2_5_2;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u2_6_2;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u2_7_2;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u2_8_2;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u2_9_2;
      }
    } else if (type == "s4u2_x_3") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u2_1_3;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u2_2_3;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u2_3_3;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u2_4_3;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u2_5_3;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u2_6_3;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u2_7_3;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u2_8_3;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u2_9_3;
      }
    } else if (type == "s4u2_x_4") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u2_1_4;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u2_2_4;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u2_3_4;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u2_4_4;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u2_5_4;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u2_6_4;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u2_7_4;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u2_8_4;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u2_9_4;
      }
    } else if (type == "s4u2_x_5") {
      if (aiName == "Dijital Okuryazarlık") {
        return ai_25_s4u2_1_5;
      } else if (aiName == "Veri Okur Yazarlığı") {
        return ai_25_s4u2_2_5;
      } else if (aiName == "Kodlama ve Programlama") {
        return ai_25_s4u2_3_5;
      } else if (aiName == "Eleştirel Düşünme ve Problem Çözme") {
        return ai_25_s4u2_4_5;
      } else if (aiName == "Uyarlabilirlik ve Sürekli Öğrenme") {
        return ai_25_s4u2_5_5;
      } else if (aiName == "İletişim ve İşbirliği") {
        return ai_25_s4u2_6_5;
      } else if (aiName == "Etik ve Sosyal Sorumluluk") {
        return ai_25_s4u2_7_5;
      } else if (aiName == "Duygusal Zeka (EQ)") {
        return ai_25_s4u2_8_5;
      } else if (aiName == "Yenilikçi ve Girişimci Düşünce") {
        return ai_25_s4u2_9_5;
      }
    }
  };

  let teamwork = (teamworkName, age, type) => {
    if (type == "name") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u1_1_1;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u1_2_1;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u1_3_1;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u1_4_1;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u1_5_1;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u1_6_1;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u1_7_1;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u1_8_1;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u1_9_1;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u1_10_1;
      }
    } else if (type == "best") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_best_1_2;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_best_2_2;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_best_3_2;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_best_4_2;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_best_5_2;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_best_6_2;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_best_7_2;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_best_8_2;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_best_9_2;
      } else if (teamworkName == "Liderlik") {
        return teamwork_best_10_2;
      }
    } else if (type == "s3u1_x_1") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u1_1_2;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u1_2_2;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u1_3_2;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u1_4_2;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u1_5_2;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u1_6_2;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u1_7_2;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u1_8_2;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u1_9_2;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u1_10_2;
      }
    } else if (type == "s3u1_x_2") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u1_1_3;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u1_2_3;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u1_3_3;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u1_4_3;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u1_5_3;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u1_6_3;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u1_7_3;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u1_8_3;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u1_9_3;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u1_10_3;
      }
    } else if (type == "s3u2_x_1") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u2_1_2;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u2_2_2;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u2_3_2;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u2_4_2;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u2_5_2;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u2_6_2;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u2_7_2;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u2_8_2;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u2_9_2;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u2_10_2;
      }
    } else if (type == "s3u2_x_2") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u2_1_3;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u2_2_3;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u2_3_3;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u2_4_3;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u2_5_3;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u2_6_3;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u2_7_3;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u2_8_3;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u2_9_3;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u2_10_3;
      }
    } else if (type == "s3u2_x_3") {
      if (teamworkName == "Aktif Dinleme ve Empati") {
        return teamwork_s3u2_1_4;
      } else if (teamworkName == "Efektif İletişim") {
        return teamwork_s3u2_2_4;
      } else if (teamworkName == "İş Birliği") {
        return teamwork_s3u2_3_4;
      } else if (teamworkName == "Uyumluluk") {
        return teamwork_s3u2_4_4;
      } else if (teamworkName == "Sorun Çözme") {
        return teamwork_s3u2_5_4;
      } else if (teamworkName == "Öncü Olma") {
        return teamwork_s3u2_6_4;
      } else if (teamworkName == "Geri Bildirim") {
        return teamwork_s3u2_7_4;
      } else if (teamworkName == "Takım Oyuncusu Olma") {
        return teamwork_s3u2_8_4;
      } else if (teamworkName == "Profesyonel Gelişim") {
        return teamwork_s3u2_9_4;
      } else if (teamworkName == "Liderlik") {
        return teamwork_s3u2_10_4;
      }
    }
  };


  let lifestyle = (lifestyleData, age, type) => {
    if (type == "name") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_manifesting_generator_name;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_generator_name;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_name;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_name;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_name;
      }
    } else if (type == "p1") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_manifesting_generator_1;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_generator_1;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_1;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_1;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_1;
      }
    } else if (type == "p2") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_manifesting_generator_2;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_generator_2;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_2;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_2;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_2;
      }
    } else if (type == "p3") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_manifesting_generator_3;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_generator_3;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_3;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_3;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_3;
      }
    } else if (type == "motto") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_manifesting_generator_motto;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_generator_motto;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_motto;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_motto;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_motto;
      }
    }  else if (type == "questions") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_starter_energetic_question_name;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_question_name;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_question_name;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_question_name;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_name;
      }
    } else if (type == "evaluation_1") {
      if (lifestyleData == "Manifesting Generator") {
        
        return lifestyle_25_plus_starter_energetic_evaluation_1;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_evaluation_1;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_evaluation_1;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_evaluation_1;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_1;
      }
    } else if (type == "evaluation_2") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_starter_energetic_evaluation_2;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_evaluation_2;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_evaluation_2;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_evaluation_2;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_2;
      }
    } else if (type == "evaluation_3") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_starter_energetic_evaluation_3;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_evaluation_3;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_evaluation_3;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_evaluation_3;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_3;
      }
    } else if (type == "evaluation_4") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_starter_energetic_evaluation_4;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_evaluation_4;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_evaluation_4;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_evaluation_4;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_4;
      }
    } else if (type == "evaluation_5") {
      if (lifestyleData == "Manifesting Generator") {
        return lifestyle_25_plus_starter_energetic_evaluation_5;
      } else if (lifestyleData == "Generator") {
        return lifestyle_25_plus_energetic_evaluation_5;
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_evaluation_5;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_starter_evaluation_5;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_evaluation_5;
      }
    } else if( type == "image") {
      if (lifestyleData == "Manifesting Generator") {
        if(cinsiyet == "Erkek")
          return lifestyle_25_plus_manifesting_generator_image_m;
        else
          return lifestyle_25_plus_manifesting_generator_image_w;
      }   else if (lifestyleData == "Generator") {
        if(cinsiyet == "Erkek")
          return lifestyle_25_plus_generator_image_m
        else
          return lifestyle_25_plus_generator_image_w
      } else if (lifestyleData == "Projector") {
        return lifestyle_25_plus_projektor_image;
      } else if (lifestyleData == "Manifestor") {
        return lifestyle_25_plus_manifestor_image;
      } else if (lifestyleData == "Reflector") {
        return lifestyle_25_plus_reflektor_image;
      }
    }
  };

  let communication = (communicationData, age, type) => {
    if (type == "name") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_0;
      } else if (communicationData == "Projector") {
        return communication_projector_0;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_0;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_0;
      }
    } else if (type == "1") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_1;
      } else if (communicationData == "Projector") {
        return communication_projector_1;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_1;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_1;
      }
    } else if (type == "2") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_2;
      } else if (communicationData == "Projector") {
        return communication_projector_2;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_2;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_2;
      }
    } else if (type == "3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_3;
      } else if (communicationData == "Projector") {
        return communication_projector_3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_3;
      }
    }  else if (type == "4") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_3_1;
      } else if (communicationData == "Projector") {
        return communication_projector_3_1;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_3_1;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_3_1;
      }
    } else if (type == "5") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_4;
      } else if (communicationData == "Projector") {
        return communication_projector_4;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_4;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_4;
      }
    } else if (type == "6") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_5;
      } else if (communicationData == "Projector") {
        return communication_projector_5;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_5;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_5;
      }
    } else if (type == "7") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_6;
      } else if (communicationData == "Projector") {
        return communication_projector_6;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_6;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_6;
      }
    } else if (type == "8") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_7;
      } else if (communicationData == "Projector") {
        return communication_projector_7;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_7;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_7;
      }
    } else if (type == "1_s2") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_1_s2;
      } else if (communicationData == "Projector") {
        return communication_projector_1_s2;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_1_s2;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_1_s2;
      }
    } else if (type == "2_s2") {
      if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_2_s2;
      } else if (communicationData == "Projector") {
        return communication_projector_2_s2;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_2_s2;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_2_s2;
      }
    } else if (type == "3_s2") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_3_s2;
      } else if (communicationData == "Projector") {
        return communication_projector_3_s2;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_3_s2;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_3_s2;
      }
    } else if (type == "4_s2") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_4_s2;
      } else if (communicationData == "Projector") {
        return communication_projector_4_s2;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_4_s2;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_4_s2;
      }
    } else if (type == "1_s3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_1_s3;
      } else if (communicationData == "Projector") {
        return communication_projector_1_s3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_1_s3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_1_s3;
      }
    } else if (type == "2_s3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_2_s3;
      } else if (communicationData == "Projector") {
        return communication_projector_2_s3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_2_s3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_2_s3;
      }
    } else if (type == "3_s3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_3_s3;
      } else if (communicationData == "Projector") {
        return communication_projector_3_s3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_3_s3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_3_s3;
      }
    } else if (type == "4_s3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_4_s3;
      } else if (communicationData == "Projector") {
        return communication_projector_4_s3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_4_s3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_4_s3;
      }
    } else if (type == "5_s3") {
        if (communicationData == "Generator" || communicationData == "Manifesting Generator") {
        return communication_generator_5_s3;
      } else if (communicationData == "Projector") {
        return communication_projector_5_s3;
      } else if (communicationData == "Manifestor") {
        return communication_manifestor_5_s3;
      } else if (communicationData == "Reflector") {
        return communication_reflektor_5_s3;
      }
    }
  };

  let worklearnstyle = (worklearnData, age, type) => {
    if (type == "name") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_title;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_indivudal_title;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_titie;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_title;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_title;
      }
    } else if (type == "context") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective;
      }
    } else if (type == "s3_1") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_s3_1;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual_s3_1;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_s3_1;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_s3_1;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_s3_1;
      }
    } else if (type == "s3_2") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_s3_2;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual_s3_2;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_s3_2;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_s3_2;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_s3_2;
      }
    } else if (type == "s3_3") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_s3_3;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual_s3_3;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_s3_3;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_s3_3;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_s3_3;
      }
    } else if (type == "s3_4") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_s3_4;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual_s3_4;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_s3_4;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_s3_4;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_s3_4;
      }
    } else if (type == "s3_5") {
      if (worklearnData == "No Definition") {
        return c_o_s_objective_s3_5;
      } else if (worklearnData == "Single Definition") {
        return c_o_s_individual_s3_5;
      } else if (worklearnData == "Split Definition") {
        return c_o_s_collaborative_s3_5;
      } else if (worklearnData == "Triple Split Definition") {
        return c_o_s_synthesizing_s3_5;
      } else if (worklearnData == "Quadruple Split Definition") {
        return c_o_s_subjective_s3_5;
      }
    }
  };

  let is_y_r = (is_y_rData, age, type) => {
    if (type == "image") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_image_1_3;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_image_1_4;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_image_2_4;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_image_2_5;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_image_3_5;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_image_3_6;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_image_4_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_image_4_6;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_image_5_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_image_5_2;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_image_6_2;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_image_6_3;
      }
    }
    if (type == "name") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_0;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_0;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_0;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_0;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_0;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_0;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_0;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_0;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_0;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_0;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_0;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_0;
      }
    } else if (type == "s2_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_1;
      }
    } else if (type == "s2_1_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_1_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_1_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_1_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_1_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_1_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_1_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_1_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_1_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_1_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_1_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_1_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_1_1;
      }
    } else if (type == "s2_2") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_2;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_2;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_2;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_2;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_2;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_2;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_2;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_2;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_2;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_2;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_2;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_2;
      }
    } else if (type == "s2_2_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_2_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_2_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_2_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_2_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_2_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_2_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_2_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_2_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_2_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_2_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_2_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_2_1;
      }
    } else if (type == "s2_3") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_3;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_3;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_3;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_3;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_3;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_3;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_3;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_3;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_3;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_3;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_3;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_3;
      }
    } else if (type == "s2_3_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s2_3_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s2_3_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s2_3_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s2_3_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s2_3_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s2_3_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s2_3_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s2_3_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s2_3_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s2_3_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s2_3_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s2_3_1;
      }
    } else if (type == "s3_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s3_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s3_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s3_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s3_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s3_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s3_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s3_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s3_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s3_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s3_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s3_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s3_1;
      }
    } else if (type == "s3_1_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s3_1_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s3_1_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s3_1_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s3_1_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s3_1_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s3_1_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s3_1_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s3_1_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s3_1_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s3_1_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s3_1_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s3_1_1;
      }
    } else if (type == "s3_2") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s3_2;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s3_2;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s3_2;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s3_2;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s3_2;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s3_2;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s3_2;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s3_2;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s3_2;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s3_2;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s3_2;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s3_2;
      }
    } else if (type == "s3_2_1") {
      if (is_y_rData == "1 / 3") {
        return is_y_r_1_s3_2_1;
      } else if (is_y_rData == "1 / 4") {
        return is_y_r_2_s3_2_1;
      } else if (is_y_rData == "2 / 4") {
        return is_y_r_3_s3_2_1;
      } else if (is_y_rData == "2 / 5") {
        return is_y_r_4_s3_2_1;
      } else if (is_y_rData == "3 / 5") {
        return is_y_r_5_s3_2_1;
      } else if (is_y_rData == "3 / 6") {
        return is_y_r_6_s3_2_1;
      } else if (is_y_rData == "4 / 1") {
        return is_y_r_7_s3_2_1;
      } else if (is_y_rData == "4 / 6") {
        return is_y_r_8_s3_2_1;
      } else if (is_y_rData == "5 / 1") {
        return is_y_r_9_s3_2_1;
      } else if (is_y_rData == "5 / 2") {
        return is_y_r_10_s3_2_1;
      } else if (is_y_rData == "6 / 2") {
        return is_y_r_11_s3_2_1;
      } else if (is_y_rData == "6 / 3") {
        return is_y_r_12_s3_2_1;
      }
    }
  };

  let decision_strategy = (decisionStrategyData, age, type) => {
    if (type == "image") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return image_karar_verme_stratejileri_1; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return image_karar_verme_stratejileri_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return image_karar_verme_stratejileri_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return image_karar_verme_stratejileri_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return image_karar_verme_stratejileri_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return image_karar_verme_stratejileri_6; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return image_karar_verme_stratejileri_7; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return image_karar_verme_stratejileri_8; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return image_karar_verme_stratejileri_9; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return image_karar_verme_stratejileri_10; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return image_karar_verme_stratejileri_11; 
      }
    }
    if (type == "name") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_0; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_0; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_0; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_0; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_0; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_0; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_0; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_0; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s3_9_0; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s3_10_0; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s3_11_0; 
      }
  } else if (type == "s3_x_1") { // BURASI WORD'DE VAR AMA TEMPLATE'E YAZILMIYOR!
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_1; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_9_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
          return decision_strategy_s3_10_1; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
          return decision_strategy_s3_11_1; 
      }
  } else if (type == "s3_x_2") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_2; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_2; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_2; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_9_2;
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
          return decision_strategy_s3_10_2; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
          return decision_strategy_s3_11_2; 
      }
  } else if (type == "s3_x_3") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_3; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_9_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
          return decision_strategy_s3_10_3; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
          return decision_strategy_s3_11_3; 
      }
  } else if (type == "s3_x_4") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_4; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_9_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
          return decision_strategy_s3_10_4; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
          return decision_strategy_s3_11_4; 
      }
  } else if (type == "s3_x_5") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_1_5; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
          return decision_strategy_s3_2_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_3_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_4_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
          return decision_strategy_s3_5_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
          return decision_strategy_s3_6_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
          return decision_strategy_s3_7_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
          return decision_strategy_s3_8_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
          return decision_strategy_s3_9_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
          return decision_strategy_s3_10_5; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
          return decision_strategy_s3_11_5; 
      }
  } else if (type == "s4_x_title") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_title; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_title; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_title; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_title; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_title; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_title; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_title; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_title; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_title; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_title; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_title; 
      }
  } else if (type == "s4_x_text") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_text; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_text; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_text; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_text; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_text; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_text; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_text; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_text; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_text; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_text; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_text; 
      }
  } else if (type == "s4_x_1") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_1; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_1; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_1;
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_1;
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_1; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_1; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_1; 
      }
  } else if (type == "s4_x_2") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_2; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_2; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_2; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_2;
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_2; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_2;
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_2; 
      }
  } else if (type == "s4_x_3") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_3; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_3; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_3; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_3;
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_3; 
      }
  } else if (type == "s4_x_4") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_4; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_4; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_4;
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_4; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_4; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_4; 
      }
  } else if (type == "s4_x_5") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_5; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_5; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_5; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_5; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_5; 
      }
  } else if (type == "s4_x_txt") {
      if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_1_txt; 
      } else if (decisionStrategyData.strategy == "To Respond" && decisionStrategyData.innerAuthority == "Sacral") {
        return decision_strategy_s4_2_txt; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_3_txt; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_4_txt; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Ego Projected") {
        return decision_strategy_s4_5_txt; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Self Projected") {
        return decision_strategy_s4_6_txt; 
      } else if (decisionStrategyData.strategy == "Wait for the Invitation" && decisionStrategyData.innerAuthority == "Mental") {
        return decision_strategy_s4_7_txt; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Emotional") {
        return decision_strategy_s4_8_txt; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Splenic") {
        return decision_strategy_s4_9_txt; 
      } else if (decisionStrategyData.strategy == "To Inform" && decisionStrategyData.innerAuthority == "Ego Manifested") {
        return decision_strategy_s4_10_txt; 
      } else if (decisionStrategyData.strategy == "Wait a Lunar Cycle" && decisionStrategyData.innerAuthority == "Lunar") {
        return decision_strategy_s4_11_txt; 
      }
    }
  };

  let kariyer_secim = (kariyer_secimData, age, type) => {
    if (type == "name") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_25_40_s2_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_25_40_s2_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_25_40_s2_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_25_40_s2_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_25_40_s2_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_25_40_s2_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_25_40_s2_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_25_40_s2_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_25_40_s2_9_1;
      }
    } else if (type == "sector") {
      if (kariyer_secimData == "tech") {
        return "Teknoloji";
      } else if (kariyer_secimData == "retail") {
        return "Perakende";
      } else if (kariyer_secimData == "dress") {
        return "Moda ve Hazır Giyim";
      } else if (kariyer_secimData == "auto") {
        return "Otomotiv";
      } else if (kariyer_secimData == "health") {
        return "Sağlık ve İlaç";
      } else if (kariyer_secimData == "meal") {
        return "Mutfak Sanatları";
      } else {
        return "Diğer";
      }
    } else if (type == "s2_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_25_40_s2_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_25_40_s2_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_25_40_s2_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_25_40_s2_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_25_40_s2_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_25_40_s2_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_25_40_s2_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_25_40_s2_8_2;
      }else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_25_40_s2_9_2;
      }
    } else if (type == "s3_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_s3_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_s3_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_s3_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_s3_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_s3_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_s3_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_s3_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_s3_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_s3_9_1;
      }
    } else if (type == "s4_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_s4_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_s4_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_s4_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_s4_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_s4_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_s4_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_s4_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_s4_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_s4_9_1;
      }
    } else if (type == "s7_x") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_25_40_s2_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_25_40_s2_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_25_40_s2_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_25_40_s2_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_25_40_s2_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_25_40_s2_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_25_40_s2_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_25_40_s2_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_25_40_s2_9_1;
      }
    } else if (type == "s7_retail_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_1;
      }
    } else if (type == "s7_retail_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_2;
      } if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_2;
      }
    } else if (type == "s7_retail_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_3;
      }
    } else if (type == "s7_retail_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_4;
      }
    } else if (type == "s7_retail_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_5;
      }
    } else if (type == "s7_retail_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_6;
      }
    } else if (type == "s7_retail_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_7;
      }
    } else if (type == "s7_retail_x_8") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_1_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_2_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_retail_3_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_4_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_5_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_retail_6_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_retail_7_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_retail_8_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_retail_9_8;
      }
    } else if (type == "s7_health_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_1;
      }
    } else if (type == "s7_health_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_2;
      }
    } else if (type == "s7_health_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_3;
      }
    } else if (type == "s7_health_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_4;
      }
    } else if (type == "s7_health_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_9_5;
      }
    } else if (type == "s7_health_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_6;
      }
    } else if (type == "s7_health_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_7;
      }
    } else if (type == "s7_health_x_8") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_health_1_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_health_2_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_health_3_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_health_4_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_health_5_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_health_6_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_health_7_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_health_8_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_health_9_8;
      }
    } else if (type == "s7_tech_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_1;
      }
    } else if (type == "s7_tech_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_2;
      }
    } else if (type == "s7_tech_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_3;
      }
    } else if (type == "s7_tech_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_4;
      }
    } else if (type == "s7_tech_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_5;
      }
    } else if (type == "s7_tech_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_6;
      }
    } else if (type == "s7_tech_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_7;
      }
    } else if (type == "s7_tech_x_8") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_1_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_2_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_tech_3_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_4_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_5_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_tech_6_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_tech_7_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_tech_8_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_tech_9_8;
      }
    } else if (type == "s7_dress_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_1;
      }
    } else if (type == "s7_dress_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_2;
      }
    } else if (type == "s7_dress_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_3;
      }
    } else if (type == "s7_dress_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_4;
      }
    } else if (type == "s7_dress_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_5;
      }
    } else if (type == "s7_dress_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_6;
      }
    } else if (type == "s7_dress_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_dress_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_dress_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_dress_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_dress_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_dress_9_7;
      }
    } else if (type == "s7_auto_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_1;
      }
    } else if (type == "s7_auto_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_2;
      }
    } else if (type == "s7_auto_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_3;
      }
    } else if (type == "s7_auto_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_4;
      }
    } else if (type == "s7_auto_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_5;
      }
    } else if (type == "s7_auto_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_6;
      } else  if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_6;
      }
    } else if (type == "s7_auto_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_auto_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_auto_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_auto_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_auto_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_auto_9_7;
      }
    } else if (type == "s7_meal_x_1") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_1;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_1;
      } 
    } else if (type == "s7_meal_x_2") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_2;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_2;
      }
    } else if (type == "s7_meal_x_3") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_3;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_3;
      }
    } else if (type == "s7_meal_x_4") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_4;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_4;
      }
    } else if (type == "s7_meal_x_5") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_5;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_5;
      }
    } else if (type == "s7_meal_x_6") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_6;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_6;
      }
    } else if (type == "s7_meal_x_7") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_7;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_7;
      }
    } else if (type == "s7_meal_x_8") {
      if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yaratıcı ve Sanatsal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_1_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Liderlik ve Yönetim Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_2_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yardım ve Sosyal Kariyerler") {
        return kariyer_secim_12_25_s7_meal_3_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Teknik ve Mühendislik Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_4_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Satış ve İlişki Kurma Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_5_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Organizasyonel ve İdari Kariyerler") {
        return kariyer_secim_12_25_s7_meal_6_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Yenilikçi ve Girişimci Kariyerler") {
        return kariyer_secim_12_25_s7_meal_7_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Öğretim ve Mentorluk Kariyerleri") {
        return kariyer_secim_12_25_s7_meal_8_8;
      } else if (careerSelectionData.find((x) => x.id == kariyer_secimData.id).name == "Analitik ve Veri Odaklı Kariyerler") {
        return kariyer_secim_12_25_s7_meal_9_8;
      }
    }      
  };

  let guclu_yanlarin = (guclu_yanlarinData, age, type) => {
    if (guclu_yanlarinData.name == "57-10") {
      if (type == "57-10_1") {
        return guclu_yanlarin_57_10_1;
      } else if (type == "57-10_2") {
        return guclu_yanlarin_57_10_2;
      }
    } else if (guclu_yanlarinData.name == "20-10") {
      if (type == "20-10_1") {
        return guclu_yanlarin_20_10_1;
      } else if (type == "20-10_2") {
        return guclu_yanlarin_20_10_2;
      }
    } else if (guclu_yanlarinData.name == "6-59") {
      if (type == "6-59_1") {
        return guclu_yanlarin_6_59_1;
      } else if (type == "6-59_2") {
        return guclu_yanlarin_6_59_2;
      } 
    } else if (guclu_yanlarinData.name == "63-4") {
      if (type == "63-4_1") {
        return guclu_yanlarin_63_4_1;
      } else if (type == "63-4_2") {
        return guclu_yanlarin_63_4_2;
      }
    } else if (guclu_yanlarinData.name == "45-21") {
      if (type == "45-21_1") {
        return guclu_yanlarin_45_21_1;
      } else if (type == "45-21_2") {
        return guclu_yanlarin_45_21_2;
      }
    } else if (guclu_yanlarinData.name == "3-60") {
      if (type == "3-60_1") {
        return guclu_yanlarin_3_60_1;
      } else if (type == "3-60_2") {
        return guclu_yanlarin_3_60_2;
      }
    } else if (guclu_yanlarinData.name == "5-15") {
      if (type == "5-15_1") {
        return guclu_yanlarin_5_15_1;
      } else if (type == "5-15_2") {
        return guclu_yanlarin_5_15_2;
      }
    } else if (guclu_yanlarinData.name == "64-47") {
      if (type == "64-47_1") {
        return guclu_yanlarin_64_47_1;
      } else if (type == "64-47_2") {
        return guclu_yanlarin_64_47_2;
      }
    } else if (guclu_yanlarinData.name == "27-50") {
      if (type == "27-50_1") {
        return guclu_yanlarin_27_50_1;
      } else if (type == "27-50_2") {
        return guclu_yanlarin_27_50_2;
      } else if (type == "27-50_3") {
      }
    } else if (guclu_yanlarinData.name == "26-44") {
      if (type == "26-44_1") {
        return guclu_yanlarin_26_44_1;
      } else if (type == "26-44_2") {
        return guclu_yanlarin_26_44_2;
      }
    } else if (guclu_yanlarinData.name == "32-54") {
      if (type == "32-54_1") {
        return guclu_yanlarin_32_54_1;
      } else if (type == "32-54_2") {
        return guclu_yanlarin_32_54_2;
      }
    } else if (guclu_yanlarinData.name == "19-49") {
      if (type == "19-49_1") {
        return guclu_yanlarin_19_49_1;
      } else if (type == "19-49_2") {
        return guclu_yanlarin_19_49_2;
      }
    } else if (guclu_yanlarinData.name == "37-40") {
      if (type == "37-40_1") {
        return guclu_yanlarin_37_40_1;
      } else if (type == "37-40_2") {
        return guclu_yanlarin_37_40_2;
      }
    } else if (guclu_yanlarinData.name == "34-57") {
      if (type == "34-57_1") {
        return guclu_yanlarin_34_57_1;
      } else if (type == "34-57_2") {
        return guclu_yanlarin_34_57_2;
      }
    } else if (guclu_yanlarinData.name == "20-34") {
      if (type == "20-34_1") {
        return guclu_yanlarin_20_34_1;
      } else if (type == "20-34_2") {
        return guclu_yanlarin_20_34_2;
      }
    } else if (guclu_yanlarinData.name == "51-25") {
      if (type == "51-25_1") {
        return guclu_yanlarin_51_25_1;
      } else if (type == "51-25_2") {
        return guclu_yanlarin_51_25_2;
      }
    } else if (guclu_yanlarinData.name == "1-8") {
      if (type == "1-8_1") {
        return guclu_yanlarin_1_8_1;
      } else if (type == "1-8_2") {
        return guclu_yanlarin_1_8_2;
      }
    } else if (guclu_yanlarinData.name == "38-28") {
      if (type == "38-28_1") {
        return guclu_yanlarin_38_28_1;
      } else if (type == "38-28_2") {
        return guclu_yanlarin_38_28_2;
      }
    } else if (guclu_yanlarinData.name == "7-31") {
      if (type == "7-31_1") {
        return guclu_yanlarin_7_31_1;
      } else if (type == "7-31_2") {
        return guclu_yanlarin_7_31_2;
      }
    } else if (guclu_yanlarinData.name == "57-20") {
      if (type == "57-20_1") {
        return guclu_yanlarin_57_20_1;
      } else if (type == "57-20_2") {
        return guclu_yanlarin_57_20_2;
      }
    } else if (guclu_yanlarinData.name == "39-55") {
      if (type == "39-55_1") {
        return guclu_yanlarin_39_55_1;
      } else if (type == "39-55_2") {
        return guclu_yanlarin_39_55_2;
      }
    } else if (guclu_yanlarinData.name == "2-14") {
      if (type == "2-14_1") {
        return guclu_yanlarin_2_14_1;
      } else if (type == "2-14_2") {
        return guclu_yanlarin_2_14_2;
      }
    } else if (guclu_yanlarinData.name == "12-22") {
      if (type == "12-22_1") {
        return guclu_yanlarin_22_12_1;
      } else if (type == "12-22_2") {
        return guclu_yanlarin_22_12_2;
      }
    } else if (guclu_yanlarinData.name == "61-24") {
      if (type == "61-24_1") {
        return guclu_yanlarin_61_24_1;
      } else if (type == "61-24_2") {
        return guclu_yanlarin_61_24_2;
      }
    } else if (guclu_yanlarinData.name == "43-23") {
      if (type == "43-23_1") {
        return guclu_yanlarin_43_23_1;
      } else if (type == "43-23_2") {
        return guclu_yanlarin_43_23_2;
      }
    } else if (guclu_yanlarinData.name == "52-9") {
      if (type == "52-9_1") {
        return guclu_yanlarin_52_9_1;
      } else if (type == "52-9_2") {
        return guclu_yanlarin_52_9_2;
      }
    } else if (guclu_yanlarinData.name == "18-58") {
      if (type == "18-58_1") {
        return guclu_yanlarin_58_18_1;
      } else if (type == "18-58_2") {
        return guclu_yanlarin_58_18_2;
      }
    } else if (guclu_yanlarinData.name == "48-16") {
      if (type == "48-16_1") {
        return guclu_yanlarin_48_16_1;
      } else if (type == "48-16_2") {
        return guclu_yanlarin_48_16_2;
      }
    } else if (guclu_yanlarinData.name == "17-62") {
      if (type == "17-62_1") {
        return guclu_yanlarin_17_62_1;
      } else if (type == "17-62_2") {
        return guclu_yanlarin_17_62_2;
      } else if (type == "17-62_3") {
      }
    } else if (guclu_yanlarinData.name == "53-42") {
      if (type == "53-42_1") {
        return guclu_yanlarin_53_42_1;
      } else if (type == "53-42_2") {
        return guclu_yanlarin_53_42_2;
      } else if (type == "53-42_3") {
      }
    } else if (guclu_yanlarinData.name == "46-29") {
      if (type == "46-29_1") {
        return guclu_yanlarin_46_29_1;
      } else if (type == "46-29_2") {
        return guclu_yanlarin_46_29_2;
      }
    } else if (guclu_yanlarinData.name == "13-33") {
      if (type == "13-33_1") {
        return guclu_yanlarin_13_33_1;
      } else if (type == "13-33_2") {
        return guclu_yanlarin_13_33_2;
      }
    } else if (guclu_yanlarinData.name == "41-30") {
      if (type == "41-30_1") {
        return guclu_yanlarin_41_30_1;
      } else if (type == "41-30_2") {
        return guclu_yanlarin_41_30_2;
      }
    } else if (guclu_yanlarinData.name == "35-36") {
      if (type == "35-36_1") {
        return guclu_yanlarin_35_36_1;
      } else if (type == "35-36_2") {
        return guclu_yanlarin_35_36_2;
      }
    } else if (guclu_yanlarinData.name == "11-56") {
      if (type == "11-56_1") {
        return guclu_yanlarin_11_56_1;
      } else if (type == "11-56_2") {
        return guclu_yanlarin_11_56_2;
      }
    } else if (guclu_yanlarinData.name == "34-10") {
      if (type == "34-10_1") {
        return guclu_yanlarin_34_10_1;
      } else if (type == "34-10_2") {
        return guclu_yanlarin_34_10_2;
      }
    } else if (guclu_yanlarinData.name == "15") {
      if (type == "15_1") {
        return guclu_yanlarin_15_1;
      } else if (type == "15_2") {
        return guclu_yanlarin_15_2;
      }
    } else if (guclu_yanlarinData.name == "5") {
      if (type == "5_1") {
        return guclu_yanlarin_5_1;
      } else if (type == "5_2") {
        return guclu_yanlarin_5_2;
      }
    } else if (guclu_yanlarinData.name == "46") {
      if (type == "46_1") {
        return guclu_yanlarin_46_1;
      } else if (type == "46_2") {
        return guclu_yanlarin_46_2;
      }
    } else if (guclu_yanlarinData.name == "29") {
      if (type == "29_1") {
        return guclu_yanlarin_29_1;
      } else if (type == "29_2") {
        return guclu_yanlarin_29_2;
      }
    } else if (guclu_yanlarinData.name == "14") {
      if (type == "14_1") {
        return guclu_yanlarin_14_1;
      } else if (type == "14_2") {
        return guclu_yanlarin_14_2;
      }
    } else if (guclu_yanlarinData.name == "2") {
      if (type == "2_1") {
        return guclu_yanlarin_2_1;
      } else if (type == "2_2") {
        return guclu_yanlarin_2_2;
      }
    } else if (guclu_yanlarinData.name == "1") {
      if (type == "1_1") {
        return guclu_yanlarin_1_1;
      } else if (type == "1_2") {
        return guclu_yanlarin_1_2;
      }
    } else if (guclu_yanlarinData.name == "8") {
      if (type == "8_1") {
        return guclu_yanlarin_8_1;
      } else if (type == "8_2") {
        return guclu_yanlarin_8_2;
      }
    } else if (guclu_yanlarinData.name == "7") {
      if (type == "7_1") {
        return guclu_yanlarin_7_1;
      } else if (type == "7_2") {
        return guclu_yanlarin_7_2;
      }
    } else if (guclu_yanlarinData.name == "31") {
      if (type == "31_1") {
        return guclu_yanlarin_31_1;
      } else if (type == "31_2") {
        return guclu_yanlarin_31_2;
      }
    } else if (guclu_yanlarinData.name == "13") {
      if (type == "13_1") {
        return guclu_yanlarin_13_1;
      } else if (type == "13_2") {
        return guclu_yanlarin_13_2;
      }
    } else if (guclu_yanlarinData.name == "33") {
      if (type == "33_1") {
        return guclu_yanlarin_33_1;
      } else if (type == "33_2") {
        return guclu_yanlarin_33_2;
      }
    }
  };

  // console.log(typeof rawData);

  var cinsiyet =  Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / cinsiyet")[1]

  var allVariables = { // Burada sadece değişmeyen ilk 28'i tanımlı. alt tarafda gelen güçlü yanlarına göre diğer alanlar objeye push ediliyor.
  
    P1A1 : Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + " " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / soyisim")[1],
    P2A1 : "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ",",
    P4A1 : "chart", // Kişilik Özellikleri
    P4A2 : hollandData[0].name + " ve " + hollandData[1].name + " kişilik özelliklerinin baskın, " + hollandData[5].name + " özelliğinin daha geri planda olduğu bir yapın var.",
    P4A3 : kslk_ozl(hollandData[0].name, 25, "name"), //holland.find(x => x.name == hollandData[0].name).value.description,
    P4A4 : kslk_ozl(hollandData[1].name, 25, "name"), //holland.find(x => x.name == hollandData[0].name).value.feature,
    P4A5 : kslk_ozl(hollandData[0].name, 25, "profile"), //holland.find(x => x.name == hollandData[0].name).value.value,
    P4A6 : kslk_ozl(hollandData[1].name, 25, "profile"),
    
    P5A1 : kslk_ozl(hollandData[0].name, 25, "interest_1"),
    P5A2 : kslk_ozl(hollandData[1].name, 25, "interest_1"),
    P5A3 : kslk_ozl(hollandData[0].name, 25, "interest_2"),
    P5A4 : kslk_ozl(hollandData[1].name, 25, "interest_2"),
    P5A5 : kslk_ozl(hollandData[0].name, 25, "work_areas"),
    P5A6 : kslk_ozl(hollandData[0].name, 25, "may_not_like"),
    P5A7 : kslk_ozl(hollandData[1].name, 25, "work_areas"),
    P5A8 : kslk_ozl(hollandData[1].name, 25, "may_not_like"),
  
    P6A1 : kslk_ozl(hollandData[0].name, 25, "name"), // Kendini Değerlendirme
    P6A2 : kslk_ozl(hollandData[0].name, 25, "question_1"),
    P6A3 : kslk_ozl(hollandData[0].name, 25, "question_2"),
    P6A4 :kslk_ozl(hollandData[0].name, 25, "question_3"),
    P6A5 : kslk_ozl(hollandData[1].name, 25, "name"),
    P6A6 : kslk_ozl(hollandData[1].name, 25, "question_1"),
    P6A7 : kslk_ozl(hollandData[1].name, 25, "question_2"),
    P6A8 : kslk_ozl(hollandData[1].name, 25, "question_3"),
  
    P7A1 : "chart", // Karakter Özelliklerin
    P7A2 : krktr_ozl(big5Data[0].name, 25, "name").toLocaleUpperCase('tr-TR'),
    P7A3 : krktr_ozl(big5Data[1].name, 25, "name").toLocaleUpperCase('tr-TR'),
    P7A4 : krktr_ozl(big5Data[0].name, 25, "character_elements"),
    P7A5 : krktr_ozl(big5Data[1].name, 25, "character_elements"),
    
    P8A1 : krktr_ozl(big5Data[0].name, 25, "strength"),
    P8A2 : krktr_ozl(big5Data[0].name, 25, "weakness"),
    P8A3 : krktr_ozl(big5Data[1].name, 25, "strength"),
    P8A4 : krktr_ozl(big5Data[1].name, 25, "weakness"),
    P8A5 : krktr_ozl(big5Data[2].name, 25, "strength"),
    P8A6 : krktr_ozl(big5Data[2].name, 25, "weakness"),
    P8A7 : krktr_ozl(big5Data[0].name, 25, "other_attributes"),
    P8A8 : krktr_ozl(big5Data[1].name, 25, "other_attributes"),
    P8A9 : krktr_ozl(big5Data[2].name, 25, "other_attributes"),
    
    P9A1 : krktr_ozl(big5Data[0].name, 25, "name"), // Karakter Özelliklerin üzerine kendini değerlendirme.
    P9A2 : krktr_ozl(big5Data[0].name, 25, "question1"),
    P9A3 : krktr_ozl(big5Data[0].name, 25, "question2"),
    P9A4 : krktr_ozl(big5Data[0].name, 25, "question3"),
    P9A5 : krktr_ozl(big5Data[1].name, 25, "name"),
    P9A6 : krktr_ozl(big5Data[1].name, 25, "question1"),
    P9A7 : krktr_ozl(big5Data[1].name, 25, "question2"),
    P9A8 : krktr_ozl(big5Data[1].name, 25, "question3"),
  
    P11A1 : "chart", // Yapay zeka çağı yetkinliklerin
  
    P12A1 : ai(aiData[0].name, 25, "name"),
    P12A2 : ai(aiData[1].name, 25, "name"),
    P12A3 : ai(aiData[0].name, 25, "s3_x_2"),
    P12A4 : ai(aiData[1].name, 25, "s3_x_2"),
    P12A5 : ai(aiData[0].name, 25, "s3_x_3"),
    P12A6 : ai(aiData[1].name, 25, "s3_x_3"),
    P12A7 : ai(aiData[aiData.length - 1].name, 25, "name"),
    P12A8 : ai(aiData[aiData.length - 2].name, 25, "name"),
    P12A9 : ai(aiData[aiData.length - 1].name, 25, "s3_x_2"),
    P12A10 : ai(aiData[aiData.length - 2].name, 25, "s3_x_2"),
    P12A11 : ai(aiData[aiData.length - 1].name, 25, "s3_x_3"),
    P12A12 : ai(aiData[aiData.length - 2].name, 25, "s3_x_3"),
  
    P13A1 : ai(aiData[0].name, 25, "name"),
    P13A2 : ai(aiData[0].name, 25, "s4u1_x_2"),
    P13A3 : ai(aiData[0].name, 25, "s4u1_x_3"),
    P13A4 : ai(aiData[1].name, 25, "name"),
    P13A5 : ai(aiData[1].name, 25, "s4u1_x_2"),
    P13A6 : ai(aiData[1].name, 25, "s4u1_x_3"),
    P13A7 : ai(aiData[aiData.length - 1].name, 25, "name"),
    P13A8 : ai(aiData[0].name, 25, "s4u2_x_2"),
    P13A9 : ai(aiData[0].name, 25, "s4u2_x_3"),
    P13A10 : ai(aiData[0].name, 25, "s4u2_x_4"),
    P13A11 : ai(aiData[0].name, 25, "s4u2_x_5"),

    P14A1 : "chart", // Ekip Çalışmasına Yatkınlık -- en iyi oldukların
  
    P15A1 : teamwork(teamworkData[0].name, 25, "name"),
    P15A2 : teamwork(teamworkData[1].name, 25, "name"),
    P15A3 : teamwork(teamworkData[0].name, 25, "best"),
    P15A4 : teamwork(teamworkData[1].name, 25, "best"),
    P15A5 : teamwork(teamworkData[teamworkData.length - 1].name, 25, "name"), // Geliştirmeyi Düşünebilirsin
    P15A6 : teamwork(teamworkData[teamworkData.length - 2].name, 25, "name"),
    P15A7 : teamwork(teamworkData[teamworkData.length - 1].name, 25, "best"),
    P15A8 : teamwork(teamworkData[teamworkData.length - 2].name, 25, "best"),
    
    P16A1 : teamwork(teamworkData[0].name, 25, "name"), // Ekip Çalımasına Yatkınlık Kendini Değerlendirme Gücünü kullan
    P16A2 : teamwork(teamworkData[0].name, 25, "s3u1_x_1"),
    P16A3 : teamwork(teamworkData[0].name, 25, "s3u1_x_2"),
    P16A4 : teamwork(teamworkData[1].name, 25, "name"),
    P16A5 : teamwork(teamworkData[1].name, 25, "s3u1_x_1"),
    P16A6 : teamwork(teamworkData[1].name, 25, "s3u1_x_2"),
    P16A7 : teamwork(teamworkData[teamworkData.length - 1].name, 25, "name"),
    P16A8 : teamwork(teamworkData[teamworkData.length - 1].name, 25, "s3u2_x_1",),
    P16A9 : teamwork(teamworkData[teamworkData.length - 1].name, 25, "s3u2_x_2",),
    P16A10 : teamwork(teamworkData[teamworkData.length - 1].name,25, "s3u2_x_3",),
    
    P17A1 : lifestyle(lifestyleData[0], 25, "name"), // Yaşamda İlerleme Tarzın
    P17A2 : lifestyle(lifestyleData[0], 25, "p1"),
    P17A3 : lifestyle(lifestyleData[0], 25, "image"),
    
    P18A1 : lifestyle(lifestyleData[0], 25, "p2"),
    P18A2 : lifestyle(lifestyleData[0], 25, "p3"),
    P18A3 : lifestyle(lifestyleData[0], 25, "motto").toLocaleUpperCase('tr-TR'), // motto
  
    P19A1 : lifestyle(lifestyleData[0], 25, "questions"),
    P19A2 : lifestyle(lifestyleData[0], 25, "evaluation_1"),
    P19A3 : lifestyle(lifestyleData[0], 25, "evaluation_2"),
    P19A4 : lifestyle(lifestyleData[0], 25, "evaluation_3"),
    P19A5 : lifestyle(lifestyleData[0], 25, "evaluation_4"),
    P19A6 : lifestyle(lifestyleData[0], 25, "evaluation_5"),
    
    P20A1 : communication(communicationData[0], 25, "name").toLocaleUpperCase('tr-TR'),
    P20A2 : communication(communicationData[0], 25, "1"),
    P20A3 : communication(communicationData[0], 25, "2"),
    P20A4 : communication(communicationData[0], 25, "3"),
    P20A5 : communication(communicationData[0], 25, "4"),
    P20A6 : communication(communicationData[0], 25, "5"),
    P20A7 : communication(communicationData[0], 25, "6"),
    P20A8 : communication(communicationData[0], 25, "7"),
    P20A9 : communication(communicationData[0], 25, "8"),
    
    P21A1 : communication(communicationData[0], 25, "1_s2"), // İş Yerinde Etkili İletişim ve Katılım
    P21A2 : communication(communicationData[0], 25, "2_s2"),
    P21A3 : communication(communicationData[0], 25, "3_s2"),
    P21A4 : communication(communicationData[0], 25, "4_s2"),
    
    P22A1 : communication(communicationData[0], 25, "name"), // İletişim ve Etkileşim Tarzın
    P22A2 : communication(communicationData[0], 25, "1_s3"),
    P22A3 : communication(communicationData[0], 25, "2_s3"),
    P22A4 : communication(communicationData[0], 25, "3_s3"),
    P22A5 : communication(communicationData[0], 25, "4_s3"),
    P22A6 : communication(communicationData[0], 25, "5_s3"),
  
    P24A1 : worklearnstyle(worklearnData[0], 25, "name"), // Çalışma ve Öğrenme Stilin
    P24A2 : worklearnstyle(worklearnData[0], 25, "context"),
    
    P25A1 : worklearnstyle(worklearnData[0], 25, "name"), // Çalışma ve Öğrenme Stilin Kendini Değerlendirme
    P25A2 : worklearnstyle(worklearnData[0], 25, "s3_1"),
    P25A3 : worklearnstyle(worklearnData[0], 25, "s3_2"),
    P25A4 : worklearnstyle(worklearnData[0], 25, "s3_3"),
    P25A5 : worklearnstyle(worklearnData[0], 25, "s3_4"),
    P25A6 : worklearnstyle(worklearnData[0], 25, "s3_5"),
    
    P27A1 : is_y_r(is_y_rData[0], 25, "s2_1"), // İş Yaşamında Rolün
    P27A2 : is_y_r(is_y_rData[0], 25, "s2_1_1"),
    P27A3 : is_y_r(is_y_rData[0], 25, "s2_2"),
    P27A4 : is_y_r(is_y_rData[0], 25, "s2_2_1"),
    P27A5 : is_y_r(is_y_rData[0], 25, "s2_3"),
    P27A6 : is_y_r(is_y_rData[0], 25, "s2_3_1"),
    P27A7 : is_y_r(is_y_rData[0], 25, "image"),
    
    P28A1 : is_y_r(is_y_rData[0], 25, "name"),
    P28A2 : is_y_r(is_y_rData[0], 25, "s3_1"),
    P28A3 : is_y_r(is_y_rData[0], 25, "s3_1_1"),
    P28A4 : is_y_r(is_y_rData[0], 25, "s3_2"),
    P28A5 : is_y_r(is_y_rData[0], 25, "s3_2_1"),

    graphbig : bigdataPercent,
    graphholland : hollanddataPercent,
    graphcareer : careerSelectionLastResult,
    graphai: aiData,
    graphteamwork: teamworkData
  }

  var inputModel={

    P1A1: allVariables.P1A1,
    P2A1: allVariables.P2A1,
    P4A1: allVariables.P4A1, // Kişilik Özellikleri
    P4A2: allVariables.P4A2,
    P4A3: allVariables.P4A3, //holland.find(x => x.name == hollandData[0].name).value.description,
    P4A4: allVariables.P4A4, //holland.find(x => x.name == hollandData[0].name).value.feature,
    P4A5: allVariables.P4A5, //holland.find(x => x.name == hollandData[0].name).value.value,
    P4A6: allVariables.P4A6,
    P5A1: allVariables.P5A1,
    P5A2: allVariables.P5A2,
    P5A3: allVariables.P5A3,
    P5A4: allVariables.P5A4,
    P5A5: allVariables.P5A5,
    P5A6: allVariables.P5A6,
    P5A7: allVariables.P5A7,
    P5A8: allVariables.P5A8,
    P6A1: allVariables.P6A1, // Kendini Değerlendirme
    P6A2: allVariables.P6A2,
    P6A3: allVariables.P6A3,
    P6A4: allVariables.P6A4,
    P6A5: allVariables.P6A5,
    P6A6: allVariables.P6A6,
    P6A7: allVariables.P6A7,
    P6A8: allVariables.P6A8,

    P7A1: allVariables.P7A1, // Karakter Özelliklerin
    P7A2: allVariables.P7A2,
    P7A3: allVariables.P7A3,
    P7A4: allVariables.P7A4,
    P7A5: allVariables.P7A5,
    P8A1: allVariables.P8A1,
    P8A2: allVariables.P8A2,
    P8A3: allVariables.P8A3,
    P8A4: allVariables.P8A4,
    P8A5: allVariables.P8A5,
    P8A6: allVariables.P8A6,
    P8A7: allVariables.P8A7,
    P8A8: allVariables.P8A8,
    P8A9: allVariables.P8A9,
    P9A1: allVariables.P9A1, // Karakter Özelliklerin üzerine kendini değerlendirme.
    P9A2: allVariables.P9A2,
    P9A3: allVariables.P9A3,
    P9A4: allVariables.P9A4,
    P9A5: allVariables.P9A5,
    P9A6: allVariables.P9A6,
    P9A7: allVariables.P9A7,
    P9A8: allVariables.P9A8,

    P11A1: allVariables.P11A1, // Yapay zeka çağı yetkinliklerin
    P12A1: allVariables.P12A1,
    P12A2: allVariables.P12A2,
    P12A3: allVariables.P12A3,
    P12A4: allVariables.P12A4,
    P12A5: allVariables.P12A5,
    P12A6: allVariables.P12A6,
    P12A7: allVariables.P12A7,
    P12A8: allVariables.P12A8,
    P12A9: allVariables.P12A9,
    P12A10: allVariables.P12A10,
    P12A11: allVariables.P12A11,
    P12A12: allVariables.P12A12,
    P13A1: allVariables.P13A1,
    P13A2: allVariables.P13A2,
    P13A3: allVariables.P13A3,
    P13A4: allVariables.P13A4,
    P13A5: allVariables.P13A5,
    P13A6: allVariables.P13A6,
    P13A7: allVariables.P13A7,
    P13A8: allVariables.P13A8,
    P13A9: allVariables.P13A9,
    P13A10: allVariables.P13A10,
    P13A11: allVariables.P13A11,

    P14A1: allVariables.P14A1, // Ekip Çalışmasına Yatkınlık -- en iyi oldukların
    P15A1: allVariables.P15A1,
    P15A2: allVariables.P15A2,
    P15A3: allVariables.P15A3,
    P15A4: allVariables.P15A4,
    P15A5: allVariables.P15A5, // Geliştirmeyi Düşünebilirsin
    P15A6: allVariables.P15A6,
    P15A7: allVariables.P15A7,
    P15A8: allVariables.P15A8,
    P16A1: allVariables.P16A1, // Ekip Çalımasına Yatkınlık Kendini Değerlendirme
    P16A2: allVariables.P16A2,
    P16A3: allVariables.P16A3,
    P16A4: allVariables.P16A4,
    P16A5: allVariables.P16A5, // Kendine sorabilirsin
    P16A6: allVariables.P16A6,
    P16A7: allVariables.P16A7,
    P16A8: allVariables.P16A8,
    P16A9: allVariables.P16A9,
    P16A10: allVariables.P16A10,
    P17A1: allVariables.P17A1, // Yaşamda İlerleme Tarzın
    P17A2: allVariables.P17A2,
    P17A3: allVariables.P17A3,
    P18A1: allVariables.P18A1,
    P18A2: allVariables.P18A2,
    P18A3: allVariables.P18A3, // motto
    P19A1: allVariables.P19A1,
    P19A2: allVariables.P19A2,
    P19A3: allVariables.P19A3,
    P19A4: allVariables.P19A4,
    P19A5: allVariables.P19A5,
    P19A6: allVariables.P19A6,
    P20A1: allVariables.P20A1,
    P20A2: allVariables.P20A2,
    P20A3: allVariables.P20A3,
    P20A4: allVariables.P20A4,
    P20A5: allVariables.P20A5,
    P20A6: allVariables.P20A6,
    P20A7: allVariables.P20A7,
    P20A8: allVariables.P20A8,
    P20A9: allVariables.P20A9,
    P21A1: allVariables.P21A1, // İş Yerinde Etkili İletişim ve Katılım
    P21A2: allVariables.P21A2,
    P21A3: allVariables.P21A3,
    P21A4: allVariables.P21A4,
    P22A1: allVariables.P22A1, // İletişim ve Etkileşim Tarzın
    P22A2: allVariables.P22A2,
    P22A3: allVariables.P22A3,
    P22A4: allVariables.P22A4,
    P22A5: allVariables.P22A5,
    P22A6: allVariables.P22A6,
    P24A1: allVariables.P24A1, // Çalışma ve Öğrenme Stilin
    P24A2: allVariables.P24A2,
    P25A1: allVariables.P25A1, // Çalışma ve Öğrenme Stilin Kendini Değerlendirme
    P25A2: allVariables.P25A2,
    P25A3: allVariables.P25A3,
    P25A4: allVariables.P25A4,
    P25A5: allVariables.P25A5,
    P25A6: allVariables.P25A6,
    P27A1: allVariables.P27A1, // İş Yaşamında Rolün
    P27A2: allVariables.P27A2,
    P27A3: allVariables.P27A3,
    P27A4: allVariables.P27A4,
    P27A5: allVariables.P27A5,
    P27A6: allVariables.P27A6,
    P27A7: allVariables.P27A7,
    P28A1: allVariables.P28A1,
    P28A2: allVariables.P28A2,
    P28A3: allVariables.P28A3,
    P28A4: allVariables.P28A4,
    P28A5: allVariables.P28A5,

    graphbig: bigdataPercent,
    graphholland: hollanddataPercent,
    graphcareer: careerSelectionLastResult,
    graphai: aiData,
    graphteamwork: teamworkData,
  }

  // -------

  if (usageGate.length === 1) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P33A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P33A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P33A3 = "İki Temel Unsur:";
    allVariables.P33A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P33A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P34A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P34A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P34A3 = "Adımlar:";
    allVariables.P34A4 = + decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P34A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P34A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P35A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P35A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P35A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P35A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P36A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P36A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P36A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P36A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P36A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P36A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P37A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P37A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P37A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P37A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P37A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P37A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P38A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P38A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P38A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P38A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P38A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P38A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P39A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P39A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P39A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P39A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P39A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P39A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P39A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P39A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P39A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P39A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P39A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P39A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P39A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P39A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P39A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P39A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P39A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P39A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P39A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P41A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, //Güçlü yanların
      P30A2: allVariables.P30A2,

      P33A1: allVariables.P33A1, // Senin Karar Verme Stratejin
      P33A2: allVariables.P33A2,
      P33A3: allVariables.P33A3,
      P33A4: allVariables.P33A4,
      P33A5: allVariables.P33A5,
      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,
      P34A3: allVariables.P34A3,
      P34A4: allVariables.P34A4,
      P34A5: allVariables.P34A5,
      P34A6: allVariables.P34A6,
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
      P35A3: allVariables.P35A3,
      P35A4: allVariables.P35A4,
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,
      P36A3: allVariables.P36A3,
      P36A4: allVariables.P36A4,
      P36A5: allVariables.P36A5,
      P36A6: allVariables.P36A6,
      P37A1: allVariables.P37A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P37A2: allVariables.P37A2,
      P37A3: allVariables.P37A3,
      P37A4: allVariables.P37A4, // Güncel İşler
      P37A5: allVariables.P37A5,
      P37A6: allVariables.P37A6,
      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4, // Geleceğin İşleri
      P38A5: allVariables.P38A5,
      P38A6: allVariables.P38A6,
      P39A1: allVariables.P39A1, // Sana En uygun kariyer seçenekleri
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4,
      P39A5: allVariables.P39A5,
      P39A6: allVariables.P39A6,
      P39A7: allVariables.P39A7,
      P39A8: allVariables.P39A8,
      P39A9: allVariables.P39A9,
      P39A10: allVariables.P39A10,
      P39A11: allVariables.P39A11,
      P39A12: allVariables.P39A12,
      P39A13: allVariables.P39A13,
      P39A14: allVariables.P39A14,
      P39A15: allVariables.P39A15,
      P39A16: allVariables.P39A16,
      P39A17: allVariables.P39A17,
      P39A18: allVariables.P39A18,
      P39A19: allVariables.P39A19,
      P41A1: allVariables.P41A1, // SevgiWli Dinçer
    };
    
  } else if (usageGate.length === 2) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);
    
    allVariables.P34A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P34A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P34A3 = "İki Temel Unsur:";
    allVariables.P34A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P34A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");
    
    allVariables.P35A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P35A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P35A3 = "Adımlar:",
    allVariables.P35A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P35A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P35A6 = decision_strategy(decision_strategyData, 25, "image");
    
    allVariables.P36A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P36A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P36A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P36A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");
    
    allVariables.P37A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P37A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P37A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P37A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P37A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P37A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");
    
    allVariables.P38A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P38A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P38A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P38A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P38A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P38A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");
    
    allVariables.P39A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P39A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P39A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P39A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P39A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P39A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");
    
    allVariables.P40A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P40A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P40A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P40A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P40A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P40A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P40A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P40A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P40A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P40A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P40A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P40A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P40A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P40A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P40A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P40A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P40A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P40A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P40A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    
    allVariables.P42A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P34A1: allVariables.P34A1, // Senin Karar Verme Stratejin
      P34A2: allVariables.P34A2,
      P34A3: allVariables.P34A3,
      P34A4: allVariables.P34A4,
      P34A5: allVariables.P34A5,
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
      P35A3: allVariables.P35A3,
      P35A4: allVariables.P35A4,
      P35A5: allVariables.P35A5,
      P35A6: allVariables.P35A6,
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,
      P36A3: allVariables.P36A3,
      P36A4: allVariables.P36A4,
      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,
      P37A3: allVariables.P37A3,
      P37A4: allVariables.P37A4,
      P37A5: allVariables.P37A5,
      P37A6: allVariables.P37A6,
      P38A1: allVariables.P38A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4, // Güncel İşler
      P38A5: allVariables.P38A5,
      P38A6: allVariables.P38A6,
      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4, // Geleceğin İşleri
      P39A5: allVariables.P39A5,
      P39A6: allVariables.P39A6,
      P40A1: allVariables.P40A1, // Sana En uygun kariyer seçenekleri
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4,
      P40A5: allVariables.P40A5,
      P40A6: allVariables.P40A6,
      P40A7: allVariables.P40A7,
      P40A8: allVariables.P40A8,
      P40A9: allVariables.P40A9,
      P40A10: allVariables.P40A10,
      P40A11: allVariables.P40A11,
      P40A12: allVariables.P40A12,
      P40A13: allVariables.P40A13,
      P40A14: allVariables.P40A14,
      P40A15: allVariables.P40A15,
      P40A16: allVariables.P40A16,
      P40A17: allVariables.P40A17,
      P40A18: allVariables.P40A18,
      P40A19: allVariables.P40A19,
      P42A1: allVariables.P42A1, // SevgiWli Dinçer
    };
  } else if (usageGate.length === 3) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);
    
    allVariables.P35A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P35A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P35A3 = "İki Temel Unsur:";
    allVariables.P35A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P35A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P36A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P36A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P36A3 = "Adımlar:";
    allVariables.P36A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P36A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P36A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P37A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P37A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P37A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P37A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P38A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P38A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P38A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P38A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P38A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P38A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P39A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P39A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P39A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P39A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P39A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P39A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P40A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P40A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P40A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P40A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P40A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P40A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P41A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P41A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P41A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P41A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P41A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P41A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P41A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P41A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P41A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P41A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P41A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P41A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P41A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P41A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P41A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P41A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P41A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P41A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P41A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    
    allVariables.P43A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,

      P35A1: allVariables.P35A1, // Senin Karar Verme Stratejin
      P35A2: allVariables.P35A2,
      P35A3: allVariables.P35A3,
      P35A4: allVariables.P35A4,
      P35A5: allVariables.P35A5,
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,
      P36A3: allVariables.P36A3,
      P36A4: allVariables.P36A4,
      P36A5: allVariables.P36A5,
      P36A6: allVariables.P36A6,
      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,
      P37A3: allVariables.P37A3,
      P37A4: allVariables.P37A4,
      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4,
      P38A5: allVariables.P38A5,
      P38A6: allVariables.P38A6,
      P39A1: allVariables.P39A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4, // Güncel İşler
      P39A5: allVariables.P39A5,
      P39A6: allVariables.P39A6,
      P40A1: allVariables.P40A1,
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4, // Geleceğin İşleri
      P40A5: allVariables.P40A5,
      P40A6: allVariables.P40A6,
      P41A1: allVariables.P41A1, // Sana En uygun kariyer seçenekleri
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4,
      P41A5: allVariables.P41A5,
      P41A6: allVariables.P41A6,
      P41A7: allVariables.P41A7,
      P41A8: allVariables.P41A8,
      P41A9: allVariables.P41A9,
      P41A10: allVariables.P41A10,
      P41A11: allVariables.P41A11,
      P41A12: allVariables.P41A12,
      P41A13: allVariables.P41A13,
      P41A14: allVariables.P41A14,
      P41A15: allVariables.P41A15,
      P41A16: allVariables.P41A16,
      P41A17: allVariables.P41A17,
      P41A18: allVariables.P41A18,
      P41A19: allVariables.P41A19,
      P43A1: allVariables.P43A1, // SevgiWli Dinçer
    };


  } else if (usageGate.length === 4) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);
    allVariables.P33A3 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_3",);
    allVariables.P33A4 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_4",);
    allVariables.P33A5 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_5",);
    allVariables.P33A6 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_6",);
    allVariables.P33A7 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_7",);
    allVariables.P33A8 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_8",);
    
    allVariables.P36A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P36A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P36A3 = "İki Temel Unsur:";
    allVariables.P36A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P36A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");
    
    allVariables.P37A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P37A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P37A3 = "Adımlar:";
    allVariables.P37A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P37A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P37A6 = decision_strategy(decision_strategyData, 25, "image");
    
    allVariables.P38A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P38A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P38A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P38A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");
    
    allVariables.P39A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P39A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P39A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P39A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P39A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P39A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");
    
    allVariables.P40A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P40A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P40A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P40A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P40A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P40A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");
    
    allVariables.P41A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P41A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P41A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P41A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P41A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P41A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");    

    allVariables.P42A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P42A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P42A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P42A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P42A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P42A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P42A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P42A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P42A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P42A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P42A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P42A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P42A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P42A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P42A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P42A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P42A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P42A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P42A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P44A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,

      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,

      P36A1: allVariables.P36A1, // Senin Karar Verme Stratejin
      P36A2: allVariables.P36A2,
      P36A3: allVariables.P36A3,
      P36A4: allVariables.P36A4,
      P36A5: allVariables.P36A5,
      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,
      P37A3: allVariables.P37A3,
      P37A4: allVariables.P37A4,
      P37A5: allVariables.P37A5,
      P37A6: allVariables.P37A6,
      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4,
      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4,
      P39A5: allVariables.P39A5,
      P39A6: allVariables.P39A6,
      P40A1: allVariables.P40A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4, // Güncel İşler
      P40A5: allVariables.P40A5,
      P40A6: allVariables.P40A6,
      P41A1: allVariables.P41A1,
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4, // Geleceğin İşleri
      P41A5: allVariables.P41A5,
      P41A6: allVariables.P41A6,
      P42A1: allVariables.P42A1, // Sana En uygun kariyer seçenekleri
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4,
      P42A5: allVariables.P42A5,
      P42A6: allVariables.P42A6,
      P42A7: allVariables.P42A7,
      P42A8: allVariables.P42A8,
      P42A9: allVariables.P42A9,
      P42A10: allVariables.P42A10,
      P42A11: allVariables.P42A11,
      P42A12: allVariables.P42A12,
      P42A13: allVariables.P42A13,
      P42A14: allVariables.P42A14,
      P42A15: allVariables.P42A15,
      P42A16: allVariables.P42A16,
      P42A17: allVariables.P42A17,
      P42A18: allVariables.P42A18,
      P42A19: allVariables.P42A19,
      P44A1: allVariables.P44A1, // SevgiWli Dinçer
    };
  } else if (usageGate.length === 5) {

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 

    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);;

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);
    
    allVariables.P37A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P37A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P37A3 = "İki Temel Unsur:";
    allVariables.P37A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P37A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P38A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P38A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P38A3 = "Adımlar:";
    allVariables.P38A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P38A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P38A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P39A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P39A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P39A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P39A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P40A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P40A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P40A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P40A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P40A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P40A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P41A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P41A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P41A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P41A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P41A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P41A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P42A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P42A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P42A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P42A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P42A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P42A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P43A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P43A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P43A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P43A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P43A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P43A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P43A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P43A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P43A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P43A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P43A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P43A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P43A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P43A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P43A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P43A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P43A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P43A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P43A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P45A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,

      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,

      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,

      P37A1: allVariables.P37A1, // Senin Karar Verme Stratejin
      P37A2: allVariables.P37A2,
      P37A3: allVariables.P37A3,
      P37A4: allVariables.P37A4,
      P37A5: allVariables.P37A5,
      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4,
      P38A5: allVariables.P38A5,
      P38A6: allVariables.P38A6,
      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4,
      P40A1: allVariables.P40A1,
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4,
      P40A5: allVariables.P40A5,
      P40A6: allVariables.P40A6,
      P41A1: allVariables.P41A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4, // Güncel İşler
      P41A5: allVariables.P41A5,
      P41A6: allVariables.P41A6,
      P42A1: allVariables.P41A1,
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4, // Geleceğin İşleri
      P42A5: allVariables.P42A5,
      P42A6: allVariables.P42A6,
      P43A1: allVariables.P43A1, // Sana En uygun kariyer seçenekleri
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4,
      P43A5: allVariables.P43A5,
      P43A6: allVariables.P43A6,
      P43A7: allVariables.P43A7,
      P43A8: allVariables.P43A8,
      P43A9: allVariables.P43A9,
      P43A10: allVariables.P43A10,
      P43A11: allVariables.P43A11,
      P43A12: allVariables.P43A12,
      P43A13: allVariables.P43A13,
      P43A14: allVariables.P43A14,
      P43A15: allVariables.P43A15,
      P43A16: allVariables.P43A16,
      P43A17: allVariables.P43A17,
      P43A18: allVariables.P43A18,
      P43A19: allVariables.P43A19,
      P45A1: allVariables.P45A1, // SevgiWli Dinçer
    };

  } else if (usageGate.length === 6) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P38A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P38A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P38A3 = "İki Temel Unsur:";
    allVariables.P38A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P38A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P39A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P39A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P39A3 = "Adımlar:";
    allVariables.P39A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P39A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P39A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P40A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P40A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P40A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P40A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P41A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P41A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P41A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P41A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P41A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P41A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P42A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P42A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P42A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P42A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P42A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P42A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P43A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P43A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P43A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P43A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P43A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P43A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P44A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P44A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P44A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P44A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P44A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P44A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P44A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P44A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P44A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P44A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P44A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P44A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P44A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P44A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P44A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P44A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P44A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P44A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P44A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P46A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,

      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,

      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,

      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,

      P38A1: allVariables.P38A1, // Senin Karar Verme Stratejin
      P38A2: allVariables.P38A2,
      P38A3: allVariables.P38A3,
      P38A4: allVariables.P38A4,
      P38A5: allVariables.P38A5,
      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,
      P39A3: allVariables.P39A3,
      P39A4: allVariables.P39A4,
      P39A5: allVariables.P39A5,
      P39A6: allVariables.P39A6,
      P40A1: allVariables.P40A1,
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4,
      P41A1: allVariables.P41A1,
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4,
      P41A5: allVariables.P41A5,
      P41A6: allVariables.P41A6,
      P42A1: allVariables.P42A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4, // Güncel İşler
      P42A5: allVariables.P42A5,
      P42A6: allVariables.P42A6,
      P43A1: allVariables.P43A1,
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4, // Geleceğin İşleri
      P43A5: allVariables.P43A5,
      P43A6: allVariables.P43A6,
      P44A1: allVariables.P44A1, // Sana En uygun kariyer seçenekleri
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4,
      P44A5: allVariables.P44A5,
      P44A6: allVariables.P44A6,
      P44A7: allVariables.P44A7,
      P44A8: allVariables.P44A8,
      P44A9: allVariables.P44A9,
      P44A10: allVariables.P44A10,
      P44A11: allVariables.P44A11,
      P44A12: allVariables.P44A12,
      P44A13: allVariables.P44A13,
      P44A14: allVariables.P44A14,
      P44A15: allVariables.P44A15,
      P44A16: allVariables.P44A16,
      P44A17: allVariables.P44A17,
      P44A18: allVariables.P44A18,
      P44A19: allVariables.P44A19,
      P46A1: allVariables.P46A1, // SevgiWli Dinçer
    };
  } else if (usageGate.length === 7) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P39A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P39A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P39A3 = "İki Temel Unsur:";
    allVariables.P39A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P39A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P40A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P40A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P40A3 = "Adımlar:";
    allVariables.P40A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P40A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P40A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P41A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P41A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P41A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P41A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P42A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P42A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P42A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P42A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P42A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P42A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P43A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P43A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P43A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P43A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P43A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P43A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P44A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P44A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P44A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P44A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P44A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P44A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P45A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P45A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P45A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P45A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P45A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P45A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P45A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P45A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P45A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P45A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P45A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P45A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P45A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P45A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P45A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P45A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P45A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P45A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P45A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");    

    allVariables.P47A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1]+","; // Sevgili Dinçer

    var inputs_25_plus = {

     ...inputModel,

     P30A1: allVariables.P30A1, // Güçlü yanların
     P30A2: allVariables.P30A2, 

     P31A1: allVariables.P31A1,
     P31A2: allVariables.P31A2,

     P32A1: allVariables.P32A1,
     P32A2: allVariables.P32A2,

     P33A1: allVariables.P33A1,
     P33A2: allVariables.P33A2,

     P34A1: allVariables.P34A1,
     P34A2: allVariables.P34A2,

     P35A1: allVariables.P35A1,
     P35A2: allVariables.P35A2,

     P36A1: allVariables.P36A1,
     P36A2: allVariables.P36A2,

     P39A1: allVariables.P39A1, // Senin Karar Verme Stratejin
     P39A2: allVariables.P39A2,
     P39A3: allVariables.P39A3,
     P39A4: allVariables.P39A4,
     P39A5: allVariables.P39A5,
     P40A1: allVariables.P40A1,
     P40A2: allVariables.P40A2,
     P40A3: allVariables.P40A3,
     P40A4: allVariables.P40A4,
     P40A5: allVariables.P40A5,
     P40A6: allVariables.P40A6,
     P41A1: allVariables.P41A1,
     P41A2: allVariables.P41A2,
     P41A3: allVariables.P41A3,
     P41A4: allVariables.P41A4,
     P42A1: allVariables.P42A1,
     P42A2: allVariables.P42A2,
     P42A3: allVariables.P42A3,
     P42A4: allVariables.P42A4,
     P42A5: allVariables.P42A5,
     P42A6: allVariables.P42A6,
     P43A1: allVariables.P43A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
     P43A2: allVariables.P43A2,
     P43A3: allVariables.P43A3,
     P43A4: allVariables.P43A4, // Güncel İşler
     P43A5: allVariables.P43A5,
     P43A6: allVariables.P43A6,
     P44A1: allVariables.P44A1,
     P44A2: allVariables.P44A2,
     P44A3: allVariables.P44A3,
     P44A4: allVariables.P44A4, // Geleceğin İşleri
     P44A5: allVariables.P44A5,
     P44A6: allVariables.P44A6,
     P45A1: allVariables.P45A1, // Sana En uygun kariyer seçenekleri
     P45A2: allVariables.P45A2,
     P45A3: allVariables.P45A3,
     P45A4: allVariables.P45A4,
     P45A5: allVariables.P45A5,
     P45A6: allVariables.P45A6,
     P45A7: allVariables.P45A7,
     P45A8: allVariables.P45A8,
     P45A9: allVariables.P45A9,
     P45A10: allVariables.P45A10,
     P45A11: allVariables.P45A11,
     P45A12: allVariables.P45A12,
     P45A13: allVariables.P45A13,
     P45A14: allVariables.P45A14,
     P45A15: allVariables.P45A15,
     P45A16: allVariables.P45A16,
     P45A17: allVariables.P45A17,
     P45A18: allVariables.P45A18,
     P45A19: allVariables.P45A19,
     P47A1: allVariables.P47A1, // SevgiWli Dinçer
    };


  } else if (usageGate.length === 8) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 

    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P37A1 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_1",);
    allVariables.P37A2 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_2",);

    allVariables.P40A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P40A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P40A3 = "İki Temel Unsur:";
    allVariables.P40A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P40A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");
    
    allVariables.P41A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P41A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P41A3 = "Adımlar:";
    allVariables.P41A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P41A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P41A6 = decision_strategy(decision_strategyData, 25, "image");
    
    allVariables.P42A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P42A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P42A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P42A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");
    
    allVariables.P43A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P43A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P43A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P43A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P43A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P43A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");
    
    allVariables.P44A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P44A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P44A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P44A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P44A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P44A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");
    
    allVariables.P45A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P45A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P45A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P45A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P45A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P45A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");    

    allVariables.P46A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P46A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P46A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P46A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P46A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P46A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P46A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P46A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P46A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P46A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P46A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P46A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P46A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P46A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P46A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P46A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P46A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P46A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P46A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P48A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,

      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,
 
      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,
 
      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,
 
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,

      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,

      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,

      P40A1: allVariables.P40A1, // Senin Karar Verme Stratejin
      P40A2: allVariables.P40A2,
      P40A3: allVariables.P40A3,
      P40A4: allVariables.P40A4,
      P40A5: allVariables.P40A5,
      P41A1: allVariables.P41A1,
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4,
      P41A5: allVariables.P41A5,
      P41A6: allVariables.P41A6,
      P42A1: allVariables.P42A1,
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4,
      P43A1: allVariables.P43A1,
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4,
      P43A5: allVariables.P43A5,
      P43A6: allVariables.P43A6,
      P44A1: allVariables.P44A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4, // Güncel İşler
      P44A5: allVariables.P44A5,
      P44A6: allVariables.P44A6,
      P45A1: allVariables.P45A1,
      P45A2: allVariables.P45A2,
      P45A3: allVariables.P45A3,
      P45A4: allVariables.P45A4, // Geleceğin İşleri
      P45A5: allVariables.P45A5,
      P45A6: allVariables.P45A6,
      P46A1: allVariables.P46A1, // Sana En uygun kariyer seçenekleri
      P46A2: allVariables.P46A2,
      P46A3: allVariables.P46A3,
      P46A4: allVariables.P46A4,
      P46A5: allVariables.P46A5,
      P46A6: allVariables.P46A6,
      P46A7: allVariables.P46A7,
      P46A8: allVariables.P46A8,
      P46A9: allVariables.P46A9,
      P46A10: allVariables.P46A10,
      P46A11: allVariables.P46A11,
      P46A12: allVariables.P46A12,
      P46A13: allVariables.P46A13,
      P46A14: allVariables.P46A14,
      P46A15: allVariables.P46A15,
      P46A16: allVariables.P46A16,
      P46A17: allVariables.P46A17,
      P46A18: allVariables.P46A18,
      P46A19: allVariables.P46A19,
      P48A1: allVariables.P48A1, // SevgiWli Dinçer
    };


  } else if (usageGate.length === 9) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 

    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P37A1 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_1",);
    allVariables.P37A2 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_2",);
  
    allVariables.P38A1 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_1",);
    allVariables.P38A2 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_2",);
    
    allVariables.P41A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P41A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P41A3 = "İki Temel Unsur:";
    allVariables.P41A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P41A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P42A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P42A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P42A3 = "Adımlar:";
    allVariables.P42A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P42A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P42A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P43A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P43A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P43A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P43A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P44A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P44A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P44A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P44A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P44A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P44A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P45A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P45A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P45A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P45A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P45A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P45A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P46A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P46A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P46A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P46A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P46A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P46A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P47A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P47A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P47A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P47A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P47A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P47A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P47A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P47A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P47A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P47A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P47A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P47A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P47A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P47A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P47A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P47A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P47A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P47A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P47A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P49A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 
 
      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,
 
      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,
 
      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,
 
      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,
 
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
 
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,

      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,

      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,

      P41A1: allVariables.P41A1, // Senin Karar Verme Stratejin
      P41A2: allVariables.P41A2,
      P41A3: allVariables.P41A3,
      P41A4: allVariables.P41A4,
      P41A5: allVariables.P41A5,
      P42A1: allVariables.P42A1,
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4,
      P42A5: allVariables.P42A5,
      P42A6: allVariables.P42A6,
      P43A1: allVariables.P43A1,
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4,
      P44A1: allVariables.P44A1,
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4,
      P44A5: allVariables.P44A5,
      P44A6: allVariables.P44A6,
      P45A1: allVariables.P45A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P45A2: allVariables.P45A2,
      P45A3: allVariables.P45A3,
      P45A4: allVariables.P45A4, // Güncel İşler
      P45A5: allVariables.P45A5,
      P45A6: allVariables.P45A6,
      P46A1: allVariables.P46A1,
      P46A2: allVariables.P46A2,
      P46A3: allVariables.P46A3,
      P46A4: allVariables.P46A4, // Geleceğin İşleri
      P46A5: allVariables.P46A5,
      P46A6: allVariables.P46A6,
      P47A1: allVariables.P47A1, // Sana En uygun kariyer seçenekleri
      P47A2: allVariables.P47A2,
      P47A3: allVariables.P47A3,
      P47A4: allVariables.P47A4,
      P47A5: allVariables.P47A5,
      P47A6: allVariables.P47A6,
      P47A7: allVariables.P47A7,
      P47A8: allVariables.P47A8,
      P47A9: allVariables.P47A9,
      P47A10: allVariables.P47A10,
      P47A11: allVariables.P47A11,
      P47A12: allVariables.P47A12,
      P47A13: allVariables.P47A13,
      P47A14: allVariables.P47A14,
      P47A15: allVariables.P47A15,
      P47A16: allVariables.P47A16,
      P47A17: allVariables.P47A17,
      P47A18: allVariables.P47A18,
      P47A19: allVariables.P47A19,
      P49A1: allVariables.P49A1, // SevgiWli Dinçer
    };
  } else if (usageGate.length === 10) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 

    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P37A1 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_1",);
    allVariables.P37A2 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_2",);

    allVariables.P38A1 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_1",);
    allVariables.P38A2 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_2",);

    allVariables.P39A1 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_1",);
    allVariables.P39A2 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_2",);

    allVariables.P42A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P42A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P42A3 = "İki Temel Unsur:";
    allVariables.P42A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P42A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P43A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P43A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P43A3 = "Adımlar:";
    allVariables.P43A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P43A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P43A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P44A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P44A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P44A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P44A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P45A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P45A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P45A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P45A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P45A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P45A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P46A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P46A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P46A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P46A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P46A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P46A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P47A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P47A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P47A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P47A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P47A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P47A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P48A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P48A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P48A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P48A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P48A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P48A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P48A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P48A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P48A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P48A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P48A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P48A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P48A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P48A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P48A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P48A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P48A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P48A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P48A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P50A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 

      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,
 
      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,
 
      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,
 
      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,
 
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
 
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,

      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,

      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,

      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,

      P42A1: allVariables.P42A1, // Senin Karar Verme Stratejin
      P42A2: allVariables.P42A2,
      P42A3: allVariables.P42A3,
      P42A4: allVariables.P42A4,
      P42A5: allVariables.P42A5,
      P43A1: allVariables.P43A1,
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4,
      P43A5: allVariables.P43A5,
      P43A6: allVariables.P43A6,
      P44A1: allVariables.P44A1,
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4,
      P45A1: allVariables.P45A1,
      P45A2: allVariables.P45A2,
      P45A3: allVariables.P45A3,
      P45A4: allVariables.P45A4,
      P45A5: allVariables.P45A5,
      P45A6: allVariables.P45A6,
      P46A1: allVariables.P46A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P46A2: allVariables.P46A2,
      P46A3: allVariables.P46A3,
      P46A4: allVariables.P46A4, // Güncel İşler
      P46A5: allVariables.P46A5,
      P46A6: allVariables.P46A6,
      P47A1: allVariables.P47A1,
      P47A2: allVariables.P47A2,
      P47A3: allVariables.P47A3,
      P47A4: allVariables.P47A4, // Geleceğin İşleri
      P47A5: allVariables.P47A5,
      P47A6: allVariables.P47A6,
      P48A1: allVariables.P48A1, // Sana En uygun kariyer seçenekleri
      P48A2: allVariables.P48A2,
      P48A3: allVariables.P48A3,
      P48A4: allVariables.P48A4,
      P48A5: allVariables.P48A5,
      P48A6: allVariables.P48A6,
      P48A7: allVariables.P48A7,
      P48A8: allVariables.P48A8,
      P48A9: allVariables.P48A9,
      P48A10: allVariables.P48A10,
      P48A11: allVariables.P48A11,
      P48A12: allVariables.P48A12,
      P48A13: allVariables.P48A13,
      P48A14: allVariables.P48A14,
      P48A15: allVariables.P48A15,
      P48A16: allVariables.P48A16,
      P48A17: allVariables.P48A17,
      P48A18: allVariables.P48A18,
      P48A19: allVariables.P48A19,
      P50A1: allVariables.P50A1, // SevgiWli Dinçer
    };


  } else if (usageGate.length === 11) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 
    
    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P37A1 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_1",);
    allVariables.P37A2 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_2",);

    allVariables.P38A1 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_1",);
    allVariables.P38A2 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_2",);

    allVariables.P39A1 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_1",);
    allVariables.P39A2 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_2",);

    allVariables.P40A1 = guclu_yanlarin(guclu_yanlarinData[10], 25, guclu_yanlarinData[10].name + "_1",);
    allVariables.P40A2 = guclu_yanlarin(guclu_yanlarinData[10], 25, guclu_yanlarinData[10].name + "_2",);

    allVariables.P43A1 = decision_strategy(decision_strategyData, 25, "name"); // Senin Karar Verme Stratejin
    allVariables.P43A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P43A3 = "İki Temel Unsur:";
    allVariables.P43A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P43A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P44A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P44A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P44A3 = "Adımlar:";
    allVariables.P44A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P44A8 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P44A9 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P45A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P45A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P45A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P45A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P46A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P46A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P46A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P46A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P46A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P46A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P47A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P47A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P47A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P47A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P47A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P47A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P48A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P48A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P48A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P48A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P48A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P48A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P49A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P49A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P49A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P49A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P49A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P49A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P49A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P49A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P49A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P49A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P49A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P49A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P49A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P49A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P49A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P49A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P49A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P49A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P49A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P51A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 
 
      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,
 
      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,
 
      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,
 
      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,
 
      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
 
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,

      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,

      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,

      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,

      P40A1: allVariables.P40A1,
      P40A2: allVariables.P40A2,

      P43A1: allVariables.P43A1, // Senin Karar Verme Stratejin
      P43A2: allVariables.P43A2,
      P43A3: allVariables.P43A3,
      P43A4: allVariables.P43A4,
      P43A5: allVariables.P43A5,
      P44A1: allVariables.P44A1,
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4,
      P44A5: allVariables.P44A5,
      P44A6: allVariables.P44A6,
      P45A1: allVariables.P45A1,
      P45A2: allVariables.P45A2,
      P45A3: allVariables.P45A3,
      P45A4: allVariables.P45A4,
      P46A1: allVariables.P46A1,
      P46A2: allVariables.P46A2,
      P46A3: allVariables.P46A3,
      P46A4: allVariables.P46A4,
      P46A5: allVariables.P46A5,
      P46A6: allVariables.P46A6,
      P47A1: allVariables.P47A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P47A2: allVariables.P47A2,
      P47A3: allVariables.P47A3,
      P47A4: allVariables.P47A4, // Güncel İşler
      P47A5: allVariables.P47A5,
      P47A6: allVariables.P47A6,
      P48A1: allVariables.P48A1,
      P48A2: allVariables.P48A2,
      P48A3: allVariables.P48A3,
      P48A4: allVariables.P48A4, // Geleceğin İşleri
      P48A5: allVariables.P48A5,
      P48A6: allVariables.P48A6,
      P49A1: allVariables.P49A1, // Sana En uygun kariyer seçenekleri
      P49A2: allVariables.P49A2,
      P49A3: allVariables.P49A3,
      P49A4: allVariables.P49A4,
      P49A5: allVariables.P49A5,
      P49A6: allVariables.P49A6,
      P49A7: allVariables.P49A7,
      P49A8: allVariables.P49A8,
      P49A9: allVariables.P49A9,
      P49A10: allVariables.P49A10,
      P49A11: allVariables.P49A11,
      P49A12: allVariables.P49A12,
      P49A13: allVariables.P49A13,
      P49A14: allVariables.P49A14,
      P49A15: allVariables.P49A15,
      P49A16: allVariables.P49A16,
      P49A17: allVariables.P49A17,
      P49A18: allVariables.P49A18,
      P49A19: allVariables.P49A19,
      P51A1: allVariables.P51A1, // SevgiWli Dinçer
    };



  } else if (usageGate.length === 12) {

    allVariables,

    allVariables.P30A1 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_1",); 
    allVariables.P30A2 = guclu_yanlarin(guclu_yanlarinData[0], 25, guclu_yanlarinData[0].name + "_2",); 

    allVariables.P31A1 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_1",);
    allVariables.P31A2 = guclu_yanlarin(guclu_yanlarinData[1], 25, guclu_yanlarinData[1].name + "_2",);

    allVariables.P32A1 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_1",);
    allVariables.P32A2 = guclu_yanlarin(guclu_yanlarinData[2], 25, guclu_yanlarinData[2].name + "_2",);

    allVariables.P33A1 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_1",);
    allVariables.P33A2 = guclu_yanlarin(guclu_yanlarinData[3], 25, guclu_yanlarinData[3].name + "_2",);

    allVariables.P34A1 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_1",);
    allVariables.P34A2 = guclu_yanlarin(guclu_yanlarinData[4], 25, guclu_yanlarinData[4].name + "_2",);

    allVariables.P35A1 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_1",);
    allVariables.P35A2 = guclu_yanlarin(guclu_yanlarinData[5], 25, guclu_yanlarinData[5].name + "_2",);

    allVariables.P36A1 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_1",);
    allVariables.P36A2 = guclu_yanlarin(guclu_yanlarinData[6], 25, guclu_yanlarinData[6].name + "_2",);

    allVariables.P37A1 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_1",);
    allVariables.P37A2 = guclu_yanlarin(guclu_yanlarinData[7], 25, guclu_yanlarinData[7].name + "_2",);

    allVariables.P38A1 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_1",);
    allVariables.P38A2 = guclu_yanlarin(guclu_yanlarinData[8], 25, guclu_yanlarinData[8].name + "_2",);

    allVariables.P39A1 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_1",);
    allVariables.P39A2 = guclu_yanlarin(guclu_yanlarinData[9], 25, guclu_yanlarinData[9].name + "_2",);

    allVariables.P40A1 = guclu_yanlarin(guclu_yanlarinData[10], 25, guclu_yanlarinData[10].name + "_1",);
    allVariables.P40A2 = guclu_yanlarin(guclu_yanlarinData[10], 25, guclu_yanlarinData[10].name + "_2",);

    allVariables.P41A1 = guclu_yanlarin(guclu_yanlarinData[11], 25, guclu_yanlarinData[11].name + "_1",);
    allVariables.P41A2 = guclu_yanlarin(guclu_yanlarinData[11], 25, guclu_yanlarinData[11].name + "_2",);

    allVariables.P44A2 = decision_strategy(decision_strategyData, 25, "s3_x_2");
    allVariables.P44A3 = "İki Temel Unsur:";
    allVariables.P44A4 = decision_strategy(decision_strategyData, 25, "s3_x_4");
    allVariables.P44A5 = decision_strategy(decision_strategyData, 25, "s3_x_5");

    allVariables.P45A1 = decision_strategy(decision_strategyData, 25, "s4_x_title");
    allVariables.P45A2 = decision_strategy(decision_strategyData, 25, "s4_x_text");
    allVariables.P45A3 = "Adımlar:";
    allVariables.P45A4 = decision_strategy(decision_strategyData, 25, "s4_x_1");
    allVariables.P45A5 = decision_strategy(decision_strategyData, 25, "s4_x_txt");
    allVariables.P45A6 = decision_strategy(decision_strategyData, 25, "image");

    allVariables.P46A1 = "image"; // Sana uygun kariyer dağılımların
    allVariables.P46A2 = "1." + kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P46A3 = "2." + kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P46A4 = "3." + kariyer_secim(careerSelectionLastResult[2], 25, "name");

    allVariables.P47A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P47A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s2_x_2");
    allVariables.P47A3 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P47A4 = kariyer_secim(careerSelectionLastResult[1], 25, "s2_x_2");
    allVariables.P47A5 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P47A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s2_x_2");

    allVariables.P48A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name"); // Sana En uygun kariyer Seçenekleri Genel Sektörler
    allVariables.P48A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P48A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P48A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s3_x_1"); // Güncel İşler
    allVariables.P48A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s3_x_1");
    allVariables.P48A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s3_x_1");

    allVariables.P49A1 = kariyer_secim(careerSelectionLastResult[0], 25, "name");
    allVariables.P49A2 = kariyer_secim(careerSelectionLastResult[1], 25, "name");
    allVariables.P49A3 = kariyer_secim(careerSelectionLastResult[2], 25, "name");
    allVariables.P49A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s4_x_1"); // Geleceğin İşleri
    allVariables.P49A5 = kariyer_secim(careerSelectionLastResult[1], 25, "s4_x_1");
    allVariables.P49A6 = kariyer_secim(careerSelectionLastResult[2], 25, "s4_x_1");

    allVariables.P50A1 = kariyer_secim(decision_strategyData.sectorName, 25, "sector"); // Sana En uygun kariyer seçenekleri
    allVariables.P50A2 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P50A3 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P50A4 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P50A5 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P50A6 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P50A7 = kariyer_secim(careerSelectionLastResult[0], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P50A8 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P50A9 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P50A10 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P50A11 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P50A12 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P50A13 = kariyer_secim(careerSelectionLastResult[1], 25, "s7_" + decision_strategyData.sectorName + "_x_7");
    allVariables.P50A14 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_1");
    allVariables.P50A15 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_3");
    allVariables.P50A16 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_4");
    allVariables.P50A17 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_5");
    allVariables.P50A18 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_6");
    allVariables.P50A19 = kariyer_secim(careerSelectionLastResult[2], 25, "s7_" + decision_strategyData.sectorName + "_x_7");

    allVariables.P52A1 = "Sevgili " + Object.entries(rawData).find((x) => x[0] == "kisiselbilgi / isim")[1] + ","; // Sevgili Dinçer

    var inputs_25_plus = {

      ...inputModel,

      P30A1: allVariables.P30A1, // Güçlü yanların
      P30A2: allVariables.P30A2, 
 
      P31A1: allVariables.P31A1,
      P31A2: allVariables.P31A2,
 
      P32A1: allVariables.P32A1,
      P32A2: allVariables.P32A2,
 
      P33A1: allVariables.P33A1,
      P33A2: allVariables.P33A2,

      P34A1: allVariables.P34A1,
      P34A2: allVariables.P34A2,

      P35A1: allVariables.P35A1,
      P35A2: allVariables.P35A2,
 
      P36A1: allVariables.P36A1,
      P36A2: allVariables.P36A2,

      P37A1: allVariables.P37A1,
      P37A2: allVariables.P37A2,

      P38A1: allVariables.P38A1,
      P38A2: allVariables.P38A2,

      P39A1: allVariables.P39A1,
      P39A2: allVariables.P39A2,

      P40A1: allVariables.P40A1,
      P40A2: allVariables.P40A2,

      P41A1: allVariables.P41A1,
      P41A2: allVariables.P41A2,

      P44A1: allVariables.P44A1, // Senin Karar Verme Stratejin
      P44A2: allVariables.P44A2,
      P44A3: allVariables.P44A3,
      P44A4: allVariables.P44A4,
      P44A5: allVariables.P44A5,
      P45A1: allVariables.P45A1,
      P45A2: allVariables.P45A2,
      P45A3: allVariables.P45A3,
      P45A4: allVariables.P45A4,
      P45A5: allVariables.P45A5,
      P45A6: allVariables.P45A6,
      P46A1: allVariables.P46A1,
      P46A2: allVariables.P46A2,
      P46A3: allVariables.P46A3,
      P46A4: allVariables.P46A4,
      P47A1: allVariables.P47A1,
      P47A2: allVariables.P47A2,
      P47A3: allVariables.P47A3,
      P47A4: allVariables.P47A4,
      P47A5: allVariables.P47A5,
      P47A6: allVariables.P47A6,
      P48A1: allVariables.P48A1, // Sana En uygun kariyer Seçenekleri Genel Sektörler
      P48A2: allVariables.P48A2,
      P48A3: allVariables.P48A3,
      P48A4: allVariables.P48A4, // Güncel İşler
      P48A5: allVariables.P48A5,
      P48A6: allVariables.P48A6,
      P49A1: allVariables.P49A1,
      P49A2: allVariables.P49A2,
      P49A3: allVariables.P49A3,
      P49A4: allVariables.P49A4, // Geleceğin İşleri
      P49A5: allVariables.P49A5,
      P49A6: allVariables.P49A6,
      P50A1: allVariables.P50A1, // Sana En uygun kariyer seçenekleri
      P50A2: allVariables.P50A2,
      P50A3: allVariables.P50A3,
      P50A4: allVariables.P50A4,
      P50A5: allVariables.P50A5,
      P50A6: allVariables.P50A6,
      P50A7: allVariables.P50A7,
      P50A8: allVariables.P50A8,
      P50A9: allVariables.P50A9,
      P50A10: allVariables.P50A10,
      P50A11: allVariables.P50A11,
      P50A12: allVariables.P50A12,
      P50A13: allVariables.P50A13,
      P50A14: allVariables.P50A14,
      P50A15: allVariables.P50A15,
      P50A16: allVariables.P50A16,
      P50A17: allVariables.P50A17,
      P50A18: allVariables.P50A18,
      P50A19: allVariables.P50A19,
      P52A1: allVariables.P52A1, // SevgiWli Dinçer
    };
  } 

  inputs_25_plus.usageGate = usageGate.length;

  const jsonString = JSON.stringify(inputs_25_plus)

  return inputs_25_plus;
};