"use strict";

const contactForm = document.querySelector("#contact-form");

if (contactForm && typeof fetch === "function" && typeof AbortController === "function") {
  enhanceContactForm(contactForm);
}

function enhanceContactForm(form) {
  const send = form.querySelector("button[type='submit']");
  const status = form.querySelector("#form-status");
  if (!send || !status) return;

  const fields = [...form.querySelectorAll("input[required], textarea[required]")];
  let sending = false;

  function showFieldError(field, message) {
    const error = document.getElementById(field.id + "-error");
    if (!error) return;

    error.textContent = message;
    error.hidden = !message;
    if (message) {
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", error.id);
    } else {
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");
    }
  }

  form.addEventListener("invalid", (event) => {
    if (fields.includes(event.target)) {
      showFieldError(event.target, event.target.validationMessage);
    }
  }, true);

  form.addEventListener("input", (event) => {
    if (!fields.includes(event.target)) return;

    event.target.setCustomValidity("");
    showFieldError(event.target, "");
    if (!sending) status.textContent = "";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;

    for (const field of fields) {
      field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
    }

    if (!form.reportValidity()) return;

    const body = new FormData(form);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    let firstRejectedField;

    sending = true;
    send.setAttribute("aria-disabled", "true");
    for (const field of fields) {
      showFieldError(field, "");
      field.readOnly = true;
    }
    status.textContent = "Sending your message…";

    try {
      const response = await fetch(form.action, {
        method: form.method.toUpperCase(),
        headers: { Accept: "application/json" },
        body,
        signal: controller.signal
      });
      const data = await response.json().catch((error) => {
        if (controller.signal.aborted) throw error;
        return null;
      });
      const providerErrors = Array.isArray(data?.errors) ? data.errors : [];

      // Formspree's client also recognizes a success response containing a next URL.
      const accepted = data?.ok === true ||
        (data?.ok === undefined && typeof data?.next === "string" && data.next.trim() !== "");

      if (response.ok && accepted && !providerErrors.length) {
        form.reset();
        status.textContent = "Formspree accepted your message. Thank you for getting in touch.";
      } else {
        for (const error of providerErrors) {
          const field = fields.find((input) => input.name === error?.field);
          if (field && typeof error.message === "string" && error.message.trim()) {
            showFieldError(field, error.message);
            firstRejectedField ??= field;
          }
        }

        if (firstRejectedField) {
          status.textContent = "The form service asked you to correct the highlighted fields.";
        } else if (response.status === 429) {
          status.textContent = "The form service is limiting submissions. Please wait or contact me by email.";
        } else if (response.ok && data?.ok !== false && !providerErrors.length) {
          status.textContent = "The form service didn’t confirm acceptance. Your message is still in the form.";
        } else {
          status.textContent = "The form service could not accept your message. Please try again or contact me by email.";
        }
      }
    } catch {
      status.textContent = controller.signal.aborted
        ? "The request timed out before the form service confirmed acceptance. Your message is still in the form."
        : "I couldn’t confirm that the form service received your message. Your message is still in the form.";
    } finally {
      window.clearTimeout(timeout);
      sending = false;
      send.removeAttribute("aria-disabled");
      for (const field of fields) field.readOnly = false;
      if (form.contains(document.activeElement)) firstRejectedField?.focus();
    }
  });
}
