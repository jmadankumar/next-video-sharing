import { Divider, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChannelList from '../components/ChannelList';
import MainLayout from '../components/MainLayout';
import VideoList from '../components/VideoList';
import SearchService from '../service/search.service';
import { RootState, wrapperRedux } from '../store';
import { setResults } from '../store/search/actions';
import { SearchResult } from '../types/search';

const SearchContent = styled.div``;
interface SearchProps {
  results: SearchResult;
}
const Search: React.FC<SearchProps> = ({ results }) => {
  const router = useRouter();
  const {
    query: { query },
  } = router;

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

const mapStateToProps = (state: RootState) => {
  return {
    results: state.searchState.results,
  };
};

export default connect(mapStateToProps)(Search);

export const getServerSideProps: GetServerSideProps = wrapperRedux.getServerSideProps(
  async ({ query, store, res }) => {
    const { query: searchQuery, p = 1, s = 10 } = query;
    if (!searchQuery) {
      res.statusCode = 302;
      res.setHeader('Location', '/');
      res.end();
    }
    const results = await SearchService.getSearchResult({
      query: searchQuery as string,
      page: parseInt(p as string),
      size: parseInt(s as string),
    });
    await store.dispatch(setResults(results));
  },
);
