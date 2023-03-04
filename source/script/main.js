window.i18n = {
  allowLang: ["en", "ru"],
  defaultLang: "ru", // language of the HTML page
  defaultI18N: null, // object with default content
  currentLang: "", // set default other then lang on page
  langPath: "./",

  setLang(new_lan = null) {
    // order: param -> localStorage -> browser
    let lang = new_lan;
    const url = new URL(window.location);
    if (!lang) lang = url.searchParams.get("lang")?.toLowerCase();
    if (this.allowLang.indexOf(lang) <= -1) lang = null;
    if (!lang) lang = localStorage.getItem("lang");
    if (!lang) {
      lang = window.navigator
        ? window.navigator.language ||
          window.navigator.systemLanguage ||
          window.navigator.userLanguage
        : this.defaultLang;
      lang = lang.substring(0, 2).toLowerCase();
    }
    if (!!lang) {
      localStorage.setItem("lang", lang);
      if (lang != this.defaultLang) url.searchParams.set("lang", lang);
      else url.searchParams.delete("lang");
      window.history.replaceState(
        {},
        "",
        `${location.pathname}${
          url.searchParams.toString() ? "?" + url.searchParams.toString() : ""
        }`
      );
    }
    this.currentLang = lang;
    return lang;
  },

  _getLangUrl() {
    return this.langPath + this.currentLang + ".json";
  },

  replaceLang(i18nLangs) {
    console.log(i18nLangs)
    if (!i18nLangs) return;
    const isDefaultNeeded =
      this.currentLang != this.defaultLang && !this.defaultI18N;
    if (isDefaultNeeded) this.defaultI18N = new Object();

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (!i18nLangs[element.dataset.i18n]) return;

      if (element.dataset.i18n_target) {
        if (isDefaultNeeded)
          this.defaultI18N[element.dataset.i18n] =
            element[element.dataset.i18n_target];
        // to replace image src and etc.
        element[element.dataset.i18n_target] = i18nLangs[element.dataset.i18n];
      } else {
        if (isDefaultNeeded)
              this.defaultI18N[element.dataset.i18n] = !!element.placeholder ? element.placeholder : element.innerHTML;
        switch (element.tagName.toLowerCase()) {
          case "input":
          case "textarea":
            element.placeholder = i18nLangs[element.dataset.i18n];
          default:
            element.innerHTML = i18nLangs[element.dataset.i18n];
        }
      }
    });
  },

  fetchLang() {
    if (!this.currentLang) return;

    if (this.currentLang == this.defaultLang) {
      if (!this.defaultI18N) return;
      this.replaceLang(this.defaultI18N);
      return;
    } else if (!!this.defaultI18N) this.defaultI18N = null;

    fetch(this._getLangUrl())
      .then((response) =>
        response.json().then((res) => {
          this.replaceLang(res);
        })
      )
      .catch((err) => console.error(err));
  },
};

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("loading...");

  function NotReady() {
    if (getCookie("dev") != "true") {
      document.body.insertAdjacentHTML(
        "afterbegin",
        `
            <noindex id="NotReady" class="popup" style="text-align: center;">
                <button data-popup-close class="popup__back"></button>
                <button data-popup-close class="popup__x" title="Close popup">x</button>
                <p>Здесь появится новая версия сайта <a href="https://vk.com/bouhartsev" style="color: blue">Матвея Бухарцева</a>
                <br>The site is being developed</p>
                <button data-popup-close class="popup__button">OK</button>
                <button data-popup-close class="popup__button" onclick="document.cookie='dev=true;path=/;'">Больше не показывать</button>
            </noindex>
            `
      );
      if (window.location.hash.split("?")[0] != "#NotReady")
        togglePopup(null, "#NotReady");
      document.cookie = "dev=false;path=/;";
    } else {
      console.log("The site is being developed");
    }
  }
  // NotReady();

  let transition_time =
    Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--transition-time")
        .split(" ")[1]
        .slice(0, -1)
    ) * 1000;
  let size_tablet = Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue("--size-tablet")
      .slice(0, -2)
  );

  function HeaderOnScroll() {
    //Change header to fixed and reverse
    if (
      document.querySelector("main").offsetTop - window.pageYOffset <= 0 &&
      !document.querySelector("header").classList.contains("headerFixed")
    ) {
      document.querySelector("body").classList.add("add-empty");
      document
        .querySelector(".add-empty")
        .style.setProperty(
          "--header-height",
          document.querySelector("header").clientHeight + "px"
        );
      document.querySelector("header").classList.add("headerFixed");
      //window.pageYOffset = 0;
    } else if (
      document.querySelector("main").offsetTop - window.pageYOffset >
      0
    ) {
      document.querySelector("header").classList.remove("headerFixed");
      document.querySelector("body").classList.remove("add-empty");
    }
  }

  function isBurger() {
    if (window.innerWidth <= size_tablet) {
      if (!document.querySelector("header").classList.contains("headerFixed")) {
        document.querySelector("body").classList.add("add-empty");
        document.querySelector("header").classList.add("headerFixed");
      }
      window.removeEventListener("scroll", HeaderOnScroll);
      document
        .querySelector(".add-empty")
        .style.setProperty(
          "--header-height",
          document.querySelector("header").clientHeight + "px"
        );
      return true;
    } else {
      window.addEventListener("scroll", HeaderOnScroll);
      HeaderOnScroll(); // избыточность. работает. не трогай.
      return false;
    }
  }

  function clickBurger() {
    // $(".header__burger, header nav, header nav ul, body").toggleClass('burger-active', Number(getComputedStyle(document.documentElement).getPropertyValue('--transition-time').split(' ')[1].slice(0,-1))*1000);
    document
      .querySelectorAll(".header__burger, header nav, header nav ul, body")
      .forEach((el) => {
        el.classList.toggle("burger-active"); // проблема - при увеличении высоты экрана вручную видно страницу снизу
      });
  }

  isBurger();
  window.addEventListener("resize", isBurger);
  document.querySelector("#burger")?.addEventListener("click", clickBurger);

  // Для вызова использовать ссылку - <a href="popup_id" data-change-popup>Text</a>
  function togglePopup(event, target_id = null) {
    let popup = null;
    if (event && event.currentTarget.hasAttribute("data-popup-close")) {
      popup = event.currentTarget.parentNode;
      window.history.replaceState(
        {},
        "",
        `${location.pathname}${location.search ? "?" + location.search : ""}`
      );
    } else {
      if (event) target_id = event.currentTarget.getAttribute("href");
      try {
        if (target_id) popup = document.querySelector(".popup" + target_id);
      } catch {
        popup = false;
      }
    }
    if (popup) {
      popup.classList.toggle("popup_opened");
      document.body.classList.toggle("overflow-hidden");
    } else if (popup != null) {
      console.log("Popup '" + target_id + "' doesn't exist");
    }
  }

  document
    .querySelectorAll("[data-popup-open], [data-popup-close]")
    .forEach((el) => el.addEventListener("click", togglePopup));
  togglePopup(null, window.location.hash.split("?")[0]);

  window.i18n.setLang();
  // add button to DOM programmaticaly
  const change_lang = document.querySelector("#change_lang");
  change_lang?.setAttribute(
    "aria-checked",
    String(i18n.currentLang !== i18n.defaultLang)
  );
  change_lang?.addEventListener("click", (e) => {
    const new_value = !(change_lang.getAttribute("aria-checked") === "true");
    if (new_value === false) window.i18n.setLang("ru");
    else window.i18n.setLang("en");
    window.i18n.fetchLang();
    change_lang.setAttribute("aria-checked", String(!!new_value));
  });
  window.i18n.fetchLang();
});
