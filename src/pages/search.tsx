import { Divider, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ChannelList from '../components/ChannelList';
import MainLayout from '../components/MainLayout';
import VideoList from '../components/VideoList';
import { redirect } from '../helper/route';
import SearchService from '../service/search.service';
import { RootState } from '../store';
import { setResults } from '../store/search/actions';
import { SearchState } from '../store/search/types';


const Search: NextPage = () => {
  const router = useRouter();
  const {
    query: { query },
  } = router;

  const { results } = useSelector<RootState, SearchState>((state) => state.searchState);

  const renderChannelResult = () => {
    if (results.channels?.length > 0) {
      return (
        <>
          <Typography variant="subtitle1">
            Search result for <span className="font-bold">{query}</span>
          </Typography>
          <ChannelList channels={results.channels} />
        </>
      );
    }
    return null;
  };

  const renderVideoResult = () => {
    if (results.videos?.length > 0) {
      return (
        <>
          <Typography variant="subtitle1">
            Search result for <span className="font-bold">{query}</span>
          </Typography>
          <VideoList videos={results.videos} />
        </>
      );
    }
    return null;
  };

  return (
    <MainLayout>
      <Head>
        <title>Next Video Sharing</title>
      </Head>
      <div className="w-full h-full md:w-3/4 md:m-auto">
        <div className="mb-5">{renderChannelResult()}</div>
        {results.channels?.length > 0 && <Divider className="mb-5" />}
        <div className="mb-5">{renderVideoResult()}</div>
      </div>
    </MainLayout>
  );
};

Search.getInitialProps = async ({ store, res, query }) => {
  const { query: searchQuery, p = 1, s = 10 } = query;
  if (!searchQuery) {
    redirect(res);
  }
  const results = await SearchService.getSearchResult({
    query: searchQuery as string,
    page: parseInt(p as string),
    size: parseInt(s as string),
  });
  await store.dispatch(setResults(results));
};

export default Search;
