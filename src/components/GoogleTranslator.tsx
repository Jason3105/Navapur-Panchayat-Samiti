/* GoogleTranslator.tsx ---------------------------------------------------- */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, X, Check } from "lucide-react";

/* ────────────────── Language list ────────────────── */
interface Lang {
  code: string;
  name: string;
  native: string;
}

const LANGS: Lang[] = [
  { code: "en", name: "English",  native: "English"   },
  { code: "mr", name: "Marathi",  native: "मराठी"      },
  { code: "hi", name: "Hindi",    native: "हिन्दी"     },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી"    },
  { code: "ta", name: "Tamil",    native: "தமிழ்"      },
  { code: "te", name: "Telugu",   native: "తెలుగు"     },
  { code: "kn", name: "Kannada",  native: "ಕನ್ನಡ"      },
  { code: "ml", name: "Malayalam",native: "മലയാളം"     },
];

/* ────────────────── Component ────────────────── */
const GoogleTranslator = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const [busy, setBusy] = useState(false);
  const [btnRef, setBtnRef] = useState<HTMLButtonElement | null>(null);

  /* 1️⃣  Load Google script once */
  useEffect(() => {
    if (!document.getElementById("gt-script")) {
      const s = document.createElement("script");
      s.id  = "gt-script";
      s.src = "//translate.google.com/translate_a/element.js?cb=gtInit";
      s.async = true;
      document.body.appendChild(s);

      (window as any).gtInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGS.map(l => l.code).join(","),
            autoDisplay: false,
            layout: (window as any).google.translate.TranslateElement
                    .InlineLayout.SIMPLE,
          },
          "gt-element"
        );
      };
    }

    /* read cookie so label stays right after refresh */
    const m = document.cookie.match(/(^|;)\s*googtrans=\/en\/([^;]+)/);
    if (m && m[2]) setCurrent(m[2]);
  }, []);

  /* util – set or clear googtrans cookie */
  const setCookie = (val: string | null) => {
    const exp = val ? "" : "Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = `googtrans=${val ?? ""}; path=/; ${exp}`;
    document.cookie = `googtrans=${val ?? ""}; path=/; domain=${location.hostname}; ${exp}`;
  };

  /* 2️⃣  Change language without reloading (unless we must) */
  const changeLang = (lang: string) => {
    if (lang === current) return setOpen(false);

    setBusy(true);
    setCurrent(lang);
    setOpen(false);

    lang === "en" ? setCookie(null) : setCookie(`/en/${lang}`);

    let tries = 0;
    const max = 60;          // 60 × 200 ms = 12 s
    const tryTranslate = () => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.style.display = "none";
        combo.value = lang === "en" ? "" : lang;
        combo.dispatchEvent(new Event("change"));

        setTimeout(() => {
          /* hide any banner Google tries to add */
          document.querySelectorAll(
            ".goog-te-banner-frame, .skiptranslate, .goog-te-gadget, .goog-te-balloon-frame"
          ).forEach(el => ((el as HTMLElement).style.display = "none"));
          setBusy(false);
        }, 600);
      } else if (++tries < max) {
        setTimeout(tryTranslate, 200);           // keep waiting
      } else {
        /* last-resort – reload path with prefix, works with static.json */
        window.location.href =
          lang === "en"
            ? location.pathname
            : `/${lang}${location.pathname}`;
      }
    };
    tryTranslate();
  };

  const label = LANGS.find(l => l.code === current)?.native ?? "English";

  /* 3️⃣  JSX */
  return (
    <>
      {/* hidden host for Google gadget */}
      <div id="gt-element" style={{ display: "none" }} />

      {/* trigger button */}
      <Button
        ref={setBtnRef}
        variant="outline"
        size="sm"
        disabled={busy}
        onClick={() => setOpen(true)}
        className="ml-4 border-orange-200 bg-white text-orange-700
                   hover:bg-orange-50 hover:text-orange-800 hover:border-orange-300
                   transition-all"
      >
        {busy ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2
                           border-orange-600 border-t-transparent" />
        ) : (
          <Globe className="mr-2 h-4 w-4" />
        )}
        {label}
      </Button>

      {/* language dropdown modal */}
      {open && btnRef && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <div
            className="absolute w-96 rounded-xl border border-gray-200 bg-white shadow-2xl"
            style={{
              top: btnRef.getBoundingClientRect().bottom + window.scrollY + 8,
              left: Math.min(
                btnRef.getBoundingClientRect().left + window.scrollX,
                window.innerWidth - 400
              ),
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div className="flex items-center space-x-3">
                <span className="rounded-lg bg-orange-100 p-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">Select Language</h3>
                  <p className="text-sm text-gray-500">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full p-2 text-gray-400
                           hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* language grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {LANGS.map(l => (
                  <div
                    key={l.code}
                    onClick={() => changeLang(l.code)}
                    className={`group cursor-pointer rounded-lg border p-3 transition
                      ${
                        current === l.code
                          ? "border-orange-500 bg-orange-50 shadow-sm"
                          : "border-gray-200 hover:border-orange-300 hover:bg-orange-25"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium group-hover:text-orange-700">
                          {l.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-600">{l.native}</p>
                      </div>
                      {current === l.code && (
                        <Check className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* hide every Google Translate artefact */}
      <style>{`
        .skiptranslate, .goog-te-banner-frame, .goog-te-gadget,
        .goog-te-combo, .goog-logo-link, .goog-te-menu-value,
        .goog-te-menu-frame, iframe.goog-te-banner-frame,
        #goog-gt-tt, .goog-te-balloon-frame, .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .goog-te-ftab { display: none !important; visibility: hidden !important; }
        body { top: 0 !important; }
      `}</style>
    </>
  );
};

export default GoogleTranslator;
