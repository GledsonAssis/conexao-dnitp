/* eslint-disable max-len */
import React, { PureComponent } from 'react';

import teamInfoImage from '@/assets/images/team-info.svg';

class Team extends PureComponent {
  render() {
    return (
      <>
        <div className="row contrast-ignore-bg mx-0">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-team contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">Equipe</h2>
        </div>
        <div className="mb-5 mx-1">
            <p>A equipe responsável pela implementação e pela gestão do Programa Conexão DNIT é formada por servidores do Departamento Nacional de Infraestrutura de Transportes (DNIT) nas esferas local, regional e nacional.</p>
            <p>A concepção e a modelagem do Programa, bem como a elaboração das atividades pedagógicas, a produção dos conteúdos do portal e do aplicativo e o desenvolvimento dos cursos de capacitação foram realizados pelo Núcleo de Educação para o Trânsito, do LabTrans/UFSC, e homologados pela área de Educação para o Trânsito do DNIT-Sede vinculada à Coordenação de Multas e Educação para o Trânsito (CMET), da Coordenação-Geral de Operações Rodoviárias (CGPERT).</p>
        </div>
        <div className="row justify-content-md-center my-10xh mx-2">
          <img src={teamInfoImage} />
        </div>
      </>
    );
  }
}

export default Team;
