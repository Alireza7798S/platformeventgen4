import React, { useState } from 'react';
import { 
  LayoutDashboard, Map as MapIcon, Users, Box, Cpu, ArrowRight, X, ChevronRight, 
  MessageSquare, Calendar, MapPin, Zap, Layers, BarChart3, Shield, 
  FileText, Database, LayoutGrid, CheckCircle2, Search, Filter, Settings, Bot,
  Cloud, Clock, Home, User
} from 'lucide-react';

// --- DATA CONSTANTS (Shared) ---
const CRM_DETAIL_CONTENT = {
  hero: {
    title: 'تحول دیجیتال در فروش',
    desc: 'CRM دیگر صرفاً دفترچه تلفن نیست؛ اکوسیستمی هوشمند از فرآیندهای فروش، بازاریابی و خدمات است که با هوش مصنوعی، تصویر ۳۶۰ درجه از مشتری می‌سازد.'
  },
  features: [
    { title: 'خلاصه‌ساز صوتی هوشمند', icon: <Bot />, desc: 'تبدیل مکالمات طولانی به خلاصه متنی و اکشن‌پلن با AI' },
    { title: 'امتیازدهی سرنخ (Lead Scoring)', icon: <BarChart3 />, desc: 'تشخیص هوشمند مشتریان با احتمال خرید بالا' },
    { title: 'یکپارچگی کامل', icon: <Layers />, desc: 'بدون نیاز به لاگین مجدد؛ اتصال کامل به مالی و انبار' }
  ],
  modules: [
    'مدیریت سرنخ‌ها (Leads) و امتیازدهی',
    'مدیریت فرصت‌ها (Pipeline) و پیش‌بینی فروش',
    'تیکتینگ و خدمات پس از فروش یکپارچه',
    'کمپین‌های بازاریابی و سنجش ROI'
  ]
};

const MULTI_COMPANY_CONTENT = {
  hero: {
    title: 'مدیریت یکپارچه هلدینگ‌ها',
    desc: 'چالش اصلی هلدینگ‌ها، مغایرت‌گیری و عدم یکپارچگی اطلاعات است. راهکار چندشرکتی نسل ۴ با مدل داده‌ای Extend، این چالش را برای همیشه حل کرده است.'
  },
  features: [
    { title: 'مدل داده‌ای Extend', icon: <Database />, desc: 'تعریف اطلاعات پایه (مثل کالا یا حساب) در سطح گروه و ارث‌بری در شرکت‌ها' },
    { title: 'صورت‌های مالی تلفیقی', icon: <FileText />, desc: 'حذف معاملات درون‌گروهی و تهیه گزارشات تجمیعی با یک کلیک' },
    { title: 'مدیریت متمرکز خزانه', icon: <Shield />, desc: 'کنترل نقدینگی و جابجایی وجوه بین شرکت‌های زیرمجموعه' }
  ],
  modules: [
    'دفتر کل چندشرکتی با کدینگ شناور',
    'مدیریت تدارکات متمرکز (Central Procurement)',
    'فروش بین‌شرکتی (Intercompany Sales)',
    'گزارش‌ساز تجمیعی هوشمند'
  ]
};

const ASSISTANT_CONTENT = {
  hero: {
    title: 'هوش مصنوعی؛ همکار جدید شما',
    desc: 'دستیار دیجیتال فقط یک چت‌بات نیست؛ یک ایجنت هوشمند است که می‌تواند دستورات صوتی شما را اجرا کند، گزارش بسازد و فرآیندها را خودکار کند.'
  },
  features: [
    { title: 'پردازش زبان طبیعی (NLP)', icon: <MessageSquare />, desc: 'درک دستورات فارسی مثل "فروش امروز چقدر بود؟"' },
    { title: 'خودکارسازی (RPA)', icon: <Zap />, desc: 'انجام کارهای تکراری مثل ثبت فاکتور از روی عکس یا اکسل' },
    { title: 'تحلیل داده (Insights)', icon: <BarChart3 />, desc: 'کشف الگوهای پنهان در داده‌ها و هشدار ناهنجاری‌ها' }
  ],
  modules: [
    'چت با داده‌ها (Chat with Data)',
    'ورود اطلاعات صوتی و متنی',
    'پیشنهاددهنده هوشمند (Recommendation Engine)',
    'شناسایی و تصحیح خطاها'
  ]
};

const WORKSHOPS_DATA = [
  {
    id: 1,
    title: 'کارگاه تخصصی چند‌شرکتی',
    time: '۱۴:۳۰ - ۱۶:۰۰',
    loc: 'سالن حافظ',
    capacity: 45,
    registered: 32,
    desc: 'چالش‌های مالی و لجستیکی در هلدینگ‌ها و نحوه رفع آن‌ها با راهکاران آینده.',
    icon: <Layers className="md:text-pink-400" size={24} />,
    hasDetail: true,
    detailContent: MULTI_COMPANY_CONTENT
  },
  {
    id: 2,
    title: 'کارگاه دستیار دیجیتال هوشمند',
    time: '۱۶:۳۰ - ۱۸:۰۰',
    loc: 'سالن سعدی',
    capacity: 30,
    registered: 28,
    desc: 'چگونه با هوش مصنوعی صحبت کنیم؟ آموزش عملی کار با دستیار دیجیتال.',
    icon: <Bot className="md:text-purple-400" size={24} />,
    hasDetail: true,
    detailContent: ASSISTANT_CONTENT
  },
  {
    id: 3,
    title: 'کارگاه CRM و تجربه مشتری',
    time: '۱۴:۳۰ - ۱۶:۰۰',
    loc: 'سالن مولانا',
    capacity: 60,
    registered: 12,
    desc: 'مدیریت چرخه عمر مشتری از Lead تا وفاداری. نمایش زنده (Live Demo).',
    icon: <Users className="md:text-blue-400" size={24} />,
    hasDetail: true,
    detailContent: CRM_DETAIL_CONTENT
  }
];

const AGENDA_STORY = [
  { time: '۰۸:۳۰', title: 'پذیرش و شبکه‌سازی', desc: 'صرف صبحانه و آشنایی با همکاران صنعت', icon: <Users size={20} /> },
  { time: '۰۹:۳۰', title: 'افتتاحیه: آینده هوشمند', desc: 'سخنرانی کلیدی مدیرعامل درباره چشم‌انداز نسل ۴', icon: <Zap size={20} /> },
  { time: '۱۰:۴۵', title: 'رونمایی از فانوس', desc: 'معرفی دیزاین سیستم جدید و تجربه کاربری مدرن', icon: <LayoutGrid size={20} /> },
  { time: '۱۲:۰۰', title: 'ناهار و بازدید از غرفه‌ها', desc: 'فرصت بازدید از دموهای حضوری در لابی', icon: <MapPin size={20} /> },
  { time: '۱۴:۰۰', title: 'شروع کارگاه‌های تخصصی', desc: 'انتخاب مسیر یادگیری (مالی، تکنولوژی یا فروش)', icon: <Layers size={20} /> },
];

const PILLARS = [
  { id: 'ai', title: 'هوش مصنوعی', icon: <Cpu size={24} />, color: 'from-purple-500 to-indigo-500', shortDesc: 'گذر از ERP منفعل به سیستم هوشمند' },
  { id: 'cloud', title: 'ابری (Cloud-Native)', icon: <Cloud size={24} />, color: 'from-blue-500 to-cyan-500', shortDesc: 'معماری مدرن بر پایه کوبرنتیز' },
  { id: 'multi', title: 'چند شرکتی', icon: <Layers size={24} />, color: 'from-emerald-500 to-teal-500', shortDesc: 'مدیریت یکپارچه هلدینگ‌ها' },
  { id: 'user', title: 'تجربه کاربری', icon: <Users size={24} />, color: 'from-rose-500 to-pink-500', shortDesc: 'دیزاین سیستم فانوس' }
];

const MODULES = [
  { id: 'gl', name: 'دفتر کل', icon: <FileText size={20} /> },
  { id: 'crm', name: 'CRM', icon: <Users size={20} />, highlight: true },
  { id: 'warehouse', name: 'انبار', icon: <Box size={20} /> },
  { id: 'sales', name: 'فروش', icon: <Zap size={20} /> },
  { id: 'hr', name: 'جبران خدمات', icon: <Shield size={20} /> },
  { id: 'assist', name: 'دستیار', icon: <Bot size={20} /> },
];

// --- STYLES ---
const mobileGlassCard = "bg-[#0f172a]/50 backdrop-blur-xl border border-white/10 shadow-lg rounded-2xl";
const desktopCard = "md:bg-white/5 md:border md:border-white/10 md:rounded-2xl md:backdrop-blur-none md:shadow-none";
const glassNavStyle = "bg-[#020617]/85 backdrop-blur-2xl border-t border-white/10"; // Defined here

// --- SUB-COMPONENTS ---

const SidebarItem = ({ id, label, icon, active, onClick }) => (
  <button 
    onClick={() => onClick(id)}
    className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 border-l-4 ${
      active 
        ? 'bg-white/10 border-blue-400 text-white' 
        : 'border-transparent text-slate-400 hover:text-white hover:bg-white/5'
    }`}
  >
    {icon}
    <span className="font-medium text-base">{label}</span>
    {active && <ChevronRight className="mr-auto opacity-50" size={16} />}
  </button>
);

const TimelineItem = ({ item }) => (
  <div className="relative flex items-start gap-4 mb-8 group">
    {/* Time Bubble */}
    <div className="w-14 flex-shrink-0 flex justify-center mt-1">
      <div className="px-2 py-1 rounded-full bg-slate-900/50 text-cyan-300 md:text-blue-300 text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.6)] md:shadow-none backdrop-blur-sm border border-cyan-400/30 md:border-blue-500/30">
        {item.time}
      </div>
    </div>

    {/* Dot on Line */}
    <div className="absolute right-[3.35rem] top-3 w-3 h-3 rounded-full bg-cyan-400 md:bg-blue-500 shadow-[0_0_10px_rgba(34,211,238,0.8)] md:shadow-none ring-4 ring-slate-900/50 z-10"></div>

    {/* Content Card */}
    <div className={`flex-1 ${mobileGlassCard} ${desktopCard} p-4 transition-transform active:scale-[0.98] mr-8 md:hover:bg-white/10 md:active:scale-100`}>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20 text-cyan-100 md:text-blue-300">
          {item.icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm md:text-lg mb-1">{item.title}</h3>
          <p className="text-xs md:text-sm text-gray-300 md:text-slate-400 leading-relaxed font-light">{item.desc}</p>
        </div>
      </div>
    </div>
  </div>
);

const OverviewSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom duration-700 px-4 pb-24 md:pb-0 md:px-0">
    <h2 className="hidden md:block text-3xl font-bold mb-2 text-white">مسیر رویداد امروز</h2>
    <p className="hidden md:block text-slate-400 mb-10">یک سفر یک‌روزه به آینده تکنولوژی سازمانی</p>

    <div className="relative max-w-lg mx-auto md:mx-0 md:max-w-none md:border-r md:border-slate-700 md:mr-4 md:pr-8">
      {/* Vertical Line (Mobile) */}
      <div className="md:hidden absolute right-[3.65rem] top-4 bottom-0 w-0.5 bg-cyan-400/30 z-0"></div>
      
      {AGENDA_STORY.map((item, idx) => (
        <TimelineItem key={idx} item={item} />
      ))}
    </div>
  </div>
);

const MapSection = () => (
  <div className="animate-in fade-in zoom-in duration-500 h-full px-4 pb-24 md:pb-0 md:px-0 flex flex-col items-center md:items-stretch md:h-auto">
    <h2 className="hidden md:block text-3xl font-bold mb-6 text-white">نقشه محل برگزاری</h2>

    <div className={`w-full max-w-lg md:max-w-none aspect-[4/3] md:aspect-video ${mobileGlassCard} md:bg-slate-800/50 md:border-white/10 p-4 md:p-8 relative overflow-hidden flex items-center justify-center mb-6 md:flex-1`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-20"></div>
      
      {/* Schematic Map */}
      <div className="relative w-full h-full md:max-w-2xl bg-[#001529]/80 md:bg-[#001529] rounded-xl border border-white/10 md:border-slate-600 md:shadow-2xl p-2 md:p-4 grid grid-cols-4 grid-rows-4 md:grid-rows-3 gap-2 md:gap-4">
        <div className="col-span-2 row-span-2 bg-blue-600/30 md:bg-blue-900/40 border border-blue-400/30 md:border-blue-500/30 rounded-lg flex items-center justify-center text-[10px] md:text-lg text-blue-200 md:text-blue-300 font-bold md:group md:hover:bg-blue-900/60 md:transition cursor-pointer">
          <div className="text-center">
            <span>سالن اصلی</span>
            <div className="hidden md:block text-xs text-blue-400 font-normal">سخنرانی‌ها</div>
          </div>
        </div>
        <div className="col-span-2 row-span-1 md:col-span-1 md:row-span-1 bg-purple-600/30 md:bg-purple-900/40 border border-purple-400/30 md:border-purple-500/30 rounded-lg flex items-center justify-center text-[10px] md:text-xs text-purple-200 md:text-purple-300 md:font-bold">کارگاه ۱ (حافظ)</div>
        <div className="col-span-2 row-span-1 md:col-span-1 md:row-span-1 bg-purple-600/30 md:bg-purple-900/40 border border-purple-400/30 md:border-purple-500/30 rounded-lg flex items-center justify-center text-[10px] md:text-xs text-purple-200 md:text-purple-300 md:font-bold">کارگاه ۲ (سعدی)</div>
        <div className="col-span-4 row-span-2 md:row-span-1 bg-emerald-600/30 md:bg-emerald-900/40 border border-emerald-400/30 md:border-emerald-500/30 rounded-lg flex items-center justify-center text-[10px] md:text-base text-emerald-200 md:text-emerald-300 md:font-bold">نمایشگاه و غرفه‌ها</div>
      </div>

      <div className="absolute bottom-4 right-4 bg-black/60 md:bg-black/80 backdrop-blur px-3 md:px-4 py-1 md:py-2 rounded-full border border-white/10 md:border-white/20 text-[10px] md:text-xs text-gray-300 flex items-center gap-2">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 md:bg-blue-500 animate-pulse"></div>
        <span className="md:hidden">موقعیت شما</span>
        <span className="hidden md:inline">شما اینجا هستید (لابی ورودی)</span>
      </div>
    </div>
    
    <div className="text-center max-w-xs md:hidden">
      <h3 className="text-white font-bold mb-2">نقشه هوشمند رویداد</h3>
      <p className="text-xs text-gray-400">برای مشاهده جزئیات هر بخش، روی نقشه ضربه بزنید.</p>
    </div>
  </div>
);

const WorkshopsSection = ({ onOpenDetail }) => (
  <div className="animate-in fade-in slide-in-from-bottom duration-700 px-4 pb-24 md:pb-0 md:px-0">
    <h2 className="hidden md:block text-3xl font-bold mb-2 text-white">کارگاه‌های تخصصی</h2>
    <p className="hidden md:block text-slate-400 mb-10">یادگیری عمیق مفاهیم نسل ۴</p>

    <div className="grid gap-4 max-w-lg mx-auto md:max-w-none md:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {WORKSHOPS_DATA.map((ws) => (
        <div key={ws.id} className={`${mobileGlassCard} ${desktopCard} p-5 md:p-6 relative overflow-hidden group flex flex-col md:hover:border-blue-500/50 md:transition-all md:hover:translate-y-1`}>
          {/* Desktop Background Icon */}
          <div className="hidden md:block absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            {ws.icon}
          </div>

          <div className="flex justify-between items-start mb-4 md:block">
            <div className="p-2.5 bg-white/5 rounded-xl text-cyan-300 md:text-white border border-white/10 md:mb-4 md:w-fit md:border-none md:bg-transparent md:p-0">
              {ws.icon}
            </div>
            <div className="md:hidden text-[10px] font-mono bg-black/40 px-2 py-1 rounded-md text-gray-300 border border-white/5">
              {ws.time}
            </div>
          </div>
          
          <h3 className="font-bold text-white text-lg md:text-xl mb-2 md:leading-tight md:min-h-[3.5rem]">{ws.title}</h3>
          
          <div className="hidden md:flex items-center gap-4 text-xs text-slate-400 mb-4 font-mono">
            <span className="flex items-center gap-1"><Clock size={12}/> {ws.time}</span>
            <span className="flex items-center gap-1"><MapPin size={12}/> {ws.loc}</span>
          </div>

          <p className="text-xs md:text-sm text-gray-400 md:text-slate-300 leading-relaxed mb-4 md:mb-6 line-clamp-2 md:flex-1">{ws.desc}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5 md:border-none md:pt-0 md:block">
            <div className="flex -space-x-2 space-x-reverse md:hidden">
              {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full bg-slate-700 border-2 border-[#0f172a] flex items-center justify-center text-[8px] text-white">
                  <User size={12} />
                </div>
              ))}
              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-[#0f172a] flex items-center justify-center text-[8px] text-white">
                +{ws.registered}
              </div>
            </div>

            {/* Desktop Capacity Bar */}
            <div className="hidden md:block">
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>تکمیل ظرفیت</span>
                <span>{Math.round((ws.registered / ws.capacity) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mb-4 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${ws.registered/ws.capacity > 0.8 ? 'bg-red-500' : 'bg-green-500'}`} 
                  style={{ width: `${(ws.registered / ws.capacity) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              onClick={() => ws.hasDetail && onOpenDetail(ws)}
              className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-4 py-1.5 rounded-lg text-xs font-bold transition border border-cyan-500/30 md:w-full md:py-2.5 md:flex md:items-center md:justify-center md:gap-2 md:bg-blue-600 md:text-white md:border-blue-500 md:hover:bg-blue-500 md:shadow-lg md:shadow-blue-900/20"
            >
              {ws.hasDetail ? <span className="md:hidden">جزئیات</span> : <span className="md:hidden">تکمیل</span>}
              <span className="hidden md:inline">{ws.hasDetail ? 'جزئیات و ثبت‌نام' : 'اطلاعات بیشتر'}</span>
              {ws.hasDetail && <ArrowRight size={14} className="hidden md:block rotate-180"/>}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ProductSection = () => (
  <div className="animate-in fade-in slide-in-from-bottom duration-700 px-4 pb-24 md:pb-0 md:px-0">
    <div className="max-w-lg mx-auto space-y-6 md:max-w-none">
      
      {/* Hero Card */}
      <div className="relative rounded-3xl overflow-hidden p-6 md:p-10 border border-white/10 shadow-2xl bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 md:from-blue-900 md:to-purple-900">
        <div className="md:hidden absolute inset-0 opacity-80"></div> {/* Mobile Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 md:opacity-20"></div>
        
        <div className="relative z-10 text-center md:text-right md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <div className="inline-block px-3 py-1 bg-white/10 md:bg-white/20 backdrop-blur rounded-full text-[10px] md:text-xs font-bold text-cyan-200 md:text-blue-200 mb-3 md:mb-4 border border-white/10 md:border-none">
              نسل چهارم ERP
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight md:leading-tight">راهکاران آینده</h1>
            <p className="text-xs md:text-base text-blue-100/80 md:text-blue-100 mb-6 md:mb-0 leading-relaxed md:max-w-md">تحول دیجیتال واقعی با هوش مصنوعی و معماری ابری</p>
          </div>
          <div className="hidden md:flex gap-3">
             <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg">درخواست دمو</button>
             <button className="bg-transparent border border-white/30 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/10 transition">کاتالوگ فنی</button>
          </div>
          <button className="md:hidden w-full bg-white text-indigo-900 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-gray-100 transition">
            درخواست دمو
          </button>
        </div>
      </div>

      {/* Desktop Helper Title */}
      <h3 className="hidden md:flex text-xl font-bold mb-6 items-center gap-2">
        <Zap className="text-yellow-400" /> ویژگی‌های کلیدی
      </h3>

      {/* Pillars Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {PILLARS.map((p) => (
          <div key={p.id} className={`${mobileGlassCard} ${desktopCard} p-4 md:p-5 text-center hover:bg-white/5 transition md:group md:cursor-pointer`}>
            <div className={`w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center mb-3 md:mb-4 text-white shadow-lg md:group-hover:scale-110 md:transition-transform`}>
              {p.icon}
            </div>
            <h4 className="text-xs md:text-lg font-bold text-white md:mb-1">{p.title}</h4>
            <p className="hidden md:block text-slate-400 text-xs">{p.shortDesc}</p>
          </div>
        ))}
      </div>

      {/* Desktop Modules & Chat */}
      <div className="hidden md:grid lg:grid-cols-3 gap-8 mt-8">
        {/* Modules List */}
        <div className="lg:col-span-2">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <LayoutGrid className="text-blue-400" /> ماژول‌های عملیاتی
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {MODULES.map((mod) => (
              <div key={mod.id} className={`p-4 rounded-xl border flex items-center gap-3 transition cursor-pointer ${
                mod.highlight 
                  ? 'bg-blue-600/20 border-blue-500/50 hover:bg-blue-600/30' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10'
              }`}>
                <div className={`${mod.highlight ? 'text-blue-300' : 'text-slate-400'}`}>{mod.icon}</div>
                <span className={`text-sm font-medium ${mod.highlight ? 'text-white' : 'text-slate-300'}`}>{mod.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Chat Box */}
        <div className="bg-gradient-to-b from-purple-900/40 to-slate-900/40 border border-purple-500/30 rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-600 rounded-full shadow-lg shadow-purple-600/40">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-lg">دستیار هوشمند</h4>
                <p className="text-xs text-purple-300">پاسخگوی سوالات شما درباره نسل ۴</p>
              </div>
            </div>
            <div className="flex-1 bg-black/20 rounded-xl p-4 mb-4 text-sm text-slate-300 space-y-3 overflow-y-auto max-h-40 custom-scrollbar">
              <div className="bg-white/10 p-2 rounded-lg rounded-tr-none self-end ml-auto max-w-[90%]">
                ماژول CRM جدید چه تفاوتی با نسخه قبلی داره؟
              </div>
              <div className="bg-purple-600/20 border border-purple-500/20 p-2 rounded-lg rounded-tl-none mr-auto max-w-[90%] text-white">
                در نسخه جدید، هوش مصنوعی اضافه شده است.
              </div>
            </div>
            <div className="relative">
              <input type="text" placeholder="سوال خود را بپرسید..." className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-4 text-sm focus:outline-none focus:border-purple-500 text-white placeholder-slate-500" />
              <button className="absolute left-2 top-2 p-1.5 bg-purple-600 rounded-full text-white hover:bg-purple-500 transition">
                <ArrowRight size={16} className="rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Teaser (Mobile Only) */}
      <div className={`md:hidden ${mobileGlassCard} p-4 flex items-center gap-4`}>
        <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-300 border border-purple-500/30 shrink-0">
          <Bot size={24} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white mb-1">دستیار هوشمند</h4>
          <p className="text-[10px] text-gray-400">هر سوالی درباره محصول دارید بپرسید...</p>
        </div>
        <button className="p-2 bg-purple-600 rounded-full text-white shadow-lg shadow-purple-600/40">
          <MessageSquare size={16} />
        </button>
      </div>

    </div>
  </div>
);

// --- MODAL COMPONENT ---
const WorkshopModal = ({ workshop, onClose }) => {
  if (!workshop) return null;
  const content = workshop.detailContent;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className={`w-full sm:max-w-2xl ${mobileGlassCard} md:bg-[#001830] md:border-white/20 !bg-[#0f172a] border-t border-white/20 sm:border rounded-t-3xl sm:rounded-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 flex flex-col max-h-[85vh] md:max-h-[90vh]`}>
        
        {/* Drag Handle for Mobile */}
        <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-3 mb-1 sm:hidden"></div>

        {/* Header (Different for Mobile/Desktop) */}
        <div className="p-6 border-b border-white/10 md:bg-white/5 md:flex md:justify-between md:items-start">
          <div className="flex items-center md:items-start gap-3 md:gap-4">
            <div className="p-3 bg-cyan-500/10 md:bg-blue-600/20 rounded-2xl md:rounded-xl text-cyan-400 md:text-blue-400 border border-cyan-500/20 md:border-blue-500/30">
              {workshop.icon}
            </div>
            <div>
              <div className="hidden md:block text-blue-400 text-xs font-bold uppercase mb-1">کارگاه آموزشی</div>
              <h2 className="text-lg md:text-xl font-bold text-white">{workshop.title}</h2>
              <div className="text-xs text-gray-400 md:text-slate-400 mt-1 md:mt-2 md:font-mono md:flex md:gap-4">
                <span className="md:flex md:items-center md:gap-1">{workshop.time}</span>
                <span className="hidden md:inline">|</span>
                <span className="md:flex md:items-center md:gap-1">{workshop.loc}</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="hidden md:block text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar">
          {content ? (
            <div className="space-y-6">
              {/* Desktop Hero Box */}
              <div className="hidden md:block bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-white/10 mb-6">
                <h3 className="font-bold text-lg mb-2 text-blue-200">{content.hero.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{content.hero.desc}</p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed text-justify md:hidden">{content.hero.desc}</p>
              
              <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-2 md:gap-3">
                <h4 className="text-xs font-bold text-cyan-200 uppercase tracking-wider md:hidden">سرفصل‌ها</h4>
                <h4 className="hidden md:flex font-bold text-white mb-4 items-center gap-2 col-span-2">
                  <Zap size={16} className="text-yellow-400"/> سرفصل‌های کلیدی
                </h4>
                {content.features.map((feat, idx) => (
                  <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5 flex gap-3 md:items-start">
                    <div className="text-cyan-400 md:text-blue-400 mt-0.5">{feat.icon}</div>
                    <div>
                      <div className="text-sm font-bold text-white md:text-slate-200">{feat.title}</div>
                      <div className="text-[10px] md:text-xs text-gray-400 md:text-slate-500 mt-1">{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400">{workshop.desc}</p>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-xl md:flex md:justify-between md:items-center">
          <div className="hidden md:block text-xs text-slate-400">
            ظرفیت باقی‌مانده: <span className="text-white font-bold">{workshop.capacity - workshop.registered} نفر</span>
          </div>
          <button className="w-full md:w-auto bg-cyan-500 md:bg-blue-600 hover:bg-cyan-400 md:hover:bg-blue-500 text-black md:text-white font-bold py-3 md:py-2.5 md:px-6 rounded-xl md:rounded-lg transition shadow-[0_0_20px_rgba(6,182,212,0.4)] md:shadow-lg md:shadow-blue-600/20">
            {typeof window !== 'undefined' && window.innerWidth > 768 ? 'ثبت‌نام قطعی در کارگاه' : 'ثبت‌نام در کارگاه'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function EventPlatform() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  return (
    <div className="font-['Vazirmatn'] text-white overflow-x-hidden md:flex md:h-screen md:bg-[#001F3D]" dir="rtl">
      
      {/* GLOBAL STYLE FOR MOBILE BACKGROUND (ONLY APPLIES TO BODY/WRAPPER IN MOBILE) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100..900&display=swap');
        body { font-family: 'Vazirmatn', sans-serif; }
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255,255,255,0.2); border-radius: 4px; }
        
        /* Mobile Background Only */
        @media (max-width: 768px) {
          body {
            background: radial-gradient(circle at 50% 20%, #115e59 0%, #0f172a 40%, #020617 80%);
            background-attachment: fixed;
            min-height: 100vh;
          }
        }
      `}</style>

      {/* --- DESKTOP SIDEBAR (Visible only on md+) --- */}
      <aside className="hidden md:flex w-64 flex-shrink-0 border-l border-white/10 flex-col bg-[#001830] z-20 shadow-2xl">
        <div className="h-20 flex items-center justify-start px-6 border-b border-white/10">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">SG</div>
          <span className="mr-3 font-bold text-lg tracking-wide">رویداد نسل ۴</span>
        </div>
        <nav className="flex-1 py-6 space-y-2">
          <SidebarItem id="overview" label="نمای کلی" icon={<LayoutDashboard size={20} />} active={activeTab === 'overview'} onClick={setActiveTab} />
          <SidebarItem id="map" label="نقشه رویداد" icon={<MapIcon size={20} />} active={activeTab === 'map'} onClick={setActiveTab} />
          <SidebarItem id="workshops" label="کارگاه‌های آموزشی" icon={<Users size={20} />} active={activeTab === 'workshops'} onClick={setActiveTab} />
          <div className="my-4 border-t border-white/10 mx-4"></div>
          <SidebarItem id="product" label="محصول راهکاران آینده" icon={<Box size={20} />} active={activeTab === 'product'} onClick={setActiveTab} />
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 border border-blue-500/30">MK</div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">مهمان شرکت‌کننده</p>
              <p className="text-xs text-slate-500 truncate">user@company.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA (Wrapper) --- */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* --- HEADER --- */}
        {/* Mobile Header */}
        <header className="md:hidden relative z-10 p-6 pt-10 text-center">
          <div className="flex flex-col items-center gap-1 mb-6">
            <h2 className="text-sm font-semibold text-cyan-100/80 tracking-wide">خوش آمدید شرکت‌کننده عزیز</h2>
            <p className="text-[10px] text-cyan-200/50 font-light">رویداد معرفی راهکاران آینده - ۲ دی ۱۴۰۳</p>
          </div>
          <h1 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
            {activeTab === 'overview' && 'مسیر رویداد امروز'}
            {activeTab === 'map' && 'نقشه و مسیریابی'}
            {activeTab === 'workshops' && 'کارگاه‌های آموزشی'}
            {activeTab === 'product' && 'معرفی محصول'}
          </h1>
          <p className="text-xs text-gray-400 font-light max-w-xs mx-auto">
            {activeTab === 'overview' && 'یک سفر یک‌روزه به آینده تکنولوژی سازمانی'}
            {activeTab === 'map' && 'راهنمای کامل سالن‌ها و غرفه‌ها'}
            {activeTab === 'workshops' && 'یادگیری عمیق تکنولوژی‌های نسل ۴'}
            {activeTab === 'product' && 'کاوش در امکانات و ماژول‌های جدید'}
          </p>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex justify-between items-center px-10 py-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {activeTab === 'overview' && 'خوش آمدید، محمد 👋'}
              {activeTab === 'map' && 'مسیریابی هوشمند'}
              {activeTab === 'workshops' && 'تقویم آموزشی'}
              {activeTab === 'product' && 'کاوش در محصول'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {activeTab === 'overview' && 'رویداد معرفی راهکاران آینده - ۲ دی ۱۴۰۳'}
              {activeTab === 'map' && 'برای دیدن جزئیات روی بخش‌های نقشه کلیک کنید'}
              {activeTab === 'workshops' && 'ظرفیت کارگاه‌ها محدود است'}
              {activeTab === 'product' && 'بررسی ویژگی‌های نسل ۴ و پرسش از هوش مصنوعی'}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition"><Search size={20} className="text-slate-400" /></button>
            <button className="p-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              <MessageSquare size={20} className="text-slate-400" />
            </button>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <main className="relative z-10 flex-1 overflow-y-auto md:custom-scrollbar min-h-[60vh] md:px-10 md:pb-10">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'map' && <MapSection />}
          {activeTab === 'workshops' && <WorkshopsSection onOpenDetail={setSelectedWorkshop} />}
          {activeTab === 'product' && <ProductSection />}
        </main>

        {/* --- BOTTOM NAVIGATION (Mobile Only) --- */}
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 ${glassNavStyle} z-50 h-20 pb-2 safe-area-pb`}>
          <div className="flex items-center justify-around h-full px-4 max-w-lg mx-auto">
            <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'overview' ? 'text-cyan-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
              <div className={`w-6 h-6 ${activeTab === 'overview' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}><Home strokeWidth={activeTab === 'overview' ? 2.5 : 1.5} /></div>
              <span className="text-[10px] font-medium">خانه</span>
            </button>
            <button onClick={() => setActiveTab('map')} className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'map' ? 'text-cyan-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
              <div className={`w-6 h-6 ${activeTab === 'map' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}><MapIcon strokeWidth={activeTab === 'map' ? 2.5 : 1.5} /></div>
              <span className="text-[10px] font-medium">نقشه</span>
            </button>
            <button onClick={() => setActiveTab('workshops')} className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'workshops' ? 'text-cyan-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
              <div className={`w-6 h-6 ${activeTab === 'workshops' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}><Users strokeWidth={activeTab === 'workshops' ? 2.5 : 1.5} /></div>
              <span className="text-[10px] font-medium">کارگاه‌ها</span>
            </button>
            <button onClick={() => setActiveTab('product')} className={`flex flex-col items-center justify-center gap-1 transition-all ${activeTab === 'product' ? 'text-cyan-400 scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
              <div className={`w-6 h-6 ${activeTab === 'product' ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : ''}`}><Box strokeWidth={activeTab === 'product' ? 2.5 : 1.5} /></div>
              <span className="text-[10px] font-medium">محصول</span>
            </button>
          </div>
        </nav>

        {/* --- MODALS --- */}
        {selectedWorkshop && (
          <WorkshopModal workshop={selectedWorkshop} onClose={() => setSelectedWorkshop(null)} />
        )}

      </div>
    </div>
  );
}
