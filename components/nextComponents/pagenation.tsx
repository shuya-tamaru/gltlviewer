import { Box, Text } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';

import { SelectPage } from '../../types/SelectPage';

type Props = {
  pageCount: number;
  handlePageClick: SelectPage;
};

const Pagination = ({ pageCount, handlePageClick }: Props) => {
  return (
    <Box h='10px'>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel='<'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
      />
    </Box>
  );
};

export default Pagination;
