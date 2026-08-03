import ResourcePage from './ResourcePage.jsx'

function Leaderboard() {
  return (
    <ResourcePage
      title="Leaderboard"
      resource="leaderboard"
      description="Competitive standings across OctoFit members."
      emptyMessage="The leaderboard is waiting for scores."
      fields={[
        { label: 'User', key: 'user' },
        { label: 'Score', key: 'score' },
      ]}
    />
  )
}

export default Leaderboard