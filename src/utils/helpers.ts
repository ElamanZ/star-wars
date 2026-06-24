export const FALLBACK_AVATAR =  
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#0d1225"/>
          <stop offset="1" stop-color="#1a1f3a"/>
        </linearGradient>
      </defs>
      <rect width="220" height="220" fill="url(#g)"/>
      <circle cx="110" cy="88" r="34" fill="#aeac9e" opacity="0.85"/>
      <path d="M40 200 C40 150, 180 150, 180 200 Z" fill="#ebe5b7" opacity="0.85"/>
      <text x="110" y="218" text-anchor="middle" font-family="Arial,sans-serif"
        font-size="14" fill="#dbdad5" opacity="0.7">No image</text>
    </svg>`
  );

const characterImages = import.meta.glob(
  '/src/assets/characters/*.jpg',
  { eager: true, import: 'default' }
) as Record<string, string>;

const UID_TO_IMAGE: Record<string, string> = {
  "1": "img4.jpg",
  "2": "img2.jpg",
  "3": "img3.jpg",
  "4": "img5.jpg",
  "5": "img6.jpg",
  "6": "img7.jpg", 
  "7": "img8.jpg",
  "8": "img9.jpg",
  "9": "img10.jpg",
  "10": "img1.jpg", 
  "11": "img1.jpg",
  "12": "img1.jpg",
  "13": "img1.jpg",
  "14": "img1.jpg",
  "15": "img1.jpg",
  "16": "img1.jpg",
  "17": "img1.jpg",
"18": "img1.jpg",
  "19": "img1.jpg",
  "20": "img1.jpg",
  "21": "img1.jpg",
  "22": "img2.jpg",
  "23": "img2.jpg",
  "24": "img2.jpg",
   "25": "img6.jpg",
    "26": "img6.jpg",
     "27": "img9.jpg",
      "28": "img9.jpg",
       "29": "img1.jpg", 
        "30": "img1.jpg", 
  "31": "img2.jpg",
  "32": "img6.jpg",
  "33": "img6.jpg",
  "34": "img6.jpg",
  "35": "img6.jpg",
  "36": "img6.jpg",
  "37": "img6.jpg",
  "38": "img6.jpg",
  "40": "img20.jpg", 
  "41": "img20.jpg", 
  "42": "img20.jpg", 
  "43": "img20.jpg", 
  "44": "img20.jpg", 
  "45": "img20.jpg", 
  "46": "img20.jpg", 
  "47": "img20.jpg", 
  "48": "img20.jpg", 
  "49": "img20.jpg", 
  "50": "img20.jpg", 
  "51": "img20.jpg", 
  "52": "img20.jpg", 
  


};

export const getCharacterImageUrl = (uid: string): string => {
  const filename = UID_TO_IMAGE[uid];
  if (!filename) return FALLBACK_AVATAR;
  const key = `/src/assets/characters/${filename}`;
  return characterImages[key] ?? FALLBACK_AVATAR;
};

export const extractIdFromUrl = (url: string): string => {
  if (!url) return "";
  const parts = url.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
};

const GENDER_LABELS: Record<string, string> = {
  male: "Мужской",
  female: "Женский",
  hermaphrodite: "Гермафродит",
  "n/a": "Н/Д",
  none: "Нет",
  unknown: "Неизвестно",
};

export const formatGender = (gender: string): string => {
  const key = (gender ?? "").toLowerCase();
  return GENDER_LABELS[key] ?? gender ?? "—";
};

export const EYE_COLOR_MAP: Record<string, string> = {
  blue: "#3a8dde",
  "blue-gray": "#6f8fab",
  brown: "#6b4423",
  green: "#3aa856",
  hazel: "#8e7136",
  yellow: "#e3c43b",
  orange: "#e08a2b",
  red: "#d23a3a",
  black: "#1a1a1a",
  pink: "#e68fb0",
  gold: "#d4af37",
  amber: "#c98a2b",
  white: "#e8e8e8",
  unknown: "#888",
};

export const GENDER_FILTER_OPTIONS = [
  { value: "all", label: "Все" },
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
  { value: "n/a", label: "Н/Д" },
];
