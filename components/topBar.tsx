import Header from './header';
import SearchForm from './searchForm';
import UserName from './userName';
import { SearchText } from '../types/SearchText';

export default function TopBar({ searchText }: SearchText) {
  return (
    <Header>
      <SearchForm searchText={searchText} />
      <UserName />
    </Header>
  );
}
