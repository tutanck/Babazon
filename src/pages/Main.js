/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

// hooks
import { useAsync, useOnDone } from '@tutanck/react-async';

import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Stack, TextField, IconButton, Typography, LinearProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// components
import ProductList from '../components/ProductList';
// utils
import { get, post, put, del } from '../utils/api-client';

export default function Main() {
  const [products, setProducts] = useState([]);

  const [fetch, fetchStatus] = useAsync(get);
  const [add, addStatus] = useAsync(post);
  const [update, updateStatus] = useAsync(put);
  const [remove, removeStatus] = useAsync(del);

  const onError = alert;

  const fetchProducts = () => fetch(`/api/products`).then(setProducts).catch(onError);

  const updateProduct = (id, inStock) => {
    update(`/api/products/${id}`, {
      data: {
        inStock
      }
    });
  };

  const removeProduct = (id) => remove(`/api/products/${id}`);

  useEffect(fetchProducts, []); // first load

  useOnDone(fetchProducts, [addStatus, updateStatus, removeStatus]); // automatic refresh

  const ProductSchema = Yup.object().shape({
    name: Yup.string().required('Obligatoire'),
    inStock: Yup.boolean().required()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      inStock: false
    },
    validationSchema: ProductSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        await add(`/api/products`, {
          data: {
            ...values
          }
        });
        resetForm();
      } catch (error) {
        setErrors(error);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return fetchStatus === 'loading' ? (
    <LinearProgress />
  ) : (
    <Stack spacing={1} sx={{ py: 2 }}>
      <Typography variant="h6" noWrap component="div" gutterBottom>
        Add a product
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack direction="row" sx={{ px: 8, py: 2 }} spacing={2}>
            <TextField
              fullWidth
              label="Name"
              placeholder="Product name"
              InputProps={{ type: 'text' }}
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <IconButton type="submit" color="primary" disabled={addStatus === 'loading'} sx={{ width: 60, height: 60 }}>
              <AddIcon />
            </IconButton>
          </Stack>
        </Form>
      </FormikProvider>

      <ProductList
        products={products}
        onUpdate={[updateProduct, updateStatus]}
        onRemove={[removeProduct, removeStatus]}
      />
    </Stack>
  );
}
