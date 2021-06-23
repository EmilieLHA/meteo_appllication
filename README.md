# Application météo géolocalisée

## Partie HTML / CSS

J'ai choisi de travailler avec le CDN de Bootstrap pour m'entraîner et pour raccourcrir le fichier CSS tout en conservant la responsivité. 

L'avantage c'est la rapidité et l'esthétique simple, l'inconvénient c'est un certain manque de maîtrise et la nécessité d'utiliser le mot clé !important dans le CSS pour écraser les valeurs de Bootstrap.

### Animation

Afin d'attendre l'execution de l'API pour afficher les informations, j'ai ajouté une animation keyframes qui affiche progressivement le contenu pendant 2s.
Cette animation est lié à une classe .fade-in ajouté en JS à la fin de l'execution de l'API.

## Script JS

### Geolocation

Pour réaliser cette application, j'ai utilisé l'**API Geolocation**. 
Je commence par vérifier si le navigateur rend la géolocation possible, puis j'appelle la méthode getCurrentPosition qui fournit la position actuelle de l'appareil.

Cette méthode prend en argument:
* un **callback success** (qui permet de récupérer la position), 
* un **callback error** qui gère la non récupération des informations (si l'utilisateur refuse la géolocation par ex),
* un objet options qui permet de définir la précision, la durée de conservation en cache et la durée maximale d'attente de la position.

En cas d'erreur, ou de non diponibilité, j'ai choisi de déterminer une location par défaut.

### Appel d'API

Quand la position est définie, j'appelle la fonction appelAPI.

Je voulais des données détaillées par heure, j'ai donc utilisé la One Call API pour récupérr les infos. Mais le nom de la ville n'étant pas disponible dans cette API, j'ai dû faire une autre appel pour la récupérer.

Pour cet appel API j'ai choisi l'API Fetch, plus récente que la la requête XHR.

