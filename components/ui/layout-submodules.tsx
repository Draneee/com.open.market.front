import { cn } from '@/lib/utils';

const LayoutSubmodule = ({
  submoduleName,
  children,
  className,
  toolBar,
  buttonHeader,
  buttonsSideTitle,
}: IProps) => {
  return (
    <article
      className={cn('flex flex-col py-5 2xl:pt-6 gap-5 h-full', className)}
    >
      <header className='flex w-full justify-between'>
        <section className='flex flex-col gap-2'>
          <section className='flex gap-2'>
            <h3 className='text-2xl'>{submoduleName}</h3>
            {buttonsSideTitle}
          </section>
          {toolBar}
        </section>
        <section className='flex items-end animate'>{buttonHeader}</section>
      </header>
      {children}
    </article>
  );
};

export default LayoutSubmodule;

interface IProps {
  submoduleName: string;
  children?: JSX.Element;
  className?: string;
  toolBar?: JSX.Element;
  buttonHeader?: JSX.Element;
  buttonsSideTitle?: JSX.Element;
}
