# GIFtube

![GIFtube demo](./assets/sl500.gif)

GIFtube es una herramienta que te permite convertir videos de YouTube en GIFs de alta calidad con opciones de personalizacion.

## Caracteristicas

- Convierte videos de YouTube a GIFs.
- Personaliza la resolucion (1080p, 720p, 480p, 240p).
- Elige la tasa de fotogramas (FPS).
- Especifica el tiempo de inicio y la duracion del clip.
- Optimiza el GIF final.

## Instalacion y uso

```bash
git clone https://github.com/Gords/GIFtube.git
cd GIFtube
chmod +x make_gif.sh
./make_gif.sh
```

Sigue las instrucciones para introducir la URL de YouTube, la tasa de fotogramas deseada, el tiempo de inicio, la duracion del clip de video, el nombre de archivo de salida y la resolucion.

Esto crea un archivo GIF optimizado llamado `optimized_rickroll.gif` del video especificado de YouTube, comenzando en 10 segundos, con una duracion de 20 segundos, una tasa de fotogramas de 15 FPS y una resolucion de 720p.

## Detras de escenas

GIFtube utiliza varias herramientas y bibliotecas para lograr su funcionalidad:

- **yt-dlp**: Herramienta de linea de comandos para descargar videos de YouTube.
- **ffmpeg**: Herramienta multimedia para procesar video y audio, incluyendo la generacion de GIFs.
- **gifsicle**: Herramienta para optimizar y manipular GIFs.

Estas dependencias se instalan automaticamente en sistemas Ubuntu/Debian o macOS si no estan presentes.

## Conclusion

GIFtube es una herramienta poderosa pero simple que resuelve el problema de convertir videos de YouTube en GIFs de alta calidad con ajustes personalizables.
Si te resulta util, puedes darle una estrella al repositorio en [GitHub](https://github.com/Gords/GIFtube).
