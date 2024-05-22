import { forwardRef, Fragment } from 'react';
import type { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from 'react';

type FunctionHasChildrenType = ({ children }: PropsWithChildren) => JSX.Element;

type FunctionInjectType =
  | FunctionHasChildrenType
  | React.ForwardRefExoticComponent<PropsWithChildren & React.RefAttributes<any>>;

type AppType = ForwardRefExoticComponent<Omit<any, 'ref'> & RefAttributes<any>> | any;

export type ComponentInjectPropsType = {
  providers?: FunctionInjectType[];
  /** containers: logic + ui + store */
  containers?: FunctionHasChildrenType[];
  template?: FunctionHasChildrenType[];
  services?: FunctionHasChildrenType[];
  app: AppType;
};

export function ComponentInject<Props, RefProps>(
  params: ComponentInjectPropsType,
): React.ForwardRefExoticComponent<React.PropsWithoutRef<Props> & React.RefAttributes<RefProps>> {
  return forwardRef<RefProps, Props>(function ComponentInject(props, ref) {
    const { providers, template, app: App, services, containers } = params;
    let list: ComponentInjectPropsType['providers'] = [];
    if (containers) {
      list = list.concat(containers);
    }
    if (services) {
      list = list.concat(services);
    }
    if (providers) {
      list = list.concat(providers);
    }
    if (template) {
      list = list.concat(template);
    }
    return (
      <Fragment>
        {list.reduceRight(
          (children, Provider) => (
            <Provider>{children}</Provider>
          ),
          <App
            {...props}
            ref={ref}
          />,
        )}
      </Fragment>
    );
  });
}
