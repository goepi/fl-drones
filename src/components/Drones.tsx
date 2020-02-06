import React from 'react';
import { getRequest } from '../api/drones';
import { RangeInput } from './RangeInput';

interface State {
  drones: DroneWithCrashData[];
  min: string;
  max: string;
}

interface Drone {
  droneId: number;
  numFlights: number;
  name: string;
  currency: string;
  price: number;
  numCrashes: number;
}

interface DroneWithCrashData extends Drone {
  crashRate: number;
}

export class Drones extends React.Component<{}, State> {
  public state: State = { drones: [], min: '', max: '' };

  public async componentDidMount() {
    const drones = await getRequest<any>('/api/v0/drones');
    console.log(drones);

    const dronesWithCrashData = drones.map((drone: Drone) => ({
      ...drone,
      crashRate: drone.numCrashes === 0 || drone.numFlights === 0 ? 0 : drone.numCrashes / drone.numFlights,
    }));

    this.setState({ drones: dronesWithCrashData });
  }

  onChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ min: e.target.value });
  onChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ max: e.target.value });

  getFilteredDrones = () => {
    if (!this.state.min || !this.state.max) {
      return this.state.drones;
    }
    return this.state.drones.filter(
      drone =>
        drone.crashRate >= parseInt(this.state.min) / 100 && drone.crashRate <= parseInt(this.state.max) / 100
    );
  };

  render() {
    return (
      <>
        <ul>
          {this.getFilteredDrones().map((drone: Drone) => (
            <li key={drone.droneId}>{drone.name}</li>
          ))}
        </ul>
        <RangeInput onChangeMin={this.onChangeMin} onChangeMax={this.onChangeMax} />
      </>
    );
  }
}
