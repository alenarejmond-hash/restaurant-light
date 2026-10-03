import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Utensils, Search, X, Sparkles, Bell, Receipt, Banknote, CreditCard
} from 'lucide-react';

const translations = {
  am: {
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Մենյու և Պատվերներ",
    echmiadzin: "Երևան",
    sacredCity: "• Հայաստանի սիրտը • Հայկական ավանդույթների օջախ",
    heroTitle: "Ավանդական հայկական խոհանոց",
    heroDesc: "Ժամանակակից հայկական հյուրընկալության ձևաչափ. ընտրեք ուտեստները առանց շտապելու, իսկ մենք սիրով կհոգանք մանրամասների մասին:",
    table: "Սեղան",
    searchPlaceholder: "Որոնել ուտեստներ...",
    callWaiter: "Կանչել մատուցողին",
    requestBill: "Խնդրել հաշիվը",
    nothingFound: "Ոչինչ չի գտնվել",
    resetFilters: "Մաքրել որոնումը",
    prepTime: "Պատրաստման ժամանակ",
    portion: "Չափաբաժին",
    energy: "Էներգիա",
    cost: "Արժեք",
    addToCart: "Ավելացնել",
    inStopList: "Ստոպ-լիստում է",
    cartTitle: "Զամբյուղ",
    cartEmpty: "Զամբյուղը դատարկ է",
    clear: "Մաքրել",
    recommendations: "Այս ուտեստի հետ հաճախ վերցնում են...",
    itemsInCart: "Ապրանքներ պատվերում:",
    totalToPay: "Ընդամենը վճարման:",
    sendOrder: "Ձևակերպել պատվերը",
    confirmOrder: "Հաստատել պատվերը",
    orderConfirmed: "Շնորհակալություն: Պատվերն ընդունված է:",
    orderConfirmedSub: "Մատուցողը շուտով կմոտենա հաստատելու համար:",
    cash: "Կանխիկ",
    card: "Քարտով",
    billRequested: "Հաշիվը պահանջված է",
    waiterCalled: "Մատուցողը շուտով կմոտենա",
    guestName: "Անուն (կամընտիր):",
    guestPhone: "Հեռախոս (կամընտիր):",
    payOnReceipt: "Պատվերի ընդհանուր գումարը՝",
    backToMenu: "Վերադառնալ մենյու",
    loading: "Բեռնվում է մենյուն...",
    ingredients: "Բաղադրությունը",
    commentPlaceholder: "Հատուկ ցանկություններ (օրինակ՝ առանց սոխի)...",
    pleaseWait: "Խնդրում ենք սպասել 1 րոպե նախքան կրկին փորձելը"
  },
  ru: {
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Меню & Заказ к столику",
    echmiadzin: "Ереван",
    sacredCity: "• Сердце Армении • Очаг армянских традиций",
    heroTitle: "Традиционная армянская кухня",
    heroDesc: "Современный формат армянского гостеприимства: выберите блюда без спешки, а мы с любовью позаботимся о деталях.",
    table: "Стол",
    searchPlaceholder: "Поиск блюд (кюфта, вино...)",
    callWaiter: "Позвать официанта",
    requestBill: "Попросить счет",
    nothingFound: "Ничего не найдено",
    resetFilters: "Сбросить поиск",
    prepTime: "Время готовки",
    portion: "Порция",
    energy: "Энергия",
    cost: "Стоимость",
    addToCart: "В заказ",
    inStopList: "В стоп-листе",
    cartTitle: "Корзина",
    cartEmpty: "Ваша корзина пуста",
    clear: "Очистить",
    recommendations: "С этим блюдом часто берут...",
    itemsInCart: "Позиций в заказе:",
    totalToPay: "Итого к оплате:",
    sendOrder: "Оформить заказ",
    confirmOrder: "Подтвердить и заказать",
    orderConfirmed: "Спасибо! Ваш заказ передан на кухню",
    orderConfirmedSub: "Официант скоро подойдет к вашему столику для подтверждения.",
    cash: "Наличными",
    card: "Картой",
    billRequested: "Счет запрошен",
    waiterCalled: "Официант скоро подойдет",
    guestName: "Имя гостя (по желанию):",
    guestPhone: "Телефон (по желанию):",
    payOnReceipt: "Сумма заказа:",
    backToMenu: "Вернуться в меню",
    loading: "Загружаем меню...",
    ingredients: "Состав",
    commentPlaceholder: "Особые пожелания (например, без лука)...",
    pleaseWait: "Подождите 1 минуту перед повторным действием"
  },
  en: {
    bistroTitle: "Arev & Lusin",
    bistroSubtitle: "QR Menu & Table Ordering",
    echmiadzin: "Yerevan",
    sacredCity: "• Heart of Armenia • Hearth of Traditions",
    heroTitle: "Traditional Armenian Cuisine",
    heroDesc: "Modern Armenian hospitality: choose your dishes without rushing, and we will lovingly take care of the details.",
    table: "Table",
    searchPlaceholder: "Search dishes...",
    callWaiter: "Call Waiter",
    requestBill: "Request Bill",
    nothingFound: "Nothing found",
    resetFilters: "Reset Search",
    prepTime: "Prep Time",
    portion: "Portion",
    energy: "Calories",
    cost: "Price",
    addToCart: "Add",
    inStopList: "Sold Out",
    cartTitle: "Your Order",
    cartEmpty: "Cart is empty",
    clear: "Clear",
    recommendations: "Frequently bought with...",
    itemsInCart: "Items in order:",
    totalToPay: "Total to pay:",
    sendOrder: "Place Order",
    confirmOrder: "Confirm Order",
    orderConfirmed: "Thank you! Order sent to kitchen",
    orderConfirmedSub: "A waiter will approach your table shortly for confirmation.",
    cash: "Cash",
    card: "Card",
    billRequested: "Bill requested",
    waiterCalled: "Waiter is on the way",
    guestName: "Name (optional):",
    guestPhone: "Phone (optional):",
    payOnReceipt: "Order total:",
    backToMenu: "Back to Menu",
    loading: "Loading menu...",
    ingredients: "Ingredients",
    commentPlaceholder: "Special requests (e.g., no onion)...",
    pleaseWait: "Please wait 1 minute before trying again"
  }
};

const DEFAULT_MENU_ITEMS = [
  {
    id: 'ech-1',
    category: { am: 'Տաք ուտեստներ', ru: 'Горячие блюда', en: 'Hot Dishes' },
    name: { am: 'Էջմիածնի Քյուֆթա', ru: 'Эчмиадзинская Кюфта', en: 'Echmiadzin Kyufta' },
    description: {
      am: 'Ավանդական հորթի միս հարած կարագով և կոնյակի բույրով:',
      ru: 'Аутентичная отбивная телятина со взбитым сливочным маслом и коньячным ароматом.',
      en: 'Authentic beaten veal with whipped butter and a hint of cognac.'
    },
    ingredients: {
      am: 'Հորթի միս, կարագ, կոնյակ, համեմունքներ',
      ru: 'Телятина, сливочное масло, коньяк, специи',
      en: 'Veal, butter, cognac, spices'
    },
    price: 4800,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    available: true
  }
];

const GAS_URL = 'https://script.google.com/macros/s/AKfycby29WaGAD_WXxqR0AeuJoZeYNBgKjtqM1Cux_DokyXdLntOPIsSqlOpm7Qdqa58qlHk/exec';
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR7aG9BHAurqx0JEVdx8HzzUxnagGD5qD08Dx-P5s_ZFslC7mttzvtTZ96-fSrck094TbnORF5zuv5N/pub?output=csv';

const formatImageUrl = (url) => {
  if (!url) return '';
  const str = String(url).trim();
  const driveMatch = str.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }
  return str;
};

function parseCSV(str) {
  const arr = [];
  let quote = false;
  let row = 0, col = 0;
  for (let c = 0; c < str.length; c++) {
    let cc = str[c], nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || '';
    if (cc === '"' && quote && nc === '"') { arr[row][col] += cc; ++c; continue; }
    if (cc === '"') { quote = !quote; continue; }
    if (cc === ',' && !quote) { ++col; continue; }
    if (cc === '\r' && nc === '\n' && !quote) { ++row; col = 0; ++c; continue; }
    if (cc === '\n' && !quote) { ++row; col = 0; continue; }
    if (cc === '\r' && !quote) { ++row; col = 0; continue; }
    arr[row][col] += cc;
  }
  return arr;
}

export default function App() {
  const [lang, setLang] = useState('am'); 
  const tLang = translations[lang];

  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoryId, setActiveCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [tableNumber, setTableNumber] = useState('1');

  const [showBillModal, setShowBillModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  
  const isManualScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const triggerHaptic = (type = 'light') => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      if (type === 'light') window.navigator.vibrate(40);
      if (type === 'medium') window.navigator.vibrate(80);
      if (type === 'heavy') window.navigator.vibrate([40, 40, 40]);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleCallWaiter = async () => {
    const now = Date.now();
    const lastCall = parseInt(localStorage.getItem('ech_last_waiter') || '0', 10);
    if (now - lastCall < 60000) {
      showToast(tLang.pleaseWait);
      return;
    }
    localStorage.setItem('ech_last_waiter', now.toString());

    triggerHaptic('medium');
    showToast(tLang.waiterCalled);
    try {
      await fetch(GAS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify({ type: 'waiter', table: tableNumber }) 
      });
    } catch (e) { console.error('Webhook error:', e); }
  };

  const handleRequestBill = async (method) => {
    const now = Date.now();
    const lastCall = parseInt(localStorage.getItem('ech_last_bill') || '0', 10);
    if (now - lastCall < 60000) {
      showToast(tLang.pleaseWait);
      setShowBillModal(false);
      return;
    }
    localStorage.setItem('ech_last_bill', now.toString());

    triggerHaptic('medium');
    showToast(`${tLang.billRequested} (${method === 'cash' ? tLang.cash : tLang.card})`);
    setShowBillModal(false);
    try {
      await fetch(GAS_URL, { 
        method: 'POST', 
        mode: 'no-cors',
        body: JSON.stringify({ type: 'bill', table: tableNumber, method: method }) 
      });
    } catch (e) { console.error('Webhook error:', e); }
  };

  useEffect(() => {
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      document.head.appendChild(metaViewport);
    }
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';

    const preventGesture = (e) => e.preventDefault();
    const preventPinchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('gesturestart', preventGesture);
    document.addEventListener('touchmove', preventPinchZoom, { passive: false });

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlTable = urlParams.get('table');
      if (urlTable && urlTable.trim().length > 0) {
        setTableNumber(urlTable.trim());
      } else {
        const saved = localStorage.getItem('ech_table_no');
        if (saved) setTableNumber(saved);
        else setTableNumber('1');
      }
    } catch (e) { console.warn('URL parsing fallback:', e); }

    const fetchMenuData = async () => {
      try {
        const res = await fetch(CSV_URL);
        const text = await res.text();
        const parsed = parseCSV(text);
        
        if (parsed.length > 1) {
          const headers = parsed[0].map(h => h ? h.trim().toLowerCase() : '');
          
          const getIdx = (...names) => {
            for (let name of names) {
              const idx = headers.findIndex(h => h === name.toLowerCase());
              if (idx !== -1) return idx;
            }
            return -1;
          };
          
          const clean = (val) => {
            if (val === undefined || val === null) return '';
            const str = String(val).trim();
            if (str.includes('#VALUE!') || str.includes('#N/A') || str.includes('#REF!') || str.includes('#ERROR!')) return '';
            return str;
          };
          
          const fetchedItems = [];
          for (let i = 1; i < parsed.length; i++) {
            const row = parsed[i];
            if (!row) continue; 
            
            const nameAm = clean(row[getIdx('название_am', 'название am')]);
            const nameRu = clean(row[getIdx('название_ru', 'название ru', 'название')]);
            const nameEn = clean(row[getIdx('название_en', 'название en', 'name')]);
            
            if (!nameAm && !nameRu && !nameEn) continue; 
            
            const catAm = clean(row[getIdx('категория_am', 'категория am')]) || 'Այլ';
            const catRu = clean(row[getIdx('категория_ru', 'категория ru', 'категория')]) || 'Разное';
            const catEn = clean(row[getIdx('категория_en', 'категория en', 'category')]) || 'Other';
            
            const availableStr = clean(row[getIdx('наличие')]) || 'TRUE';
            const isAvailable = availableStr.toUpperCase() !== 'FALSE' && availableStr.toUpperCase() !== 'ЛОЖЬ';
            
            fetchedItems.push({
              id: clean(row[getIdx('id')]) || `item-${i}`,
              category: { am: catAm, ru: catRu, en: catEn },
              name: { am: nameAm, ru: nameRu, en: nameEn },
              description: { 
                am: clean(row[getIdx('описание_am', 'описание am', 'նկարագրություն')]), 
                ru: clean(row[getIdx('описание_ru', 'описание ru', 'описание')]), 
                en: clean(row[getIdx('описание_en', 'описание en', 'description')]) 
              },
              ingredients: { 
                am: clean(row[getIdx('состав_am', 'состав am', 'բաղադրություն', 'состав', 'ингредиенты', 'ingredients', 'состав ru', 'состав_ru')]), 
                ru: clean(row[getIdx('состав_ru', 'состав ru', 'состав', 'ингредиенты', 'ingredients')]), 
                en: clean(row[getIdx('состав_en', 'состав en', 'ingredients', 'состав')]) 
              },
              price: parseInt(clean(row[getIdx('цена')]).replace(/\D/g, '')) || 0,
              image: formatImageUrl(clean(row[getIdx('фото_url', 'фото url', 'фото')])),
              available: isAvailable
            });
          }
          setMenuItems(fetchedItems.length > 0 ? fetchedItems : DEFAULT_MENU_ITEMS);
        }
      } catch (e) {
        console.error('Failed to fetch menu:', e);
        setMenuItems(DEFAULT_MENU_ITEMS); 
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMenuData();

    return () => {
      document.removeEventListener('gesturestart', preventGesture);
      document.removeEventListener('touchmove', preventPinchZoom);
    };
  }, []);

  useEffect(() => {
    if (showBillModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'manipulation';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'manipulation';
    };
  }, [showBillModal]);

  const groupedItems = useMemo(() => {
    let items = menuItems;
    
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item => {
        return (item.name.am || '').toLowerCase().includes(q) ||
               (item.name.ru || '').toLowerCase().includes(q) ||
               (item.name.en || '').toLowerCase().includes(q);
      });
    }

    const groups = {};
    items.forEach(item => {
      const catId = 'cat-' + (item.category.en || 'other').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!groups[catId]) {
        groups[catId] = { id: catId, category: item.category, items: [] };
      }
      groups[catId].items.push(item);
    });

    const getSortWeight = (catEn) => {
      const str = (catEn || '').toLowerCase();
      if (str.includes('appetizer') || str.includes('snack') || str.includes('starter') || str.includes('закуски')) return 1; 
      if (str.includes('hot') || str.includes('горячие')) return 2; 
      if (str.includes('grill') || str.includes('bbq') || str.includes('khorovats') || str.includes('мангал')) return 3; 
      if (str.includes('bread') || str.includes('bakery') || str.includes('lavash') || str.includes('выпечка')) return 4; 
      if (str.includes('dessert') || str.includes('sweet') || str.includes('десерты')) return 5; 
      if (str.includes('drink') || str.includes('beverage') || str.includes('wine') || str.includes('напитки')) return 6; 
      return 99; 
    };

    return Object.values(groups).sort((a, b) => {
      const weightA = getSortWeight(a.category.en);
      const weightB = getSortWeight(b.category.en);
      if (weightA !== weightB) return weightA - weightB;
      return (a.category[lang] || '').localeCompare(b.category[lang] || '');
    });
  }, [menuItems, searchQuery, lang]);

  useEffect(() => {
    if (groupedItems.length > 0 && !activeCategoryId && !searchQuery) {
      setActiveCategoryId(groupedItems[0].id);
    }

    const handleScroll = () => {
      if (isManualScroll.current) return; 
      
      const sections = document.querySelectorAll('[data-category-section]');
      let currentId = null;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 140) {
          currentId = section.getAttribute('id');
        }
      });

      if (currentId && currentId !== activeCategoryId) {
        setActiveCategoryId(currentId);
        const tab = document.getElementById(`tab-${currentId}`);
        if (tab) {
          tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategoryId, groupedItems, searchQuery]);

  const scrollToCategory = (catId) => {
    setActiveCategoryId(catId);
    isManualScroll.current = true;
    
    const tab = document.getElementById(`tab-${catId}`);
    if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    const section = document.getElementById(catId);
    if (section) {
      const y = section.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isManualScroll.current = false;
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans antialiased selection:bg-[#C8A97E] selection:text-black pb-28">
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
        * { touch-action: manipulation !important; }
        .font-sans { font-family: 'Montserrat', sans-serif !important; }
        
        body { background-color: #050505; }
        
        @keyframes fadeUp { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes skeletonShimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        
        .skeleton-loader { position: relative; overflow: hidden; background-color: rgba(255, 255, 255, 0.03); }
        .skeleton-loader::after {
          content: ''; position: absolute; top: 0; right: 0; bottom: 0; left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(90deg, rgba(255,255,255, 0) 0, rgba(255,255,255, 0.04) 20%, rgba(255,255,255, 0.04) 60%, rgba(255,255,255, 0) 100%);
          animation: skeletonShimmer 1.5s infinite;
        }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
        html, body { -webkit-text-size-adjust: 100%; overscroll-behavior-y: none; }
      `}} />

      {toastMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-[92vw] max-w-md bg-[#C8A97E] text-[#050505] px-5 py-3 rounded-2xl sm:rounded-full font-semibold shadow-xl shadow-[#C8A97E]/20 flex items-center justify-center gap-3 animate-fade-up text-[12px] sm:text-sm leading-tight text-center">
          <Sparkles className="w-4 h-4 text-[#050505] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-3xl bg-[#050505]/90 border-b border-white/[0.02] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-5xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
          
          <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-tr from-[#C8A97E]/20 to-transparent border border-[#C8A97E]/30 p-0.5">
              <div className="w-full h-full bg-[#050505] rounded-full flex items-center justify-center">
                 <img src="./logo.png" alt="Logo" className="w-2/3 h-2/3 object-contain" />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-bold text-zinc-100 uppercase tracking-widest truncate">
                  {tLang.bistroTitle}
                </h1>
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#C8A97E] font-medium uppercase tracking-[0.2em] mt-0.5 truncate">{tLang.bistroSubtitle}</p>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <div className="flex bg-[#0F0F0F] rounded-full p-1 border border-white/[0.05] shadow-inner">
              {['am', 'ru', 'en'].map(l => (
                <button
                  key={l} onClick={() => setLang(l)}
                  className={`text-[9px] sm:text-[10px] font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-300 uppercase tracking-wider ${lang === l ? 'bg-[#C8A97E] text-[#050505] shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* Hero Banner (Premium Centered) */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-8 sm:pt-14 sm:pb-10 relative overflow-hidden">
        {/* Cinematic Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] sm:w-[80%] h-64 bg-gradient-to-r from-transparent via-[#C8A97E]/10 to-transparent blur-[80px] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#C8A97E]/40 to-transparent opacity-50"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 text-[9px] sm:text-[10px] font-medium text-[#C8A97E] mb-5 uppercase tracking-[0.25em]">
            <span className="w-6 sm:w-12 h-px bg-[#C8A97E]/40"></span>
            <span>{tLang.echmiadzin}</span>
            <span className="w-6 sm:w-12 h-px bg-[#C8A97E]/40"></span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-4 max-w-3xl drop-shadow-2xl">
            {tLang.heroTitle}
          </h2>
          
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed font-light mb-8">
            {tLang.heroDesc}
          </p>
          
          <div className="flex items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto px-2">
            <button onClick={handleCallWaiter} className="flex-1 sm:flex-none group relative flex items-center justify-center gap-2.5 py-3.5 px-4 sm:px-8 rounded-full bg-[#111111] border border-white/[0.08] hover:border-[#C8A97E]/50 hover:bg-[#161616] transition-all duration-300 active:scale-[0.98] shadow-lg">
              <Bell className="w-4 h-4 sm:w-4 sm:h-4 text-[#C8A97E] group-hover:animate-bounce shrink-0" />
              <span className="text-[10px] sm:text-xs font-semibold text-zinc-200 tracking-wide uppercase whitespace-nowrap">{tLang.callWaiter}</span>
            </button>
            
            <button onClick={() => {
              const now = Date.now();
              const lastCall = parseInt(localStorage.getItem('ech_last_bill') || '0', 10);
              if (now - lastCall < 60000) {
                showToast(tLang.pleaseWait);
              } else {
                setShowBillModal(true);
              }
            }} className="flex-1 sm:flex-none group relative flex items-center justify-center gap-2.5 py-3.5 px-4 sm:px-8 rounded-full bg-[#C8A97E] hover:bg-[#d4b78f] border border-transparent transition-all duration-300 active:scale-[0.98] shadow-[0_0_20px_rgba(200,169,126,0.2)]">
              <Receipt className="w-4 h-4 sm:w-4 sm:h-4 text-[#050505] shrink-0" />
              <span className="text-[10px] sm:text-xs font-bold text-[#050505] tracking-wide uppercase whitespace-nowrap">{tLang.requestBill}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-[64px] sm:top-[77px] z-30 backdrop-blur-3xl bg-[#050505]/95 border-y border-white/[0.03] py-4 mt-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-5xl mx-auto px-4 space-y-4">
          <div className="relative group max-w-md mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-[#C8A97E] transition-colors" />
            <input
              type="text" placeholder={tLang.searchPlaceholder} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-white/[0.06] rounded-full pl-12 pr-10 py-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#C8A97E]/40 focus:bg-[#111111] transition-all font-light shadow-inner"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 bg-[#1A1A1A] rounded-full">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {!searchQuery && (
            <div className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-2 px-2 justify-start sm:justify-center">
              {groupedItems.map((group) => {
                const isSelected = activeCategoryId === group.id;
                return (
                  <button
                    key={group.id}
                    id={`tab-${group.id}`}
                    onClick={() => scrollToCategory(group.id)}
                    className={`whitespace-nowrap px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium transition-all duration-300 flex items-center shrink-0 border ${
                      isSelected
                        ? 'bg-[#C8A97E] text-[#050505] border-transparent shadow-[0_4px_15px_rgba(200,169,126,0.3)] scale-[1.02]'
                        : 'bg-transparent text-zinc-400 hover:text-zinc-200 border-white/[0.05] hover:border-white/[0.15] hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`text-[11px] sm:text-[12px] tracking-wide ${isSelected ? 'font-bold' : 'font-medium'}`}>{group.category[lang] || group.category.am}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Menu */}
      <main className="max-w-5xl mx-auto px-4 mt-4">
        {isLoading ? (
          <div className="space-y-10 sm:space-y-12">
            {[1, 2].map((groupKey) => (
              <div key={groupKey} className="pt-2">
                <div className="h-6 sm:h-8 w-40 sm:w-48 rounded-lg mb-6 skeleton-loader"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {[1, 2, 3].map((itemKey) => (
                    <div key={itemKey} className="rounded-[2rem] overflow-hidden bg-[#0F0F0F] border border-white/[0.03] flex flex-col">
                      <div className="w-full aspect-[4/3] skeleton-loader"></div>
                      <div className="p-5 sm:p-6 -mt-10 relative z-10">
                        <div className="bg-[#141414] p-5 rounded-2xl border border-white/[0.05]">
                           <div className="h-5 w-3/4 rounded mb-3 skeleton-loader"></div>
                           <div className="h-3 w-full rounded mb-2 skeleton-loader"></div>
                           <div className="h-3 w-2/3 rounded skeleton-loader"></div>
                           <div className="mt-5 pt-5 border-t border-white/[0.04] flex justify-between items-center">
                              <div className="h-4 w-16 rounded skeleton-loader"></div>
                              <div className="h-6 w-24 rounded skeleton-loader"></div>
                           </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedItems.length === 0 ? (
          <div className="text-center py-16 bg-[#0F0F0F] rounded-[2rem] border border-dashed border-white/[0.05] p-8 mt-6 shadow-inner">
            <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-zinc-300 tracking-wide">{tLang.nothingFound}</h3>
            <button onClick={() => { setSearchQuery(''); }} className="mt-5 px-6 py-3 bg-white/[0.03] hover:bg-white/[0.08] text-[11px] sm:text-xs font-medium text-zinc-100 rounded-full transition-colors tracking-wide">
              {tLang.resetFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {groupedItems.map((group) => (
              <section key={group.id} id={group.id} data-category-section="true" className="scroll-mt-[140px] pt-4 pb-2 animate-fade-up">
                
                <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-100 mb-6 flex items-center gap-4 px-1 overflow-hidden tracking-tight">
                  <span className="shrink-0">{group.category[lang] || group.category.am}</span>
                  <div className="flex-1 h-px bg-white/[0.05] mt-1 min-w-[20px]"></div>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {group.items.map((dish) => {
                    const isUnavailable = !dish.available;

                    return (
                      <div
                        key={dish.id}
                        className={`group relative rounded-[2rem] overflow-hidden transition-all duration-500 bg-[#0C0C0C] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)] h-full flex flex-col ${
                          isUnavailable
                            ? 'opacity-60 grayscale-[50%]'
                            : 'hover:border-[#C8A97E]/30 hover:shadow-[0_25px_50px_rgba(200,169,126,0.15)] hover:-translate-y-1'
                        }`}
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#050505] shrink-0">
                          <img src={dish.image} alt={dish.name[lang] || dish.name.am} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-transparent to-transparent opacity-90" />

                          {isUnavailable && (
                            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                              <span className="px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/10 text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest">{tLang.inStopList}</span>
                            </div>
                          )}
                        </div>

                        {/* Card Content overlap design */}
                        <div className="p-4 sm:p-5 flex flex-col relative z-10 -mt-12 sm:-mt-14 flex-1">
                          <div className="bg-[#161616] p-5 sm:p-6 rounded-2xl border border-white/[0.06] shadow-[0_5px_30px_rgba(0,0,0,0.8)] flex-1 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-base sm:text-lg font-semibold text-zinc-100 group-hover:text-[#C8A97E] transition-colors tracking-tight leading-snug">
                                {dish.name[lang] || dish.name.am}
                              </h3>
                              <p className="text-xs sm:text-sm text-zinc-400 mt-2.5 leading-relaxed font-light">
                                {dish.description[lang] || dish.description.am}
                              </p>
                              
                              {(dish.ingredients?.[lang] || dish.ingredients?.am) && (
                                <p className="text-[11px] sm:text-xs text-zinc-500 mt-4 leading-relaxed font-light">
                                  <span className="text-zinc-300 mr-1.5 font-medium">{tLang.ingredients}:</span>
                                  {dish.ingredients[lang] || dish.ingredients.am}
                                </p>
                              )}
                            </div>

                            <div className="mt-5 pt-5 border-t border-white/[0.04] flex items-end justify-between shrink-0">
                              <div>
                                <div className="text-[9px] sm:text-[10px] text-zinc-500 font-medium uppercase tracking-widest mb-1">{tLang.cost}</div>
                                <div className="text-lg sm:text-xl font-light text-zinc-100">{dish.price.toLocaleString()} <span className="text-sm font-medium text-[#C8A97E]">֏</span></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 text-center pb-6">
        <a 
          href="https://appseapro.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] sm:text-[11px] font-light text-zinc-600 hover:text-zinc-400 transition-colors tracking-widest uppercase"
        >
          Design by Elena Sotnikova
        </a>
      </footer>

      {/* Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-fade-up">
          <div className="bg-[#0F0F0F] border border-white/[0.05] max-w-sm w-full rounded-[2rem] p-7 sm:p-8 shadow-2xl relative text-center">
            <div className="w-14 h-14 rounded-full bg-white/[0.03] text-zinc-300 flex items-center justify-center mx-auto mb-5 border border-white/[0.05]"><Receipt className="w-6 h-6" /></div>
            <h3 className="font-semibold text-lg text-zinc-100 mb-6 tracking-tight">{tLang.requestBill}</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => handleRequestBill('cash')} className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#141414] hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-100 border border-white/[0.03] hover:border-white/[0.08] transition-all active:scale-95">
                <Banknote className="w-7 h-7 text-zinc-300 group-hover:scale-110 transition-transform" /> <span className="text-[11px] sm:text-xs font-medium tracking-wide">{tLang.cash}</span>
              </button>
              <button onClick={() => handleRequestBill('card')} className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-[#141414] hover:bg-white/[0.04] text-zinc-400 hover:text-zinc-100 border border-white/[0.03] hover:border-white/[0.08] transition-all active:scale-95">
                <CreditCard className="w-7 h-7 text-zinc-300 group-hover:scale-110 transition-transform" /> <span className="text-[11px] sm:text-xs font-medium tracking-wide">{tLang.card}</span>
              </button>
            </div>
            <button onClick={() => setShowBillModal(false)} className="mt-6 text-[10px] sm:text-[11px] text-zinc-500 hover:text-zinc-300 p-2 font-medium uppercase tracking-widest transition-colors">Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}