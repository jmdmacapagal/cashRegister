const denomDisplay = document.querySelector('#denomination')
const owedInput = document.querySelector('#owed')
const tenderedInput = document.querySelector('#tendered')
const changeDisplay = document.querySelector('#change')
const denomination = [1000, 500, 200, 100, 50, 20, 10, 5, 1, 0.25, 0.10, 0.05];
let owed;
let tendered;

cashRegister(owed, tendered)

function cashRegister(owed, tendered) {
    const difference = tendered - owed;
    let assumedChange = difference;
    let change = 0;
    let denominationBreakdown = []
    if (owed === 0) {
        change = 0;
    }
    
   for (let i = 0; i < denomination.length; i++) {
        while(denomination[i] <= assumedChange) {
            change+=denomination[i]
            denominationBreakdown.push(denomination[i])
            assumedChange-=denomination[i]
        }
   }
   changeDisplay.textContent = `${change} php`
   denomDisplay.innerHTML = ''


    const breakdown = denominationBreakdown.reduce((acc, x) => {
        acc[x] = (acc[x] || 0) + 1;
        return acc;
    }, {});


   for(const denom in breakdown){
       const li = document.createElement('li')
       const span = document.createElement('span')
       li.textContent = `${denom} php`
       span.textContent = `${breakdown[denom]}`
       li.appendChild(span)
       denomDisplay.appendChild(li)
   }

    console.log(breakdown)
}



owedInput.addEventListener('input', e => {
    owed = Number(e.target.value)
    cashRegister(owed, tendered)
})

tenderedInput.addEventListener('input', e => {
    tendered = Number(e.target.value)
    cashRegister(owed, tendered)
})

