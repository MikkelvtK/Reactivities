import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivitiesForm";
import ActivityList from "./ActivityList";

interface Props {
	activities: Activity[];
	selectedActivity: Activity | undefined;
	selectActivity: (id: string) => void;
	editMode: boolean;
	handleEditMode: () => void;
	handleActivityInput: (activity: Activity) => void;
	handleDeleteActivity: (id: string) => void;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, 
		editMode, handleEditMode, handleActivityInput, handleDeleteActivity}: Props) {
	return (
		<Grid>
			<Grid.Column width='10'>
				<ActivityList 
					activities={activities} 
					selectActivity={selectActivity} 
					deleteActivity={handleDeleteActivity}
				/>
			</Grid.Column>
			<Grid.Column width={6}>
				{selectedActivity && !editMode &&
				<ActivityDetails 
					activity={selectedActivity}
					selectActivity={selectActivity}
					handleEditMode={handleEditMode}
				/>}
				{editMode &&
				<ActivityForm
					selectedActivity={selectedActivity}
					handleEditMode={handleEditMode}
					handleActivityInput={handleActivityInput}
				/>}
			</Grid.Column>
		</Grid>
	)
}