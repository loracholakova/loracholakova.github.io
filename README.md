# Lora Cholakova · Professional portfolio

A static GitHub Pages portfolio for digital and performance marketing, international e-commerce, and marketing analytics.

## Local preview

From the repository root, run `python3 -m http.server 4173` and open <http://localhost:4173/>. The seven pages share `assets/css/style.css` and `assets/js/main.js`. Contact form feedback is handled by `assets/js/contact.js`.

## University project checklist

| Requirement | Page or feature |
| --- | --- |
| At least five complete HTML/CSS pages | Seven standalone pages cover Home, About, Résumé, Services, Portfolio, Resources & Insights, and Contact. |
| Clear headings, paragraphs, and readable typography | Each page has a main heading, a logical heading hierarchy, and a shared responsive type scale. |
| Suitable backgrounds and balanced image and text layouts | White and warm neutral surfaces, portrait layouts on Home and About, and workflow diagrams and content cards on Portfolio. |
| Functional navigation and visual effects | Shared navigation with a current-page indicator and keyboard-operated mobile menu. Visible focus, hover states, and subtle scroll effects that respect reduced motion. |
| Working forms | Contact uses the existing Formspree endpoint with native validation and an enhanced status message after provider confirmation. Local tests simulated provider success and failure. Delivery and server-side spam filtering require verification with the form owner. |
| Frames or iframes where appropriate | Resources & Insights embeds the official Google Ads video in a titled, responsive iframe. The original Google Ads guide and a direct video link are also available. |
| Contact information and contact form | Contact provides email, phone, Sofia location, social links, and a message form. |
| Internal and external hyperlinks | Navigation, case-study anchors, references, qualification links, and public contact channels connect the pages and sources. |
| Literature and references | Resources & Insights includes an organized list from Google Ads Help, Merchant Center Help, Google for Developers, Google Cloud, and W3C. |
| Embedded educational video or audio | The Performance Max video is embedded and credited to Google Ads in Resources & Insights. The official source and embedded player were verified in Chrome. The player loaded with captions and duration, while playback progress remained unverified. |
| Meaningful original content | The professional experience, expertise descriptions, case studies, and practical measurement and accessibility notes provide original content. |
| Attribution of external resources | Resources & Insights credits reference publishers and the video. About credits previously published testimonials by name. Original case-study workflows use HTML and CSS. The portrait and favicon come from the existing portfolio. Inter is distributed under the [SIL Open Font License](assets/fonts/OFL-Inter.txt). |

## Contact form verification

The submitted fields go directly to the existing Formspree endpoint. A successful response confirms Formspree accepted the submission, while inbox delivery depends on the provider’s configuration. The form uses [Formspree’s documented honeypot field](https://help.formspree.io/articles/building-your-form/honeypot-spam-filtering/). The earlier Turnstile widget was removed because there was no verified server-side [token validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/) for this endpoint.

Before approving deployment, confirm the Formspree endpoint is active, accepts submissions from the GitHub Pages origin, and routes messages to the intended mailbox. Use one controlled submission to verify delivery and confirm spam settings in the Formspree dashboard.
