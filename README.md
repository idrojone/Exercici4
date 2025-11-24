Pàgina web d'acudits de Chuck Norris. 

En aquesta tasca es tracta d'utilitzar dues APIS obertes disponibles:

https://api.chucknorris.io/

https://libretranslate.com/

De tal forma que s'elaborarà una web amb un menú on apareixeran totes les categories i es podràn veure al menys dos acudits de cada categoría en pantalla. 

Aquesta pàgina web estarà disponible en, al menys, dos idiomes, traduïnt els acudits en temps real amb l'api corresponent. Hi haurà un login i register per poder guardar totes les dades de l'usuari (acudits vistos per categoria, idioma dels acudits, temps loguejat a la web, etc.)



POST /auth/register
POST /auth/login
POST /auth/logout (auth)
GET /categories (auth)
GET /categories/:name/jokes/:lang (auth)


POST /views (auth)
GET /user/views (auth)
POST /translate (opcional, proxy)
GET /languages (opcional)


Frontend: React
pages/
    Auth.jsx — pantalla con Login/Register (form dual o rutas internas)
    Home.jsx — pantalla principal tras login (selector idioma + lista de categorías)
    Jokes.jsx — página para mostrar chistes por categoría e idioma
    NotFound.jsx — 404
components/
    Layout.jsx — marco general (Navbar, logout, layout para Home/Jokes)
    ProtectedRoute.jsx — componente que redirige a /auth si no hay sesión válida
    LanguageSelector.jsx — selector entre "es" y "en"
    CategoryList.jsx — lista de CategoryCard con onClick para navegar
    CategoryCard.jsx — tarjeta con nombre de categoría
    JokesList.jsx — lista items de chiste con diseño simple
    AuthForm.jsx — formulario de login y registro (o LoginForm.jsx y RegisterForm.jsx)
hooks/
    useAuth.js — hook para login, logout, estado de usuario y token
    useFetch.js — wrapper reutilizable para fetch/axios (gestión token, carga, error)
    useCategories.js — hook para GET /categories
    useJokes.js — hook para GET /categories/:name/jokes/:lang
contexts/
    AuthContext.jsx — provee estado user, token, login(), logout()
services/
    api.js — configuración base (axios/fetch) y attach token
    auth.service.js — funciones de login/register/logout
    categories.service.js — fetch categories
    jokes.service.js — fetch jokes por categoría e idioma
utils/
    storage.js — helpers para localStorage/cookies
    constants.js — API_BASE_URL, LANG_OPTIONS, etc.