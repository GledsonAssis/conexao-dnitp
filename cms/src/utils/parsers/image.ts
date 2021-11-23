import { EnvsConfig } from '../../infra/config/envs.config';

const imageParser = (context: any, image: { default: any; id: any }, type: string = 'images') => ({
  default: image.default,
  uri: `${EnvsConfig.apiServicoDnit()}/${context}/${type}/${image.id}`,
});

export default imageParser;
