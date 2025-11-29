Crear entorno virtual 

```bash
python -m venv .venv
pip install libretranslate
libretranslate --port 5001 --load-only en,es,ca
# Si falla al traducir es porque no se han actulizado los modelos de traducción, para ver las traducciones disponibles ir ha http://127.0.0.1:5001/languages
libretranslate --port 5001 --update-models --load-only en,es,ca
```


----
Try docker 
```bash
docker run --rm -p 5001:5001 libretranslate/libretranslate --load-only en,es,ca
```
