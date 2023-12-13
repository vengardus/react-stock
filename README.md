# Proyecto: Inventario Stock con React

## Resumen

- Metodología Atomic Design
- ubuntu v.22.04
- node v.18.16.0
- react v.18.2
- pmpm v.8.9.2

## Extensiones VSCode

- styled-Components Snippets

## Creación del proyecto: YA NO, saltar a Clonar Proyecto

```pwd
# YA NO, solo clonar desde alice02
# pnpm create vite
# seleccionar react
# seleccionar javascript + swc
```

## Clonar proyecto

```pwd
git clone <alice02-url-ssh> <proyecto>

cd <proyecto>
cp ../control-gastos-curso/.env*
rm -a .git
pnpm install

pnpm run dev
```

## Instalar dependencias: YA NO, se instalaron  con el pnpm install

```pwd
pnpm add styled-components  
pnpm add react-router-dom
pnpm add react-icons
pnpm add zustand
pnpm add @supabase/supabase-js
pnpm add iso-country-currency
pnpm add @tanstack/react-query
pnpm add sweetalert2
pnpm add react-hook-form
pnpm add react-spinners
pnpm add dayjs
pnpm add swiper
pnpm add -D tailwindcss postcss autoprefixer   
```

## Configurar tailwind (Instalación con Vite)

Seguir pasos de: [https://tailwindcss.com/docs/guides/vite]

## Supabase

Configurada con proyecto Supabase: gardodb

- Triggers

```plpsql
create function insert_account() 
returns trigger
language plpgsql
as $$
begin
  insert into accounts(id_user) values (new.id);
  return new;
end;
$$;

create trigger account_insert_trigger
after insert on users
for each row
execute function insert_account();
```

- functions (rpc)

```sql
drop function if exists getAccountsGroupByType (int);

create function getAccountsGroupByType (p_id_user int) returns table (
  balance numeric,
  type_code varchar,
  type_id int,
  type_description varchar
) language sql as $$
select SUM(current_balance) as balance, type_account.cod as type_cod, type_account.id as type_id,
type_account.description as type_description
from accounts
inner join type_account on type_account.id = accounts.id_type_account
where accounts.id_user = p_id_user
group by type_account.cod, type_account.id
order by type_account.order
$$;
```

## Ayuda memoria

### Deshabilitar propTypes del lint en vsCode

```json
# disable project-wide in your eslintrc.cjs:

"rules": {
  "react/prop-types": "off"
}
```

### Imagenes generadas para el carrusel

[https://www.canva.com/es_419/]

### Documentacion chartjs react

[https://react-chartjs-2.js.org/]

### Ejemplos carrusel

[http://swiperjs.com/demos]

## Deploy en Firebase

- Iniciar sesión en firebase [https://firebase.google.com]

- Crear nuevo proyecto (paso 1-3): dar nombre al proyecto

- Google analytics (Paso 2-3): deshabilitar analíticas

- Creando proyecto .... (3-3)

- Agregar app: seleccionar app web  < />

- Registar app:
  - ingresar sobrenombre app
  - agregar sdk firebase:

  ```pwd (carpeta de l proyecto)
    pnpm add firebase 
  ```

  - Opción ir a Console (botón en Registar App)

- Configurar Firebase hosting: menu compilación -> hosting
  - Iniciar Firebae Cli

  ```pwd
    pnpm add -g firebase-tools
  ```

  - Siguiente

  - Inicializar proyecto

  ```pwd
    firebase login
  ```

  - Generar proyecto
  
  ```pwd
    pnpm run buid
  ```
  
  - Solución al warning:

    ```pwd
      (!) Some chunks are larger than 500 KiB after minification. Consider:
      - Using dynamic import() to code-split the application
      - Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/guide/en/#outputmanualchunks
      - Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
    ```
  
    ```vite.config.js
      export default defineConfig({
        plugins: [react()],
        build: {
          chunkSizeWarningLimit: 1600,    <==
        },
      })
    ```
  
  - Inicialiar firebase

    ```pwd
      firebase init

      Seleccionar opción: Hosting: Configure files for firebase hosting and (optionally) set up Github...
      Use an existing project
      Select project
      What do you want to use as your public directory: enter
      Configure as a simgle-page ? y
      Set up automatic builds and deploys with Github? n
    ```

  - Deploy

    ```pwd
      firebase deploy
    ```

  - Modificar:

    ```pwd
      "hosting": {
          "public": "dist",   <==

    ```

  - Configurar Url Autenticacion en Supabase

    - Opción Authentication -> URL Configuration

      - Redirects URLs -> Add URL
        - Agregar la url del proyecto de firebase

      - Modificar también en:  Site Url (asi funcionó para mi)

  - Posteriores deploys:

    ```pwd
      firebase login    # solo si es necesario
      pnpm run buid
      firebase deploy
    ```

## BD

### users

- create_at timestamptz now()
- username  varchar null
- photo varchar null
- country varchar 'PERU'
- currency  varchar 'PEN´
- theme varchar '1'   # '1':dark '0':light
- idauth_supabase varchar null

## Configurar Supabase

### Copiar keys para accesos a la Api de Supabase en archivo .env (según .env-template)

- En el proyecto de Supabase: Configuración - Api : Copiar de:
  - Project Url: URL
  - Project Api Keys: anon public

### Habiliar Autenticación y Provider

- En el proyecto de Supabase: Authenticatation - Providers
  - Habilitar Google: Enabled Sign with Google
  - Copiar en
    - Client Id (for OAuth)     : dato A (obtendido de Google Cloud)
    - Client secret (for OAuth) : dato B (obtendido de Google Cloud)

### Configurar Google Cloud

- Ingreasar y logearse en [https://cloud.google.com]
- Opción Console
- Crear Nuevo Proyecto (Si ya existen proyectos aparecer una lista despĺegable, ingresar y elegir Proyeto Nuevo)
- Dar nombre al Proyecto: ReactAlice01
- Ir a menu Google Cloud: Apis y Servicios - Credenciales
  - Botón crear credeciales
  - Elegir ID de cliente de OAuth
  - Crear ID de cliente de OAuth
    - Botón : Configurar pantalla de consentimiento
      - User Type: Externos
      - Botón: Crear
  - Editar el registro de la App
    - Pantalla de consentimiento:
      - Información de la aplicación: ReactAlice01  (Es el nombre que aparecerá en la ventana de consentimiento)
        - Correo electrónico: [ismytv@gmail.com]
        - Información de contacto del desarrollador: [ismytv@gmail.com]
        - Botón: Guardar y Continuar
      - Permisos:
        - Botón: Guardar y continuar
      - Usuario de prueba:
        - Botón: Guardar y continuar
      - Resumen:
        - Botón: Volver al Panel
  - Elegir opcion Credenciales del menu lateral
    - Botón: Crear credenciales
    - Elegir Crear ID de cliente de OAuth
      - Tipo Aplicación: Aplicación Web
      - Nombre: ReactAlice01-api
      - URL de direccionamiento autorizado:
        - Obtenrlo de Supabase: Authentication - Providers - Google - Callback URL (for OAuth)
      - Botón: Crear
  - Se crearon las credenciales para el cliente OAuth !!!
    - ID de cliente : dato A
    - Secreto del cliente: dato B
  - Copiar dato A y dato B en la configuración Provider Google de supabase
  - Listo !!!
  