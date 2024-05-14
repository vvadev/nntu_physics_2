
export interface GridImageProps {
    onTap: (x: number, y: number) => void;
    lines?: number[];
    circles?: { radius: number, y: number }[];
    children?: React.ReactNode;
}