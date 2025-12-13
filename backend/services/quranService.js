// backend/services/quranService.js
// EXPANDED VERSION - More verses, full text, better coverage!

const fetch = require('node-fetch');

class QuranService {
  constructor() {
    this.baseURL = 'https://api.alquran.cloud/v1';
    this.audioBaseURL = 'https://everyayah.com/data';
    
    // EXPANDED emotion-based verse mappings with MORE verses
    this.emotionVerses = {
      sad: [
        '2:286', '94:5', '94:6', '3:139', '13:28', '39:53', '2:153', '9:51',
        '93:4', '93:5', '29:2', '2:155', '2:156', '3:173', '8:46', '41:30',
        '21:83', '21:87', '38:41', '7:23', '7:56', '25:58', '11:88', '4:110'
      ],
      anxious: [
        '13:28', '2:286', '65:3', '94:5', '2:153', '3:160', '8:46', '11:56',
        '33:3', '64:13', '67:2', '3:173', '9:51', '39:36', '2:155',
         '33:39', '58:10', '16:99', '16:100', '23:97', '23:98', '7:200', '41:36'
      ],
      happy: [
        '16:18', '14:7', '55:13', '2:152', '93:11', '16:97', '39:10',
        '28:77', '41:34', '7:32', '16:96', '29:69', '65:2', '65:3',
        '3:133', '57:21', '39:73', '13:29', '10:58', '35:34', '35:35', '76:11'
      ],
      grateful: [
        '14:7', '2:152', '16:18', '27:40', '31:12', '35:3', '3:123',
        '76:3', '16:114', '54:35', '7:10', '28:73', '39:7', '2:172',
        '34:13', '7:58', '17:3', '46:15', '54:10', '27:19', '3:144', '39:66'

      ],
      stressed: [
        '2:286', '94:5', '94:6', '13:28', '2:153', '65:2', '65:3', '39:53',
        '29:2', '29:3', '2:155', '3:139', '8:46', '11:56', '33:3',
        '39:10', '16:127', '20:130', '73:10', '50:39', '15:97', '15:98', '3:200'
      ],
      hopeful: [
        '94:5', '94:6', '3:139', '12:87', '39:53', '2:186', '40:60',
        '3:160', '8:46', '29:69', '65:2', '65:3', '11:115', '23:115',
        '3:174', '11:90', '42:28', '30:60', '4:146', '7:143', '39:9', '18:58'
      ]
    };

    // EXPANDED OFFLINE DATA with FULL verses (not truncated)
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
        translation: 'Said one who had knowledge from the Scripture, "I will bring it to you before your glance returns to you." And when Solomon saw it placed before him, he said, "This is from the favor of my Lord to test me whether I will be grateful or ungratful. And whoever is grateful - his gratitude is only for the benefit of himself. And whoever is ungrateful - then indeed, my Lord is Free of need and Generous."',
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
      }
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

    // Ultimate fallback
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