# Sistema web del Centro de Terapias Alternativas Termo Oasis 

_Frontend_ del sistema web del centro Termo Oasis que incluye funciones para dos roles de usuarios, secretaria y doctor.

Las funciones comunes para ambos roles son:
- Mostrar la información del negocio en una Landing page
- Iniciar sesión
- Recuperar contraseña
- Restablecer contraseña
- Ver el perfil del usuario

Las funciones exclusivas para el rol secretaria son: 
- Gestionar citas (agendar, ver, modificar y cancelar citas)
- Gestionar pacientes (registrar, ver y eliminar pacientes)

Las funciones exclusivas para el rol doctor son: 
- Ver las citas agendadas
- Ver a los pacientes registrados en el centro
- Gestión de registros médicos (crear, ver y actualizar registros)

**Despliegue:** https://termooasis.netlify.app/

## Tecnologías usadas en el proyecto 

| Tecnología       | Descripción                        | Ícono |
|------------------|------------------------------------|-------|
| **Git**          | Sistema de control de versiones    | Alt   |
| **Node.js**      | Entorno de ejecución de JavaScript | Alt   |
| **JavaScript**   | Lenguaje de programación           | Alt   |
| **React**        | Framework de JavaScript            | Alt   |
| **Tailwind CSS** | Framework de CSS                   | Alt   |

## Ejecución 

1. Clona el proyecto

```bash
git clone https://github.com/SanguchoMela/frontend-TO_v1.git
```

2. Cambia al directorio del proyecto

```bash
cd frontend-TO_v1
```

3. Instala las dependencias

```bash
npm install
```
4. Configura las [variables de entorno](#variables-de-entorno)

5. Ejecuta el proyecto localmente

```bash
npm run dev
```

## Variables de entorno

Para ejecutar este proyecto, necesitas añadir las siguientes variables de entorno a tu archivo `.env`

Este archivo se debe ubicar en la raíz de la carpeta del componente. `frontend-TO_v1\.env`

- **Conexión con el backend:** `VITE_BACKEND_URL = url_backend`

> [!note]
> El backend que se desarrolló a la par de este componente lo puedes encontrar en el repositorio `[Backend Termo Oasis](https://github.com/edusebass/backendTermoOasis.git)`

## Capturas de pantalla

### Interfaces

- Landing page

![landing-page](src/assets/imagenes_readme/landing-page.png)

- Iniciar sesión

![iniciar-sesion](src/assets/imagenes_readme/iniciar-sesion.png)

- Recuperar contraseña

![recuperar-pass](src/assets/imagenes_readme/recuperar-pass.png)

- Restablecer contraseña

![restablecer-pass](src/assets/imagenes_readme/restablecer-pass.png)

- Mi perfil

![perfil](src/assets/imagenes_readme/perfil.png)

- Agendamiento de citas

![agendar-cita](src/assets/imagenes_readme/agendar-cita.png)

- Calendario de citas

![calendario](src/assets/imagenes_readme/calendario-citas.png)

- Registrar paciente

![registrar-paciente](src/assets/imagenes_readme/registrar-paciente.png)

- Lista de pacientes

![lista-pacientes](src/assets/imagenes_readme/lista-pacientes.png)

- Perfil del paciente - rol secretaria

![perfil-paciente](src/assets/imagenes_readme/perfil-paciente-secre.png)

- Perfil del paciente - rol doctor

![perfil-paciente](src/assets/imagenes_readme/perfil-paciente-doc.png)

### Modales

- Detalles de la cita

  <p align="center">
    <img alt="detalles-cita" src="src/assets/imagenes_readme/detalles-cita.png" width="250px">
  </p>

- Crear registro médico

  <p align="center">
    <img alt="crear-registro" src="src/assets/imagenes_readme/crear-registro.png" width="250px">
  </p>

- Ver registro médico

  <p align="center">
    <img alt="ver-registro" src="src/assets/imagenes_readme/ver-registro.png" width="250px">
  </p>

