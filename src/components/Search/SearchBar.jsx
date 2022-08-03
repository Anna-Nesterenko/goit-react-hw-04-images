// import { Formik, Form, Field } from 'formik';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';
import { WrapperHeader, Field, BtnSearch } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleNameChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value.toLowerCase().trim() });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.searchQuery === '') {
      toast.warning('Sorry, your field is empty. Enter search name');
      return;
    }

    await this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <WrapperHeader>
        <form onSubmit={this.handleSubmit}>
          <BtnSearch type="submit">
            <FiSearch style={{ marginTop: 3 }}></FiSearch>
          </BtnSearch>
          <Field
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchQuery}
            onChange={this.handleNameChange}
            placeholder="Search images..."
          />
        </form>
      </WrapperHeader>
    );
  }
}

// export default SearchBar;
