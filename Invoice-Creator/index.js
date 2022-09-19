//Global Variables
const services = {
    "Blondies": 20,
    "Brownies": 15,
    "Lemon pie": 25
  }
  let servicesUsed = [];
  const invoiceContainerDiv = document.getElementById("invoicecontainer");
  const invoiceTotalEl = document.getElementById("invoicetotal");
  
  function addToInvoice(x) {
    if (servicesUsed.indexOf(x) >= 0) {
      removeItem(x);
      return;
    }
    let servicePressed = document.getElementById(x.split(" ").join("").toLowerCase());
    servicesUsed.push(x, services[x]);
    renderInvoice(servicesUsed);
    servicePressed.style.background = "#4A4E74";
    servicePressed.style.color = "#fef4ed"
    // document.getElementById(`${x.split(" ").join("").toLowerCase().style.border = "1px solid black"}`);
  }
  
  function renderInvoice(servicesUsed) {
    let renderedInvoice = "";
    const invoiceTotal = [];
    for (let i=0; i<servicesUsed.length; i+=2) {
      renderedInvoice += `
        <div class="container">
          <div><p class="invoiceitems">${servicesUsed[i]} <sup onclick="removeItem('${servicesUsed[i]}')"><em>Remove<em><sup></p></div>
          <div><p class="invoiceitems"><span class="text-lighttoffee">$</span>${servicesUsed[i+1]}</p></div>
        </div>
      `
      invoiceTotal.push(Number(servicesUsed[i+1]))
    }
    invoiceContainerDiv.innerHTML = renderedInvoice;
    calcTotal(invoiceTotal);
  }
  
  function calcTotal(invoiceTotal) {
    let total = invoiceTotal.reduce(function(total, num) {
      return total + num;
    }, 0)
    renderTotal(total);
  }
  
  function renderTotal(total) {
    if (!total) {
      invoiceTotalEl.innerText = "";
    } else {
      invoiceTotalEl.innerText = `$${total}`;
    }
  }
  
  function sendInvoice() {
    // invoiceContainerDiv.innerHTML = "";
    // invoiceTotalEl.innerText = "";
    // servicesUsed = [];
    let sentInvoice = [...servicesUsed];
    console.log(sentInvoice);
    sentInvoice.map(x => {
      if (typeof x === "string") {
        removeItem(x);
      }
    })
    
  }
  
  function removeItem(x) {
    servicesUsed.splice(servicesUsed.indexOf(x), 2);
    let servicePressed = document.getElementById(x.split(" ").join("").toLowerCase());
    servicePressed.style.background = "#fef4ed";
    servicePressed.style.color = "#4A4E74";
    renderInvoice(servicesUsed);
  }