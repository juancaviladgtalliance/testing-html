import "./style.css"
import javascriptLogo from "./javascript.svg"
import {
  ibcDomReady,
  removeClassByPrefix,
  getIframeDocument,
  getCookie,
  deleteCookie,
} from "./carbonite/base/utils.js"
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
}

const languageHandler = language => {
  const googleTranslateFrame = document.querySelectorAll(".gtranslate_wrapper  select.gt_selector.notranslate")
  console.log(googleTranslateFrame)

  googleTranslateFrame.forEach(frame => {
    getIframeDocument(frame)
      .querySelectorAll("option.text")
      .forEach(span => {
        if (language.text.includes(span.innerText)) {
          span.click()
        }
      })
  })
}
function restoreLanguage() {
  const googleTranslateFrame = document.querySelector("#\\:2\\.container") // Selector with meta-character using literals
  const restoreButton =
    getIframeDocument(googleTranslateFrame).querySelector("#\\:2\\.restore")

  restoreButton.click()
  //deleteCookie("googtrans");
}
window.languageHandler = languageHandler
window.restoreLanguage = restoreLanguage
document.addEventListener('DOMContentLoaded', () => {})
