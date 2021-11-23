ALTER TABLE [dnit].[Mensagem] ADD removidoOrigem bit NOT NULL DEFAULT 0;
GO
ALTER TABLE [dnit].[Mensagem] ADD removidoDestino bit NOT NULL DEFAULT 0;
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dnit].[MensagemAnexo](
[id] [int] IDENTITY(1,1) NOT NULL,
[rowguid] [uniqueidentifier] ROWGUIDCOL NOT NULL,
[idMensagem] [int] NOT NULL,
[nome] varchar(255) NULL,
[idMime] [smallint] NOT NULL,
[arquivo] varbinary(max) FILESTREAM NOT NULL,
CONSTRAINT [pk_id_MensagemAnexo] PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [USER] FILESTREAM_ON [FILESTREAM],
CONSTRAINT [uq_rowguid_MensagemAnexo] UNIQUE NONCLUSTERED
(
[rowguid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [USER]
) ON [USER] FILESTREAM_ON [FILESTREAM]
GO

ALTER TABLE [dnit].[MensagemAnexo] ADD CONSTRAINT [DF_MensagemAnexo_rowguid] DEFAULT (newsequentialid()) FOR [rowguid]
GO

ALTER TABLE [dnit].[MensagemAnexo] WITH CHECK ADD CONSTRAINT [fk_idMensagem_MensagemAnexo_Mensagem] FOREIGN KEY([idMensagem])
REFERENCES [dnit].[Mensagem] ([id])
GO

ALTER TABLE [dnit].[MensagemAnexo] CHECK CONSTRAINT [fk_idMensagem_MensagemAnexo_Mensagem]
GO

ALTER TABLE [dnit].[MensagemAnexo] WITH CHECK ADD CONSTRAINT [fk_idMime_MensagemAnexo_Mime] FOREIGN KEY([idMime])
REFERENCES [sistema].[Mime] ([id])
GO

ALTER TABLE [dnit].[MensagemAnexo] CHECK CONSTRAINT [fk_idMime_MensagemAnexo_Mime]
GO