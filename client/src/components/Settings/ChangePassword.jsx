import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  new_password: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
  cnew_password: Yup.string()
    .min(6, 'Too Short!')
    .max(30, 'Too Long!')
    .required('Required'),
});

export default function ChangePassword() {
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          new_password: '',
          cnew_password: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="new_password" />
            <ErrorMessage name='new_password' />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  )


}