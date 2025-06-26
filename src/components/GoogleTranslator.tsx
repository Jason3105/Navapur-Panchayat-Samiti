import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Globe, X, Check } from "lucide-react";

interface Language {
  code: string;
  name: string;
  native: string;
}

const languages: Language[] = [
  { code: "en", name: "English", native: "English" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
];

const GoogleTranslator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isTranslating, setIsTranslating] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  /* ------------------------------------------------------- */
  /* 1️⃣  Load Google-Translate script once on mount         */
  /* ------------------------------------------------------- */
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            includedLanguages: languages.map((l) => l.code).join(","),
            layout: (window as any).google.translate.TranslateElement
              .InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      };
    }

    const saved = document.cookie.match(/(^|;)\s*googtrans=\/en\/([^;]+)/);
    if (saved && saved[2]) setCurrentLanguage(saved[2]);
  }, []);

  /* ------------------------------------------------------- */
  /* 2️⃣  Util: set / clear googtrans cookie                 */
  /* ------------------------------------------------------- */
  const setCookie = (value: string | null) => {
    const expire = value ? "" : "Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    document.cookie = `googtrans=${value ?? ""}; path=/; ${expire}`;
    document.cookie = `googtrans=${value ?? ""}; path=/; domain=${
      window.location.hostname
    }; ${expire}`;
  };

  /* ------------------------------------------------------- */
  /* 3️⃣  Change language WITHOUT page reload                */
  /* ------------------------------------------------------- */
  const changeLanguage = (lang: string) => {
    if (lang === currentLanguage) {
      setIsModalOpen(false);
      return;
    }

    setIsTranslating(true);
    setCurrentLanguage(lang);
    setIsModalOpen(false);

    if (lang === "en") {
      setCookie(null);
    } else {
      setCookie(`/en/${lang}`);
    }

    let tries = 0;
    const maxTries = 20; // 20 × 100 ms = 2 s
    const attempt = () => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        combo.style.display = "none";
        combo.value = lang === "en" ? "" : lang;
        combo.dispatchEvent(new Event("change"));

        setTimeout(() => {
          document
            .querySelectorAll(
              ".goog-te-banner-frame, .skiptranslate, .goog-te-gadget, .goog-te-balloon-frame"
            )
            .forEach((el) => ((el as HTMLElement).style.display = "none"));
          setIsTranslating(false);
        }, 600);
      } else if (++tries < maxTries) {
        setTimeout(attempt, 100);
      } else {
        // Rare fallback
        window.location.reload();
      }
    };
    attempt();
  };

  /* ------------------------------------------------------- */
  /* 4️⃣  Helpers for button label                           */
  /* ------------------------------------------------------- */
  const getName = () =>
    languages.find((l) => l.code === currentLanguage)?.native ?? "English";

  /* ------------------------------------------------------- */
  /* 5️⃣  JSX                                                */
  /* ------------------------------------------------------- */
  return (
    <>
      {/* Hidden Google host div */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Trigger button */}
      <Button
        ref={setButtonRef}
        variant="outline"
        size="sm"
        disabled={isTranslating}
        onClick={() => setIsModalOpen(true)}
        className="ml-4 bg-white hover:bg-orange-50 border-orange-200 text-orange-700 hover:text-orange-800 hover:border-orange-300 transition-all"
      >
        {isTranslating ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-orange-600 border-t-transparent" />
        ) : (
          <Globe className="mr-2 h-4 w-4" />
        )}
        {getName()}
      </Button>

      {/* Modal */}
      {isModalOpen && buttonRef && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-transparent"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="absolute w-96 rounded-xl border border-gray-200 bg-white shadow-2xl"
            style={{
              top: buttonRef.getBoundingClientRect().bottom + window.scrollY + 8,
              left: Math.min(
                buttonRef.getBoundingClientRect().left + window.scrollX,
                window.innerWidth - 400
              ),
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-orange-100 p-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Select Language
                  </h3>
                  <p className="text-sm text-gray-500">
                    Choose your preferred language
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`group cursor-pointer rounded-lg border p-3 transition-all ${
                      currentLanguage === lang.code
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-gray-200 hover:border-orange-300 hover:bg-orange-25"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900 group-hover:text-orange-700">
                          {lang.name}
                        </div>
                        <div className="mt-1 text-xs text-gray-600">
                          {lang.native}
                        </div>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check className="h-4 w-4 flex-shrink-0 text-orange-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6️⃣  CSS to nuke Google UI elements */}
      <style>{`
        .skiptranslate,
        .goog-te-banner-frame,
        .goog-te-gadget,
        .goog-te-combo,
        .goog-logo-link,
        .goog-te-menu-value,
        .goog-te-menu-frame,
        iframe.goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .goog-te-ftab {
          display: none !important;
          visibility: hidden !important;
        }
        body { top: 0 !important; }
      `}</style>
    </>
  );
};

export default GoogleTranslator;
