import { type ReactNode } from 'react';

type ScrollSectionProps = {
  id: string;
  className: string;
  children: ReactNode;
  style?: React.CSSProperties;
};

export default function ScrollSection({ id, className, children, style }: ScrollSectionProps) {
  return (
    <section id={id} className={className} style={style}>
      {children}
    </section>
  );
}