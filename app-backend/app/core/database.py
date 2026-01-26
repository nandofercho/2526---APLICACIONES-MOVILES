import aiomysql 
from typing import Optional

_pool: Optional[aiomysql.Pool] = None


async def init_db_pool(settings):
    global _pool
    _pool = await aiomysql.create_pool(
        host=settings.db_host,
        port=settings.db_port,
        user=settings.db_user,
        password=settings.db_password,
        db=settings.db_name,
        autocommit=True,
        charset="utf8mb4",
        minsize=1,
        maxsize=10
    )

async def close_db_pool():
    global _pool
    if _pool:
        _pool.close()
        await _pool.wait_closed()
        _pool = None

async def execute(query: str, params: tuple = ()):
    if not _pool:
        raise RuntimeError("pool no inicializado")
        
    async with _pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(query, params)
            await conn.commit()
            return cursor.rowcount

async def execute_return_id(query: str, params: tuple = ()):
    if not _pool:
        raise RuntimeError("pool no inicializado")

    async with _pool.acquire() as conn:
        async with conn.cursor() as cursor:
            await cursor.execute(query, params)
            await conn.commit()
            return cursor.lastrowid

async def fetch_one(query: str, params: tuple = ()):
    if not _pool:
        raise RuntimeError("pool no inicializado")

    async with _pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute(query, params)
            return await cur.fetchone()

async def fetch_all(query: str, params: tuple = ()):
    if not _pool:
        raise RuntimeError("pool no inicializado")

    async with _pool.acquire() as conn:
        async with conn.cursor(aiomysql.DictCursor) as cur:
            await cur.execute(query, params)
            return await cur.fetchall()
