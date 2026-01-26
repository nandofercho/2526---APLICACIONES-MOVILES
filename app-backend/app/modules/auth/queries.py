from app.core.database import fetch_one, execute, execute_return_id

async def get_usuario_by_email(email: str):
    return await fetch_one(
        """
        select
            u.cusuario,
            u.nombre,
            u.apellido,
            u.identificacion,
            u.email,
            u.password_hash,
            u.estado,
            r.nombre as rol
        from usuario u
        inner join usuario_rol ur on ur.cusuario = u.cusuario
        inner join rol r on r.crol = ur.crol and r.estado=1
        where u.email = %s
        """,
        (email,)
    )

async def get_usuario_password(cusuario: int):
    return await fetch_one(
        """
        select password_hash
        from usuario
        where cusuario = %s
        """,
        (cusuario,)
    )

async def actualizar_password(cusuario: int, password_hash: str):
    return await execute(
        """
        update usuario
        set password_hash = %s
        where cusuario = %s
        """,
        (password_hash, cusuario)
    )

async def existe_usuario_email(email: str):
    return await fetch_one(
        """
        select cusuario
        from usuario
        where email = %s
        """,
        (email,)
    )

async def existe_usuario_identificacion(identificacion: str):
    return await fetch_one(
        """
        select cusuario
        from usuario
        where identificacion = %s
        """,
        (identificacion,)
    )

async def insertar_usuario_con_rol(
    identificacion: str,
    nombre: str,
    apellido: str,
    email: str,
    password_hash: str,
    estado: int,
    crol: int
):
    cusuario = await execute_return_id(
        """
        insert into usuario (
            identificacion,
            nombre,
            apellido,
            email,
            password_hash,
            estado
        )
        values (%s, %s, %s, %s, %s, %s)
        """,
        (
            identificacion,
            nombre,
            apellido,
            email,
            password_hash,
            estado
        )
    )

    await execute(
        """
        insert into usuario_rol (cusuario, crol)
        values (%s, %s)
        """,
        (cusuario, crol)
    )

    return cusuario