import Mermaid from './Mermaid';
import type { MDXComponents } from 'mdx/types';

type PreProps = {
  children?: {
    props?: { className?: string; children?: unknown };
  };
};

export const mdxComponents: MDXComponents = {
  pre: (props: PreProps) => {
    const child = props?.children;
    const className: string = child?.props?.className ?? '';
    if (className.includes('language-mermaid')) {
      return <Mermaid chart={String(child?.props?.children).trim()} />;
    }
    return <pre>{props.children as React.ReactNode}</pre>;
  },
};
