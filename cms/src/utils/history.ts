import { createHashHistory, HashHistoryBuildOptions } from 'history';

const props: HashHistoryBuildOptions = {
  basename: '',
  hashType: 'slash',
};

const history = createHashHistory(props);

export default history;
