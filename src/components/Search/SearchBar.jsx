// import { Formik, Form, Field } from 'formik';
import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';
import { WrapperHeader, Field, BtnSearch } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = event => {
    //  const { name, value } = event.currentTarget;
    this.setState({
      searchName: event.currentTarget.value.toLowerCase().trim(),
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    if (this.state.searchName === '') {
      toast.warning('Sorry, your field is empty. Enter search name');
      return;
    }

    await this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    return (
      <WrapperHeader>
        <form onSubmit={this.handleSubmit}>
          <BtnSearch type="submit">
            <FiSearch style={{ marginTop: 3 }}></FiSearch>
          </BtnSearch>
          <Field
            name="searchName"
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.searchName}
            onChange={this.handleNameChange}
            placeholder="Search images..."
          />
        </form>
      </WrapperHeader>
    );
  }
}

// export default SearchBar;
