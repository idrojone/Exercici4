Crear entorno virtual 

```bash
python -m venv .venv
pip install libretranslate
libretranslate --port 5001 --load-only en,es
```



Instalamos dependencias

```bash
pip install -r requirements.txt
```


----
Try docker 
```bash
docker run --rm -p 5000:5000 libretranslate/libretranslate --load-only en,es
```