import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";

function ActivityForm() {
  const {activityStore} = useStore();
  const {selectedActivity, showForm, createActivity, updateActivity, loading} = activityStore;

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
    activity.id ? updateActivity(activity) : createActivity(activity);
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
        <Button loading={loading} floated="right" positive type="submit" content='Submit' onClick={handleOnSubmit} />
        <Button onClick={showForm} floated="right" type="button" content='Cancel' />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm);