function nyamushkaBorder(fill) {
  return `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='320px' height='480px' viewBox='0 0 320 480' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath d='M42.6761902,0 L308,0 C314.627417,-1.21743675e-15 320,5.372583 320,12 L320,468 C320,474.627417 314.627417,480 308,480 L12,480 C5.372583,480 8.11624501e-16,474.627417 0,468 L0,42.6761902 L42.6761902,1.33226763e-15 Z' id='path-1' fill='%23ffffff'%3E%3C/path%3E%3C/defs%3E%3Cg stroke='none' stroke-width='1' fill='%23ffffff' fill-rule='evenodd'%3E%3Cg%3E%3Cg%3E%3Cmask id='mask-2' fill='%23ffffff'%3E%3Cuse xlink:href='%23path-1'%3E%3C/use%3E%3C/mask%3E%3Cpath stroke='%23${fill.substr(1)}' stroke-width='4' d='M43.5046174,2 L2,43.5046174 L2,468 C2,473.522847 6.4771525,478 12,478 L308,478 C313.522847,478 318,473.522847 318,468 L318,12 C318,6.4771525 313.522847,2 308,2 L43.5046174,2 Z' %3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E`
};

const packsColors = {
  rose: {
    normal: '#D91667',
    hovered: '#E52E7A',
  },
  blue: {
    normal: '#1698D9',
    hovered: '#2EA8E6',
  },
  grey: {
    normal: '#B3B3B3',
    hovered: '#B3B3B3',
  },
}

const immutableRowUpdateById = (arr, id) => {
  const index = arr.findIndex(item => item.id === id);
  const row = arr[index];
  const { selected } = row;

  row.selected = !selected;

  return [
    ...arr.slice(0, index),
    row,
    ...arr.slice(index + 1)
  ];
}

export { immutableRowUpdateById, nyamushkaBorder, packsColors }