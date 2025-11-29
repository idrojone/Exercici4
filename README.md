Pàgina web d'acudits de Chuck Norris. 

En aquesta tasca es tracta d'utilitzar dues APIS obertes disponibles:

https://api.chucknorris.io/

https://libretranslate.com/

De tal forma que s'elaborarà una web amb un menú on apareixeran totes les categories i es podràn veure al menys dos acudits de cada categoría en pantalla. 

Aquesta pàgina web estarà disponible en, al menys, dos idiomes, traduïnt els acudits en temps real amb l'api corresponent. Hi haurà un login i register per poder guardar totes les dades de l'usuari (acudits vistos per categoria, idioma dels acudits, temps loguejat a la web, etc.)



Crear entorno virtual 

```bash
python -m venv .venv
pip install libretranslate
libretranslate --port 5001 --load-only en,es,ca
# Si falla al traducir es porque no se han actulizado los modelos de traducción, para ver las traducciones disponibles ir ha http://127.0.0.1:5001/languages
libretranslate --port 5001 --update-models --load-only en,es,ca
```

Backend puerto 5002
