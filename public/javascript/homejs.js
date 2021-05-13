window.onload = function () {
  const downloadbtn = document.querySelector("#download");
  const numberOfbill = document.querySelector("#BillNum");
  const num = numberOfbill.value;

  downloadbtn.addEventListener("click", () => {
    const invoice = document.querySelector(".myInvoice");
    console.log(invoice);
    console.log(window);
    var opt = {
      margin: 1,
      filename: `${num}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().from(invoice).set(opt).save();
    const submit = document.querySelector("#SubmitBtn");
    setTimeout(function () {
      submit.click();
    }, 2000);
  });

  const apply = function () {
    this.color = "red";
  };
};
