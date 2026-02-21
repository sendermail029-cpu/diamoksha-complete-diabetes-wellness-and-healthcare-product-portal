"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";

type AlertType = "success" | "error" | null;

export default function Home() {
  const originalPrice = 2499;
  const offerPrice = 2249;
  const bookingDiscountPercent = 10;

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [alertType, setAlertType] = useState<AlertType>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  const isFormValid = useMemo(() => {
    const tenDigitPhone = /^[0-9]{10}$/;
    return name.trim().length > 1 && tenDigitPhone.test(phone) && address.trim().length > 10;
  }, [name, phone, address]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 0 ? 15 * 60 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      setAlertType("error");
      setAlertMessage("దయచేసి సరైన పేరు, 10 అంకెల ఫోన్ నంబర్, పూర్తి అడ్రస్ నమోదు చేయండి.");
      return;
    }

    setAlertType("success");
    setAlertMessage("మీ బుకింగ్ అభ్యర్థన స్వీకరించాం. మా టీమ్ త్వరలో సంప్రదిస్తుంది.");
    setName("");
    setPhone("");
    setAddress("");
  };

  return (
    <main className="min-h-screen bg-[#eaf2ec] pb-28 text-[var(--foreground)] sm:pb-32">
      <section className="sticky top-0 z-30 bg-black px-3 py-2 text-center text-white shadow-lg sm:px-4 sm:py-3">
        <p className="text-sm font-extrabold text-yellow-300 sm:text-lg">
          ⚠️ స్టాక్: కేవలం 15 ప్యాకెట్లే మాత్రమే ఉన్నాయి!
        </p>
        <p className="mt-1 text-lg font-bold text-red-500 sm:text-xl">
          ఆఫర్ ముగియడానికి: {minutes}:{seconds}
        </p>
      </section>

      <section className="mx-auto w-full max-w-[430px] space-y-3 px-2.5 py-3 sm:max-w-2xl sm:space-y-4 sm:px-4 sm:py-5">
        {alertType && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
              alertType === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            {alertMessage}
          </div>
        )}

        <div className="bg-transparent p-1 sm:p-2">
          <h1 className="text-center text-[2rem] font-extrabold leading-[1.08] text-[#1d23b8] sm:text-5xl">
            మధుమేహం (షుగర్)
          </h1>
          <p className="mt-2 text-center text-2xl font-extrabold leading-tight text-[#1d23b8] sm:text-4xl">
            వ్యాధి బాధితులకు
            <span className="text-[#111111] font-black text-4xl"> డయామోక్ష </span>
            సంజీవని
          </p>
          <div className="mt-3 rounded-xl bg-black px-4 py-3 text-center">
            <p className="text-2xl font-bold leading-tight text-white sm:text-4xl">
              రక్తంలో HBA1C స్థాయిలను మెరుగుపరుస్తుంది.
            </p>
            <p className="mt-2 text-base font-semibold text-zinc-200 sm:text-2xl">
              17 రకాల వనమూలికలతో తయారైన డయామోక్ష చూర్ణం
            </p>
          </div>
          <div className="mt-2 text-center sm:mt-4">
            <span className="text-5xl font-black text-red-700 sm:text-7xl">₹{offerPrice}</span>
          </div>
          <div className="mt-4 overflow-hidden rounded-3xl">
            <Image
              src="/dia.png"
              alt="DIA MOKSHA Product"
              width={900}
              height={1200}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <section className="bg-transparent p-1 sm:p-2">
          <h2 className="text-center font-serif text-[3rem] font-bold leading-[1.05] text-[#0c2e57] sm:text-7xl">
            DIA MOKSHA
            <br />
            (Premium)
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="inline-flex max-w-full rounded-full bg-[#dbe8f6] px-5 py-2 text-base font-semibold text-[#1f57b8] sm:text-xl">
              🧬 Certified Ayurvedic Formula
            </div>
          </div>

          <div className="mt-5 flex items-end justify-center gap-2 sm:gap-3">
            <span className="text-6xl font-black leading-none text-red-700 sm:text-7xl">₹{offerPrice}</span>
            <span className="pb-1 text-3xl font-semibold text-zinc-400 line-through sm:pb-2 sm:text-4xl">
              ₹{originalPrice}
            </span>
          </div>
          <div className="mt-3 flex justify-center">
            <span className="rounded-xl bg-[#dcebdd] px-3 py-1.5 text-2xl font-extrabold text-[#2f7d34] sm:text-3xl">
              OFFER PRICE
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-white p-3">
            <h4 className="mb-3 text-lg font-extrabold text-emerald-900 sm:text-2xl">
              డయామోక్ష సహాయపడే ప్రధాన సమస్యలు
            </h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <article className="rounded-xl bg-[#f3f8f4] p-1.5">
                <Image
                  src="/leg.jpeg"
                  alt="మోకాళ్ళ నొప్పులు మరియు మంటలు"
                  width={420}
                  height={420}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-1 text-center text-xs font-semibold text-[#163d2f] sm:text-sm">
                  అరికాళ్ల మంటలు, మోకాళ్ల నొప్పులు, కాళ్ల తిమ్మిర్లు
                </p>
              </article>
              <article className="rounded-xl bg-[#f3f8f4] p-1.5">
                <Image
                  src="/urine.jpeg"
                  alt="నరాల బలహీనత"
                  width={420}
                  height={420}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-1 text-center text-xs font-semibold text-[#163d2f] sm:text-sm">
                 అతిమూత్రం, అలసట
                </p>
              </article>
              <article className="rounded-xl bg-[#f3f8f4] p-1.5">
                <Image
                  src="/eye.jpg"
                  alt="కంటి చూపు తగ్గడం"
                  width={420}
                  height={420}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-1 text-center text-xs font-semibold text-[#163d2f] sm:text-sm">
                  కంటి చూపు తగ్గడం
                </p>
              </article>
              <article className="rounded-xl bg-[#f3f8f4] p-1.5">
                <Image
                  src="/insulin.webp"
                  alt="అతిమూత్రం మరియు అలసట"
                  width={420}
                  height={420}
                  className="aspect-square w-full rounded-lg object-cover"
                />
                <p className="mt-1 text-center text-xs font-semibold text-[#163d2f] sm:text-sm">
                 ఇన్సులిన్ అకస్మాత్తుగా పెరగడం
                </p>
              </article>
              
            </div>
          </div>

        </section>

        <section className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0f5d2f] via-[#0c5a2d] to-[#084222] p-4 text-white shadow-lg sm:p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime-300/10" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-emerald-200/10" />

          <h2 className="text-center text-2xl font-extrabold text-yellow-300 sm:text-4xl">
            DIA MOKSHA తో లభించే మద్దతు
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-emerald-50/90 sm:text-base">
            మధుమేహం (షుగర్) బాధితుల రోజువారీ జీవనంలో మెరుగుదలకు సహాయకంగా రూపొందించిన ఫార్ములా
          </p>

          <div className="mt-4 grid gap-3">
            <article className="rounded-2xl border border-white/10 bg-white/15 p-3 backdrop-blur-[2px]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-white sm:text-2xl">🚀 రక్తంలో HBA1C స్థాయిల మెరుగుదల</h3>
                <span className="rounded-full bg-lime-300/20 px-2 py-1 text-[10px] font-bold text-lime-100 sm:text-xs">
                  FASTING + PP
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-emerald-50 sm:text-base">
                క్రమమైన వినియోగంతో రక్తంలో చక్కెర నియంత్రణకు తోడ్పడి, HBA1C మెరుగుదలకు సహాయకంగా పనిచేస్తుంది.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/15 p-3 backdrop-blur-[2px]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-white sm:text-2xl">⚡ 17 రకాల వనమూలికల శక్తి</h3>
                <span className="rounded-full bg-yellow-300/20 px-2 py-1 text-[10px] font-bold text-yellow-100 sm:text-xs">
                  DAILY ENERGY
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-emerald-50 sm:text-base">
                వనమూలికల సమ్మేళనం శరీర బలాన్ని పెంచి, రోజువారీ అలసట మరియు నీరసం తగ్గించడంలో మద్దతు ఇస్తుంది.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/15 p-3 backdrop-blur-[2px]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-white sm:text-2xl">🧪 ఇన్సులిన్ స్పైక్ నియంత్రణకు తోడు</h3>
                <span className="rounded-full bg-cyan-300/20 px-2 py-1 text-[10px] font-bold text-cyan-100 sm:text-xs">
                  METABOLIC SUPPORT
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-emerald-50 sm:text-base">
                భోజనం తర్వాత అకస్మాత్తుగా పెరిగే చక్కెర (షుగర్ స్పైక్స్) ప్రభావాన్ని తగ్గించడంలో మరియు జీవక్రియలో సమతుల్యతలో సహాయపడుతుంది.
              </p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/15 p-3 backdrop-blur-[2px]">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-white sm:text-2xl">✅ సమస్యలపై సమగ్ర మద్దతు</h3>
                <span className="rounded-full bg-emerald-200/20 px-2 py-1 text-[10px] font-bold text-emerald-50 sm:text-xs">
                  DOCTOR GUIDED
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-emerald-50 sm:text-base">
                నరాల బలహీనత, కంటి చూపు తగ్గడం, అతిమూత్రం, మోకాళ్ళ నొప్పులు, అలసట మంటలు వంటి సమస్యల్లో సహాయక మద్దతు అందిస్తుంది.
              </p>
            </article>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="rounded-[26px] border border-emerald-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-5 rounded-3xl border border-emerald-100 bg-[#f9fcfa] p-4 text-center sm:p-5">
            <p className="text-2xl font-extrabold leading-tight text-[#195a36] sm:text-4xl">
              ఆర్డర్ నిర్ధారించడానికి మీ వివరాలు ఇక్కడ పూరించండి
            </p>
            <p className="mt-3 text-3xl font-black text-[#c01818] sm:text-5xl">
              Special Offer: ₹{originalPrice}
            </p>
            <div className="mt-4 rounded-3xl border-4 border-dashed border-red-400 bg-[#fff5b8] p-4">
              <div className="inline-flex rounded-lg bg-[#e43a3a] px-4 py-1 text-sm font-black text-white sm:text-base">
                SUPER SAVER
              </div>
              <p className="mt-3 text-xl font-bold text-[#1e6d42] sm:text-3xl">
                ఆన్లైన్ పేమెంట్ చేస్తే అదనంగా {bookingDiscountPercent}% తగ్గింపు
              </p>
              <p className="mt-2 text-4xl font-black text-[#165135] sm:text-6xl">
                Final Price: ₹{offerPrice}
              </p>
              <p className="mt-1 text-sm font-semibold text-zinc-600 sm:text-lg">
                Offer valid on UPI / PhonePe / Google Pay
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-extrabold text-[#1a2f4b] sm:text-3xl">Booking Form</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-lg font-bold text-[#1a2f4b] sm:text-xl">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="మీ పేరు"
                className="w-full rounded-2xl border-2 border-zinc-300 px-4 py-3 text-lg text-zinc-700 outline-none focus:border-emerald-500 sm:text-2xl"
              />
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold text-[#1a2f4b] sm:text-xl">Phone Number</label>
              <div className="flex items-center rounded-2xl border-2 border-zinc-300 px-4 py-3">
                <span className="border-r border-zinc-300 pr-3 text-lg text-zinc-600 sm:text-2xl">+91</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  placeholder="XXXXXXXXXX"
                  className="ml-3 w-full text-lg text-zinc-700 outline-none sm:text-2xl"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-lg font-bold text-[#1a2f4b] sm:text-xl">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="మీ పూర్తి అడ్రస్ నమోదు చేయండి"
                rows={4}
                className="w-full rounded-2xl border-2 border-zinc-300 px-4 py-3 text-lg text-zinc-700 outline-none focus:border-emerald-500 sm:text-2xl"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#a60f0f] px-6 py-4 text-2xl font-black text-white shadow-md transition hover:bg-[#8b0d0d] sm:py-5 sm:text-4xl"
            >
              CONFIRM ORDER NOW
            </button>
          </div>
        </form>

        <section className="rounded-3xl bg-gradient-to-b from-[#f7fcf8] to-[#eef7f1] px-4 py-5 text-center shadow-[0_10px_30px_rgba(21,83,49,0.08)] sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-bold tracking-wide text-[#155331] sm:text-base">
            👨‍⚕️ EXPERT ADVICE
          </span>
          <p className="mx-auto mt-4 max-w-md text-xl font-extrabold leading-tight text-[#17472d] sm:text-3xl">
            కాల్‌లో నిపుణులైన వైద్యుల నుండి
            <span className="block text-[#0d6b3a]">ఉచిత సలహా పొందండి</span>
          </p>
          <button
            type="button"
            className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#146c39] px-8 py-3 text-xl font-bold text-white shadow-[0_8px_20px_rgba(20,108,57,0.35)] transition hover:bg-[#115f33] sm:px-10 sm:text-2xl"
          >
            📞 ఇప్పుడే కాల్ చేయండి
          </button>
          <p className="mx-auto mt-4 max-w-md text-base font-semibold leading-7 text-[#2f5f44] sm:text-xl">
            ✅ సమయాలతో బాధపడుతున్న వారికి సులభ పరిష్కారం అందించే సహాయం
          </p>
        </section>

       <section className="rounded-[26px] border border-emerald-100 bg-white p-4 sm:p-5">
  <h3 className="text-2xl font-extrabold text-emerald-900 sm:text-3xl">వినియోగదారుల రివ్యూస్ (Verified)</h3>
  
  <div className="mt-3 space-y-4 text-base sm:text-lg">
    
    {/* 1. Andhra Pradesh - With Report Image */}
    <article className="rounded-2xl bg-emerald-50 p-4 text-emerald-900 border-l-4 border-emerald-500">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8 font-bold text-emerald-950">
        &quot;నా షుగర్ లెవెల్స్ 280 నుండి 130 కి తగ్గాయి!&quot;
      </p>
      <p className="mt-2 leading-8">
        DIA MOKSHA వాడటం మొదలుపెట్టిన 10 రోజుల్లోనే అద్భుతమైన మార్పు వచ్చింది. నా పాత రిపోర్ట్ కి ఇప్పటి రిపోర్ట్ కి చాలా తేడా ఉంది. 
      </p>
      
      {/* Clickable Report Image */}
      <div className="mt-3">
        <p className="text-xs font-bold text-emerald-700 mb-1">View Medical Report ↓</p>
        <a href="/report.jpeg" target="_blank" rel="noopener noreferrer">
          <Image
            src="/report.jpeg"
            alt="Medical Report"
            width={128}
            height={80}
            className="h-20 w-32 rounded-lg border-2 border-white object-cover shadow-md transition-transform hover:scale-105"
          />
        </a>
      </div>
      
      <p className="mt-3 text-sm font-semibold">📍 పేరు: కె. లింగయ్య, ఆంధ్రప్రదేశ్ | ✅ Verified</p>
    </article>

    {/* 2. Telangana - Telugu */}
    <article className="rounded-2xl bg-white border border-emerald-100 p-4 text-emerald-900">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8 italic">
        &quot;రాత్రి వేళ పదే పదే యూరిన్ కి వెళ్లే సమస్య తగ్గింది. బాడీ చాలా యాక్టివ్ గా ఉంది. తెలంగాణలో డెలివరీ చాలా ఫాస్ట్ గా ఇచ్చారు.&quot;
      </p>
      <p className="mt-2 text-sm font-semibold">📍 పేరు: మోహన్ రెడ్డి | వరంగల్, తెలంగాణ | ✅ Verified</p>
    </article>

    {/* 3. Andhra Pradesh - Telugu */}
    <article className="rounded-2xl bg-white border border-emerald-100 p-4 text-emerald-900">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8">
        &quot;డయాబెటిస్ వల్ల వచ్చే కాళ్ల నొప్పులు, నీరసం పోయాయి. ఆయుర్వేదం కాబట్టి సైడ్ ఎఫెక్ట్స్ లేవు. సూపర్ ప్రొడక్ట్!&quot;
      </p>
      <p className="mt-2 text-sm font-semibold">📍 పేరు: శివకృష్ణ | విశాఖపట్నం, ఆంధ్రప్రదేశ్ | ✅ Verified</p>
    </article>

    {/* 4. Telangana - Telugu */}
    <article className="rounded-2xl bg-white border border-emerald-100 p-4 text-emerald-900">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8">
        &quot;చాలా రకాల మందులు వాడాను కానీ DIA MOKSHA రిజల్ట్ చాలా బాగుంది. ఫాస్టింగ్ షుగర్ కంట్రోల్ లోకి వచ్చింది.&quot;
      </p>
      <p className="mt-2 text-sm font-semibold">📍 పేరు: పి. వెంకటేష్ | హైదరాబాద్, తెలంగాణ | ✅ Verified</p>
    </article>

    {/* 5. Andhra Pradesh - English */}
    <article className="rounded-2xl bg-white border border-emerald-100 p-4 text-emerald-900">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8 font-medium">
        &quot;Initially I was skeptical, but after 2 months of usage, my HbA1c levels have significantly improved. Highly recommended for sugar control.&quot;
      </p>
      <p className="mt-2 text-sm font-semibold">📍 Name: Rajesh V. | Guntur, Andhra Pradesh | ✅ Verified</p>
    </article>

    {/* 6. Karnataka - Kannada Language */}
    <article className="rounded-2xl bg-blue-50 p-4 text-slate-800 border-l-4 border-blue-500">
      <p className="text-xl text-yellow-500">★★★★★</p>
      <p className="mt-2 leading-8">
        &quot;ಸಕ್ಕರೆ ಕಾಯಿಲೆ ನಿಯಂತ್ರಣಕ್ಕೆ ಇದು ಅತ್ಯುತ್ತಮ ಆಯುರ್ವೇದ ಔಷಧ. ದಣಿವು ಕಡಿಮೆಯಾಗಿದೆ ಮತ್ತು ಈಗ ನಾನು ತುಂಬಾ ಉತ್ಸಾಹದಿಂದ ಇರುತ್ತೇನೆ.&quot;
      </p>
      <p className="mt-2 text-sm font-semibold">📍 ಹೆಸರು: ಸಂತೋಷ್ ಹೆಗ್ಡೆ | ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ | ✅ Verified</p>
    </article>

  </div>
</section>

        <footer className="bg-transparent px-2 py-1 text-center sm:px-3 sm:py-2">
          <p className="mx-auto max-w-md text-sm leading-6 text-[#4f5f58] sm:text-base">
          Note: All testimonials displayed on this website are shared with prior consent from customers. Individual experiences may vary.
          </p>

          

        
          <p className="mt-2 text-3xl font-black text-[#184c2e] sm:text-5xl">DIA MOKSHA HERBAL CARE</p>

          <hr className="my-4 border-dashed border-[#c7d6ce]" />

          <div className="space-y-2 text-center text-xl font-semibold text-[#3f4f47] sm:mx-auto sm:max-w-md sm:text-3xl">
            <p>📞 +91 7842121315</p>
            <p>✉️ info.svwellness@gmail.com</p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-bold text-[#1b7d32] sm:text-2xl">
            <span>🔒 100% Secure Payment</span>
            <span>📦 Discreet Packaging</span>
          </div>

          <p className="mt-4 text-sm leading-7 text-[#6e7c76] sm:text-lg">
            *గమనిక: ఇది ఒక ఆయుర్వేద సహాయక ఉత్పత్తి. ఫలితాలు వ్యక్తిగత శరీర స్వభావం, జీవనశైలి,
            మరియు వైద్యుల సూచనలపై ఆధారపడి ఉండవచ్చు.
          </p>
        </footer>
      </section>

      <section className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 px-2.5 py-2 backdrop-blur sm:px-4 sm:py-3">
        <div className="mx-auto grid w-full max-w-[430px] grid-cols-[1fr_auto] items-center gap-2 sm:flex sm:max-w-2xl sm:flex-row sm:justify-between sm:gap-3">
          <p className="text-left text-[15px] font-extrabold leading-tight text-red-600 sm:text-lg">
            🔥 ఇప్పుడే మిగిలిన ఆఫర్: {minutes}:{seconds}
          </p>
          <button type="button" className="rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-extrabold text-white sm:w-auto sm:px-5 sm:py-3 sm:text-lg">
            WhatsApp ద్వారా ఆర్డర్
          </button>
        </div>
      </section>
    </main>
  );
}
