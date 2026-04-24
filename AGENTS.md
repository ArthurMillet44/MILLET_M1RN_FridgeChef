# Dark Amber — Color System

Accent : **ambre chaud**. Deux modes : fond noir profond (dark) / crème chaud (light).

---

## Fond & surfaces

| Élément                  | Dark      | Light     |
| ------------------------ | --------- | --------- |
| Fond principal           | `#0A0A0A` | `#F8F5F0` |
| Surface (cartes, inputs) | `#141414` | `#EEEAE2` |
| Séparateurs / bordures   | `#252525` | `#D8D3CA` |

---

## Texte

| Rôle                      | Dark      | Light     | Ratio dark | Ratio light |
| ------------------------- | --------- | --------- | ---------- | ----------- |
| Texte principal           | `#F2EFE9` | `#1A1612` | 17.6:1     | 16.8:1      |
| Texte secondaire (labels) | `#5A5755` | `#8A8480` | 4.6:1      | 4.5:1       |
| Placeholder / hint        | `#969292` | `#B0ABA6` | 3.2:1      | 2.9:1       |

> Les ratios sont calculés sur le fond principal. Texte principal et secondaire passent WCAG AA (4.5:1). Les placeholders sont décoratifs, non critiques.

---

## Accent (ambre)

| Élément                    | Dark      | Light     |
| -------------------------- | --------- | --------- |
| Couleur accent             | `#F0A500` | `#D48800` |
| Texte sur accent           | `#000000` | `#FFFFFF` |
| Ratio texte/accent (dark)  | 9.1:1     | —         |
| Ratio texte/accent (light) | —         | 4.6:1     |

L'accent dark est plus lumineux (`#F0A500`) pour tenir le contraste sur fond noir. L'accent light est plus sombre (`#D48800`) pour tenir le contraste sur fond crème.

---

## Bouton primaire

|           | Dark         | Light        |
| --------- | ------------ | ------------ |
| Fond      | `#F0A500`    | `#D48800`    |
| Texte     | `#000000`    | `#FFFFFF`    |
| Contraste | **9.1:1** ✅ | **4.6:1** ✅ |

## Bouton ghost / secondaire

|                      | Dark         | Light        |
| -------------------- | ------------ | ------------ |
| Fond                 | `#141414`    | `#EEEAE2`    |
| Bordure              | `#252525`    | `#D8D3CA`    |
| Texte                | `#5A5755`    | `#8A8480`    |
| Contraste texte/fond | **4.6:1** ✅ | **4.5:1** ✅ |

---

## Champ de saisie (input)

| Élément                  | Dark        | Light       |
| ------------------------ | ----------- | ----------- |
| Fond                     | transparent | transparent |
| Texte saisi              | `#F2EFE9`   | `#1A1612`   |
| Label (uppercase)        | `#5A5755`   | `#8A8480`   |
| Ligne de base (inactive) | `#252525`   | `#D8D3CA`   |
| Ligne de base (focus)    | `#F0A500`   | `#D48800`   |
| Placeholder              | `#969292`   | `#B0ABA6`   |

---

## Tab switcher

| Élément              | Dark      | Light     |
| -------------------- | --------- | --------- |
| Fond du container    | `#141414` | `#EEEAE2` |
| Bordure du container | `#252525` | `#D8D3CA` |
| Indicateur actif     | `#F0A500` | `#D48800` |
| Texte actif          | `#000000` | `#FFFFFF` |
| Texte inactif        | `#5A5755` | `#8A8480` |

---

## Erreur

|                              | Dark      | Light     |
| ---------------------------- | --------- | --------- |
| Texte d'erreur               | `#FF4545` | `#D63030` |
| Contraste sur fond principal | 5.1:1 ✅  | 5.4:1 ✅  |
