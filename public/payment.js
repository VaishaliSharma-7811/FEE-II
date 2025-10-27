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
