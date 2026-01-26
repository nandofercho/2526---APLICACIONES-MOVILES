
# 📱 Aplicación de Marcación – React Native (Expo)

Este proyecto es una **aplicación móvil desarrollada con React Native + Expo Router**, conectada a un backend en **FastAPI**, cuyo objetivo es gestionar:

- Autenticación de usuarios
- Marcaciones (check-in)
- Historial por fechas
- Gestión de usuarios (solo administradores)
- Perfil y configuración

---

## 🚀 Tecnologías utilizadas

### Frontend
- **React Native**
- **Expo (~54)**
- **Expo Router**
- **TypeScript**
- **react-native-gesture-handler**
- **react-native-toast-message**
- **dayjs**
- **JWT (decodificado en frontend)**

### Backend (referencial)
- **FastAPI**
- **MySQL**
- **JWT**
- **aiomysql**

---

## 📁 Estructura del proyecto

```
app-mobil/
│
├── app/
│   ├── (auth)/
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (app)/
│   │   ├── home.tsx
│   │   ├── profile.tsx
│   │   ├── check-in.tsx
│   │   ├── historial.tsx
│   │   ├── users.tsx
│   │   └── settings.tsx
│   └── _layout.tsx
│
├── src/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── marcacion.service.ts
│   │   └── user.service.ts
│   └── components/
│       └── DrawerContent.tsx
│
├── assets/
│   └── favicon.png
│
├── package.json
└── README.md
```

---

## ⚙️ Requisitos previos

Antes de iniciar asegúrate de tener instalado:

- **Node.js 18 o superior**
- **npm** o **yarn**
- **Expo CLI**
- **Backend FastAPI corriendo**

Instalar Expo CLI (si no lo tienes):

```bash
npm install -g expo-cli
```

---

## 📦 Instalación del proyecto

1️⃣ Clonar o descomprimir el proyecto

```bash
cd app-mobil
```

2️⃣ Instalar dependencias

```bash
npm install
```

o

```bash
yarn install
```

---

## ▶️ Ejecutar la aplicación

```bash
npx expo start
```

Opciones:
- `w` → Web
- `a` → Android
- `i` → iOS (Mac)

---

## 🌐 Configuración del backend

En el archivo:

```
src/services/auth.service.ts
src/services/marcacion.service.ts
src/services/user.service.ts
```

Configura la URL base:

```ts
const API_URL = 'http://127.0.0.1:8000';
```

⚠️ Asegúrate de que el backend esté corriendo.

---

## 🔐 Roles y permisos

- **Usuario**
  - Marcación
  - Historial
  - Perfil
  - Configuración

- **Administrador**
  - Todo lo anterior
  - Gestión de usuarios (activar / inactivar)

El menú y las rutas se controlan usando el **rol almacenado en el JWT**.

---


## 🧠 Notas importantes

- El token se almacena usando **SecureStore**
- Las rutas están protegidas por rol
- El Drawer se filtra dinámicamente
- Swipe iOS / Android habilitado

---

## ✅ Estado del proyecto

✔ Funcional  
✔ Escalable  
✔ Listo para presentación  
✔ Buenas prácticas aplicadas
