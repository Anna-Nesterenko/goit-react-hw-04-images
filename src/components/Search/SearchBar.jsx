import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch } from 'react-icons/fi';
import { WrapperHeader, Field, BtnSearch } from './SearchBar.styled';
import PropTypes from 'prop-types';

export function SearchBar({ onSubmit }) {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (searchName === '') {
      toast.warning('Sorry, your field is empty. Enter search name');
      return;
    }
    await onSubmit(searchName);
    setSearchName('');
  };

  return (
    <WrapperHeader>
      <form onSubmit={handleSubmit}>
        <BtnSearch type="submit">
          <FiSearch style={{ marginTop: 3 }}></FiSearch>
        </BtnSearch>
        <Field
          name="searchName"
          type="text"
          autoComplete="off"
          autoFocus
          value={searchName}
          onChange={handleNameChange}
          placeholder="Search images..."
        />
      </form>
    </WrapperHeader>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// export class oldSearchBar extends Component {
//   state = {
//     searchName: '',
//   };

//   static propTypes = {
//     onSubmit: PropTypes.func.isRequired,
//   };

//   handleNameChange = event => {
//     this.setState({
//       searchName: event.currentTarget.value.toLowerCase().trim(),
//     });
//   };

//   handleSubmit = async event => {
//     event.preventDefault();
//     if (this.state.searchName === '') {
//       toast.warning('Sorry, your field is empty. Enter search name');
//       return;
//     }

//     await this.props.onSubmit(this.state.searchName);
//     this.setState({ searchName: '' });
//   };

//   render() {
//     return (
//       <WrapperHeader>
//         <form onSubmit={this.handleSubmit}>
//           <BtnSearch type="submit">
//             <FiSearch style={{ marginTop: 3 }}></FiSearch>
//           </BtnSearch>
//           <Field
//             name="searchName"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             value={this.state.searchName}
//             onChange={this.handleNameChange}
//             placeholder="Search images..."
//           />
//         </form>
//       </WrapperHeader>
//     );
//   }
// }
