import { Text, TextProps } from './Themed';

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'SpaceMono' }]} />;
}

export function NovaText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'ProximaNova' }]} />;
}

export function PoppinsText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'Poppins' }]} />;
}
