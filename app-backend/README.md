# 📌 API Marcaciones – FastAPI

API para el **registro y gestión de marcaciones de usuarios**, desarrollada con **FastAPI**, **MySQL**, **JWT** y **queries directas (sin ORM)**.

---

## 🧱 Requisitos

- Python **3.11+**
- MySQL **8+**
- pip
- (Opcional) Virtualenv

---

## 📂 Estructura del proyecto

```
app-backend/
│
├── app/
│   ├── core/
│   ├── modules/
│   │   ├── auth/
│   │   └── marcacion/
│   ├── schemas/
│   ├── utils/
│   ├── middleware/
│   └── main.py
│
├── .env
├── requirements.txt
└── README.md
```

---

## ⚙️ 1️⃣ Crear entorno virtual (opcional)

```bash
python -m venv venv
```

### Activar

**Windows**
```bash
venv\Scripts\activate
```

**Linux / Mac**
```bash
source venv/bin/activate
```

---

## 📦 2️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

Dependencias principales:
- fastapi
- uvicorn
- aiomysql
- python-jose
- bcrypt
- python-dotenv

---

## 🗄️ 3️⃣ Base de datos (MySQL)

### Tabla `usuario`

```sql
create table usuario (
    cusuario int auto_increment primary key,
    nombre varchar(100),
    apellido varchar(100),
    email varchar(100) unique,
    password_hash varchar(255),
    estado int
);
```

### Tabla `rol`

```sql
create table rol (
    crol int auto_increment primary key,
    nombre varchar(50)
);
```

### Tabla `usuario_rol`

```sql
create table usuario_rol (
    cusuario int not null,
    crol int not null,
    primary key (cusuario, crol),
    foreign key (cusuario) references usuario(cusuario),
    foreign key (crol) references rol(crol)
);
```

### Tabla `marcacion`

```sql
create table marcacion (
    cusuario int not null,
    fecha datetime not null,
    primary key (cusuario, fecha),
    constraint fk_marcacion_usuario
        foreign key (cusuario)
        references usuario (cusuario)
);
```

---

## 🔐 4️⃣ Variables de entorno

Crear el archivo `.env`:

```env
db_host=localhost
db_port=3306
db_user=root
db_password=tu_password
db_name=marcaciones_db

jwt_secret=clave_super_secreta
jwt_algorithm=HS256
jwt_exp_minutes=60
```

---

## 🔑 5️⃣ Crear contraseña (bcrypt)

```bash
python
```

```python
import bcrypt
bcrypt.hashpw(b"admin", bcrypt.gensalt()).decode()
```

---

## 🚀 6️⃣ Arrancar la API

```bash
python -m uvicorn app.main:app --reload
```

API disponible en:

```
http://127.0.0.1:8000
```

---

## 🔐 7️⃣ Login

```
POST /auth/login
```

```json
{
  "email": "admin@uea.edu.ec",
  "password": "admin"
}
```

Respuesta:

```json
{
  "access_token": "JWT_TOKEN",
  "token_type": "bearer"
}
```

---

## ⏱️ 8️⃣ Marcaciones

### Crear marcación

```
POST /marcacion
Authorization: Bearer <token>
```

### Listar marcaciones

```
POST /marcacion/listado
Authorization: Bearer <token>
```

```json
{
  "cusuario": 1,
  "finicio": "2026-01-01",
  "ffin": "2026-01-31"
}
```

### Modificar marcación

```json
{
  "fecha_anterior": "2026-01-25 08:00:00",
  "fecha_nueva": "2026-01-25 08:05:00"
}
```

### Eliminar marcación

```json
{
  "fecha": "2026-01-25 08:05:00"
}
```

---

## 🧠 Notas

- Usuario siempre desde JWT
- SQL directo, sin ORM
- JWT con expiración por ENV
- CORS habilitado para desarrollo

---

Proyecto funcional y listo para ampliar 🚀
