import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextComponentType,
  NextPage,
  NextPageContext,
} from 'next';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';
import { redirect } from '../helper/http';

function isBrowser() {
  return typeof window !== 'undefined';
}

interface WithConditonRedirectOption {
  WrapperComponent: NextPage;
  clientCondition: () => boolean;
  serverCondition: (ctx: NextPageContext) => boolean;
  location?: string;
}

const withConditonRedirect = ({
  WrapperComponent,
  clientCondition,
  serverCondition,
  location = '/',
}: WithConditonRedirectOption) => {
  const WithConditonRedirectWrapper: NextPage = (props: any) => {
    const router = useRouter();
    const redirectCondition = clientCondition();
    if (isBrowser() && redirectCondition) {
      router.push(location);
      return <></>;
    }
    return <WrapperComponent {...props} />;
  };

  WithConditonRedirectWrapper.getInitialProps = async (ctx) => {
    const { res } = ctx;
    if (!isBrowser && res) {
      if (serverCondition(ctx)) {
        redirect(res, location);
      }
    }
    const componentProps =
      WrapperComponent.getInitialProps && (await WrapperComponent.getInitialProps(ctx));
    return { ...componentProps };
  };
  return WithConditonRedirectWrapper;
};

export default withConditonRedirect;
