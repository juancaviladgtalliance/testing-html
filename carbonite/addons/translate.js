import {
  ibcDomReady,
  removeClassByPrefix,
  getIframeDocument,
  getCookie,
  deleteCookie,
} from "../base/utils";

ibcDomReady(() => {
  // Get site's default language
  const defaultLanguage = __flex_g_settings.params.default_language || "en";
  const languages = {
    en: {
      flag: "flag-english",
      label: "EN",
      iso: "en",
      text: ["Inglés", "inglés", "English", "english"],
    },
    es: {
      flag: "flag-spanish",
      label: "ES",
      iso: "es",
      text: ["Español", "español", "Spanish", "spanish"],
    },
    ru: {
      flag: "flag-russian",
      label: "RU",
      iso: "ru",
      text: ["Ruso", "ruso", "Russian", "russian", "русский"],
    },
    pt: {
      flag: "flag-portuguese",
      label: "BR",
      iso: "pt",
      text: ["Portugués", "portugués", "Portuguese", "português"],
    },
    fr: {
      flag: "flag-french",
      label: "FR",
      iso: "fr",
      text: ["Francés", "francés", "French", "french"],
    },
    it: {
      flag: "flag-italy",
      label: "IT",
      iso: "it",
      text: ["Italiano", "italiano", "Italian", "italian"],
    },
    de: {
      flag: "flag-german",
      label: "DE",
      iso: "de",
      text: [
        "Alemán",
        "alemán",
        "Aleman",
        "aleman",
        "Germany",
        "germany",
        "German",
        "german",
      ],
    },
    "zh-TW": {
      flag: "flag-chinese",
      label: "ZH",
      iso: "zh-TW",
      text: [
        "Chino (Tradicional)",
        "chino (tradicional)",
        "Chinese (Traditional)",
        "chinese (traditional)",
        "中國（繁體）",
      ],
    },
  };

  const languageSwitcher = document.querySelector(".js-language-switcher");
  const languageButton = languageSwitcher.querySelector(
    ".js-language-switcher-button"
  );
  const languageLabel = languageSwitcher.querySelector(
    ".js-language-switcher-label"
  );
  const languageFlag = languageSwitcher.querySelector(
    ".js-language-switcher-flag"
  );
  const languageOptions = document.querySelectorAll(
    ".js-language-switcher-option"
  );

  function toggleSwitcher(event) {
    const switcher = event.currentTarget.parentNode;
    switcher.classList.toggle("ibc-is-expanded");
  }

  function restoreLanguage() {
    const googleTranslateFrame = document.querySelector("#\\:2\\.container"); // Selector with meta-character using literals
    const restoreButton =
      getIframeDocument(googleTranslateFrame).querySelector("#\\:2\\.restore");

    restoreButton.click();
    deleteCookie("googtrans");
  }

  function setLanguage(option, language, executeGTF = false) {
    if (executeGTF) {
      if (defaultLanguage !== language.iso) {
        const googleTranslateFrame = document.querySelectorAll(
          "iframe.skiptranslate"
        );

        googleTranslateFrame.forEach((frame) => {
          getIframeDocument(frame)
            .querySelectorAll("span.text")
            .forEach((span) => {
              if (language.text.includes(span.innerText)) {
                span.click();
              }
            });
        });
      } else {
        restoreLanguage();
      }
    }

    languageLabel.innerText = language.label;
    languageOptions.forEach((option) => {
      option.classList.remove("ibc-is-active");
    });

    if (languageFlag) {
      removeClassByPrefix(languageFlag, "flag-");
      languageFlag.classList.add(language.flag);
    }

    option.classList.add("ibc-is-active");
  }

  function changeLanguage(event) {
    const option = event.currentTarget;
    const language = option.dataset.iso;

    setLanguage(option, languages[language], true);
  }

  let languageCookie = getCookie("googtrans");
  if (languageCookie) {
    const language = languageCookie.split("/")[2];
    const option = languageSwitcher.querySelector(
      `.js-language-switcher-option[data-iso="${language}"]`
    );

    // Set cookie's language if it's different from site's default language
    if (defaultLanguage !== language && option)
      setLanguage(option, languages[language]);
  }

  if (languageButton) {
    languageButton.addEventListener("click", toggleSwitcher);
  }

  if (languageOptions) {
    languageOptions.forEach((option) => {
      option.addEventListener("click", changeLanguage);
    });
  }

  document.addEventListener("mouseup", (e) => {
    if (
      !jQuery(".js-language-switcher").is(e.target) &&
      jQuery(".js-language-switcher").has(e.target).length === 0
    ) {
      if (languageSwitcher.classList.contains("ibc-is-expanded")) {
        languageSwitcher.classList.remove("ibc-is-expanded");
      }
    }
  });
});
