-- =========================
-- TABELA: profiles (admin)
-- =========================
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABELA: courses
-- =========================
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    preco_matricula NUMERIC(10,2) NOT NULL,
    preco_confirmacao NUMERIC(10,2) NOT NULL,
    propina NUMERIC(10,2) NOT NULL,
    multa NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABELA: classes
-- =========================
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,

    nivel TEXT NOT NULL, -- ex: 1ª, 10ª, 13ª
    turno TEXT, -- manhã, tarde, noite

    preco_matricula NUMERIC(10,2),
    preco_confirmacao NUMERIC(10,2),
    propina NUMERIC(10,2),
    multa NUMERIC(10,2),

    vagas_total INT NOT NULL,
    vagas_ocupadas INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL
);

-- =========================
-- TABELA: matriculas
-- =========================
CREATE TYPE status_matricula AS ENUM ('pendente','aprovado','rejeitado');

CREATE TABLE matriculas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    nome TEXT NOT NULL,
    data_nascimento DATE,
    sexo TEXT,
    bi TEXT,
    telefone TEXT,
    email TEXT,
    endereco TEXT,

    class_id UUID,

    -- documentos
    declaracao_anterior TEXT,
    transferencia TEXT,
    foto TEXT,
    atestado_medico TEXT,

    status status_matricula DEFAULT 'pendente',

    created_at TIMESTAMP DEFAULT NOW(),

    FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL
);

-- =========================
-- TABELA: blog_posts
-- =========================
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    imagem TEXT,
    publicado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABELA: gallery_images
-- =========================
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    imagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABELA: contact_messages
-- =========================
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    email TEXT,
    mensagem TEXT,
    tipo TEXT DEFAULT 'contacto',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TABELA: assistant_chats
-- =========================
CREATE TABLE assistant_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario TEXT,
    mensagem TEXT NOT NULL,
    resposta TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
