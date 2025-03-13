# Setup proyecto dls-drilling-management-system

## Ambiente local:

- MAC OS (sonora 14.15)
- WINDOWS
- LINUX

## Requisitos

- Node: 18+
- Npm: 9.8+
- Docker
- FortiClient
- Sqlserver

## Instalación proyecto web (Nextjs y React)

- Clonar repositorio y bajar branch `dev`

  `https://github.com/rollingcodestudio/dls-drilling-management-system`

- Instalar dependencias `npm install`

- Clonar archivo .env.example y nombrarlo como `.env`

- Ejecutar en modo dev `npm run dev`

- Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## MAC Y LINUX: Instalación sql server con docker

- Descargar docker para mac
  ` https://kenjikawaida.medium.com/c%C3%B3mo-instalar-sql-server-en-una-mac-1345995a5392#:~:text=Docker%20Community%20Edition`
- Descargar imagen docker para sqlserver (Bajar la última versión estable)
  `sudo docker pull mcr.microsoft.com/mssql/server:2022-latest`
- Ejecutar imagen docker con el siguiente comando
  `docker run -d --name sql_server_mac -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=miContrasena' -p 1433:1433 mcr.microsoft.com/mssql/server:2022-latest`

  - d: (Opcional) Inicia el contenedor Docker en modo daemon. Esto significa que se ejecuta en segundo plano y no necesita su propia ventana de Terminal abierta.
  - name sql_server_mac: (Opcional) Este parámetro le permite nombrar el contenedor. Esto puede ser útil al detener y arrancar su contenedor desde la Terminal.
    -e ‘ACCEPT_EULA=Y’: La Y muestra que está de acuerdo con el EULA (End User Licence Agreement). Esto es necesario para que SQL Server para Linux se ejecute en su Mac.
    -e ‘SA_PASSWORD=miContrasena123’: Parametro para la contraseña del usuario 'sa'.
    -p 1433:1433: Esto asigna el puerto local 1433 al puerto 1433 en el contenedor. Este es el puerto TCP predeterminado que usa SQL Server para escuchar conexiones.
    mcr.microsoft.com/mssql/server:2022-latest: Esto indica a Docker que imagen usar. Si descargó uno diferente, cambiamos en su lugar.

- Verificar contenedor con el siguiente comando
  `docker ps`

- Instalar cliente de sqlserver de preferencia ya sea para linux o mac y configurar conexion a la base de datos.
- Importar script sql ubicado en path `mssql/BdD.sql` desde el cliente sqlserver.

## Mac y Linux: Instalación Node-Red

- Instalar con npm en local https://nodered.org/docs/getting-started/local
  `sudo npm install -g --unsafe-perm node-red`

- Ejecutar el siguiente comando para iniciar Node-red
  `node-red`

- Importar archivo `nodeRed/flows.json` para crear la estructura de los flows del proyecto en node-red.

- En el panel de node-red, dentro de la sección Manage Pallete instalar las siguientes dependencias
  - @ciro99678_net/node-red-contrib-mssql-rai
  - node-red-contrib-moment
  - node-red-contrib-ui_j
- En el flow INTERFAZ WELL DATA configurar:
  - En el node GetToken las credenciales para poder generar el jwt para las peticiones
- En Configurations nodes configurar el nodo:
  - LOCAL SGIPAPP con los accesos (host, username and password) a la bd sql server
- @ciro99678_net/node-red-contrib-mssql-rai requiere ajustar manualmente el puerto por defecto del sql server.
- Ubicar el archivo `path_instalacion_no_red_local/.node-red/node_modules/@ciro99678_net/node-red-contrib-mssql-rai/mssql.js` y se se debe cambiar el valor de la propiedad port por el valor `1433`
  - Reiniciar node-red desde la consola para que aplicar los cambios
 
## Docker

- Build: `docker build -t dms .`
- Run: `docker run -p 3000:3000 --name dms-container dms`

