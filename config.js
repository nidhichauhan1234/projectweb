/**
 * ============================================================
 *  ARYAN'S 20th BIRTHDAY — EVERYTHING YOU CAN EDIT LIVES HERE
 * ============================================================
 *
 *  PHOTOS
 *  ------
 *  Drop your images into  public/photos/  named photo1.jpeg … photo21.jpeg.
 *  Everywhere else in this file, photos are picked by NUMBER (1–21),
 *  so to move a photo somewhere else just change the number.
 *  If a photo file is missing, a soft "photo coming soon" frame shows instead.
 */

export const photos = [
  "/photos/photo1.jpeg",  // 1
  "/photos/photo2.jpeg",  // 2
  "/photos/photo3.jpeg",  // 3
  "/photos/photo4.jpeg",  // 4
  "/photos/photo5.jpeg",  // 5
  "/photos/photo6.jpeg",  // 6
  "/photos/photo7.jpeg",  // 7
  "/photos/photo8.jpeg",  // 8
  "/photos/photo9.jpeg",  // 9
  "/photos/photo10.jpeg", // 10
  "/photos/photo11.jpeg", // 11
  "/photos/photo12.jpeg", // 12
  "/photos/photo13.jpeg", // 13
  "/photos/photo14.jpeg", // 14
  "/photos/photo15.jpeg", // 15
  "/photos/photo16.jpeg", // 16
  "/photos/photo17.jpeg", // 17
  "/photos/photo18.jpeg", // 18
  "/photos/photo19.jpeg", // 19
  "/photos/photo20.jpeg", // 20
  "/photos/photo21.jpeg", // 21
];

export const names = {
  him: "Aryan",
  me: "Nidhi",
  age: 20,
};

/* ---------------- Navigation labels ---------------- */
export const nav = {
  back: "← Back",
  next: "Next →",
  replay: "← Replay from Start",
};

/* ---------------- Chapter 1 — Opening ---------------- */
export const hero = {
  bubble: "Happy Birthday Aaru 💙 Ready for your surprise?",
  eyebrow: "a little wish, made with love",
  headline: "Happy Birthday Aryan",
  headlineAccent: "", // shown in italic blue after the headline
  subheadline: "Its my man's 20th birthday today! ",
  button: "Start the Celebration →",
  floatingPhotos: [1, 2, 3], // Photos 1, 2, 3
};

/* ---------------- Chapter 2 — Cake ---------------- */
export const cake = {
  title: "Let's cut your cake 🎂",
  bubbleStart: "Close your eyes and make a wish first…",
  bubbleWished: "Yayyy! Your wish is on its way 💙",
  bubbleCutting: "Hold the knife with me… 1, 2, 3!",
  bubbleFeeding: "First bite is always for you 🥰",
  blowButton: "Make a wish & blow the candles",
  cutButton: "Cut the cake together!",
  doneText: "Happy Birthday, my love 💙",
  cornerPhotos: [4, 5, 6, 7], // Photos 4, 5, 6, 7
};

/* ---------------- Chapter 3 — Polaroid gallery ----------------
 *  Each polaroid = { photo: number, caption: "text" }.
 *  Move a caption to any photo by changing its `photo` number.
 *  Leave caption as "" for a photo without text.
 */
export const gallery = {
  title: "Polaroid Memories",
  bubble: "Look at all my favourite versions of us...",
  hint: "Tap any polaroid to zoom in",
  items: [
    {
      photo: 1,
      caption:
        "In katilana nighaon se mt baat kiya karo jinhe dekh sab tham sa jaye...",
    },
    {
      photo: 2,
      caption:
        "sab upar neeche ladhte huye bhi but thik hojata heh idhr this cafe has a special place in my heart ",
    },
    {
      photo: 21,
      caption:
        "ofcc no doubt that it will not be gonna used to show my love damnn first photo heh yr hmari",
    },
    {
      photo: 11,
      caption: "Your smile—which seems rare to see, is so special that I always check all your photos just to see kisme hans raha hai ",
    },
    { photo: 12, caption: "perfect day with sufi nighth ahmm nhi chahte thhe bilkul bhi ghr jana is din vaise toh kabhi nhi hehe" },
    { photo: 4, caption: "tenu ghumadugi hero honda pe btw ab toh hunter 350 yayyyyyy" },
    { photo: 10, caption: "why thiss just to show that any day spending with u is bestt day" },
    { photo: 20, caption: "ahmm kehne ki kuch jarurat nhi" },
  ],
};

/* ---------------- Chapter 4 — Gifts ---------------- */
export const gifts = {
  title: "Now I have something for you... 🎁",
  openHint: "Tap the box to open",
  // What the girl says on each gift (one line per gift, in order)
  bubbles: [
    "Let's open Gift #1! 💌",
    "Ooh look at this next one... 🎟️",
    "This one I made with my own hands Digital handmade card",
    "Hehe, you'll get this one ",
    "Okay okay… the last one! ",
  ],
  labels: ["Love Letter", "Scratch Card", "Handmade Card", "The Double Card", "special one"],

  /* Gift 1 — Love letter */
  letter: {
    photo: 1, // Photo 16
    title: "Happy Birthday, Meri Jaa 💙",
    paragraphs: [
      "Jb tumse pehli baar yu mili, kuch nayi si umeed khuli, shaam thha suhana aur tumhare saath muskarana, tumhara mujhe smjhna aur nazre chupakar dekhna. Ghr pahuchkr sochu toh har pal spna sa lgna—yeh kya jaadu us pehli mulakat ne krdiya...",
      "Karu meh us chaand ki baat jisne layi mere chehre pe muskurahat, khada thha vo jln gate ke paas kr rha thha mera intezaar. Jab use dekha tb sb tham sa gya—koi kisi se itna pyaar kaise krskta ha yeh uske saath rehkr pta chla. Uska woh shrmana, mera haath pakad ke chlna dil meh jgh sa bnata gya. Thaa thoda dar gabhrahat pehli dafa milne ka but usne chutkiyo meh mano nikal diya. Har pal notification awaaz sunkr jo sukoon mila, kab woh meri aadat bngya...",
      "Roz kehti rehti hu saath nhi rehna, lekin thoda sa bhi mere saath badal jao toh mere aasu ka tumhare liye yuh behna... kyuki jaanti hu ladke boht miljyge but tumhare jaisa shyd hi koi mile, kyuki its not about you or me—its about us bby which completes both of us 💙",
    ],
    signoff: "Forever yours,",
    signature: "shona 💙",
  },

  /* Gift 2 — Scratch card */
  scratch: {
    coatingText: "Scratch me ✦",
    label: "Voucher Unlocked:",
    reveal: "I will be saying YES to you for 24 hours! 🎟️💙",
    validity: "Valid for 24 hrs ",
  },

  /* Gift 3 — Handmade craft card */
  craft: {
    cover: "Made by hand, with love",
    waterfallPhotos: [17, 18, 19, 20], // Photos 17, 18, 19, 20
    pullTab: "Pull Tab ↓",
    pushBack: "Push back ↑",
    envelopeLabel: "Open me",
    shayariTitle: "",
    shayari: [
      "Thanku Aryan for every moment,",
      "from instant replies to come just by a single call,",
      "to each flower and gift you have given me, to every single moment we have spent together,",
      "you deserve so much happiness,",
      "babaji tenu thodi sadbudhi bhi de",
      "vaaki tu boht pyaara baccha heh mera ",
      "this year becomes so special for me because I got to spend it with you,",
      "I am so grateful for your presence in my life,",
      "I love you so much 💙",
      "Enjoy your birthday bby",
      "may god bless you with all the happiness and love in the world,",
    ],
  },

  /* Gift 4 — The "Double" card */
  double: {
    photo: 15, // Photo 21
    cover: "Open me (twice, obviously)",
    message: "Teko har cheez do baar chahiye hoti hai na? Le, Happy Birthday once again! 🎉🎂",
    wishTitle: "Birthday wish #2",
    wish: "bhagwaani aapki saari khwahishen poori karein, aap hamesha khush rahein aur aapki zindagi mein hamesha pyaar aur sukoon bana rahe 💙",
  },

  /* Gift 5 — special one */
  surprise: {
    afterOpenBubble: "Go go go! Look around 🙈💙", // what she says after the box opens
    shakeHint: "Tap to shake…",
    reveal: "Look around you ",
  },
};

/* ---------------- Chapter 5 — Outro ---------------- */
export const outro = {
  message: "I hope accha laga ho ❤️ I love you! Ab party dene ke liye ready ho jao, kal milte hain! 🥂✨",
  signature: "— your nidhi 💙",
  collagePhotos: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 20, 21],
};

/* ---------------- Progress bar chapter names ---------------- */
export const chapterNames = ["Wish", "Cake", "Memories", "Gifts", "Forever"];