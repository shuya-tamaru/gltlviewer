import Header from './header';
import SearchForm from './searchForm';
import UserName from './userName';

type Props = {
  searchText: string;
};

export default function TopBar({ searchText }: Props) {
  return (
    <Header>
      <SearchForm searchText={searchText} />
      <UserName />
    </Header>
  );
}
