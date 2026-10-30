
const translations = {

    en: {

        // =========================
        // NAVIGATION
        // =========================

        "nav.quickstart": "QUICKSTART",
        "nav.about": "ABOUT",
        "nav.newsletter": "JOIN THE OPERATION",


        // =========================
        // HERO
        // =========================

        "hero.classification":
            "CLASSIFIED // OPERATION STRAY BULLET",

        "hero.subtitle":
            "A COLD WAR ESPIONAGE TTRPG",

        "hero.description":
            "Infiltrate. Investigate. Survive.<br>The Cold War is full of secrets.",

        "hero.button":
            "GET THE QUICKSTART",


        // =========================
        // QUICKSTART
        // =========================

        "quickstart.label":
            "DOCUMENT 001",

        "quickstart.title":
            "THE QUICKSTART",

        "quickstart.subtitle":
            "Your first mission begins here.",

        "quickstart.text1":
            "Stray Bullet is a tabletop roleplaying game inspired by the espionage thrillers and Cold War fiction of the 1960s.",

        "quickstart.text2":
            "Infiltrate enemy facilities, steal information, manipulate contacts and survive missions where one mistake can compromise everything.",

        "quickstart.text3":
            "The Quickstart contains everything you need to play your first operation.",

        "quickstart.button":
            "DOWNLOAD THE QUICKSTART",


        // =========================
        // NEWSLETTER
        // =========================

        "newsletter.label":
            "PERSONNEL RECRUITMENT",

        "newsletter.title":
            "JOIN THE OPERATION",

        "newsletter.description":
            "Get the Quickstart and receive news about Stray Bullet, development updates and the upcoming Kickstarter.",

        "newsletter.emailLabel":
            "EMAIL ADDRESS",

        "newsletter.button":
            "JOIN",

        "newsletter.privacy":
            "By joining, you agree to receive communications about Stray Bullet.",


        // =========================
        // ABOUT
        // =========================

        "about.label":
            "DOSSIER",

        "about.title":
            "ABOUT STRAY BULLET",

        "about.intro":
            "Stray Bullet is a tabletop roleplaying game set against a fictionalized Cold War.",

        "about.text1":
            "Players take the role of agents operating in a world of espionage, political tension, covert operations and dangerous secrets.",

        "about.text2":
            "Information is a weapon. Trust is a liability. Every operation can change the course of the mission.",


        // =========================
        // FOOTER
        // =========================

        "footer.about":
            "ABOUT",

        "footer.privacy":
            "PRIVACY",

        "footer.contact":
            "CONTACT",

        "footer.copyright":
            "© 2026 Stray Bullet. All rights reserved."

    },


    es: {

        // =========================
        // NAVEGACIÓN
        // =========================

        "nav.quickstart":
            "QUICKSTART",

        "nav.about":
            "SOBRE EL JUEGO",

        "nav.newsletter":
            "ÚNETE A LA OPERACIÓN",


        // =========================
        // HERO
        // =========================

        "hero.classification":
            "CLASIFICADO // OPERACIÓN STRAY BULLET",

        "hero.subtitle":
            "UN JUEGO DE ROL DE ESPIONAJE DE LA GUERRA FRÍA",

        "hero.description":
            "Infiltra. Investiga. Sobrevive.<br>La Guerra Fría está llena de secretos.",

        "hero.button":
            "CONSIGUE EL QUICKSTART",


        // =========================
        // QUICKSTART
        // =========================

        "quickstart.label":
            "DOCUMENTO 001",

        "quickstart.title":
            "EL QUICKSTART",

        "quickstart.subtitle":
            "Tu primera misión comienza aquí.",

        "quickstart.text1":
            "Stray Bullet es un juego de rol de mesa inspirado en los thrillers de espionaje y la ficción de la Guerra Fría de los años 60.",

        "quickstart.text2":
            "Infíltrate en instalaciones enemigas, roba información, manipula contactos y sobrevive a misiones donde un solo error puede comprometerlo todo.",

        "quickstart.text3":
            "El Quickstart contiene todo lo necesario para jugar tu primera operación.",

        "quickstart.button":
            "DESCARGA EL QUICKSTART",


        // =========================
        // NEWSLETTER
        // =========================

        "newsletter.label":
            "RECLUTAMIENTO DE PERSONAL",

        "newsletter.title":
            "ÚNETE A LA OPERACIÓN",

        "newsletter.description":
            "Consigue el Quickstart y recibe noticias sobre Stray Bullet, actualizaciones del desarrollo y novedades sobre el próximo Kickstarter.",

        "newsletter.emailLabel":
            "DIRECCIÓN DE EMAIL",

        "newsletter.button":
            "UNIRME",

        "newsletter.privacy":
            "Al unirte, aceptas recibir comunicaciones sobre Stray Bullet.",


        // =========================
        // ABOUT
        // =========================

        "about.label":
            "DOSIER",

        "about.title":
            "SOBRE STRAY BULLET",

        "about.intro":
            "Stray Bullet es un juego de rol de mesa ambientado en una versión ficticia de la Guerra Fría.",

        "about.text1":
            "Los jugadores interpretan a agentes que operan en un mundo de espionaje, tensión política, operaciones encubiertas y secretos peligrosos.",

        "about.text2":
            "La información es un arma. La confianza, una responsabilidad. Cada operación puede cambiar el curso de la misión.",


        // =========================
        // FOOTER
        // =========================

        "footer.about":
            "SOBRE EL JUEGO",

        "footer.privacy":
            "PRIVACIDAD",

        "footer.contact":
            "CONTACTO",

        "footer.copyright":
            "© 2026 Stray Bullet. Todos los derechos reservados."

    }

};



// =====================================================
// QUICKSTART COVERS
// =====================================================

const covers = {

    en: "images/portada_sb_ingles.png",

    es: "images/portada_sb_español.png"

};



// =====================================================
// CLOUDFLARE WORKER
// =====================================================

const MAILERLITE_WORKER_URL = "mailerlite.straybullet-rpg.workers.dev";



// =====================================================
// CHANGE LANGUAGE
// =====================================================

function setLanguage(language) {

    const languageData = translations[language];

    if (!languageData) {
        return;
    }


    // -----------------------------------------
    // Translate page
    // -----------------------------------------

    document
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key = element.dataset.i18n;

            if (languageData[key] !== undefined) {

                element.innerHTML =
                    languageData[key];

            }

        });


    // -----------------------------------------
    // Change Quickstart cover
    // -----------------------------------------

    const cover =
        document.getElementById("quickstart-cover");

    if (cover) {

        cover.src =
            covers[language];

        cover.alt =
            language === "es"
                ? "Portada del Quickstart de Stray Bullet en español"
                : "Stray Bullet Quickstart cover in English";

    }


    // -----------------------------------------
    // Update language buttons
    // -----------------------------------------

    document
        .querySelectorAll(".language-button")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.language === language
            );

        });


    // -----------------------------------------
    // Update HTML language
    // -----------------------------------------

    document.documentElement.lang =
        language;


    // -----------------------------------------
    // Save language
    // -----------------------------------------

    localStorage.setItem(
        "strayBulletLanguage",
        language
    );

}



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


            const emailInput =
                document.getElementById("email");


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            if (!email) {
                return;
            }


            // -------------------------------------
            // Get current language
            // -------------------------------------

            const language =
                document.documentElement.lang || "en";


            // -------------------------------------
            // Find submit button
            // -------------------------------------

            const submitButton =
                newsletterForm.querySelector(
                    'button[type="submit"]'
                );


            const originalButtonText =
                submitButton
                    ? submitButton.textContent
                    : "";


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    language === "es"
                        ? "ENVIANDO..."
                        : "SENDING...";

            }


            try {

                // ---------------------------------
                // Send to Cloudflare Worker
                // ---------------------------------

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


                const result =
                    await response.json();


                // ---------------------------------
                // Check response
                // ---------------------------------

                if (!response.ok ||
                    !result.success) {

                    throw new Error(
                        "Subscription failed"
                    );

                }


                // ---------------------------------
                // Success
                // ---------------------------------

                if (submitButton) {

                    submitButton.textContent =
                        language === "es"
                            ? "¡LISTO!"
                            : "CONFIRMED!";

                }


                emailInput.value = "";


                // ---------------------------------
                // Restore button after a moment
                // ---------------------------------

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


                // ---------------------------------
                // Error
                // ---------------------------------

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



// =====================================================
// LANGUAGE BUTTONS
// =====================================================

document
    .querySelectorAll(".language-button")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.language
                );

            }
        );

    });



// =====================================================
// INITIAL LANGUAGE
// =====================================================

const savedLanguage =
    localStorage.getItem(
        "strayBulletLanguage"
    );


setLanguage(
    savedLanguage || "en"
);