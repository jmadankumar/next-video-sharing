import { LocalMessage } from '../@types';
import useIsAuthenticated from '../hooks/useIsAuthenticated';
import withConditonRedirect from './withConditionRedirect';

const withoutAuth = (WrapperComponent: any, location?: string) => {
  return withConditonRedirect({
    WrapperComponent,
    clientCondition: () => {
      return useIsAuthenticated();
    },
    serverCondition: (ctx) => {
      const request = (ctx.req as unknown) as LocalMessage;
      return request.locals.authenticated;
    },
    location,
  });
};

export default withoutAuth;
