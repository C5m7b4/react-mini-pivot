export type TextAlignType = 'left' | 'center' | 'right';

export interface ToolProps {
  fieldType: string;
  x: number;
  y: number;
  debug?: boolean;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  textAlign: TextAlignType;
  fontVariant: string;
  queryId: string;
  text: string;
  el?: HTMLDivElement;
  box?: DOMRect;
  lineHeight: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  textDecoration: string;
}
