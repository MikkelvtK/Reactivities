import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode = false;
  loading = false;
  loadingInitialActivities = true;

  constructor() {
    makeAutoObservable(this);
  }

  get activities() {
    const activities = Array.from(this.activityRegistry.values());
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();
      
      activities.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    }

    this.setLoadingInitialActivities(false);
  }

  setLoadingInitialActivities = (state: boolean) => {
    this.loadingInitialActivities = state;
  }

  setLoading = (state: boolean) => {
    this.loading = state;
  }

  addActivity = (activity: Activity) => {
    this.activityRegistry.set(activity.id, activity);
  }

  removeActivity = (id: string) => {
    this.activityRegistry.delete(id);
    if (this.selectedActivity?.id === id) this.selectActivity(id);
  }

  selectActivity = (id?: string) => {
    if (this.selectedActivity && this.selectedActivity.id === id) {
      this.selectedActivity = undefined
    } else {
      this.selectedActivity = id ? this.activityRegistry.get(id) : undefined;
    }
  }

  showForm = () => {
    this.editMode = !this.editMode;
  }

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    activity.id = uuid();

    try {
      await agent.Activities.create(activity);
      this.addActivity(activity);
      this.selectActivity(activity.id);
      this.showForm();
    } catch(error) {
      console.log(error);
    }

    this.setLoading(false);
  }

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);

    try {
      await agent.Activities.update(activity);
      this.selectActivity(activity.id);
      this.showForm();
    } catch(error) {
      console.log(error);
    }

    this.setLoading(false);
  }

  deleteActivity = async (id: string) => {
    this.setLoading(true);

    try {
      await agent.Activities.delete(id);
      this.removeActivity(id);
    } catch(error) {
      console.log(error);
    }

    this.setLoading(false);
  }
}