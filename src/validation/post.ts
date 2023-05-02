import * as Yup from 'yup';

export const DialogPostSchema = Yup.object().shape({
  title: Yup.string().trim().required('Required'),
  description: Yup.string().trim().required('Required'),
  link: Yup.string().trim().required('Required'),
});
