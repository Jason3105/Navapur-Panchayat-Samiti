// @charset "UTF-8";
import { useEffect, useState } from "react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" }
];

const GoogleTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    const cookieLang = getCurrentLanguage();
    if (cookieLang) setSelectedLang(cookieLang);

    // Inject Google Translate Script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: languages.map((l) => l.code).join(","),
            autoDisplay: false
          },
          "google_translate_element"
        );
      };
    }
  }, []);

  const getCurrentLanguage = () => {
    const match = document.cookie.match(/(^|;)\s*googtrans=\/en\/([^;]+)/);
    return match ? match[2] : localStorage.getItem("selectedLanguage") || "en";
  };

  const setLanguage = (langCode: string) => {
    if (langCode === selectedLang) return;

    setSelectedLang(langCode);
    localStorage.setItem("selectedLanguage", langCode);

    const hostname = window.location.hostname;
    const domain = hostname === "localhost" ? "" : `domain=${hostname};`;

    document.cookie = `googtrans=/en/${langCode}; path=/; ${domain}`;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;

    const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");

    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event("change"));
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <>
      {/* Hidden Translate Widget */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Translate Button */}
      <button
        className="translate-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Translate"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/484/484633.png"
          alt="Translate"
        />
      </button>

      {/* Language Modal */}
      {isOpen && (
        <div
          id="translator-modal"
          className="translator-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="language-grid">
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`language-option ${
                  selectedLang === lang.code ? "active-language" : ""
                }`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                <div className="language-name notranslate">{lang.name}</div>
                <div className="language-native notranslate">{lang.native}</div>

              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GoogleTranslator;
