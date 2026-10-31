// =====================================================
// CLOUDFLARE WORKER
// =====================================================

const MAILERLITE_WORKER_URL =
    "https://mailerlite.straybullet-rpg.workers.dev/";



// =====================================================
// NEWSLETTER FORM
// =====================================================

const newsletterForm =
    document.querySelector(".newsletter-form");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            // -----------------------------------------
            // Get form elements
            // -----------------------------------------

            const emailInput =
                document.getElementById("email");

            const submitButton =
                newsletterForm.querySelector(
                    'button[type="submit"]'
                );


            if (!emailInput) {
                return;
            }


            // -----------------------------------------
            // Get email
            // -----------------------------------------

            const email =
                emailInput.value.trim();


            if (!email) {
                return;
            }


            // -----------------------------------------
            // Get page language
            // -----------------------------------------

            const language =
                document.documentElement.lang === "es"
                    ? "es"
                    : "en";


            // -----------------------------------------
            // Save original button text
            // -----------------------------------------

            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            // -----------------------------------------
            // Loading state
            // -----------------------------------------

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    language === "es"
                        ? "ENVIANDO..."
                        : "SENDING...";

            }


            try {

                // -------------------------------------
                // Send to Cloudflare Worker
                // -------------------------------------

                const response =
                    await fetch(
                        MAILERLITE_WORKER_URL,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                language: language
                            })
                        }
                    );


                // -------------------------------------
                // Read response
                // -------------------------------------

                const result =
                    await response.json();


                // -------------------------------------
                // Check response
                // -------------------------------------

                if (
                    !response.ok ||
                    !result.success
                ) {

                    throw new Error(
                        "Subscription failed"
                    );

                }


                // -------------------------------------
                // Success
                // -------------------------------------

                if (submitButton) {

                    submitButton.textContent =
                        language === "es"
                            ? "¡LISTO!"
                            : "CONFIRMED!";

                }


                emailInput.value = "";


                // -------------------------------------
                // Restore button
                // -------------------------------------

                setTimeout(() => {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            originalButtonText;

                    }

                }, 4000);


            } catch (error) {

                console.error(
                    "Newsletter error:",
                    error
                );


                // -------------------------------------
                // Error
                // -------------------------------------

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        language === "es"
                            ? "ERROR — REINTENTAR"
                            : "ERROR — TRY AGAIN";

                }

            }

        }
    );

}