ALTER TABLE [seguranca].[Usuario] ADD dataCadastro datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
GO
ALTER TABLE [seguranca].[Usuario] ADD dataUltimoAcesso datetime NULL;
GO