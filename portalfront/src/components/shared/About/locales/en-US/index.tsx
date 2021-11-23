/* eslint-disable max-len */
import React, { PureComponent } from 'react';

import YouTube from 'react-youtube';

class About extends PureComponent {

  render() {
    return (
      <>
        <div className="row contrast-ignore-bg mx-0">
          <div className="img__page col-auto py-3 pl-0">
            <div className="img__page-about contrast-ignore-bg" style={{ width: 60, height: 60 }} />
          </div>
          <h2 className="text-primary-default">Saiba Mais</h2>
        </div>
        <div className="mb-7xh">
          <div className="description mt-1">
            <span className="h4">Competências do DNIT no Âmbito da Educação para o Trânsito</span>
            <span className="br-divider my-3"></span>
            <p>
              O Departamento Nacional de Infraestrutura de Transportes – DNIT é uma autarquia federal  vinculada ao Ministério da Infraestrutura, criada pela lei nº 10.233, de 5 de
              junho de 2001.
            </p>
            <p>
              A autarquia tem por objetivo implementar a política de infraestrutura de transportes no âmbito federal, contribuindo para o desenvolvimento sustentável do país. Além disso, compõe o Sistema Nacional de Trânsito e tem atribuições elencadas no Código de Trânsito Brasileiro - CTB, dentre elas a de promover a educação para o trânsito.
            </p>
            <div className="my-5 mx-10xh">
              <YouTube videoId="7GvPrJg6KU4"containerClassName="iframe-container"/>
            </div>
          </div>
          <div className="description mt-1">
            <span className="h4">O que é o Programa Conexão DNIT?</span>
            <span className="br-divider my-3"></span>
            <p>
              O Conexão DNIT é o Programa Nacional de Educação para o Trânsito do Departamento Nacional de Infraestrutura de Transportes – DNIT, que visa a formação de uma
              rede de educação para o trânsito alimentada pelo compartilhamento de conhecimentos e por estímulos pedagógicos contínuos, em que participam órgãos e entidades de trânsito, secretarias de educação, escolas, professores, comunidade escolar e sociedade em geral.</p>
            <p>
              O Programa Conexão DNIT foi concebido como uma iniciativa inovadora, sustentável e colaborativa de educação para o trânsito, estruturada em rede e direcionada para as escolas de ensino fundamental. Seu objetivo é preservar vidas!
            </p>
            <p>
              Se você, como nós do DNIT, também acha importante a educação para o trânsito e tem vontade de modificar a realidade das vias e rodovias do Brasil, assista ao vídeo abaixo, e conheça mais sobre o Conexão DNIT.
            </p>
            <div className="my-5 mx-10xh">
              <YouTube videoId="gsjNfLvQDvw" containerClassName="iframe-container" />
            </div>
          </div>
          <div className="description mt-1">
            <span className="h4">Sinistro de Trânsito versus Educação para o Trânsito</span>
            <span className="br-divider my-3"></span>
            <p>
              Você sabia que o Brasil aparece em quinto lugar entre os países recordistas em mortes no trânsito? Segundo a Organização Mundial da Saúde, as lesões ocorridas no trânsito são a principal causa de morte entre crianças e jovens de 5 a 29 anos.
            </p>
            <p>
              Nesse contexto, a educação para o trânsito constitui dever prioritário do Departamento Nacional de Infraestrutura de Transportes – DNIT, que através do Conexão DNIT ajuda a escola a promovê-la de forma transversal, conforme orienta a Base Nacional Comum Curricular – BNCC.
            </p>
            <p>
              O Programa conta com o apoio técnico/pedagógico do DNIT, através de uma plataforma digital e um aplicativo mobile, com canais exclusivos para interação.
            </p>
            <div className="my-5 mx-10xh">
              <YouTube videoId="rcelb-kZqdg" containerClassName="iframe-container" />
            </div>
            <div className="description mt-1">
              <span className="h4">Relato de Caso no Trânsito</span>
              <span className="br-divider my-3"></span>
              <p className="mb-4 placeholder">“Mesmo sabendo que um dia a vida acaba, a gente nunca está preparado para perder alguém.” – Nicholas Sparks</p>
              <p>
                Quando a perda ocorre devido a condições da velhice ou doença degenerativa, apesar de toda a tristeza e sofrimento envolvido nesse processo de luto, as pessoas acabam tendo maior tempo para se preparar e a tendência é que elas se conformem mais rapidamente com a partida da pessoa amada.
              </p>
              <p>
                Já em casos de perdas súbitas, quando a morte é repentina e acaba pegando todos de surpresa, como acontece em casos de sinistros de trânsito, por exemplo, essa fase de luto é de maior dificuldade de superação. Nesses casos, as pessoas enlutadas acabam tendo maior dificuldade de digerir a perda, ficam confusas e buscam encontrar os porquês, na tentativa de elaborar um entendimento racional do que aconteceu.
              </p>
              <p>
                Assista este depoimento de uma vítima do trânsito:
              </p>
              <div className="my-5 mx-10xh">
                <YouTube videoId="wQ7Ctsz9xDE" containerClassName="iframe-container" />
              </div>
              <p>
                Cientes do seu compromisso em minimizar, por meio da educação, os números de lesões e mortes decorrentes dos sinistros no trânsito, fazemos o convite para que se junte a nós, aderindo ao Conexão DNIT por meio do cadastro clicando aqui ou no botão entrar e realizando seu cadastro através do acesso único GOV.BR.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default About;
