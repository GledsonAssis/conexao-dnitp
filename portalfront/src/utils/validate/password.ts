const passwordMinLenght = 4;

const passwordFunc = (password: string | any[]) => password.length >= passwordMinLenght;

export default passwordFunc;
