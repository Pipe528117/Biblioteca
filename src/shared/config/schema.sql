-- ============================================================
-- SCRIPT DE CREACIÓN DE TABLAS CON REGLAS DE UNICIDAD (UNIQUE)
-- ============================================================

-- 1. Tabla de Usuarios (Impide duplicación de código institucional y correo)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    codigo_usuario VARCHAR(50) UNIQUE NOT NULL, -- Regla UNIQUE: no permite dos usuarios con el mismo código
    email VARCHAR(150) UNIQUE NOT NULL,         -- Regla UNIQUE: no permite dos usuarios con el mismo correo
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('ESTUDIANTE', 'DOCENTE', 'ADMINISTRATIVO')),
    es_vulnerable BOOLEAN DEFAULT FALSE,
    estado_cuenta VARCHAR(20) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 2. Tabla de Productos/Libros (Impide duplicación de código ISBN)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    isbn_codigo VARCHAR(50) UNIQUE NOT NULL,   -- Regla UNIQUE: no permite dos libros con el mismo ISBN
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(150) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    stock INT DEFAULT 1 CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- 3. Tabla de Préstamos/Órdenes (Impide duplicación del código de préstamo)
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    codigo_prestamo VARCHAR(50) UNIQUE NOT NULL, -- Regla UNIQUE: no permite dos préstamos con el mismo código
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_limite_devolucion TIMESTAMP NOT NULL,
    fecha_entrega_real TIMESTAMP NULL,
    estado VARCHAR(20) DEFAULT 'PRESTADO' CHECK (estado IN ('SOLICITADO', 'PRESTADO', 'DEVUELTO', 'CON_RETRASO', 'CANCELADO')),
    observaciones TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_producto FOREIGN KEY (producto_id) REFERENCES products(id) ON DELETE RESTRICT
);