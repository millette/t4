# Spike Tournemain

> **Attention** je ne peux pas garantir que ça mettra le feu à vos serveurs, ni le contraire.

Sérieusement, n'utilisez pas ça projet (WIP) si vous tenez à la sécurité de vos serveurs. À la limite, testez-le sur votre laptop ou mieux, un RasPi jettable! Vous êtes avertis!

## Installation

```sh
git clone https://github.com/millette/t4.git
cd t4
# Comme la version actuelle écrit carrément sur des fichiers en git,
# il est recommandé de partir sa propre branche.
# Remplacer NAME ou la chaine complète par ce qui vous convient:
git checkout -b NAME-run-0
# Ensuite, on peut aller à la branche master: git checkout master
# ou revenir à notre branche: git checkout NAME-run-0
# sans spécifier le '-b' qui créer une nouvelle branche.
npm install
npm run build # patienter 1 minute... C'est plus rapide les prochaines fois à cause du cache
npm run start
# Lancer Firefox ou whatever sur http://localhost:3000/ et hop!
```

Au lieu du build et start, on peut utiliser le mode dev:

```sh
npm run dev
# patienter un petit peu, ça devrait afficher
# [ ready ] compiled successfully - ready on http://localhost:3000
# Lancer Firefox ou whatever sur http://localhost:3000/ et hop!
```

### Build vs Dev

Le mode `build` est plus rapide à l'usage tandis que le mode `dev` permet d'éditer les sources qui constituent l'engin du site et supporte le auto-reload (notez l'icon en bas à droite en mode `dev`).

## Notes

### Écrabouillage des fichiers sous git

Les pages sous `/custom/` sont éditables dans un beau (plain) textarea. Elles sont sauvées dans `public/` qui contient les fichiers publiques. C'est mon _API_ temporairement, vous me pardonnerez.

### DANGERUEX: MDX = React = JS

Le contenu en `MDX` est très puissant puisqu'en bout de ligne il est converti en JavaScript exécutable dans le client et sur le serveur. Ce serait probablement facile d'inclure quelques lignes dans un `MDX` et effacer le fichier `/etc/passwd` - m'enfin, j'exagère un peu mais ça s'exécute dans le contexte de celui qui a lancé le serveur.

## MDX vs Markdown

Si vous connaissez `markdown` vous serez à l'aise ici. `MDX` c'est grosso-modo du Markdown dans lequel on peut utiliser des composantes `React`. Une fois processé, un fichier MDX devient lui-même un composante `React`.

### Liens

Utilisez la syntaxe `[TEXTE](URL)` habituelle pour faire des liens. Vous pouvez liez à des pages externes ou à des pages sous `/custom/` uniquement. Si vous tentez de lier à `/p2` par exemple ça risque d'exploser. Vous pouvez créer des liens vers des pages qui n'existent pas pour les créer éventuellement.

### Composantes React

Le but d'utiliser `MDX` c'est de pouvoir composer les pages à partir de plusieurs morceaux dynamiques et éventuellement ajouter à cela un système de collection pour établir des _layouts_ et _presets_.

Pour le moment, le seul exemple inclus est le composante `<Clock>` qui permet d'afficher l'heure en temps réel. Voyez la page <http://localhost:3000/custom/c666> pour un exemple _live_ et <http://localhost:3000/custom/ed/c666> pour consulter la source du `MDX` et l'éditer. Ce n'est pas du tout utile sauf pour montrer que ça fonctionne comme prévu.

Bientôt, on aura `<Profile>` pour afficher des profiles utilisateurs, `<TaggedWith>` pour énumérer des contenus avec un mot-clé et d'autres trucs plus pratiques les uns que les autres.

## Theming

Maintenant que la base fonctionne, je compte intégrer pour le _theming_

- [Theme UI](https://theme-ui.com/) - Build consistent, themeable React apps based on constraint-based design principles
- [Rebass](https://rebassjs.org/) - Rebass React primitive UI components built with Styled System
- [Styled System](https://styled-system.com/) - Style props for rapid UI development
- [Typography.js](http://kyleamathews.github.io/typography.js/) - A powerful toolkit for building websites with beautiful design.

On est loin du CSS de nos grands-parents. Je peux aussi mettre ça de côté si y'a de vives oppositions, mais je l'ai testé un peu dans <https://github.com/millette/stories> (avec du MDX aussi).

En théorie par contre, ça devrait permettre à des utilisateurs moyens de mieux controller leur thème via une interface web (en éditant des variables finalement). Il existe aussi des thèmes bien que les specs ne sont pas très matures encore. On peut voir quelques exemples sur le site de [typographyjs](http://kyleamathews.github.io/typography.js/) - notez le "pick theme" en haut à droite.
