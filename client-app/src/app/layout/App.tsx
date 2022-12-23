import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { Activity } from '../models/activity';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(res =>{
        setActivities(res.data);
      });
  }, []);

  function handleSelectActivity(id: string) {
    selectedActivity && selectedActivity.id === id ? 
      setSelectedActivity(undefined) : 
      setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleEditMode() {
    editMode ? setEditMode(false) : setEditMode(true);
  }

	function handleActivityInput(activity: Activity) {
		activity.id 
			? setActivities([...activities.filter(x => x.id !==activity.id), activity])
      : setActivities([...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
	}

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)])
  }

  return (
    <>
      <NavBar handleEditMode={handleEditMode} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          editMode={editMode}
          handleEditMode={handleEditMode}
          handleActivityInput={handleActivityInput}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  );
}

export default App;
