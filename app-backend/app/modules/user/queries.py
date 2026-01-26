from app.core.database import execute, fetch_one, fetch_all

async def listar_usuarios():
    return await fetch_all(
        """
        select
            u.cusuario,
            u.identificacion,
            u.nombre,
            u.apellido,
            u.email,
            u.estado,
            r.nombre as rol
        from usuario u
        left join usuario_rol ur on ur.cusuario = u.cusuario
        left join rol r on r.crol = ur.crol
        where u.cusuario not in (1)
        order by u.apellido
        """
    )

async def existe_usuario_cusuario(cusuario: int):
    return await fetch_one(
        """
        select cusuario
        from usuario
        where cusuario = %s
        """,
        (cusuario,)
    )

async def actualizar_estado_usuario(cusuario: int, estado: int):
    return await execute(
        """
        update usuario
        set estado = %s
        where cusuario = %s
        """,
        (estado, cusuario)
    )
