import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Activity } from "../../../app/models/activity";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

function ActivityForm() {
  const {activityStore} = useStore();
  const {createActivity, updateActivity, loading, loadActivity, 
    loadingInitialActivities} = activityStore;

  const {id} = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: ''
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => {
      if (activity) setActivity(activity);
    });
  }, [id, loadActivity]);

  function handleOnSubmit() {
    if (!activity.id) {
      activity.id = uuid();
      createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setActivity({...activity, [name]: value});
  }

  if (loadingInitialActivities) return <LoadingComponent />;

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
        <Button floated="right" type="button" content='Cancel' />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm);