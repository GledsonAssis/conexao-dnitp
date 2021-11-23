/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import { dbErrorHandler, genericErrorHandler } from '../../middlewares';

import ActivityDownloads from '../../services/reports/activity_downloads';
import InitiativesReport from '../../services/reports/Initiatives';
import Interactivity from '../../services/reports/Interactivity';
import MessageReport from '../../services/reports/Messages';
import ProjectsReport from '../../services/reports/Projects';
import SurveyDownloads from '../../services/reports/Survey';
import ParticipantsReport from '../../services/reports/Participants';

import {
  dbDataHandler,
  dbFileHandler,
  mapCSVFile,
} from '../../utils/http';

const getProjectsReport = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return ProjectsReport.getReport(query, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const getMessagesReport = (req, res) => {

  const {
    query,
    currentUser: user,
  } = req;

  MessageReport.getReport(query, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadMessagesCSV = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return MessageReport.getReport(query, user)
    .then(file => mapCSVFile(file, 'relatorio_mensagens_recebidas'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const downloadProjectsCSV = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return ProjectsReport.getReport(query, user)
    .then(file => mapCSVFile(file, 'relatorio_projetos_acoes'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getInitiativesReport = (req, res) => {

  const {
    query,
    currentUser: user,
  } = req;

  return InitiativesReport.getReport(query, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadInitiativesCSV = (req, res) => {

  const {
    query,
    currentUser: user,
  } = req;

  return InitiativesReport.getReport(query, user)
    .then(file => mapCSVFile(file, 'relatorio_iniciativas'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getActivityDownloadsReport = (req, res) => {

  const {
    query,
    currentUser: user,
  } = req;
  return ActivityDownloads.getReport(query, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadActivityDownloadCSV = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return ActivityDownloads.getReport(query, user)
    .then(file => mapCSVFile(file, 'relatorio_download_atividades'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getInteractivityReport = (req, res) => {
  const { query } = req;

  return Interactivity.getReport(query)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadInteractivityCSV = (req, res) => {
  const { query } = req;

  return Interactivity.getReport(query)
    .then(file => mapCSVFile(file, 'relatorio_interatividades'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getSurveyReport = (req, res) => {

  const {
    body,
    currentUser: user,
  } = req;
  SurveyDownloads.getReport(body, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadSurveyReport = (req, res) => {
  const {
    body,
    currentUser: user,
  } = req;
  return SurveyDownloads.getReport(body, user)
    .then((result) => {
      switch (body.type) {
        case '1':
          return result.map(el => ({
            Situacao: el.situation,
            Ano: el.year,
            Disciplina: el.discipline,
            Professor: el.teacher,
            Atividade: el.activity,
            'Superintendencia Regional ': el.regionalSuperintendence,
            'Unidade Local': el.dnitLocalUnit,    
            Instituicao: el.institution || '',  
          }));
        case '2':
          return result.map(el => ({
            Situacao: el.situation,
            Ano: el.year,
            'Data Avaliacao': el.date ? moment(new Date(el.date)).format('DD/MM/YYYY'): '',
            Professor: el.teacher,
            'Superintendencia Regional ': el.regionalSuperintendence,
            'Unidade Local': el.dnitLocalUnit,    
            Instituicao: el.institution || '',  
          }));
        case '3':
          return result.map(el => ({
            Ano: el.year,
            'Data Avaliacao': el.date ? moment(new Date(el.date)).format('DD/MM/YYYY') : '',
            Professor: el.teacher,    
            Instituicao: el.institution || '',  
            'Superintendencia Regional ': el.regionalSuperintendence,
            'Unidade Local': el.dnitLocalUnit,
            Atividade: el.activity,
            Pergunta: el.question,
            Alternativa: el.alternative,
            Justificativa: el.justify,
          }));
        default:
          return null;
      }
    })
    .then(file => mapCSVFile(file, 'relatorio_avaliacoes_atividade'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

const getParticipantsReport = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return ParticipantsReport.getReport(query, user)
    .then(dbDataHandler(req, res))
    .catch(dbErrorHandler(req, res));
};

const downloadParticipantsCSV = (req, res) => {
  const {
    query,
    currentUser: user,
  } = req;

  return ParticipantsReport.getReport(query, user)
    .then(file => mapCSVFile(file, 'relatorio_participantes'))
    .then(dbFileHandler(req, res))
    .catch(error => genericErrorHandler(error, req, res));
};

export default {
  downloadProjectsCSV,
  getInitiativesReport,
  getSurveyReport,
  downloadInitiativesCSV,
  downloadMessagesCSV,
  downloadSurveyReport,
  getActivityDownloadsReport,
  downloadActivityDownloadCSV,
  getProjectsReport,
  getMessagesReport,
  getInteractivityReport,
  downloadInteractivityCSV,
  getParticipantsReport,
  downloadParticipantsCSV,
};
