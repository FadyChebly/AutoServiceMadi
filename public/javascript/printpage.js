window.onload = function () {
  const btn = document.querySelector(".Stylebtn");
  const sections = document.querySelector("#FirstSection");
  btn.addEventListener("click", () => {
    btn.style.visibility = "hidden";
    window.print();
  });
};
