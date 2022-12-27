import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

export default class ActivityStore {
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined;
  editMode = false;
  loading = false;
  loadingInitialActivities = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activities() {
    const activities = Array.from(this.activityRegistry.values());
    return activities.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    this.setLoadingInitialActivities(true);
    try {
      const activities = await agent.Activities.list();
      
      activities.forEach(activity => {
        this.setActivity(activity);
      });
    } catch (error) {
      console.log(error);
    }

    this.setLoadingInitialActivities(false);
  }

  loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) {
      this.selectedActivity = activity;

    } else {
      this.setLoadingInitialActivities(true);

      try {
        activity = await agent.Activities.details(id);
        this.selectActivity(activity);
        this.setActivity(activity);

      } catch (error) {
        console.log(error);
      }

      this.setLoadingInitialActivities(false);
    }

    return activity;
  }

  private getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  private selectActivity = (activity: Activity) => {
    this.selectedActivity = activity;
  }

  private setLoadingInitialActivities = (state: boolean) => {
    this.loadingInitialActivities = state;
  }

  private setLoading = (state: boolean) => {
    this.loading = state;
  }

  private setActivity = (activity: Activity) => {
    activity.date = activity.date.split('T')[0];
    this.activityRegistry.set(activity.id, activity);
  }

  private removeActivity = (id: string) => {
    this.activityRegistry.delete(id);
  }

  createActivity = async (activity: Activity) => {
    this.setLoading(true);
    activity.id = uuid();

    try {
      await agent.Activities.create(activity);
      this.setActivity(activity);

    } catch(error) {
      console.log(error);
    }

    this.setLoading(false);
  }

  updateActivity = async (activity: Activity) => {
    this.setLoading(true);

    try {
      await agent.Activities.update(activity);
      this.setActivity(activity);

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