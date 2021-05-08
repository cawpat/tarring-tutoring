window.onload = function() {
    forEachOptionInSection(document, "pricing-option", (pricingOption) => {
        pricingOption.addEventListener("click", (event) => {
            const clickedElement = event.target;

            forEachOptionInSection(clickedElement.parentNode, "pricing-option", (pricingOption) => {
                pricingOption.classList.remove("selected");
            })

            clickedElement.classList.add("selected");

            const selectedLevelElement = document.getElementsByClassName("pricing-option-level selected")[0]
            const selectedPayTypeElement = document.getElementsByClassName("pricing-option-pay selected")[0]
            const selectedLocationElement = document.getElementsByClassName("pricing-option-location selected")[0]
            
            const selectedLevel = selectedLevelElement ? selectedLevelElement.dataset.level : ""
            const selectedPayType = selectedPayTypeElement? selectedPayTypeElement.dataset.paytype: ""
            const selectedLocation = selectedLocationElement? selectedLocationElement.dataset.location: ""

            const newPrice = calulatePriceForLevel(selectedLevel)
            const newMultiplier = calulateMultiplierForPay(selectedPayType)
            const newTravelCost = calulateTravelCost(selectedLocation)

            document.getElementById("total-cost-value").textContent = ((newPrice * newMultiplier) + newTravelCost).toFixed(2);

            updateContactLink(selectedLevel, selectedPayType, selectedLocation)
        });
    })
}

function updateContactLink(level, payType, location){
    function getPrettyLevel() {
        switch(level) {
            case "ks3":
              return "KS3 "
            case "gcse":
              return "GCSE "
            case "alevel":
                return "A-Level "
            default:
              return ""
        }
    }

    function getPrettyPayType() {
        switch(payType) {
            case "per":
              return " paid per session"
            case "bulk":
              return " paid in bulk"
            default:
              return ""
        }
    }

    function getPrettyLocation() {
        switch(location) {
            case "online":
              return " - Online"
            case "mine":
              return " - Tutors home"
            case "theirs":
                return " - Tutee's home"
            default:
              return ""
        }
    }

    if(level !== "" && payType !== "" && location !== ""){
        const bookLink = document.getElementById("book-via-email-link")
        bookLink.href = `mailto:ness.gibbons@hotmail.com?subject= ${getPrettyLevel()}English Tutoring${getPrettyPayType()}${getPrettyLocation()}`
        bookLink.style.display = "block"
    }
}

function calulatePriceForLevel(level) {
    switch(level) {
        case "ks3":
          return 25.00
        case "gcse":
          return 30.00
        case "alevel":
            return 40.00
        default:
          return 0.00
      }
}


function calulateMultiplierForPay(payType) {
    switch(payType) {
        case "per":
          return 1
        case "bulk":
          return 0.9
        default:
          return 1
      }
}


function calulateTravelCost(location) {
    switch(location) {
        case "online":
          return 0
        case "mine":
          return 0
        case "theirs":
            return 5
        default:
          return 0
      }
}

function forEachOptionInSection(section, classSelector, fn){
    const elements = section.getElementsByClassName(classSelector)

    for(let i = 0; i < elements.length; i++) {
        fn(elements[i])
    }
}