const adviceId = document.querySelector(".main__heading--span")
const adviceBody = document.querySelector(".main__body")
const diceBtn = document.querySelector('.main__dice--container')
const dice = document.querySelector(".dice")
const main = document.querySelector(".main")

// Advice injection
function insertHtml(data) {
    adviceId.textContent = data.id
    adviceBody.textContent = data.advice

}
// Error injection 
function err(e) {
    adviceBody.textContent = e
}

async function getData() {
    try {
        // Roll Dice temporarily
        dice.classList.add("animateBtn")
        // fetch Data
        const res = await fetch("https://api.adviceslip.com/advice")

        // Remove Btn When data found
        if (res) dice.classList.remove("animateBtn")
        // Handling errors
        if (!res.ok) throw new Error("could not get advice")
        const data = await res.json()
        // Parsing html
        insertHtml(data.slip)


    }
    catch (e) {
        e => err(e)
    }

}

diceBtn.addEventListener(
    "click", function (e) {
        const click = e.target.closest('.dice') || e.target
        if (!click) return
        getData()

    }
)
window.addEventListener("load", () => {

    getData();



}
)

