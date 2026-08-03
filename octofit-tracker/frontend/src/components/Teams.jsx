import ResourcePage from './ResourcePage.jsx'

function Teams() {
  return (
    <ResourcePage
      title="Teams"
      resource="teams"
      description="Training groups and team membership."
      emptyMessage="No teams are available yet."
      fields={[
        { label: 'Name', key: 'name' },
        { label: 'Members', accessor: (team) => team.members?.length ?? 0 },
      ]}
    />
  )
}

export default Teams