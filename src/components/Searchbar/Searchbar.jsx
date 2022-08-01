// import { Formik, Form, Field } from 'formik';
import { Component } from 'react';
import { FiSearch } from 'react-icons/fi';

class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <FiSearch style={{ marginRight: 5 }}></FiSearch>
            Search
          </button>
          <input
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
            placeholder="Search images..."
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
