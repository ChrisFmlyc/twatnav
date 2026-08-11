/* TwatNav — landing page behaviour.
   Static site: there is no backend yet. Set FORM_ENDPOINT to a
   Formspree / Buttondown / Cloudflare Worker URL and the forms
   start POSTing. Until then they fall back to a mailto compose. */

const FORM_ENDPOINT = null; // e.g. "https://formspree.io/f/xxxxxxx"
const FALLBACK_MAILTO = "hello@twatnav.com";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

function say(note, message, isError) {
  note.textContent = message;
  note.classList.toggle("err", Boolean(isError));
}

document.querySelectorAll("form.signup").forEach((form) => {
  const input = form.querySelector("input[type=email]");
  const button = form.querySelector("button");
  const note = form.querySelector(".form-note");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = input.value.trim();

    if (!isEmail(email)) {
      say(note, "that doesn't look like an email — try again", true);
      input.focus();
      return;
    }

    if (!FORM_ENDPOINT) {
      say(note, "opening your mail app to finish sign-up…");
      window.location.href =
        `mailto:${FALLBACK_MAILTO}` +
        `?subject=${encodeURIComponent("Waitlist")}` +
        `&body=${encodeURIComponent(`Add me to the TwatNav waitlist: ${email}`)}`;
      return;
    }

    button.disabled = true;
    say(note, "sending…");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) throw new Error(response.statusText);
      form.reset();
      say(note, "you're on the list — see you at launch ♡");
    } catch {
      say(note, `couldn't send — email ${FALLBACK_MAILTO} instead`, true);
    } finally {
      button.disabled = false;
    }
  });
});

/* Reveal sections as they scroll in. */
const reveal = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.style.animation = "rise .8s cubic-bezier(.22,1,.36,1) both";
      reveal.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(".steps li, .safety-grid article, .everyone-inner > *, .waitlist-inner")
    .forEach((element, index) => {
      element.style.animationDelay = `${(index % 4) * 90}ms`;
      reveal.observe(element);
    });
}
