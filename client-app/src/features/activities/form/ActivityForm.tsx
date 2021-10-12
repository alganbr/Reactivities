import React, {ChangeEvent, useState} from 'react';
import {Button, Form, Segment} from "semantic-ui-react";
import {Activity} from "../../../app/models/Activity";
import {LoadingComponents} from "../../../app/layout/LoadingComponents";

interface Props {
  activity: Activity | undefined,
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
};

export function ActivityForm({activity: selectedActivity, closeForm, createOrEdit, submitting}: Props) {
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);
  
  function handleSubmit() {
    createOrEdit(activity);
  }
  
  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target;
    setActivity({
      ...activity,
      [name]: value
    })
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange} />
        <Form.Input placeholder='Description' name='description' value={activity.description} onChange={handleInputChange} />
        <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange} />
        <Form.Input placeholder='Date' name='date' value={activity.date} onChange={handleInputChange} type='date' />
        <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange} />
        <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange} />
        <Button floated='right' positive type='submit' content='Submit' loading={submitting} />
        <Button floated='right' type='button' content='Cancel' onClick={closeForm} />
      </Form>
    </Segment>
  );
};