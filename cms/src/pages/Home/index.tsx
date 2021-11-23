import React from 'react';

import Student from '@/assets/images/cms/bn-home.svg';

import Template from '@/components/layout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TFunction } from 'next-i18next';
import { EnvsConfig } from '@/infra/config/envs.config';

interface StateProps {
  header?: string;
}
interface DispatchProps { }
interface OwnProps {
  propsModel: any
  t: TFunction
}

type Props = StateProps & DispatchProps & OwnProps;

export const HomePage: React.FC<Props> = ({ propsModel, t }) => {
  return (
    <div className="main-content pl-sm-3 mt-5 pl-md-breadcrumbs" id="main-content">
      <div className="row">
        <div className='col-12 col-lg-8'>
          <p className="h2">Seja bem-vindo!</p>
          <p>O Conexão DNIT é o Programa Nacional de Educação para o Trânsito do Departamento Nacional de Infraestrutura de
            Transportes (DNIT), que foi concebido e desenvolvido pelo Núcleo de Educação para o Trânsito do Laboratório de Transporte
            e Logística (LabTrans), da Universidade Federal de Santa Catarina (UFSC), no âmbito do Termo de Execução Descentralizada
            (TED) 448.2017 - DNIT/UFSC.<br /><br /><br />
            O Programa Conexão Dnit foi concebido como uma iniciativa inovadora, sustentável e colaborativa de Educação para o Trânsito, estruturada em rede e direcionada para as escolas de Ensino Fundamental. Seu objetivo é preservar vidas!</p>
        </div>
        <div className='col-12 col-lg-4'>
          <img src={`/cms${Student}`} alt="Student" />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => {
  const baseUrl = EnvsConfig.getBaseUrl();
  return ({
    props: {
      ...(await serverSideTranslations(locale, ['toast_errors', 'components', 'general', 'pages'])),
      baseUrl
    },
  })
};

export default function Home() {
  return (
    <Template>
      <HomePage
        propsModel={(propsModel: any) => propsModel}
        t={(t: TFunction) => t} />
    </Template>
  );
}
