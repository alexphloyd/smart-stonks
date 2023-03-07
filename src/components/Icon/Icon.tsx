import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface IconProps extends DetailedHTMLProps<HTMLAttributes<SVGSVGElement>, SVGSVGElement> {
  name: string;
  section?: string;
}

export const Icon = (props: IconProps) => {
  const { name, section = 'icons', ...other } = props;

  return (
    <svg {...other} data-testid='icon_svg'>
      <use
        data-testid='icon_svg_use'
        xlinkHref={`/sprites/${section}.svg#${name.toLocaleLowerCase()}`}
      />
    </svg>
  );
};
