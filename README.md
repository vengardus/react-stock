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

## Supabase: Fnctions and Triggers

  ```plpgsql: function insertPermissions()
  create or replace function insertPermissions()
  returns trigger
  language plpgsql
  as $$
  declare item record;
  begin
    if new.type_user = 'admin' then
      insert into inv_companies (name, currency_symbol, id_user_admin) 
      values ('Genérico', 'S/.', new.id);
    end if;
    for item in select id from inv_modules loop
      if new.type_user = 'admin' then
        insert into inv_permissions(id_user, id_module) values(new.id, item.id);
      end if;
    end loop;
    return new;
  end
  $$;

  create or replace trigger permissionsTrigger 
  after insert on inv_users
  for each row 
  execute function insertPermissions();
  ```

  ```plpgsql: function insertDefaultValues()
  create or replace function insertDefaultValues()
  returns trigger
  language plpgsql
  as $$
  declare item record;
  begin
    insert into inv_brands (description, id_company) 
    values ('Genérica', new.id);
    insert into inv_categories (description, color, id_company) 
    values ('Genérica', '#FF5722', new.id);
    insert into inv_user_company (id_user, id_company) 
    values (new.id_user_admin, new.id) ;
    return new;
  end
  $$;

  create or replace trigger defaulValuesTrigger 
  after insert on inv_companies
  for each row 
  execute function insertDefaultValues();
  ```

  ```plpgsql: alter tables
  /* Alter tables */

  /* inv_brands: constraint unique*/
  ALTER TABLE inv_brands
    ADD CONSTRAINT inv_brands_unique_description_company UNIQUE (description, id_company);

  /* inv_brands: idx */
  create index inV_brands_idx_description_company on inv_brands (description, id_company);

  /* inv_categories: constraint unique*/
  ALTER TABLE inv_categories
    ADD CONSTRAINT inv_categories_unique_description_company UNIQUE (description, id_company);

  /* inv_brands: idx */
  create index inV_categories_idx_description_company on inv_categories (description, id_company);
  ```
  
  ```plpgsql: get_count_users_by_company
    -- Crear una función para obtener el número de usuarios para una compañía
  CREATE OR REPLACE FUNCTION get_count_users_by_company(
      p_id_company INT
  ) RETURNS INTEGER AS $$
  DECLARE
      count_users INTEGER;
  BEGIN
      -- Contar el número de usuarios para la compañía específica
      SELECT COUNT(*)
      INTO count_users
      FROM inv_user_company
      WHERE id_company = p_id_company;

      -- Devolver el resultado
      RETURN count_users;
  END;
  $$ LANGUAGE plpgsql;
  ```

  ```plpgsql: function insert_brand
  CREATE OR REPLACE FUNCTION insert_brand(p_description VARCHAR, p_id_company INT)
  RETURNS VOID AS $$
  BEGIN
      -- Verificar si la combinación description + id_company ya existe
      PERFORM 1
      FROM inv_brands
      WHERE description = p_description AND id_company = p_id_company;

      -- Si no existe, insertar el nuevo registro
      IF NOT FOUND THEN
          INSERT INTO inv_brands(description, id_company)
          VALUES (p_description, p_id_company);
          RAISE NOTICE 'Registro insertado correctamente.';
      ELSE
          RAISE EXCEPTION 'La marca ya existe.';
      END IF;
  END;
  $$ LANGUAGE plpgsql;

  // return example
  SELECT insert_brand('Ejemplo Descripción 2', 4);
  ```

  ```plpgsql: function insert_category
  CREATE OR REPLACE FUNCTION insert_category(p_description VARCHAR, p_id_company INT, p_color VARCHAR)
  RETURNS VOID AS $$
  BEGIN
      -- Verificar si la combinación description + id_company ya existe
      PERFORM 1
      FROM inv_categories
      WHERE description = p_description AND id_company = p_id_company;

      -- Si no existe, insertar el nuevo registro
      IF NOT FOUND THEN
          INSERT INTO inv_categories(description, id_company, color)
          VALUES (p_description, p_id_company, p_color);
          RAISE NOTICE 'Registro insertado correctamente.';
      ELSE
          RAISE EXCEPTION 'La categoría ya existe.';
      END IF;
  END;
  $$ LANGUAGE plpgsql;

  // return example
  SELECT insert_category('Categoría 3', 4, '#C44452');
  ```

  ```plpgsql: get_all_products
  DROP FUNCTION get_all_products(integer);
  create
  or replace function get_all_products (p_id_company int) returns table (
    id bigint, 
    description varchar,
    id_brand bigint,
    stock numeric,
    stock_min numeric,
    codebar varchar,
    cod varchar,
    price_sale numeric,
    price_buy numeric,
    id_category bigint,
    id_company bigint,
    description_brand varchar,
    description_category varchar,
    category_color varchar
  ) as $$
  BEGIN
      RETURN QUERY
      SELECT
          p.id,
          p.description, 
          p.id_brand, 
          p.stock, 
          p.stock_min, 
          p.codebar, 
          p.cod, 
          p.price_sale,
          p.price_buy, 
          p.id_category, 
          p.id_company, 
          b.description AS description_brand,
          c.description AS description_category,
          c.color as category_color
      FROM
          inv_products p
          JOIN inv_brands b ON p.id_brand = b.id
          JOIN inv_categories c ON p.id_category = c.id
      WHERE
          p.id_company = p_id_company 
      ORDER BY
          p.created_at;
  END;
  $$ language plpgsql;
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
  