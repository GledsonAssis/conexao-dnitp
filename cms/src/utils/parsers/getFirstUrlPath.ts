export function pathName(pathname: any) {
  return `/${pathname.split('/')[1]}`
}

export default pathName;
