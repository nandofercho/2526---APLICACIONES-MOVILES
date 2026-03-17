# 📌 API Marcaciones – FastAPI

API para el **registro y gestión de marcaciones de usuarios**, desarrollada con **FastAPI**, **MySQL**, **JWT**.

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
### Tabla `rol`
### Tabla `usuario_rol`
### Tabla `marcacion`

---

## 🔐 4️⃣ Variables de entorno

Crear el archivo `.env`:

```env
db_host=
db_port=
db_user=
db_password=
db_name=

jwt_secret=
jwt_algorithm=
jwt_exp_minutes=
```

---

## 🔑 5️⃣ Arrancar la API

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0
```

API disponible en:

```
http://127.0.0.1:8000
```

---

## 🧠 Notas

- Usuario siempre desde JWT
- SQL directo, sin ORM
- JWT con expiración por ENV
- CORS habilitado para desarrollo

---

Proyecto funcional y listo para ampliar 🚀
