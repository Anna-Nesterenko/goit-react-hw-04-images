import { Formik, Form, Field } from 'formik';

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <header>
      <Formik initialValues={{ title: '' }} onSubmit={handleSubmit}>
        <Form>
          <button type="submit">
            <span>Search</span>
          </button>
          <Field name="title" type="text" placeholder="Search images..." />
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
