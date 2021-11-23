import { getAcceptedImageExtensions } from './imageTypes';
import { getAcceptedAudioExtensions } from './audioTypes';
import { getAcceptedVideoExtensions } from './videoTypes';

const TXT = '.txt';
const RTF = '.rtf';
const DOC = '.doc';
const DOCX = '.docx';
const PDF = '.pdf';
const PPT = '.ppt';
const PPTX = '.pptx';
const XLS = '.xls';
const ODT = '.odt';

const getAcceptedFileExtensions = () =>
  [TXT, RTF, DOC, DOCX, PDF, PPT, PPTX, XLS, ODT]
    .concat(getAcceptedImageExtensions())
    .concat(getAcceptedAudioExtensions())
    .concat(getAcceptedVideoExtensions());

export { getAcceptedFileExtensions };
