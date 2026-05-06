-- =========================
-- TABELA: profiles (admin)
-- =========================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Perfis visíveis para administradores" ON profiles
    FOR SELECT USING (
        auth.jwt() ->> 'email' = 'devjunior373@gmail.com' 
        OR (SELECT is_admin FROM profiles WHERE id = auth.uid())
    );

CREATE POLICY "Usuários podem ver seu próprio perfil" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- =========================
-- TABELA: courses
-- =========================
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    preco_matricula NUMERIC(10,2) NOT NULL,
    preco_confirmacao NUMERIC(10,2) NOT NULL,
    propina NUMERIC(10,2) NOT NULL,
    multa NUMERIC(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cursos públicos" ON courses
    FOR SELECT USING (true);

CREATE POLICY "Admin gerencia cursos" ON courses
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'devjunior373@gmail.com' 
        OR (SELECT is_admin FROM profiles WHERE id = auth.uid())
    );

-- =========================
-- TABELA: classes
-- =========================
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
    nivel TEXT NOT NULL,
    turno TEXT,
    preco_matricula NUMERIC(10,2),
    preco_confirmacao NUMERIC(10,2),
    propina NUMERIC(10,2),
    multa NUMERIC(10,2),
    vagas_total INT NOT NULL,
    vagas_ocupadas INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Turmas públicas" ON classes
    FOR SELECT USING (true);

-- =========================
-- TABELA: blog_posts
-- =========================
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    imagem TEXT,
    publicado BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts públicos" ON blog_posts
    FOR SELECT USING (publicado = true);

CREATE POLICY "Admin gerencia posts" ON blog_posts
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'devjunior373@gmail.com' 
        OR (SELECT is_admin FROM profiles WHERE id = auth.uid())
    );

-- =========================
-- TABELA: gallery_images
-- =========================
CREATE TABLE IF NOT EXISTS gallery_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo TEXT,
    imagem TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Galeria pública" ON gallery_images
    FOR SELECT USING (true);

-- =========================
-- TABELA: contact_messages
-- =========================
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT,
    email TEXT,
    mensagem TEXT,
    tipo TEXT DEFAULT 'contacto',
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserir mensagens" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin vê mensagens" ON contact_messages
    FOR SELECT USING (
        auth.jwt() ->> 'email' = 'devjunior373@gmail.com' 
        OR (SELECT is_admin FROM profiles WHERE id = auth.uid())
    );

-- =========================
-- TABELA: assistant_chats
-- =========================
CREATE TABLE IF NOT EXISTS assistant_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario TEXT,
    mensagem TEXT NOT NULL,
    resposta TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE assistant_chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Inserir chats" ON assistant_chats
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin vê chats" ON assistant_chats
    FOR SELECT USING (
        auth.jwt() ->> 'email' = 'devjunior373@gmail.com' 
        OR (SELECT is_admin FROM profiles WHERE id = auth.uid())
    );
