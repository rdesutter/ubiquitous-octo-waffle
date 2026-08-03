import ResourcePage from './ResourcePage.jsx'

function Activities() {
  return (
    <ResourcePage
      title="Activities"
      resource="activities"
      description="Logged workouts and movement sessions."
      emptyMessage="No activities have been logged yet."
      fields={[
        { label: 'Type', key: 'type' },
        { label: 'Duration', accessor: (activity) => activity.durationMinutes && `${activity.durationMinutes} minutes` },
        { label: 'Completed', key: 'completedAt' },
      ]}
    />
  )
}

export default Activities