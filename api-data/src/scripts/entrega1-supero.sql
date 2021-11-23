INSERT INTO [dnit].[RedeEnsino]
([id]
,[nome])
VALUES
(5,'Filantrópica');

GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dnit].[MensagemStatus](
	[id] [tinyint] IDENTITY(1,1) NOT NULL,
	[nome] [varchar](50) NOT NULL,
 CONSTRAINT [PK_MensagemStatus] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [USER]
) ON [USER]
GO

INSERT INTO [dnit].[MensagemStatus] (nome) VALUES ('Enviada');
GO
INSERT INTO [dnit].[MensagemStatus] (nome) VALUES ('Lida');
GO
INSERT INTO [dnit].[MensagemStatus] (nome) VALUES ('Respondida');
GO

ALTER TABLE [dnit].[Mensagem]
ADD idStatus INTEGER NOT NULL
DEFAULT 1;
GO
ALTER TABLE [dnit].[AtividadeAvaliacao] ADD dataCadastro datetime NULL DEFAULT GETDATE();
go
ALTER TABLE [dnit].[InstituicaoEnsino]
ADD quantidadeAlunos int,
quantidadeProfessores int;
GO
CREATE TABLE [dnit].[InstituicaoEnsinoAnoEscolar](
[id] [smallint] IDENTITY(1,1) NOT NULL,
[idInstituicaoEnsino] [int] NOT NULL,
[idAnoEscolar] [tinyint] NOT NULL,
[quatidadeAlunos] [int] NOT NULL default 0)

GO
ALTER TABLE [dnit].[InstituicaoEnsinoAnoEscolar] WITH CHECK ADD CONSTRAINT [FK_AnoEscolar] FOREIGN KEY([idAnoEscolar])
REFERENCES [dnit].[AnoEscolar] ([id])
GO

ALTER TABLE [dnit].[InstituicaoEnsinoAnoEscolar] WITH CHECK ADD CONSTRAINT [FK_InstituicaoEnsino] FOREIGN KEY([idInstituicaoEnsino])
REFERENCES [dnit].[InstituicaoEnsino] ([id])
GO