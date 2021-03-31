window.onload = function() {
    forEachOption("pricing-option", (pricingOption) => {
        pricingOption.addEventListener("click", (event) => {
            forEachOption("pricing-option", (pricingOption) => {
                pricingOption.classList.remove("selected");
            })

            const clickedElement = event.target;
            clickedElement.classList.add("selected");

            document.getElementById("total-cost-value").textContent = calulatePriceForLevel(clickedElement.dataset.level)
        });
    })
}

function calulatePriceForLevel(level) {
    switch(level) {
        case "ks3":
          return "25.00"
        case "gcse":
          return "30.00"
        case "alevel":
            return "40.00"
        default:
          return "0.00"
      }
}

function forEachOption(classSelector, fn){
    const elements = document.getElementsByClassName(classSelector)

    for(let i = 0; i < elements.length; i++) {
        fn(elements[i])
    }
}