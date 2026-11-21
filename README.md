# Lora Cholakova · Professional portfolio

A static GitHub Pages portfolio for digital and performance marketing, international e-commerce, and marketing analytics.

## Local preview

From the repository root, run `python3 -m http.server 4173` and open <http://localhost:4173/>. The seven primary pages and two case studies share `assets/css/style.css` and `assets/js/main.js`. Contact form feedback is handled by `assets/js/contact.js`.

The [Portfolio overview](portfolio.html) links to [GIROTTI](girotti.html) and [AEROSUS](aerosus.html). The previous Portfolio fragment URLs still lead to the corresponding overview cards. Each case study has its own canonical URL, title, description, and Open Graph metadata. [The sitemap](sitemap.xml) lists all nine canonical URLs.

## University project checklist

| Requirement | Verified implementation |
| --- | --- |
| At least five complete HTML/CSS pages | Nine standalone pages, including the seven primary pages and two complete case studies. |
| Clear headings, paragraphs, and readable typography | Each page has one main heading, a logical heading hierarchy, and a shared typography scale. |
| Appropriate images and balanced image and text layouts | Home and About use the existing 600 × 600 portrait with dimensions and descriptive alternative text. The case studies use text cards and HTML/CSS workflow diagrams. |
| Functional navigation and visual effects | The shared navigation works with a keyboard at desktop and mobile widths. The menu closes when focus leaves the header, and focus transfers on viewport changes. Hover and scroll effects respect reduced motion. |
| Working contact form | The owner confirmed a real delivery to their inbox through Formspree. The audit exercised the existing HTTPS POST, native fallback, validation, focus, duplicate prevention, and response handling using intercepted requests. |
| Contact information and contact form | Contact provides public email, phone, location, social links, and the labeled form. |
| Internal and external hyperlinks | All 44 internal destinations and local asset paths passed. All seven references and credential issuer URLs responded. Facebook required sign-in and LinkedIn restricted the automated check. |
| Relevant iframe and educational multimedia | Resources & Insights embeds the credited Google Ads video in a responsive, titled iframe and links to its official guide and watch page. The player loaded in Chrome with captions and duration. Playback progress stayed at 0:00 in the test environment. |
| Literature and references | Resources & Insights lists and attributes documentation from Google Ads Help, Merchant Center Help, Google for Developers, Google Cloud, and W3C. |
| Meaningful original content | The verified professional history, case studies, and practical notes cover current work, campaign methods, analytics, and accessibility. |
| Attribution for external sources | The resources page credits its publishers and video, and About credits existing testimonials by name. The portrait and favicon come from the existing portfolio. Inter is distributed under the [SIL Open Font License](assets/fonts/OFL-Inter.txt). |
| Responsive layouts | All nine pages were checked at 320, 430, 768, and 1440 pixels. The short-viewport menu was also exercised at 390 × 240 pixels. |

## Technical audit

- The mobile menu previously stayed open after keyboard focus moved into the page. It now closes on focus leaving the header, Escape, outside clicks, or normal link activation. It scrolls within short viewports and returns focus to a visible control across layout changes.
- The contact submit button previously lost focus and provider validation errors appeared as a generic message. The button retains focus while a request is pending. Inline errors are associated with fields, and the status region reports acceptance, failure, rate limiting, or an unconfirmed result. Input is cleared after confirmed acceptance.
- The public pages load the shared local CSS and JavaScript, with a second local script on Contact. Bootstrap, AOS, Swiper, GLightbox, Isotope, and other legacy vendor assets and Sass sources are kept in the repository to preserve existing asset paths. Browser checks showed no requests for them. The original images and project material are retained.
- No new external scripts, backend, or credentials were added. Form submissions use HTTPS, and the Formspree endpoint ID is public. The provider’s field errors are inserted as text. The public case studies omit confidential campaign figures, account identifiers, and internal materials.
- HTML, CSS, and JavaScript validation, Chromium interactions, and automated accessibility checks were performed. The form’s labels, focus movement, error associations, and status semantics were checked. Spoken announcements across screen-reader/browser combinations remain unverified.

## Contact form and spam protection

The existing Formspree endpoint receives the form by HTTPS POST. JavaScript enhances the same form with an in-page status region. The owner confirmed delivery of a live submission. All submissions during this audit were intercepted in local browser tests.

The hidden `_gotcha` field is a [Formspree honeypot](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/). Tests confirmed it stays outside the tab order and is sent empty in normal submissions. It is a passive spam filter. The provider handles the spam decision.

In Formspree, verify the form’s **Spam protection** setting and active CAPTCHA method, the project’s **Restrict to Domain** value for `loracholakova.github.io`, and spam-folder handling. Formspree documents [reCAPTCHA](https://help.formspree.io/articles/form-and-project-settings/recaptcha-settings), [hCaptcha](https://help.formspree.io/articles/form-and-project-settings/using-hcaptcha), [domain restrictions](https://help.formspree.io/articles/form-and-project-settings/restrict-to-domain), and [plan-dependent advanced filtering](https://help.formspree.io/articles/advanced-features/advanced-spam-filtering). The active settings and plan require Formspree dashboard access to verify.

[Turnstile requires server-side token validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) with a secret. GitHub Pages serves static files, so reliable Turnstile protection would require a compatible form-provider integration or a separate trusted service. The current Formspree integration has no verified Turnstile validation.
