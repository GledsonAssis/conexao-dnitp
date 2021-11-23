INSERT INTO [dnit].[MensagemTipo] ([nome]) VALUES ('Reclamação');
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (1, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (2, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (3, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (4, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (5, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (6, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (7, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (8, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (9, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (10, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (11, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (12, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (13, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (14, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (15, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (16, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (17, 7) ;
go
INSERT INTO [dnit].[PerfilMensagemTipo](idPerfil, idMensagemTipo) values (18, 7) ;
go
ALTER TABLE [dnit].[Capacitacao]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[Capacitacao] SET dataAlteracao = data WHERE dataAlteracao = 0
GO
ALTER TABLE [dnit].[Atividade]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[Atividade] SET dataAlteracao = dataPublicacao WHERE dataAlteracao = 0
GO

ALTER TABLE [dnit].[Projeto]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[Projeto] SET dataAlteracao = data WHERE dataAlteracao = 0
GO
ALTER TABLE [dnit].[LinkExterno]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[LinkExterno] SET dataAlteracao = data WHERE dataAlteracao = 0
GO
ALTER TABLE [dnit].[ProjetoAcao]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[ProjetoAcao] SET dataAlteracao = data WHERE dataAlteracao = 0
GO

ALTER TABLE [dnit].[Acao]
ADD dataAlteracao datetime NOT NULL
DEFAULT 0
GO

UPDATE [dnit].[Acao] SET dataAlteracao = data WHERE dataAlteracao = 0
GO
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dnit].[vw_listagem_controleMural]
AS
SELECT CAP.id
	,CAP.titulo
	,'CAP' as identificadorTipo
	,'Curso' AS tipo
	,COALESCE(MIC.destaque, 0) AS destaque
	,MUI.ordem
	,CAP.data AS dataCriacao
	,CAP.dataAlteracao AS dataAlteracao
FROM dnit.Capacitacao CAP
LEFT JOIN dnit.MuralItemCapacitacao MIC ON (MIC.idCapacitacao = CAP.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MIC.idMuralItem)
WHERE (
		CAP.publicado = 1
		AND CAP.capa = 0
		)

UNION ALL

SELECT ATV.id
	,ATV.tituloAtividade
	,'ATV' as identificadorTipo
	,'Atividade' AS tipo
	,COALESCE(MIA.destaque, 0) AS destaque
	,MUI.ordem
	,ATV.dataPublicacao AS dataCriacao
	,ATV.dataAlteracao AS dataAlteracao
FROM dnit.Atividade ATV
LEFT JOIN dnit.MuralItemAtividade MIA ON (MIA.idAtividade = ATV.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MIA.idMuralItem)
WHERE (ATV.publicado = 1)

UNION ALL

SELECT PJT.id
	,PJT.titulo
	,'PJT' as identificadorTipo
	,'Projeto' AS tipo
	,COALESCE(MIP.destaque, 0) AS destaque
	,MUI.ordem
	,PJT.data AS dataCriacao
	,PJT.dataAlteracao AS dataAlteracao
FROM dnit.Projeto PJT
LEFT JOIN dnit.MuralItemProjeto MIP ON (MIP.idProjeto = PJT.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MIP.idMuralItem)
WHERE (
		PJT.publicado = 1
		AND PJT.capa = 0
		)

UNION ALL

SELECT LEX.id
	,LEX.titulo
	,'LEX' as identificadorTipo
	,'Link Externo' AS tipo
	,COALESCE(MLE.destaque, 0) AS destaque
	,MUI.ordem
	,LEX.data AS dataCriacao
	,LEX.dataAlteracao AS dataAlteracao
FROM dnit.LinkExterno LEX
LEFT JOIN dnit.MuralItemLinkExterno MLE ON (MLE.idLinkExterno = LEX.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MLE.idMuralItem)
WHERE coalesce(LEX.publicado, 0) = 1

UNION ALL

SELECT PJA.id
	,PJA.titulo
	,'APJ' as identificadorTipo
	,'Ação de Projeto' AS tipo
	,COALESCE(MPA.destaque, 0) AS destaque
	,MUI.ordem
	,PJA.data AS dataCriacao
	,PJA.dataAlteracao AS dataAlteracao
FROM dnit.ProjetoAcao PJA
LEFT JOIN dnit.MuralItemProjetoAcao MPA ON (MPA.idProjetoAcao = PJA.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MPA.idMuralItem)
WHERE (PJA.publicado = 1)

UNION ALL

SELECT ACA.id
	,ACA.titulo
	,'ACA' as identificadorTipo
	,'Ação de Ativação' AS tipo
	,COALESCE(MIA.destaque, 0) AS destaque
	,MUI.ordem
	,ACA.data AS dataCriacao
	,ACA.dataAlteracao AS dataAlteracao
FROM dnit.Acao ACA
LEFT JOIN dnit.MuralItemAcao MIA ON (MIA.idAcao = ACA.id)
LEFT JOIN dnit.MuralItem MUI ON (MUI.id = MIA.idMuralItem)
WHERE (
		ACA.publicado = 1
		AND ACA.capa = 0
		)
GO

