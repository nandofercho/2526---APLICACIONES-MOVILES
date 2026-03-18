-- ===============================
-- tabla usuario
-- ===============================
create table usuario (
    cusuario int auto_increment primary key,
    identificacion varchar(20) not null unique,
    nombre varchar(100) not null,
    apellido varchar(100) not null,
    email varchar(50) not null unique,
    password_hash varchar(255) not null,
    estado tinyint(1) not null default 1
);

-- ===============================
-- tabla rol
-- ===============================
create table rol (
    crol int auto_increment primary key,
    nombre varchar(50) not null unique,
    descripcion varchar(150),
    estado tinyint(1) not null default 1
);

-- ===============================
-- tabla usuario_rol (n a n)
-- ===============================
create table usuario_rol (
    cusuario int not null,
    crol int not null,

    primary key (cusuario, crol),

    constraint fk_usuario_rol_usuario
        foreign key (cusuario)
        references usuario (cusuario),

    constraint fk_usuario_rol_rol
        foreign key (crol)
        references rol (crol)
);

-- ===============================
-- tabla marcacion
-- llave compuesta
-- ===============================
create table marcacion (
    cusuario int not null,
    fecha datetime not null,

    primary key (cusuario, fecha),

    constraint fk_marcacion_usuario
        foreign key (cusuario)
        references usuario (cusuario),
);


insert into tipo_marcacion (descripcion)
values
('entrada'),
('salida');


insert into rol (nombre, descripcion, estado)
values
('admin', 'administrador del sistema', 1),
('usuario', 'usuario del sistema', 1);


insert into usuario (
    identificacion,
    nombre,
    apellido,
    email,
    password_hash,
    estado
) values 
('0000000000', 'Administrador', 'Sistema', 'admin@uea.edu.ec', '$2b$12$I8I9zIF3GcYA6D.0LaobdOoOPHaNiVIJHLFUERbjFQcx1j3Af4LE6',  1),
('1600598336', 'Fernando', 'Zambrano', 'hf.zambranol@uea.edu.ec', '$2b$12$I8I9zIF3GcYA6D.0LaobdOoOPHaNiVIJHLFUERbjFQcx1j3Af4LE6', 1);

insert into usuario_rol (cusuario, crol)
values (1, 1), (2, 1);