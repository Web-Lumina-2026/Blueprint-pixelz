<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Museum site: all colors/fonts live as tokens in src/styles.css (@theme inline); components never hardcode colors. GSAP is always imported from src/lib/gsap.ts (registers ScrollTrigger + useGSAP) so plugins initialize once. Hero media (viking loop) is a lovable-assets pointer in src/assets; generated museum images live in src/assets/museum/.
