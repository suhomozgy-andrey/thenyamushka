const packsColors = {
  pallete: {
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
  },
  selected: 'rose',
  disabled: 'grey',
  default: 'blue',
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

export { immutableRowUpdateById, packsColors }