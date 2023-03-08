document.addEventListener("DOMContentLoaded", function () {
  function zooming() {
    document
      .querySelector("html")
      .setAttribute(
        "style",
        "zoom: " +
          document.documentElement.clientWidth /
            (document.body.clientWidth + 30)
      );
  }
  zooming();

  const element = document.body;
  var opt = {
    margin: 0,
    filename: "Bouhartsev_CV_programmer",
    // image: { type: "jpeg", quality: 0.98 },
    // html2canvas: { scale: 2 },
    jsPDF: {
      unit: "px",
      hotfixes: ["px_scaling"],
      putOnlyUsedFonts: true,
      floatPrecision: "smart",
    },
  };

//   html2pdf().set(opt).from(element).save();
});
