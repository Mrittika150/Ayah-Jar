

const fetch = require('node-fetch');

class QuranService {
  constructor() {
    this.baseURL = 'https://api.alquran.cloud/v1';
    this.audioBaseURL = 'https://everyayah.com/data';
    
    
    this.emotionVerses = {
      sad: [
        '2:286', '94:5', '94:6', '3:139', '13:28', '39:53', '2:153', '9:51',
        '93:4', '93:5', '29:2', '2:155', '2:156', '3:173', '8:46', '41:30',
        '21:83', '21:87', '38:41', '7:23', '7:56', '25:58', '11:88', '4:110',
        '25:63', '28:16', '28:24', '40:7', '71:10', '71:11', '71:12',
        '66:8', '25:74', '21:89', '21:90', '3:8', '3:147', '60:4'
      ],
      anxious: [
        '13:28', '2:286', '65:3', '94:5', '2:153', '3:160', '8:46', '11:56',
        '33:3', '64:13', '67:2', '3:173', '9:51', '39:36', '2:155',
        '33:39', '58:10', '16:99', '16:100', '23:97', '23:98', '7:200', '41:36',
        '3:120', '4:81', '10:65', '13:11', '14:11', '14:12', '20:46',
       '25:31', '39:62', '41:34', '41:35', '46:13', '55:27', '72:17'
      ],
      happy: [
        '16:18', '14:7', '55:13', '2:152', '93:11', '16:97', '39:10',
        '28:77', '41:34', '7:32', '16:96', '29:69', '65:2', '65:3',
        '3:133', '57:21', '39:73', '13:29', '10:58', '35:34', '35:35', '76:11',
        '2:269', '3:104', '4:13', '5:16', '9:21', '11:108', '15:46',
        '15:47', '25:75', '25:76', '32:17', '36:55', '36:56', '43:70', '43:71'
      ],
      grateful: [
        '14:7', '2:152', '16:18', '27:40', '31:12', '35:3', '3:123',
        '76:3', '16:114', '54:35', '7:10', '28:73', '39:7', '2:172',
        '34:13', '7:58', '17:3', '46:15', '54:10', '27:19', '3:144', '39:66',
        '7:144', '29:17', '36:35', '39:74', '42:23', '52:29', '56:70',
        '56:82', '67:23', '74:3', '93:3', '106:3', '106:4'

      ],
      stressed: [
        '2:286', '94:5', '94:6', '13:28', '2:153', '65:2', '65:3', '39:53',
        '29:2', '29:3', '2:155', '3:139', '8:46', '11:56', '33:3',
        '39:10', '16:127', '20:130', '73:10', '50:39', '15:97', '15:98', '3:200',
        '4:28', '7:188', '21:112', '25:59', '28:68', '33:48', '40:44',
        '49:13', '58:7', '76:24', '76:25', '87:16', '87:17'
      ],
      hopeful: [
        '94:5', '94:6', '3:139', '12:87', '39:53', '2:186', '40:60',
        '3:160', '8:46', '29:69', '65:2', '65:3', '11:115', '23:115',
        '3:174', '11:90', '42:28', '30:60', '4:146', '7:143', '39:9', '18:58',
        '2:214', '3:146', '10:107', '11:6', '15:56', '24:22', '29:5',
        '33:47', '35:2', '39:38', '64:11', '70:5', '103:3'
      ]
    };

    
    this.offlineVerses = {
      '2:286': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 286,
        arabicText: 'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا ٱكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَآ إِن نَّسِينَآ أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَآ إِصْرًا كَمَا حَمَلْتَهُۥ عَلَى ٱلَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِۦ ۖ وَٱعْفُ عَنَّا وَٱغْفِرْ لَنَا وَٱرْحَمْنَآ ۚ أَنتَ مَوْلَىٰنَا فَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ',
        translation: 'Allah does not burden a soul beyond that it can bear. It will have the reward it earned, and it will suffer the consequence it deserves. Our Lord, do not impose blame upon us if we forget or make a mistake. Our Lord, do not lay upon us a burden like that which You laid upon those before us. Our Lord, do not burden us with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.',
        reference: 'Al-Baqarah 2:286'
      },
      '94:5': {
        surah: 94, surahName: 'Ash-Sharh', surahNameArabic: 'الشرح', ayah: 5,
        arabicText: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
        translation: 'For indeed, with hardship will be ease.',
        reference: 'Ash-Sharh 94:5'
      },
      '94:6': {
        surah: 94, surahName: 'Ash-Sharh', surahNameArabic: 'الشرح', ayah: 6,
        arabicText: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا',
        translation: 'Indeed, with hardship will be ease.',
        reference: 'Ash-Sharh 94:6'
      },
      '3:139': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 139,
        arabicText: 'وَلَا تَهِنُوا۟ وَلَا تَحْزَنُوا۟ وَأَنتُمُ ٱلْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
        translation: 'So do not weaken and do not grieve, and you will be superior if you are true believers.',
        reference: 'Ali Imran 3:139'
      },
      '13:28': {
        surah: 13, surahName: 'Ar-Rad', surahNameArabic: 'الرعد', ayah: 28,
        arabicText: 'ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ',
        translation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
        reference: 'Ar-Rad 13:28'
      },
      '39:53': {
        surah: 39, surahName: 'Az-Zumar', surahNameArabic: 'الزمر', ayah: 53,
        arabicText: 'قُلْ يَـٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ',
        translation: 'Say, O My servants who have transgressed against themselves by sinning, do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful.',
        reference: 'Az-Zumar 39:53'
      },
      '2:153': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 153,
        arabicText: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ',
        translation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
        reference: 'Al-Baqarah 2:153'
      },
      '9:51': {
        surah: 9, surahName: 'At-Tawbah', surahNameArabic: 'التوبة', ayah: 51,
        arabicText: 'قُل لَّن يُصِيبَنَآ إِلَّا مَا كَتَبَ ٱللَّهُ لَنَا هُوَ مَوْلَىٰنَا ۚ وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ',
        translation: 'Say, "Never will we be struck except by what Allah has decreed for us; He is our protector." And upon Allah let the believers rely.',
        reference: 'At-Tawbah 9:51'
      },
      '93:4': {
        surah: 93, surahName: 'Ad-Duhaa', surahNameArabic: 'الضحى', ayah: 4,
        arabicText: 'وَلَلْـَٔاخِرَةُ خَيْرٌ لَّكَ مِنَ ٱلْأُولَىٰ',
        translation: 'And the Hereafter is better for you than the first life.',
        reference: 'Ad-Duhaa 93:4'
      },
      '93:5': {
        surah: 93, surahName: 'Ad-Duhaa', surahNameArabic: 'الضحى', ayah: 5,
        arabicText: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
        translation: 'And your Lord is going to give you, and you will be satisfied.',
        reference: 'Ad-Duhaa 93:5'
      },
      '14:7': {
        surah: 14, surahName: 'Ibrahim', surahNameArabic: 'ابراهيم', ayah: 7,
        arabicText: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِى لَشَدِيدٌ',
        translation: 'And remember when your Lord proclaimed, "If you are grateful, I will surely increase you in favor; but if you deny, indeed, My punishment is severe."',
        reference: 'Ibrahim 14:7'
      },
      '16:18': {
        surah: 16, surahName: 'An-Nahl', surahNameArabic: 'النحل', ayah: 18,
        arabicText: 'وَإِن تَعُدُّوا۟ نِعْمَةَ ٱللَّهِ لَا تُحْصُوهَآ ۗ إِنَّ ٱللَّهَ لَغَفُورٌ رَّحِيمٌ',
        translation: 'And if you should count the favors of Allah, you could not enumerate them. Indeed, Allah is Forgiving and Merciful.',
        reference: 'An-Nahl 16:18'
      },
      '2:152': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 152,
        arabicText: 'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ وَٱشْكُرُوا۟ لِى وَلَا تَكْفُرُونِ',
        translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        reference: 'Al-Baqarah 2:152'
      },
      '65:3': {
        surah: 65, surahName: 'At-Talaq', surahNameArabic: 'الطلاق', ayah: 3,
        arabicText: 'وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَـٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍ قَدْرًا',
        translation: 'And He provides for him from sources he never imagined. And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a decreed extent.',
        reference: 'At-Talaq 65:3'
      },
      '55:13': {
        surah: 55, surahName: 'Ar-Rahman', surahNameArabic: 'الرحمن', ayah: 13,
        arabicText: 'فَبِأَىِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ',
        translation: 'So which of the favors of your Lord would you deny?',
        reference: 'Ar-Rahman 55:13'
      },
      '93:11': {
        surah: 93, surahName: 'Ad-Duhaa', surahNameArabic: 'الضحى', ayah: 11,
        arabicText: 'وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ',
        translation: 'But as for the favor of your Lord, report it.',
        reference: 'Ad-Duhaa 93:11'
      },
      '27:40': {
        surah: 27, surahName: 'An-Naml', surahNameArabic: 'النمل', ayah: 40,
        arabicText: 'قَالَ ٱلَّذِى عِندَهُۥ عِلْمٌ مِّنَ ٱلْكِتَـٰبِ أَنَا۠ ءَاتِيكَ بِهِۦ قَبْلَ أَن يَرْتَدَّ إِلَيْكَ طَرْفُكَ ۚ فَلَمَّا رَءَاهُ مُسْتَقِرًّا عِندَهُۥ قَالَ هَـٰذَا مِن فَضْلِ رَبِّى لِيَبْلُوَنِىٓ ءَأَشْكُرُ أَمْ أَكْفُرُ ۖ وَمَن شَكَرَ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ رَبِّى غَنِىٌّ كَرِيمٌ',
        translation: 'Said one who had knowledge from the Scripture, "I will bring it to you before your glance returns to you." And when Solomon saw it placed before him, he said, "This is from the favor of my Lord to test me whether I will be grateful or ungrateful. And whoever is grateful - his gratitude is only for the benefit of himself. And whoever is ungrateful - then indeed, my Lord is Free of need and Generous."',
        reference: 'An-Naml 27:40'
      },
      '31:12': {
        surah: 31, surahName: 'Luqman', surahNameArabic: 'لقمان', ayah: 12,
        arabicText: 'وَلَقَدْ ءَاتَيْنَا لُقْمَـٰنَ ٱلْحِكْمَةَ أَنِ ٱشْكُرْ لِلَّهِ ۚ وَمَن يَشْكُرْ فَإِنَّمَا يَشْكُرُ لِنَفْسِهِۦ ۖ وَمَن كَفَرَ فَإِنَّ ٱللَّهَ غَنِىٌّ حَمِيدٌ',
        translation: 'And We had certainly given Luqman wisdom and said, "Be grateful to Allah." And whoever is grateful is grateful for the benefit of himself. And whoever denies His favor - then indeed, Allah is Free of need and Praiseworthy.',
        reference: 'Luqman 31:12'
      },
      '12:87': {
        surah: 12, surahName: 'Yusuf', surahNameArabic: 'يوسف', ayah: 87,
        arabicText: 'يَـٰبَنِىَّ ٱذْهَبُوا۟ فَتَحَسَّسُوا۟ مِن يُوسُفَ وَأَخِيهِ وَلَا تَا۟يْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ ۖ إِنَّهُۥ لَا يَا۟يْـَٔسُ مِن رَّوْحِ ٱللَّهِ إِلَّا ٱلْقَوْمُ ٱلْكَـٰفِرُونَ',
        translation: 'O my sons, go and find out about Joseph and his brother and despair not of relief from Allah. Indeed, no one despairs of relief from Allah except the disbelieving people.',
        reference: 'Yusuf 12:87'
      },
      '2:186': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 186,
        arabicText: 'وَإِذَا سَأَلَكَ عِبَادِى عَنِّى فَإِنِّى قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ ٱلدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا۟ لِى وَلْيُؤْمِنُوا۟ بِى لَعَلَّهُمْ يَرْشُدُونَ',
        translation: 'And when My servants ask you, O Muhammad, concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me by obedience and believe in Me that they may be guided.',
        reference: 'Al-Baqarah 2:186'
      },
      '40:60': {
        surah: 40, surahName: 'Ghafir', surahNameArabic: 'غافر', ayah: 60,
        arabicText: 'وَقَالَ رَبُّكُمُ ٱدْعُونِىٓ أَسْتَجِبْ لَكُمْ ۚ إِنَّ ٱلَّذِينَ يَسْتَكْبِرُونَ عَنْ عِبَادَتِى سَيَدْخُلُونَ جَهَنَّمَ دَاخِرِينَ',
        translation: 'And your Lord says, "Call upon Me; I will respond to you." Indeed, those who disdain My worship will enter Hell rendered contemptible.',
        reference: 'Ghafir 40:60'
      },
      '3:160': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 160,
        arabicText: 'إِن يَنصُرْكُمُ ٱللَّهُ فَلَا غَالِبَ لَكُمْ ۖ وَإِن يَخْذُلْكُمْ فَمَن ذَا ٱلَّذِى يَنصُرُكُم مِّنۢ بَعْدِهِۦ ۗ وَعَلَى ٱللَّهِ فَلْيَتَوَكَّلِ ٱلْمُؤْمِنُونَ',
        translation: 'If Allah should aid you, no one can overcome you; but if He should forsake you, who is there that can aid you after Him? And upon Allah let the believers rely.',
        reference: 'Ali Imran 3:160'
      },
      '16:97': {
        surah: 16, surahName: 'An-Nahl', surahNameArabic: 'النحل', ayah: 97,
        arabicText: 'مَنْ عَمِلَ صَـٰلِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَلَنُحْيِيَنَّهُۥ حَيَوٰةً طَيِّبَةً ۖ وَلَنَجْزِيَنَّهُمْ أَجْرَهُم بِأَحْسَنِ مَا كَانُوا۟ يَعْمَلُونَ',
        translation: 'Whoever does righteousness, whether male or female, while he is a believer - We will surely cause him to live a good life, and We will surely give them their reward in the Hereafter according to the best of what they used to do.',
        reference: 'An-Nahl 16:97'
      },
      '29:2': {
        surah: 29, surahName: 'Al-Ankabut', surahNameArabic: 'العنكبوت', ayah: 2,
        arabicText: 'أَحَسِبَ ٱلنَّاسُ أَن يُتْرَكُوٓا۟ أَن يَقُولُوٓا۟ ءَامَنَّا وَهُمْ لَا يُفْتَنُونَ',
        translation: 'Do the people think that they will be left to say, "We believe" and they will not be tried?',
        reference: 'Al-Ankabut 29:2'
      },
      '2:155': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 155,
        arabicText: 'وَلَنَبْلُوَنَّكُم بِشَىْءٍ مِّنَ ٱلْخَوْفِ وَٱلْجُوعِ وَنَقْصٍ مِّنَ ٱلْأَمْوَٰلِ وَٱلْأَنفُسِ وَٱلثَّمَرَٰتِ ۗ وَبَشِّرِ ٱلصَّـٰبِرِينَ',
        translation: 'And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient.',
        reference: 'Al-Baqarah 2:155'
      },
      '2:156': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 156,
        arabicText: 'ٱلَّذِينَ إِذَآ أَصَـٰبَتْهُم مُّصِيبَةٌ قَالُوٓا۟ إِنَّا لِلَّهِ وَإِنَّآ إِلَيْهِ رَٰجِعُونَ',
        translation: 'Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return."',
        reference: 'Al-Baqarah 2:156'
      },
      '65:2': {
        surah: 65, surahName: 'At-Talaq', surahNameArabic: 'الطلاق', ayah: 2,
        arabicText: 'فَإِذَا بَلَغْنَ أَجَلَهُنَّ فَأَمْسِكُوهُنَّ بِمَعْرُوفٍ أَوْ فَارِقُوهُنَّ بِمَعْرُوفٍ وَأَشْهِدُوا۟ ذَوَىْ عَدْلٍ مِّنكُمْ وَأَقِيمُوا۟ ٱلشَّهَـٰدَةَ لِلَّهِ ۚ ذَٰلِكُمْ يُوعَظُ بِهِۦ مَن كَانَ يُؤْمِنُ بِٱللَّهِ وَٱلْيَوْمِ ٱلْـَٔاخِرِ ۚ وَمَن يَتَّقِ ٱللَّهَ يَجْعَل لَّهُۥ مَخْرَجًا',
        translation: 'And when they have nearly fulfilled their term, either retain them according to acceptable terms or part with them according to acceptable terms. And bring to witness two just men from among you and establish the testimony for the sake of Allah. That is instructed to whoever should believe in Allah and the Last day. And whoever fears Allah - He will make for him a way out.',
        reference: 'At-Talaq 65:2'
      },
      '8:46': {
        surah: 8, surahName: 'Al-Anfal', surahNameArabic: 'الأنفال', ayah: 46,
        arabicText: 'وَأَطِيعُوا۟ ٱللَّهَ وَرَسُولَهُۥ وَلَا تَنَـٰزَعُوا۟ فَتَفْشَلُوا۟ وَتَذْهَبَ رِيحُكُمْ ۖ وَٱصْبِرُوٓا۟ ۚ إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ',
        translation: 'And obey Allah and His Messenger, and do not dispute and thus lose courage and then your strength would depart; and be patient. Indeed, Allah is with the patient.',
        reference: 'Al-Anfal 8:46'
      },
      '3:200': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 200,
        arabicText: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ ٱصْبِرُوا۟ وَصَابِرُوا۟ وَرَابِطُوا۟ وَٱتَّقُوا۟ ٱللَّهَ لَعَلَّكُمْ تُفْلِحُونَ',
        translation: 'O you who have believed, persevere and endure and remain stationed and fear Allah that you may be successful.',
        reference: 'Ali Imran 3:200'
      },
      '3:174': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 174,
        arabicText: 'فَٱنقَلَبُوا۟ بِنِعْمَةٍ مِّنَ ٱللَّهِ وَفَضْلٍ لَّمْ يَمْسَسْهُمْ سُوٓءٌ وَٱتَّبَعُوا۟ رِضْوَٰنَ ٱللَّهِ ۗ وَٱللَّهُ ذُو فَضْلٍ عَظِيمٍ',
        translation: 'So they returned with favor from Allah and bounty, no harm having touched them. And they pursued the pleasure of Allah, and Allah is the possessor of great bounty.',
        reference: 'Ali Imran 3:174'
      },
      '11:90': {
        surah: 11, surahName: 'Hud', surahNameArabic: 'هود', ayah: 90,
        arabicText: 'وَٱسْتَغْفِرُوا۟ رَبَّكُمْ ثُمَّ تُوبُوٓا۟ إِلَيْهِ ۚ إِنَّ رَبِّى رَحِيمٌ وَدُودٌ',
        translation: 'And ask forgiveness of your Lord and then repent to Him. Indeed, my Lord is Merciful and Affectionate.',
        reference: 'Hud 11:90'
      },
      '11:115': {
        surah: 11, surahName: 'Hud', surahNameArabic: 'هود', ayah: 115,
        arabicText: 'وَٱصْبِرْ فَإِنَّ ٱللَّهَ لَا يُضِيعُ أَجْرَ ٱلْمُحْسِنِينَ',
        translation: 'And be patient, for indeed, Allah does not allow to be lost the reward of those who do good.',
        reference: 'Hud 11:115'
      },
      '18:58': {
        surah: 18, surahName: 'Al-Kahf', surahNameArabic: 'الكهف', ayah: 58,
        arabicText: 'وَرَبُّكَ ٱلْغَفُورُ ذُو ٱلرَّحْمَةِ ۖ لَوْ يُؤَاخِذُهُم بِمَا كَسَبُوا۟ لَعَجَّلَ لَهُمُ ٱلْعَذَابَ ۚ بَل لَّهُم مَّوْعِدٌ لَّن يَجِدُوا۟ مِن دُونِهِۦ مَوْئِلًا',
        translation: 'And your Lord is the Forgiving, full of mercy. If He were to impose blame upon them for what they earned, He would have hastened for them the punishment. Rather, for them is an appointment from which they will never find an escape.',
        reference: 'Al-Kahf 18:58'
      },
      '23:115': {
        surah: 23, surahName: 'Al-Muminun', surahNameArabic: 'المؤمنون', ayah: 115,
        arabicText: 'أَفَحَسِبْتُمْ أَنَّمَا خَلَقْنَـٰكُمْ عَبَثًا وَأَنَّكُمْ إِلَيْنَا لَا تُرْجَعُونَ',
        translation: 'Then did you think that We created you uselessly and that to Us you would not be returned?',
        reference: 'Al-Muminun 23:115'
      },
      '30:60': {
        surah: 30, surahName: 'Ar-Rum', surahNameArabic: 'الروم', ayah: 60,
        arabicText: 'فَٱصْبِرْ إِنَّ وَعْدَ ٱللَّهِ حَقٌّ ۖ وَلَا يَسْتَخِفَّنَّكَ ٱلَّذِينَ لَا يُوقِنُونَ',
        translation: 'So be patient. Indeed, the promise of Allah is truth. And let them not disquiet you who are not certain in faith.',
        reference: 'Ar-Rum 30:60'
      },
      '39:9': {
        surah: 39, surahName: 'Az-Zumar', surahNameArabic: 'الزمر', ayah: 9,
        arabicText: 'أَمَّنْ هُوَ قَـٰنِتٌ ءَانَآءَ ٱلَّيْلِ سَاجِدًا وَقَآئِمًا يَحْذَرُ ٱلْـَٔاخِرَةَ وَيَرْجُوا۟ رَحْمَةَ رَبِّهِۦ ۗ قُلْ هَلْ يَسْتَوِى ٱلَّذِينَ يَعْلَمُونَ وَٱلَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُو۟لُوا۟ ٱلْأَلْبَـٰبِ',
        translation: 'Is one who is devoutly obedient during periods of the night, prostrating and standing in prayer, fearing the Hereafter and hoping for the mercy of his Lord, like one who does not? Say, "Are those who know equal to those who do not know?" Only they will remember who are people of understanding.',
        reference: 'Az-Zumar 39:9'
      },
      '42:28': {
        surah: 42, surahName: 'Ash-Shuraa', surahNameArabic: 'الشورى', ayah: 28,
        arabicText: 'وَهُوَ ٱلَّذِى يُنَزِّلُ ٱلْغَيْثَ مِنۢ بَعْدِ مَا قَنَطُوا۟ وَيَنشُرُ رَحْمَتَهُۥ ۚ وَهُوَ ٱلْوَلِىُّ ٱلْحَمِيدُ',
        translation: 'And it is He who sends down the rain after they had despaired and spreads His mercy. And He is the Protector, the Praiseworthy.',
        reference: 'Ash-Shuraa 42:28'
      },
      '4:146': {
        surah: 4, surahName: 'An-Nisa', surahNameArabic: 'النساء', ayah: 146,
        arabicText: 'إِلَّا ٱلَّذِينَ تَابُوا۟ وَأَصْلَحُوا۟ وَٱعْتَصَمُوا۟ بِٱللَّهِ وَأَخْلَصُوا۟ دِينَهُمْ لِلَّهِ فَأُو۟لَـٰٓئِكَ مَعَ ٱلْمُؤْمِنِينَ ۖ وَسَوْفَ يُؤْتِ ٱللَّهُ ٱلْمُؤْمِنِينَ أَجْرًا عَظِيمًا',
        translation: 'Except for those who repent, correct themselves, hold fast to Allah, and are sincere in their religion for Allah, for those will be with the believers. And Allah is going to give the believers a great reward.',
        reference: 'An-Nisa 4:146'
      },
      '7:143': {
        surah: 7, surahName: 'Al-Araf', surahNameArabic: 'الأعراف', ayah: 143,
        arabicText: 'وَلَمَّا جَآءَ مُوسَىٰ لِمِيقَـٰتِنَا وَكَلَّمَهُۥ رَبُّهُۥ قَالَ رَبِّ أَرِنِىٓ أَنظُرْ إِلَيْكَ ۚ قَالَ لَن تَرَىٰنِى وَلَـٰكِنِ ٱنظُرْ إِلَى ٱلْجَبَلِ فَإِنِ ٱسْتَقَرَّ مَكَانَهُۥ فَسَوْفَ تَرَىٰنِى ۚ فَلَمَّا تَجَلَّىٰ رَبُّهُۥ لِلْجَبَلِ جَعَلَهُۥ دَكًّا وَخَرَّ مُوسَىٰ صَعِقًا ۚ فَلَمَّا أَفَاقَ قَالَ سُبْحَـٰنَكَ تُبْتُ إِلَيْكَ وَأَنَا۠ أَوَّلُ ٱلْمُؤْمِنِينَ',
        translation: 'And when Moses arrived at Our appointed time and his Lord spoke to him, he said, "My Lord, show me Yourself that I may look at You." Allah said, "You will not see Me, but look at the mountain; if it should remain in place, then you will see Me." But when his Lord appeared to the mountain, He rendered it level, and Moses fell unconscious. And when he awoke, he said, "Exalted are You! I have repented to You, and I am the first of the believers."',
        reference: 'Al-Araf 7:143'
      },
      

      '25:63': {
        surah: 25, surahName: 'Al-Furqan', surahNameArabic: 'الفرقان', ayah: 63,
        arabicText: 'وَعِبَادُ ٱلرَّحْمَـٰنِ ٱلَّذِينَ يَمْشُونَ عَلَى ٱلْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ ٱلْجَـٰهِلُونَ قَالُوا۟ سَلَـٰمًا',
        translation: 'And the servants of the Most Merciful are those who walk upon the earth in humility, and when the ignorant address them harshly, they say words of peace.',
        reference: 'Al-Furqan 25:63'
      },

      '28:16': {
        surah: 28, surahName: 'Al-Qasas', surahNameArabic: 'القصص', ayah: 16,
        arabicText: 'قَالَ رَبِّ إِنِّى ظَلَمْتُ نَفْسِى فَٱغْفِرْ لِى فَغَفَرَ لَهُۥٓ ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ',
        translation: 'He said, "My Lord, indeed I have wronged myself, so forgive me," and He forgave him. Indeed, He is the Forgiving, the Merciful.',
        reference: 'Al-Qasas 28:16'
      },

      '28:24': {
        surah: 28, surahName: 'Al-Qasas', surahNameArabic: 'القصص', ayah: 24,
        arabicText: 'فَسَقَىٰ لَهُمَا ثُمَّ تَوَلَّىٰٓ إِلَى ٱلظِّلِّ فَقَالَ رَبِّ إِنِّى لِمَآ أَنزَلْتَ إِلَىَّ مِنْ خَيْرٍ فَقِيرٌ',
        translation: 'So he watered their flocks for them; then he went back to the shade and said, "My Lord, indeed I am, for whatever good You would send down to me, in need."',
        reference: 'Al-Qasas 28:24'
      },

      '40:7': {
        surah: 40, surahName: 'Ghafir', surahNameArabic: 'غافر', ayah: 7,
        arabicText: 'ٱلَّذِينَ يَحْمِلُونَ ٱلْعَرْشَ وَمَنْ حَوْلَهُۥ يُسَبِّحُونَ بِحَمْدِ رَبِّهِمْ وَيُؤْمِنُونَ بِهِۦ وَيَسْتَغْفِرُونَ لِلَّذِينَءَامَنُوا۟ رَبَّنَا وَسِعْتَ كُلَّ شَىْءٍ رَّحْمَةً وَعِلْمًا فَٱغْفِرْ لِلَّذِينَ تَابُوا۟ وَٱتَّبَعُوا۟ سَبِيلَكَ وَقِهِمْ عَذَابَ ٱلْجَحِيمِ',
        translation: 'Those angels who carry the Throne and those around it exalt Allah with praise of their Lord and believe in Him and ask forgiveness for those who have believed, saying, "Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way and protect them from the punishment of Hellfire."',
        reference: 'Ghafir 40:7'
      },

      '71:10': {
        surah: 71, surahName: 'Nuh', surahNameArabic: 'نوح', ayah: 10,
        arabicText: 'فَقُلْتُ ٱسْتَغْفِرُوا۟ رَبَّكُمْ إِنَّهُۥ كَانَ غَفَّارًا',
        translation: 'And said, "Ask forgiveness of your Lord. Indeed, He is ever a Perpetual Forgiver."',
        reference: 'Nuh 71:10'
      },

      '71:11': {
        surah: 71, surahName: 'Nuh', surahNameArabic: 'نوح', ayah: 11,
        arabicText: 'يُرْسِلِ ٱلسَّمَآءَ عَلَيْكُم مِّدْرَارًا',
        translation: 'He will send rain from the sky upon you in continuing showers.',
        reference: 'Nuh 71:11'
      },

      '71:12': {
        surah: 71, surahName: 'Nuh', surahNameArabic: 'نوح', ayah: 12,
        arabicText: 'وَيُمْدِدْكُم بِأَمْوَٰلٍ وَبَنِينَ وَيَجْعَل لَّكُمْ جَنَّـٰتٍ وَيَجْعَل لَّكُمْ أَنْهَـٰرًا',
        translation: 'And give you increase in wealth and children and provide for you gardens and provide for you rivers.',
        reference: 'Nuh 71:12'
      },

      '66:8': {
        surah: 66, surahName: 'At-Tahrim', surahNameArabic: 'التحريم', ayah: 8,
        arabicText: 'يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ تُوبُوٓا۟ إِلَى ٱللَّهِ تَوْبَةً نَّصُوحًا عَسَىٰ رَبُّكُمْ أَن يُكَفِّرَ عَنكُمْ سَيِّـَٔاتِكُمْ وَيُدْخِلَكُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ',
        translation: 'O you who have believed, repent to Allah with sincere repentance. Perhaps your Lord will remove from you your misdeeds and admit you into gardens beneath which rivers flow.',
        reference: 'At-Tahrim 66:8'
      },

      '25:74': {
        surah: 25, surahName: 'Al-Furqan', surahNameArabic: 'الفرقان', ayah: 74,
        arabicText: 'وَٱلَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَٰجِنَا وَذُرِّيَّـٰتِنَا قُرَّةَ أَعْيُنٍ وَٱجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
        translation: 'And those who say, "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us a leader for the righteous."',
        reference: 'Al-Furqan 25:74'
      },

      '21:89': {
        surah: 21, surahName: 'Al-Anbiya', surahNameArabic: 'الأنبياء', ayah: 89,
        arabicText: 'وَزَكَرِيَّآ إِذْ نَادَىٰ رَبَّهُۥ رَبِّ لَا تَذَرْنِى فَرْدًا وَأَنتَ خَيْرُ ٱلْوَٰرِثِينَ',
        translation: 'And mention Zechariah, when he called to his Lord, "My Lord, do not leave me alone as heir, and You are the best of inheritors."',
        reference: 'Al-Anbiya 21:89'
      },

      '21:90': {
        surah: 21, surahName: 'Al-Anbiya', surahNameArabic: 'الأنبياء', ayah: 90,
        arabicText: 'فَٱسْتَجَبْنَا لَهُۥ وَوَهَبْنَا لَهُۥ يَحْيَىٰ وَأَصْلَحْنَا لَهُۥ زَوْجَهُۥٓ ۚ إِنَّهُمْ كَانُوا۟ يُسَـٰرِعُونَ فِى ٱلْخَيْرَٰتِ وَيَدْعُونَنَا رَغَبًا وَرَهَبًا ۖ وَكَانُوا۟ لَنَا خَـٰشِعِينَ',
        translation: 'So We responded to him, and We gave to him John, and amended for him his wife. Indeed, they used to hasten to good deeds and supplicate Us in hope and fear, and they were to Us humbly submissive.',
        reference: 'Al-Anbiya 21:90'
      },

      '3:8': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 8,
        arabicText: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ ٱلْوَهَّابُ',
        translation: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.',
        reference: 'Ali Imran 3:8'
      },

      '3:147': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 147,
        arabicText: 'وَمَا كَانَ قَوْلَهُمْ إِلَّآ أَن قَالُوا۟ رَبَّنَا ٱغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِىٓ أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَٱنصُرْنَا عَلَى ٱلْقَوْمِ ٱلْكَـٰفِرِينَ',
        translation: 'And their words were not but that they said, "Our Lord, forgive us our sins and the excess committed in our affairs and plant firmly our feet and give us victory over the disbelieving people."',
        reference: 'Ali Imran 3:147'
      },

      '60:4': {
        surah: 60, surahName: 'Al-Mumtahanah', surahNameArabic: 'الممتحنة', ayah: 4,
        arabicText: 'قَدْ كَانَتْ لَكُمْ أُسْوَةٌ حَسَنَةٌ فِىٓ إِبْرَٰهِيمَ وَٱلَّذِينَ مَعَهُۥٓ إِذْ قَالُوا۟ لِقَوْمِهِمْ إِنَّا بُرَءَٰٓؤُا۟ مِنكُمْ وَمِمَّا تَعْبُدُونَ مِن دُونِ ٱللَّهِ كَفَرْنَا بِكُمْ وَبَدَا بَيْنَنَا وَبَيْنَكُمُ ٱلْعَدَٰوَةُ وَٱلْبَغْضَآءُ أَبَدًا حَتَّىٰ تُؤْمِنُوا۟ بِٱللَّهِ وَحْدَهُۥٓ إِلَّا قَوْلَ إِبْرَٰهِيمَ لِأَبِيهِ لَأَسْتَغْفِرَنَّ لَكَ وَمَآ أَمْلِكُ لَكَ مِنَ ٱللَّهِ مِن شَىْءٍ ۖ رَّبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ ٱلْمَصِيرُ',
        translation: 'There has already been for you an excellent pattern in Abraham and those with him, when they said to their people, "Indeed, we are disassociated from you and from whatever you worship other than Allah. We have denied you, and there has appeared between us and you animosity and hatred forever until you believe in Allah alone" except for the saying of Abraham to his father, "I will surely ask forgiveness for you, but I have not power to do anything for you before Allah." They said, "Our Lord, upon You we have relied, and to You we have returned, and to You is the destination."',
        reference: 'Al-Mumtahanah 60:4'
      },

      '3:120': {
        surah: 3, surahName: 'Ali Imran', surahNameArabic: 'آل عمران', ayah: 120,
        arabicText: 'إِن تَمْسَسْكُمْ حَسَنَةٌ تَسُؤْهُمْ وَإِن تُصِبْكُمْ سَيِّئَةٌ يَفْرَحُوا۟ بِهَا ۖ وَإِن تَصْبِرُوا۟ وَتَتَّقُوا۟ لَا يَضُرُّكُمْ كَيْدُهُمْ شَيْـًٔا ۗ إِنَّ ٱللَّهَ بِمَا يَعْمَلُونَ مُحِيطٌ',
        translation: 'If good touches you, it distresses them; but if harm strikes you, they rejoice at it. And if you are patient and fear Allah, their plot will not harm you at all. Indeed, Allah is encompassing of what they do.',
        reference: 'Ali Imran 3:120'
      },

      '4:81': {
        surah: 4, surahName: 'An-Nisa', surahNameArabic: 'النساء', ayah: 81,
        arabicText: 'وَيَقُولُونَ طَاعَةٌ فَإِذَا بَرَزُوا۟ مِنْ عِندِكَ بَيَّتَ طَآئِفَةٌ مِّنْهُمْ غَيْرَ ٱلَّذِى تَقُولُ ۖ وَٱللَّهُ يَكْتُبُ مَا يُبَيِّتُونَ ۖ فَأَعْرِضْ عَنْهُمْ وَتَوَكَّلْ عَلَى ٱللَّهِ ۚ وَكَفَىٰ بِٱللَّهِ وَكِيلًا',
        translation: 'And they say, "We hear and we obey." But when they depart from you, a group of them spend the night determining to do other than what you say. But Allah records what they plan by night. So leave them alone and rely upon Allah. And sufficient is Allah as Disposer of affairs.',
        reference: 'An-Nisa 4:81'
      },

      '10:65': {
        surah: 10, surahName: 'Yunus', surahNameArabic: 'يونس', ayah: 65,
        arabicText: 'وَلَا يَحْزُنكَ قَوْلُهُمْ ۘ إِنَّ ٱلْعِزَّةَ لِلَّهِ جَمِيعًا ۚ هُوَ ٱلسَّمِيعُ ٱلْعَلِيمُ',
        translation: 'And let not their speech grieve you. Indeed, honor belongs to Allah entirely. He is the Hearing, the Knowing.',
        reference: 'Yunus 10:65'
      },

      '2:269': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 269,
        arabicText: 'يُؤْتِى ٱلْحِكْمَةَ مَن يَشَآءُ ۚ وَمَن يُؤْتَ ٱلْحِكْمَةَ فَقَدْ أُوتِىَ خَيْرًا كَثِيرًا ۗ وَمَا يَذَّكَّرُ إِلَّآ أُو۟لُوا۟ ٱلْأَلْبَـٰبِ',
        translation: 'He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good. And none will remember except those of understanding.',
        reference: 'Al-Baqarah 2:269'
      },

      '32:17': {
        surah: 32, surahName: 'As-Sajdah', surahNameArabic: 'السجدة', ayah: 17,
        arabicText: 'فَلَا تَعْلَمُ نَفْسٌ مَّآ أُخْفِىَ لَهُم مِّن قُرَّةِ أَعْيُنٍ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ',
        translation: 'And no soul knows what has been hidden for them of comfort for eyes as reward for what they used to do.',
        reference: 'As-Sajdah 32:17'
      },

      '43:70': {
        surah: 43, surahName: 'Az-Zukhruf', surahNameArabic: 'الزخرف', ayah: 70,
        arabicText: 'ٱدْخُلُوا۟ ٱلْجَنَّةَ أَنتُمْ وَأَزْوَٰجُكُمْ تُحْبَرُونَ',
        translation: 'Enter Paradise, you and your kinds, delighted.',
        reference: 'Az-Zukhruf 43:70'
      },

      '43:71': {
        surah: 43, surahName: 'Az-Zukhruf', surahNameArabic: 'الزخرف', ayah: 71,
        arabicText: 'يُطَافُ عَلَيْهِم بِصِحَافٍ مِّن ذَهَبٍ وَأَكْوَابٍ ۖ وَفِيهَا مَا تَشْتَهِيهِ ٱلْأَنفُسُ وَتَلَذُّ ٱلْأَعْيُنُ ۖ وَأَنتُمْ فِيهَا خَـٰلِدُونَ',
        translation: 'Circulated among them will be plates and vessels of gold. And therein is whatever the souls desire and what delights the eyes, and you will abide therein eternally.',
        reference: 'Az-Zukhruf 43:71'
      },

      '67:23': {
        surah: 67, surahName: 'Al-Mulk', surahNameArabic: 'الملك', ayah: 23,
        arabicText: 'قُلْ هُوَ ٱلَّذِىٓ أَنشَأَكُمْ وَجَعَلَ لَكُمُ ٱلسَّمْعَ وَٱلْأَبْصَـٰرَ وَٱلْأَفْـِٔدَةَ ۖ قَلِيلًا مَّا تَشْكُرُونَ',
        translation: 'Say, "It is He who has produced you and made for you hearing and vision and hearts; little are you grateful."',
        reference: 'Al-Mulk 67:23'
      },

      '106:3': {
        surah: 106, surahName: 'Quraish', surahNameArabic: 'قريش', ayah: 3,
        arabicText: 'فَلْيَعْبُدُوا۟ رَبَّ هَـٰذَا ٱلْبَيْتِ',
        translation: 'Let them worship the Lord of this House.',
        reference: 'Quraish 106:3'
      },

      '106:4': {
        surah: 106, surahName: 'Quraish', surahNameArabic: 'قريش', ayah: 4,
        arabicText: 'ٱلَّذِىٓ أَطْعَمَهُم مِّن جُوعٍ وَءَامَنَهُم مِّنْ خَوْفٍۭ',
        translation: 'Who has fed them, saving them from hunger and made them safe, saving them from fear.',
        reference: 'Quraish 106:4'
      },

      '2:214': {
        surah: 2, surahName: 'Al-Baqarah', surahNameArabic: 'البقرة', ayah: 214,
        arabicText: 'أَمْ حَسِبْتُمْ أَن تَدْخُلُوا۟ ٱلْجَنَّةَ وَلَمَّا يَأْتِكُم مَّثَلُ ٱلَّذِينَ خَلَوْا۟ مِن قَبْلِكُم ۖ مَّسَّتْهُمُ ٱلْبَأْسَآءُ وَٱلضَّرَّآءُ وَزُلْزِلُوا۟ حَتَّىٰ يَقُولَ ٱلرَّسُولُ وَٱلَّذِينَ ءَامَنُوا۟ مَعَهُۥ مَتَىٰ نَصْرُ ٱللَّهِ ۗ أَلَآ إِنَّ نَصْرَ ٱللَّهِ قَرِيبٌ',
        translation: 'Or do you think that you will enter Paradise while such trial has not yet come to you as came to those who passed on before you? They were touched by poverty and hardship and were shaken until even their messenger and those who believed with him said, "When is the help of Allah?" Unquestionably, the help of Allah is near.',
        reference: 'Al-Baqarah 2:214'
      },

     '64:11': {
      surah: 64, surahName: 'At-Taghabun', surahNameArabic: 'التغابن', ayah: 11,
      arabicText: 'مَآ أَصَابَ مِن مُّصِيبَةٍ إِلَّا بِإِذْنِ ٱللَّهِ ۗ وَمَن يُؤْمِنۢ بِٱللَّهِ يَهْدِ قَلْبَهُۥ ۚ وَٱللَّهُ بِكُلِّ شَىْءٍ عَلِيمٌ',
      translation: 'No disaster strikes except by permission of Allah. And whoever believes in Allah - He will guide his heart. And Allah is Knowing of all things.',
      reference: 'At-Taghabun 64:11'
      },

     '103:3': {
      surah: 103, surahName: 'Al-Asr', surahNameArabic: 'العصر', ayah: 3,
      arabicText: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ',
      translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
      reference: 'Al-Asr 103:3'
      },
      
    };
  }

  // Generate audio URL
  getAudioURL(surah, ayah) {
    const surahPadded = String(surah).padStart(3, '0');
    const ayahPadded = String(ayah).padStart(3, '0');
    return `${this.audioBaseURL}/Alafasy_128kbps/${surahPadded}${ayahPadded}.mp3`;
  }

  async getVerseByEmotion(emotion) {
    try {
      const verses = this.emotionVerses[emotion.toLowerCase()] || this.emotionVerses.sad;
      const randomVerseKey = verses[Math.floor(Math.random() * verses.length)];
      const [surah, ayah] = randomVerseKey.split(':');

      return await this.getVerseWithDetails(surah, ayah);
    } catch (error) {
      console.error('Error fetching verse by emotion:', error);
      throw error;
    }
  }

  async getVerseWithDetails(surah, ayah) {
    const verseKey = `${surah}:${ayah}`;
    
    // Try online API first for FULL text
    try {
      const response = await fetch(
        `${this.baseURL}/ayah/${verseKey}/editions/quran-uthmani,en.asad`,
        { timeout: 5000 }
      );
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.code === 200) {
          const arabicVerse = data.data[0];
          const translationVerse = data.data[1];

          return {
            surah: arabicVerse.surah.number,
            surahName: arabicVerse.surah.englishName,
            surahNameArabic: arabicVerse.surah.name,
            ayah: arabicVerse.numberInSurah,
            arabicText: arabicVerse.text, // FULL Arabic text
            translation: translationVerse.text, // FULL translation
            audioUrl: this.getAudioURL(arabicVerse.surah.number, arabicVerse.numberInSurah),
            reference: `${arabicVerse.surah.englishName} ${arabicVerse.surah.number}:${arabicVerse.numberInSurah}`,
            verseKey: verseKey
          };
        }
      }
    } catch (error) {
      console.log('API unavailable, using offline data:', error.message);
    }

    // Fallback to offline data (FULL text included)
    const offlineVerse = this.offlineVerses[verseKey];
    if (offlineVerse) {
      return {
        ...offlineVerse,
        audioUrl: this.getAudioURL(offlineVerse.surah, offlineVerse.ayah),
        verseKey: verseKey
      };
    }

    
    return {
      ...this.offlineVerses['94:5'],
      audioUrl: this.getAudioURL(94, 5),
      verseKey: '94:5'
    };
  }

  async getVerse(surah, ayah) {
    return await this.getVerseWithDetails(surah, ayah);
  }

  getAvailableEmotions() {
    return Object.keys(this.emotionVerses);
  }
}

module.exports = new QuranService();