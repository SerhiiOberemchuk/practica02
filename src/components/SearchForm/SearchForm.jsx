import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = { searchQuery: '' };
  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (!searchQuery.trim()) {
      return alert('cannot be empty');
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handleChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={searchQuery}
        />
      </SearchFormStyled>
    );
  }
}
