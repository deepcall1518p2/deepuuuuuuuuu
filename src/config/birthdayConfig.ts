import photo1 from '../assets/photos/photo1.jpg';
import photo2 from '../assets/photos/photo2.jpg';
import photo3 from '../assets/photos/photo3.jpg';
import photo4 from '../assets/photos/photo4.jpg';
import photo5 from '../assets/photos/photo5.jpg';

export interface PhotoItem {
  id: number;
  url: string;
  title: string;
  caption: string;
  date: string;
}

export interface BalanceStat {
  label: string;
  value: number;
  barColor?: string;
}

export interface LoveCategory {
  label: string;
  value: number;
  comment: string;
}

export interface BirthdayConfig {
  recipientName: string;
  nickname: string;
  displayName: string;
  age: number;
  dateStr: string;
  passkey: string;
  passkeyHint: string;
  
  welcome: {
    title: string;
    subtitle: string;
    passkeyLabel: string;
    buttonText: string;
    footerText: string;
  };
  
  unlocking: {
    title: string;
    subtitle: string;
    durationMs: number;
  };
  
  happyBirthday: {
    dateBadge: string;
    headlineTop: string;
    headlineMain: string;
    nameBadge: string;
    message: string;
    handwrittenNote: string;
  };
  
  letter: {
    sectionKicker: string;
    sectionTitle: string;
    envelopeLabel: string;
    letterDate: string;
    letterTag: string;
    salutation: string;
    bodyParagraphs: string[];
    signOff: string;
  };
  
  coupon: {
    kicker: string;
    title: string;
    badge: string;
    cardTitle: string;
    prizeTitle: string;
    prizeSubtitle: string;
    couponCode: string;
    progressHint: string;
    revealedHint: string;
  };
  
  loveMeter: {
    kicker: string;
    title: string;
    badge: string;
    question: string;
    promptText: string;
    buttonText: string;
    targetPercentage: number;
    categories: LoveCategory[];
  };
  
  atm: {
    kicker: string;
    title: string;
    bankName: string;
    screenTitle: string;
    cardHolder: string;
    cardChipLabel: string;
    pinCode: string;
    pinHint: string;
    photos: PhotoItem[];
    balanceStats: BalanceStat[];
    preparedWishes: string[];
    receiptMessage: string;
    receiptNotice: string;
  };
  
  cakeCutting: {
    kicker: string;
    title: string;
    instruction: string;
    cakeNumber: string;
  };
  
  finalGift: {
    kicker: string;
    title: string;
    tapPrompt: string;
    cardHeadline: string;
    cardParagraphs: string[];
    perkPills: string[];
    giftTag: string;
    thankYouText: string;
    buttonAgain: string;
  };
  
  music: {
    trackName: string;
    artist: string;
    src: string;
    synthLofiEnabled: boolean;
  };
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  recipientName: "Deepali",
  nickname: "Deepu",
  displayName: "Deepali (My Deepu ❤️)",
  age: 17, // Calculated from DOB: 17 Oct, 2009 -> 17th Birthday on 17 Oct, 2026
  dateStr: "17 OCTOBER 2026",
  passkey: "1710",
  passkeyHint: "Hint: your birthday date and month",
  
  welcome: {
    title: "DEEPALI",
    subtitle: "Something beautiful is waiting behind this tiny lock, my Deepu 🤍",
    passkeyLabel: "Enter the passkey",
    buttonText: "Open my surprise 🤍",
    footerText: "Made with all my heart, just for my Deepu ✨"
  },
  
  unlocking: {
    title: "Unlocking your little universe",
    subtitle: "Gathering hugs, wishes and seventeen tiny stars for Deepu",
    durationMs: 3800
  },
  
  happyBirthday: {
    dateBadge: "17 OCTOBER 2026",
    headlineTop: "THE WORLD GOT BRIGHTER SEVENTEEN YEARS AGO",
    headlineMain: "Happiest 17th Birthday",
    nameBadge: "DEEPALI (MY DEEPU ❤️)",
    message: "To someone special. My favorite person Deepu, and the reason ordinary days feel completely magical.",
    handwrittenNote: "seventeen looks perfect on you"
  },
  
  letter: {
    sectionKicker: "A NOTE FROM MY HEART",
    sectionTitle: "There are things I need you to know",
    envelopeLabel: "TAP TO OPEN",
    letterDate: "17.10",
    letterTag: "SEALED WITH LOVE ❤️",
    salutation: "My dearest Deepali (My Deepu),",
    bodyParagraphs: [
      "Happy 17th birthday to the person who makes my heart feel safe and my entire life feel full. Your smile can rescue my hardest day, and your presence turns simple moments into memories I never want to lose.",
      "You might be Deepali to the rest of the world, but to me, you will always be my sweetest Deepu. I hope this 17th chapter brings you boundless peace, sweet laughter, warm cozy moments, and every dream your heart is chasing.",
      "Thank you for being my constant, my calm, and my favorite adventure. You are cherished more than words could ever describe."
    ],
    signOff: "Forever & always yours,"
  },
  
  coupon: {
    kicker: "A LITTLE BIRTHDAY PLAY — PART 1",
    title: "Find the secret hiding under the sparkles",
    badge: "SECRET PRIZE",
    cardTitle: "Deepu's birthday coupon",
    prizeTitle: "UNLIMITED HUGS",
    prizeSubtitle: "Redeemable anytime · No expiry date · Valid for a lifetime for Deepu",
    couponCode: "HUG-2026-DEEPU-17",
    progressHint: "Keep going Deepu, your prize is waiting...",
    revealedHint: "Woohoo! Deepu unlocked the secret coupon! 🎉"
  },
  
  loveMeter: {
    kicker: "A LITTLE BIRTHDAY PLAY — PART 2",
    title: "How much love is in the air?",
    badge: "TINY EXPERIMENT",
    question: "How loved is DEEPU?",
    promptText: "Press the button for a very scientific answer.",
    buttonText: "Measure the love ▶",
    targetPercentage: 100,
    categories: [
      { label: "Radiant Smile", value: 100, comment: "Lights up my whole world" },
      { label: "Laugh Frequency", value: 99, comment: "My absolute favorite melody" },
      { label: "Kindness & Warmth", value: 100, comment: "Purest heart of gold" },
      { label: "Deepu's Cuteness", value: 1000, comment: "Exceeds all universe scales" }
    ]
  },
  
  atm: {
    kicker: "A SPECIAL MEMORY CHAPTER",
    title: "Browse a few favorite photos from the Photo Bank",
    bankName: "HBL ATM",
    screenTitle: "PHOTO BANK",
    cardHolder: "DEEPALI • MY DEEPU",
    cardChipLabel: "1710-2026",
    pinCode: "1710",
    pinHint: "Hint: your birthday date and month (1710)",
    photos: [
      {
        id: 1,
        url: photo1,
        title: "Little Deepu ✨",
        caption: "Those innocent eyes and cute smile that still light up my world",
        date: "Memory 01 · Pure Innocence"
      },
      {
        id: 2,
        url: photo2,
        title: "Golden Hour Glow 🌸",
        caption: "Sunlight falling on your face, pure peace and breathtaking beauty",
        date: "Memory 02 · Sunlit Bliss"
      },
      {
        id: 3,
        url: photo3,
        title: "Timeless Elegance 🖤",
        caption: "Classic vintage vibes, traditional jhumkas, and the most graceful gaze",
        date: "Memory 03 · Retro Cam"
      },
      {
        id: 4,
        url: photo4,
        title: "The Loveliest Smile 🌺",
        caption: "Flower in your hair and that heartwarming smile I will cherish forever",
        date: "Memory 04 · Pure Radiance"
      },
      {
        id: 5,
        url: photo5,
        title: "Little Princess Deepu 👑",
        caption: "Dressed up in yellow silk, our cute little baby Deepu back in 2015",
        date: "Memory 05 · Sweetest Childhood"
      }
    ],
    balanceStats: [
      { label: "Smile", value: 100, barColor: "bg-emerald-400" },
      { label: "Funny Moments", value: 97, barColor: "bg-emerald-400" },
      { label: "Late Replies", value: 89, barColor: "bg-emerald-400" },
      { label: "Kindness", value: 100, barColor: "bg-emerald-400" }
    ],
    preparedWishes: [
      "May this 17th year bring my Deepu endless happiness, peace, and sweet surprises! 🎂",
      "Unlimited hugs, warm coffee, and zero stress forever and ever! ☕",
      "Wishing you deep laughter, great dreams, and endless magic! 🌟",
      "May you always know how deeply cherished, loved, and special you are! 💖"
    ],
    receiptMessage: "Keep smiling my Deepu, you deserve the universe.",
    receiptNotice: "OFFICIAL TRANSACTION RECORD · ATM 2026-HBL"
  },
  
  cakeCutting: {
    kicker: "A SPECIAL BIRTHDAY RITUAL",
    title: "Now cut the cake 🎂",
    instruction: "DRAW THE KNIFE RIGHT ACROSS THE CAKE TO SLICE IT",
    cakeNumber: "17"
  },
  
  finalGift: {
    kicker: "A LITTLE SURPRISE FOR YOU",
    title: "One last thing, accept your gift",
    tapPrompt: "TAP THE BOX TO ACCEPT YOUR GIFT",
    cardHeadline: "Happy 17th Birthday, Deepali (My Deepu)",
    cardParagraphs: [
      "The real gift is not in this box. It is every chapter you just walked through, the locked door only my Deepu could open, the scratch card, the love meter that refused to stop at 100, the letter, the photo bank, and a cake cut with your own hands.",
      "Consider all of it yours, Deepu. Forever. No expiry, no conditions."
    ],
    perkPills: [
      "UNLIMITED HUGS",
      "LATE NIGHT CALLS",
      "ONE WISH GRANTED",
      "ALWAYS THERE FOR DEEPU"
    ],
    giftTag: "Gifted with all my love to Deepu ❤️",
    thankYouText: "Thank You Deepu for being in my life",
    buttonAgain: "Replay Journey"
  },
  
  music: {
    trackName: "Acoustic Melody for Deepu",
    artist: "Romantic Guitar",
    src: "/music.mp3",
    synthLofiEnabled: true
  }
};
