import { type HTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/common/styleUtils';

// TODO replace by shadcn-ui components once they are created
// https://github.com/shadcn-ui/ui/issues/315
// https://github.com/shadcn-ui/ui/pull/363

export const typographyVariants = cva('text-foreground', {
  variants: {
    // Inspired by https://ui.shadcn.com/docs/components/typography
    variant: {
      h1: 'scroll-m-20 text-5xl font-extrabold tracking-tight',
      h2: 'scroll-m-20 text-4xl font-semibold tracking-tight',
      h3: 'scroll-m-20 text-3xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h6: 'scroll-m-20 text-lg font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
      inlineCode:
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      regularText: 'text-base',
      largeText: 'text-lg font-semibold',
      smallText: 'text-sm font-medium leading-none',
      mutedText: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'regularText',
  },
});

const variantElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  blockquote: 'blockquote',
  inlineCode: 'code',
  largeText: 'div',
  regularText: 'div',
  smallText: 'small',
  lead: 'p',
  mutedText: 'p',
  ul: 'ul',
} as const satisfies Record<
  NonNullable<VariantProps<typeof typographyVariants>['variant']>,
  string
>;

export type TypographyProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants> & {
    asChild?: boolean;
    as?: string;
  };

const Typography = forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div';

    return <Comp className={cn(typographyVariants({ variant, className }))} ref={ref} {...props} />;
  },
);

Typography.displayName = 'Typography';

export default Typography;
