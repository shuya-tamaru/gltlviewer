import Header from './header';
import SearchForm from './searchForm';
import UserName from './userName';

export default function TopBar() {
	return (
		<Header>
			<SearchForm />
			<UserName />
		</Header>
	);
}
