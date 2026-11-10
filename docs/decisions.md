# Project decisions (Phase 0)

| Decision              | Choice                                                      | Why                                                                |
| --------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ |
| Package name          | `@mohammadpy/a11y-vue`                                      | Scoped name avoids clashes; scope must match npm user `mohammadpy` |
| Framework             | Vue 3, Composition API, `<script setup lang="ts">`          | Modern, typed, generic components                                  |
| Package manager       | pnpm (via corepack)                                         | Fast, strict dependency resolution                                 |
| Node version          | 22 (see `.nvmrc`)                                           | Same version locally and in CI                                     |
| Styling               | Unstyled-but-themeable via CSS custom properties (`--ui-*`) | Focus on behaviour; consumers own the look                         |
| A11y target           | WCAG 2.2 AA, WAI-ARIA APG patterns                          | Industry standard; APG is the behavioural spec                     |
| Component order       | Tabs → Modal → Toast → Combobox → DataTable                 | Easiest to hardest, building shared composables first              |
| Screen readers tested | Orca (Linux), plus NVDA/VoiceOver when available            | Automated tools catch only ~30–40% of issues                       |
| License               | MIT                                                         | Permissive, standard for UI libraries                              |

## Reference specs

- Tabs: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- Modal dialog: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Alert / toast: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
- Combobox: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/
- Table / sortable table: https://www.w3.org/WAI/ARIA/apg/patterns/table/
