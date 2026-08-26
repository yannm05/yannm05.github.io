# Academic website

A single-page research site (profile + featured project + publications + CV),
built as plain HTML/CSS so it runs on GitHub Pages with zero build step.

## Put it online in 5 minutes

1. **Make a GitHub account** at github.com if you don't have one.
2. **Create a new repository** named `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username — the name matters).
3. **Upload these files**: on the new repo page click *"uploading an existing
   file"*, then drag in `index.html`, the whole `assets/` folder, and this
   README. Commit.
4. **Turn on Pages**: repo → *Settings* → *Pages* → under "Branch" pick
   `main` / `root` → *Save*.
5. Wait ~1 minute, then visit **https://yourusername.github.io** — you're live.

## Make it yours

Open `index.html` in any text editor and replace the placeholder text
(search for "Your Name", "Your Field", "Project Title", etc.). Then:

- **Photo** → drop a square-ish image at `assets/img/portrait.jpg`
- **Project figure** → `assets/img/project.jpg`
- **CV** → put your PDF at `assets/pdf/cv.pdf`
- **Publications** → copy one `<li class="pub">…</li>` block per paper
- **Colors/fonts** → all live at the top of `assets/css/style.css`
- **Social links** → edit the footer links at the bottom of `index.html`

Every image has a graceful fallback, so the site looks fine even before you
add your own. Commit your changes and GitHub Pages redeploys automatically.
