// ========================================
// Nivethitha Mariyappan - Portfolio JS
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    // ========================================
    // MOBILE MENU
    // ========================================

    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        const navLinks = nav.querySelectorAll("a");

        navLinks.forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });
    }


    // ========================================
    // DARK / LIGHT MODE
    // ========================================

    const themeToggle = document.querySelector("#themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            document.body.classList.add("dark");
        }

        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark");

            if (document.body.classList.contains("dark")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }


    // ========================================
    // CURRENT YEAR
    // ========================================

    const yearElement = document.querySelector("#year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ========================================
    // SMOOTH SCROLL
    // ========================================

    const smoothLinks = document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(function (link) {

        link.addEventListener("click", function (e) {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });

    });


    // ========================================
    // ACTIVE NAVIGATION ON SCROLL
    // ========================================

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(".nav a");

    if (sections.length > 0 && navigationLinks.length > 0) {

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        };

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        navigationLinks.forEach(function (link) {
                            link.classList.remove("active");
                        });

                        const activeLink = document.querySelector(
                            '.nav a[href="#' + entry.target.id + '"]'
                        );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }
                    }

                });

            },
            observerOptions
        );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }


    // ========================================
    // SCROLL REVEAL ANIMATION
    // ========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .skill-card, .certificate-card"
    );

    if (revealElements.length > 0) {

        const revealObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        revealObserver.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });
    }


    // ========================================
    // PROJECT CARD HOVER EFFECT
    // ========================================

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("hovered");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("hovered");
        });

    });


    // ========================================
    // CONTACT FORM - WEB3FORMS
    // ========================================

    const contactForm = document.querySelector("#contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const form = e.target;
            const status = document.querySelector("#formStatus");
            const button = form.querySelector("button");

            if (!status || !button) {
                console.error(
                    "Contact form error: #formStatus or submit button is missing."
                );
                return;
            }

            // Show sending message
            status.textContent = "Sending message...";
            button.disabled = true;
            button.textContent = "Sending...";

            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log("Sending form data:", data);

            try {

                const response = await fetch(
                    "https://api.web3forms.com/submit",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },

                        body: JSON.stringify(data)
                    }
                );

                const result = await response.json();

                console.log("Web3Forms response:", result);

                if (result.success) {

                    status.textContent =
                        "Message sent successfully! Thank you for contacting me.";

                    status.classList.add("success");

                    form.reset();

                } else {

                    status.textContent =
                        result.message ||
                        "Something went wrong. Please try again.";

                    status.classList.add("error");

                    console.error(
                        "Web3Forms submission failed:",
                        result
                    );
                }

            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                status.textContent =
                    "Unable to send the message. Please try again later.";

                status.classList.add("error");

            } finally {

                button.disabled = false;
                button.textContent = "Send Message";

            }

        });

    }


    // ========================================
    // TYPING EFFECT
    // ========================================

    const typingElement = document.querySelector("#typingText");

    if (typingElement) {

        const words = [
            "Software Developer",
            "Applications Engineer",
            "Python Developer",
            "Java Developer",
            "Full Stack Developer"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex + 1);

                characterIndex++;

                if (characterIndex === currentWord.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typingElement.textContent =
                    currentWord.substring(0, characterIndex - 1);

                characterIndex--;

                if (characterIndex === 0) {

                    deleting = false;

                    wordIndex++;

                    if (wordIndex >= words.length) {
                        wordIndex = 0;
                    }
                }
            }

            const speed = deleting ? 50 : 100;

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }


    // ========================================
    // SKILL BAR ANIMATION
    // ========================================

    const skillBars = document.querySelectorAll(".skill-progress");

    if (skillBars.length > 0) {

        const skillObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const bar = entry.target;
                        const percentage =
                            bar.getAttribute("data-progress");

                        if (percentage) {
                            bar.style.width = percentage + "%";
                        }

                        skillObserver.unobserve(bar);
                    }

                });

            },
            {
                threshold: 0.3
            }
        );

        skillBars.forEach(function (bar) {
            skillObserver.observe(bar);
        });
    }


    // ========================================
    // BACK TO TOP BUTTON
    // ========================================

    const backToTop = document.querySelector("#backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }


    // ========================================
    // NAVBAR SHADOW ON SCROLL
    // ========================================

    const header = document.querySelector("header");

    if (header) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }

        });

    }


    // ========================================
    // COPY EMAIL
    // ========================================

    const emailCopy = document.querySelector("#copyEmail");

    if (emailCopy) {

        emailCopy.addEventListener("click", async function () {

            const email =
                emailCopy.getAttribute("data-email") ||
                "mnivethitha70@gmail.com";

            try {

                await navigator.clipboard.writeText(email);

                const originalText = emailCopy.textContent;

                emailCopy.textContent = "Copied!";

                setTimeout(function () {
                    emailCopy.textContent = originalText;
                }, 1500);

            } catch (error) {

                console.error(
                    "Could not copy email:",
                    error
                );

            }

        });

    }


    // ========================================
    // CONSOLE MESSAGE
    // ========================================

    console.log(
        "Nivethitha Mariyappan Portfolio loaded successfully."
    );

});