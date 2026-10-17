-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) DEFAULT 'usuario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla de Categorías
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Autores
CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    nacionalidad VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de Productos (Totalmente sincronizada con tu validación de Joi)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    codigo_isbn VARCHAR(50) UNIQUE NOT NULL,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    editorial VARCHAR(100) NOT NULL,
    anio_publicacion INT NOT NULL,
    categoria_id INT NOT NULL,
    stock_total INT NOT NULL,
    stock_disponible INT DEFAULT 0,
    ubicacion_estante VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'DISPONIBLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_categoria FOREIGN KEY (categoria_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 5. Tabla de Órdenes / Préstamos
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'activo',
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);