import { EnvsConfig } from '../../infra/config/envs.config';

const imageParser = (context: any, image: { default: any; id: any }) => ({
  default: image.default,
  uri: `${EnvsConfig.apiServicoDnit()}/${context}/images/${image.id}`,
});

export default imageParser;
