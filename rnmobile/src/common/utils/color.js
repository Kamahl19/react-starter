const colors = {
  white: '#ffffff',
  lightGray: '#adadad',
  darkGray: '#666666',
  gray: '#cccccc',
  red: '#ff3b30',
  green: '#4cd964',
  blue: '#006fff',
};

export function getColor(color) {
  return colors[color] || color;
}
