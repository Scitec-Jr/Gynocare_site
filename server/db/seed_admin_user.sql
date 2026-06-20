-- Script para criar usuário admin inicial
-- Execute este script APÓS criar a tabela Usuarios

-- Nota: A senha será "admin123" (será feito hash na criação)
-- INSERT INTO Usuarios (Nome, Email, Senha, Funcao, Ativo)
-- VALUES ('Admin', 'admin@gynocare.com', '<BCRYPT_HASH>', 'admin', TRUE);

-- Use o comando abaixo para gerar o hash em Node.js:
-- const bcryptjs = require('bcryptjs');
-- bcryptjs.hash('admin123', 10).then(hash => console.log(hash));

-- Exemplo de inserção com hash pré-gerado:
-- INSERT INTO Usuarios (Nome, Email, Senha, Funcao, Ativo)
-- VALUES ('Admin', 'admin@gynocare.com', '$2a$10$...', 'admin', TRUE);

-- Para login use: email: admin@gynocare.com, senha: admin123
