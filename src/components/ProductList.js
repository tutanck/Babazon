import PropTypes from 'prop-types';
// material
import {
  Chip,
  Stack,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  IconButton,
  Typography,
  Switch
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onUpdate: PropTypes.array.isRequired,
  onRemove: PropTypes.array.isRequired
};

export default function ProductList({
  products,
  onUpdate: [updateProduct, updateStatus],
  onRemove: [removeProduct, removeStatus]
}) {
  return (
    <List
      sx={{
        my: 2,
        maxHeight: 600,
        width: '100%',
        overflow: 'auto',
        position: 'relative',
        bgcolor: 'background.paper'
      }}
    >
      {products.map(({ _id, name, inStock }, i) => (
        <ListItem
          key={i}
          secondaryAction={
            <Stack direction="row" spacing={3}>
              <FormControlLabel
                label=""
                labelPlacement="start"
                control={
                  <Switch
                    size="small"
                    color="secondary"
                    checked={!!inStock}
                    onChange={(e) => updateProduct(_id, e.target.checked)}
                    disabled={updateStatus === 'loading'}
                  />
                }
              />

              <IconButton
                size="small"
                color="default"
                onClick={() => removeProduct(_id)}
                disabled={removeStatus === 'loading'}
                sx={{
                  p: 1,
                  '&:hover': {
                    color: 'black'
                  }
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          }
        >
          <Stack direction="row" spacing={1}>
            <ListItemText
              primary={
                <Typography variant="h6" noWrap component="div">
                  {name}
                </Typography>
              }
              sx={{ textTransform: 'uppercase' }}
            />
            <Chip
              color={inStock ? 'success' : 'error'}
              label={inStock ? 'In Stock' : 'Out of Stock'}
              sx={{ height: 24 }}
            />
          </Stack>
        </ListItem>
      ))}
    </List>
  );
}
