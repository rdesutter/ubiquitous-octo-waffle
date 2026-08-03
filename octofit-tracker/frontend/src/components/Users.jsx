import ResourcePage from './ResourcePage.jsx'

function Users() {
  return (
    <ResourcePage
      title="Users"
      resource="users"
      description="Member profiles and account details."
      emptyMessage="No users have been created yet."
      fields={[
        { label: 'Display name', key: 'displayName' },
        { label: 'Email', key: 'email' },
        { label: 'Username', key: 'username' },
      ]}
    />
  )
}

export default Users