import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  selectedActivity: Activity | undefined;
  handleEditMode: (id?: string) => void;
  handleActivityInput: (activity: Activity) => void;
  submitting: boolean;
}

export default function ActivityForm({ selectedActivity, handleEditMode,
  handleActivityInput, submitting }: Props) {
  const initialState: Activity = selectedActivity ?? {
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleOnSubmit() {
    handleActivityInput(activity);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
        <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange} />
        <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleChange} />
        <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handleChange} />
        <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleChange} />
        <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleChange} />
        <Button loading={submitting} floated="right" positive type="submit" content='Submit' onClick={handleOnSubmit} />
        <Button onClick={() => handleEditMode()} floated="right" type="button" content='Cancel' />
      </Form>
    </Segment>
  )
}