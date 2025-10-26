import { SVGProps } from 'react';

export function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12 2.5l1.6 4.53 4.9.35-3.74 2.92 1.2 4.73L12 11.8l-3.96 3.23 1.2-4.73-3.74-2.92 4.9-.35L12 2.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.5 17.5l.9 2.5 2.6.18-1.98 1.54.63 2.54-2.15-1.76-2.15 1.76.63-2.54-1.98-1.54 2.6-.18.9-2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />
      <path
        d="M20 13l.7 1.9 1.96.14-1.5 1.16.48 1.92-1.65-1.35-1.65 1.35.48-1.92-1.5-1.16 1.96-.14L20 13z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
    </svg>
  );
}
