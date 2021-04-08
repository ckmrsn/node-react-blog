import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Select,
  Input,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FileBase64 from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/post";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

const tags = ["fun", "programming", "health", "science"];

const postSchema = yup.object().shape({
  title: yup.string().required(),
  subtitle: yup.string().required(),
  content: yup.string().min(20).required(),
  tag: yup.mixed().oneOf(tags),
});

const AddPostForm = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [file, setfile] = useState(null);
  const { register, handleSubmit, control, errors, reset } = useForm({
    resolver: yupResolver(postSchema),
  });

  const clearForm = () => {
    reset();
    setfile(null);
    handleClose();
  };
  const onSubmit = (data) => {
    dispatch(createPost({ ...data, image: file }));
    handleClose();
  };

  const classes = useStyles();
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Yeni Yazı Oluştur</DialogTitle>
      <DialogContent>
        <DialogContentText>Yeni bir yazı paylaşın.</DialogContentText>
        <div className={classes.root}>
          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id='title'
              label='Başlık'
              name='title'
              variant='outlined'
              className={classes.textField}
              size='small'
              inputRef={register}
              error={errors.title ? true : false}
              fullWidth
            />
            <TextField
              id='subtitle'
              label='Alt Başlık'
              name='subtitle'
              variant='outlined'
              className={classes.textField}
              size='small'
              inputRef={register}
              error={errors.subtitle ? true : false}
              fullWidth
            />
            <Controller
              as={
                <Select
                  input={<Input />}
                  className={classes.textField}
                  fullWidth
                >
                  {tags.map((tag, index) => (
                    <MenuItem key={index} value={tag}>
                      {tag}
                    </MenuItem>
                  ))}
                </Select>
              }
              name='tag'
              control={control}
              error={errors.tag ? true : false}
              defaultValue={tags[0]}
            />

            <TextField
              id='content'
              label='İçerik'
              name='content'
              multiline
              size='small'
              inputRef={register}
              rows={4}
              className={classes.textField}
              variant='outlined'
              error={errors.content ? true : false}
              fullWidth
            />
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => setfile(base64)}
            />
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={clearForm} color='inherit'>
          Vazgeç
        </Button>
        <Button
          type='submit'
          onClick={() => handleSubmit(onSubmit)()}
          color='primary'
          variant='outlined'
        >
          Yayınla
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddPostForm;
