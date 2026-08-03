import ResourcePage from './ResourcePage.jsx'

function Workouts() {
  return (
    <ResourcePage
      title="Workouts"
      resource="workouts"
      description="Suggested sessions for personalized training."
      emptyMessage="No workout suggestions are available yet."
      fields={[
        { label: 'Description', key: 'description' },
        { label: 'Difficulty', key: 'difficulty' },
        { label: 'Duration', accessor: (workout) => workout.durationMinutes && `${workout.durationMinutes} minutes` },
      ]}
    />
  )
}

export default Workouts