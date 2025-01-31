'use client';
import React, { useState, useEffect } from 'react';

export default function WorkoutTracker() {
  const [workoutDay, setWorkoutDay] = useState('day1');
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState([
    { weight: '', reps: '' },
    { weight: '', reps: '' },
    { weight: '', reps: '' }
  ]);
  const [notes, setNotes] = useState('');

  const workouts = {
    day1: { title: 'Lower Body Focus', exercises: ['Back Squat', 'Romanian Deadlift', 'Bulgarian Split Squats'] },
    day2: { title: 'Upper Body Push', exercises: ['Bench Press', 'Overhead Press', 'Incline Dumbbell Press'] },
    day3: { title: 'Upper Body Pull', exercises: ['Barbell Row', 'Pull-ups', 'Dumbbell Rear Delt Raises'] }
  };

  useEffect(() => {
    setSelectedExercise(workouts[workoutDay].exercises[0]);
  }, [workoutDay]);

  const handleSetChange = (index, field, value) => {
    const newSets = [...sets];
    newSets[index] = { ...newSets[index], [field]: value };
    setSets(newSets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      date: new Date().toISOString(),
      day: workoutDay,
      exercise: selectedExercise,
      sets: sets.filter(set => set.weight && set.reps),
      notes: notes
    };
    
    // Save to localStorage
    const savedWorkouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    savedWorkouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(savedWorkouts));

    // Reset form
    setSets([
      { weight: '', reps: '' },
      { weight: '', reps: '' },
      { weight: '', reps: '' }
    ]);
    setNotes('');
    alert('Workout logged successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Workout Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Workout Day</label>
          <select
            value={workoutDay}
            onChange={(e) => setWorkoutDay(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          >
            {Object.keys(workouts).map(day => (
              <option key={day} value={day}>{workouts[day].title}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Exercise</label>
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300"
          >
            {workouts[workoutDay].exercises.map(exercise => (
              <option key={exercise} value={exercise}>{exercise}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Sets</label>
          {sets.map((set, index) => (
            <div key={index} className="flex mb-2 space-x-2">
              <input
                type="number"
                placeholder="Weight"
                value={set.weight}
                onChange={(e) => handleSetChange(index, 'weight', e.target.value)}
                className="w-1/2 p-2 rounded-md border border-gray-300 shadow-sm"
              />
              <input
                type="number"
                placeholder="Reps"
                value={set.reps}
                onChange={(e) => handleSetChange(index, 'reps', e.target.value)}
                className="w-1/2 p-2 rounded-md border border-gray-300 shadow-sm"
              />
            </div>
          ))}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full p-2 rounded-md border border-gray-300 shadow-sm"
            rows={3}
            placeholder="Form notes, RPE, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
        >
          Log Workout
        </button>
      </form>
    </div>
  );
}
