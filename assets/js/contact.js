"use strict";

const form = document.querySelector("#contact-form");
const send = form.querySelector("button[type='submit']");
const formStatus = document.querySelector("#form-status");
const fields = form.querySelectorAll("[required]");

for (const field of fields) {
  field.addEventListener("input", () => field.setCustomValidity(""));
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  for (const field of fields) {
    field.setCustomValidity(field.value.trim() ? "" : "Please complete this field.");
  }

  if (send.disabled || !form.reportValidity()) return;

  const body = new FormData(form);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);

  send.disabled = true;
  for (const field of fields) field.readOnly = true;
  formStatus.textContent = "Sending your message…";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body,
      signal: controller.signal
    });
    const data = await response.json();

    // Formspree's client also recognizes a success response containing a next URL.
    const accepted = data?.ok === true ||
      (data?.ok === undefined && typeof data?.next === "string" && data.next.trim() !== "");

    if (response.ok && accepted && !data.errors?.length) {
      form.reset();
      formStatus.textContent = "Formspree accepted your message. Thank you for getting in touch.";
    } else {
      formStatus.textContent = "The form service could not accept your message. Please try again or contact me by email.";
    }
  } catch {
    formStatus.textContent = "I couldn’t confirm that the form service received your message. Please try again or contact me by email.";
  } finally {
    window.clearTimeout(timeout);
    send.disabled = false;
    for (const field of fields) field.readOnly = false;
  }
});
