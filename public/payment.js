document.getElementById("paymentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const paymentData = {
        name: document.getElementById("name").value,
        cardNumber: document.getElementById("card-number").value,
        expiry: document.getElementById("expiry").value,
        cvv: document.getElementById("cvv").value,
        method: document.getElementById("payment-method").value,
        data: new Date().toLocaleString()
    };


    const errors = [];

    if(!paymentData.name || paymentData.name.length < 2) {
        errors.push("Name must be at least 2 characters.");
    }

    if(!/^\d{16}$/.test(paymentData.cardNumber)) {
        errors.push("Card number must be exactly 16 digits.");
  }

  if(!/^(0[1-9]|1[0-2])\/(\d{2}|\d{4})$/.test(paymentData.expiry)) {
     errors.push("Expiry must be in MM/YY or MM/YYYY format.");
  
       
  }

  if(!/^\d{3,4}$/.test(paymentData.cvv)) {
    errors.push("CVV must be 3 or 4 digits.");

  }

   if (!paymentData.method) {
    errors.push("Please select a payment method.");
  }


if (errors.length > 0) {
    alert("⚠ Please fix the following:\n\n" + errors.join("\n"));
    return;
}


    

    try {

        const res = await fetch("http://localhost:3001/payments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData)
        });

        if (res.ok) {
            alert("✅ Payment Successful! Thank you for booking with DesiStay.");
            const form = document.getElementById("paymentForm");
            if (form) {
                form.reset();
            } else {
                console.error("Form not found for reset!");
            }

        } else {
            alert("❌ Payment failed. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("⚠ Unable to process payment. Please check your JSON Server connection.");
    }

});
