import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { createNews } from '../api/news'

export default function CreateNewsPage() {
    const navigate = useNavigate()

    return (
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4, bgcolor: 'background.paper', p: 3, borderRadius: 1 }}>
            <Typography variant="h5" gutterBottom>Добавить новость</Typography>
            <Formik
                initialValues={{ title: '', preview: '', content: '' }}
                validationSchema={Yup.object({
                    title: Yup.string().required('Обязательно'),
                    preview: Yup.string().required('Обязательно'),
                    content: Yup.string().required('Обязательно'),
                })}
                onSubmit={(values, { setSubmitting }) => {
                    createNews(values).then(() => {
                        setSubmitting(false)
                        navigate('/news')
                    })
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form>
                        <Stack spacing={2}>
                            <Field name="title">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Заголовок"
                                        fullWidth
                                        error={Boolean(errors.title && touched.title)}
                                        helperText={touched.title && errors.title}
                                    />
                                )}
                            </Field>
                            <Field name="preview">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Превью"
                                        fullWidth
                                        error={Boolean(errors.preview && touched.preview)}
                                        helperText={touched.preview && errors.preview}
                                    />
                                )}
                            </Field>
                            <Field name="content">
                                {({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Текст"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        error={Boolean(errors.content && touched.content)}
                                        helperText={touched.content && errors.content}
                                    />
                                )}
                            </Field>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button component={RouterLink} to="/news">Отмена</Button>
                                <Button type="submit" variant="contained" disabled={isSubmitting}>
                                    {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                                </Button>
                            </Box>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}
