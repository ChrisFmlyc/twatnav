# twatnav.com

Static landing page for **TwatNav** — a location-first dating and social app for
lesbians, sapphics and queer women. Hosted free on GitHub Pages.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole page — hero, how-it-works, who-it's-for, safety, waitlist |
| `styles.css` | All styling. Design tokens live in `:root` at the top |
| `app.js` | Waitlist form handling + scroll reveals |
| `assets/hero.jpg` | **The one image.** Drop yours here with exactly this name |
| `CNAME` | Tells GitHub Pages the custom domain is `twatnav.com`. Do not delete |
| `.nojekyll` | Stops GitHub running Jekyll over the files |

## Swapping the image

Save your image as `assets/hero.jpg`, then:

```sh
git add assets/hero.jpg && git commit -m "add hero image" && git push
```

It's displayed in a 3:4 portrait frame with `object-fit: cover`, so a tall
image works best. If the file is missing the page shows a designed placeholder
rather than a broken image.

Using a `.png` instead? Change the `src` on line ~76 of `index.html`.

## Changing the colours

Everything keys off five variables at the top of `styles.css`:

```css
--ink:   #170C21;  /* background */
--cream: #F5E9DC;  /* text */
--coral: #FF5A4E;  /* primary accent, buttons, pin */
--route: #D8F35B;  /* secondary accent, hovers, focus rings */
--lilac: #C39BFF;  /* background glow */
```

## Wiring up the waitlist form

The form has no backend. Set `FORM_ENDPOINT` at the top of `app.js` to a
Formspree / Buttondown / Cloudflare Worker URL and it starts POSTing
`{ "email": "..." }`. Until then it falls back to opening a mailto.

## Local preview

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

Push to `main`. GitHub Pages redeploys automatically in about a minute.
