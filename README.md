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

| Tecnología       | Descripción                        | Ícono                                                                                                                                     |
|------------------|------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| **Git**          | Sistema de control de versiones    | <p align="center"><img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" width="80px"></p>                              |
| **Node.js**      | Entorno de ejecución de JavaScript | <p align="center"><img src="https://www.positronx.io/wp-content/uploads/2022/04/17053-01.jpg" width="100px"></p>                          |
| **JavaScript**   | Lenguaje de programación           | <p align="center"><img src="https://th.bing.com/th/id/OIP.I5XOh9o_kbTNsXnsIc53aAHaHa?rs=1&pid=ImgDetMain" width="70px"></p>               |
| **React**        | Framework de JavaScript            | <p align="center"><img src="https://th.bing.com/th/id/OIP.VKEOM0WYU3EMGnR9wIPX9AHaHa?w=1000&h=1000&rs=1&pid=ImgDetMain" width="80px"></p> |
| **Tailwind CSS** | Framework de CSS                   | <p align="center"><img src="https://cdn.sanity.io/images/f9ggxyof/production/92bfda9df5caa5735f2dc5d47b1edad318c68a96-2240x1260.png?auto=format" width="120px"></p> |

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
> El backend que se desarrolló a la par de este componente lo puedes encontrar en el repositorio [Backend Termo Oasis](https://github.com/edusebass/backendTermoOasis.git)

## Capturas de pantalla

### Interfaces

- Landing page

![landing-page](src/assets/imagenes_readme/landing-page2.png)

- Iniciar sesión

![iniciar-sesion](src/assets/imagenes_readme/iniciar-sesion.png)

- Recuperar contraseña

![recuperar-pass](src/assets/imagenes_readme/recuperar-pass.png)

- Restablecer contraseña

![restablecer-pass](src/assets/imagenes_readme/restablecer-pass.png)

- Mi perfil

![perfil](src/assets/imagenes_readme/perfil.png)

- Agendamiento de citas

![agendar-cita](src/assets/imagenes_readme/agendar-cita2.png)

- Calendario de citas

![calendario](src/assets/imagenes_readme/calendario-citas.png)

- Registrar paciente

![registrar-paciente](src/assets/imagenes_readme/registrar-paciente2.png)

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

